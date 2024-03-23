import service from "@/api/instance";
import type {
    createArticleRes, getCategoryArticleReq, getCategoryArticleRes, getDraftListRes,
    imageBackRes,
    isCollectRes,
    isLikeRes, numberOfLikeAndCollect, realTimeSearchRes,
    ResponseResult,
} from "@/api/modules/article/type";
import type {articleType} from "@/type";

const createArticle = () => {
    return service.post<ResponseResult<createArticleRes>>('/article/create')
}

const getArticleInfo = (data: number) => {
    return service.get<ResponseResult<articleType>>('/article/get/info' + '?articleId=' + data)
}

const updateArticleInfo = (data: articleType) => {
    return service.post<ResponseResult<articleType>>('/article/update' +
        '?articleId=' + data.article.id +
        '&title=' + data.article.title +
        '&content=' + data.article.content +
        '&categoryId=' + data.article.categoryId +
        '&tags=' + data.tag)
}

const updateImageHandle = (data: FormData) => {
    return service.post<ResponseResult<imageBackRes>>('/upload/file', data)
}

const publishArticle = (data: articleType) => {
    return service.post<ResponseResult<articleType>>('/article/publish' +
        '?articleId=' + data.article.id +
        '&title=' + data.article.title +
        '&content=' + data.article.content +
        '&categoryId=' + data.article.categoryId +
        '&tags=' + data.tag
    )
}

const deleteArticle = (data: number) => {
    return service.post<ResponseResult<any>>('/article/delete' +
        '?articleId=' + data)
}

const likeArticle = (data: number) => {
    return service.post<ResponseResult<any>>('/like/add' +
        '?articleId=' + data)
}

const cancelLikeArticle = (data: number) => {
    return service.post<ResponseResult<any>>('/like/delete' +
        '?articleId=' + data)
}

const collectArticle = (data: number) => {
    return service.post<ResponseResult<any>>('/collect/add' +
        '?articleId=' + data)
}

const cancelCollectArticle = (data: number) => {
    return service.post<ResponseResult<any>>('/collect/delete' +
        '?articleId=' + data)
}

const getLikeStateOfArticle = (data: number) => {
    return service.get<ResponseResult<isLikeRes>>('/like/check' +
        '?articleId=' + data)
}

const getCollectStateOfArticle = (data: number) => {
    return service.get<ResponseResult<isCollectRes>>('/collect/check' +
        '?articleId=' + data)
}

const getLikeNumber = (data: number) => {
    return service.get<ResponseResult<numberOfLikeAndCollect>>('/like/count' +
        '?articleId=' + data)
}

const getCollectNumber = (data: number) => {
    return service.get<ResponseResult<numberOfLikeAndCollect>>('/collect/count' +
        '?articleId=' + data)
}

const getCategoryArticle = (data: getCategoryArticleReq) => {
    return service.get<ResponseResult<getCategoryArticleRes>>('/article/get/category/list' +
        '?page=' + data.page +
        '&pageSize=' + data.pageSize +
        '&categoryId=' + data.categoryId)
}

const getDraftList = () => {
    return service.get<ResponseResult<getDraftListRes>>('/article/get/draft/list')
}

const getRealTimeSearch = (data: string) => {
    return service.get<ResponseResult<realTimeSearchRes>>('/search?keyword=' + data)
}

export default {
    createArticle,           // 创建文章
    getArticleInfo,          // 获取文章信息
    updateArticleInfo,       // 更新文章信息
    updateImageHandle,       // 上传图片
    publishArticle,          // 发布文章
    deleteArticle,           // 删除文章
    likeArticle,             // 点赞文章
    cancelLikeArticle,       // 取消点赞文章
    collectArticle,          // 收藏文章
    cancelCollectArticle,    // 取消收藏文章
    getLikeStateOfArticle,   // 获取点赞状态
    getCollectStateOfArticle,// 获取收藏状态
    getLikeNumber,           // 获取点赞数
    getCollectNumber,        // 获取收藏数
    getCategoryArticle,      // 获取各分类的文章列表
    getDraftList,            // 获取草稿箱列表
    getRealTimeSearch,       // 获取实时搜索文章列表
}
