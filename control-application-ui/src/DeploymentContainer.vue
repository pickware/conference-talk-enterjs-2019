<template>
    <li>
        <strong>{{ container.name }}</strong>
        &ndash;
        {{ container.image }}
        <input type="text" v-model="image" />
        <button v-on:click="updateImage()">Update Image</button>
    </li>
</template>

<script>
    export default {
        name: 'DeploymentContainer',

        props: ['container', 'deploymentName'],
        data() {
            return {
                image: null,
            };
        },

        methods: {
            updateImage() {
                fetch(`/api/deployments/${this.deploymentName}/container/${this.container.name}/image/${this.image}`, {method: 'POST'});
            },
        }
    };
</script>

<style>
</style>
