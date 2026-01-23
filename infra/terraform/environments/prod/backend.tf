# backend.tf - PARA AWS ACADEMY (usa local, no S3)

terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}

# Si quieres mantener separado de QA, usa:
# backend "local" {
#   path = "prod.tfstate"
# }