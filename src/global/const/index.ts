/*
*   全局常量的定义
*   创建时间: 2023-07-09
* */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const COLORS = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
const DEFAULTUSERINFO = {
    nodeId: -1,
    id: -1,
    username: 'cs-er',
    email: '',
    password: '',
    gender: 1,
    age: 18,
    avatar: '',
    description: '',
    version: 1,
    following: []
}


export default {
    MONTHS,          // 各月份的英文简写
    COLORS,          // 不同活跃度的颜色标注
    DEFAULTUSERINFO, // 默认用户信息
}
