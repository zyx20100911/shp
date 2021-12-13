import request from "./request";

export const reqGetBaseCategoryList=()=>{
    request.get('/product/getBaseCategoryList')
}