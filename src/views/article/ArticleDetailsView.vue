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
            <div class="one-level" v-for="(item,index) in oneLevelCommentList" :key="index"
                 @mouseenter="item.content.isNasty&&(item.isShowNastyMark=true)"
                 @mouseleave="item.content.isNasty&&(item.isShowNastyMark=false)">
              <div class="nasty-comment-show" v-show="item.isShowNastyMark">
                <p>疑似恶评</p>
              </div>
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
                    <div class="reply"
                         @click="(!item.content.isNasty)&&
                         (item.isShowTwoLevelComment=!item.isShowTwoLevelComment)&&
                         (item.isShowEmoji=false)&&
                         getTwoLevelComment(index,item.content.id)">
                      <img src="../../assets/image/level_comment.png" alt="reply">
                      <span>{{ item.content.isNasty ? '不可评论' : (item.numOfReply ? "展开评论" : "评论") }}</span>
                    </div>
                    <div class="delete" v-show="item.isOwn" @click="deleteOwnComment(item.content.id,index)">
                      <img src="../../assets/image/delete_comment.png" alt="reply">
                      <span>删除</span>
                    </div>
                  </div>
                  <div class="show-two-level-comment" v-show="item.isShowTwoLevelComment">
                    <div class="edit-two-level">
                      <div class="text-area-two">
                        <textarea :placeholder="'@' + item.replyEditComment.replyName"
                                  v-model="item.replyEditComment.content"/>
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
                      <div class="two-level" v-for="(item_t,index_t) in item.twoLevelCommentList" :key=index_t
                           @mouseenter="item_t.isNasty&&(item_t.isShowNastyMark=true)"
                           @mouseleave="item_t.isNasty&&(item_t.isShowNastyMark=false)">
                        <div class="two-nasty-comment-show" v-show="item_t.isShowNastyMark">
                          <p>疑似恶评</p>
                        </div>
                        <div class="two-level-comment-avatar">
                          <img :src="item_t.avatar" alt="avatar">
                        </div>
                        <div class="two-comment-part">
                          <div class="name-time">
                            <p class="two-level-name">{{ item_t.name }}</p>
                            <p class="two-level-time">{{ item_t.publishTime }}</p>
                          </div>
                          <div class="two-comment-content">
                            <p class="two-comment-main">{{ item_t.ownReplyContent.content }}</p>
                            <p class="two-quote-comment"><span>> " </span>{{ item_t.quoteContent }}<span> "</span></p>
                          </div>
                          <div class="comment-function">
                            <div class="reply-delete">
                              <div class="reply"
                                   @click="(!item_t.isNasty)&&replyTwoLevelComment(index,item_t.name,item_t.ownReplyContent.id)">
                                <img src="../../assets/image/level_comment.png" alt="reply">
                                <span>{{ item_t.isNasty ? '不可回复' : '回复' }}</span>
                              </div>
                              <div class="delete" v-show="item_t.isOwn"
                                   @click="deleteOwnTwoLevelComment(item_t.ownReplyContent.id,index,index_t)">
                                <img src="../../assets/image/delete_comment.png" alt="reply">
                                <span>删除</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
