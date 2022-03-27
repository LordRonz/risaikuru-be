FROM node:alpine as builder

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile --production=false

COPY --chown=node:node . .

RUN yarn build


FROM node:alpine as server

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile --prod

COPY --chown=node:node --from=builder /usr/src/node-app/dist ./dist

CMD [ "yarn", "start:node" ]
