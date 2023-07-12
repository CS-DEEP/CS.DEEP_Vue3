<script setup lang="ts">
</script>

<template>
  <div class="nav">
    <router-link to="/login">登录</router-link>
    |
    <router-link to="/register">注册</router-link>
    |
    <router-link to="/userinfo">个人中心</router-link>
  </div>
</template>

<style lang="scss">
.nav{
  width: 200px;
  display: flex;
  margin: 10px auto;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
