import {articleType} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type createArticleRes = {
    article: articleType
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
