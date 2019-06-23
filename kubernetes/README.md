# How to Kubernetes

## How to build images so that they are available in Minikube

For the current session run the following command, so that your docker registry points to the Minikube registry.

```sh
eval $(minikube docker-env)
```

## How to create the first deployment

### Kubectl:

```sh
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml
```

To find the IP address and port for the deployment's ingress, run:

```sh
kubectl get ingress enterjs-app-ingress
```

### Using the API:

POST /apis/apps/v1/namespaces/{namespace}/kubernetes

[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-deployment-v1-apps](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-deployment-v1-apps)

POST /api/v1/namespaces/{namespace}/services
[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-service-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-service-v1-core)

POST /apis/networking.k8s.io/v1beta1/namespaces/{namespace}/ingresses
[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-ingress-v1beta1-networking-k8s-io](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#create-ingress-v1beta1-networking-k8s-io)

### ATTENTION

Make sure the ingress plugin is enabled so that you are able to access the cluster via an ip.

```sh
minikube addons enable ingress
```

## How to scale a deployment

### Kubectl:

```sh
kubectl scale deployment enterjs-app-deployment --replicas 10
```

### Using the API:

PATCH /apis/apps/v1/namespaces/{namespace}/kubernetes/{name}/scale
[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-scale-deployment-v1-apps](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-scale-deployment-v1-apps)

## How to update a deployment

### Kubectl:

Either:

```sh
kubectl edit deployment enterjs-app-deployment
```

Or

```sh
kubectl patch deployment enterjs-app-deployment --patch='{"spec":{"template":{"spec":{"containers":[{"name": "js-app", "iamge":"enterjs-app:v2"}]}}}}'
```

Or adjust the `deployment.yml` (e.g. `deployment-updated.yml`) and

```sh
kubectl apply -f deployment.yml
```

### Using the API:

PATCH /apis/apps/v1/namespaces/{namespace}/kubernetes/{name}
[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-deployment-v1-apps](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-deployment-v1-apps)

(Can also be used to define the replica amount.)

## Blue Green Deployment

We create a second deployment and service with the updated version and patch the ingress once we are confident the update works.

### Kubectl:

```sh
kubectl apply -f blue-green.yml
```

### Using the API:

Create the new deployment and service just as described in the `How to create the first deployment`.

### Update the ingress

```sh
kubectl patch ingress enterjs-app-ingress --patch='{"spec":{"rules":[{"http":{"paths":[{"path": "/*", "backend":{"serviceName": "enterjs-app-service-blue-green", "servicePort": 3000}}]}}]}}'
```

PATCH /apis/networking.k8s.io/v1beta1/namespaces/{namespace}/ingresses/{name}
[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-ingress-v1beta1-networking-k8s-io](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#patch-ingress-v1beta1-networking-k8s-io)

## Canary releases

We create a second deployment with 1 pod and scale the first deployment to 9 pods. We will then label our pods in a way
that the service discovers both kubernetes and thereby achieve a canary deployment.
