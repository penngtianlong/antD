import React from 'react';
import ReactDOM from 'react-dom';
import axios from './utils/axios'
// import {Provider} from 'react-redux'
import store from './store/store'
import App from './App';
import * as serviceWorker from './serviceWorker';
React.Component.prototype.$axios=axios
{/*<Provider store={store}>*/}
{/*</Provider>*/}
ReactDOM.render(
    <App />
    , document.getElementById('root'));
// React.Component.prototype.$axios=axios
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
