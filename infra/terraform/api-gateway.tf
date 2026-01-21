resource "aws_api_gateway_rest_api" "lab_api" {
  name        = "lab-reservation-api"
  description = "API Gateway para el sistema de reserva de laboratorios"
}

# ─────────────────────────────
# RECURSOS
# ─────────────────────────────

resource "aws_api_gateway_resource" "auth" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  parent_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  path_part   = "auth"
}

resource "aws_api_gateway_resource" "users" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  parent_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  path_part   = "users"
}

resource "aws_api_gateway_resource" "labs" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  parent_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  path_part   = "labs"
}

resource "aws_api_gateway_resource" "reservations" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  parent_id   = aws_api_gateway_rest_api.lab_api.root_resource_id
  path_part   = "reservations"
}

# ─────────────────────────────
# MÉTODOS (ANY)
# ─────────────────────────────

resource "aws_api_gateway_method" "auth_any" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_resource.auth.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "users_any" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_resource.users.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "labs_any" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_resource.labs.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "reservations_any" {
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  resource_id   = aws_api_gateway_resource.reservations.id
  http_method   = "ANY"
  authorization = "NONE"
}

# ─────────────────────────────
# INTEGRACIÓN CON ALB
# ─────────────────────────────

resource "aws_api_gateway_integration" "auth_integration" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_resource.auth.id
  http_method = aws_api_gateway_method.auth_any.http_method

  type                    = "HTTP"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/auth"
}

resource "aws_api_gateway_integration" "users_integration" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_resource.users.id
  http_method = aws_api_gateway_method.users_any.http_method

  type                    = "HTTP"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/users"
}

resource "aws_api_gateway_integration" "labs_integration" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_resource.labs.id
  http_method = aws_api_gateway_method.labs_any.http_method

  type                    = "HTTP"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/labs"
}

resource "aws_api_gateway_integration" "reservations_integration" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id
  resource_id = aws_api_gateway_resource.reservations.id
  http_method = aws_api_gateway_method.reservations_any.http_method

  type                    = "HTTP"
  integration_http_method = "ANY"
  uri                     = "http://${aws_lb.alb.dns_name}/reservations"
}

# ─────────────────────────────
# DEPLOY + STAGE
# ─────────────────────────────

resource "aws_api_gateway_deployment" "deploy" {
  rest_api_id = aws_api_gateway_rest_api.lab_api.id

  depends_on = [
    aws_api_gateway_integration.auth_integration,
    aws_api_gateway_integration.users_integration,
    aws_api_gateway_integration.labs_integration,
    aws_api_gateway_integration.reservations_integration
  ]
}

resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.deploy.id
  rest_api_id   = aws_api_gateway_rest_api.lab_api.id
  stage_name    = "prod"
}
