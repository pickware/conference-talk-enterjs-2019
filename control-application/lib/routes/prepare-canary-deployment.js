const {
    Deployment,
    DeploymentRepository,
    Ingress,
    IngressRepository,
    Service,
    ServiceRepository,
} = require('../kubernetes');

module.exports = async (req, res) => {
    // Create deployment
    const deployment = new Deployment(
        'enterjs-v1-deployment',
        { app: 'enterjs-production-pod' },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    await DeploymentRepository.create(deployment);

    // Create Service
    const service = new Service(
        'enterjs-production-service',
        { app: 'enterjs-production-pod' },
        [8080]
    );
    await ServiceRepository.create(service);

    // Create ingress
    const ingress = new Ingress(
        'enterjs-production-ingress',
        [{
            host: 'production.enterjs.test',
            serviceName: 'enterjs-production-service',
            port: 8080,
        }]
    );
    await IngressRepository.create(ingress);

    res.send('');
};
