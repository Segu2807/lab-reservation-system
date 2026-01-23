variable "vpc_cidr" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets"
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "key_name" {
  description = "Key pair name (opcional)"
  default     = ""
}

variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
  default     = "Distribuida2026!"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances"
  default     = "ami-0c02fb55956c7d316"  # Amazon Linux 2 us-east-1
}

# Nuevas variables
variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

variable "min_size" {
  description = "Minimum number of instances in ASG"
  default     = 1
}

variable "max_size" {
  description = "Maximum number of instances in ASG"
  default     = 2
}

variable "desired_capacity" {
  description = "Desired number of instances in ASG"
  default     = 1
}
