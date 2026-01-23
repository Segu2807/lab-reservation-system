# Dockerfile para Backup Service
FROM node:20-alpine

# Instala herramientas del sistema
RUN apk add --no-cache \
  postgresql-client \
  openssh \
  bash \
  curl

WORKDIR /app

# Copia archivos de configuración
COPY package.json tsconfig.json ./

# Usa npm install (no npm ci) porque no tienes package-lock.json
RUN npm install

# Copia código fuente
COPY src ./src
COPY scripts ./scripts

# Compila TypeScript
RUN npm run build

# Da permisos al script de backup
RUN chmod +x scripts/backup.sh

EXPOSE 3010

CMD ["npm", "start"]
