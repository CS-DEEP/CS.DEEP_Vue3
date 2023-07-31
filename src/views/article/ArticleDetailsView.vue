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
                   style="color: #8d7e73;font-family: 'Times New Roman','宋体','sans-serif'"></div>
            </div>
            <!--            &lt;!&ndash; 评论区 &ndash;&gt;-->
            <!--            <div class="criticalArea">-->
            <!--              &lt;!&ndash; 右边的功能区 &ndash;&gt;-->
            <!--              <div class="gongNeng">-->
            <!--                <el-button style="border: none;-->
            <!--              color: black;">-->
            <!--                  回复-->
            <!--                </el-button>-->
            <!--                <el-button style="border: none;-->
            <!--              color: black;-->
            <!--              margin-left: 30px;-->
            <!--              ">-->
            <!--                  点赞-->
            <!--                </el-button>-->
            <!--                <el-dropdown style="margin-left: 30px;-->
            <!--              margin-top: 7px;-->

            <!--              ">-->
            <!--                  <i class="iconfont icon-gongnengtubiao-46-copy"></i>-->
            <!--                  <template #dropdown>-->
            <!--                    <el-dropdown-menu>-->
            <!--                      <el-dropdown-item>-->
            <!--                        <i class="iconfont icon-fenxiang"></i>-->
            <!--                        <span>分享</span>-->
            <!--                      </el-dropdown-item>-->
            <!--                      <el-dropdown-item>-->
            <!--                        <i class="iconfont icon-icon_tip_off-->
            <!--                      "></i>-->
            <!--                        <span>举报</span>-->
            <!--                      </el-dropdown-item>-->
            <!--                    </el-dropdown-menu>-->
            <!--                  </template>-->
            <!--                </el-dropdown>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <!-- 编辑评论区域 -->
        <!--        <div class="editComment">-->
        <!--          <div class="avatar">-->
        <!--            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="150"-->
        <!--                       style="margin: 0px 10px 10px 10px;"/>-->
        <!--          </div>-->

        <!--          <div class="editArea">-->
        <!--            <el-input v-model="input" placeholder="说点什么吧..."-->
        <!--                      type="textarea"-->
        <!--                      :rows="7"-->
        <!--                      resize="none"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
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

export default {
  name: "ArticleDetailsView",
  computed: {
    getUpdateData() {
      return timestampToDateTimeString(this.articleInfo.updateTime);
    }
  },
  mounted() {
    this.initPage()
    api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        this.articleInfo = res.data.data.article;
        this.articleTags = res.data.data.tag ? res.data.data.tag : [];
        this.articleCate = CONST.CATEGORYLIST[res.data.data.article.categoryId - 1]
        this.markToHtml = marked(this.articleInfo.content)
        api.userApi.getUserinfoData(res.data.data.article.authorId).then(res => {
          if (res.data.code === 200) {
            this.authorInfo = res.data.data.user
          } else {
            console.log(res.data.message)
          }
        })
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    this.$nextTick(() => {
      const codeBlocks = document.querySelectorAll('pre code');
      codeBlocks.forEach((codeBlock) => {
        // 报错但是可以高亮？
        hljs.highlightElement(codeBlock);
      });
    });
  },
  setup() {
    let articleInfo: articleBaseInfo = CONST.DEFAULTARTICLE
    let articleTags: Array<string> = []
    let authorInfo: userType = CONST.DEFAULTUSERINFO
    let articleCate: string = "专业知识"
    let markToHtml: string
    let initPage = function () {
      let domEle = document.querySelector('.header') as HTMLElement;
      domEle.style.backgroundColor = generateDarkColor()
    }

    return {
      articleInfo,
      articleCate,
      articleTags,
      authorInfo,
      markToHtml,
      initPage
    }
  },

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
      width: 93.3%;
      position: relative;
      border-bottom: 1px solid #e8ecf3;
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

.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

</style>1
