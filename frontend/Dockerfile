FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM alpine:latest
COPY --from=builder /app/dist /usr/share/nginx/html
VOLUME /usr/share/nginx/html