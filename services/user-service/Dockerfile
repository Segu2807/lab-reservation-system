# Dockerfile que funcionará SIN package-lock.json
FROM node:20-alpine

WORKDIR /app

# Copia los archivos de configuración
COPY package.json ./
COPY tsconfig.json ./

# Si hay package-lock.json, cópialo también
COPY package-lock.json* ./

# Instala dependencias - Si hay package-lock.json usa npm ci, si no npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copia el código fuente
COPY src ./src

# Compila TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]