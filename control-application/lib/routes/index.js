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

</html>
`;

module.exports = async (req, res) => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.Core_v1Api);

    const podListResponse = await k8sApi.listNamespacedPod('default');

    const pods = podListResponse.body.items.map((pod, index) => ({
        number: index + 1,
        name: pod.metadata.name,
    }));

    res.send(indexTemplate(pods));
};
