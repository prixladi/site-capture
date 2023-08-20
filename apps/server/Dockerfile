FROM node:15.3.0-alpine3.10 as build

WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
RUN yarn build

FROM node:15.3.0-alpine3.10 as final

WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist

RUN yarn install --only=production

ENTRYPOINT [ "yarn", "start" ]