import {articleBaseInfo} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type getParticularArticleListReq = {
    page: number,
    sortBy: string,
    pageSize?: number
}

export type getParticularArticleListRes = {
    articleList: Array<articleBaseInfo>,
    articleCount: number
}

export type getRandomTagListRes = {
    tagList: Array<string>
}

export type getWebsiteUserCountRes = {
    userCount: number
}
