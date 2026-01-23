# main.tf - VERSIÓN SIMPLIFICADA Y FUNCIONAL

resource "random_id" "suffix" {
  byte_length = 4
}

locals {
  suffix = random_id.suffix.hex
  
  # REDUCIR A 4 SERVICIOS (AWS Academy tiene límites)
  services = {
    lab         = 3000
    auth        = 3001
    user        = 3002
    reservation = 3003
    # approval     = 3004  # COMENTAR POR AHORA
    # audit        = 3005
    # availability = 3006
    # backup       = 3007
    # notification = 3008
    # report       = 3009
  }
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "lab-vpc-${local.suffix}"
  }
}

# SUBNETS
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-a-${local.suffix}"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-b-${local.suffix}"
  }
}

# INTERNET GATEWAY
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "igw-${local.suffix}"
  }
}

# ROUTE TABLE
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-rt-${local.suffix}"
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_rt.id
}

# SECURITY GROUPS
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg-${local.suffix}"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "alb-sg-${local.suffix}"
  }
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg-${local.suffix}"
  description = "Security group for EC2 instances"
  vpc_id      = aws_vpc.main.id

  # Permitir todos los puertos de los servicios (3000-3009)
  ingress {
    from_port       = 3000
    to_port         = 3009
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  # SSH desde cualquier lado (temporal)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2-sg-${local.suffix}"
  }
}

# ALB
resource "aws_lb" "alb" {
  name               = "lab-alb-${local.suffix}"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  
  enable_deletion_protection = false

  tags = {
    Name = "lab-alb-${local.suffix}"
  }
}

# TARGET GROUPS - CORREGIDO: Usar el puerto correcto de cada servicio
resource "aws_lb_target_group" "tg" {
  for_each = local.services
  name     = "${each.key}-tg-${local.suffix}"
  port     = each.value  # CAMBIADO: Usar el puerto específico, no siempre 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/health"
    interval            = 60      # Aumentado
    timeout             = 10      # Aumentado
    healthy_threshold   = 2
    unhealthy_threshold = 3       # Más intentos antes de fallar
    matcher             = "200"
  }

  tags = {
    Name = "${each.key}-tg-${local.suffix}"
  }
}

# LISTENER
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Route not found"
      status_code  = "404"
    }
  }
}

# LISTENER RULES
resource "aws_lb_listener_rule" "rules" {
  for_each     = local.services
  listener_arn = aws_lb_listener.http.arn
  priority     = 100 + index(keys(local.services), each.key)

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg[each.key].arn
  }

  condition {
    path_pattern {
      values = ["/${each.key}*"]
    }
  }
}

# LAUNCH TEMPLATE - CON NGINX (porque Docker Hub está bloqueado)
resource "aws_launch_template" "lt" {
  for_each               = local.services
  name_prefix            = "${each.key}-lt-${local.suffix}-"
  image_id               = var.ami_id
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  key_name               = aws_key_pair.generated_key.key_name

  # USER DATA CON NGINX (funciona en AWS Academy)
  user_data = base64encode(<<EOF
#!/bin/bash
set -ex

# Actualizar e instalar Nginx
yum update -y
amazon-linux-extras install nginx1 -y

# Configurar Nginx para el puerto específico
cat > /etc/nginx/conf.d/default.conf <<CONFIG
server {
    listen ${each.value};
    server_name _;
    
    location / {
        return 200 '{"service": "${each.key}", "status": "running", "port": ${each.value}}';
        add_header Content-Type application/json;
    }
    
    location /health {
        return 200 '{"status": "healthy", "service": "${each.key}"}';
        add_header Content-Type application/json;
    }
}
CONFIG

# Iniciar Nginx
systemctl start nginx
systemctl enable nginx

# Verificar que está funcionando
sleep 5
curl -f http://localhost:${each.value}/health || exit 1

# Log para debugging
echo "Servicio ${each.key} iniciado en puerto ${each.value}" > /var/log/user-data.log
EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name    = "${each.key}-instance-${local.suffix}"
      Service = each.key
    }
  }
}

# AUTO SCALING GROUP - CON MÁS TIEMPO DE ESPERA
resource "aws_autoscaling_group" "asg" {
  for_each             = local.services
  name                 = "${each.key}-asg-${local.suffix}"
  min_size             = 1
  max_size             = 1  # Solo 1 instancia por servicio
  desired_capacity     = 1
  vpc_zone_identifier  = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  target_group_arns    = [aws_lb_target_group.tg[each.key].arn]
  health_check_type    = "ELB"
  health_check_grace_period = 300  # 5 minutos de gracia

  launch_template {
    id      = aws_launch_template.lt[each.key].id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "${each.key}-asg-${local.suffix}"
    propagate_at_launch = true
  }

  tag {
    key                 = "Service"
    value               = each.key
    propagate_at_launch = true
  }
}




