<template>
  <div class="avatar-username">
    <div class="content" @click="showMenu">
      <div class="avatar">
        <img :src="$store.state.userinfo.avatar" alt="avatar">
      </div>
      <div class="username">
        <span>{{ $store.state.userinfo.username }}</span>
      </div>
    </div>
    <div class="menu" v-show="isShow">
      <div class="per">
        <img src='../../assets/image/center.png' alt="choice">
        <router-link class="user-link" :to="{name: 'userInfo',params:{userId: this.$store.state.userinfo.id}}">个人中心
        </router-link>
      </div>
      <div class="per">
        <img src="../../assets/image/set.png" alt="choice">
        <router-link class="user-link" to="#">设置</router-link>
      </div>
      <div class="per">
        <img src="../../assets/image/logout.png" alt="choice">
        <span class="user-link" @click="logoutHandle">退出登录</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import api from "@/api/modules/index.ts"
import CONST from "@/global/const/index.ts"
import {ElMessage} from "element-plus";

export default {
  name: "AvatarAndUsername",
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showMenu() {
      this.isShow = !this.isShow;
    },
    logoutHandle() {
      api.userApi.logout().then(res => {
        if (res.data.code === 200) {
          localStorage.clear();
          this.$store.commit('updateLoginState');
          this.$store.commit('updateUserinfo', CONST.DEFAULTUSERINFO)
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          this.$router.push('/')
        } else {
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">

a {
  text-decoration: none;
}

.avatar-username {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .content {
    width: max-content;
    height: 40px;
    border-radius: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-items: center;
    align-items: center;

    .avatar {
      height: 33px;
      margin-left: 5px;

      img {
        width: 33px;
        height: auto;
        border-radius: 50%;
      }
    }

    .username {
      height: 30px;
      display: flex;
      align-items: center;
      margin-left: 5px;
      margin-right: 15px;

      span {
        font-family: "Times New Roman", "宋体", "sans-serif";
        font-size: 18px;
        font-weight: bolder;
      }
    }
  }

  .content:hover {
    background-color: #d7dfea;
  }

  .menu {
    z-index: 100;
    width: 130px;
    height: max-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    overflow: hidden;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;

    .per {
      padding-left: 10px;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;

      img {
        width: 20px;
        height: auto;
      }

      .user-link {
        color: #222222;
        font-size: 17px;
        font-family: '楷体', 'sans-serif';
        padding: 10px;
      }
    }

    .per:hover {
      background-color: #d7dfea;
    }
  }
}
</style>
