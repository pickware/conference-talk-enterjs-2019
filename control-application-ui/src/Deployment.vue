<template>
    <li>
        Deployment
        <strong>{{ deployment.name }}</strong>
        (template labels: {{ templateLabels }},
        ready: {{ deployment.readyReplicas }},
        updated: {{ deployment.updatedReplicas }})
        <button v-on:click="deleteDeployment(deployment)">Delete</button>
        <br/>
        Scale: <input type="number" :placeholder=deployment.scale v-model="scale" />
        <button v-on:click="scaleDeployment()">Update</button>
        <br/>
        <br/>
        <strong>Containers:</strong>
        <ol>
            <deployment-container
                v-for="container in deployment.containers"
                v-bind:key="container.name"
                v-bind:container="container"
                v-bind:deploymentName="deployment.name"
            >
            </deployment-container>
        </ol>
        <br/>
        <strong>Pods:</strong>
        <ol>
            <li v-for="pod in deployment.pods">
                <strong>{{ pod.status }}</strong>
                &ndash;
                {{ pod.name }}
                (Errors:
                <span
                    class="error-count"
                    v-bind:class="{ 'has-errors': pod.numErrors > 0 }">
                    {{ pod.numErrors }}</span>)
            </li>
        </ol>
        <br/>
    </li>
</template>

<script>
    import DeploymentContainer from './DeploymentContainer.vue';

    export default {
        name: 'Deployment',

        components: {
            DeploymentContainer,
        },

        props: ['deployment'],
        data() {
            return {
                scale: null,
            };
        },

        computed: {
            templateLabels: function () {
                const keys = Object.keys(this.deployment.templateLabels);

                return keys.map(labelKey => `${labelKey}=${this.deployment.templateLabels[labelKey]}`).join(' ');
            },
        },

        methods: {
            deleteDeployment() {
                fetch(`/api/deployments/${this.deployment.name}`, { method: 'DELETE' });
            },

            scaleDeployment() {
                fetch(`/api/deployments/${this.deployment.name}/scale/${this.scale}`, {method: 'POST'});
            },
        }
    };
</script>

<style>
    .error-count {
        font-weight: bold;
        color: green;
    }

    .has-errors {
        color: red;
    }
</style>
