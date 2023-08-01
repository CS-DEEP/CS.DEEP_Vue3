<template>
  <div class="article-detail-page">
    <el-container>
      <el-header class="header">
        <div class="headerContainer">
          <div class="headTop">
            <!--TODO:分类页跳转-->
            <el-button plain>{{ articleCate }}</el-button>
            <div class="tags">
              <div v-for="(item,index) in articleTags" :key="index">
                {{ item }} {{ index < articleTags.length - 1 ? '&' : '' }}
              </div>
            </div>
          </div>
          <h1>{{ articleInfo.title }}</h1>
        </div>
      </el-header>
      <el-main>
        <div class="bodyContainer">
          <div class="avatar">
            <el-popover show-after="500" :width="250"
                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
              <template #reference>
                <el-avatar :src="authorInfo.avatar"/>
              </template>
              <template #default>
                <div class="demo-rich-content"
                     style="display: flex; gap: 8px; flex-direction: row;background-color: transparent">
                  <el-avatar :size="80" :src="authorInfo.avatar"/>
                  <div style="margin: 5px 10px;position:relative;flex-direction: column">
                    <div style="font-size: 18px;font-family: 'Times New Roman','宋体','sans-serif'">
                      {{ authorInfo.username }}
                    </div>
                    <div style="font-size: 10px;font-family: 'Times New Roman','宋体','sans-serif'">
                      {{ authorInfo.age }}岁
                    </div>
                    <div style="">
                      <!--TODO:用户关注Handle以及用户个人中心跳转-->
                      <el-button style="
                      background-color: #959896;
                      color: #fff;
                      border: 2px solid #dcdcdc;
                      width: 60px;
                      height: 25px;
                      margin-top: 5px;
                      text-align: center;
                      ">关注
                      </el-button>
                    </div>
                  </div>
                </div>
              </template>
            </el-popover>
          </div>
          <div class="paperMessage">
            <div class="baseInfo">
              <span class="avatarName" style="display: block">{{ authorInfo.username }}</span>
              <span class="date">{{ getUpdateData }}</span>
              <span class="state">
              <i class="iconfont icon-shizhongclock74"></i>
              <span>已编辑</span>
            </span>
            </div>
            <div class="articleContent">
              <div v-html="markToHtml" id="content"
                   style="color: #727070;font-family: 'Times New Roman','宋体','sans-serif'"></div>
            </div>
          </div>
          <div class="like-collect">
            <div class="like" @click="likeHandle">
              <img :src="isLike?haveLike:haveNotLike" alt="like">
            </div>
            <div class="collect" @click="collectHandle">
              <img :src="isCollect?haveCollect:haveNotCollect" alt="collect">
            </div>
            <div class="toComment" @click="toEditCommentHandle">
              <img src="../../assets/image/comment.png" alt="comment">
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import api from "@/api/modules"
import CONST from "@/global/const"
import {marked} from 'marked';
import {articleBaseInfo, userType} from "@/type";
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import {generateDarkColor, timestampToDateTimeString} from "@/global/utils";
import haveLike from "@/assets/image/haveLike.png"
import haveNotLike from "@/assets/image/haveNotLike.png"
import haveCollect from "@/assets/image/haveCollect.png"
import haveNotCollect from "@/assets/image/haveNotCollect.png"

