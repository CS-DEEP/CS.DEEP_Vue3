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
              <ArticleHtml :content="markToHtml"/>
            </div>
          </div>
          <div class="like-collect">
            <div class="like" @click="likeHandle">
              <img :src="isLike?haveLike:haveNotLike" alt="like">
              <p v-show="numOfLike">{{ strOfLike }}</p>
            </div>
            <div class="collect" @click="collectHandle">
              <img :src="isCollect?haveCollect:haveNotCollect" alt="collect">
              <p v-show="numOfCollect">{{ strOfCollect }}</p>
            </div>
            <div class="toComment" @click="toEditCommentHandle">
              <img src="../../assets/image/comment.png" alt="comment">
            </div>
          </div>
        </div>
        <div class="comments">
          <p id="comment-title">评论</p>
          <div class="edit-comment">
            <div class="editor">
              <img :src="this.$store.state.userinfo.avatar" alt="avatar">
            </div>
            <div class="edit-container">
              <div class="text-area">
                <textarea placeholder="快来表达你的想法吧~" v-model="commentContent"/>
              </div>
              <div class="emoji send">
                <div class="emoji-btn">
                  <img src="../../assets/image/face.png" alt="face" @click="faceShow=!faceShow">
                </div>
                <div class="browBox" v-if="faceShow">
                  <ul>
                    <li v-for="(item,index) in faceList" :key="index" @click="addEmojiToText(index)">{{ item }}</li>
                  </ul>
                </div>
                <div class="send-btn">
                  <el-button @click="publishComment">发表评论</el-button>
                </div>
              </div>
            </div>
          </div>
          <p id="show-comment-title">全部评论</p>
          <div class="empty-comment" v-if="this.oneLevelCommentList.length===0">
            <img src="../../assets/image/empty.png" alt="emptyComment">
          </div>
          <div class="show-comments" v-else>
            <div class="one-level" v-for="(item,index) in oneLevelCommentList" :key="index">
              <div class="one-level-comment-avatar">
                <img :src="item.avatar" alt="avatar">
              </div>
              <div class="comment-part">
                <div class="name-time">
                  <p class="one-level-name">{{ item.name }}</p>
                  <p class="one-level-time">{{ item.publishTime }}</p>
                </div>
                <div class="comment-content">
                  <p class="comment-main">{{ item.content.content }}</p>
                </div>
                <div class="comment-function">
                  <div class="reply-delete">
                    <div class="reply" @click="item.isShowTwoLevelComment=!item.isShowTwoLevelComment">
                      <img src="../../assets/image/level_comment.png" alt="reply">
                      <span>{{ item.numOfReply ? "展开评论" : "评论" }}</span>
                    </div>
                    <div class="delete" v-show="item.isOwn" @click="deleteOwnComment(item.content.id,index)">
                      <img src="../../assets/image/delete_comment.png" alt="reply">
                      <span>删除</span>
                    </div>
                  </div>
                  <div class="show-two-level-comment" v-show="item.isShowTwoLevelComment">
                    <div class="edit-two-level">
                      <div class="text-area-two">
                        <textarea placeholder="快来表达你的想法吧~" v-model="item.replyContent"/>
                      </div>
                      <div class="emoji send">
                        <div class="emoji-btn-two">
                          <img src="../../assets/image/face.png" alt="face"
                               @click="item.isShowEmoji=!item.isShowEmoji">
                        </div>
                        <div class="browBox-two" v-if="item.isShowEmoji">
                          <ul>
                            <li v-for="(item_f,index_f) in faceList" :key="index_f"
                                @click="addEmojiToTextOfTwo(index,index_f)">
                              {{ item_f }}
                            </li>
                          </ul>
                        </div>
                        <div class="send-btn">
                          <el-button @click="replyComment(index)">发表评论</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="show-two-level">

                    </div>
                  </div>
                </div>
              </div>
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
import {articleBaseInfo, oneLevelCommentType, userType} from "@/type";
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import {generateDarkColor, timestampToDateTimeString} from "@/global/utils";
import haveLike from "@/assets/image/haveLike.png"
import haveNotLike from "@/assets/image/haveNotLike.png"
import haveCollect from "@/assets/image/haveCollect.png"
import haveNotCollect from "@/assets/image/haveNotCollect.png"
import ArticleHtml from "@/components/common/ArticleHtml.vue";
import faceData from "@/assets/emoji/emoji.json"
import {ElMessage} from "element-plus";

