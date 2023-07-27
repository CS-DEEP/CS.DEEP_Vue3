import service from "@/api/instance";
import {
    articleInfo,
    createArticleRes, imageBackRes,
    ResponseResult,
} from "@/api/modules/article/type";

const createArticle = () => {
    return service.post<ResponseResult<createArticleRes>>('/article/create')
}

const getArticleInfo = (data: number) => {
    return service.get<ResponseResult<articleInfo>>('/article/get/info' + '?articleId=' + data)
}

const updateArticleInfo = (data: articleInfo) => {
    return service.post<ResponseResult<articleInfo>>('/article/update' +
        '&title=' + data.article.title +
        '&content=' + data.article.content +
        '&categoryId=' + data.article.categoryId +
        '&tag=' + data.tag)
}

const updateImageHandle = (data: FormData) => {
    return service.post<ResponseResult<imageBackRes>>('/upload/file', data)
}

export default {
    createArticle,    // 创建文章
    getArticleInfo,   // 获取文章信息
    updateArticleInfo,// 更新文章信息
    updateImageHandle,// 上传图片
}