import {articleBaseInfo, commentType, oneLevelCommentType, replyCommentReqType, userType} from "@/type";
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
import comment from "@/api/modules/comment";

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
        this.getUserinfoByAuthorId(res.data.data.article.authorId).then(user => {
          this.authorInfo = user
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
        console.log(res.data.data)
        // 重新生成一级评论新类型对象信息
        for (let i = 0; i < res.data.data.commentList.length; ++i) {
          let tmp = {...CONST.DEFAULTONELEVELCOMMENT}
          tmp.content = res.data.data.commentList[i]
          tmp.publishTime = timestampToDateTimeString(res.data.data.commentList[i].createTime)
          tmp.numOfReply = res.data.data.replySize[i]
          await this.getUserinfoByAuthorId(res.data.data.commentList[i].authorId).then(user => {
            console.log(user)
            tmp.avatar = user.avatar;
            tmp.name = user.username;
            tmp.isOwn = user.id === this.$store.state.userinfo.id
            tmp.replyEditComment.replyName = user.username
          });
          tmp.replyEditComment.replyId = res.data.data.commentList[i].id
          tmp.replyEditComment.content = ''
          tmp.replyEditComment.articleId = this.$route.params.postId
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
    let oneLevelCommentList: Array<oneLevelCommentType> = []

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
    // 依据authorId获取评论用户信息
    async getUserinfoByAuthorId(id: number): Promise<userType> {
      try {
        const res = await api.userApi.getUserinfoData(id);
        if (res.data.code === 200) {
          return res.data.data.user;
        } else {
          console.log(res.data.message);
          return CONST.DEFAULTUSERINFO;
        }
      } catch (err) {
        console.log(err);
        return CONST.DEFAULTUSERINFO;
      }
    },
    // 依据commentId获取评论信息
    async getCommentInfoByCommentId(id: number): Promise<commentType> {
      try {
        const res = await api.commentApi.getCommentInfo(id);
        if (res.data.code === 200) {
          return res.data.data.comment;
        } else {
          return CONST.DEFAULTCOMMENT;
        }
      } catch (err) {
        console.log(err);
        return CONST.DEFAULTCOMMENT;
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
      this.oneLevelCommentList[comment_idx].replyEditComment.content = this.oneLevelCommentList[comment_idx].replyEditComment.content + this.faceList[face_idx]
    },
    // 发布评论
    publishComment() {
      api.commentApi.publishComment({
        articleId: this.$route.params.postId,
        content: this.commentContent,
        isReply: 0
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
      api.commentApi.replyComment({
        articleId: this.$route.params.postId,
        content: this.oneLevelCommentList[commentIdx].replyEditComment.content,
        isReply: 1,
        replyId: this.oneLevelCommentList[commentIdx].replyEditComment.replyId
      }).then(async res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          // 插入对应一级评论的二级评论列表
          let tmp = CONST.DEFAULTTWOLEVELCOMMENT;
          tmp.ownReplyContent = res.data.data.comment;
          tmp.publishTime = timestampToDateTimeString(res.data.data.comment.createTime);
          tmp.isOwn = res.data.data.comment.authorId === this.$store.state.userinfo.id;
          tmp.isNasty = res.data.data.comment.isNasty;
          // 获取用户信息
          let user = await this.getUserinfoByAuthorId(res.data.data.comment.authorId);
          tmp.name = user.username;
          tmp.avatar = user.avatar;
          // 获取用户回复的评论内容
          await this.getCommentInfoByCommentId(res.data.data.comment.replyId!).then(comment => {
            tmp.quoteContent = comment.content;
          })
          this.oneLevelCommentList[commentIdx].twoLevelCommentList.push(tmp)
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
    },
    // 获取二级评论
    getTwoLevelComment(commentIdx: number, id: number) {
      api.commentApi.getTwoLevelComment(id).then(async res => {
        if (res.data.code === 200) {
          for (let i = 0; i < res.data.data.commentList.length; ++i) {
            let tmp = {...CONST.DEFAULTTWOLEVELCOMMENT};
            tmp.ownReplyContent = res.data.data.commentList[i];
            tmp.publishTime = timestampToDateTimeString(res.data.data.commentList[i].createTime);
            tmp.isOwn = res.data.data.commentList[i].authorId === this.$store.state.userinfo.id;
            tmp.isNasty = res.data.data.commentList[i].isNasty;
            // 获取用户信息
            await this.getUserinfoByAuthorId(res.data.data.commentList[i].authorId).then(user => {
              tmp.name = user.username;
              tmp.avatar = user.avatar;
            });
            // 获取用户回复的评论内容
            await this.getCommentInfoByCommentId(res.data.data.commentList[i].replyId).then(comment => {
              tmp.quoteContent = comment.content
            })
            this.oneLevelCommentList[commentIdx].twoLevelCommentList.push(tmp)
          }
        } else {
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 在二级评论删除自己的回复
    deleteOwnTwoLevelComment(commentId: number, oneLevelIdx: number, twoLevelIdx: number) {
      api.commentApi.deleteComment(commentId).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          this.oneLevelCommentList[oneLevelIdx].twoLevelCommentList.splice(twoLevelIdx, 1)
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    // 想要回复二级评论
    replyTwoLevelComment(oneCommentIdx: number, replyName: string, replyId: number) {
      document.getElementsByClassName("one-level")[oneCommentIdx].scrollIntoView({behavior: 'smooth'})
      this.oneLevelCommentList[oneCommentIdx].replyEditComment.replyName = replyName
      this.oneLevelCommentList[oneCommentIdx].replyEditComment.replyId = replyId
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
        position: relative;

        .nasty-comment-show {
          position: absolute;
          right: 50px;
          top: 10px;

          p {
            padding: 8px;
            border-style: dashed solid;
            border-color: red;
            color: orangered;
          }
        }

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
            margin-top: 10px;

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
                    z-index: 100;
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

              .two-level {
                display: flex;
                flex-flow: row nowrap;
                padding-left: 5px;
                padding-top: 5px;
                padding-bottom: 5px;
                border-radius: 3px;
                position: relative;
                background-color: #efecec;

                .two-nasty-comment-show {
                  position: absolute;
                  right: 30px;
                  top: 10px;

                  p {
                    padding: 8px;
                    border-style: dashed solid;
                    border-color: red;
                    color: orangered;
                  }
                }

                .two-level-comment-avatar {
                  width: 50px;

                  img {
                    width: 50px;
                    height: auto;
                    border-radius: 50%;
                  }
                }

                .two-comment-part {
                  display: flex;
                  flex-direction: column;
                  margin-left: 10px;

                  .name-time {
                    display: flex;
                    flex-direction: column;
                    padding-top: 5px;

                    .two-level-name {
                      font-family: "Times New Roman", "宋体", "sans-serif";
                      font-size: 18px;
                      padding-bottom: 5px;
                    }

                    .two-level-time {
                      font-family: "Times New Roman", "宋体", "sans-serif";
                      font-size: 15px;
                      color: #c4c3c3;
                      padding-bottom: 5px;
                    }
                  }

                  .two-comment-content {
                    margin-top: 5px;
                    font-family: "Times New Roman", "宋体", "sans-serif";

                    .two-comment-main {
                      font-size: 16px;
                      color: #515767;
                      padding-top: 3px;
                    }

                    .two-quote-comment {
                      width: 800px;
                      margin-top: 5px;
                      font-size: 15px;
                      background-color: #ded7d7;
                      border-radius: 3px;
                      padding-top: 5px;
                      padding-bottom: 5px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }

                  .comment-function {
                    margin-top: 10px;

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
                  }
                }
              }
            }
          }
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
