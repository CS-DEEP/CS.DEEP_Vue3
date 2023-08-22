<template>
  <div class="common-layout">
    <el-container>

      <el-header>
        <div class="web-intro">
          <p>CS.DEEP</p>
          <p>一个致力于服务每一位计算机人的论坛平台</p>
        </div>
      </el-header>

      <el-container class="container">
        <el-aside>
          <div class="aside-container">
            <el-button @click="toPublishPage">发布</el-button>
            <div class="web-detail">
              <h2>论坛信息</h2>
              <p><span class="iconfont icon-kehu"></span>已注册用户数：{{ userCount }}</p>
              <p><span class="iconfont icon-shizhong"></span>创立时间：2023/7/1</p>
              <p><span class="iconfont icon-bokeyuan"></span>博客数量：{{ blogCount }}</p>
            </div>
            <div class="ground">
              <h2>话题广场</h2>
              <WordCloud :tagList="tagList"/>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-dropdown class="sort-method" @command="chooseSortMethod" trigger="click">
            <span class="choice">{{ sortBy }}<i class="iconfont icon-xiala"></i></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="time"><i class="iconfont icon-shizhongclock74"></i>最新
                </el-dropdown-item>
                <el-dropdown-item command="popularity"><i class="iconfont icon-icon-test"></i>最热
                </el-dropdown-item>
                <el-dropdown-item command="recommend"><i class="iconfont icon-dianzan"></i>推荐
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <div class="boKe">
            <el-row>
              <el-col :span="2" class="first">
                <el-tooltip placement="left-end">
                  <template #content>{{ userName }}</template>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                </el-tooltip>
              </el-col>
              <el-col :span="20" class="second">
                <div class="detail" @click="goToArticle">
                  <p>{{ topic }}</p>
                  <span class="userName">{{ userName }}</span><span class="detail">发布于 {{ timeLenth }} 天前</span>
                </div>

              </el-col>
              <el-col :span="2" class="third">
                <span><i class="iconfont icon-pinglun"></i>{{ pingLunShu }}</span>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts">
import router from "@/router";
import api from "@/api/modules/index"
import VueRouter from 'vue-router'
import {ref} from 'vue'
import WordCloud from "@/components/mini/WordCloud.vue";
import {articleItemType} from "@/type";

