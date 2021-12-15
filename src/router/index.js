import Vue from "vue";
import VueRouter from "vue-router";
//挂载插件
Vue.use(VueRouter);
//引入组件
import home from "../view/home";
import login from "../view/login";
import register from "../view/register";
import search from "../view/search";

//避免重复跳转报错 重写vueRouter原型方法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//配置路由
export default new VueRouter({
    //路由配置
    routes:[
        {
            path: "/home",
            component: home,
            name:"home",
            meta:{
                isShowFooter:true
            }
        },
        {
            path: "/login",
            name:'path',
            component: login,
            meta:{
                isShowFooter:false
            }
        },
        {
            path: "/register",
            name:"register",
            component: register,
            meta:{
                isShowFooter:false
            }
        },
        {
            path: "/search/:keywords?",
            component: search,
            name:"search",
            meta:{
                isShowFooter:true
            }
        },
        {
            path: "/",
            redirect:"/home"
        }
    ]
})