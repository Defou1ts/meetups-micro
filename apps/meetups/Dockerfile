FROM node:18-alpine as development

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn","nest", "start", "meetups", "--watch"]

FROM node:18-alpine as production

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn nest build meetups

CMD ["node", "dist/apps/meetups/main"]