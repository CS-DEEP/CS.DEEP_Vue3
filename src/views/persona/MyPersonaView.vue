<template>
  <div class="persona-page">
    <h3 style="border-left: 3px solid #41b997;border-radius: 3px;padding-left: 5px">总体评价得分<span
      style="font-size: 10px">(蓝色区域为得分区域)</span></h3>
    <div class="score-box">
      <div id="score-0" style="width: 200px;height: 200px"></div>
      <div id="score-1" style="width: 200px;height: 200px"></div>
      <div id="score-2" style="width: 200px;height: 200px"></div>
      <div id="score-3" style="width: 200px;height: 200px"></div>
    </div>
    <h3 style="border-left: 3px solid #41b997;border-radius: 3px;padding-left: 5px;margin-top: 20px">
      二级维度详细得分</h3>
    <div class="sub-score-box">
      <div id="sub-score" style="width: 800px;height: 530px"></div>
    </div>
    <h3 style="border-left: 3px solid #41b997;border-radius: 3px;padding-left: 5px;margin-top: 20px">维度建议</h3>
    <div class="suggestion-box">
      <h4 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 12px">
        在线自主学习能力:</h4>
      <div>{{ suggestionList[0] }}</div>
      <h4 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 8px">
        在线协作学习能力:</h4>
      <div>{{ suggestionList[1] }}</div>
      <h4 style="border-left: 3px solid #b9c2bf;border-radius: 3px;padding-left: 5px;margin-top: 8px">
        数字化学习能力:</h4>
      <div>{{ suggestionList[2] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import api from '@/api/modules'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

const scoreList = ref([3.2, 2.3, 3.5, 3.0])
const suggestionList = ref([])
const subScore = ref([[1, 2, 3, 4], [0, 2, 1, 4], [2, 3, 4, 1]])
const dom0 = shallowRef()
const dom1 = shallowRef()
const dom2 = shallowRef()
const dom3 = shallowRef()
const dom4 = shallowRef()

onMounted(() => {
  dom0.value = echarts.init(document.getElementById('score-0'))
  dom1.value = echarts.init(document.getElementById('score-1'))
  dom2.value = echarts.init(document.getElementById('score-2'))
  dom3.value = echarts.init(document.getElementById('score-3'))
  dom4.value = echarts.init(document.getElementById('sub-score'))
  drawScorePie()
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
    graphic: [
      {
        //环形图中间添加文字
        type: 'text', //通过不同top值可以设置上下显示
        left: 'center',
        top: 'center',
        style: {
          text: scoreList.value[0],
          textAlign: 'center',
          fill: '#1E7CE8',
          fontSize: 25,
          lineHeight: 20
        }
      }
    ],
    color: ['#6687ec', '#e5dcdc'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '在线自主学习能力',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
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
    color: ['#6687ec', '#e5dcdc'],
    tooltip: {
      trigger: 'item'
    },
    graphic: [
      {
        //环形图中间添加文字
        type: 'text', //通过不同top值可以设置上下显示
        left: 'center',
        top: 'center',
        style: {
          text: scoreList.value[1],
          textAlign: 'center',
          fill: '#1E7CE8',
          fontSize: 30,
          lineHeight: 20
        }
      }
    ],
    series: [
      {
        name: '在线协作学习能力',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
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
    graphic: [
      {
        //环形图中间添加文字
        type: 'text', //通过不同top值可以设置上下显示
        left: 'center',
        top: 'center',
        style: {
          text: scoreList.value[2],
          textAlign: 'center',
          fill: '#1E7CE8',
          fontSize: 30,
          lineHeight: 20
        }
      }
    ],
    color: ['#6687ec', '#e5dcdc'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '数字化学习能力',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
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
    color: ['#6687ec', '#e5dcdc'],
    tooltip: {
      trigger: 'item'
    },
    graphic: [
      {
        //环形图中间添加文字
        type: 'text', //通过不同top值可以设置上下显示
        left: 'center',
        top: 'center',
        style: {
          text: scoreList.value[3],
          textAlign: 'center',
          fill: '#1E7CE8',
          fontSize: 30,
          lineHeight: 20
        }
      }
    ],
    series: [
      {
        name: '综合评价',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        labelLine: {
          show: false
        },
        data: [
          { value: scoreList.value[3], name: '' },
          { value: 5 - scoreList.value[3], name: '' }
        ]
      }
    ]
  })
  dom4.value.setOption({
    tooltip: {
      trigger: 'axis'
    },
    radar: [
      {
        indicator: [
          { text: '技术及目标计划制定', max: 5, color: '#000000' },
          { text: '学习效果评价', max: 5, color: '#000000' },
          { text: '学习过程调控', max: 5, color: '#000000' },
          { text: '学习内容及材料利用', max: 5, color: '#000000' }
        ],
        center: ['24%', '37%'],
        radius: 80
      },
      {
        indicator: [
          { text: '小组积极情绪评价', max: 5, color: '#000000' },
          { text: '小组积极情绪表达', max: 5, color: '#000000' },
          { text: '师生互动沟通', max: 5, color: '#000000' },
          { text: '小组积极情绪回应', max: 5, color: '#000000' }
        ],
        radius: 80,
        center: ['50%', '80%']
      },
      {
        indicator: [
          { text: '数字化学习意识', max: 5, color: '#000000' },
          { text: '数字化学习行为', max: 5, color: '#000000' },
          { text: '数字化学习管理', max: 5, color: '#000000' },
          { text: '数字化学习评价', max: 5, color: '#000000' }
        ],
        center: ['75%', '37%'],
        radius: 80
      }
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {},
        data: [
          {
            value: subScore.value[0],
            name: '在线自主学习能力'
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 1,
        areaStyle: {},
        tooltip: {
          trigger: 'item'
        },
        data: [
          {
            value: subScore.value[1],
            name: '在线协作学习能力'
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 2,
        areaStyle: {},
        tooltip: {
          trigger: 'item'
        },
        axisLabel: {
          color: '#000000'
        },
        data: [
          {
            name: '数字化学习能力',
            value: subScore.value[2]
          }
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
  dom4.value.dispose()
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
      padding-bottom: 8px;
      padding-top: 8px;
      padding-right: 8px;
    }
  }
}

.sub-score-box {
  position: relative;

  #sub-score {
    position: relative;
    left: -85px;
  }
}
</style>