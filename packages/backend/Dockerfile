FROM node:18.17.1

WORKDIR /app

COPY . .

RUN corepack enable
RUN yarn install

EXPOSE 8080

CMD ["sh", "-c", "cd packages/backend && yarn run start"]
