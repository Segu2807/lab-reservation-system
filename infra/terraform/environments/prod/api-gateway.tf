# api-gateway.tf - SIN MÉTODOS DUPLICADOS

resource "aws_api_gateway_rest_api" "lab_api" {
  name        = "prod-lab-reservation-api-${random_id.suffix.hex}"  
  description = "API Gateway para el sistema de reserva de laboratorios"
}

# RECURSOS PRINCIPALES
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  parent_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  path_part   = "{proxy+}"
}

# MÉTODO ÚNICO PARA PROXY
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
  
  request_parameters = {
    "method.request.path.proxy" = true
  }
}

# INTEGRACIÓN SIMPLE (sin {proxy} en el path)
resource "aws_api_gateway_integration" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = aws_api_gateway_method.proxy.http_method

  type                    = "HTTP_PROXY"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/{proxy}"
  
  request_parameters = {
    "integration.request.path.proxy" = "method.request.path.proxy"
  }
  
  depends_on = [aws_lb.alb]
}

# MÉTODO PARA ROOT
resource "aws_api_gateway_method" "root" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

# INTEGRACIÓN PARA ROOT
resource "aws_api_gateway_integration" "root" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_rest_api.lab_api.root_resource_id
  http_method = aws_api_gateway_method.root.http_method

  type                    = "HTTP_PROXY"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/"
  
  depends_on = [aws_lb.alb]
}

# DEPLOYMENT
resource "aws_api_gateway_deployment" "deploy" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.proxy.id,
      aws_api_gateway_integration.proxy.id,
      aws_lb.alb.dns_name
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# STAGE
resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.deploy.id
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  stage_name    = "prod"
}

# ELASTIC IP - Asegúrate que tenga esto:
resource "aws_eip" "api_gateway" {
  domain = "vpc"
  
  tags = {
    Name        = "prod-api-gateway-eip-${random_id.suffix.hex}" 
    Project     = "lab-reservation"
    Environment = "prod"  
    Purpose     = "CloudFlare-Origin"
    ManagedBy   = "Terraform"
  }
  
  # Esto asegura que no se destruya accidentalmente
  lifecycle {
    prevent_destroy = false  # Cambia a true en producción
  }
}

# OUTPUTS DIRECTOS EN EL ARCHIVO
output "api_gateway_url" {
  value = "https://${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}"
}