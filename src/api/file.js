import request from "../utils/request";

// 文件-重命名
export function renameFile(data){
    return request({
        url:'/file/rename',
        method:'post',
        data
    })
}

// 下载-文件
export function getDownloadPath(id,type){
    return request({
        url:'/download/getPath?id='+id+'&type='+type,
        method:'get',
    })
}

// 文件-移动
export function moveFile(data){
    return request({
        url:'/file/move',
        method:'post',
        data
    })
}
