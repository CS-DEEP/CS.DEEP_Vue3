<template>
  <div class="footer">
    <router-link to="/"><span>HomePage</span></router-link>
    |
    <router-link to="#"><span>UsefulLinks</span></router-link>
    |
    <router-link to="#"><span>AboutUs</span></router-link>
  </div>
</template>

<script>
export default {
  name: "FooterBar"
}
</script>

<style lang="scss">
.footer {
  min-width: 1500px;
  width: 300px;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-family: "Times New Roman", "sans-serif";
  text-decoration: none;

  span{
    margin: 0 20px 0 20px;
    font-size: larger;
    color: #222222;
  }
}
</style>
