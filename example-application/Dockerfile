FROM node:10

WORKDIR /usr/src/example-application

COPY . ./

RUN yarn install

EXPOSE 8080

ENTRYPOINT ["node", "/usr/src/example-application/lib/main.js"]
