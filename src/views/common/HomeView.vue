<template>
  <TopNavBar/>
  <router-view/>
</template>

<script lang="ts">
import TopNavBar from "@/components/common/TopNavBar.vue"
export default {
  name: 'HomeView',
  components:[
      TopNavBar
  ]
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
