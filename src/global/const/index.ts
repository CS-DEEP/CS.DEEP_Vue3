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
## 游戏规则
1. 系统会随机产生一组按一定顺序排列且**不重复**的数字0-9，玩家需要猜出正确的数字及其所在的位置

2. 系统会根据玩家每次猜测显示玩家的猜测正确与否的提示，包括：

   * 猜对数字且位置正确的个数
   * 猜对数字但位置不正确的个数

3. 游戏可自定义难度，即自定义要猜测的数字的个数(最高自定为9，游戏闯关可以达到10)，若无自定义，默认

   从2个数字猜起

4. 游戏的闯关模式分为简单难度以及困难难度：

   * 简单模式：猜测的次数没有限制，只要猜测正确即可进入下一关
   * 困难模式：系统会记录玩家猜测的次数，猜测次数在一定范围内才能进入下一关

5. 当玩家通关难度为10的关卡后，本游戏就结束了，再次开始游戏会跳转到难度为2的关卡

6. 游戏规则就是这么简单，管你听没听懂，玩就完了(狗头.jpg)

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
