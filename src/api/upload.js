import request from "../utils/request";

// 检查急速秒传
export function checkFileKey(data){
    return request({
        url:'/upload/check',
        method:'post',
        data
    })
}

//分片上传
export function shardUpload(data){
    return request({
        url:'/upload/upload',
        method:'post',
        data
    })
}