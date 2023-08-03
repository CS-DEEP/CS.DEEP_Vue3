/*
*   全局常量的定义
*   创建时间: 2023-07-09
* */
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
    content: `
## 前言
基于命令行界面的C++程序设计的小游戏——猜数字

>测试：
>
>* 点赞数和收藏数正常显示+超过1000数会不会转换为类似'1.2k'

| 姓名 | 成绩 | 等级 |
| ---- | ---- | ---- |
| Alen | 60   | A    |
| Mike | 52   | B    |
| Jane | 22   | C    |

\`\`\`C++
#include<iostream>
using namespace std;
int main(void){
    cout<<11<<endl;
    return 0;
}
\`\`\`
$$
x+y=z
$$`,
    categoryId: -1,
    createTime: 1689949389,
    updateTime: 1689949389,
    version: 1,
    draft: 1
}
const CATEGORYLIST = ['专业知识', '分享发现', '吐槽讨论']
const DEFAULTCOMMENT = {
    id: 1,
    content: "这是一条测试评论",
    authorId: 1,
    createTime: 1690965366840,
    isReply: 0,
    replyId: 1,
    isNasty: 0,
    version: null
}


export default {
    MONTHS,          // 各月份的英文简写
    COLORS,          // 不同活跃度的颜色标注
    DEFAULTUSERINFO, // 默认用户信息
    DEFAULTARTICLE,  // 默认文章信息
    CATEGORYLIST,    // 文章分类
    DEFAULTCOMMENT,  // 默认评论
}
