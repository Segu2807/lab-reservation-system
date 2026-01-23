# bastion.tf

resource "tls_private_key" "bastion_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "prod-lab-reservation-key-${random_id.suffix.hex}"
  public_key = tls_private_key.bastion_key.public_key_openssh
  
  tags = {
    Project     = "lab-reservation"
    Environment = "prod"
  }
}

resource "local_file" "private_key" {
  content  = tls_private_key.bastion_key.private_key_pem
  filename = "${path.module}/prod-lab-reservation-key.pem"
  file_permission = "0600"
}

resource "aws_instance" "bastion" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_a.id
  key_name      = aws_key_pair.generated_key.key_name
  
  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  tags = {
    Name        = "prod-bastion-${random_id.suffix.hex}" 
    Environment = "prod" 
  }
}
