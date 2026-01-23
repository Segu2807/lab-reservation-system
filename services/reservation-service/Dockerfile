# Dockerfile para Reservation Service
FROM node:20-alpine

WORKDIR /app

COPY package.json tsconfig.json ./
# Usa npm install (no npm ci) porque no tienes package-lock.json
RUN npm install

COPY src ./src
RUN npm run build

EXPOSE 3003

CMD ["node", "dist/index.js"]
