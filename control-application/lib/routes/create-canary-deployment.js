const {
    Deployment,
    DeploymentRepository,
    Ingress,
    IngressRepository,
    Service,
    ServiceRepository,
} = require('../kubernetes');

module.exports = async (req, res) => {
    const productionDeployment = new Deployment(
        'enterjs-production-deployment',
        {
            app: 'enterjs-production-pod', update: 'canary',
        },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    await DeploymentRepository.create(productionDeployment);
    const productionService = new Service(
        'enterjs-production-service',
        { app: 'enterjs-production-pod' },
        [8080]
    );
    await ServiceRepository.create(productionService);

    const stagingDeployment = new Deployment(
        'enterjs-staging-deployment',
        {
            app: 'enterjs-staging-pod', update: 'canary',
        },
        [{
            name: 'js-app',
            image: 'enterjs-app:v1',
            ports: [8080],
        }]
    );
    await DeploymentRepository.create(stagingDeployment);
    const stagingService = new Service(
        'enterjs-staging-service',
        { app: 'enterjs-staging-pod' },
        [8080]
    );
    await ServiceRepository.create(stagingService);

    const ingress = new Ingress(
        'enterjs-production-ingress',
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
    await IngressRepository.create(ingress);

    res.send('');
};
