import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Metamask from './zombie'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Metamask />, document.getElementById('root'));
registerServiceWorker();
