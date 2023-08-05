import {
    GetOneLevelCommentReq,
    GetOneLevelCommentRes,
    PublishCommentReq,
    PublishCommentRes,
    ResponseResult
} from "@/api/modules/comment/type";
import service from "@/api/instance";

const publishComment = (data: PublishCommentReq) => {
    return service.post<ResponseResult<PublishCommentRes>>('/comment/add' +
        '?articleId=' + data.articleId +
        '&content=' + data.content)
}

const getOneLevelComment = (data: GetOneLevelCommentReq) => {
    return service.get<ResponseResult<GetOneLevelCommentRes>>('/comment/get/normal' +
        '?articleId=' + data.articleId +
        '&page=' + data.page)
}

const deleteComment = (data: number) => {
    return service.post<ResponseResult<any>>('/comment/delete' +
        '?commentId=' + data)
}

export default {
    publishComment,    // 发布评论
    getOneLevelComment,// 获取文章一级评论
    deleteComment,     // 删除评论
}
