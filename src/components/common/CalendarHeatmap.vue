<template>
  <div class="calendar-heatmap">
    <div class="weekday">
      <div>Tuesday</div>
      <div>Thursday</div>
      <div>Saturday</div>
    </div>
    <div class="days" v-for="(perColumn, index) in columnArray" :key="index">
      <div class="title">{{ perColumn.title }}</div>
      <div
          class="date-wrapper"
          v-for="(dateData, dateIndex) in perColumn.data"
          :key="dateIndex"
          :style="`background:${dateData['color']};`"
      >
        <el-tooltip placement="top" :delay="300" :content="`${dateData['data']}`" hide-after="0">
          <div class="date"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import CONST from '../../global/const/index'
import {columnDate, nodeDate, perDay} from '@/type'

export default {
  name: "calendarHeatmap",
  data() {
    let columnArray: Array<columnDate>;
    let nodeArray: Array<perDay> = [];
    return {
      columnArray,
      nodeArray,
    }
  },
  props: {
    NodeArray: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  beforeUpdate() {
    console.log(this.NodeArray)
    this.nodeArray = [...this.NodeArray]
    this.init();
    for (let k = 0; k < this.NodeArray?.length; ++k) {
      let flag = false
      for (let i = 0; i < this.columnArray.length; ++i) {
        for (let j = 0; j < this.columnArray[i].data.length; ++j) {
          if (this.nodeArray?.[k].data === this.columnArray[i].data[j]['data']) {
            this.columnArray[i].data[j]['activity'] = this.nodeArray?.[k].activity
            flag = true
            break
          }
          if (flag) {
            break
          }
        }
        if (flag) {
          break
        }
      }
    }
    this.fillColor();
  },
  methods: {
    // 初始化日历热力图每一个节点:活跃度均初始化为0
    init() {
      // 获取去年的年份
      let prevYear = moment().format('YYYY') - 1
      // 获取去年今天的具体日期的字符串并将其格式化（YYYY-MM-DD）
      let prevTodayFormatStr = prevYear + '-' + moment().format('MM-DD')
      let prevToday = moment(prevTodayFormatStr).format('YYYY-MM-DD')
      // 获取去年今天的星期数
      let prevTodayWeekNum = moment(prevToday).weekday()
      // 第一个方格的初始日期（从去年今天开始往后的日期中离去年今天最近的星期一的日期）
      let firstNodeDate = prevTodayWeekNum > 1 ? moment(prevToday).add(8 - prevTodayWeekNum, 'days').format('YYYY-MM-DD') : prevToday
      // 初始日期至今日的天数，包括今日
      let days = moment().diff(moment(firstNodeDate), 'days') + 1
      // 最大列数（周数）
      let lineNums = Math.ceil(days / 7)
      // 绘制图表的源数据
      let dateData = []
      for (let i = 0; i < lineNums; i++) {
        // 第i列的天数（即方格数）
        let weekColumn = (i === lineNums - 1 ? (days % 7 ? days % 7 : 7) : 7)
        // 开始计算title（月份的图例）
        // theWeekStartMonth表示第i列第一个日期的月份
        // theWeekEndMonth表示第i+1列第一个日期的月份
        let theWeekStartMonth = moment(firstNodeDate).add(i * 7, 'days').format('M')
        let theWeekEndMonth = moment(firstNodeDate).add(i * 7 + weekColumn, 'days').format('M')
        let title: string;
        let ifSwitchMonth: boolean = false;
        if (i === 0) {
          title = CONST.MONTHS[theWeekStartMonth - 1];
        } else if (theWeekEndMonth - theWeekStartMonth) {
          title = CONST.MONTHS[theWeekEndMonth - 1];
          ifSwitchMonth = true;
        }
        let perColumn: columnDate = {
          nodes: weekColumn,
          title: title,
          switch: ifSwitchMonth,
          data: []
        }
        dateData.push(perColumn)
        for (let j = 0; j < dateData[i].nodes; j++) {
          let date = moment(firstNodeDate).add(i * 7 + j, 'days').format('YYYY-MM-DD')
          let node: nodeDate = {
            data: date,
            color: CONST.COLORS[0],
            activity: 0
          }
          dateData[i].data.push(node)
        }
      }
      this.columnArray = dateData;
    },

    // 依据每个日期的活跃度赋予每一个节点颜色
    fillColor() {
      for (let i = 0; i < this.columnArray.length; ++i) {
        for (let j = 0; j < this.columnArray[i].data.length; ++j) {
          if (this.columnArray[i].data[j]['activity'] == 0) {
            this.columnArray[i].data[j]['color'] = CONST.COLORS[0];
          } else if (this.columnArray[i].data[j]['activity'] <= 15) {
            this.columnArray[i].data[j]['color'] = CONST.COLORS[1];
          } else if (this.columnArray[i].data[j]['activity'] <= 30) {
            this.columnArray[i].data[j]['color'] = CONST.COLORS[2];
          } else if (this.columnArray[i].data[j]['activity'] <= 45) {
            this.columnArray[i].data[j]['color'] = CONST.COLORS[3];
          } else if (this.columnArray[i].data[j]['activity'] > 60) {
            this.columnArray[i].data[j]['color'] = CONST.COLORS[4];
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Times New Roman", "sans-serif";
}


.calendar-heatmap {
  width: 800px;
  height: 130px;
  background-color: #fff;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  font-size: 13px;

  .weekday {
    width: 50px;
    margin-right: 3px;
    margin-top: 22px;

    & > div {
      margin-top: 13px;
      width: 30px;
      height: 14px;
    }
  }

  .days {
    width: 11px;
    margin-right: 3px;

    .title {
      width: 14px;
      height: 14px;
      margin-bottom: 8px;
      text-align: left;
      overflow: visible;
      white-space: nowrap;
    }

    .date-wrapper {
      width: 11px;
      height: 11px;
      background: #EBEDF0;
      margin-bottom: 3px;

      .date {
        width: 11px;
        height: 11px;
        border-radius: 5px;

        :hover {
          width: 13px;
          height: 13px;
        }
      }
    }
  }
}

</style>
