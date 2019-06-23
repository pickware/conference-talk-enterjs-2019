<template>
    <li>
        Deployment
        <strong>{{ deployment.name }}</strong>
        (label: {{ deployment.appLabel }},
        ready: {{ deployment.readyReplicas }},
        updated: {{ deployment.updatedReplicas }})
        <button v-on:click="deleteDeployment(deployment)">Delete</button>
        <br/>
        Scale: <input type="number" :placeholder=deployment.scale v-model="scale" />
        <button v-on:click="scaleDeployment()">Update</button>
        <br/>
        <br/>
        <strong>Pods:</strong>
        <ol>
            <li v-for="pod in deployment.pods">
                <strong>{{ pod.status }}</strong>
                &ndash;
                {{ pod.name }}
            </li>

        </ol>
    </li>
</template>

<script>
    export default {
        name: 'Deployment',

        props: ['deployment'],
        data() {
            return {
                scale: null,
            };
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
</style>