export default {
  name: "ArticleDetailsView",
  computed: {
    getUpdateData() {
      return timestampToDateTimeString(this.articleInfo.updateTime);
    },
  },
  mounted() {
    this.initPage()
    this.markToHtml = marked(this.articleInfo.content)
    api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        this.articleInfo = res.data.data.article;
        this.articleTags = res.data.data.tag ? res.data.data.tag : [];
        this.articleCate = CONST.CATEGORYLIST[res.data.data.article.categoryId - 1]
        this.markToHtml = marked(this.articleInfo.content)

        // 代码高亮
        this.$nextTick(() => {
          const codeBlocks = document.querySelectorAll('pre code');
          codeBlocks.forEach((codeBlock) => {
            // 报错但是可以高亮？
            hljs.highlightElement(codeBlock);
          });
        });
        api.userApi.getUserinfoData(res.data.data.article.authorId).then(res => {
          if (res.data.code === 200) {
            this.authorInfo = res.data.data.user
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    api.articleApi.getLikeStateOfArticle(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data)
        this.isLike = res.data.data.isLike
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    api.articleApi.getCollectStateOfArticle(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data)
        this.isCollect = res.data.data.isCollect
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    let articleInfo: articleBaseInfo = CONST.DEFAULTARTICLE
    let articleTags: Array<string> = []
    let authorInfo: userType = CONST.DEFAULTUSERINFO
    let articleCate: string = "专业知识"
    let markToHtml: string
    let isLike: number = 0
    let isCollect: number = 0

    return {
      articleInfo,
      articleCate,
      articleTags,
      authorInfo,
      markToHtml,
      isLike,
      isCollect,
      haveLike,
      haveNotLike,
      haveCollect,
      haveNotCollect
    }
  },
  methods: {
    // 初始化页面顶部背景颜色
    initPage() {
      let domEle = document.querySelector('.header') as HTMLElement;
      domEle.style.backgroundColor = generateDarkColor()
    },
    // 点赞Handle
    likeHandle() {
      if(this.isLike){
        api.articleApi.cancelLikeArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isLike = this.isLike ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        api.articleApi.likeArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isLike = this.isLike ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 收藏Handle
    collectHandle() {
      if(this.isCollect){
        api.articleApi.cancelCollectArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isCollect = this.isCollect ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        api.articleApi.collectArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isCollect = this.isCollect ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 点击评论按钮跳转到评论区域
    toEditCommentHandle() {

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

.el-main {
  .editComment {
    padding-top: 10px;
    margin: 5px 245px;
    border: #e8ecf3 dashed 2px;
    position: relative;
    display: flex;

    .avatar {
      width: 20%;
      position: relative;
      left: 0;
    }

    .editArea {
      width: 80%;
      position: relative;
      right: 0;
    }
  }

  .bodyContainer {
    margin: 35px 245px;
    display: flex;
    position: relative;

    .avatar {
      width: 6.8%;
      position: relative;
      display: inline-block;

      .el-avatar {
        width: 64px;
        height: 64px;
      }

      i {
        position: absolute;
        top: 0;
        right: 0;
        color: #b72a2a;
        font-size: 20px;
      }
    }

    .paperMessage {
      width: 90%;
      position: relative;
      margin-left: 15px;

      .baseInfo {
        .avatarName {
          font-weight: bold;
          font-size: 25px;
          font-family: "Times New Roman", "宋体", "sans-serif";
          padding-bottom: 10px;
        }

        .date {
          color: #667c99;
          font-size: 16px;
        }

        .state {
          margin-left: 10px;

          i {
            font-weight: bold;
          }

          span {
            font-size: 14px;
            margin-left: 8px;
            color: #667c99;
          }
        }
      }

      .articleContent {
        margin-top: 38px;
      }
    }

    .like-collect {
      display: flex;
      flex-direction: column;
      height: 180px;
      justify-content: space-between;
      position: fixed;
      bottom: 270px;
      right: 200px;

      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #dcdcdc;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 25px;
          height: auto;
        }
      }
    }
  }
}

.el-header {
  height: 160px;
  position: relative;

  .headerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: 100%;
    font-family: "Times New Roman", "宋体", "sans-serif";

    h1 {
      text-align: center;
      margin-top: 5px;
      font-size: 28px;
      font-weight: normal;
      line-height: 1.5em;
    }

    .headTop {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      justify-content: center;
      margin: 0 auto;

      .el-button {
        background-color: #f1eaea;
        padding: 0 10px;
        font-size: 16px;
        border: none;
        color: midnightblue;
        font-weight: 900;
        height: 25px;
      }

      .tags {
        display: flex;
        flex-flow: row nowrap;
        margin-left: 5px;
        height: 25px;

        div {
          height: 25px;
          margin-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>1
