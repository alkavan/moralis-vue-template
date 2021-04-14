<template>
    <div class="application-log">
        <pre v-for="message in log" v-bind:key="message">{{ message }}</pre>
    </div>
</template>

<script>
export default {
    name: "ApplicationLog",
    data() {
        return {
            log: []
        }
    },
    mounted() {
        this.emitter.on("add-log", message => {
            this.log.push(message);
        });
    }
}
</script>

<style scoped>

</style>
