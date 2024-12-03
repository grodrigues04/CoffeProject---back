# Usar imagem base do Node.js
FROM node:20.16.0

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 3000


CMD ["sh", "-c", "npx knex migrate:latest && node ./server.js"]
