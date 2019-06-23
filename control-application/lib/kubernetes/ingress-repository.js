const apiClient = require('./api-clients').extensionsV1beta1Api;

const namespace = 'default';

module.exports = {
    create: async ingress => apiClient.createNamespacedIngress(namespace, ingress.getSpec()),
    delete: async ingressName => apiClient.deleteNamespacedIngress(ingressName, namespace),
};
