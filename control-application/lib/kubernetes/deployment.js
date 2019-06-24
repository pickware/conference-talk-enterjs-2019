class Deployment {
    constructor(name, selectorLabels, containers, templateLabels, deploymentLabels) {
        this.name = name;
        this.selectorLabels = selectorLabels;
        this.containers = containers.map(container => ({
            name: container.name,
            image: container.image,
            ports: container.ports.map(port => ({
                containerPort: port,
            })),
        }));
        this.templateLabels = templateLabels || selectorLabels;
        this.deploymentLabels = deploymentLabels || { app: name };

        this.replicaCount = 1;
    }

    getSpec() {
        return {
            apiVersion: 'extensions/v1beta1',
            kind: 'Deployment',
            metadata: {
                name: this.name,
                labels: this.deploymentLabels,
            },
            spec: {
                replicas: this.replicaCount,
                selector: {
                    matchLabels: this.selectorLabels,
                },
                template: {
                    metadata: {
                        labels: this.templateLabels,
                    },
                    spec: {
                        containers: this.containers,
                    },
                },
            },
        };
    }
}

module.exports = Deployment;
