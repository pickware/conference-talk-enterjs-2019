<template>
    <div id="app" class="container-fluid d-flex flex-column">
        <div class="p-4 text-center">
            <h1 class="text-center">
                Kubernetes control application
            </h1>
        </div>

        <div role="toolbar" class="px-4">
            <button
                class="btn btn-light"
                v-on:click="createSimpleDeployment">
                Deploy Application
            </button>

            <button
                class="btn btn-light"
                v-on:click="createGreenBlueDeployment">
                Create Blue-Green-Deployment
            </button>

            <button
                class="btn btn-light"
                v-on:click="createCanaryDeployment">
                Create canary deployment
            </button>
        </div>


        <div class="dashboard p-4">
            <div class="deployments">
                <deployment
                    v-for="deployment in dashboard.deployments"
                    v-bind:key="deployment.name"
                    v-bind:deployment="deployment"/>
            </div>

            <div class="services d-flex mb-3">
                <service
                    v-for="service in dashboard.services"
                    v-bind:key="service.name"
                    v-bind:service="service"/>
            </div>

            <div class="ingresses d-flex">
                <ingress
                    v-for="ingress in dashboard.ingresses"
                    v-bind:key="ingress.name"
                    v-bind:ingress="ingress"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Deployment from './Deployment.vue';
    import Service from './Service.vue';
    import Ingress from './Ingress.vue';

    export default {
        name: 'app',

        components: {
            Deployment,
            Service,
            Ingress,
        },

        data() {
            return {
                dashboard: {},
            };
        },

        mounted() {
            this.refreshDashboard().then( () => {
                setInterval(() => this.refreshDashboard(), 500);
            });
        },

        methods: {
            refreshDashboard() {
                return fetch('/api/dashboard').then(response => response.json()).then((result) => {
                    this.dashboard = result;
                });
            },

            createSimpleDeployment() {
                fetch('/api/default-deployment', { method: 'POST' });
            },

            createGreenBlueDeployment() {
                fetch('/api/create-blue-green-deployment', { method: 'POST' });
            },

            createCanaryDeployment() {
                fetch('/api/create-canary-deployment', { method: 'POST' });
            },
        }
    };
</script>

<style>
    .deployments,.services,.ingresses {
    }
</style>
