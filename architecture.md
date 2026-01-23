# Arquitectura del Sistema
Sistema de Reservación de Laboratorios de Ingeniería Civil

## 1. Visión General
El sistema se implementa utilizando una arquitectura de microservicios,
orientada a eventos (Event Driven Architecture) y soportada por principios
de CQRS, garantizando escalabilidad, disponibilidad y mantenibilidad.

La infraestructura se despliega en AWS Academy utilizando servicios
gestionados y contenedores Docker.

---

## 2. Estilo de Arquitectura

### 2.1 Microservicios
Cada dominio del negocio se implementa como un microservicio independiente,
con su propia base de datos y ciclo de vida.

Microservicios principales:
- Auth Service
- User Service
- Lab Service
- Reservation Service
- Approval Service
- Payment Service
- Notification Service
- Audit Service
- Report Service
- Backup Service

---

### 2.2 Arquitectura Orientada a Eventos
La comunicación asíncrona se realiza mediante un broker de mensajes
(Kafka o RabbitMQ), permitiendo bajo acoplamiento entre servicios.

Eventos principales:
- ReservationCreated
- ReservationApproved
- PaymentCompleted
- ReservationCancelled

---

### 2.3 CQRS (Command Query Responsibility Segregation)
- **Commands:** Crear, aprobar, cancelar reservas
- **Queries:** Consultar disponibilidad, historial y reportes

Esto mejora el rendimiento y la escalabilidad del sistema.

---

## 3. Comunicación entre Componentes

### 3.1 API Gateway
El sistema utiliza un API Gateway como punto de entrada único:
- Enrutamiento de solicitudes
- Autenticación JWT
- Rate limiting
- Control de acceso por roles

---

### 3.2 Métodos de Comunicación
- REST API: comunicación síncrona
- gRPC: comunicación interna de alto rendimiento
- Mensajería: Kafka / RabbitMQ (eventos)

---

## 4. Seguridad

### 4.1 Autenticación y Autorización
- JWT con roles (RBAC)
- Refresh tokens
- Políticas de acceso por microservicio

---

### 4.2 Seguridad de Infraestructura
- Bastion Host (Jump Box)
- Subnets privadas para microservicios
- Security Groups y NACL
- Firewall y CORS

---

## 5. Infraestructura en AWS

### 5.1 Componentes Principales
- EC2 (contenedores Docker)
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- API Gateway
- RDS (PostgreSQL)
- MongoDB
- ElastiCache (Redis)
- S3 (Backups)
- CloudWatch

---

## 6. Alta Disponibilidad
- Balanceo de carga con ALB
- Autoescalado con ASG
- Multi-AZ para bases de datos
- Replicación y tolerancia a fallos

---

## 7. DevOps y Automatización
- Monorepo con Turborepo
- CI/CD con GitHub Actions
- Docker Registry
- Terraform (Infraestructura como Código)
- Automatización con n8n

---

## 8. Monitoreo y Observabilidad
- Prometheus para métricas
- Grafana para visualización
- Alertas ante fallos críticos

---

## 9. Backups y Recuperación
- Backups automáticos con fecha y hora
- Almacenamiento en S3
- Replicación hacia entorno on-premise
- Restauración verificada periódicamente

---

## 10. Relación con Casos de Uso
Esta arquitectura soporta todos los casos de uso definidos en
`use-cases.md`, asegurando trazabilidad entre requerimientos,
implementación y pruebas.

## Design Principles Applied

### 1. Single Responsibility Principle (SRP – SOLID)
Each microservice is responsible for a single business capability (e.g., authentication, reports, reservations). This ensures that changes in one domain do not affect others.

### 2. Low Coupling
Microservices communicate through well-defined APIs and are deployed independently. There is no shared database between services, reducing dependencies and increasing scalability.

### 3. High Cohesion
Each service groups related logic such as routes, controllers, database access, and messaging within the same bounded context.

### 4. KISS (Keep It Simple, Stupid)
The system uses simple and well-known technologies (Express, REST, Docker). Each service exposes minimal endpoints with clear responsibilities.

### 5. DRY (Don’t Repeat Yourself)
Common architectural patterns (Dockerfiles, CI workflows, middleware structure) are reused across services to reduce duplication while maintaining service autonomy.
