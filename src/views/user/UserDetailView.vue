<template>
  <div class="detail-page">
    <div class="top">
      <div class="user-profile">
        <div class="user-avatar">
          <img :src="user.avatar" alt="avatar">
        </div>
        <div class="other-profile">
          <div class="user-name"><span>{{ user.username }}</span></div>
          <div class="gender-age">
            <div class="gender">
              <img v-show="user.gender" src="../../assets/image/male.png" alt="gender">
              <img v-show="!user.gender" src="../../assets/image/female.png" alt="gender">
            </div>
            <div class="age"><span>{{ user.age }}岁</span></div>
          </div>
          <div class="desc"><span>{{ user.description }}</span></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="show-detail">
        <div class="detail-sidebar">
          <div>
            <router-link :to="{name:'following',params:{userId: user.id}}">
              <img src="../../assets/image/following.png" alt="following">
              <span>关注列表</span>
            </router-link>
          </div>
          <div>
            <router-link :to="{name:'follower',params:{userId: user.id}}">
              <img src="../../assets/image/follower.png" alt="follower">
              <span>粉丝列表</span>
            </router-link>
          </div>
          <div v-if="isOwn">
            <router-link :to="{name:'message',params:{userId: user.id}}">
              <img src="../../assets/image/msg.png" alt="message">
              <span>我的消息</span>
            </router-link>
          </div>
          <div v-if="isOwn">
            <router-link :to="{name:'persona',params:{userId: user.id}}">
              <img src="../../assets/image/persona.png" alt="persona">
              <span>我的画像</span>
            </router-link>
          </div>
          <div v-if="isOwn">
            <router-link :to="{name:'draft',params:{userId: user.id}}">
              <img src="../../assets/image/temp.png" alt="temp">
              <span>草稿箱</span>
            </router-link>
          </div>
        </div>
        <div class="show-list" style="width: 70%">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../api/modules";
import CONST from "@/global/const"
import {ElMessage} from "element-plus";

export default {
  name: "UserDetailView",
  mounted() {
    this.isOwn = parseInt(this.$route.params.userId) === this.$store.state.userinfo.id;
    api.userApi.getUserinfoData(this.$route.params.userId).then(res => {
      if (res.data.code === 200) {
        this.user = res.data.data.user;
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
  data() {
    return {
      isOwn: false,
      user: CONST.DEFAULTUSERINFO
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

.detail-page {
  min-width: 1400px;
  width: 100%;

  .top {
    width: 100%;
    background-color: #81807a;

    .user-profile {
      width: 900px;
      height: 200px;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      margin: 0 auto;

      .user-avatar {
        width: 120px;
        height: 140px;

        img {
          width: 120px;
          height: auto;
          overflow: hidden;
          border-radius: 50%;
        }
      }

      .other-profile {
        width: 600px;
        height: 140px;
        display: flex;
        flex-direction: column;
        padding-left: 30px;
        font-family: "Times New Roman", "宋体", "sans-serif";
        color: white;

        .user-name {
          span {
            font-size: 25px;
          }
        }

        .gender-age {
          display: flex;
          flex-flow: row nowrap;
          justify-items: center;
          align-items: center;
          margin-top: 20px;

          div {
            img {
              height: 20px;
              width: 20px;
            }

            span {
              display: block;
              height: 20px;
              padding-left: 10px;
              font-size: 18px;
            }
          }
        }

        .desc {
          margin-top: 20px;

          span {
            word-break: break-all;
            padding-top: 5px;
            font-size: 15px;
            color: #dcdcdc;
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;

    .show-detail {
      width: 900px;
      margin: 10px auto;
      display: flex;
      flex-direction: row;
      height: fit-content;

      .detail-sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: max-content;

        div {
          padding: 10px;

          a {
            box-sizing: border-box;
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: auto;
            }

            span {
              color: #aba8a8;
              font-family: '宋体', 'sans-serif';
              font-size: 19px;
              font-weight: bold;
              padding-left: 5px;
            }
          }
        }

        a.router-link-active {
          span {
            color: #222222;
          }
        }
      }
    }
  }
}
</style>
