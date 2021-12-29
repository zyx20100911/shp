import {nanoid} from "nanoid";
export const getUUID = ()=>{
    let uuid = localStorage.getItem('UUIDTOKEN')
    if(!uuid){
        uuid = nanoid()
        localStorage.setItem('UUIDTOKEN',uuid)
    }
    return uuid
}