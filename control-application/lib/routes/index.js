const k8s = require('@kubernetes/client-node');

const indexTemplate = pods => `
<!DOCTYPE html>
<html>

<head>
    <title>Control application</title>
</head>

<h1>
    Kubernetes control application
</h1>

<ol>
    ${pods.map(pod => `<li>${pod.name}</li>`).join('\n')}
</ol>

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
    Update Blue-Green-Deployment to bugfree version
</button>

<script type="text/javascript">
    setInterval(() => window.location.reload(), 1000);
</script>

</html>
`;

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    const podListResponse = await k8sApi.listNamespacedPod('default');

    const pods = podListResponse.body.items.map((pod, index) => ({
        number: index + 1,
        name: pod.metadata.name,
    }));

    res.send(indexTemplate(pods));
};
