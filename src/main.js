import Vue from 'vue'
import App from './App.vue'
//在入口引入路由
import router from '@/router'
//引入自定义组件
import TypeNav from "./view/Home/TypeNav";
Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由
  router,
}).$mount('#app')
