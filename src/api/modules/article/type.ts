import {articleType} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type createArticleRes = {
    article: articleType
}
