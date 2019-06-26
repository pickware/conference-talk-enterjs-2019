<template>
    <div class="service card p-2">
        <div class="d-flex align-items-end justify-content-between mb-2">
            <h5>{{ service.name }}</h5>
            <button class="ml-3 btn btn-danger" v-on:click="deleteService(service)">Delete</button>
        </div>

        <form class="form-inline " role="form">
            <div class="form-group mb-2">
                <label class="mr-2" v-bind:for="service.name + '_selector'">Selector:</label>
                <input
                    class="form-control mr-2"
                    v-bind:id="service.name + '_selector'"
                    type="text"
                    v-model="newSelector"
                    :placeholder="service.label"/>

                <button class="btn btn-primary" v-on:click="updateLabel()">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    function computeSelector(service) {
        const keys = Object.keys(service.selector);

        let selector = '';
        keys.forEach(selectorKey => selector += `${selectorKey}=${service.selector[selectorKey]}`);

        return selector;
    }

    export default {
        name: 'Service',

        props: ['service'],
        data() {
            return {
                newSelector: computeSelector(this.service) || ''
            };
        },

        computed: {
            selector: function () {
                return computeSelector(this.service);
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
    .service {
        margin-top: 4px;
        margin-right: 4px;
    }

    .service:last-child {
        margin-right: 0;
    }
</style>
