import store from '@/store'
import type { Answer } from '@/type'
import type { postSendAnswerRes } from '@/api/modules/persona/type'

export const getNextProblem = (id: number) => {
  if (store.state.queryProblem[id].length === store.state.queryIndex[id]) {
    return '您已完成此维度所有测评问题，前往查看自己的用户画像吧！如果需要重新测评请回复“我要重新测评”'
  } else {
    store.commit('updateQueryIndex', [id, store.state.queryIndex[id] + 1])
    return store.state.queryProblem[id][store.state.queryIndex[id] - 1]['question']
  }
}

export const getFeedback = (answer: Answer, result: postSendAnswerRes) => {
  return `根据系统后台的评估，您的<strong>${answer.subDimension}</strong>维度得分为${result.score}。</br>依据您的得分，我们给出以下<strong>建议</strong>: </br>
${result.suggestion}</br>是否准备好进行下一问题的测评？如果准备好请回复<strong>“我已准备好”</strong>，未准备好请回复<strong>“我还没准备好”</strong>。`
}
