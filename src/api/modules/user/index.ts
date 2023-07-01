// src/api/modules/user/index.ts
import service from '../../instance/index'

const login = (data: any) => {
    return service.post('/user/login', data)
}

const sendCode = (data: any) => {
    return service.post('/checkcode/register/code', data)
}

const register = (data: any) => {
    return service.post('/user/register', data)
}

const resetPwd = (data: any) => {
    return service.post('/user/password', data)
}

export default {login, sendCode, register, resetPwd};
