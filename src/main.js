import Vue from 'vue'
import App from './App.vue'
//在入口引入路由
import router from '@/router'
//引入自定义组件
import TypeNav from "./components/TypeNav/TypeNav";

import store from "@/store"
//引入mock文件执行一次
import '@/mock/mockServe.js'
//引入swiper库的样式
import 'swiper/css/swiper.css'

Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
  store
}).$mount('#app')
