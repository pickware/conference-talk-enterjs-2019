const k8s = require('@kubernetes/client-node');

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sExtensionsApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    await k8sExtensionsApi.deleteNamespacedIngress(req.params.name, 'default');

    res.send('');
};
