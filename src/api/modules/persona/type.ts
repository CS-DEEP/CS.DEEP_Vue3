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

export type getOverallRes = {
  scoreList: [number],
  suggestionList: [string]
}

export type getAtlasRes = {
  nodes: [],
  categories: [],
  links: []
}