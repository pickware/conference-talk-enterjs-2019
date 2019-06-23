# EnterJS 2019 talk - JavaScript DevOps: Orchestrate Kubernetes deployments using NodeJS

## Example application

The example application lives in `./enterjs-app`.

To run the example application:

```bash
cd ./enterjs-app
yarn install
yarn run server
```

To build and run the example application's Docker image:

```bash
cd ./enterjs-app
docker build -t enterjs-app .
docker run --rm -d -p 8080:8080 enterjs-app:latest
```
