cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },

    onButtonClick (event, customData) {
        switch (customData) {
            case 'setting':
                console.log('menu >> line = 15 setting');
                break;
            case 'count':
                cc.director.loadScene("Game2");
                break;
            case 'time':
                cc.director.loadScene("Game");
                break;
            case 'exit':
                console.log('menu >> line = 21 exit');
                break;
        }
    }
});