export default {
  name: 'HomeView',
  components: {WordCloud},
  data() {
    let userCount: number = 100
    let blogCount: number = 100
    let articlePage: number = 1
    let sortBy: string = '最新'
    let allArticleList: Array<articleItemType>
    let curArticleList: Array<articleItemType>
    let tagList: Array<string>
    return {
      userCount,
      blogCount,
      articlePage,
      sortBy,
      allArticleList,
      curArticleList,
      tagList,
      topic: '为什么我要用vue?',
      userName: 'yuzhiying',
      timeLenth: 20,
      pingLunShu: 3,
      value1: ref(true)
    }
  },
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
    },
    chooseSortMethod(command: string) {
      if (command === 'time') {
        this.sortBy = '最新'
      } else if (command === 'popularity') {
        this.sortBy = '最热'
      } else {
        this.sortBy = '推荐'
      }
      api.commonApi.getParticularArticleList({
        page: 1,
        sortBy: command
      }).then(res => {
        if (res.data.code === 200) {
          this.blogCount = res.data.data.articleCount
          // TODO:文章类型处理
        } else {
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    api.commonApi.getWebsiteUserCount().then(res => {
      this.userCount = res.data.data.userCount
    }).catch(err => {
      console.log(err)
    })
    api.commonApi.getRandomTagList().then(res => {
      this.tagList = res.data.data.tagList
    }).catch(err => {
      console.log(err)
    })
    api.commonApi.getParticularArticleList({
      page: 1,
      sortBy: 'time'
    }).then(res => {
      if (res.data.code === 200) {
        this.blogCount = res.data.data.articleCount
        // TODO:文章类型处理
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.common-layout {
  .el-header {
    padding: 0;
    min-width: 1400px;
    width: 100%;
    height: 150px;
    background-color: #e8ecf3;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    .web-intro {
      p {
        color: #878989;
        font-family: "Times New Roman", "宋体", "sans-serif";
      }

      p:first-child {
        font-size: 30px;
      }

      p:last-child {
        padding-top: 10px;
      }
    }
  }

  .container {
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    width: 1150px;
    margin: 5px auto;

    .el-aside {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      padding: 0;
      margin: 0;
      box-sizing: border-box;

      .aside-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .el-button {
          margin-top: 20px;
          height: 40px;
          width: 250px;
          background-color: #2d8bea;
          color: white;
          font-size: 15px;
        }

        .el-button:hover {
          background-color: #0a427a;
        }

        .ground {
          padding-top: 10px;
          width: 250px;
          background-color: #f7f8fa;
          border-radius: 5px;
          margin-top: 10px;

          h2 {
            color: #a9a6a6;
            margin-bottom: 5px;
            padding-left: 10px;
          }
        }

        .web-detail {
          margin-top: 10px;
          padding-top: 10px;
          padding-left: 5px;
          width: 250px;
          background-color: #f7f8fa;
          border-radius: 5px;

          h2 {
            color: #a9a6a6;
            margin-bottom: 10px;
            padding-left: 5px;
          }

          p {
            font-size: 14px;
            margin-top: 5px;
            font-family: "Times New Roman", "微软雅黑", "sans-serif";

            span {
              margin-right: 5px;
            }
          }

          p:last-child {
            padding-bottom: 10px;
          }
        }
      }
    }

    .el-main {
      background-color: #fff;
      position: relative;
      width: 850px;
      margin-left: 5px;

      .sort-method {
        position: absolute;
        top: 20px;
        right: 70px;

        .choice {
          font-size: 18px;

          i {
            margin-left: 5px;
          }
        }

        .el-dropdown-menu {
          background-color: #f2f3f5;
        }
      }

      .boKe {
        margin-top: 25px;

        .el-row {
          background-color: #fff;
          transition: background-color 0.5s;

          .first {
            background-color: #fff;
            transition: background-color #f3f6f9 0.8s;
            border-radius: 10% 0 0 10%;

            .el-avatar {
              margin: 10px 10px 10px 10px;
            }
          }

          .second {
            padding: 10px 0px 10px 0px;
            background-color: #fff;
            transition: background-color #f3f6f9 0.8s;

            .detail {
              margin-left: 15px;

              p {
                font-size: 16px;
                font-weight: 600;
              }

              .userName {
                font-size: 11px;
                font-weight: 600;
                color: #aaa;
              }

              .detail {
                color: #b2aabd;
                font-size: 10px;
              }

            }

          }

          .third {
            background-color: #fff;
            transition: background-color #f3f6f9 0.8s;
            padding: 10px;
            border-radius: 0 10% 10% 0;

          }
        }

        .el-row:hover {
          .first {
            background-color: #f3f6f9;
          }

          .second {
            background-color: #f3f6f9;
            cursor: pointer;
          }

          .third {
            background-color: #f3f6f9;
          }
        }
      }
    }

  }

  .el-main {
    margin-right: 100px;
    background-color: #fff;
    position: relative;

    .test {
      position: absolute;
      height: 30px;
      top: 20px;
      right: 70px;

      .el-switch__core {
        height: 30px;
      }

      span {
        font-size: 18px;

      }

    }

    .boKe {
      margin-top: 40px;

      .el-row {
        background-color: #fff;
        transition: background-color 0.5s;

        .first {
          background-color: #fff;
          transition: background-color #f3f6f9 0.8s;
          border-radius: 10% 0 0 10%;

          .el-avatar {
            margin: 10px 10px 10px 10px;
          }
        }

        .second {
          padding: 10px 0px 10px 0px;
          background-color: #fff;
          transition: background-color #f3f6f9 0.8s;

          .detail {
            margin-left: 15px;

            p {
              font-size: 16px;
              font-weight: 600;
            }

            .userName {
              font-size: 11px;
              font-weight: 600;
              color: #aaa;
            }

            .detail {
              color: #b2aabd;
              font-size: 10px;
            }

          }

        }

        .third {
          background-color: #fff;
          transition: background-color #f3f6f9 0.8s;
          padding: 10px;
          border-radius: 0 10% 10% 0;

        }
      }

      .el-row:hover {
        .first {
          background-color: #f3f6f9;
        }

        .second {
          background-color: #f3f6f9;
          cursor: pointer;
        }

        .third {
          background-color: #f3f6f9;
        }
      }
    }
  }


}
</style>
