<template>
  <div class="persona-page">
    <h2 style="border-left: 3px solid #41b997;border-radius: 3px;padding-left: 5px">维度得分</h2>
    <div style="margin-top: 10px">
      <div
        style="width: 40px;height: 20px;background-color: #5470c6;float: left;border-radius: 5px;margin-right: 5px"></div>
      区域代表该维度得分
    </div>
    <div class="score-box">
      <div id="score-0" style="width: 130px;height: 130px"></div>
      <div id="score-1" style="width: 130px;height: 130px"></div>
      <div id="score-2" style="width: 130px;height: 130px"></div>
      <div id="score-3" style="width: 130px;height: 130px"></div>
    </div>
    <h2 style="border-left: 3px solid #41b997;border-radius: 3px;padding-left: 5px;margin-top: 20px">维度建议</h2>
    <div class="suggestion-box">
      <h3 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 8px">
        在线自主学习能力:</h3>
      <div>{{ suggestionList[0] }}</div>
      <h3 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 8px">
        在线协作学习能力:</h3>
      <div>{{ suggestionList[1] }}</div>
      <h3 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 8px">
        数字化学习能力:</h3>
      <div>{{ suggestionList[2] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import api from '@/api/modules'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

const scoreList = ref([])
const suggestionList = ref([])
const dom0 = shallowRef()
const dom1 = shallowRef()
const dom2 = shallowRef()
const dom3 = shallowRef()

onMounted(() => {
  dom0.value = echarts.init(document.getElementById('score-0'))
  dom1.value = echarts.init(document.getElementById('score-1'))
  dom2.value = echarts.init(document.getElementById('score-2'))
  dom3.value = echarts.init(document.getElementById('score-3'))
  // drawScorePie()
  // 获取所有结果
  api.personaApi.getOverallResult().then(res => {
    if (res.data.code === 200) {
      scoreList.value = res.data.data.scoreList
      suggestionList.value = res.data.data.suggestionList
      drawScorePie()
    } else {
      ElMessage({
        type: 'error',
        message: res.data.message
      })
    }
  }).catch(err => {
    console.log(err)
  })
})

const drawScorePie = () => {
  dom0.value.setOption({
    title: {
      text: '在线自主学习能力',
      textStyle: {
        fontSize: 13
      },
      left: 'center',
      bottom: -4
    },
    color: ['#5470c6', '#cbc4c4'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '在线自主学习能力',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: false
        },
        data: [
          { value: scoreList.value[0], name: '' },
          { value: 5 - scoreList.value[0], name: '' }
        ]
      }
    ]
  })
  dom1.value.setOption({
    title: {
      text: '在线协作学习能力',
      textStyle: {
        fontSize: 13
      },
      left: 'center',
      bottom: -4
    },
    color: ['#5470c6', '#cbc4c4'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '在线协作学习能力',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: false
        },
        data: [
          { value: scoreList.value[1], name: '' },
          { value: 5 - scoreList.value[1], name: '' }
        ]
      }
    ]
  })
  dom2.value.setOption({
    title: {
      text: '数字化学习能力',
      textStyle: {
        fontSize: 13
      },
      left: 'center',
      bottom: -4
    },
    color: ['#5470c6', '#cbc4c4'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '数字化学习能力',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: false
        },
        data: [
          { value: scoreList.value[2], name: '' },
          { value: 5 - scoreList.value[2], name: '' }
        ]
      }
    ]
  })
  dom3.value.setOption({
    title: {
      text: '综合评价',
      textStyle: {
        fontSize: 13
      },
      left: 'center',
      bottom: -4
    },
    color: ['#5470c6', '#cbc4c4'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '综合评价',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 5 - scoreList.value[3], name: '' },
          { value: scoreList.value[3], name: '' }
        ]
      }
    ]
  })
}

onBeforeUnmount(() => {
  dom0.value.dispose()
  dom1.value.dispose()
  dom2.value.dispose()
  dom3.value.dispose()
})
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.persona-page {
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;

  .score-box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    margin-top: 10px;
  }

  .suggestion-box {
    div {
      padding-bottom: 5px;
      padding-top: 5px;
      padding-right: 5px;
    }
  }
}
</style>