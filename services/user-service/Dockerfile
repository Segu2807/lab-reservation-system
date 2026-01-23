# Dockerfile SIMPLE y FUNCIONAL
FROM node:20-alpine

WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json tsconfig.json ./

# Instala dependencias
RUN npm ci

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]