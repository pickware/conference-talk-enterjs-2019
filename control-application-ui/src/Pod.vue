<template>
    <li>
        <strong>{{ pod.status }}</strong>
        &ndash;
        {{ pod.name }}
        (Errors:
        <span
            class="error-count"
            v-bind:class="{ 'has-errors': pod.numErrors > 0 }"
            v-on:click="showLogs = !showLogs">
            {{ pod.numErrors }}
        </span>)
        <div v-if="showLogs" class="logs">
            <span v-for="line in pod.logLines">
                {{ line.replace('    ', '&nbsp;&nbsp;&nbsp;&nbsp;') }}<br />
            </span>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'Pod',

        props: ['pod'],

        data() {
            return {
                showLogs: false,
            };
        },
    };
</script>

<style>
.logs {
    height: 400px;
    overflow: scroll;
    margin: 5px 0px;
    padding: 10px;
    border: 1px solid #2c3e50;
}
</style>
