FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

# Instala dependencias de compilación si necesitas
RUN apk add --no-cache python3 make g++

RUN npm ci

COPY src ./src
RUN npm run build

# Fase de producción
FROM node:18-alpine

WORKDIR /app

# Instala solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copia los archivos compilados del builder
COPY --from=builder /app/dist ./dist

# Usa el usuario node por seguridad
USER node

EXPOSE 3006

CMD ["node", "dist/index.js"]
