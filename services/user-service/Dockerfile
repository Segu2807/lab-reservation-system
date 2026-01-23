# Dockerfile simplificado - solución rápida
FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios
COPY package.json package-lock.json tsconfig.json ./

# Usa npm install en lugar de npm ci (más permisivo)
RUN npm install

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
