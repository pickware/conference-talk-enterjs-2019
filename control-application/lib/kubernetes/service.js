class Service {
    constructor(name, selectorLabels, ports) {
        this.name = name;
        this.selectorLabels = selectorLabels;
        const servicePorts = ports || [];
        this.ports = servicePorts.map(port => ({
            protocol: 'TCP',
            port,
            targetPort: port,
        }));

        this.namespace = 'default';
    }

    getSpec() {
        return {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: {
                name: this.name,
            },
            spec: {
                selector: this.selectorLabels,
                ports: this.ports,
            },
        };
    }
}

module.exports = Service;
