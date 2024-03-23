import type {commentType} from "@/type";

export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

export type PublishCommentReq = {
    articleId: number;
    content: string;
    isReply?: number;
    replyId?: number;
}

export type PublishCommentRes = {
    comment: commentType;
}

export type GetOneLevelCommentReq = {
    articleId: number,
    page: number,
    pageSize?: number
}

export type GetOneLevelCommentRes = {
    commentList: Array<commentType>
    replySize: Array<number>
}

export type GetTwoLevelCommentRes = {
    commentList: Array<commentType>
}

export type GetCommentInfoRes = {
    comment: commentType
}
