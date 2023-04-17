import request from '../utils/request';

// 网盘用户-登录
export function login(data){
    return request({
        url:'/userinfo/login',
        method:'post',
        data
    })
}

// 网盘用户-注册
export function register(data){
    return request({
        url:'/userinfo/register',
        method:'post',
        data
    })
}

// 网盘用户-登出
export function logout(){
    return request({
        url:'/userinfo/logout',
        method:'post',
    })
}

// 网盘用户-修改密码
export function changePassword(data){
    return request({
        url:'/userinfo/changePassword',
        method:'post',
        data
    })
}

// 网盘用户-个人信息
export function getInfoDetail(){
    return request({
        url:'/userinfo/userInfo',
        method:'get',
    })
}

// 网盘用户-忘记密码
export function forgetPassword(data){
    return request({
        url:'/userinfo/forgetPassword',
        method:'post',
        data
    })
}

