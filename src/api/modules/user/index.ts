// src/api/modules/user/index.ts
import service from '../../instance/index'

const login = (data: any) => {
    return service.post('/user/login' +
        '?email=' + data.email +
        '&password=' + data.password, data)
}

const sendCode = (data: any) => {
    return service.get('/checkcode/register/code?email=' + data.email, data)
}

const register = (data: any) => {
    return service.post('/user/register' +
        '?username=' + data.username +
        '&email=' + data.email +
        '&checkCode=' + data.checkCode +
        '&password=' + data.password +
        '&confirmPwd=' + data.confirmPwd, data)
}

const resetPwd = (data: any) => {
    return service.post('/user/password', data)
}

export default {login, sendCode, register, resetPwd};
