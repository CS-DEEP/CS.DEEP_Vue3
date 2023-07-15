<template>
  <NavTop/>
  <div class="user-page">
    <span>此用户userId为: {{ userId }}</span>
  </div>
  <UserCard/>
</template>

<script lang="ts">
import NavTop from '../../components/common/NavTop.vue'
import UserCard from '@/components/common/UserCard.vue';

export default {
  name: "UserInfoView",
  created() {
    this.userId = this.$route.params.userId;
  },
  components:{
    NavTop,
    UserCard
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
