# Dockerfile optimizado para report-service
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package.json tsconfig.json ./

# Instala TODAS las dependencias (incluyendo devDependencies para build)
RUN npm ci --include=dev

# Copia el código fuente
COPY src ./src

# Compila TypeScript a JavaScript
RUN npm run build

# --- Fase de producción ---
FROM node:20-alpine

WORKDIR /app

# Copia solo lo necesario para producción
COPY package.json ./
RUN npm ci --only=production

# Copia los archivos compilados desde el builder
COPY --from=builder /app/dist ./dist

EXPOSE 3008

CMD ["node", "dist/index.js"]