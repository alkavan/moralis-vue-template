import {createApp} from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import './index.css'

import MoralisFactory from './moralis'
import MoralisCompose from './composer'

import Avatars from '@dicebear/avatars';
import SpriteCollection from '@dicebear/avatars-bottts-sprites';

const app = createApp(App)

app.provide('event-bus', mitt())
app.provide('moralis', MoralisFactory.getInstance())

const avatars = new Avatars(SpriteCollection);
app.provide('avatars', avatars)

// Here we provide a way for all components to access moralis
app.mixin({
    inject: {
        moralis: {
            from: 'moralis'
        },
        emitter: {
            from: 'event-bus'
        },
    },
    methods: {
        moralisCompose(molaris) {
            return MoralisCompose(molaris);
        }
    }
});

app.mount('#app');
