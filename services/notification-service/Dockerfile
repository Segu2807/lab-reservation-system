# Dockerfile para Notification Service
FROM node:20-alpine

WORKDIR /app

# Copia los archivos de configuración
COPY package.json tsconfig.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3007

CMD ["node", "dist/index.js"]
