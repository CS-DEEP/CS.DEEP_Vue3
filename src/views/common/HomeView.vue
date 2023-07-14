<template>
  <div class="perNav">
    <router-link to="/login">登录</router-link>
    |
    <router-link to="/register">注册</router-link>
    |
    <router-link :to="{name: 'userInfo',params:{userId: this.$store.state.userinfo.id}}">个人中心</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>

<style lang="scss">
.perNav {
  width: 200px;
  display: flex;
  margin: 10px auto;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
