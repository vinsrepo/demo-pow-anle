const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');
const Message = require('./Message.js');

function calculateHash(block) {
    let record = ''+ block.index + block.timestamp + block.BPM + block.PrevHash + '';
    return SHA256(record).toString();
}

function generateBlock(oldBlock, BPM) {
    let newBlock = new Block();

    let t = Date.now();
    newBlock.index = oldBlock.index + 1;
    newBlock.timestamp = t;
    newBlock.BPM = BPM;
    newBlock.PrevHash = oldBlock.Hash;
    newBlock.Hash = calculateHash(newBlock);
    return newBlock;
}

function isBlockValid(newBlock, oldBlock) {
    if(oldBlock.index + 1 != newBlock.index) {
        return false;
    }

    if(oldBlock.Hash != newBlock.PrevHash) {
        return false;
    }

    if(calculateHash(newBlock) != newBlock.Hash) {
        return false;
    }

    return true;
}


module.exports = {
    generateBlock,
    isBlockValid
}
