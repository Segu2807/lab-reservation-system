provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "onprem_vpc" {
  cidr_block = "10.50.0.0/16"
  tags = {
    Name = "onprem-vpc"
  }
}

resource "aws_subnet" "onprem_subnet" {
  vpc_id                  = aws_vpc.onprem_vpc.id
  cidr_block              = "10.50.1.0/24"
  map_public_ip_on_launch = false
  tags = {
    Name = "onprem-subnet"
  }
}

resource "aws_security_group" "onprem_sg" {
  vpc_id = aws_vpc.onprem_vpc.id
  name   = "onprem-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # VPC principal
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "onprem_backup" {
  ami                    = "ami-0c02fb55956c7d316" # Amazon Linux 2
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.onprem_subnet.id
  vpc_security_group_ids = [aws_security_group.onprem_sg.id]
  key_name               = "aws-academy-key"

  tags = {
    Name = "onprem-backup"
  }
}
