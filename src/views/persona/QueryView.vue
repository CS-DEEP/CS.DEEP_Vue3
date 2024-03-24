<template>
  <div class="query-box">
    <el-container class="container" id="scroll">
      <div class="message-box">
        <div v-for="(item,index) in history" :key="index">
          <chat-left-item-comp :message="item.content" v-if="item.role==='assistant'"></chat-left-item-comp>
          <chat-right-item-comp :message="item.content" v-else></chat-right-item-comp>
        </div>
      </div>
    </el-container>
    <div class="message-input">
      <chat-input-comp @answer-val="answerHandle"></chat-input-comp>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { getFeedback, getNextProblem } from '@/global/utils'
import ChatInputComp from '@/components/persona/ChatInputComp.vue'
import api from '@/api/modules'
import ChatLeftItemComp from '@/components/persona/ChatLeftItemComp.vue'
import ChatRightItemComp from '@/components/persona/ChatRightItemComp.vue'
import type { Answer } from '@/type'

const id = Number(router.currentRoute.value.params.id)
const history = ref(store.state.messageHistory[id])

const answerHandle = (answer: string) => {
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
      content: '好的，准备好后请回复<strong>“我已准备好”</strong>。'
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
  } else if (answer === '查看当前画像结果') {
    router.push({ name: 'persona', params: { userId: store.state.userinfo.id } })
  } else {
    // 先保存用户回答
    store.commit('updateMessageHistory', [id, {
      role: 'user',
      content: answer
    }])

    const question = store.state.queryProblem[id][store.state.queryIndex[id] - 1]
    const answerObj: Answer = {
      categoryId: question['categoryId'],
      dimension: question['dimension'],
      subDimension: question['subDimension'],
      question: question['question'],
      answer: answer
    }
    api.personaApi.postSendAnswer(answerObj).then(res => {
      const msg = getFeedback(answerObj, res.data.data)
      // 保存回复
      store.commit('updateMessageHistory', [id, {
        role: 'assistant',
        content: msg
      }])
    }).catch(err => {
      console.log(err)
    })
  }
}

onMounted(() => {
  api.personaApi.getProblemList(id).then(res => {
    store.commit('updateQueryProblem', [id, res.data.data.questionList])
    console.log(res.data.data)
  }).catch(err => {
    console.log(err)
  })
})
</script>

<style scoped lang="scss">
.query-box {
  background-color: #f3f5fc;
  height: 680px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .message-box {
    width: 55%;

    div {
      margin-top: 20px;
    }
  }
}

.message-input {
  display: flex;
  background-color: #f3f5fc;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>