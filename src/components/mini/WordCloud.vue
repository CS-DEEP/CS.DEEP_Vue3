<template>
  <div class="word-cloud">
    <span
        v-for="(item,index) in showTagList"
        :key="index"
        :style="getStyle(item)">
      {{ item.text }}
    </span>
  </div>
</template>

<script lang="ts">
import {generateDarkColor} from "@/global/utils";
import {tagItemType} from "@/type";

export default {
  name: "WordCloud",
  props: {
    tagList: {
      type: Array,
      default: () => {
        return []
      }
    },
    maxSize: {
      type: Number,
      default: 5
    },
    minSize: {
      type: Number,
      default: 4
    },
    baseSize: {
      type: Number,
      default: 2
    }
  },
  data() {
    let showTagList: Array<tagItemType>
    let maxFreq: number = 10
    let minFreq: number = 3
    return {
      showTagList,
      maxFreq,
      minFreq,
    }
  },
  mounted() {
    this.generateTagList()
  },
  methods: {
    getSize(freq) {
      const baseSize = (this.maxSize + this.minSize) / 2;
      const addSize =
          ((this.maxSize - this.minSize) * (freq - this.minFreq)) /
          (this.maxFreq - this.minFreq);
      return (
          ((this.minSize + addSize) / baseSize) * this.baseSize - 0.7 + "rem"
      );
    },
    getRandomNum(minN, maxN) {
      return Math.floor(Math.random() * (maxN - minN + 1) + minN);
    },
    getRandomPoint() {
      const x = this.getRandomNum(0, 250 - 20),
          y = this.getRandomNum(0, 250 - 20);
      return {x: x, y: y};
    },
    getRandomDeg() {
      let res = "";
      res += this.getRandomNum(-45, 45);
      return res;
    },
    generateTagList() {
      let showTextList = [];
      this.tagList!.map(item => {
        let temp: object = {};
        temp.text = item;
        temp.freq = this.getRandomNum(2, 10);
        temp.size = this.getSize(temp.freq);
        const point = this.getRandomPoint();
        const color = generateDarkColor();
        const deg = this.getRandomDeg();
        temp.point = point;
        temp.color = color;
        temp.deg = deg;
        showTextList.push(temp);
      });
      showTextList = showTextList.sort((a, b) => {
        return 0.5 - Math.random();
      });
      this.showTagList = showTextList;
    },
    getStyle(item) {
      let res = "";
      res += "font-size:" + item.size + ";";
      res += "float: left;";
      res += "color:" + item.color + ";";
      return res;
    },
  }

}
</script>

<style scoped lang="scss">
.word-cloud {
  position: relative;
  font-family: "Times New Roman", "宋体", "sans-serif";
  width: 250px;
  height: max-content;

  span {
    transform-origin: 0 0;
    padding: 0.3rem;
    margin: 0 auto;
  }
}
</style>