export default {
  name: "ArticleDetailsView",
  components: {ArticleHtml},
  computed: {
    getUpdateData() {
      return timestampToDateTimeString(this.articleInfo.updateTime);
    },
  },
  watch() {

  },
  mounted() {
    this.initPage()
    // 获取文章信息
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
        // 获取作者信息
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
        ElMessage({
          message: res.data.message,
          type: 'error'
        })
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取点赞状态
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
    // 获取收藏状态
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
    // 获取点赞数
    api.articleApi.getLikeNumber(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        this.numOfLike = res.data.data.count
        this.strOfLike = res.data.data.count >= 1000 ? (res.data.data.count / 1000).toFixed(1) + 'k' : res.data.data.count.toString()
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取收藏数
    api.articleApi.getCollectNumber(this.$route.params.postId).then(res => {
      if (res.data.code === 200) {
        this.numOfCollect = res.data.data.count
        this.strOfCollect = res.data.data.count >= 1000 ? (res.data.data.count / 1000).toFixed(1) + 'k' : res.data.data.count.toString()
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取一级评论
    // TODO:懒加载
    api.commentApi.getOneLevelComment({
      articleId: this.$route.params.postId,
      page: this.page
    }).then(async res => {
      if (res.data.code === 200) {
        console.log(res.data.data.commentList)
        // 重新生成一级评论新类型对象信息
        for (let i = 0; i < res.data.data.commentList.length; ++i) {
          console.log(res.data.data.commentList[i])
          let tmp = {...CONST.DEFAULTONELEVELCOMMENT}
          tmp.content = res.data.data.commentList[i]
          tmp.publishTime = timestampToDateTimeString(res.data.data.commentList[i].createTime)
          tmp.numOfReply = res.data.data.replySize[i]
          await api.userApi.getUserinfoData(res.data.data.commentList[i].authorId).then(res => {
            if (res.data.code === 200) {
              tmp.avatar = res.data.data.user.avatar;
              tmp.name = res.data.data.user.username;
              tmp.isOwn = res.data.data.user.id === this.$store.state.userinfo.id
            } else {
              console.log(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
          this.oneLevelCommentList.push(tmp)
        }
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
    let numOfLike: number = 0
    let numOfCollect: number = 0
    let strOfLike: string = ''
    let strOfCollect: string = ''
    let commentContent: string = ''
    let twoLevelComment: string = ''
    let faceList = []
    let faceShow = false
    let page = 1
    let oneLevelCommentList: Array<oneLevelCommentType> = [CONST.DEFAULTONELEVELCOMMENT, CONST.DEFAULTONELEVELCOMMENTPLUS]

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
      haveNotCollect,
      numOfLike,
      numOfCollect,
      strOfLike,
      strOfCollect,
      commentContent,
      twoLevelComment,
      faceList,
      faceShow,
      page,
      oneLevelCommentList,
    }
  },
  methods: {
    // 初始化页面顶部背景颜色
    initPage() {
      let domEle = document.querySelector('.header') as HTMLElement;
      domEle.style.backgroundColor = generateDarkColor();
      for (let i in faceData) {
        this.faceList.push(faceData[i].char);
      }
    },
    // 点赞Handle
    likeHandle() {
      if (this.isLike) {
        api.articleApi.cancelLikeArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            this.isLike = this.isLike ? 0 : 1
            this.numOfLike -= 1
            this.strOfLike = this.numOfLike >= 1000 ? (this.numOfLike / 1000).toFixed(1) + 'k' : this.numOfLike.toString()
          } else {
            ElMessage({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        api.articleApi.likeArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            ElMessage({
              message: '爱点赞的颜值都很高~',
              type: 'success'
            })
            this.isLike = this.isLike ? 0 : 1
            this.numOfLike += 1
            this.strOfLike = this.numOfLike >= 1000 ? (this.numOfLike / 1000).toFixed(1) + 'k' : this.numOfLike.toString()
          } else {
            ElMessage({
              message: res.data.message,
              type: 'error'
            })
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
            this.numOfCollect -= 1
            this.strOfCollect = this.numOfCollect >= 1000 ? (this.numOfCollect / 1000).toFixed(1) + 'k' : this.numOfCollect.toString()
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        api.articleApi.collectArticle(this.$route.params.postId).then(res => {
          if (res.data.code === 200) {
            ElMessage({
              message: '不要放在收藏夹落灰咯~',
              type: 'success'
            })
            this.isCollect = this.isCollect ? 0 : 1
            this.numOfCollect += 1
            this.strOfCollect = this.numOfCollect >= 1000 ? (this.numOfCollect / 1000).toFixed(1) + 'k' : this.numOfCollect.toString()
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
      document.getElementById("comment-title").scrollIntoView({behavior: 'smooth'})
    },
    // 添加所选的表情到评论区域
    addEmojiToText(idx: number) {
      this.commentContent = this.commentContent + this.faceList[idx]
    },
    // 添加所选的表情到二级评论回复区域
    addEmojiToTextOfTwo(comment_idx: number, face_idx: number) {
      this.oneLevelCommentList[comment_idx].replyContent = this.oneLevelCommentList[comment_idx].replyContent + this.faceList[face_idx]
    },
    // 发布评论
    publishComment() {
      api.commentApi.publishComment({
        articleId: this.$route.params.postId,
        content: this.commentContent
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          this.commentContent = ''
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 回复评论
    replyComment(commentIdx: number) {
      api.commentApi.publishComment({
        articleId: this.$route.params.postId,
        content: this.oneLevelCommentList[commentIdx].replyContent,
        isReply: 1,
        replyId: this.oneLevelCommentList[commentIdx].content.id
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          // TODO：添加到二级评论的列表
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除评论
    deleteOwnComment(commentId: number, commentIdx: number) {
      api.commentApi.deleteComment(commentId).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          this.oneLevelCommentList.splice(commentIdx, 1)
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      })
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
  width: 100%;

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
        border: 2px solid #dcdcdc;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        img {
          width: 25px;
          height: auto;
        }

        p {
          position: absolute;
          left: 33px;
          bottom: 33px;
          font-family: "Times New Roman", "sans-serif";
          font-size: 12px;
          color: #faf7f7;
          background-color: #c2c8d1;
          width: 38px;
          height: 20px;
          padding-top: 4px;
          padding-bottom: 4px;
          text-align: center;
          border-radius: 10px;
        }
      }
    }
  }

  .comments {
    border-top: 1px solid #dcdcdc;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 35px 260px;

    #comment-title {
      margin-top: 30px;
      padding-left: 5px;
      font-size: 25px;
      font-weight: 700;
      border-left: 3px solid #7070ce;
    }

    #show-comment-title {
      margin-top: 30px;
      padding-left: 5px;
      font-size: 25px;
      font-weight: 700;
      border-left: 3px solid #7070ce;
    }

    .empty-comment {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .show-comments {
      display: flex;
      margin-top: 20px;
      flex-direction: column;
      margin-bottom: 200px;

      .one-level {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 8px;
        padding-left: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 3px;

        .one-level-comment-avatar {
          width: 50px;

          img {
            width: 50px;
            height: auto;
            border-radius: 50%;
          }
        }

        .comment-part {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .name-time {
            display: flex;
            flex-direction: column;
            padding-top: 5px;

            .one-level-name {
              font-family: "Times New Roman", "宋体", "sans-serif";
              font-size: 18px;
              padding-bottom: 5px;
            }

            .one-level-time {
              font-family: "Times New Roman", "宋体", "sans-serif";
              font-size: 15px;
              color: #c4c3c3;
              padding-bottom: 5px;
            }
          }

          .comment-content {
            margin-top: 5px;
            font-family: "Times New Roman", "宋体", "sans-serif";
            font-size: 16px;
            color: #515767;
            padding-top: 3px;
          }

          .comment-function {
            margin-top: 5px;

            .reply-delete {
              display: flex;
              flex-flow: row nowrap;

              div {
                display: flex;
                flex-flow: row nowrap;

                img {
                  width: 20px;
                  height: auto;
                }

                span {
                  padding-left: 5px;
                  font-size: 15px;
                  color: #bfbfbf;
                }
              }

              .delete {
                margin-left: 8px;
              }
            }

            .show-two-level-comment {
              display: flex;
              flex-direction: column;

              .edit-two-level {
                margin-top: 3px;
                display: flex;
                flex-direction: column;

                .text-area-two {
                  textarea {
                    min-width: 830px;
                    max-width: 830px;
                    min-height: 50px;
                    max-height: 70px;
                    padding: 5px;
                    border: 2px solid #dcdcdc;
                    border-radius: 3px;
                    font-family: "Times New Roman", "sans-serif";
                  }
                }

                .emoji, .send {
                  width: 830px;
                  position: relative;

                  .browBox-two {
                    width: 500px;
                    height: 135px;
                    background: #faf3f3;
                    position: absolute;
                    overflow: scroll;
                    top: 32px;

                    ul {
                      display: flex;
                      flex-wrap: wrap;
                      padding: 10px;

                      li {
                        width: 14%;
                        font-size: 26px;
                        list-style: none;
                        text-align: center;
                      }
                    }
                  }

                  .emoji-btn-two {
                    float: left;

                    img {
                      width: 30px;
                      height: auto;
                      border-radius: 50%;
                      overflow: hidden;
                    }

                    img:hover {
                      background-color: #dcdcdc;
                    }
                  }

                  .send-btn {
                    float: right;

                    .el-button {
                      width: 80px;
                      background-color: #adc9ef;

                      &:hover {
                        color: white;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        &:hover {
          background-color: #dcdcdc;
        }
      }
    }

    .edit-comment {
      margin-top: 20px;
      display: flex;
      flex-flow: row nowrap;

      .editor {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 60px;
          height: auto;
          border-radius: 50%;
        }
      }

      .edit-container {
        margin-left: 10px;
        display: flex;
        flex-direction: column;

        .text-area {
          textarea {
            min-width: 930px;
            max-width: 930px;
            min-height: 60px;
            max-height: 200px;
            padding: 5px;
            border: 2px solid #dcdcdc;
            border-radius: 3px;
            font-family: "Times New Roman", "sans-serif";
          }
        }

        .emoji, .send {
          position: relative;

          .browBox {
            width: 500px;
            height: 135px;
            background: #faf3f3;
            position: absolute;
            overflow: scroll;
            top: 32px;

            ul {
              display: flex;
              flex-wrap: wrap;
              padding: 10px;

              li {
                width: 14%;
                font-size: 26px;
                list-style: none;
                text-align: center;
              }
            }
          }

          .emoji-btn {
            float: left;

            img {
              width: 30px;
              height: auto;
              border-radius: 50%;
              overflow: hidden;
            }

            img:hover {
              background-color: #dcdcdc;
            }
          }

          .send-btn {
            float: right;

            .el-button {
              width: 80px;
              background-color: #adc9ef;

              &:hover {
                color: white;
              }
            }
          }
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
</style>
