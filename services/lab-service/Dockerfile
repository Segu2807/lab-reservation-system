# Dockerfile optimizado para NestJS
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependencias
RUN npm ci --include=dev

# Copia todo el código
COPY . .

# Compila la aplicación
RUN npm run build

# --- Fase de producción ---
FROM node:20-alpine

WORKDIR /app

# Solo copia lo necesario para producción
COPY package*.json ./
RUN npm ci --only=production

# Copia los archivos compilados
COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/index.js"]
