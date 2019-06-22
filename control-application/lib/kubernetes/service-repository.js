const apiClient = require('./api-clients').coreV1Api;

const namespace = 'default';

module.exports = {
    create: async service => apiClient.createNamespacedService(namespace, service.getSpec()),
    delete: async serviceName => apiClient.deleteNamespacedService(serviceName, namespace),
};
