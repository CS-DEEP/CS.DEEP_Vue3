<template>
  {{ history }}
  <chat-input-comp @answer-val="answerHandle"></chat-input-comp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { getNextProblem } from '@/global/utils'
import ChatInputComp from '@/components/persona/ChatInputComp.vue'

const id = Number(router.currentRoute.value.params.id)
const history = ref(store.state.messageHistory[id])

const answerHandle = (answer) => {
  if (answer === '') {
    ElMessage({
      message: '回复不可为空！',
      type: 'error'
    })
  } else if (answer === '我还没准备好') {
    // 先保存用户回答
    store.commit('updateMessageHistory', [id, {
      role: 'user',
      content: answer
    }])
    // 用户没准备好的回复
    store.commit('updateMessageHistory', [id, {
      role: 'assistant',
      content: '好的，准备好后请回复“我已准备好”'
    }])
  } else if (answer === '我已准备好') {
    // 先保存用户回答
    store.commit('updateMessageHistory', [id, {
      role: 'user',
      content: answer
    }])
    // 向用户发送下一个问题
    store.commit('updateMessageHistory', [id, {
      role: 'assistant',
      content: getNextProblem(id)
    }])
  } else if (answer === '我要重新测评') {
    // 清空重新测评
    store.commit('clearMessage', id)
  } else {
    // TODO: 处理用户回复测评问题
    ElMessage({
      message: '还没写',
      type: 'error'
    })
  }
}
</script>

<style scoped lang="scss">

</style>