import service from "@/api/instance";
import {
    createArticleRes,
    ResponseResult
} from "@/api/modules/article/type";

const createArticle = () => {
    return service.post<ResponseResult<createArticleRes>>('/article/create')
}


export default {
    createArticle,    // 创建文章
}
