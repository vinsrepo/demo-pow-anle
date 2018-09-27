const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;

const compression = require('compression');
const bodyParser = require('body-parser')

const Blockchain = require('./Blockchain.js');
const Block = require('./Block');
const Message = require('./Message');
const { generateBlock, isBlockValid } = require('./utils.js')

var myBlockchain = new Blockchain();


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(compression());
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/my-block', (req, res) => {
    res.send(myBlockchain.blocks);
});

app.post('/add-block', (req, res) => {
    handleWriteBlock(req, res);
});

var currentBlockchain = [];

function handleWriteBlock(req, res) {
    var m = new Message(req.body.BPM);
    let len = myBlockchain.blocks.length;
    let oldBlock = myBlockchain.blocks[len - 1];
    let newBlock = generateBlock(oldBlock, m.BPM);

    if(isBlockValid(newBlock, oldBlock)) {
        currentBlockchain.push(newBlock);
        myBlockchain.replaceChain(currentBlockchain);
    }

    res.send(newBlock);
}

function initBlockchain() {
    let t = Date.now();

    let genesisBlock = new Block(0, t, 0, "000000000", "00000000");
    currentBlockchain.push(genesisBlock);
    myBlockchain.replaceChain(currentBlockchain);
}

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    initBlockchain();
    console.log('===================== SERVER LISTENING ON ' + PORT + ' =====================');
});