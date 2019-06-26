<template>
    <div class="card p-1 bg-light">
        <h6 class="container-head">
            Container "{{ container.name }}"
        </h6>
        <form class="form-inline">
            <div class="form-group mb-1">
                <label class="mr-2" v-bind:for="container.name + '_image'">Image:</label>
                <input
                    class="form-control mr-2"
                    v-bind:id="container.name + '_image'"
                    type="text" v-model="image" />
                <button class="btn btn-primary" v-on:click="updateImage()">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'DeploymentContainer',

        props: ['container', 'deploymentName'],
        data() {
            return {
                image: this.container.image,
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
    .pod {
        font-size: 125%;
    }
</style>
