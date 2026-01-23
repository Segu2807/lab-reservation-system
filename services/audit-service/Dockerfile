FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json tsconfig.json ./

# Instala dependencias y genera node_modules
RUN npm install

COPY src ./src
RUN npm run build

# Fase de producción
FROM node:18-alpine

WORKDIR /app

COPY package.json ./

# Instala solo dependencias de producción (forma correcta)
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3006

CMD ["node", "dist/index.js"]