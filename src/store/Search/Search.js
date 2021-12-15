import {reqGetGoodsList} from "@/api";

const search = {
    namespaced: true,
    state: {
        List: {}
    },
    mutations: {
        GETGOODSLIST(state, res) {
            state.List = res.data
        }
    },
    actions: {
        async getGoodsList({commit}, params = {}) {
            let res = await reqGetGoodsList(params)
            if (res.code === 200) {
                commit('GETGOODSLIST', res)
            }

        },
    },
    getters: {
        //简化仓库数据，把list对象里的常用数组单独拿出来做属性，在没有数据的时候默认给[]以免undefined报错
        goodsList(state) {
            return state.List.goodsList || []
        },
        attrsList(state) {
            return state.List.attrsList || []
        },
        trademarkList(state) {
            return state.List.trademarkList || []
        }
    }
}


export {search}