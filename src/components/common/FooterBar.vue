<template>
  <div class="footer">
    <router-link to="/">HomePage</router-link>
    |
    <router-link to="#">UsefulLinks</router-link>
    |
    <router-link to="#">AboutUs</router-link>
  </div>
</template>

<script>
export default {
  name: "FooterBar"
}
</script>

<style scoped>
.footer{
  width: 300px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
</style>
