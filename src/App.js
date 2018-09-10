import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import VinModal from './VinModal';

var CourseContract;

class App extends Component {
  
  state = {
    balanceOf: 0,
    account: '0xad8ec72843489a5e65a2929f5562b7aede2adf17',
    addressContract: '0x3bf2a652ab4f40196016f9eeec1b4aa245173de2',
    symbol: 'ether',
    name: '',
    age: 0,
  }

  componentDidMount() {
      const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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
      /** Connect to smart contract **/
      CourseContract = new web3.eth.Contract(ABI, this.state.addressContract, {
        from: this.state.account
      });
      /*
      *  Return balance of wallet, userName, age
      * 
      * 
      */
      try {
        CourseContract.methods.balanceOf(this.state.account)
          .call()
          .then(res =>  this.setState({ balanceOf: web3.utils.fromWei(res, this.state.symbol) }));;
        CourseContract.methods.getInstructor(this.state.account)
          .call()
          .then(res => this.setState({ name: res.name, age: res.age }));
          
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
       
        CourseContract.methods.setInstructor(that.props.account, age, name).send({ from : that.props.account}); 
      } catch (error) {
        console.log(error);
      }
    }
  
    transfer() {
      
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
              Account: {this.state.account}
            </p>
            <p>Name: <span style={{textTransform: 'uppercase'}}>{this.state.name}</span></p>
            <p>Age: {this.state.age}</p>
            <p className="App-intro"> Balance: {this.state.balanceOf} {this.state.symbol}
            </p>
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
        }} hanldeChange={this.setInstructor} account={this.state.account}/>
      </div>
    );
  }
}

export default App;
