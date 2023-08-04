/*
*   全局常量的定义
*   创建时间: 2023-07-09
* */

import {commentType} from "@/type";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const COLORS = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
const DEFAULTUSERINFO = {
    nodeId: -1,
    id: 0,
    username: '2aurora2',
    email: '',
    password: '',
    gender: 1,
    age: 18,
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    description: "这个人很懒，什么都没写欸~",
    version: 1
}
const DEFAULTARTICLE = {
    nodeId: -1,
    id: 0,
    authorId: 0,
    title: '这是一篇测试文章',
    content: ``,
    categoryId: -1,
    createTime: 1689949389,
    updateTime: 1689949389,
    version: 1,
    draft: 1
}
const CATEGORYLIST = ['专业知识', '分享发现', '吐槽讨论']
const DEFAULTCOMMENT: commentType = {
    id: 1,
    content: "这是一条测试评论😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀勋哥牛哇带带我；保佑明天10连抽不要歪！！！！",
    authorId: 1,
    articleId: 1,
    createTime: 1690965366840,
    isReply: 0,
    replyId: 1,
    isNasty: 0,
    version: null
}
const DEFAULTONELEVELCOMMENT = {
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    name: '布林布林的',
    content: DEFAULTCOMMENT,
    isShowTwoLevelComment: false,
    isShowEmoji: false,
    replyContent: '',
    publishTime: '2023-8-4 22:20:20',
    numOfReply: 0
}

export default {
    MONTHS,          // 各月份的英文简写
    COLORS,          // 不同活跃度的颜色标注
    DEFAULTUSERINFO, // 默认用户信息
    DEFAULTARTICLE,  // 默认文章信息
    CATEGORYLIST,    // 文章分类
    DEFAULTCOMMENT,  // 默认评论
    DEFAULTONELEVELCOMMENT, // 默认一级评论
}
