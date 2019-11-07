import React from 'react';
import ReactDOM from 'react-dom';
import App from './router'
import axios from './utils/axios'

// import App from './App';
// import App from './pages/brand/brand'
// import App from './pages/brand/brandAdd'
import {Provider} from  'react-redux'
import store from './store/store'

// import App from  './demo/less'
// import App from  './demo/antd'
// import  'antd/dist/antd.css'
// 全局引入样式
// import App from './App';

// import App from './pages/feature/feature';
// import App from './pages/addfeature/addfeature';

import * as serviceWorker from './serviceWorker';
//挂载axios
React.Component.prototype.$axios=axios;
ReactDOM.render(
    <Provider store={store}>

        <App />
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();