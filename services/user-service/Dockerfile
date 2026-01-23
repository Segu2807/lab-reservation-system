# Dockerfile optimizado
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instala todas las dependencias (incluyendo devDependencies)
RUN npm ci --include=dev

# Copia código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

# --- Fase de producción ---
FROM node:20-alpine

WORKDIR /app

# Copia solo lo necesario para producción
COPY package*.json ./
RUN npm ci --only=production

# Copia los archivos compilados
COPY --from=builder /app/dist ./dist

# Usa usuario no-root por seguridad
USER node

EXPOSE 3001

CMD ["node", "dist/index.js"]
