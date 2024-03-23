import store from '@/store'

export const getNextProblem = (id: number) => {
    if (store.state.queryProblem[id].length === store.state.queryIndex[id]) {
        return '您已完成此维度所有测评问题，前往查看自己的用户画像吧！如果需要重新测评请回复“我要重新测评”'
    } else {
        store.commit('updateQueryIndex', [id, store.state.queryIndex[id] + 1])
        return store.state.queryProblem[id][store.state.queryIndex[id] - 1]['question']
    }
}