/*
*   全局常量的定义
*   创建时间: 2023-07-09
* */

import {commentType, twoLevelCommentType} from "@/type";

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
    content: `$$
x_1+y_1=z_1
$$

这个公式$x+y=z$怎么样`,
    categoryId: -1,
    createTime: 1689949389,
    updateTime: 1689949389,
    version: 1,
    draft: 1
}
const CATEGORYLIST = ['专业知识', '分享发现', '吐槽讨论']
const DEFAULTCOMMENT: commentType = {
    id: 1,
    content: "啊啊啊啊今天10连没出金QWQ，和散兵无缘了QWQ，巴拉巴拉巴拉巴拉巴拉；啊啊啊啊今天10连没出金QWQ，和散兵是不是无缘了QWQ，巴拉巴拉巴拉巴拉巴拉",
    authorId: 0,
    articleId: 1,
    createTime: 1690965366840,
    isReply: 0,
    replyId: 1,
    isNasty: 0,
    version: null
}
const DEFAULTREPLYCOMMENT: commentType = {
    id: 1,
    content: "呦呦呦~不会有人抽不到吧",
    authorId: 1,
    articleId: 1,
    createTime: 1690965366840,
    isReply: 0,
    replyId: 1,
    isNasty: 1,
    version: null
}

const DEFAULTREPLYCOMMENTPLUS = {
    id: 1,
    content: "没事没事，说不定下一发就出了呢",
    authorId: 0,
    articleId: 1,
    createTime: 1690965366840,
    isReply: 0,
    replyId: 1,
    isNasty: 0,
    version: null
}

const DEFAULTREPLYCOMMENTREQ = {
    articleId: 0,
    content: '',
    replyId: 0,
    replyName: '布林布林的',
    isReply: 1
}

const DEFAULTREPLYCOMMENTREQPLUS = {
    articleId: 0,
    content: '',
    replyId: 0,
    replyName: '叽里咕噜',
    isReply: 1
}

const DEFAULTONELEVELCOMMENT = {
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    name: '布林布林的',
    content: DEFAULTCOMMENT,
    isShowTwoLevelComment: false,
    isShowEmoji: false,
    isShowNastyMark: false,
    publishTime: '2023-8-4 22:20:20',
    numOfReply: 0,
    isOwn: false,
    twoLevelCommentList: [],
    replyEditComment: DEFAULTREPLYCOMMENTREQ
}

const DEFAULTTWOLEVELCOMMENT = {
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    name: '布林布林的',
    publishTime: '2023-08-05 17:30:30',
    ownReplyContent: DEFAULTREPLYCOMMENT,
    quoteContent: '啊啊啊啊今天10连没出金QWQ，和散兵无缘了QWQ，巴拉巴拉巴拉巴拉巴拉；啊啊啊啊今天10连没出金QWQ，和散兵是不是无缘了QWQ，巴拉巴拉巴拉巴拉巴拉',
    isOwn: false,
    isNasty: 1,
    isShowNastyMark: false
}
const DEFAULTTWOLEVELCOMMENTPLUS = {
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    name: 'GGBond',
    publishTime: '2023-08-05 17:30:30',
    ownReplyContent: DEFAULTREPLYCOMMENTPLUS,
    quoteContent: '啊啊啊啊今天10连没出金QWQ，和散兵无缘了QWQ，巴拉巴拉巴拉巴拉巴拉；啊啊啊啊今天10连没出金QWQ，和散兵是不是无缘了QWQ，巴拉巴拉巴拉巴拉巴拉',
    isOwn: true,
    isNasty: 0,
    isShowNastyMark: false
}

const DEFAULTONELEVELCOMMENTPLUS = {
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    name: '叽里咕噜',
    content: DEFAULTCOMMENT,
    isShowTwoLevelComment: false,
    isShowEmoji: false,
    isShowNastyMark: false,
    publishTime: '2023-8-4 22:20:20',
    numOfReply: 2,
    isOwn: false,
    twoLevelCommentList: [DEFAULTTWOLEVELCOMMENT, DEFAULTTWOLEVELCOMMENTPLUS],
    replyEditComment: DEFAULTREPLYCOMMENTREQPLUS
}

const DEFAULTARTICLEITEM = {
    id: 1,
    authorId: 1,
    authorName: '长耳朵提提',
    avatar: 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png',
    title: '【论坛指引】新用户必看！',
    elapsed: '刚刚',
    category: '专业知识'
}

export default {
    MONTHS,          // 各月份的英文简写
    COLORS,          // 不同活跃度的颜色标注
    DEFAULTUSERINFO, // 默认用户信息
    DEFAULTARTICLE,  // 默认文章信息
    CATEGORYLIST,    // 文章分类
    DEFAULTCOMMENT,  // 默认评论
    DEFAULTONELEVELCOMMENT, // 默认一级评论
    DEFAULTONELEVELCOMMENTPLUS, // 默认一级评论
    DEFAULTTWOLEVELCOMMENT, // 默认二级评论
    DEFAULTTWOLEVELCOMMENTPLUS,// 默认二级评论
    DEFAULTREPLYCOMMENTREQ,// 默认回复请求
    DEFAULTARTICLEITEM,    // 默认文章列表Item
}
