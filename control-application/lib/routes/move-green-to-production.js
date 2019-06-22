const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const greenYamlPath = path.join(__dirname, '../../../kubernetes/blue-green/green-production.yml');
    const updatedService = k8s.loadAllYaml(await readFile(greenYamlPath));

    const k8sServiceApi = kc.makeApiClient(k8s.CoreV1Api);
    try {
        const serviceUpdates = updatedService.map(service => k8sServiceApi.patchNamespacedService(
            service.metadata.name,
            'default',
            service,
            undefined,
            undefined,
            {
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
            }
        ));
        await Promise.all(serviceUpdates);
    } catch (error) {
        console.error(error);
    }

    res.send('');
};
