const apiClient = require('./api-clients').extensionsV1beta1Api;

const namespace = 'default';

module.exports = {
    async create(deployment) {
        return apiClient.createNamespacedDeployment(namespace, deployment.getSpec());
    },
    async delete(deploymentName) {
        return apiClient.deleteNamespacedDeployment(deploymentName, namespace, undefined, {
            propagationPolicy: 'Background',
        });
    },
    async scale(deploymentName, scale) {
        return apiClient.patchNamespacedDeployment(
            deploymentName,
            namespace,
            {
                spec: {
                    replicas: scale,
                },
            },
            undefined,
            undefined,
            {
                headers: {
                    'Content-Type': 'application/strategic-merge-patch+json',
                },
            }
        );
    },
    async updateImage(deploymentName, containerName, image) {
        return apiClient.patchNamespacedDeployment(
            deploymentName,
            namespace,
            {
                spec: {
                    template: {
                        spec: {
                            containers: [{
                                name: containerName,
                                image,
                            }],
                        },
                    },
                },
            },
            undefined,
            undefined,
            {
                headers: {
                    'Content-Type': 'application/strategic-merge-patch+json',
                },
            }
        );
    },
};
