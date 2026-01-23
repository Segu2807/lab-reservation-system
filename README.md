🧪 Laboratory Reservation System - Civil Engineering
📌 General Description

This project implements a Web-based Laboratory Reservation System for the Civil Engineering program, developed using a microservices architecture, with Docker, Docker Compose, Next.js, Node.js, Kafka, PostgreSQL, MongoDB, Redis, and deployed on AWS Academy using Terraform (Infrastructure as Code).

The system enables:

User and role management

Laboratory creation and administration

Availability checking

Laboratory reservations

Approval workflows

Event auditing

Reporting

Notifications

Backups

🏗️ General Architecture
🔹 Logical Architecture
Frontend: Next.js (React)

Backend: Node.js microservices (Express)

Communication:

HTTP REST (Frontend → API Gateway → Microservices)

Asynchronous events with Kafka

Persistence:

PostgreSQL (core services)

MongoDB (audit logs, backups)

Redis (cache)

Infrastructure:

AWS EC2

Application Load Balancer (ALB)

Bastion Host

VPC + Subnets

API Gateway

Orchestration: Docker Compose

IaC: Terraform

![System Architecture](<System Architecture.png>)

📁 Project Structure (Monorepo)
text
lab-reservation-system
│
├── apps/
│   └── web-app/                 # Next.js Frontend
│
├── services/                    # Microservices
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
│   ├── terraform/               # AWS Infrastructure (IaC)
│   ├── gateway/                 # Custom API Gateway (Docker)
│   ├── nginx/                   # Reverse proxy (optional)
│   └── automation/
│
├── docker-compose.yml            # Local/EC2 orchestration
├── turbo.json                    # Turborepo config
├── package.json
└── README.md
🧩 Implemented Microservices
Service	Port	Database	Function
auth-service	3009	PostgreSQL	Authentication (JWT)
user-service	3001	PostgreSQL + Redis	User management
lab-service	3002	PostgreSQL + Redis	Laboratory management
reservation-service	3003	PostgreSQL	Reservations
availability-service	3004	PostgreSQL	Availability checking
approval-service	3005	PostgreSQL + MongoDB	Approvals
audit-service	3006	MongoDB	Auditing
notification-service	3007	Kafka	Notifications
report-service	3008	PostgreSQL	Reporting
backup-service	3010	PostgreSQL + MongoDB + MinIO	Backups
🖥️ Frontend (Next.js)
The frontend is developed with Next.js (App Router) and connects to microservices via the API Gateway.

Implemented Routes:

Route	Function
/	Home
/login	Login
/dashboard	Main dashboard
/labs	Laboratory listing
/labs/create	Create laboratory
/availability	Check availability
/reservations	View reservations
/reservations/create	Create reservation
/approvals	Approvals
/users	User management
/notifications	Notifications
/reports	Reports
/audits	Auditing
🐳 Docker and Docker Compose
All services run using Docker and are orchestrated with docker-compose.

Services included in docker-compose:

Frontend

API Gateway

All microservices

PostgreSQL (multiple instances)

MongoDB

Redis

Kafka + Zookeeper

MinIO

Run locally:

bash
docker-compose up -d
☁️ AWS Infrastructure (Terraform)
The infrastructure is fully deployed with Terraform, meeting AWS Academy requirements.

Created components:

VPC

Public and private subnets

Internet Gateway

Security Groups

Bastion Host (secure access)

Private EC2 (Docker + Microservices)

Application Load Balancer

API Gateway

Automatic outputs

Deployment:

bash
terraform init
terraform apply
🔐 Security
Private EC2 without direct Internet access

Bastion Host for SSH access

Controlled Security Groups

JWT for authentication

Network segregation (VPC)

🔄 Communication Flow
text
User
 → Frontend (Next.js)
 → API Gateway
 → Application Load Balancer
 → Private EC2 (Docker)
 → Microservices
 → Databases
📦 Backups
The backup-service:

Generates PostgreSQL dumps

Stores metadata in MongoDB

Uploads files to MinIO (S3 compatible)

Executable via REST endpoint

📊 Observability
Centralized auditing (MongoDB)

Per-microservice logs

Event streaming with Kafka

🧪 Testing
Check active services:

bash
docker ps
Test API:

bash
curl http://ALB_DNS/labs
🎓 Academic Context
CI/CD Strategy
This project uses GitHub Actions for Continuous Integration.
Each microservice has its own CI pipeline that:

Installs dependencies

Runs tests

Builds Docker image

Pushes image to Docker Hub

Due to AWS Academy restrictions, Continuous Deployment is performed manually on EC2 instances using Docker and documented deployment scripts. Infrastructure is defined using Terraform.

This approach follows DevOps best practices while respecting the limitations of the academic environment.

Project developed for Distributed Systems / Software Architecture / DevOps courses, applying:

Microservices

Infrastructure as Code

Containerization

Cloud Computing

Professional best practices

🏗️ LAB RESERVATION SYSTEM - AWS INFRASTRUCTURE
✅ STATUS: SUCCESSFULLY DEPLOYED
📊 ARCHITECTURE SUMMARY:
API Gateway: 1 regional endpoint

Load Balancer: 1 ALB balancing 4 services

Services: 4 microservices (lab, auth, user, reservation)

Instances: 4 EC2 + 1 bastion

Network: Full VPC with 2 public subnets

Security: 3 Security Groups configured

🔗 ACCESS:
API: https://3s8ncset55.execute-api.us-east-1.amazonaws.com/prod

Bastion: 98.92.222.217 (SSH)

ALB: lab-alb-9bf9796e-1657069482.us-east-1.elb.amazonaws.com

🎯 ACHIEVED OBJECTIVES:
✅ Infrastructure as Code with Terraform

✅ API Gateway with Elastic IP

✅ Microservices deployed with Auto Scaling

✅ Documentation for CloudFlare

✅ Functionality testing

👨‍💻 Author
Name: Segundo Tipanquiza
Major: Systems Engineering
University: Central University of Ecuador
Year: 2026

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
