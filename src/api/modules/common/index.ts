import {
    getParticularArticleListReq,
    getParticularArticleListRes,
    getRandomTagListRes, getWebsiteUserCountRes,
    ResponseResult
} from "@/api/modules/common/type";
import service from "@/api/instance";

const getParticularArticleList = (data: getParticularArticleListReq) => {
    return service.get<ResponseResult<getParticularArticleListRes>>('/article/get/all' +
        '?page=' + data.page +
        '&sortBy=' + data.sortBy)
}

const getRandomTagList = () => {
    return service.get<ResponseResult<getRandomTagListRes>>('/article/get/tag')
}

const getWebsiteUserCount = () => {
    return service.get<ResponseResult<getWebsiteUserCountRes>>('/user/count')
}

export default {
    getParticularArticleList,   // 依据不同排序方式获取文章首页列表
    getRandomTagList,           // 获取随机的标签列表用于展示在“话题广场”
    getWebsiteUserCount,        // 获取网站用户数
}
