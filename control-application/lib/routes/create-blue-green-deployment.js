const {
    Deployment,
    DeploymentRepository,
    Ingress,
    IngressRepository,
    Service,
    ServiceRepository,
} = require('../kubernetes');

module.exports = async (req, res) => {
    const promises = [];

    // Create deployments
    const blueDeployment = new Deployment(
        'enterjs-blue-deployment',
        { app: 'enterjs-blue-pod' },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    const greenDeployment = new Deployment(
        'enterjs-green-deployment',
        { app: 'enterjs-green-pod' },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    promises.push(DeploymentRepository.create(blueDeployment));
    promises.push(DeploymentRepository.create(greenDeployment));

    // Create Service
    const productionService = new Service(
        'enterjs-production-service',
        { app: 'enterjs-blue-pod' },
        [8080]
    );
    const stagingService = new Service(
        'enterjs-staging-service',
        { app: 'enterjs-green-pod' },
        [8080]
    );
    promises.push(ServiceRepository.create(productionService));
    promises.push(ServiceRepository.create(stagingService));

    // Create ingress
    const ingress = new Ingress(
        'enterjs-blue-green-ingress',
        [{
            host: 'production.enterjs.test',
            serviceName: 'enterjs-production-service',
            port: 8080,
        }, {
            host: 'staging.enterjs.test',
            serviceName: 'enterjs-staging-service',
            port: 8080,
        }]
    );
    promises.push(IngressRepository.create(ingress));

    await Promise.all(promises);
    res.send('');
};
