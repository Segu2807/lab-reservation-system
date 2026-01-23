# cloudflare-config.tf - Configuración para entregar al ingeniero

output "for_engineer_cloudflare" {
  description = "Configuración para entregar al ingeniero de CloudFlare"
  value = <<EOT
🚀 INFRAESTRUCTURA DESPLEGADA - LAB RESERVATION SYSTEM

📊 DATOS TÉCNICOS PARA CLOUDFLARE:

1. 🌐 API GATEWAY (Endpoints principales):
   • URL: https://3s8ncset55.execute-api.us-east-1.amazonaws.com/prod
   • ID: 3s8ncset55
   • Stage: prod
   • Region: us-east-1

2. 📍 ELASTIC IP (IP Fija para origen):
   • IP: 54.237.22.207
   • Propósito: Origen del API Gateway
   • Tipo: Elastic IP (AWS)

3. ⚖️ LOAD BALANCER (Alternativa directa):
   • DNS: lab-alb-9bf9796e-1657069482.us-east-1.elb.amazonaws.com
   • Protocolo: HTTP (puerto 80)
   • Health Check: /health

4. 🛠️ SERVICIOS DISPONIBLES:
   • Lab:     /lab, /lab/health
   • Auth:    /auth, /auth/health  
   • User:    /user, /user/health
   • Reservation: /reservation, /reservation/health

5. ⚙️ CONFIGURACIÓN SUGERIDA CLOUDFLARE:
   • SSL/TLS: Flexible (CloudFlare maneja SSL)
   • Proxy Status: Proxied (nube naranja)
   • Caching: Development Mode
   • WAF: Reglas básicas habilitadas
   • TTL DNS: 300 segundos

6. 🔧 OPCIONES DE CONFIGURACIÓN:
   • OPCIÓN A (Recomendada): Registrar A → 54.237.22.207
   • OPCIÓN B: CNAME → lab-alb-9bf9796e-1657069482.us-east-1.elb.amazonaws.com
   • OPCIÓN C: Esperar certificado SSL para dominio personalizado

7. 📝 NOTAS IMPORTANTES:
   • Entorno: QA (AWS Academy Learner Lab)
   • Tiempo de sesión: 4 horas máximo
   • Certificado SSL: CloudFlare Flexible (no requiere certificado en origen)
   • IP origen fija garantizada por Elastic IP
   • Arquitectura completa desplegada con Terraform

8. 🧪 URLs PARA PRUEBAS:
   • API Gateway: https://3s8ncset55.execute-api.us-east-1.amazonaws.com/prod/lab
   • ALB Directo: http://lab-alb-9bf9796e-1657069482.us-east-1.elb.amazonaws.com/lab
   • Health Check: https://3s8ncset55.execute-api.us-east-1.amazonaws.com/prod/lab/health

9. 🔗 RECURSOS AWS CREADOS:
   • VPC: vpc-0a9caa5d0b9486f3d
   • API Gateway: lab-reservation-api-9bf9796e
   • ALB: lab-alb-9bf9796e
   • EC2 Instances: 4 servicios + 1 bastion
   • Auto Scaling Groups: 4 grupos
   • Security Groups: Configurados apropiadamente

10. 👨‍💻 INFORMACIÓN DE CONTACTO/TROUBLESHOOTING:
    • Bastion Host: 98.92.222.217 (SSH access)
    • Key Pair: lab-reservation-key-9bf9796e
    • Región: us-east-1 (N. Virginia)
    • Account ID: 085277372614
    • Infraestructura como Código: Terraform
EOT
}

output "technical_summary" {
  description = "Resumen técnico para documentación"
  value = {
    api_gateway = {
      id      = "3s8ncset55"
      url     = "https://3s8ncset55.execute-api.us-east-1.amazonaws.com/prod"
      stage   = "prod"
      region  = "us-east-1"
    }
    elastic_ip = {
      address = "54.237.22.207"
      id      = "eipalloc-052267db555dbe26e"
    }
    load_balancer = {
      dns_name = "lab-alb-9bf9796e-1657069482.us-east-1.elb.amazonaws.com"
      name     = "lab-alb-9bf9796e"
    }
    services = {
      deployed = ["lab", "auth", "user", "reservation"]
      ports    = { lab = 3000, auth = 3001, user = 3002, reservation = 3003 }
    }
    network = {
      vpc_id  = "vpc-0a9caa5d0b9486f3d"
      subnets = ["subnet-0baa4b401c5e2e7b4", "subnet-0b6e5d80bcd10ceb8"]
    }
  }
}