// src/api/modules/user/index.ts
import service from '../../instance/index'
import {loginType, registerType, resetPwdType} from '@/type'
import {
    ResponseResult,
    FollowerData,
    FollowingData,
    UserinfoData,
    LoginData, IsFollowData,
} from "@/api/modules/user/type";

const login = (data: loginType) => {
    return service.post<ResponseResult<LoginData>>('/user/login' +
        '?email=' + data.email +
        '&password=' + data.password, data)
}

const sendRegisterCode = (data: any) => {
    return service.get('/checkcode/register/code' +
        '?email=' + data.email)
}

const register = (data: registerType) => {
    return service.post<ResponseResult<any>>('/user/register' +
        '?username=' + data.username +
        '&email=' + data.email +
        '&checkCode=' + data.checkCode +
        '&password=' + data.password +
        '&confirmPwd=' + data.confirmPwd, data)
}

const resetPwd = (data: resetPwdType) => {
    return service.post<ResponseResult<any>>('/user/reset/password' +
        '?email=' + data.email +
        '&checkCode=' + data.checkCode +
        '&password=' + data.password +
        '&confirmPwd=' + data.confirmPwd, data)
}

const sendResetCode = (data: any) => {
    return service.get('/checkcode/reset/code' +
        '?email=' + data.email)
}

const getFollowingNum = (data: number) => {
    return service.get<ResponseResult<FollowingData>>('/user/following/count' +
        '?userId=' + data)
}

const getFollowerNum = (data: number) => {
    return service.get<ResponseResult<FollowerData>>('/user/follower/count' +
        '?userId=' + data)
}

const getUserinfoData = (data: number) => {
    return service.get<ResponseResult<UserinfoData>>('/user/get/info' +
        '?userId=' + data)
}

const getFollowState = (data: number) => {
    return service.get<ResponseResult<IsFollowData>>('/user/check/follow' +
        '?userId=' + data)
}

const followHandle = (data: number) => {
    return service.post<ResponseResult<any>>('/user/add/follow' +
        '?userId=' + data)
}

const cancelFollowHandle = (data: number) => {
    return service.post<ResponseResult<any>>('/user/delete/follow' +
        '?userId=' + data)
}

const logout = () => {
    return service.post<ResponseResult<any>>('/user/logout')
}

export default {
    login,               // 登录
    logout,              // 退出登录
    sendRegisterCode,    // 注册发送验证码
    register,            // 注册
    resetPwd,            // 重置密码
    sendResetCode,       // 重置密码发送验证码
    getFollowingNum,     // 依据userId获取关注数量
    getFollowerNum,      // 依据userId获取粉丝数量
    getUserinfoData,     // 依据userId获取用户信息
    getFollowState,      // 获取用户登录状态
    followHandle,        // 关注用户
    cancelFollowHandle,  // 取消关注
};
