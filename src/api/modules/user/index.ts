// src/api/modules/user/index.ts
import service from '../../instance/index'
import {loginType, registerType, resetPwdType} from '@/type'
import {
    CommonResult,
    FollowerData,
    FollowingData,
    FollowResult, GetUserinfoResult,
    LoginResult,
} from "@/api/modules/user/type";

const login = (data: loginType) => {
    return service.post<LoginResult>('/user/login' +
        '?email=' + data.email +
        '&password=' + data.password, data)
}

const sendRegisterCode = (data: any) => {
    return service.get('/checkcode/register/code' +
        '?email=' + data.email)
}

const register = (data: registerType) => {
    return service.post<CommonResult>('/user/register' +
        '?username=' + data.username +
        '&email=' + data.email +
        '&checkCode=' + data.checkCode +
        '&password=' + data.password +
        '&confirmPwd=' + data.confirmPwd, data)
}

const resetPwd = (data: resetPwdType) => {
    return service.post<CommonResult>('/user/reset/password' +
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
    return service.get<FollowResult<FollowingData>>('/user/following/count' +
        '?userId=' + data)
}

const getFollowerNum = (data: number) => {
    return service.get<FollowResult<FollowerData>>('/user/follower/count' +
        '?userId=' + data)
}

const getUserinfoData = (data: number) => {
    return service.get<GetUserinfoResult>('/user/get/info' +
        '?userId' + data)
}

export default {
    login,               // 登录
    sendRegisterCode,    // 注册发送验证码
    register,            // 注册
    resetPwd,            // 重置密码
    sendResetCode,       // 重置密码发送验证码
    getFollowingNum,     // 依据userId获取关注数量
    getFollowerNum,      // 依据userId获取粉丝数量
    getUserinfoData,     // 依据userId获取用户信息
};
