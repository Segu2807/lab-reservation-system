# outputs.tf

output "api_gateway_endpoint" {
  description = "URL del API Gateway"
  value       = "https://${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}"
}

output "elastic_ip_api_gateway" {
  description = "Elastic IP para API Gateway (para CloudFlare)"
  value       = aws_eip.api_gateway.public_ip
}

output "api_gateway_id" {
  description = "ID del API Gateway"
  value       = aws_api_gateway_rest_api.lab_api.id
}

output "alb_dns_name" {
  description = "DNS del Application Load Balancer"
  value       = aws_lb.alb.dns_name
}

output "bastion_public_ip" {
  description = "IP pública del bastion host"
  value       = aws_instance.bastion.public_ip
}

output "bastion_key_name" {
  description = "Nombre del key pair"
  value       = aws_key_pair.generated_key.key_name
}

output "services_deployed" {
  description = "Servicios desplegados"
  value       = keys(local.services)
}

output "vpc_id" {
  description = "ID de la VPC"
  value       = aws_vpc.main.id
}