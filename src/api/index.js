import request from "./request";
import mock from "./mock"
export const reqGetBaseCategoryList= ()=>{
   return request.get('/product/getBaseCategoryList')
}
export  const reqGetBanner = () => {
  return mock.get('/banner.json')
}
export const reqGetFloor = () => {
  return mock.get('/floor.json')
}
//Search模块的请求
export const reqGetGoodsList = (params) => request.post('/list',params)