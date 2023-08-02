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

---
## GitHub项目传送门
[https://github.com/2aurora2/GuessNumGame](https://github.com/2aurora2/GuessNumGame)

---
## Gitee项目传送门
[https://gitee.com/lin_aurora/GuessNumGame](https://gitee.com/lin_aurora/GuessNumGame)

---
## 部分代码
#### 随机产生数

\`\`\`cpp
//随机生成的答案
int AnswerNum1[10];
//设置随机数种子
srand((unsigned int)time(NULL));
//产生当前level对应位数的数字
for (int i = 0; i < level; ++i)
{
\tbool tempJudge = true;
\ttemp = rand() % 10;
\t//保证随机生成的每个数不一样
\tfor (int j = 0; j < i; ++j)
\t\tif (temp == AnswerNum1[j])
\t\t{
\t\t\ttempJudge = false;
\t\t\t--i;
\t\t\tbreak;
\t\t}
\tif (tempJudge)
\t\tAnswerNum1[i] = temp;
}`,
    categoryId: -1,
    createTime: 1689949389,
    updateTime: 1689949389,
    version: 1,
    draft: 1
}
const CATEGORYLIST = ['专业知识', '分享发现', '吐槽讨论']
const TAGBACKCOLOR = ['#633b7a', '#f8f5e8', '#d6c78a']
const TAGTEXTCOLOR = ['#f28487', '#28242a', '#b97d21']


export default {
    MONTHS,          // 各月份的英文简写
    COLORS,          // 不同活跃度的颜色标注
    DEFAULTUSERINFO, // 默认用户信息
    DEFAULTARTICLE,  // 默认文章信息
    CATEGORYLIST,    // 文章分类
    TAGBACKCOLOR,    // 标签背景颜色
    TAGTEXTCOLOR,    // 标签文本颜色
}
