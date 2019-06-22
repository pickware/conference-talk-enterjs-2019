const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
    const yamlPath = path.join(__dirname, '../../../kubernetes/canary/scale-canary-deployment-up.yml');
    const fileContents = await readFile(yamlPath);
    const elements = k8s.loadAllYaml(fileContents);

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sDeploymentApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    for (let i = 0; i < elements.length; i += 1) {
        const deployment = elements[i];
        try {
            // eslint-disable-next-line no-await-in-loop
            await k8sDeploymentApi.replaceNamespacedDeployment(
                deployment.metadata.name,
                'default',
                deployment
            );
        } catch (error) {
            console.error(error);
        }
    }

    res.send('');
};
