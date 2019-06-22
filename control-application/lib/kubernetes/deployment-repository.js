const apiClient = require('./api-clients').extensionsV1beta1Api;

const namespace = 'default';

module.exports = {
    create: async deployment => apiClient.createNamespacedDeployment(namespace, deployment.getSpec()),
    delete: async deploymentName => apiClient.deleteNamespacedDeployment(deploymentName, namespace),
};
