import {reqGetBaseCategoryList,reqGetBanner,reqGetFloor} from "@/api";
const home = {
    state: {
        listData:[],
        bannerList:[],
        floorList:[],
    },
    mutations: {
        GETCategoryList(state,res) {
             state.listData = res.data
        },
        GETBannerList(state,res) {
            state.bannerList = res.data
        },
        GETFloor(state,res){
            state.floorList = res.data
        },
    },
    actions: {
        async getCategoryList({commit,state}){
           let res = await reqGetBaseCategoryList()
            commit('GETCategoryList',res)
            state.listData.length = 16
        },
        async getBanner({commit}){
           let res = await reqGetBanner()
            commit('GETBannerList',res)
        },
        async getFloor({commit}){
          let res = await reqGetFloor()
           if(res.code ===200){
               commit('GETFloor',res)
           }
        },
    },
    getters: {}
}


export {home}