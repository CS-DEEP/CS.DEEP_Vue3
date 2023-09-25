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

export type DayItem = {
    date: number,
    act_val: number
}

export type GetHeatmapInfoRes = {
    activationList: Array<DayItem>
}

export type UserinfoEditRequest = {
    username: string;
    gender: number;
    age: number;
    avatar: FormData;
    description: string;
}

export type FollowingList = {
    following: Array<userType>
}

export type FollowerList = {
    follower: Array<userType>
}

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}
