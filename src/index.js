import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import store from "./store/store";


const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:9001/ec-election/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


ReactDOM.render(
    <Provider store={store} >
        <Index />
    </Provider >,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Set session data
sessionStorage.setItem('election_id', '43680f3e-97ac-4257-b27a-5f3b452da2e6');
