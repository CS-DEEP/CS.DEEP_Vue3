<template>
  <div class="reset-page">
    <div class="reset-container">
      <div class="container-left">
        <div class="logo">
          <img src="../../assets/image/forum.png" alt="logo">
        </div>
        <div class="word">
          <p>Welcome to CS.DEEP!</p>
          <p><strong>一个致力于服务每一位计算机人的论坛平台</strong></p>
        </div>
      </div>
      <div class="reset-form">
        <h1>重置密码</h1>
        <div class="email">
          <img src="../../assets/image/email.png">
          <input type="email" placeholder="邮箱" v-model="userEmail">
        </div>
        <div class="checkCode">
          <img src="../../assets/image/checkCode.png">
          <input class="check" type="text" placeholder="邮箱验证码" v-model="checkCode">
          <button class="send" @click="SendCodeHandle" :disabled="isDisabled" ref="sendCode">发送验证码</button>
        </div>
        <div class="pwd">
          <img src="../../assets/image/pwd.png">
          <input type="password" placeholder="密码" v-model="pwd">
        </div>
        <div class="pwd">
          <img src="../../assets/image/pwd.png">
          <input type="password" placeholder="确认密码" v-model="confirmPwd">
        </div>
        <div class="others">
          <router-link class="login" to="/login">前往登录</router-link>
        </div>
        <button class="button" @click="ResetPwdHandle">
          <span class="button-content">提交</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "@/api/modules";
import {ElMessage} from "element-plus";

export default {
  name: "ResetPwdView",
  data() {
    return {
      userEmail: '',
      checkCode: '',
      pwd: '',
      confirmPwd: '',
      haveSendCode: false,
      time: 59
    }
  },
  computed: {
    isDisabled(): boolean {
      return this.haveSendCode
    }
  },
  methods: {
    SendCodeHandle() {
      const sendBtn = this.$refs.sendCode as HTMLButtonElement;
      api.userApi.sendResetCode({email: this.userEmail}).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          let timer = setInterval(() => {
            // 判断剩余秒数
            if (this.time == 0) {
              // 清除定时器和复原按钮
              clearInterval(timer);
              this.haveSendCode = false;
              sendBtn.textContent = '发送验证码';
            } else {
              this.haveSendCode = true;
              sendBtn.textContent = `${this.time}秒后重新获取`;
              this.time--;
            }
          }, 1000);
        }else{
          ElMessage({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    ResetPwdHandle() {
      api.userApi.resetPwd({
        email: this.userEmail,
        checkCode: this.checkCode,
        password: this.pwd,
        confirmPwd: this.confirmPwd,
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: res.data.message,
            type: 'success'
          })
          this.$router.push('/login')
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

.reset-page {
  width: 100%;
  height: 100%;

  .reset-container {
    height: 450px;
    width: 55%;
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
        margin-top: 20px;

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

    .reset-form {
      width: 50%;
      height: 100%;
      justify-content: center;
      display: block;
      text-align: center;
      padding: 10px;

      h1 {
        margin-top: 10%;
        margin-bottom: 10%;
      }

      div {
        height: 55px;
        width: 95%;
        margin: auto;

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

      .checkCode {
        display: flex;
        height: 55px;
        margin-left: 15px;

        input {
          width: 55%;
          height: 30px;
        }

        button {
          width: 30%;
          height: 36px;
          color: white;
          border-radius: 10px;
          background: #808080;
        }

        button:hover {
          background-color: #696969;
        }
      }

      .others {
        height: 20px;
        width: 93%;
        margin: auto;

        .login {
          font-size: 15px;
          font-family: '楷体', 'sans-serif';
          float: right;
        }

        .login:hover {
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
