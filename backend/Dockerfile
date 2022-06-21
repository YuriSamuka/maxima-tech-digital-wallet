FROM node:16.3.0-alpine

RUN apk add --no-cache python2 g++ make

WORKDIR /app

COPY . .

RUN yarn install

CMD  node src/app/index.js

EXPOSE 3500