const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

module.exports = {
    coreV1Api: kc.makeApiClient(k8s.CoreV1Api),
    extensionsV1beta1Api: kc.makeApiClient(k8s.ExtensionsV1beta1Api),
};
