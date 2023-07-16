import {userType} from '@/type'

export type LoginData = {
    user: userType;
    token: string;
    expirationTime: string;
}

export type FollowingData = {
    followingCount: number;
}

export type FollowerData = {
    followerCount: number;
}

export type LoginResult = {
    code: number;
    message: string;
    data: LoginData;
}

export type CommonResult = {
    code: number;
    message: string;
    data: any;
}

export type FollowResult<T> = {
    code: number;
    message: string;
    data: T;
}
