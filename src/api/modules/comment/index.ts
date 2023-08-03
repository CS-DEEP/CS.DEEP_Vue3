import {PublishCommentRequest, PublishCommentRes, ResponseResult} from "@/api/modules/comment/type";
import service from "@/api/instance";

const publishComment = (data: PublishCommentRequest) => {
    return service.post<ResponseResult<PublishCommentRes>>('/comment/add' +
        '?articleId=' + data.articleId +
        '&content=' + data.content)
}

export default {
    publishComment,    // 发布评论
}
