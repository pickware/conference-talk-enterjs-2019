<template>
    <div class="pod card p-1">
        <div class="pod-name">{{ pod.name }}</div>
        <span
            v-bind:class="{
                'badge-success': pod.status === 'Running',
                'badge-danger': pod.status === 'Terminating',
                'badge-warning': pod.status === 'Pending',
            }"
            class="badge badge-success my-1">{{ pod.status }}</span>
        <span
            class="badge"
            v-bind:class="{ 'badge-danger': pod.numErrors > 0, 'badge-success': pod.numErrors < 1}"
            v-on:click="showLogs = !showLogs">
            {{ pod.numErrors }} errors
        </span>
        <!-- TODO this is fugly -->
        <div v-if="showLogs" class="logs">
            <span v-for="line in pod.logLines">
                {{ line.replace('    ', '&nbsp;&nbsp;&nbsp;&nbsp;') }}<br />
            </span>
        </div>
    </div>
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

    .pod-name {
        font-weight: normal;
        font-size: 80%;
        word-break: break-all;
    }

    .pod {
        margin-top: 4px;
        margin-right: 4px;
    }

    .pod:last-child {
        margin-right: 0;
    }
</style>
