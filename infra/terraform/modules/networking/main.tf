# Módulo de Networking
variable "environment" {}
variable "vpc_cidr" {}
variable "public_subnets" {}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  tags = { Name = "${var.environment}-vpc" }
}

resource "aws_subnet" "public" {
  count = length(var.public_subnets)
  # ... (todo el código de networking)
}

# Outputs
output "vpc_id" { value = aws_vpc.main.id }
output "public_subnet_ids" { value = aws_subnet.public[*].id }