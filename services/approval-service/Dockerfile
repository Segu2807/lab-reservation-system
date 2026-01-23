# Dockerfile para Approval Service
FROM node:18-alpine AS builder

WORKDIR /app

# Copia TODOS los archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

# Copia el código fuente
COPY src ./src

# Verifica que tsconfig.json existe
RUN ls -la tsconfig.json

# Ejecuta tsc explícitamente con --project
RUN npx tsc --project tsconfig.json

# O alternativamente:
# RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3005

CMD ["node", "dist/index.js"]