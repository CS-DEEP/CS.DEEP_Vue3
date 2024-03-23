import type { Problem, userType } from '@/type'

export default interface StateTypes {
  userinfo: userType;
  haveLogin: boolean;
  queryProblem: [[Problem]]
}
