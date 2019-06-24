const {
    Deployment,
    DeploymentRepository,
    Ingress,
    IngressRepository,
    Service,
    ServiceRepository,
} = require('../kubernetes');

module.exports = async (req, res) => {
    const v1Deployment = new Deployment(
        'enterjs-v1-deployment',
        {
            app: 'enterjs-v1-pod', environment: 'production',
        },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    await DeploymentRepository.create(v1Deployment);
    const service = new Service(
        'enterjs-v1-service',
        { app: 'enterjs-v1-pod' },
        [8080]
    );
    await ServiceRepository.create(service);

    const newDeployment = new Deployment(
        'enterjs-canary-deployment',
        {
            app: 'enterjs-canary-pod', environment: 'production',
        },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    await DeploymentRepository.create(newDeployment);

    const ingress = new Ingress(
        'enterjs-v1-ingress',
        [{
            host: 'production.enterjs.test',
            serviceName: 'enterjs-v1-service',
            port: 8080,
        }]
    );
    await IngressRepository.create(ingress);

    res.send('');
};
