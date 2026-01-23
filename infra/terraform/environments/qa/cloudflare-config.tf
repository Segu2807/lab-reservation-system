# environments/qa/cloudflare-config.tf - VERSIÓN CORREGIDA

output "for_engineer_cloudflare_correct" {
  description = "Configuración ACTUAL para entregar al ingeniero"
  value = <<EOT
✅ INFRAESTRUCTURA QA DESPLEGADA - LAB RESERVATION SYSTEM
📅 Fecha: ${formatdate("YYYY-MM-DD HH:mm:ss", timestamp())}

📋 **DATOS ACTUALES PARA CLOUDFLARE:**

1. 🌐 **DNS API GATEWAY:**
   • URL: ${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}
   • ID: ${aws_api_gateway_rest_api.lab_api.id}
   • Stage: ${aws_api_gateway_stage.prod.stage_name}
   • Region: us-east-1

2. 📍 **ELASTIC IP API GATEWAY:**
   • IP: ${aws_eip.api_gateway.public_ip}
   • ID: ${aws_eip.api_gateway.id}
   • Tipo: Elastic IP (AWS)
   • Propósito: Origen fijo para CloudFlare

3. ⚖️ **LOAD BALANCER (Alternativa):**
   • DNS: ${aws_lb.alb.dns_name}
   • Protocolo: HTTP (puerto 80)
   • Health Check: /health

4. 🛠️ **SERVICIOS DISPONIBLES:**
   • Lab: /lab, /lab/health
   • Auth: /auth, /auth/health
   • User: /user, /user/health
   • Reservation: /reservation, /reservation/health

5. ⚙️ **CONFIGURACIÓN SUGERIDA CLOUDFLARE:**
   • SSL/TLS: Flexible
   • Proxy: Activado (nube naranja)
   • Cache: Development Mode
   • WAF: Reglas básicas
   • TTL DNS: 300 segundos

6. 🔗 **URLS PARA PRUEBAS:**
   • API Gateway: https://${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}/lab
   • Health Check: https://${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}/lab/health

7. 📝 **INFORMACIÓN TÉCNICA:**
   • Entorno: QA (AWS Academy)
   • VPC ID: ${aws_vpc.main.id}
   • Bastion Host: ${aws_instance.bastion.public_ip}
   • Servicios: ${join(", ", keys(local.services))}
   • Infraestructura: Terraform

⚠️ **NOTA:** Estos recursos expiran después de 4 horas (límite AWS Academy)
EOT
}

output "dns_and_ip_summary" {
  description = "Resumen conciso DNS + IP"
  value = {
    dns_api_gateway = "https://${aws_api_gateway_rest_api.lab_api.id}.execute-api.us-east-1.amazonaws.com/${aws_api_gateway_stage.prod.stage_name}"
    elastic_ip = aws_eip.api_gateway.public_ip
    alb_dns = aws_lb.alb.dns_name
    environment = "qa"
    timestamp = timestamp()
  }
}