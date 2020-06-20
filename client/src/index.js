import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const routing = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
