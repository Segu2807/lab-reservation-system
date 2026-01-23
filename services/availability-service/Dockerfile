# Dockerfile específico para NestJS
FROM node:20-alpine AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependencias (usa npm install porque no tienes package-lock.json)
RUN npm install

# Copia todo el código
COPY . .

# Compila la aplicación NestJS
RUN npm run build

# --- Fase de producción ---
FROM node:20-alpine

WORKDIR /app

# Solo copia lo necesario para producción
COPY package*.json ./
RUN npm install --production

# Copia los archivos compilados
COPY --from=builder /app/dist ./dist

EXPOSE 3004

CMD ["node", "dist/index.js"]
