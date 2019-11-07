import axios from 'axios'
import store from '../store/store'
import actionCreator from '../store/actionCreator'
import webStorage from './webstorage'
axios.interceptors.request.use(function (config) {
    if(!config.data){
        config.data={}
    }
    //全局获取token并添加到请求里
    config.data.token=webStorage.getItem('token')
    config.data.uid=webStorage.getItem('uid')
    console.log(config.data,'请求拦截器');
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器',response.data);
    if(response.data.message==='token缺失'||response.data.message==='token失效'){
        // console.log('去登陆')
        let action=actionCreator.changeTokenModal(false)
        store.dispatch(action)
    }

    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default axios