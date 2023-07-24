<template>
  首页(内容撑开)
  <el-button @click="toPublishPage">发布</el-button>
</template>

<script lang="ts">
import router from "@/router";
import api from "@/api/modules/index"
import CONST from "@/global/const"

export default {
  name: 'HomeView',
  methods: {
    toPublishPage() {
      api.articleApi.createArticle().then(res => {
        if (res.data.code === 200) {
          router.push({name: 'articleEdit', params: {postId: res.data.data.article.id}})
        } else {
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
