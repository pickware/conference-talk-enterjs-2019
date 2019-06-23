<template>
    <div id="app">
        <h1>
            Kubernetes control application
        </h1>

        <div role="toolbar">
            <button
                v-on:click="createSimpleDeployment">
                Deploy Application
            </button>

            <button
                v-on:click="createGreenBlueDeployment">
                Create Blue-Green-Deployment
            </button>

            <button
                v-on:click="fetch('/prepare-canary-deployment', { method: 'POST' })">
                Prepare for canary deployment
            </button>

            <button
                v-on:click="fetch('/add-canary-deployment', { method: 'POST' })">
                Add canary deployment
            </button>
        </div>

        <div class="dashboard">
            <div class="deployments">
                <h2>Deployments</h2>
                <ol>
                    <deployment
                        v-for="deployment in dashboard.deployments"
                        v-bind:key="deployment.name"
                        v-bind:deployment="deployment"
                    ></deployment>
                </ol>
            </div>

            <div class="services">
                <h2>Services</h2>
                <ol>
                    <service
                        v-for="service in dashboard.services"
                        v-bind:key="service.name"
                        v-bind:service="service"
                    >
                    </service>
                </ol>
            </div>

            <div class="ingresses">
                <h2>Ingresses</h2>
                <ol>
                    <li v-for="ingress in dashboard.ingresses">
                        <strong>{{ ingress.name }}</strong>
                        <button v-on:click="deleteIngress(ingress)">Delete</button>
                        <ul>
                            <li v-for="host in ingress.hosts">
                                <a :href="`http://${host}/`" target="_blank">http://{{ host }}/</a>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    import Deployment from './Deployment.vue';
    import Service from './Service.vue';

    export default {
        name: 'app',

        components: {
            Deployment,
            Service,
        },

        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
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

            deleteIngress(ingress) {
                fetch(`/api/ingresses/${ingress.name}`, { method: 'DELETE' });
            },

            createSimpleDeployment() {
                fetch('/api/default-deployment', { method: 'POST' });
            },

            createGreenBlueDeployment() {
                fetch('/api/create-blue-green-deployment', { method: 'POST' });
            },
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    a {
        color: #42b983;
    }
</style>
