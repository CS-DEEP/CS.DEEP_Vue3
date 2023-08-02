<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="headerContainer">
          <div class="headTop">
            <el-tooltip class="box-item" effect="dark" content="置顶" placement="top">
              <i class="iconfont icon-zhiding"></i>
            </el-tooltip>
            <el-button plain>博客区</el-button>
            <router-link to="/login" class="nav">入门 & 通识</router-link>
          </div>
          <h1>计算机相关专业入门指引专题贴-开篇 & 索引</h1>
        </div>
      </el-header>
      <el-main>
        
          <div class="bodyContainer">
          <div class="avatar">
            <el-popover show-after="1000" :width="500"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
              <template #reference>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </template>
              <template #default>
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
                      <el-button style="
                      border: none;
                      background-color: #959896;
                      color: #fff;
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
        
      </el-main>
    </el-container>
  </div>
</template>

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
      padding-right: 5px;
      .postButton{
        margin-left: 655px;
        
      }

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
  background-color: #662c99;
  height: 175px;
  position: relative;

  .headerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;

    h1 {
      font-size: 22px;
      font-weight: normal;
      line-height: 1.5em;
    }

    .headTop {
      i {
        font-size: 18px;
      }

      .el-button {
        margin-left: 15px;
        padding: 0px 10px;
        font-size: 14px;
        border: none;
        color: #662c99;
        font-weight: 600;
        height: 22px;
      }

      .nav {
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        margin-left: 15px;
      }
    }
  }
}
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
