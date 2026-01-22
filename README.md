🧪 Sistema de Reservación de Laboratorios – Ingeniería Civil
📌 Descripción General

Este proyecto implementa un Sistema Web de Reservación de Laboratorios para la carrera de Ingeniería Civil, desarrollado bajo una arquitectura de microservicios, utilizando Docker, Docker Compose, Next.js, Node.js, Kafka, PostgreSQL, MongoDB, Redis, y desplegado sobre AWS Academy usando Terraform (Infraestructura como Código).

El sistema permite:

Gestión de usuarios y roles

Creación y administración de laboratorios

Consulta de disponibilidad

Reservas de laboratorios

Flujo de aprobación

Auditoría de eventos

Reportes

Notificaciones

Backups

🏗️ Arquitectura General
🔹 Arquitectura lógica

Frontend: Next.js (React)

Backend: Microservicios Node.js (Express)

Comunicación:

HTTP REST (Frontend → API Gateway → Microservicios)

Eventos asincrónicos con Kafka

Persistencia:

PostgreSQL (servicios core)

MongoDB (auditoría, logs, backups)

Redis (cache)

Infraestructura:

AWS EC2

Application Load Balancer (ALB)

Bastion Host

VPC + Subnets

API Gateway

Orquestación: Docker Compose

IaC: Terraform

📁 Estructura del Proyecto (Monorepo)
lab-reservation-system
│
├── apps/
│   └── web-app/                 # Frontend Next.js
│
├── services/                    # Microservicios
│   ├── auth-service
│   ├── user-service
│   ├── lab-service
│   ├── reservation-service
│   ├── availability-service
│   ├── approval-service
│   ├── audit-service
│   ├── notification-service
│   ├── report-service
│   └── backup-service
│
├── infra/
│   ├── terraform/               # Infraestructura AWS (IaC)
│   ├── gateway/                 # API Gateway custom (Docker)
│   ├── nginx/                   # Reverse proxy (opcional)
│   └── automation/
│
├── docker-compose.yml            # Orquestación completa local / EC2
├── turbo.json                    # Turborepo
├── package.json
└── README.md

🧩 Microservicios Implementados
Servicio	Puerto	Base de Datos	Función
auth-service	3009	PostgreSQL	Autenticación (JWT)
user-service	3001	PostgreSQL + Redis	Gestión de usuarios
lab-service	3002	PostgreSQL + Redis	Gestión de laboratorios
reservation-service	3003	PostgreSQL	Reservas
availability-service	3004	PostgreSQL	Disponibilidad
approval-service	3005	PostgreSQL + MongoDB	Aprobaciones
audit-service	3006	MongoDB	Auditoría
notification-service	3007	Kafka	Notificaciones
report-service	3008	PostgreSQL	Reportes
backup-service	3010	PostgreSQL + MongoDB + MinIO	Backups
🖥️ Frontend (Next.js)

El frontend está desarrollado con Next.js (App Router) y se conecta a los microservicios mediante el API Gateway.

Rutas implementadas:
Ruta	Función
/	Home
/login	Login
/dashboard	Panel principal
/labs	Listado de laboratorios
/labs/create	Crear laboratorio
/availability	Consultar disponibilidad
/reservations	Ver reservas
/reservations/create	Crear reserva
/approvals	Aprobaciones
/users	Gestión de usuarios
/notifications	Notificaciones
/reports	Reportes
/audits	Auditoría
🐳 Docker y Docker Compose

Todos los servicios se ejecutan mediante Docker y se orquestan con docker-compose.

Servicios incluidos en docker-compose:

Frontend

API Gateway

Todos los microservicios

PostgreSQL (múltiples instancias)

MongoDB

Redis

Kafka + Zookeeper

MinIO

Levantar todo localmente:
docker-compose up -d

☁️ Infraestructura en AWS (Terraform)

La infraestructura se despliega completamente con Terraform, cumpliendo los requisitos de AWS Academy.

Componentes creados:

VPC

Subnets públicas y privadas

Internet Gateway

Security Groups

Bastion Host (acceso seguro)

EC2 privada (Docker + Microservicios)

Application Load Balancer

API Gateway

Outputs automáticos

Despliegue:
terraform init
terraform apply

🔐 Seguridad

EC2 privada sin acceso directo a Internet

Bastion Host para acceso SSH

Security Groups controlados

JWT para autenticación

Separación de redes (VPC)

🔄 Flujo de Comunicación
Usuario
 → Frontend (Next.js)
 → API Gateway
 → Application Load Balancer
 → EC2 privada (Docker)
 → Microservicios
 → Bases de Datos

📦 Backups

El backup-service:

Genera dumps de PostgreSQL

Guarda metadata en MongoDB

Sube archivos a MinIO (S3 compatible)

Ejecutable vía endpoint REST

📊 Observabilidad

Auditoría centralizada (MongoDB)

Logs por microservicio

Eventos con Kafka

🧪 Pruebas
Ver servicios activos:
docker ps

Probar API:
curl http://ALB_DNS/labs

🎓 Contexto Académico

## CI/CD Strategy

This project uses GitHub Actions for Continuous Integration.
Each microservice has its own CI pipeline that:

- Installs dependencies
- Runs tests
- Builds Docker image
- Pushes image to Docker Hub

Due to AWS Academy restrictions, Continuous Deployment is performed manually on EC2 instances using Docker and documented deployment scripts. Infrastructure is defined using Terraform.

This approach follows DevOps best practices while respecting the limitations of the academic environment.

Proyecto desarrollado para la asignatura Distribuida / Arquitectura de Software / DevOps, aplicando:

Microservicios

Infraestructura como Código

Contenedores

Cloud Computing

Buenas prácticas profesionales

👨‍💻 Autor

Nombre: Segundo Tipanquiza
Carrera: Ingeniería en Sistemas
Universidad: (completar)
Año: 2026

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
