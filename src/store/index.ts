import { createStore, Store } from 'vuex'
import type StateTypes from '@/store/interface'
import type { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'
import CONST from '../global/const/index'
import type { Problem, userType } from '@/type'

export default createStore<StateTypes>({
  state: {
    userinfo: CONST.DEFAULTUSERINFO,
    haveLogin: true,
    messageHistory: [
      [
        {
          role: 'assistant',
          content: '欢迎来到“在线自主学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
        }
      ],
      [
        {
          role: 'assistant',
          content: '欢迎来到“在线协作学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
        }
      ],
      [
        {
          role: 'assistant',
          content: '欢迎来到“数字化学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
        }
      ]
    ],
    queryProblem: [
      [], [], []
    ],
    queryIndex: [
      0, 0, 0
    ]
  },

  mutations: {
    updateUserinfo(state: any, info: userType) {
      state.userinfo = info
    },
    updateLoginState(state: any) {
      state.haveLogin = !state.haveLogin
    },
    // 更新用户聊天记录
    updateMessageHistory(state: any, payload: [number, any]) {
      const [id, info] = payload
      state.messageHistory[id].push(info)
    },
    // 更新问题
    updateQueryProblem(state: any, payload: [number, [Problem]]) {
      const [id, problems] = payload
      state.queryProblem[id] = problems
    },
    // 更新问题索引
    updateQueryIndex(state: any, payload: [number, number]) {
      const [id, index] = payload
      state.queryIndex[id] = index
    },
    // 清空已完成的测评记录
    clearMessage(state: any, payload: [number]) {
      const [id] = payload
      if (id === 0) {
        state.messageHistory[0] = [
          {
            role: 'assistant',
            content: '欢迎来到“在线自主学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
          }
        ]
        state.queryIndex[0] = 0
      } else if (id === 1) {
        state.messageHistory[1] = [
          {
            role: 'assistant',
            content: '欢迎来到“在线协作学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
          }
        ]
        state.queryIndex[1] = 0
      } else {
        state.messageHistory[2] = [
          {
            role: 'assistant',
            content: '欢迎来到“数字化学习能力”的画像测评！接下来将会询问你一系列问题，你是否准备好了？如果准备好请回复“我已准备好”，未准备好请回复“我还没准备好”。'
          }
        ]
        state.queryIndex[2] = 0
      }
    }
  },
  plugins: [createPersistedState()]
})

export const key: InjectionKey<Store<StateTypes>> = Symbol('vue-store') as InjectionKey<Store<StateTypes>>
