<template>
  <div class="container">
    <div class="message-box">
      <div class="avatar">
        <img src="@/assets/image/robot.svg" alt="avatar" style="width: 40px;height: auto">
      </div>
      <div class="message" v-html="message"></div>
    </div>
  </div>
</template>

<script setup>
const infoProps = defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: max-content;
  color: #000;
}

.message-box {
  display: flex;
  align-items: flex-start;
  margin-top: 5px;
  width: 100%;
}

.avatar {
  margin-right: 10px;
  margin-left: 5px;
  width: 40px;
  height: 40px;
}

.message {
  max-width: 85%;
  word-wrap: break-word;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
}
</style>