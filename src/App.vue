<script setup lang="ts">
import {RouterView} from 'vue-router'
import FooterBar from './components/common/FooterBar.vue'
</script>

<template>
  <router-view/>
  <FooterBar/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  min-width: 1400px;
}
</style>
