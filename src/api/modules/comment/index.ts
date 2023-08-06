import {
    GetCommentInfoRes,
    GetOneLevelCommentReq,
    GetOneLevelCommentRes, GetTwoLevelCommentRes,
    PublishCommentReq,
    PublishCommentRes,
    ResponseResult
} from "@/api/modules/comment/type";
import service from "@/api/instance";

const publishComment = (data: PublishCommentReq) => {
    return service.post<ResponseResult<PublishCommentRes>>('/comment/add' +
        '?articleId=' + data.articleId +
        '&content=' + data.content +
        'isReply=' + data.isReply)
}

const replyComment = (data: PublishCommentReq) => {
    return service.post<ResponseResult<PublishCommentRes>>('/comment/add' +
        '?articleId=' + data.articleId +
        '&content=' + data.content +
        '&isReply=' + data.isReply +
        '&replyId=' + data.replyId)
}

const getOneLevelComment = (data: GetOneLevelCommentReq) => {
    return service.get<ResponseResult<GetOneLevelCommentRes>>('/comment/get/normal' +
        '?articleId=' + data.articleId +
        '&page=' + data.page)
}

const getTwoLevelComment = (data: number) => {
    return service.get<ResponseResult<GetTwoLevelCommentRes>>('/comment/get/reply' +
        '?commentId=' + data)
}

const deleteComment = (data: number) => {
    return service.post<ResponseResult<any>>('/comment/delete' +
        '?commentId=' + data)
}

const getCommentInfo = (data: number) => {
    return service.get<ResponseResult<GetCommentInfoRes>>('/comment/get/info' +
        '?commentId=' + data)
}

export default {
    publishComment,    // 发布评论
    replyComment,      // 回复评论
    getOneLevelComment,// 获取文章一级评论
    getTwoLevelComment,// 获取文章二级评论
    deleteComment,     // 删除评论
    getCommentInfo,    // 获取某一评论信息
}
