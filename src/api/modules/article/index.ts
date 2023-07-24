import service from "@/api/instance";
import {
    createArticleRes,
    ResponseResult,
    type getArticleInfo
} from "@/api/modules/article/type";

const createArticle = () => {
    return service.post<ResponseResult<createArticleRes>>('/article/create')
}

const getArticleInfo = (data: number) => {
    return service.get<ResponseResult<getArticleInfo>>('/article/get/info' + '?articleId=' + data)
}

export default {
    createArticle,    // 创建文章
    getArticleInfo,   // 获取文章信息
}
