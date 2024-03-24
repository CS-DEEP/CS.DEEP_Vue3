import service from '@/api/instance'
import type { getOverallRes, getProblemListRes, postSendAnswerRes, ResponseResult } from '@/api/modules/persona/type'
import type { Answer } from '@/type'

const getProblemList = (data: number) => {
  return service.get<ResponseResult<getProblemListRes>>('/persona/get/question?categoryId=' + data)
}

const postSendAnswer = (data: Answer) => {
  return service.post<ResponseResult<postSendAnswerRes>>('/persona/answer/question?categoryId=' + data.categoryId +
    '&dimension=' + data.dimension +
    '&subDimension=' + data.subDimension +
    '&question=' + data.question +
    '&answer=' + data.answer)
}

const getOverallResult = () => {
  return service.get<ResponseResult<getOverallRes>>('/persona/get/score')
}

export default {
  getProblemList,   // 获取不同维度的问题
  postSendAnswer,   // 获取当前回复的得分和建议
  getOverallResult  // 获取所有得分和建议
}