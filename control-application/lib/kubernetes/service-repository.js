const apiClient = require('./api-clients').coreV1Api;

const namespace = 'default';

module.exports = {
    create: async service => apiClient.createNamespacedService(namespace, service.getSpec()),
    delete: async serviceName => apiClient.deleteNamespacedService(serviceName, namespace),
    updateSelector: async (serviceName, selector) => {
        const getServiceResponse = await apiClient.readNamespacedService(serviceName, namespace);
        const service = getServiceResponse.body;
        service.spec.selector = selector;

        // Remove read only property to prevent api error.
        delete service.metadata.creationTimestamp;

        return apiClient.replaceNamespacedService(serviceName, namespace, service);
    },
};
