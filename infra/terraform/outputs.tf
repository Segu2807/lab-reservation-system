output "alb_dns_name" {
  description = "DNS público del Application Load Balancer"
  value       = aws_lb.alb.dns_name
}
output "vpc_id" {
  description = "ID de la VPC principal del sistema"
  value       = aws_vpc.main.id
}
output "public_subnets" {
  description = "Subnets públicas usadas por el ALB y EC2"
  value = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id
  ]
}
output "alb_security_group" {
  description = "Security Group del Load Balancer"
  value       = aws_security_group.alb_sg.id
}

output "ec2_security_group" {
  description = "Security Group de las instancias EC2"
  value       = aws_security_group.ec2_sg.id
}
output "lab_service_target_group" {
  description = "Target Group asociado al microservicio Lab Service"
  value       = aws_lb_target_group.lab_tg.arn
}
output "lab_service_asg" {
  description = "Auto Scaling Group del microservicio Lab Service"
  value       = aws_autoscaling_group.lab_asg.name
}
output "architecture_summary" {
  description = "Resumen de arquitectura desplegada"
  value = {
    frontend_access = "ALB"
    backend_runtime = "EC2 + Docker"
    orchestration   = "Auto Scaling Group"
    networking      = "VPC + Subnets públicas"
    iac             = "Terraform"
  }
}
