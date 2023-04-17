import request from '../utils/request'

export function getShareList() {
    return request({
        url: '/share/list',
        method: 'get',
    })
}

export function createShare(data){
    return request({
        url:'/share/create',
        method:'post',
        data
    })
}

export function checkShare(link){
    return request({
        url:'/share/detail/'+ link,
        method:'get'
    })
}

export function authShare(link,code){
    return request({
        url:`/share/auth/${link}?code=${code}`,
        method:'get'
    })
}

export function Tsave(data){
    return request({
        url:'/share/t_save',
        method:'post',
        data
    })
}

export function getChildren(link,code,fid){
    return request({
        url:`/share/auth/${link}/folder?code=${code}&fid=${fid}`,
        method:'get',
    })
}