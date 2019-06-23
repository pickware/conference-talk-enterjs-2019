const k8s = require('@kubernetes/client-node');

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
    const k8sExtensionsApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

    const podListResponse = await k8sCoreApi.listNamespacedPod('default');

    const pods = podListResponse.body.items.map(pod => ({
        name: pod.metadata.name,
        status: pod.status.phase,
        label: pod.metadata.labels.app,
    }));

    const deploymentsResponse = await k8sExtensionsApi.listNamespacedDeployment('default');
    const deployments = deploymentsResponse.body.items.map(deployment => ({
        name: deployment.metadata.name,
        readyReplicas: deployment.status.readyReplicas,
        updatedReplicas: deployment.status.updatedReplicas,
        appLabel: deployment.metadata.labels.app,
        pods: pods.filter(pod => pod.label === deployment.spec.selector.matchLabels.app),
    }));

    const servicesResponse = await k8sCoreApi.listNamespacedService('default');
    const services = servicesResponse.body.items.map(service => ({
        name: service.metadata.name,
        appLabel: service.spec.selector && service.spec.selector.app,
    }));

    const ingressesResponse = await k8sExtensionsApi.listNamespacedIngress('default');
    const ingresses = ingressesResponse.body.items.map((ingress) => {
        let ip;
        if (ingress.status.loadBalancer.ingress && ingress.status.loadBalancer.ingress[0]) {
            ip = ingress.status.loadBalancer.ingress[0].ip;
        }

        let hosts = [];
        if (ip) {
            hosts = ingress.spec.rules.map(rule => rule.host).filter(host => host);
            if (hosts.length === 0) {
                hosts = [ip];
            }
        }

        return {
            name: ingress.metadata.name,
            hosts,
        };
    });

    res.json({
        deployments,
        services,
        ingresses,
    });
};
