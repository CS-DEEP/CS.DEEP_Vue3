<template>
  <navTop/>
  <div class="user-page">
    <span>此用户userId为: {{ userId }}</span>
  </div>
</template>

<script lang="ts">
import navTop from '../../components/common/navTop.vue'
export default {
  name: "UserInfoView",
  created() {
    this.userId = this.$route.params.userId;
  },
  components:{
    navTop
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
