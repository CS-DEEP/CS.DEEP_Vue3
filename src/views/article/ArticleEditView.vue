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
    <div class="buttons">
      <button class="del-btn">删除文章</button>
      <button class="commit-btn">提交发布</button>
    </div>
    <div class="post-main">
      <mavon-editor
          style="width: 100%; height: 100%"
          v-model="article.content"
          :codeStyle="codeStyle"
          :xssOptions="xssOptions"
          @imgAdd="updateImageHandle"
          @save="updateArticleInfo"
      ></mavon-editor>
    </div>
  </div>
</template>

<script lang="ts">
import CONST from "@/global/const"
import api from "@/api/modules"
import {articleType} from "@/type"
import Index from "../../../index.html";
import {generateLightColor, getStringLengthOfChar} from "@/global/utils";

export default {
  name: "ArticleEditView",
  mounted() {
    api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
      this.article = res.data.data.article;
      this.tagList = res.data.data.tag ? res.data.data.tag : [];
    }).catch(err => {
      console.log(err)
    })
    this.interval = setInterval(() => {
      api.articleApi.updateArticleInfo({
        article: this.article,
        tag: this.tagList
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }, 10000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  data() {
    let article: articleType = CONST.DEFAULTARTICLE
    let category = CONST.CATEGORYLIST
    let tagTemp = ''
    let tagList: Array<string> = []
    let codeStyle = 'github'
    let interval: number
    return {
      article,
      category,
      tagTemp,
      tagList,
      codeStyle,
      interval,
      xssOptions: {
        whiteList: {
          span: ['style']
        }
      }
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
    updateImageHandle(pos: number, file: File) {
      let formData = new FormData();
      formData.append('file', file);
      api.articleApi.updateImageHandle(formData).then(res => {
        this.article.content += `![](${res.data.data.url})`
      }).catch(err => {
        console.log(err)
      })
    },
    updateArticleInfo() {
      api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
        if (res.data.code === 200) {
          api.articleApi.updateArticleInfo({
            article: this.article,
            tag: this.tagList
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          alert("已保存到草稿箱！")
        }
      }).catch(err => {
        console.log(err)
      })
    }
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
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .title, .cate, .tag {
      width: 400px;
      padding-left: 10px;

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

  .buttons {
    width: 1150px;
    display: flex;
    flex-direction: row-reverse;

    button {
      width: 90px;
      height: 40px;
      font-family: "宋体", "sans-serif";
      font-size: 15px;
      background-color: #dcdcdc;
      border: none;
      border-radius: 5px;
      margin-left: 10px;

      &:hover {
        background-color: #cbd3e1;
      }

    }

    .commit-btn {
      color: #009992;
    }

    .del-btn {
      color: #ee4f4f;
    }
  }

  .post-main {
    margin-top: 15px;
    height: 700px;
    width: 1150px;
  }
}
</style>
