<script setup lang="ts">
import {RouterView} from 'vue-router'
import FooterBar from './components/common/FooterBar.vue'
import TopNavBar from "@/components/common/TopNavBar.vue";
</script>

<template>
  <div class="app-container">
    <div class="top-nav-container">
      <TopNavBar/>
    </div>
    <div class="views">
      <router-view/>
    </div>
    <div class="footer-container">
      <FooterBar/>
    </div>
  </div>

</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 1400px;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .views {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .footer-container {
    flex-shrink: 0;
    margin-top: 20px;
  }
}

.el-popover{
  background-color: #959896 !important;
  border-color: #959896 !important;
}


</style>
