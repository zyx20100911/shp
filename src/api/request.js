import axios from "axios";
//引入进度条的库
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
//添加进度条-开始
    nprogress.start()
    //给请求头加入uuid

    if(store.state.shopCart.uuid){
         config.headers.userTempId=store.state.shopCart.uuid
    }
    return config
})
//响应拦截器
request.interceptors.response.use((res) => {//请求成功
    //添加进度条-结束
    nprogress.done();
    return res.data
}, (err) => new Promise.reject(err))//请求失败
export default request