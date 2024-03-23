<template>
  <div class="draftView">
    <div class="nan" v-show="draftCount===0"><span>暂无符合条件数据</span></div>
    <div class="draftList" v-show="draftCount > 0">
      <div class="draftItem" v-for="(item,index) in draftList" :key="index" @click="toEditArticle(item.id)">
        <div class="draftTitle">
          {{ item.title }}
        </div>
        <div class="updateTime">
          上次更新于 {{ item.updateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {articleBaseInfo, draftItemType} from "@/type";
import api from "@/api/modules";
import {ElMessage} from "element-plus";
import CONST from "@/global/const"
import {timestampToDateTimeString} from "@/global/utils";
import router from "@/router";

export default {
  name: "MyDraftView",
  mounted() {
    api.articleApi.getDraftList().then(res => {
      if (res.data.code === 200) {
        let targetList = []
        let originData: Array<articleBaseInfo> = res.data.data.articleList
        for (let i = 0; i < originData.length; ++i) {
          let tmp = CONST.DEFAULTDRAFTITEM
          tmp.id = originData[i].id
          tmp.title = originData[i].title
          tmp.updateTime = timestampToDateTimeString(originData[i].updateTime)
          targetList.push(tmp)
        }
        this.draftCount = res.data.data.articleCount
        this.draftList = targetList
      } else {
        ElMessage({
          type: 'error',
          message: res.data.message
        })
      }
    }).then(err => {
      console.log(err)
    })
  },
  data() {
    let draftCount: number = 0
    let draftList: Array<draftItemType> = []
    return {
      draftList,
      draftCount
    }
  },
  methods: {
    toEditArticle(id: number) {
      router.push({name: 'articleEdit', params: {postId: id}})
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.draftView {
  margin-top: 10px;
  margin-left: 10px;

  .nan {
    text-align: center;
    width: 600px;

    span {
      color: #bbbaba;
      font-size: 25px;
    }
  }

  .draftList {
    display: flex;
    flex-direction: column;

    .draftItem {
      width: 700px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      border-radius: 5px;

      .draftTitle {
        font-family: "宋体", "sans-serif";
        font-size: 20px;
        padding-bottom: 2px;
      }

      .updateTime {
        font-family: "Times New Roman", "sans-serif";
        margin-top: 5px;
        font-size: 15px;
        color: #b0acac;
      }

      &:hover {
        background-color: #efeded;
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
