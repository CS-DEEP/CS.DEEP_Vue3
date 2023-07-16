<!--
  用途：用户信息卡片
  创建人：yuzhiying
  时间：2023/7/15
 -->
<template>
  <div class="userinfo">
    <!-- 头像区域 -->
    <div class="avatar">
      <el-avatar :size="220" :src="$store.state.userinfo.avatar"/>
    </div>

    <!-- 用户名称区域 -->
    <div class="user-name">
      <span>{{ $store.state.userinfo.username }}</span>
    </div>

    <!-- 个人自述 -->
    <div class="self-talk">
      <span>{{ $store.state.userinfo.description }}</span>
    </div>

  </div>
</template>

<script lang="ts">
import {ref} from 'vue'


export default {
  name: "UserCard",
  component: {},
  setup() {
  }

}
</script>

<style scoped lang='scss'>
* {
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.userinfo {
  width: 220px;

  .user-name {
    padding-left: 0;
    padding-bottom: 5px;
    font-size: 25px;
    text-align: center;
    font-family: "Times New Roman", "微软雅黑", "sans-serif";
  }

  .self-talk {
    margin-left: 3px;
    margin-top: 10px;
    width: 220px;
    height: 65px;
    border: 1px solid #e8ecf3;
    border-radius: 5px;

    span {
      display: block;
      margin: 10px 5px 10px 5px;
      font-size: 13px;
      word-break: break-all;
      font-family: "Times New Roman", "微软雅黑", "sans-serif";
    }
  }
}

</style>
