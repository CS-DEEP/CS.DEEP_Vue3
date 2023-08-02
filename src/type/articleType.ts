export type articleBaseInfo = {
    nodeId: number;
    id: number;
    authorId: number;
    title: string;
    content: string;
    categoryId: number;
    createTime: number;
    updateTime: number;
    version: number;
    draft: number;
}

export type articleType = {
    article: articleBaseInfo,
    tag?: Array<string>
}
