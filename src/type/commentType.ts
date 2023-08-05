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

export type oneLevelCommentType = {
    avatar: string,
    name: string,
    content: commentType,
    publishTime: string,
    isShowTwoLevelComment: boolean,
    isShowEmoji: boolean,
    isShowNastyMark: boolean,
    replyContent: string,
    numOfReply: number,
    isOwn: boolean,
}
