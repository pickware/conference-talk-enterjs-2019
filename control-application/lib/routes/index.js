const k8s = require('@kubernetes/client-node');

const ingressTemplate = ({ name, hosts }) => {
    let hostsPart = 'ingress is not up yet.';
    if (hosts) {
        hostsPart = `
<ul>
    ${hosts
        .map(host => `<li><a href="http://${host}/" target="_blank">http://${host}/</a></li>`)
        .join('\n')}
</ul>
`;
    }

    return `
<li>
    <strong>${name}</strong>
    ${hostsPart}
</li>`;
};

const deploymentTemplate = ({ name, appLabel, readyReplicas, updatedReplicas, pods }) => {
    const podsPart = `
<strong>Pods:</strong>
<ol>

    ${pods.map(pod => `<li><strong>${pod.status}</strong> &ndash; ${pod.name}</li>`).join('\n')}
</ol>
`;

    return `
<li>
    <strong>${name}</strong> (label: ${appLabel}, ready: ${readyReplicas}, updated: ${updatedReplicas})<br/>
    ${podsPart}
</li>`;
};

const indexTemplate = ({ services, ingresses, deployments }) => `
<!DOCTYPE html>
<html>

<head>
    <title>Control application</title>
</head>

<h1>
    Kubernetes control application
</h1>

<div>
    <button
        onclick="javascript:fetch('/default-deployment', { method: 'POST' })">
        Deploy Application
    </button>

    <button
        onclick="javascript:fetch('/create-blue-green-deployment', { method: 'POST' })">
        Create Blue-Green-Deployment
    </button>

    <button
        onclick="javascript:fetch('/fix-blue-green-bug', { method: 'POST' })">
        Update Blue-Green-Deployment to Bugfree Version
    </button>

    <button
        onclick="javascript:fetch('/move-green-to-production', { method: 'POST' })">
        Move Green to Production
    </button>
</div>

<h2>Deployments</h2>

<ol>
    ${deployments.map(deploymentTemplate).join('\n')}
</ol>

<h2>Services</h2>

<ol>
    ${services.map(service => `
        <li>
            <strong>${service.name}</strong> 
            ${service.appLabel ? `(label: ${service.appLabel})` : ''}
        </li>
    `).join('\n')}
</ol>

<h2>Ingresses</h2>

<ol>
    ${ingresses.map(ingressTemplate).join('\n')}
</ol>

<script type="text/javascript">
    setInterval(() => window.location.reload(), 5000);
</script>

</html>
`;

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

    res.send(indexTemplate({
        services,
        ingresses,
        deployments,
    }));
};
