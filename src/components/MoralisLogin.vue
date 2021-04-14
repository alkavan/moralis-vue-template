<template>
    <div v-if="currentUser">Connected ... {{currentUser.id}}</div>
    <div>
        <button class="bg-blue-500 p-2" @click="doLogin" v-if="!currentUser">Login</button>
        <button class="bg-yellow-500 p-2" @click="doLogout" v-if="currentUser">Logout</button>
    </div>
</template>

<script>
export default {
    name: "MoralisLogin",
    data: function () {
        return {
            currentUser: null
        }
    },
    beforeMount() {
        this.currentUser = this.moralis.User.current();
    },
    methods: {
        async doLogin() {
            try {
                let user = await this.moralis.Web3.authenticate();
                this.currentUser = user;
                this.emitter.emit('user-login', user);
                this.emitter.emit('add-log', `user ${user.id} logged in`);
            } catch (error) {
                console.log(error);
            }
        },

        doLogout() {
            if(!this.currentUser) {
                return;
            }

            let userId = this.currentUser.id;
            this.moralis.User.logOut().then(() => {
                this.currentUser = this.moralis.User.current();  // this will now be null
                this.emitter.emit('user-logout');
                this.emitter.emit('add-log', `user ${userId} logged out`);
            });
        }
    }
}
</script>

<style scoped>

</style>
