<template>
  <div class="register-login">
    <router-link class="span" to="/register">注册</router-link>
    <router-link class="span" to="/login">登录</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "RegisterAndLogin"
}
</script>

<style lang="scss">
.register-login{
  border: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-items: center;

  .span{
    font-family: '宋体','sans-serif';
    font-size: 15px;
    padding: 8px;
    color: #222222;
  }
}

</style>
