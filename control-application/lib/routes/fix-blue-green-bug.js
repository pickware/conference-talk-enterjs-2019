const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const greenYamlPath = path.join(__dirname, '../../../kubernetes/blue-green/green-v3.yml');
    const updatedDeployment = k8s.loadYaml(await readFile(greenYamlPath));

    const k8sDeploymentApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    try {
        await k8sDeploymentApi.replaceNamespacedDeployment(
            updatedDeployment.metadata.name,
            'default',
            updatedDeployment
        );
    } catch (error) {
        console.error(error);
    }

    res.send('');
};
