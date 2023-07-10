/*
*   日历热力图类型定义文件，包含一些用户类型的定义
*   创建者: 2aurora2
*   创建时间: 2023-07-09
* */

// 日历热力图每一单位列的类型
export type columnDate = {
    nodes: number;
    title: string;
    switch: boolean;
    data: Array<string>;
}
// 日历热力图每一单位节点的类型
export type nodeDate = {
    data: string;
    color: string;
    activity: number;
}
// 后端拿取的单位节点类型
export type perDay = {
    data: string;
    activity: number;
}
