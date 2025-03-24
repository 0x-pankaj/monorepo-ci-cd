FROM oven/bun:1

WORKDIR /usr/src/app

COPY ./packages ./packages

COPY ./bun.lock ./bun.lock

COPY ./package.json ./package.json

COPY ./package*.json ./package*.json

COPY turbo.json turbo.json

COPY ./apps/ws ./apps/ws

RUN bun install
RUN bun db:generate 

COPY ./apps/ws ./apps/ws


EXPOSE 8081

CMD [ "bun", "run", "ws" ]