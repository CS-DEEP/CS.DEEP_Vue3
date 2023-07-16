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

</style>
