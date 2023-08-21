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
        <el-aside width="300px">
          <div class="container">
            <el-button>发布</el-button>
            <div class="ground">话题广场</div>
            <div class="detail">
              <p><span class="iconfont icon-kehu"></span>已注册用户数：{{ usercount }}</p>
              <p><span class="iconfont icon-shizhong"></span>创立时间：2023/7/1</p>
              <p><span class="iconfont icon-bokeyuan"></span>博客数量：{{ papercount }}</p>
            </div>
          </div>

        </el-aside>
        <el-main>
          <el-dropdown class="test" trigger="click">
            <span class="choice">{{order}}<i class="iconfont icon-xiala"></i></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changeOrder('按时间排序')"><i class="iconfont icon-shizhongclock74"></i>按时间排序</el-dropdown-item>
                <el-dropdown-item @click="changeOrder('按热度排序')"><i class="iconfont icon-icon-test"></i>按热度排序</el-dropdown-item>
                <el-dropdown-item @click="changeOrder('按推荐排序')"><i class="iconfont icon-dianzan"></i>按推荐排序</el-dropdown-item>
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
<<<<<<< HEAD
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
=======

>>>>>>> bba8e796450c9cde704462b3a2ddd137393cf244
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
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
    height: 100px;
    background-color: #e8ecf3;
    display: flex;
    flex-direction: column;
    text-align: center;

    .web-intro {
      p {
        color: #878989;
        font-family: "Times New Roman", "宋体", "sans-serif";
        padding-top: 10px;
      }

      p:first-child {
        font-size: 30px;
        padding-top: 20px;
      }
    }
  }

  .container {
    background-color: #fff;

    .el-aside {

      display: flex;
      justify-content: center;

      .container {
        padding-left: 50px;

        .el-button {
          margin-top: 20px;
          padding: auto;
          height: 40px;
          width: 150px;
          background-color: #195fa5;

          span {
            color: #fff;
            font-weight: bold;
          }
        }
      }
<<<<<<< HEAD

      .ground {
        padding-top: 10px;
      }

      .detail {
        padding-top: 10px;

        p {
          font-size: 14px;
          margin: 5px 0px;

          span {
            margin-right: 5px;
=======
      .el-main{
        margin-right: 100px;
        background-color: #fff;
        position: relative;
        .test{
          position: absolute;
          top: 20px;
          right: 70px;
          .choice{
            font-size: 18px;
            i{
            margin-left: 5px;
            }
          }
          .el-dropdown-menu{
            background-color: #f2f3f5;
          }
        }
        .boKe{
          margin-top: 25px;

          .el-row{
            background-color: #fff;
            transition: background-color 0.5s;
            .first{
              background-color: #fff;
              transition: background-color #f3f6f9 0.8s;
              border-radius: 10% 0 0 10%;
              .el-avatar{
                margin: 10px 10px 10px 10px;
              }
            }
            .second{
              padding: 10px 0px 10px 0px;
              background-color: #fff;
              transition: background-color #f3f6f9 0.8s;
              .detail{
                margin-left: 15px;
                p{
                  font-size: 16px;
                  font-weight: 600;
                }
                .userName{
                  font-size: 11px;
                  font-weight: 600;
                  color: #aaa;
                }
                .detail{
                  color:#b2aabd;
                  font-size: 10px;
                }

              }

            }
            .third{
              background-color: #fff;
              transition: background-color #f3f6f9 0.8s;
              padding: 10px;
              border-radius: 0 10% 10% 0;

            }
          }
          .el-row:hover{
            .first{
              background-color: #f3f6f9;
            }
            .second{
              background-color: #f3f6f9;
              cursor: pointer;
            }
            .third{
              background-color: #f3f6f9;
            }
>>>>>>> bba8e796450c9cde704462b3a2ddd137393cf244
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
}
</style>


<script lang="ts">
import router from "@/router";
import api from "@/api/modules/index"
import VueRouter from 'vue-router'
import {ref} from 'vue'

export default {
  name: 'HomeView',
  methods: {
    // toPublishPage() {
    //   api.articleApi.createArticle().then(res => {
    //     if (res.data.code === 200) {
    //       router.push({name: 'articleEdit', params: {postId: res.data.data.article.id}})
    //     } else {
    //       console.log(res.data.message)
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
<<<<<<< HEAD
    goToArticle() {
=======
    changeOrder(newChoice){
      this.order = newChoice;
    },
    goToArticle(){
>>>>>>> bba8e796450c9cde704462b3a2ddd137393cf244
      this.$router.push('/login');
    }

  },
  data() {
    return {
      usercount: 200,
      papercount: 200,
      order: '按时间排序',
      topic: '为什么我要用vue?',
      userName: 'yuzhiying',
      timeLenth: 20,
      pingLunShu: 3,
      value1: ref(true)
    }
  }
}
</script>


