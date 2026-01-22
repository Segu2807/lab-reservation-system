FROM node:20-alpine

RUN apk add --no-cache \
  postgresql-client \
  openssh \
  bash \
  curl

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src
COPY scripts ./scripts

RUN npm run build
RUN chmod +x scripts/backup.sh

EXPOSE 3010
CMD ["npm", "start"]
