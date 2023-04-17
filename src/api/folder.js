import request from "../utils/request";

// 目录-文件夹&文件
export function getFileById(id){
    return request({
        url:'/directory/list'+(id?'?folderId='+id:''),
        method:'get'
    })
}

// 目录-文件夹
export function getFolder(id){
    return request({
        url:'/directory/folder'+(id?'?folderId='+id:''),
        method:'get'
    })
}

// 文件夹-新建文件夹
export function createFolder(data){
    return request({
        url:'/folder/create',
        method:'post',
        data
    })
}

// 文件夹-重命名
export function renameFolder(data){
    return request({
        url:'/folder/rename',
        method:'post',
        data
    })
}

// whereAml
export function getLocation(id){
    return request({
        url:'/folder/whereAmI?id='+id,
        method:'get',
    })
}

// 文件夹-移动
export function moveFolder(data){
    return request({
        url:'/folder/move',
        method:'post',
        data
    })
}

//文件夹&&文件-移动到回收站
export function removeFolder(data){
    return request({
        url:'/recyclebin/remove',
        method:'post',
        data
    })
}


