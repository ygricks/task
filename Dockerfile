FROM node:24.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build
CMD ["npm", "run", "start:dev"]
