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
          <div class="main-top">
            <div class="main-title">
              <span>博客区</span>
            </div>
            <el-dropdown class="sort-method" @command="chooseSortMethod" trigger="click">
              <span class="choice">{{ sortBy }}<i class="iconfont icon-xiala"></i></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="time"><i class="iconfont icon-shizhongclock74"></i>最新
                  </el-dropdown-item>
                  <el-dropdown-item command="popularity"><i class="iconfont icon-icon-test"></i>最热
                  </el-dropdown-item>
                  <el-dropdown-item command="recommend" v-if="haveLogin">
                    <i class="iconfont icon-dianzan"></i>推荐
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="article-list">
            <div class="article-item" v-for="(item,index) in articleList" :key="index">
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
                :total="this.blogCount"
                :page-size="12"
                :pager-count="5"
                :hide-on-single-page="true"
                background
                @current-change="getArticleListPage"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts">
import router from "@/router";
import api from "@/api/modules/index"
import WordCloud from "@/components/mini/WordCloud.vue";
import {articleItemType, userType} from "@/type";
import CONST from "@/global/const"
import {debounce, getElapsedTime} from "@/global/utils";
import {ElMessage} from "element-plus";


export default {
  name: 'HomeView',
  components: {WordCloud},
  data() {
    let userCount: number = 0
    let blogCount: number = 0
    let articlePage: number = 1
    let sortBy: string = '最新'
    let articleList: Array<articleItemType> = []
    let tagList: Array<string>
    let haveLogin: boolean = this.$store.state.haveLogin
    let cateList: Array<string> = ['专业知识', '分享发现', '吐槽讨论']
    return {
      userCount,
      blogCount,
      articlePage,
      sortBy,
      articleList,
      tagList,
      haveLogin,
      cateList
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
      this.articleList = []
      api.commonApi.getParticularArticleList({
        page: this.articlePage,
        sortBy: command
      }).then(async res => {
        if (res.data.code === 200) {
          this.blogCount = res.data.data.articleCount
          let originListData = res.data.data.articleList;
          for (let i = 0; i < originListData.length; ++i) {
            let temp: articleItemType = {...CONST.DEFAULTARTICLEITEM};
            temp.title = originListData[i].title;
            temp.id = originListData[i].id;
            temp.authorId = originListData[i].authorId;
            temp.elapsed = getElapsedTime(originListData[i].updateTime);
            temp.category = this.cateList[originListData[i].categoryId - 1];
            await this.getUserinfoByUserId(originListData[i].authorId).then(res => {
              temp.avatar = res.avatar;
              temp.authorName = res.username;
            })
            this.articleList.push(temp)
          }
        } else {
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
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
      let sortMethod = this.sortBy === '最新' ? 'time' : (this.sortBy === '最热' ? 'popularity' : 'recommend')
      api.commonApi.getParticularArticleList({
        page: page,
        sortBy: sortMethod
      }).then(async res => {
        if (res.data.code === 200) {
          let originListData = res.data.data.articleList;
          for (let i = 0; i < originListData.length; ++i) {
            let temp: articleItemType = {...CONST.DEFAULTARTICLEITEM};
            temp.title = originListData[i].title;
            temp.id = originListData[i].id;
            temp.authorId = originListData[i].authorId;
            temp.elapsed = getElapsedTime(originListData[i].updateTime);
            temp.category = this.cateList[originListData[i].categoryId - 1];
            await this.getUserinfoByUserId(originListData[i].authorId).then(res => {
              temp.avatar = res.avatar;
              temp.authorName = res.username;
            })
            this.articleList.push(temp)
          }
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
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
      console.log(res.data.data.tagList)
      this.tagList = res.data.data.tagList
    }).catch(err => {
      console.log(err)
    })
    api.commonApi.getParticularArticleList({
      page: this.articlePage,
      sortBy: 'time'
    }).then(async res => {
      if (res.data.code === 200) {
        this.blogCount = res.data.data.articleCount
        let originListData = res.data.data.articleList;
        for (let i = 0; i < originListData.length; ++i) {
          let temp: articleItemType = {...CONST.DEFAULTARTICLEITEM};
          temp.title = originListData[i].title;
          temp.id = originListData[i].id;
          temp.authorId = originListData[i].authorId;
          temp.elapsed = getElapsedTime(originListData[i].updateTime);
          temp.category = this.cateList[originListData[i].categoryId - 1];
          await this.getUserinfoByUserId(originListData[i].authorId).then(res => {
            temp.avatar = res.avatar;
            temp.authorName = res.username;
          })
          this.articleList.push(temp)
        }
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
      width: 250px;
      padding: 0;
      margin: 0;
      box-sizing: border-box;

      .aside-container {
        display: flex;
        flex-direction: column;
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
      width: 850px;
      margin-left: 10px;
      margin-top: 20px;
      position: relative;
      padding: 0;
      display: flex;
      flex-direction: column;

      .main-top {
        width: 850px;
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .main-title {
          padding: 3px;

          span {
            font-size: 25px;
            font-weight: 600;
          }
        }

        .sort-method {
          width: 70px;
          height: 30px;
          box-sizing: border-box;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-around;
          border: 2px solid #dcdcdc;
          border-radius: 4px;

          .choice {
            font-size: 15px;

            i {
              margin-left: 3px;
            }
          }
        }
      }

      .article-list {
        width: 850px;
        display: flex;
        flex-direction: column;

        .article-item {
          width: 850px;
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
  }
}
</style>
