<template>
    <div>
        <h2 class="text-xl my-3">Generated Avatars</h2>
        <ul>
            <li v-for="avatar in avatars" v-bind:key="avatar.id" class="cursor-pointer bg-blue-100 p-2 hover:bg-blue-200" @click.stop="avatarClick">
                <span v-html="avatar.get('svg')" class="inline-block align-middle" style="width: 32px; height: 32px;"></span>&nbsp;
                <span class="align-middle">{{avatar.id}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    name: "AvatarList",
    data: function() {
        return {
            avatars: [],
        }
    },
    beforeMount() {
        this.emitter.on("avatar-saved", (avatar) => {
            this.avatars.push(avatar)
        })

        this.emitter.on("user-login", (user) => {
            this.fetchAvatars(user)
        })

        this.emitter.on("user-logout", () => {
            this.avatars = []
        })
    },
    mounted() {
        let user = this.moralis.User.current()
        if(user) {
            this.fetchAvatars(user)
        }
    },
    methods: {
        async queryAvatars(user) {
            const Avatar = this.moralisCompose(this.moralis).Avatar
            const query = new this.moralis.Query(Avatar)
            query.equalTo("owner", user)
            return await query.find()
        },
        fetchAvatars(user) {
            this.queryAvatars(user).then((avatars) => {
                this.avatars = avatars
            })
        },
        avatarClick(event) {
            console.log(event.target)
            let svg = $(event.target).find('svg').first()
            this.emitter.emit('avatar-clicked', svg.html())
        }
    }
}
</script>

<style scoped>

</style>
