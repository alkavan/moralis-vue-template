<template>
<!--    <div class="container pt-5">-->
    <div class="container flex justify-center items-start flex-col items-center pt-5">
        <h1 class="text-2xl mb-3">Moralis Vue Project Template</h1>
        <div class="grid grid-cols-12 gap-0 w-1/2">
            <div class="col-span-4">
                <moralis-login></moralis-login>
                <avatar-list></avatar-list>
            </div>
            <div class="col-span-8">
                <avatar-generator></avatar-generator>
            </div>
            <div class="col-span-full">
                <h2 class="text-xl mt-3">Application Log</h2>
                <application-log></application-log>
            </div>
        </div>
    </div>
</template>

<script>
import MoralisLogin from "@/components/MoralisLogin";
import ApplicationLog from "@/components/ApplicationLog";
import AvatarGenerator from "@/components/AvatarGenerator";
import AvatarList from "@/components/AvatarList";

export default {
    name: 'App',
    components: {
        AvatarList,
        AvatarGenerator,
        MoralisLogin,
        ApplicationLog,
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
