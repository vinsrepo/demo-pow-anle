class Block {
    constructor(index, timestamp, BPM, PrevHash, Hash) {
        this.index = index || 0; // position of the data record
        this.timestamp = timestamp || ''; // automatically determined and is the time the data is written
        this.BPM = BPM || 0; // beats per minute, is your pulse rate
        this.Hash = Hash || ''; // sha256 identifier representing this data record
        this.PrevHash = PrevHash || ''; // sha256 identifier of the previous record
    }
}

module.exports = Block;