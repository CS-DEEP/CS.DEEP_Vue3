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

export type UserinfoData = {
    user: userType;
}

export type IsFollowData = {
    isFollow: boolean;
}

export type UserinfoEditRequest = {
    username: string;
    gender: number;
    age: number;
    avatar: FormData;
    description: string;
}

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}
