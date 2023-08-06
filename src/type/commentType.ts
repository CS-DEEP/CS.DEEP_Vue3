export type commentType = {
    id: number,
    content: string,
    authorId: number,
    articleId: number,
    createTime: number,
    isReply: number,
    replyId?: number,
    isNasty: number,
    version?: any
}

export type replyCommentReqType = {
    articleId: number,
    content: string,
    replyId: number,
    replyName: string,
    isReply: number
}

export type oneLevelCommentType = {
    avatar: string,
    name: string,
    content: commentType,
    publishTime: string,
    isShowTwoLevelComment: boolean,
    isShowEmoji: boolean,
    isShowNastyMark: boolean,
    numOfReply: number,
    isOwn: boolean,
    twoLevelCommentList: Array<twoLevelCommentType>
    replyEditComment: replyCommentReqType
}

export type twoLevelCommentType = {
    avatar: string,
    name: string,
    publishTime: string,
    ownReplyContent: commentType,
    quoteContent: string,
    isOwn: boolean,
    isNasty: number,
    isShowNastyMark: boolean,
}

