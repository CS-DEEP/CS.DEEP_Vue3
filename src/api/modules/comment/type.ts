import {commentType} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type PublishCommentRequest = {
    articleId: number;
    content: string;
}

export type PublishCommentRes = {
    comment: commentType;
}
