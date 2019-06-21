const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
    const yamlPath = path.join(__dirname, '../../../kubernetes/canary/canary-deployment.yml');
    const fileContents = await readFile(yamlPath);
    const deployment = k8s.loadYaml(fileContents);

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sDeploymentApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    try {
        await k8sDeploymentApi.createNamespacedDeployment('default', deployment);
    } catch (error) {
        console.error(error);
    }

    res.send('');
};
