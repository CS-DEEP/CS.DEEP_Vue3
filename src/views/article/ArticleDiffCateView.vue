<template>
  <div class="catePage">
    <div class="pageTop">
      <div class="cateTitle">
        {{ cateTitle }}
      </div>
      <div class="cateIntro">
        {{ intro }}
      </div>
    </div>
    <div class="noDataImg" v-show="!articleCount">
      <img src="../../assets/image/noData.png" alt="noData">
      <p>暂无数据</p>
    </div>
    <div class="article-list">
      <div class="article-item" v-for="(item,index) in articleList" :key="index" @click="toArticleDetail(item.id)">
        <div class="avatar">
          <img :src="item.avatar" alt="avatar">
        </div>
        <div class="simple-info">
          <div class="title">{{ item.title }}</div>
          <div class="name-and-time">
            <div class="name">{{ item.authorName }}</div>
            <div class="time"> 发布于 {{ item.elapsed }}</div>
          </div>
        </div>
        <div class="cate">
          <span>{{ item.category }}</span>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
          layout="prev, pager, next"
          :total="this.articleCount"
          :page-size="12"
          :pager-count="5"
          :hide-on-single-page="true"
          background
          @current-change="getArticleListPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import api from '../../api/modules'
import CONST from '../../global/const'
import {articleItemType, userType} from "@/type";
import {debounce, getElapsedTime} from "@/global/utils";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "ArticleDiffCateView",
  mounted() {
    this.cateTitle = CONST.CATEGORYOBJ[this.$route.params.cateId].name
    this.intro = CONST.CATEGORYOBJ[this.$route.params.cateId].intro
    api.articleApi.getCategoryArticle({
      page: 1,
      pageSize: 12,
      categoryId: Number(this.$route.params.cateId)
    }).then(async res => {
      if (res.data.code === 200) {
        this.articleCount = res.data.data.articleCount
        let originListData = res.data.data.articleList
        let targetList = []
        for (let i = 0; i < originListData.length; ++i) {
          let temp: articleItemType = {...CONST.DEFAULTARTICLEITEM};
          temp.title = originListData[i].title;
          temp.id = originListData[i].id;
          temp.authorId = originListData[i].authorId;
          temp.elapsed = getElapsedTime(originListData[i].updateTime);
          temp.category = CONST.CATEGORYOBJ[originListData[i].categoryId - 1].name;
          await this.getUserinfoByUserId(originListData[i].authorId).then(res => {
            temp.avatar = res.avatar;
            temp.authorName = res.username;
          })
          targetList.push(temp)
        }
        this.articleList = targetList
      }
    }).catch(err => {
      console.log(err)
    })
    console.log(this.articleList)
  },
  data() {
    let cateTitle: String
    let intro: String
    let articleCount: number = 0
    let articleList: Array<articleItemType> = []
    let articlePage: number = 1
    return {
      cateTitle,
      intro,
      articleCount,
      articleList,
      articlePage
    }
  },
  methods: {
    // 根据用户id获取用户头像和用户名
    async getUserinfoByUserId(id: number) {
      let user: userType;
      await api.userApi.getUserinfoData(id).then(res => {
        user = res.data.data.user
      }).catch(err => {
        console.log(err)
      })
      return user;
    },
    // 防抖函数
    debouncedFetchData: debounce(function () {
      this.fetchData(this.articlePage);
    }, 300),
    getArticleListPage(val: number) {
      this.articlePage = val;
      this.articleList = []
      this.debouncedFetchData();
    },
    // 请求文章列表数据
    fetchData(page: number) {
      api.articleApi.getCategoryArticle({
        page: page,
        pageSize: 12,
        categoryId: Number(this.$route.params.cateId) + 1
      }).then(async res => {
        if (res.data.code === 200) {
          this.articleCount = res.data.data.articleCount
          let originListData = res.data.data.articleList
          let targetList = []
          for (let i = 0; i < originListData.length; ++i) {
            let temp: articleItemType = {...CONST.DEFAULTARTICLEITEM};
            temp.title = originListData[i].title;
            temp.id = originListData[i].id;
            temp.authorId = originListData[i].authorId;
            temp.elapsed = getElapsedTime(originListData[i].updateTime);
            temp.category = CONST.CATEGORYOBJ[originListData[i].categoryId - 1].name;
            await this.getUserinfoByUserId(originListData[i].authorId).then(res => {
              temp.avatar = res.avatar;
              temp.authorName = res.username;
            })
            targetList.push(temp)
          }
          this.articleList = targetList
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    toArticleDetail(id: number) {
      router.push({name: 'articleDetails', params: {postId: id}})
    }
  }
}
</script>

<style scoped lang="scss">
.catePage {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pageTop {
    width: 100%;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e8ecf3;

    .cateTitle {
      font-family: "楷体", "sans-serif";
      font-size: 35px;
    }

    .cateIntro {
      font-family: "楷体", "sans-serif";
      font-size: 17px;
      margin-top: 10px;
    }
  }

  .noDataImg {
    width: 860px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100px;
      height: auto;
    }

    p {
      color: #a19e9e;
      padding-top: 10px;
    }
  }

  .article-list {
    width: 860px;
    display: flex;
    flex-direction: column;

    .article-item {
      width: 860px;
      height: 65px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 50px;
          height: auto;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .simple-info {
        width: 720px;
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-family: "Times New Roman", "宋体", "sans-serif";

        .title {
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .name-and-time {
          font-size: 14px;
          display: flex;
          flex-flow: row nowrap;
          padding-left: 5px;
          font-family: "微软雅黑", "sans-serif";
          color: #c7c5c5;

          .name {
            padding-right: 5px;
          }
        }
      }

      .cate {
        width: 80px;

        span {
          padding: 8px;
          color: white;
          border-radius: 5px;
          background-color: #546577;
        }
      }
    }

    .article-item:first-child {
      margin-top: 13px;
    }

    .article-item:hover {
      background-color: #f3f6f9;
    }
  }

  .pagination {
    width: 850px;
    display: flex;
    margin-top: 15px;
    justify-content: center;
  }
}
</style>
