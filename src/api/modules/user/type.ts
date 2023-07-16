import {userType} from '@/type'

export type LoginData = {
    user: userType;
    token: string;
    expirationTime: string;
}

export type LoginResult = {
    code: number;
    message: string;
    data: LoginData;
}

export type RegisterResetResult = {
    code: number;
    message: string;
    data: any;
}



