const k8s = require('@kubernetes/client-node');

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

    await k8sCoreApi.deleteNamespacedService(req.params.name, 'default');

    res.send('');
};
