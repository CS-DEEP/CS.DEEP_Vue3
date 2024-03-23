<template>
  <div class="footer">
    <div class="web-link">
      <div>
        <router-link :to="{name:'userInfo',params:{userId:this.$store.state.userinfo.id}}">
          <span>个人中心</span>
        </router-link>
      </div>
      <div>
        <router-link to='/links'><span>友情链接</span></router-link>
      </div>
      <div>
        <router-link to="/about"><span>关于我们</span></router-link>
      </div>
    </div>
    <div class="web-intro">
      <p>CS.DEEP</p>
      <p>一个致力于服务每一位师范生的在线素养画像平台</p>
      <p>Github地址: <a href="https://github.com/CS-DEEP" target="_blank">https://github.com/CS-DEEP</a></p>
      <p>商务邮箱: cs_deep@163.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar"
}
</script>

<style scoped lang="scss">
.footer {
  min-width: 1400px;
  width: 100%;
  height: 240px;
  background-color: #333436;
  display: flex;
  flex-direction: column;
  text-align: center;

  .web-link {
    width: 1300px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 25px auto;

    span {
      color: #dcdcdc;
      font-size: large;
      font-family: '宋体', 'sans-serif';
      font-weight: bolder;
    }
  }

  .web-intro {
    margin: 0 auto;
    width: 1300px;
    border-top: 2px solid #151517;

    p {
      color: #878989;
      font-family: "Times New Roman", "宋体", "sans-serif";
      padding-top: 10px;

      a {
        color: #878989;
      }
    }

    p:first-child {
      font-size: 30px;
      padding-top: 20px;
    }
  }
}
</style>
