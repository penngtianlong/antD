import React from 'react';
import ReactDOM from 'react-dom';
import axios from './utils/axios'
import store from './store/store'
// import App from './App';
import App from './pages/brand/brand'
// import App from './pages/brand/brandAdd'
import {Provider} from  'react-redux'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
React.Component.prototype.$axios=axios
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
