<template>
  <div class="user-page">
    <span>此用户userId为: {{ userId }}</span>
  </div>
</template>

<script>

export default {
  name: "UserInfoView",
  created() {
    this.userId = this.$route.params.userId;
  },
  data() {
    return {
      userId: null
    }
  }
}
</script>

<style scoped>

</style>
