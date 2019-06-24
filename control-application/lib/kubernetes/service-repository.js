const apiClient = require('./api-clients').coreV1Api;

const namespace = 'default';

module.exports = {
    async create(service) {
        return apiClient.createNamespacedService(namespace, service.getSpec());
    },
    async delete(serviceName) {
        return apiClient.deleteNamespacedService(serviceName, namespace);
    },
    async updateSelector(serviceName, selector) {
        const getServiceResponse = await apiClient.readNamespacedService(serviceName, namespace);
        const service = getServiceResponse.body;
        service.spec.selector = selector;

        // Remove read only property to prevent api error.
        delete service.metadata.creationTimestamp;

        return apiClient.replaceNamespacedService(serviceName, namespace, service);
    },
};
