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
          <p class="article-title">{{ articleInfo.title }}</p>
        </div>
      </el-header>
      <el-main>
<<<<<<< HEAD
        
          <div class="bodyContainer">
          <div class="avatar">
            <el-popover show-after="1000" :width="500"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
=======
        <div class="bodyContainer">
          <div class="avatar">
            <el-popover show-after="500" :width="250"
                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
              <template #reference>
                <el-avatar :src="authorInfo.avatar"/>
              </template>
              <template #default>
<<<<<<< HEAD
                <div class="demo-rich-conent" style="display: flex; gap: 8px; flex-direction: row">
                  <el-avatar :size="120" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <div style="margin: 5px 10px;
                    position:relative;flex-direction: column">
                    <router-link to='/login' style="margin: 0; font-weight: 500;font-size: 25px;

                    color:#fff;
                    ">
                      0x0001
                    </router-link>
                    <i class="iconfont icon-editor2b" style="margin-left: 20px;font-size: 25px;font-weight: bold;
                    color:#b72a2a;"></i>
                    <div style="position: absolute;
                    top: 0;
                    right: 0;">
                      <el-button circle style="background-color:#959896;
                    border: none;
                    margin:3px 0 0 75px;
                    padding: 0;
                    ">
                        <i class="iconfont icon-undo-full" style="color: #827779;
                      font-size: 16px;"></i><span style="color: white;margin-left: 5px;
                      font-weight: bold;">分享</span>
                      </el-button>
=======
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
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
                      <el-button style="
                      background-color: #959896;
                      color: #fff;
<<<<<<< HEAD
                      ">
                        <i class="iconfont icon-shoucang" style="color: #827779;
                        font-weight: bold;
                        font-size: 18px;"></i>
                        <span style="margin-left: 3px;
                        font-weight: bold;">关注</span>
                      </el-button>
                    </div>



                    <p style="color: #fff; font-size: 15px;">
                      <i class="iconfont icon-shizhong" style="font-weight: bold;"></i>
                      15 6月 <span style="margin-left: 18px;">注册于 2018 年 5 月 19 日</span>
                    </p>
                  </div>





                </div>
              </template>
            </el-popover>
            <el-tooltip class="box-item" effect="dark" content="管理员" placement="top">
              <i class="iconfont icon-editor2b"></i>
            </el-tooltip>
          </div>
          <div class="paperMessage">
            <div class="zhuangTai">
              <span class="avatarName">0x0001</span>
              <span class="date">2019年9月7日</span>
              <span class="state">
                <i class="iconfont icon-shizhongclock74
              "></i>
                <span>已编辑</span>
              </span>
            </div>
            <div class="articleContent">
              <span>但去年总结的帖子的形态上，还停留在一个信息的集合，并没有过多的组织和设计。也由于信息的分散，加之分享的每一点信息都有它的丰富意义所在，对于新人来说并不容易找到其中的着力点，更多时候是沦为了新生们面对的信息爆炸的其中的一部分。产生的影响也类似马太效应，对于意识到某些问题的同学，是一个很好的助力。迷茫着的，看过之后，可能还是在迷茫。这是我希望打破的现状。</span>
            </div>
            <div class="criticalArea">
              <div class="huiFu">
                <i class="iconfont icon-undo-full"></i>
                <span class="userName">
                  Tover  
                </span>
                <span>回复了此贴</span>
              </div>
              <div class="dianZan">
                <i class="iconfont icon-dianzan"></i>
                <span class="userName">Tover</span>
                <span>觉得很赞</span>
              </div>
              <div class="gongNeng">
                <el-button style="border: none;
              color: black;">
                  回复
                </el-button>
                <el-button style="border: none;
              color: black;
              margin-left: 30px;
              ">
                  点赞
                </el-button>
                <el-dropdown style="margin-left: 30px;
              margin-top: 7px;
              
              ">
                  <i class="iconfont icon-gongnengtubiao-46-copy"></i>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <i class="iconfont icon-fenxiang"></i>
                        <span>分享</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="iconfont icon-icon_tip_off
                      "></i>
                        <span>举报</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
        <div class="editComment">
          <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="150"
              style="margin: 0px 10px 10px 10px;" />
          </div>
          <div class="editArea">
            <el-input v-model="input" placeholder="说点什么吧..." type="textarea" :rows="7" resize="none" />
            <div class="postButton">
            <el-button type="primary" round style="margin: 5px 0px;">发布</el-button>
            </div>
          </div>
        </div>
        
