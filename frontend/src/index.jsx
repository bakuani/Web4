import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);