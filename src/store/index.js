import Vue from 'vue'
import Vuex from 'vuex'
import {home} from './Home/Home'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        home
    }
})

export default store