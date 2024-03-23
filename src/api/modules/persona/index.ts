import service from '@/api/instance'
import type { getProblemListRes, ResponseResult } from '@/api/modules/persona/type'

const getProblemList = (data: number) => {
  return service.get<ResponseResult<getProblemListRes>>('/persona/get/question?categoryId=' + data)
}

export default {
  getProblemList  // 获取不同维度的问题
}