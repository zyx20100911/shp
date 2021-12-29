import Vue from 'vue'
import Vuex from 'vuex'
import {home} from './Home/Home'
import {search} from './Search/Search'
import {detail} from './Detail/Detail'
import {shopCart} from './ShopCart/ShopCart'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart
    }
})

export default store