=======
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
              <ArticleHtml :content="markToHtml"/>
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
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
      </el-main>
    </el-container>
  </div>
</template>

<<<<<<< HEAD
<script lang="ts" >
import { SetUp } from '@element-plus/icons';
import { ref } from 'vue'
const input = ref('')
export default {
  name: "ArticleDetailsView",
  setup() {
    const input = ref('')
    return {
      input,
    }
  }

=======
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
import ArticleHtml from "@/components/common/ArticleHtml.vue";

export default {
  name: "ArticleDetailsView",
  components: {ArticleHtml},
  computed: {
    getUpdateData() {
      return timestampToDateTimeString(this.articleInfo.updateTime);
    },
  },
  mounted() {
    this.initPage()
    // 测试用
    // this.markToHtml = marked(this.articleInfo.content)
    // this.$nextTick(() => {
    //   const codeBlocks = document.querySelectorAll('pre code');
    //   codeBlocks.forEach((codeBlock) => {
    //     // 报错但是可以高亮？
    //     hljs.highlightElement(codeBlock);
    //   });
    // });
    api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        this.articleInfo = res.data.data.article;
        this.articleTags = res.data.data.tag ? res.data.data.tag : [];
        this.articleCate = CONST.CATEGORYLIST[res.data.data.article.categoryId - 1]
        this.markToHtml = marked(this.articleInfo.content)

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
        this.isLike = res.data.data.isLike
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    api.articleApi.getCollectStateOfArticle(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
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
      if (this.isLike) {
        api.articleApi.cancelLikeArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isLike = this.isLike ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
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
      if (this.isCollect) {
        api.articleApi.cancelCollectArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isCollect = this.isCollect ? 0 : 1
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
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
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
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
<<<<<<< HEAD
=======

>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
    .avatar {
      width: 20%;
      position: relative;
      left: 0;
    }
<<<<<<< HEAD
=======

>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
    .editArea {
      width: 80%;
      position: relative;
      right: 0;
<<<<<<< HEAD
      padding-right: 5px;
      .postButton{
        margin-left: 655px;
        
      }

    }
  }

 
      .bodyContainer {
=======
    }
  }

  .bodyContainer {
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
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
<<<<<<< HEAD
      width: 93.3%;
=======
      width: 90%;
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
      position: relative;
      margin-left: 15px;
<<<<<<< HEAD
      .zhuangTai {
        .avatarName {
          font-weight: bold;
          font-size: 18px;
        }
        .date {
          color: #667c99;
          font-size: 16px;
          margin-left: 10px;
        }
=======

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

>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
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
<<<<<<< HEAD
      .articleContent {
        margin-top: 38px;
      }
      .criticalArea {
        padding: 18px 0 18px 0;
        position: relative;
        .dianZan {
          margin-top: 5px;

          .userName {
            margin: 0 10px 0 10px;
          }
        }
        .huiFu {
          .userName {
            margin: 0 5px 0 5px;
          }
        }
        .gongNeng {
          position: absolute;
          right: 0;
          top: 18px;
        }
      }

    }
=======

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
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
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

    .article-title {
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
<<<<<<< HEAD
.demo-type {
  display: flex;
}
.demo-type>div {
  flex: 1;
  text-align: center;
}
.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
=======
</style>1
>>>>>>> 663739bfe9c73d3a79363f22718b940b1741284c
