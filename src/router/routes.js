//引入组件
import home from "@/view/home";
import login from "@/view/login";
import register from "@/view/register";
import search from "@/view/Search";
import detail from "@/view/Detail";
import addCartSuccess from "@/view/AddCartSuccess"
import shopCart from "@/view/ShopCart"

const routes = [
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
        path: "/search/:keyword?",
        component: search,
        name:"search",
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/detail/:skuId',
        component: detail,
        name:'detail',
        meta: {
            isShowfooter:true
        }
    },
    {
        path:"/addCartSuccess",
        name:"addCartSuccess",
        component:addCartSuccess,
        meta: {
            isShowFooter: true
        }

    },
    {
        path:"/shopCart",
        name: "shopCart",
        component: shopCart,
        meta: {
            isShowFooter:true
        }
    },
    {
        path: "/",
        redirect:"/home"
    }
]
export default routes