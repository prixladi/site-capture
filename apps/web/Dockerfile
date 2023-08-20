FROM node:15.3.0-alpine3.10 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

RUN apk update && apk add dos2unix
RUN dos2unix ./docker/run.sh

FROM node:15.3.0-alpine3.10

WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/docker/config.js ./configs/config.js
COPY --from=build /app/docker/run.sh ./run.sh

RUN yarn install --only=production
RUN chmod +x ./run.sh

ENTRYPOINT ["./run.sh"]
CMD [ "yarn", "start" ]