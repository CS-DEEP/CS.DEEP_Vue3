import service from "@/api/instance";
import {
    articleInfo,
    createArticleRes,
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
        '?nodeId=' + data.article.nodeId +
        '&id=' + data.article.id +
        '&authorId=' + data.article.authorId +
        '&title=' + data.article.title +
        '&content=' + data.article.content +
        '&categoryId=' + data.article.categoryId +
        '&createTime=' + data.article.createTime +
        '&updateTime=' + data.article.updateTime +
        '&version=' + data.article.version +
        '&draft=' + data.article.draft +
        '&tag=' + data.tag)
}

export default {
    createArticle,    // 创建文章
    getArticleInfo,   // 获取文章信息
    updateArticleInfo,// 更新文章信息
}
