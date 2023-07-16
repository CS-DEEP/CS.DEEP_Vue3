<template>
  <div class="user-page">
    <div class="user-card">
      <UserCard/>
    </div>
  </div>
</template>

<script lang="ts">
import UserCard from "@/components/common/UserCard.vue";

export default {
  name: "UserInfoView",
  components: {UserCard},
}
</script>

<style scoped>

</style>
