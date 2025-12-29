# Roles y Actores del Sistema
Sistema de Reservación de Laboratorios de Ingeniería Civil

## 1. Introducción
Este documento define los actores y roles que interactúan con el sistema
de reservación de laboratorios de la carrera de Ingeniería Civil.
Los roles determinan los permisos, restricciones y flujos de negocio
dentro de la plataforma.

---

## 2. Roles del Sistema

### 2.1 Administrador (Admin)
**Descripción:**  
Usuario con control total del sistema.

**Responsabilidades:**
- Crear, editar y eliminar laboratorios
- Definir horarios y disponibilidad
- Aprobar o rechazar solicitudes de reserva
- Visualizar reportes y auditorías
- Gestionar usuarios y roles

**Permisos:**
- Acceso total a todos los módulos
- Lectura y escritura en todos los microservicios

---

### 2.2 Estudiante
**Descripción:**  
Estudiante activo de la carrera de Ingeniería Civil.

**Responsabilidades:**
- Consultar disponibilidad de laboratorios
- Solicitar reservas
- Cancelar reservas dentro del tiempo permitido

**Restricciones:**
- No puede reservar fuera del horario académico
- No realiza pagos

---

### 2.3 Egresado
**Descripción:**  
Graduado de la carrera con acceso extendido al sistema.

**Responsabilidades:**
- Reservar laboratorios
- Consultar historial de uso

**Permisos especiales:**
- Acceso a horarios extendidos
- Puede reservar más horas que un estudiante

---

### 2.4 Usuario Externo
**Descripción:**  
Persona externa a la universidad que requiere el uso de laboratorios.

**Responsabilidades:**
- Solicitar reservas
- Realizar pagos por uso del laboratorio

**Restricciones:**
- Reservas sujetas a aprobación del administrador
- Pago obligatorio antes de la confirmación

---

## 3. Relación con Seguridad
Los roles definidos en este documento son utilizados para:
- Autenticación mediante JWT
- Autorización basada en roles (RBAC)
- Control de acceso a endpoints
- Definición de políticas de seguridad en el API Gateway

---

## 4. Relación con Arquitectura
Cada rol interactúa con diferentes microservicios:
- Auth Service
- User Service
- Reservation Service
- Payment Service
- Approval Service

Este enfoque garantiza bajo acoplamiento y alta cohesión.
