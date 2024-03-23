<template>
  <div class="login-page">
    <div class="login-container">
      <div class="container-left">
        <div class="logo">
          <img src="../../assets/image/forum.png" alt="logo">
        </div>
        <div class="word">
          <p>Welcome to CS.DEEP!</p>
          <p><strong>一个致力于服务每一位计算机人的论坛平台</strong></p>
        </div>
      </div>
      <div class="login-form">
        <h1>用户登录</h1>
        <div class="email">
          <img src="../../assets/image/email.png">
          <input type="email" placeholder="email" v-model="userEmail">
        </div>
        <div class="pwd">
          <img src="../../assets/image/pwd.png">
          <input type="password" placeholder="password" v-model="userPwd">
        </div>
        <div class="others">
          <router-link class="register" to="/register">新用户？点我注册</router-link>
          <router-link class="resetPwd" to="/resetPwd">忘记密码</router-link>
        </div>
        <button class="button" @click="LoginHandle">
          <span class="button-content">登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "@/api/modules";
import {ElMessage} from "element-plus";

export default {
  name: "LoginView",
  data() {
    return {
      userEmail: "",
      userPwd: "",
    }
  },
  methods: {
    LoginHandle() {
      api.userApi.login({
        email: this.userEmail,
        password: this.userPwd
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('expirationTime', res.data.data.expirationTime)
          this.$store.commit('updateUserinfo', res.data.data.user)
          this.$store.commit('updateLoginState')
          this.$router.push('/')
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
  }
}
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-page {
  width: 100%;
  height: 100%;

  .login-container {
    width: 55%;
    height: 400px;
    margin: 5% auto;
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    border: 1px solid #dcdcdc;

    .container-left {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background-image: linear-gradient(0deg, #505285 0%, #585e92 12%, #65689f 25%);

      .logo {
        width: 100%;
        text-align: center;

        img {
          width: 100px;
          height: auto;
          margin-top: 15%;
        }
      }

      .word {
        width: 100%;
        text-align: center;

        p {
          font-size: 18px;
          margin-top: 10px;
          padding: 5px;
          font-family: '宋体', 'sans-serif';
        }

        p:first-child {
          font-size: 25px;
          margin-top: 30px;
          font-family: "Times New Roman", 'sans-serif';
        }
      }
    }

    .login-form {
      width: 50%;
      height: 100%;
      justify-content: center;
      display: block;
      text-align: center;
      padding: 10px;

      h1 {
        margin-top: 10%;
        margin-bottom: 15%;
      }

      div {
        height: 60px;
        width: 95%;
        margin: 3% auto;

        img {
          width: auto;
          height: 35px;
          vertical-align: middle;
        }

        input {
          margin-left: 15px;
          border: none;
          outline: none;
          height: 30px;
          width: 85%;
          border-bottom: 3px gray solid;
          vertical-align: middle;
          font-size: large;
          font-family: 'Times New Roman', 'sans-serif';
        }
      }

      .others {
        height: 20px;
        width: 93%;
        margin: 3% auto;

        .register {
          font-size: 15px;
          font-family: '楷体', 'sans-serif';
          float: left;
        }

        .register:hover {
          color: royalblue;
        }

        .resetPwd {
          font-size: 15px;
          font-family: '楷体', 'sans-serif';
          float: right;
        }

        .resetPwd:hover {
          color: royalblue;
        }
      }

      .button {
        width: 35%;
        position: relative;
        overflow: hidden;
        height: 3rem;
        padding: 0 2rem;
        border-radius: 1.5rem;
        background: #3d3a4e;
        background-size: 400%;
        color: #fff;
        border: none;
        margin-top: 10px;
      }

      .button:hover::before {
        transform: scaleX(1);
      }

      .button-content {
        position: relative;
        z-index: 1;
      }

      .button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        transform: scaleX(0);
        transform-origin: 0 50%;
        width: 100%;
        height: inherit;
        border-radius: inherit;
        background: linear-gradient(
                82.3deg,
                rgba(150, 93, 233, 1) 10.8%,
                rgba(99, 88, 238, 1) 94.3%
        );
        transition: all 0.475s;
      }
    }
  }
}
</style>
