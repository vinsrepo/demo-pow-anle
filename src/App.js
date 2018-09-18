import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import VinModal from './VinModal';
var Tx = require('ethereumjs-tx');

var CourseContract;
var web3;
var myAddress = '0x0a0407fd0d2dfd09b6a0e4176fd35ecb628a3eb0';
var addressContract = '0x3b0fa4506958a48ed7e0f959dee1f60928568267';
var destAddress = '0x64f7d6def87dfd2b79bc24cd1b6b0821fe6b5eee';
class App extends Component {
  
  state = {
    balanceOf: 0,
    myAddress: '0xb2dfed8235fb2ab0822475591dc41109b6aaaf88',
    addressContract: ' 0x18615e2e2c91be044a9bbd845e2c00b20c2e7953',
    symbol: 'ether',
    name: '',
    age: 0,
  }

  componentDidMount() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    
    const ABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          },
          {
            "name": "_age",
            "type": "uint256"
          },
          {
            "name": "_fName",
            "type": "string"
          }
        ],
        "name": "setInstructor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          },
          {
            "name": "_fName",
            "type": "string"
          },
          {
            "name": "_age",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "tokenOwner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "ins",
            "type": "address"
          }
        ],
        "name": "getInstructor",
        "outputs": [
          {
            "name": "age",
            "type": "uint256"
          },
          {
            "name": "name",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
    /********** Connect to smart contract *************/
    CourseContract = new web3.eth.Contract(ABI, addressContract, {
      from: myAddress
    })
    
    /*
    * * Return balance of wallet, userName, age
    * *
    * *
    */
    try {
      CourseContract.methods.balanceOf(myAddress)
        .call()
        .then(res =>  this.setState({ balanceOf: web3.utils.fromWei(res, this.state.symbol) }));;
      CourseContract.methods.getInstructor(myAddress)
        .call()
        .then(res => this.setState({ name: res.name, age: res.age }));

        console.log(web3.eth.getBalance(myAddress))
        
    } catch (error) {
      console.log(error); 
    }
  }

    setInstructor(that) {
      /**** 
       * 
       * @param that is pointer, point to VinModal
       * ****/
      try {
        let name = that.refs.nameInput.value || '';
        let age = that.refs.ageInput.value || 0;
       
        CourseContract.methods.setInstructor(that.props.myAddress, age, name).send({ from : that.props.myAddress}); 
      } catch (error) {
        console.log(error);
      }
    }
  
    transfer = async () => {
      var transferAmount = 1;       
      // Determine the nonce
      var count = await web3.eth.getTransactionCount(myAddress);
      var balance = await CourseContract.methods.balanceOf(myAddress).call();
      
      console.log(`Balance before send: ${web3.utils.fromWei(balance, 'ether')} ether\n------------------------`);
      // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
      // Use Gwei for the unit of gas price
      var gasPriceGwei = 4;
      var gasLimit = 3000000;
      // Chain ID of Rinkeby testnet is 4
      var chainId = 3;
      var rawTransaction = {
          "from": myAddress,
          "nonce": "0x00",
          "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
          "gasLimit": web3.utils.toHex(gasLimit),
          "to": addressContract,
          "value": "0x0",
          "data": CourseContract.methods.transfer(destAddress, transferAmount).encodeABI(),
          "chainId": chainId
      };
      console.log(`Raw of Transaction: \n${JSON.stringify(rawTransaction, null, '\t')}\n------------------------`);
      // The private key for myAddress in .env
      var privKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')
      var tx = new Tx(rawTransaction);
      tx.sign(privKey);
      var serializedTx = tx.serialize();
      // Comment out these four lines if you don't really want to send the TX right now
      console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);
      var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      // The receipt info of transaction, Uncomment for debug
      console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}\n------------------------`);
      // The balance may not be updated yet, but let's check
      balance = await CourseContract.methods.balanceOf(this.state.myAddress).call();
      console.log(`Balance after send: ${web3.utils.fromWei(balance, 'ether')} ether`);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ethereum</h1>
        </header>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '50% 50%'}}>
          <div style={{ border: '1px solid #bee5eb', marginTop: 5 }}>
            <p className="App-intro">
            myAddress: {this.state.myAddress}
            </p>
            <p>Name: <span style={{textTransform: 'uppercase'}}>{this.state.name}</span></p>
            <p>Age: {this.state.age}</p>
            <p className="App-intro"> Balance: {this.state.balanceOf} {this.state.symbol}
            </p>
            <button className="alert alert-danger" title="Demo with my account" onClick={() => this.transfer()}>Chuyển tiền</button>
            <button className="alert alert-primary" onClick={() => this.VinModal.open()}>Sửa thông tin cá nhân</button>
          </div>
        </div>
        <VinModal ref={ref => this.VinModal = ref } content={() => {
          return(
            <React.Fragment>
              <p>Name: <input type="text" ref="nameInput"/></p>
              <p>Age: <input type="number" ref="ageInput"/></p>
            </React.Fragment>
          )
        }} hanldeChange={this.setInstructor} myAddress={this.state.myAddress}/>
      </div>
    );
  }
}

export default App;
