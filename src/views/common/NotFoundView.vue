<template>
  <div class="not-found">
    <div class="words">
      <span>Oops!</span>
      <span>This is awkward... You are looking for</span>
      <span>something that doesn't actually exist.</span>
    </div>
    <div class="img">
      <img src="../../assets/image/404.png" alt="404">
    </div>
    <router-link class="button" to="/"><span>Go Back HomePage</span></router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView"
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.not-found {
  font-family: "Times New Roman", "sans-serif";
  display: flex;
  flex-direction: column;
  margin: 8% auto;
  min-width: 1400px;

  .words {
    margin: 0 auto;

    span:first-child {
      color: #c71e1e;
      font-size: 35px;
    }

    span:nth-child(2) {
      font-size: 25px;
    }

    span:nth-child(3) {
      display: block;
      font-size: 25px;
      text-align: center;
    }
  }

  .img {
    margin: 30px auto;
  }

  .button {
    margin: 10px auto;

    span {
      background-color: #7cc576;
      color: white;
      padding: 15px;
      text-align: center;
      font-size: 20px;
      border-radius: 10px;
    }
  }
}
</style>
