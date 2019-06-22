FROM node:10

WORKDIR /usr/src/enterjs-app

COPY . ./

RUN yarn install

ARG MAIN_JS=./lib/main.js
COPY $MAIN_JS ./lib/main.js

ARG APP_VERSION=v1
ENV VERSION=$APP_VERSION

EXPOSE 8080

ENTRYPOINT ["node", "/usr/src/enterjs-app/lib/main.js"]
