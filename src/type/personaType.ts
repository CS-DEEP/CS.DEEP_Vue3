export type Problem = {
  id: number
  categoryId: number,
  category: string,
  dimension: string,
  subDimension: string,
  question: string
}

export type Answer = {
  categoryId: number,
  dimension: string,
  subDimension: string,
  question: string,
  answer: string
}