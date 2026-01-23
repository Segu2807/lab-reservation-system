FROM node:18-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./
COPY tsconfig.json ./


RUN npm ci --no-audit --prefer-offline


COPY src ./src


RUN npm run build


FROM node:18-alpine

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm ci --only=production --no-audit --prefer-offline


COPY --from=builder /app/dist ./dist


USER node


EXPOSE 3006

CMD ["node", "dist/index.js"]