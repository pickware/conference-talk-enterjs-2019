<template>
    <div class="deployment card bg-light p-2 mb-3">
        <div class="d-flex justify-content-start">
            <div class="mr-5">
                <h4 class="d-flex mb-0">
                    Deployment "{{ deployment.name }}"
                </h4>
                <div class="mb-2">
                    <span
                        v-for="templateLabel in templateLabels"
                        class="badge badge-primary">
                        {{ templateLabel }}
                    </span>
                    <span class="badge badge-info">{{ deployment.readyReplicas }} ready</span>
                    <span class="badge badge-success">{{ deployment.updatedReplicas }} updated</span>
                </div>
            </div>
        </div>
        <div class="deployment-header d-flex justify-content-start align-items-end">

            <div class="mb-2">
                <button
                    class="btn mb-1 btn-danger"
                    v-on:click="deleteDeployment(deployment)">
                    Delete
                </button>
            </div>

            <div class="ml-3 p-1 deployment-summary">
                <form class="form-inline" role="form">
                    <div class="form-group mb-2">
                        <label class="mr-2" v-bind:for="deployment.name + '_scale'">Scale:</label>
                        <input
                            class="form-control mr-2 w-25 text-right"
                            v-bind:id="deployment.name + '_scale'"
                            type="number"
                            v-model="scale"/>
                        <button class="btn btn-primary" v-on:click="scaleDeployment()">Scale</button>
                    </div>
                </form>
            </div>

            <div class="p-1 containers">
                <deployment-container
                    v-for="container in deployment.containers"
                    v-bind:key="container.name"
                    v-bind:container="container"
                    v-bind:deploymentName="deployment.name"/>
            </div>


        </div>
        <div class="pods d-flex align-items-start">
            <pod
                v-for="pod in deployment.pods"
                v-bind:key="pod.name"
                v-bind:pod="pod"/>
        </div>
        <br/>
    </div>
</template>

<script>
    import DeploymentContainer from './DeploymentContainer.vue';
    import Pod from './Pod.vue';

    export default {
        name: 'Deployment',

        components: {
            DeploymentContainer,
            Pod,
        },

        props: ['deployment'],

        data() {
            return {
                scale: this.deployment.scale,
            };
        },

        computed: {
            templateLabels: function () {
                const keys = Object.keys(this.deployment.templateLabels);

                return keys.map(labelKey => `${labelKey}=${this.deployment.templateLabels[labelKey]}`);
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
