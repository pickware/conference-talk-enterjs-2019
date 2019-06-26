<template>
    <div class="ingress card p-2">
        <div class="d-flex align-items-end justify-items-between mb-2">
            <h5>{{ ingress.name }}</h5>
            <button class="ml-3 btn btn-danger" v-on:click="deleteIngress(service)">Delete</button>
        </div>

        <ul>
            <li v-for="host in ingress.hosts">
                <a :href="`http://${host}/`" target="_blank">http://{{ host }}/</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Service',

        props: ['ingress'],

        data() {
            return {};
        },

        methods: {
            deleteIngress(ingress) {
                fetch(`/api/ingresses/${ingress.name}`, { method: 'DELETE' });
            },
        }
    };
</script>

<style>
    .ingress {
        margin-top: 4px;
        margin-right: 4px;
    }

    .ingress:last-child {
        margin-right: 0;
    }
</style>
