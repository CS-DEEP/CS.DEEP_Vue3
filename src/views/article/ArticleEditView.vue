<template>
  <div class="edit-post-page">
    <div class="post-top">
      <div class="title">
        <p>文章标题</p>
        <div>
          <input type="text" v-model="article.title">
        </div>
      </div>
      <div class="cate">
        <p>文章分类(必需)</p>
        <div>
          <select v-model="article.categoryId">
            <option value=-1 hidden>未选择</option>
            <option v-for="(item,index) in category" :key="index" :value=index+1>
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="tag">
        <p>文章标签(双击删除标签、回车添加标签)</p>
        <div class="tag-part">
          <div class="tag-show"></div>
          <div class="tag-input">
            <input class="tag-enter" type="text" placeholder="Enter tags" @keydown.enter="tagEnterHandle"
                   v-model="tagTemp">
          </div>
        </div>
      </div>
    </div>
    <div class="post-main">

    </div>
  </div>
</template>

<script lang="ts">
import CONST from "@/global/const"
import {articleType} from "@/type"
import Index from "../../../index.html";
import {generateLightColor, getStringLengthOfChar} from "@/global/utils";

export default {
  name: "ArticleEditView",
  mounted() {
    this.article = JSON.parse(this.$route.params.article);
  },

  data() {
    let article: articleType = CONST.DEFAULTARTICLE
    let category = CONST.CATEGORYLIST
    let tagTemp = ''
    let tagList = []
    return {
      article,
      category,
      tagTemp,
      tagList,
    }
  },
  methods: {
    tagEnterHandle() {
      if (getStringLengthOfChar(this.tagTemp) > 12) {
        alert("每个标签的必须保证在12个字节内");
      } else if (this.tagList.length >= 3) {
        alert("每篇文章限制标签数为3个以内");
      } else {
        this.tagList.push(this.tagTemp);
        let childDiv = document.createElement("div") as HTMLElement;
        childDiv.textContent = this.tagList[this.tagList.length - 1]
        childDiv.style.width = '80px'
        childDiv.style.height = '30px'
        childDiv.style.padding = '3px'
        childDiv.style.borderRadius = '5px'
        childDiv.style.display = 'flex'
        childDiv.style.alignItems = 'center'
        childDiv.style.justifyContent = 'center'
        childDiv.style.marginRight = '2px'
        childDiv.style.backgroundColor = generateLightColor();
        childDiv.style.color = '#222222'
        childDiv.addEventListener('mouseover', () => {
          childDiv.style.filter = "brightness(80%)";
        })
        childDiv.addEventListener('mouseout', () => {
          childDiv.style.filter = "brightness(100%)";
        })
        childDiv.addEventListener('dblclick', () => {
          for (let i = 0; i < this.tagList.length; ++i)
            if (this.tagList[i] === childDiv.textContent) {
              this.tagList.splice(i, 1)
            }
          childDiv.remove();
        })
        let listDiv = document.querySelector('.tag-show');
        let tagInput = document.querySelector('.tag-enter') as HTMLInputElement;
        let currentWidth = parseInt(window.getComputedStyle(tagInput).width);
        tagInput.style.width = (currentWidth - 60) + 'px';
        listDiv.appendChild(childDiv)
        tagInput.value = ''
      }
    },
  }

}
</script>

<style scoped lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.edit-post-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .post-top {
    margin-top: 10px;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .title, .cate, .tag {
      width: 400px;

      p {
        font-family: "宋体", "sans-serif";
        font-size: 15px;
        color: #bdbcbc;
        padding-bottom: 5px;
      }

      input {
        width: 380px;
        height: 30px;
        border: none;
        border-bottom: 1px #dcdcdc solid;
        outline: none;
        font-family: "Times New Roman", "宋体", "sans-serif";
      }

      select {
        width: 380px;
        height: 30px;
        border-color: #8d8b8b;
        border-radius: 5px;
      }

      .tag-part {
        display: flex;
        flex-flow: row nowrap;

        .tag-show {
          display: flex;
          flex-flow: row nowrap;
          font-size: 8px;
          font-family: "微软雅黑", "sans-serif";
        }

        .tag-input {
          input {
            width: 380px;
          }
        }

      }
    }
  }
}
</style>
