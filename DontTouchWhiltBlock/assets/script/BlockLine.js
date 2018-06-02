cc.Class({
    extends: cc.Component,

    properties: {
        block: cc.Prefab,
        timeLabel: cc.Label,
        alertPrefab: cc.Prefab,
    },
    
    // use this for initialization
    onLoad: function () {
        this.visibleSize = cc.director.getVisibleSize();
        this.timeLabel.node.setLocalZOrder(100);
        this.setTouchEvent();
        this.initData();
        this.startGame();
    },

    initData: function() {
        this.Blocks = [];
        this.isStart = false;
        this.showEndLine = false;
        this.time = 0;
        this.touchNum = 0;
        this.timeLabel.string = "0.00s";
    },

    startGame: function () {
        this.addStartLine();
        this.addNormalLine(1);
        this.addNormalLine(2);
        this.addNormalLine(3);
    },

    restart: function () {
        for (let i = 0; i < this.Blocks.length; i++) {
            let b = this.Blocks[i];
            b.removeBlock();
        }
        this.initData();
        this.startGame();
    },

    addStartLine: function () {
        let block = cc.instantiate(this.block);
        block.parent = this.node;
        let b = block.getComponent('Block');
        b.createBlock(cc.Color.YELLOW, cc.size(this.visibleSize.width, this.visibleSize.height / 4), "开始", 23, cc.Color.BLUE);
        b.setLineIndex(0);
        b.node.setPosition(0, -this.visibleSize.height / 8 * 3);
        this.Blocks.push(b);
    },

    addNormalLine: function (index) {
        let rand = Math.floor(Math.random() * 100) % 4
        for (let i = 0; i < 4; i++) {
            let block = cc.instantiate(this.block);
            block.parent = this.node;
            let b = block.getComponent('Block');
            b.createBlock(i === rand ? cc.Color.BLACK: cc.Color.WHITE, cc.size(this.visibleSize.width / 4 - 2, this.visibleSize.height / 4 - 2), "", 23, cc.Color.BLUE);
            b.setLineIndex(index);
            b.node.setPosition(-this.visibleSize.width / 8 * 3 + i * this.visibleSize.width / 4, -this.visibleSize.height / 8 * 3 + index * this.visibleSize.height / 4);
            this.Blocks.push(b);
        }
    },
    
    addEndLine: function () {
        let block = cc.instantiate(this.block);
        block.parent = this.node;
        let b = block.getComponent('Block');
        b.createBlock(cc.Color.GREEN, this.visibleSize, "Success !", 50, cc.Color.RED);
        b.setLineIndex(4);
        b.node.setPosition(0, this.visibleSize.height);
        this.Blocks.push(b);
    },

    moveDown: function() {
        if (this.touchNum < 10) {
            this.addNormalLine(4);
        } else if (!this.showEndLine) {
            this.showEndLine = true;
            this.addEndLine();
        }
        for (let i = 0; i < this.Blocks.length; i++) {
            let b = this.Blocks[i];
            if (b.getLineIndex() < 0 ) {
                this.Blocks.splice(i, 1);
            }
            b.moveDown();
        }
    },

    setTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            for (let i = 0; i < this.Blocks.length; i++) {
                // console.log('BlockLine >> line = 61 ', this.Blocks[i].getLineIndex(), cc.rectContainsPoint(this.Blocks[i].node.getBoundingBoxToWorld(), event.getLocation()));
                if (this.Blocks[i].getLineIndex() === 1 && cc.rectContainsPoint(this.Blocks[i].node.getBoundingBoxToWorld(), event.getLocation())) {
                    let b = this.Blocks[i];
                    if (b.node.color.equals(cc.Color.BLACK)) {
                        if (!this.isStart) {
                            this.isStart = true;
                        }
                        this.touchNum ++;
                        b.node.color = cc.Color.GRAY;
                        this.moveDown();
                    } else {
                        let blockTime = cc.sys.localStorage.getItem("BlockTime");
                        if (blockTime === null) {
                            blockTime = 50.00;
                        }
                        console.log('BlockLine >> line = 123 ', blockTime);
                        if (b.node.color.equals(cc.Color.GREEN)) {
                            if (blockTime > this.time) {
                                blockTime = this.time.toFixed(2);
                                cc.sys.localStorage.setItem("BlockTime", blockTime);
                            }
                            this.moveDown();
                        } else {
                            b.node.color = cc.Color.RED;
                        }
                        this.isStart = false;
                        let alert = cc.instantiate(this.alertPrefab);
                        alert.parent = this.node;
                        alert.getComponent('AlertPrefab').initWithBtn(blockTime + 's', ()=>{
                            this.restart();
                        }, ()=>{
                            cc.director.loadScene('Menu');
                        });
                        this.time = 0;
                    }
                }
            }
        });
    },

    update: function (dt) {
        if (this.isStart) {
            this.time += dt;
            this.timeLabel.string = this.time.toFixed(2) + 's'; 
        }
    },
});
