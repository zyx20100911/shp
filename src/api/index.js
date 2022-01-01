import request from "./request";
import mock from "./mock"

export const reqGetBaseCategoryList = () => {
    return request.get('/product/getBaseCategoryList')
}
export const reqGetBanner = () => {
    return mock.get('/banner.json')
}
export const reqGetFloor = () => {
    return mock.get('/floor.json')
}
//Search模块的请求
export const reqGetGoodsList = (params) => request.post('/list', params)
//detail模块请求/api/item/{ skuId }
export const reqGetDetailInfo = skuId => request.get(`/item/${skuId}`)
//添加购物车接口
export const reqAddToCart = ({skuId, skuNum}) => request.post(`/cart/addToCart/${skuId}/${skuNum}`)
//获取购物车列表接口/cart/cartList
export const reqGetCartList = () => request.get('/cart/cartList')

//获取验证码接口
export const reqGetCode = (phone) => {
    return request.get(`/user/passport/sendCode/phone`, {
        params: {
            phone
        }
    })
}