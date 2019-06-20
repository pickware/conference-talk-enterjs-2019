const fs = require('fs');
const util = require('util');
const k8s = require('@kubernetes/client-node');

const readFile = util.promisify(fs.readFile);

module.exports = async () => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sExtensionsApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

    // Create deployment
    const deployment = k8s.loadYaml(await readFile('../kubernetes/deployment.yml'));
    await k8sExtensionsApi.createNamespacedDeployment('default', deployment);

    // Create ingress
    const ingress = k8s.loadYaml(await readFile('../kubernetes/ingress.yml'));
    await k8sExtensionsApi.createNamespacedIngress('default', ingress);

    // Create Service
    const service = k8s.loadYaml(await readFile('../kubernetes/service.yml'));
    await k8sCoreApi.createNamespacedService('default', service);
};
