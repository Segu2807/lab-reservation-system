# Dockerfile optimizado CON package-lock.json
FROM node:20-alpine

WORKDIR /app

# Copia archivos de configuración INCLUYENDO package-lock.json
COPY package.json package-lock.json tsconfig.json ./

# Usa npm ci (más rápido y reproducible) porque tienes package-lock.json
RUN npm ci

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3009

CMD ["node", "dist/index.js"]
