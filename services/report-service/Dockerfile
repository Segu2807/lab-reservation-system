# Dockerfile SIMPLE que funcionará SIN package-lock.json
FROM node:20-alpine

WORKDIR /app

# Copia archivos de configuración
COPY package.json tsconfig.json ./

# Usa npm install (no npm ci) porque no tienes package-lock.json
RUN npm install

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3008

CMD ["node", "dist/index.js"]