/*
*   用户类型定义文件，包含一些用户类型的定义
*   创建者: 2aurora2
*   创建时间: 2023-07-09
* */

// 用户登录传后端数据类型
export type loginType = {
    email: string;
    password: string;
}
// 用户注册传后端数据类型
export type registerType = {
    email: string;
    username: string;
    checkCode: string;
    password: string;
    confirmPwd: string;
}
// 用户重置密码传后端数据类型
export type resetPwdType = {
    email: string;
    checkCode: string;
    password: string;
    confirmPwd: string;
}
export type userType<T> = {
    nodeId: number;
    id: number;
    username: string;
    email: string;
    password: string;
    gender: number;
    age: number;
    avatar: string;
    description: string;
    version: number;
    following: T;
}
