import {articleBaseInfo} from "@/type";

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

export type getCategoryArticleReq = {
    page: number,
    pageSize: number,
    categoryId: number
}

export type getCategoryArticleRes = {
    articleCount: number,
    articleList: Array<articleBaseInfo>
}

export type getDraftListRes = {
    articleCount: number,
    articleList: Array<articleBaseInfo>
}

export type realTimeSearchRes={
    articleCount: number,
    articleList: Array<articleBaseInfo>
}
