import {userType} from '@/type'

export type LoginData = {
    user: userType<any>;
    token: string;
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



