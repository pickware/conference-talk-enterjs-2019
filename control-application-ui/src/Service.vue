<template>
    <li>
        <strong>{{ service.name }}</strong>
        <span v-if="service.selector">(selector: {{selector}})</span>
        <button v-on:click="deleteService(service)">Delete</button>
        <br />
        New selector:
        <input type="text" v-if="service.selector" v-model="newSelector" :placeholder="service.label" />
        <button v-if="service.selector" v-on:click="updateLabel()">Update Label</button>
    </li>
</template>

<script>
    export default {
        name: 'Service',

        props: ['service'],
        data() {
            return {
                newSelector: null,
            };
        },

        computed: {
            selector: function () {
                const keys = Object.keys(this.service.selector);

                let selector = '';
                keys.forEach(selectorKey => selector += `${selectorKey}=${this.service.selector[selectorKey]}`);

                return selector;
            },
        },

        methods: {
            deleteService() {
                fetch(`/api/services/${this.service.name}`, { method: 'DELETE' });
            },

            updateLabel() {
                fetch(`/api/services/${this.service.name}/selector/${this.newSelector}`, {method: 'POST'});
            },
        }
    };
</script>

<style>
</style>
