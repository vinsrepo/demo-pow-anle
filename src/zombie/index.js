import React, { Component } from 'react';
import ReactDOM from 'react';
import Web3 from 'web3';
import logo from '../logo.svg';
import ABI from './ABI.json';
import Card from './Card';


export default class Metamask extends Component {
    ZombieContract
    state = {
        account: '',
        balance: 0,
        symbol: 'Ether',
        cards: [],
        isLoading: false,
    }

    componentDidMount() {
        if(typeof window.web3 !== 'undefined') {
            var web3 = new Web3(window.web3.currentProvider);
        } else {
        }
        let that = this;
        web3.eth.getAccounts(function(error, accounts) {
            if (!error) {
                web3.eth.getBalance(accounts[0], function(error, balance) {
                if (!error) {
                    console.log(
                    "Your account: " +
                        accounts[0] +
                        " has a balance of: " +
                        balance / 1000000000000000000 +
                        "Ether"
                    );
                    that.setState({ account: accounts[0], balance: balance / 1000000000000000000 });
                    that.ZombieContract = new web3.eth.Contract(ABI, '0xe89f73d91a26bfb08c05ec7f80802fafe0ed4859', {
                        from: accounts[0]
                    })
                } else {
                    console.error(error);
                }
                });
            } else {
                console.error(error);
            }
        });
    }

    newZombie = () => {
        let that = this;
        this.setState({ isLoading: true });
        this.ZombieContract.methods.newZombie(this.nameInput.value, 1538252804556)
            .send()
            .then(res => {
                if(res.status) {
                    let index = this.state.cards.length;
                    that.setState({ 
                        cards : [...that.state.cards, <Card index={index} initialClick={that.initialClick} url="./zombie1.png" name={that.nameInput.value} level="1" />],
                        isLoading: false,
                    })
                }
            });
    }

    
    initialClick = (e, id) => {
        var mousePosition;
        var offset = [0,0];
        var body;
        var isDown = false;
        console.log('id', id)
        body = document.getElementById(id);
    
        var that = this;
        body.addEventListener('mousedown', function(e) {
            isDown = true;
            offset = [
                body.offsetLeft - e.clientX,
                body.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown = false;
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {
            
                    x : event.clientX,
                    y : event.clientY
            
                };
                body.style.left = (mousePosition.x + offset[0]) + 'px';
                body.style.top  = (mousePosition.y + offset[1]) + 'px';
                for(let i = 1; i <= 2; i++) {
                    if(id !== "cards" + i) {
                        let elementTarget = document.getElementById("cards" + i);
                        that.collidesWith(body, elementTarget);
                    }
                }
            }
        }, true);
    }


    collidesWith = (element1, element2) => {
        var Element1 = {};
        var Element2 = {};
        var that = this;

        Element1.top = element1.offsetTop;
        Element1.left = element1.offsetLeft;
        Element1.right = Number(element1.offsetLeft) + Number(element1.offsetWidth);
        Element1.bottom = Number(element1.offsetTop) + Number(element1.offsetHeight);
    
        Element2.top = element2.offsetTop;
        Element2.left = element2.offsetLeft;
        Element2.right = Number(element2.offsetLeft) + Number(element2.offsetWidth);
        Element2.bottom = Number(element2.offsetTop) + Number(element2.offsetHeight);
    
        if (Element1.right > Element2.left && Element1.left < Element2.right && Element1.top < Element2.bottom && Element1.bottom > Element2.top) {
            // Do your stuff here
            document.addEventListener('mouseup', function() {
                that.mixMyZomibeToNewZombie(1, 2);
            }, true)
        }
    }

    mixMyZomibeToNewZombie = (index1, index2) => {
        
    }

    render() {
        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{this.state.account}</h1>
                <h2 className="App-title">{this.state.balance + " " + this.state.symbol}</h2>
            </header>
            <input type="text" placeholder="Name zombie" ref={ref => this.nameInput = ref }/> 
            <button onClick={() => this.newZombie()}>Create zombie</button>
            <div style={{ width: '80%', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto auto auto auto'}}>
                <Card index={1} initialClick={this.initialClick} url="./zombie1.png" name={'zombie 1'} level="1" />
                <Card index={2} initialClick={this.initialClick} url="./zombie1.png" name={'zombie 2'} level="1" />
            </div>
            {
                this.state.isLoading &&
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="130px" height="130px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve" style={{ position: 'fixed', top: '50%', left: '50%'}}>
                    <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                    <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="0.5s"
                        repeatCount="indefinite"/>
                        </path>
                </svg>
            }
        </div>
        )
    }
}
