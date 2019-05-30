# EnterJS 2019 talk - JavaScript DevOps: Orchestrate Kubernetes deployments using NodeJS

## Example application

The example application lives in `./example-application`.

To run the example application:

```bash
cd ./example-application
yarn install
yarn run server
```

To build and run the example application's Docker image:

```bash
cd ./example-application
docker build -t example-application .
docker run --rm -d -p 8080:8080 example-application:latest
```
