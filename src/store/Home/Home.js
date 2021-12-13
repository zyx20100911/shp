import {reqGetBaseCategoryList} from "@/api";
const home = {
    state: {
        listData:[]
    },
    mutations: {
        GETCategoryList(state,res) {
             state.listData = res.data
        }
    },
    actions: {
        async getCategoryList({commit,state}){
           const res = await reqGetBaseCategoryList()
            commit('GETCategoryList',res)
            state.listData.length = 16
        }
    },
    getters: {}
}


export {home}