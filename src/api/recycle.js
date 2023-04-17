import request from "../utils/request";

export function getRecycleList(){
    return request({
        url:'/recyclebin/RecycleBinList',
        method:'get'
    })
}

export function restoreFile(data){
    return request({
        url:'/recyclebin/restore',
        method:'post',
        data
    })
}

export function deleteFile(data){
    return request({
        url:'/recyclebin/deleteForever',
        method:'post',
        data
    })
}