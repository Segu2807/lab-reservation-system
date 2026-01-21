FROM node:20-alpine

RUN apk add --no-cache postgresql-client mongodb-tools

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

EXPOSE 3010
CMD ["npm", "start"]
