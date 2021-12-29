import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
//挂载插件
Vue.use(VueRouter);


//避免重复跳转报错 重写vueRouter原型方法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//配置路由
export default new VueRouter({
    //路由配置
    routes:routes,
    scrollBehavior (to, from, savedPosition) { //滚动行为
        return {  y: 0 }
    }
})