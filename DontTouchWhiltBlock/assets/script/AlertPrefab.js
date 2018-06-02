cc.Class({
    extends: cc.Component,

    properties: {
        recordLabel: cc.Label,
    },

    onLoad () {
        this.recordLabel.string = '记录：50.00s';
    },  

    initWithBtn (tipStr, restartCB, exitCB) {
        this.recordLabel.string = '记录：' + tipStr;
        this.restartCB = restartCB;
        this.exitCB = exitCB;
    },

    onButtonClick(event, customData) {
        switch (customData) {
            case 'restart':
                console.log('AlertPrefab >> line = 15 restart');
                if (this.restartCB) {
                    this.restartCB();
                }
                break;
            case 'exit':
                console.log('AlertPrefab >> line = 17 exit');
                if (this.exitCB) {
                    this.exitCB();
                }
                break;
        }
        this.node.destroy();
    }

});
