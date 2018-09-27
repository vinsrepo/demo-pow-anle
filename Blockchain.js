class Blockchain {
    constructor() {
        this.blocks = [];
    }

    replaceChain(newBlocks) {
        if(newBlocks.length > this.blocks.length) {
            this.blocks = newBlocks;
        }
    }

}

module.exports = Blockchain;