# Módulo API Gateway
variable "environment" {}
variable "api_name" {}
variable "alb_dns_name" {}

resource "aws_api_gateway_rest_api" "main" {
  name = "${var.environment}-${var.api_name}"
  # ... (código API Gateway)
}

resource "aws_eip" "api_gateway" {
  domain = "vpc"
  tags = { Environment = var.environment }
}