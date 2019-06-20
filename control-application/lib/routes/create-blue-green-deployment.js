const k8s = require('@kubernetes/client-node');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const deployApplication = async (yamlPath) => {
    const fileContents = await readFile(yamlPath);
    const elements = k8s.loadAllYaml(fileContents);

    let deployment;
    let service;
    elements.forEach((element) => {
        if (element.kind === 'Deployment') {
            deployment = element;
        } else {
            service = element;
        }
    });

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sServiceApi = kc.makeApiClient(k8s.CoreV1Api);
    const k8sDeploymentApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    try {
        await k8sServiceApi.createNamespacedService('default', service);
    } catch (error) {
        console.error(error);
    }

    try {
        await k8sDeploymentApi.createNamespacedDeployment('default', deployment);
    } catch (error) {
        console.log(error);
    }
};

const deployIngress = async (yamlPath) => {
    const fileContents = await readFile(yamlPath);
    const ingress = k8s.loadYaml(fileContents);

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sIngressApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    try {
        await k8sIngressApi.createNamespacedIngress('default', ingress);
    } catch (error) {
        console.log(error);
    }
};

module.exports = async (req, res) => {
    const greenYamlPath = path.join(__dirname, '../../../kubernetes/blue-green/green.yml');
    await deployApplication(greenYamlPath);

    const blueYamlPath = path.join(__dirname, '../../../kubernetes/blue-green/blue.yml');
    await deployApplication(blueYamlPath);

    const ingressYamlPath = path.join(__dirname, '../../../kubernetes/blue-green/ingress.yml');
    await deployIngress(ingressYamlPath);

    res.send('');
};
