import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ZombieRun from './zombies/ZombieRun'

class App extends Component {
  startWeb3 = event => {
    if(event.key == 'Enter'){
      
    }
  }

  render() {
    return (
      <div className="App">
        <div style={{ margin: 'auto', backgroundImage: 'url("images/tester-bg@2x.png")', width: '47vh', height: '84vh', backgroundSize: 'cover' }}>
          <ZombieRun/>
        </div>
        <input type="text" onKeyPress={this.startWeb3} placeholder="Your wallet !!" style={{ border: '1px solid #1a1c22',width: 250, height: 20, backgroundColor: '#1a1c22'}}/>
      </div>
    );
  }
}

export default App;
