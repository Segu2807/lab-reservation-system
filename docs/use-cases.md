# Casos de Uso del Sistema
Sistema de Reservación de Laboratorios de Ingeniería Civil

## 1. Introducción
Este documento describe los principales casos de uso del sistema
de reservación de laboratorios, identificando los actores involucrados
y las interacciones con los microservicios.

---

## 2. Actores
- Administrador
- Estudiante
- Egresado
- Usuario Externo

---

## 3. Casos de Uso Principales

### CU-01: Autenticarse en el sistema
**Actor:** Todos  
**Descripción:**  
El usuario se autentica en la plataforma utilizando credenciales válidas.

**Microservicios involucrados:**
- Auth Service
- User Service

**Resultado:**  
Token JWT válido con rol asignado.

---

### CU-02: Consultar disponibilidad de laboratorios
**Actor:** Estudiante, Egresado, Externo  
**Descripción:**  
El usuario consulta la disponibilidad de laboratorios por fecha y horario.

**Microservicios involucrados:**
- Lab Service
- Reservation Service
- Cache (Redis)

---

### CU-03: Crear reserva de laboratorio
**Actor:** Estudiante, Egresado, Externo  
**Descripción:**  
El usuario solicita una reserva de un laboratorio disponible.

**Microservicios involucrados:**
- Reservation Service
- Lab Service
- Event Broker (Kafka/RabbitMQ)

**Eventos generados:**
- ReservationCreated

---

### CU-04: Aprobar o rechazar reserva
**Actor:** Administrador  
**Descripción:**  
El administrador aprueba o rechaza una solicitud de reserva.

**Microservicios involucrados:**
- Approval Service
- Reservation Service
- Event Broker

**Eventos generados:**
- ReservationApproved
- ReservationRejected

---

### CU-05: Realizar pago por uso del laboratorio
**Actor:** Usuario Externo  
**Descripción:**  
El usuario externo realiza el pago para confirmar la reserva.

**Microservicios involucrados:**
- Payment Service
- Reservation Service
- Event Broker

**Eventos generados:**
- PaymentCompleted

---

### CU-06: Enviar notificaciones
**Actor:** Sistema  
**Descripción:**  
El sistema envía notificaciones por correo u otros canales.

**Microservicios involucrados:**
- Notification Service

---

### CU-07: Cancelar reserva
**Actor:** Estudiante, Egresado, Externo  
**Descripción:**  
El usuario cancela una reserva dentro del tiempo permitido.

**Microservicios involucrados:**
- Reservation Service
- Event Broker

**Eventos generados:**
- ReservationCancelled

---

### CU-08: Generar reportes
**Actor:** Administrador  
**Descripción:**  
El administrador genera reportes de uso de laboratorios.

**Microservicios involucrados:**
- Report Service
- Audit Service

---

### CU-09: Auditoría del sistema
**Actor:** Sistema  
**Descripción:**  
El sistema registra todas las acciones críticas.

**Microservicios involucrados:**
- Audit Service

---

### CU-10: Ejecución de backups
**Actor:** Sistema  
**Descripción:**  
El sistema realiza copias de seguridad automáticas con fecha y hora.

**Microservicios involucrados:**
- Backup Service
- Storage (S3 / On-Premise)

---

## 4. Relación con Arquitectura
Los casos de uso justifican:
- Arquitectura de microservicios
- Comunicación basada en eventos
- Uso de CQRS
- Pruebas funcionales por microservicio
- Automatización con n8n

---

## 5. Relación con Pruebas
Cada caso de uso tiene al menos:
- 1 prueba funcional
- Validación de seguridad y roles
- Verificación de eventos generados
