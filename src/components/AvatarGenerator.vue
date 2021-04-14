<template>
    <div>
        <div class="flex justify-center items-center flex-col">
            <div class="py-2">
                <label for="seedInput" class="inline-block mr-1">Seed:</label>
                <input v-model="seed" type="text" id="seedInput" class="border p-1">
            </div>
            <div>
                <button class="bg-blue-500 p-2" @click="newAvatar">Generate Avatar</button>
                <button class="bg-green-500 p-2 ml-2" @click="saveAvatar" :disabled="!user">Save Avatar</button>
            </div>
        </div>
        <div v-if="svg">
            <h2 class="text-2xl font-bold text-center my-3">Avatar</h2>
            <div v-html="svg"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AvatarGenerator",
    inject: {
        avatars: {
            from: "avatars"
        }
    },
    data: function () {
        return {
            avatar: null,
            seed: "HackThePlanet",
            user: this.moralis.User.current(),
            svg: null,
        }
    },
    mounted() {
        this.emitter.on("user-login", (user) => {
            this.user = user
        })

        this.emitter.on("user-logout", () => {
            this.user = null
            this.avatar = null
            this.svg = null
        })

        this.emitter.on("avatar-clicked", (svg) => {
            this.avatar = null
            this.svg = `<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" fill="none">${svg}</svg>`

        })
    },
    methods: {
        newAvatar() {
            if(this.seed.length === 0) {
                this.emitter.emit('add-log', `Unable to generate avatar, seed is empty!`)
                return
            }

            const svg = this.avatars.create(this.seed);
            const Avatar = this.moralisCompose(this.moralis).Avatar
            let avatar = new Avatar()
            avatar.set('owner', this.user)
            avatar.set('svg',  svg)
            this.avatar = avatar
            this.svg = svg
        },

        saveAvatar() {
            if(this.avatar.id) {
                this.emitter.emit('add-log', `This avatar already been saved and has ID: ${this.avatar.id}`)
                return
            }
            this.avatar.save(null, {cascadeSave: false}).then((avatar) => {
                this.emitter.emit('avatar-saved', avatar)
                this.emitter.emit('add-log', `New avatar created with ID: ${avatar.id}`)
            })
        },
    }
}
</script>

<style scoped>

</style>
