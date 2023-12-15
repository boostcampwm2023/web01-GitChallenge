FROM node:18.17.1

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

WORKDIR /app

COPY . .

RUN corepack enable

WORKDIR /app/packages/frontend

RUN yarn install
RUN yarn build

WORKDIR /app

EXPOSE 3000

CMD ["sh", "-c", "cd packages/frontend && yarn run start"]