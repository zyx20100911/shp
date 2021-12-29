import {reqGetDetailInfo} from "@/api";

const detail = {
    state: {
        DetailInfo: {}
    },
    mutations: {
        GETDetailInfo(state, res) {
            state.DetailInfo = res.data;
        }
    },
    actions: {
        async getDetailInfo({commit}, sukId) {
            let res = await reqGetDetailInfo(sukId)
            if (res.code === 200) {
                commit('GETDetailInfo', res)
            }
        }
    },
    getters: {
        categoryView(state) {
            return state.DetailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.DetailInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.DetailInfo.spuSaleAttrList || []

        },
    },
    namespaced:true
}


export {detail}