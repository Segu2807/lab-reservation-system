FROM node:20-alpine AS builder

WORKDIR /repo

# Corepack (necesario para turbo + next)
RUN corepack enable

# NPM resistente a red lenta
RUN npm config set registry https://registry.npmjs.org/ \
 && npm config set fetch-retries 10 \
 && npm config set fetch-retry-mintimeout 30000 \
 && npm config set fetch-retry-maxtimeout 300000 \
 && npm config set fetch-timeout 600000

COPY package.json package-lock.json turbo.json ./
COPY packages ./packages
COPY apps/web-app ./apps/web-app

RUN npm install
RUN npx turbo run build --filter=web-app

# ============================

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# ⚠️ COPIAR RESPETANDO LA RUTA REAL
COPY --from=builder /repo/apps/web-app/.next/standalone ./
COPY --from=builder /repo/apps/web-app/.next/static ./.next/static
COPY --from=builder /repo/apps/web-app/public ./public

EXPOSE 3000

# 🔑 RUTA CORRECTA DEL SERVER
CMD ["node", "apps/web-app/server.js"]






