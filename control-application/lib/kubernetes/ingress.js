class Ingress {
    constructor(name, rules) {
        this.name = name;
        this.rules = rules;

        this.namespace = 'default';
    }

    getSpec() {
        return {
            apiVersion: 'extensions/v1beta1',
            kind: 'Ingress',
            metadata: {
                name: this.name,
                annotations: {
                    'nginx.ingress.kubernetes.io/rewrite-target': '/',
                    'nginx.ingress.kubernetes.io/ssl-redirect': 'false',
                },
            },
            spec: {
                rules: this.rules.map(rule => ({
                    host: rule.host,
                    http: {
                        paths: [{
                            path: '/*',
                            backend: {
                                serviceName: rule.serviceName,
                                servicePort: rule.port,
                            },
                        }],
                    },
                })),
            },
        };
    }
}

module.exports = Ingress;
