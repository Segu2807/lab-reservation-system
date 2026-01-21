variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_subnets" {
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  default = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "key_name" {
  description = "Key pair name"
}
######## BASE DE DATOS##################
variable "region" {
  default = "us-east-1"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "ami_id" {
  description = "AMI Amazon Linux 2 para us-east-1"
  default     = "ami-0c02fb55956c7d316"
}
