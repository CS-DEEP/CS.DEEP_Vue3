<template>
  <div class="msgView">
    <div class="nan"><span>暂无相关数据</span></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MyMessageView"
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.msgView {
  margin-top: 10px;
  margin-left: 10px;

  .nan {
    text-align: center;
    width: 600px;

    span {
      color: #bbbaba;
      font-size: 25px;
    }
  }
}
</style>
