import Vue from 'vue'
import Vuex from 'vuex'
import {home} from './Home/Home'
import {search} from './Search/Search'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        home,
        search
    }
})

export default store