import {articleBaseInfo, articleType} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type createArticleRes = {
    article: articleBaseInfo
}

export type imageBackRes = {
    url: string
}

export type isLikeRes = {
    isLike: number
}

export type isCollectRes = {
    isCollect: number
}

export type numberOfLikeAndCollect = {
    count: number
}
