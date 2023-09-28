FROM node:18-alpine as auth-dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "nest", "start", "auth"]


FROM node:18-alpine as auth

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn nest build auth

CMD ["node", "node dist/apps/auth/main"]

FROM node:18-alpine as meetups-dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "nest", "start", "meetups"]

FROM node:18-alpine as meetups

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn nest build meetups

CMD ["node", "node dist/apps/meetups/main"]


FROM node:18-alpine as gateway-dev

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "nest", "start", "gateway"]

FROM node:18-alpine as gateway

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn nest build gateway

CMD ["node", "node dist/apps/gateway/main"]