<template>
  <div class="links-page">
    <div class="csdeep total">
      <div class="link-top-bar">
        <img src="../../assets/image/link.png" alt="link">
        <p>CS.DEEP旗下网站</p>
      </div>
      <div class="csdeep-website for-item">
        <ul>
          <li><a href="https://github.com/CS-DEEP">CS.DEEP组织Github地址</a></li>
          <li>
            <router-link to="/">CS.DEEP论坛</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="blogs total">
      <div class="link-top-bar">
        <img src="../../assets/image/link.png" alt="link">
        <p>团队开发者博客</p>
      </div>
      <div class="show-blogs for-item">
        <ul>
          <li><a href="https://wa-automat.github.io/">WA_automat的博客</a></li>
          <li><a href="https://2aurora2.github.io/">2aurora2的博客</a></li>
          <li><a href="https://111yuzhiying.github.io/">yuzhiying的博客</a></li>
        </ul>
      </div>
    </div>
    <div class="knowledge total">
      <div class="link-top-bar">
        <img src="../../assets/image/link.png" alt="link">
        <p>专业学习网站</p>
      </div>
      <div class="knowledge-website for-item">
        <ul>
          <li><a href="https://oi-wiki.org/">OI Wiki —— 认识和学习算法知识</a></li>
        </ul>
        <ul>
          <li><a href="https://ctf-wiki.org/en/">CTF Wiki —— 认识和学习CTF知识</a></li>
        </ul>
        <ul>
          <li><a href="https://cn.vuejs.org/">Vue.js —— 渐进式Javascript前端框架</a></li>
        </ul>
        <ul>
          <li><a href="https://spring.io/projects/spring-boot">Spring Boot —— Pivotal团队提供的一套开源后端框架</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinksView"
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.links-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 100px;

  .total {
    width: 800px;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    font-family: "Times New Roman", "宋体", "sans-serif";

    .link-top-bar {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 2px solid #dcdcdc;
      margin-bottom: 25px;

      img {
        width: 25px;
        height: auto;
        padding-right: 5px;
      }

      p {
        font-size: 20px;
        font-weight: 800;
      }
    }
  }

  &:first-child {
    margin-top: 50px;
  }

  .for-item {
    ul {
      list-style-type: none;
    }

    li {
      padding: 8px;
      font-size: 18px;
    }
  }
}
</style>
