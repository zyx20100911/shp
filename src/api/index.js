import request from "./request";

export const reqGetBaseCategoryList= ()=>{
   return request.get('/product/getBaseCategoryList')
}