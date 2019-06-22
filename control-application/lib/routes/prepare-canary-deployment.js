const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
    const yamlPath = path.join(__dirname, '../../../kubernetes/canary/application-v1.yml');
    const fileContents = await readFile(yamlPath);
    const elements = k8s.loadAllYaml(fileContents);

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sServiceApi = kc.makeApiClient(k8s.CoreV1Api);
    const k8sDeploymentAndIngressApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    const k8sApiRequests = elements.forEach(async (element) => {
        if (element.kind === 'Deployment') {
            try {
                return k8sDeploymentAndIngressApi.createNamespacedDeployment('default', element);
            } catch (error) {
                console.error(error);
            }
        } else if (element.kind === 'Service') {
            try {
                return k8sServiceApi.createNamespacedService('default', element);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                return k8sDeploymentAndIngressApi.createNamespacedIngress('default', element);
            } catch (error) {
                console.error(error);
            }
        }

        return null;
    });
    await Promise.all(k8sApiRequests);

    res.send('');
};
