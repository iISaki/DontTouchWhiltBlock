cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
    },

    onLoad: function () {
        this.Blocks = [];
        this.lineIndex = 0;
    },

    initWithData: function (blockColor, size, labelStr, fontSize, textColor) {
        this.node.color = blockColor;
        this.node.setContentSize(size);
        this.label.string = labelStr;
        this.label.fontSize = fontSize;
    },
    
    createBlock: function (blockColor, size, labelStr, fontSize, textColor) {
        this.initWithData(blockColor, size, labelStr, fontSize, textColor);
        return this.node;
    },

    removeBlock: function () {
        this.node.removeFromParent();
    },

    getLineIndex: function () {
        return this.lineIndex;
    },

    setLineIndex: function (index) {
        this.lineIndex = index;
    },

    moveDown: function() {
        this.lineIndex --;
        let visibleSize = cc.director.getVisibleSize();
        let move = cc.moveBy(0.1,cc.p(0, -visibleSize.height / 4));
        this.node.runAction(cc.sequence(move, cc.callFunc(()=>{
            if (this.lineIndex < 0 ) {
                this.removeBlock();
            }
        })));
    },

    moveDownType: function () {
        this.lineIndex --;
        if (this.lineIndex < 0) {
            this.removeBlock();
        }
    },
});
