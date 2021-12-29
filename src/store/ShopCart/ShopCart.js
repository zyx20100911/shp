import {reqGetCartList} from "@/api";
import {getUUID} from '@/utils/uuid_token';
const shopCart = {
    state: {
        cartInfoList: {},
        uuid:getUUID()
    },
    mutations: {
        GETCartList(state, res) {
            state.cartInfoList = res.data;
        }
    },
    actions: {
        async getCartList({commit}) {
            let res = await reqGetCartList()
            if (res.code === 200) {
                commit('GETCartList', res)
            }
        }
    },
    getters: {
  /*      spuSaleAttrList(state) {
            return state.DetailInfo.spuSaleAttrList || []
        },*/
    },
    namespaced:true
}


export {shopCart}