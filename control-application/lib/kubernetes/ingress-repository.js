const apiClient = require('./api-clients').extensionsV1beta1Api;

const namespace = 'default';

module.exports = {
    async create(ingress) {
        return apiClient.createNamespacedIngress(namespace, ingress.getSpec());
    },
    async delete(ingressName) {
        return apiClient.deleteNamespacedIngress(ingressName, namespace);
    },
};
