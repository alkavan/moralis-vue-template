# Moralis Application Template for Vue.js and TailwindCSS

This is a basic [Vue.js](https://vuejs.org/) v3.0 template
for the [Moralis](https://moralis.io/) web3 application development platform.

## Components
This project utilizes libraries and tools that are quite useful
when developing web and blockchain applications.

* [Hardhat](https://hardhat.org/) used a local development environment for Ethereum.
* [Vue.js](https://vuejs.org/) v3.0 used as frontend application framework.
* [tailwindcss](https://tailwindcss.com/) v2.0 used as CSS framework.
* [mitt](https://www.npmjs.com/package/mitt) is used a global event bus for Vue.

To run the Hardhat development server in node mode:
```
npm run hardhat-node
```

To start the web application:
```
npm run serve
```

The `dotenv` package is used to load environment variables from `.env` files.
The package comes as a dependency of Vue. You don't want to commit your secret variables
by mistake, so I recommend doing this:
```
cp .env .env.local
```
Then update your variables in `.env.local` it has higher priority than the `.env` file.
The `.env.local` file will also be ignored by git.

The moralis instance in injected into the Vue application globally using `mixin()`.
So it will be available for all components automatically and accessed with `this.moralis`.

The `mitt` based global event bus is also available in similar manner via `this.emitter`.

Remember that Vue also have its own event system,
and you should use the global event bus only for scenarios when two unrelated
components need to share state, or for non-vue objects.

On another note, you might be asking wtf is `composer.js`?
well that's just a place to store moralis object definitions outside the Vue application.
I don't feel comfortable placing this logic inside the components files.
However, I'm also not very happy with the current situation,
and you're welcome to make suggestions via pull requests on github.

I included `MoralisLogin` component as example for login/logout logic.
This package is published under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license,
however contribution of more Moralis based components is more than welcome!

The `@dicebear/avatars` and `@dicebear/avatars-bottts-sprites` packages are used only for this example
application and are probably not really needed for you. You can just remove them:
```
npm remove @dicebear/avatars @dicebear/avatars-bottts-sprites
```

Also, the `AvatarGenerator.vue`, `AvatarList.vue` component files and their usage in `App.vue`.

