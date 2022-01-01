import Vue from 'vue'
import App from './App.vue'
//在入口引入路由
import router from '@/router'
//引入自定义组件
import TypeNav from "./components/TypeNav/TypeNav";
import Pagination from "./components/Pagination"

import store from "@/store"
//引入mock文件执行一次
import '@/mock/mockServe.js'
//引入swiper库的样式
import 'swiper/css/swiper.css'

Vue.component('TypeNav',TypeNav)
Vue.component(Pagination.name,Pagination)
//阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
