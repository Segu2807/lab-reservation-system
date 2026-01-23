# services/approval-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src
RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]