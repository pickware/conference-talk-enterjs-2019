FROM node:10

WORKDIR /usr/src/example-application

COPY . ./

RUN yarn install

ARG MAIN_JS=./lib/main.js

COPY $MAIN_JS ./lib/main.js

EXPOSE 8080

ENTRYPOINT ["node", "/usr/src/example-application/lib/main.js"]
