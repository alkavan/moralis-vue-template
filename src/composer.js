const MoralisCompose = (function(moralis) {
    class Avatar extends moralis.Object {
        constructor() {
            super('Avatar');
        }
    }

    return {
        Avatar: Avatar
    }
});

export default MoralisCompose;
