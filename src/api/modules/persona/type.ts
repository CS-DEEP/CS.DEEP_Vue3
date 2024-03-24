import type { Problem } from '@/type'

export type ResponseResult<T> = {
  code: number;
  message: string;
  data: T;
}

export type getProblemListRes = {
  questionList: [Problem]
}

export type postSendAnswerRes = {
  score: number,
  suggestion: string
}