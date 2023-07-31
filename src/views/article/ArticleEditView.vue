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
      <button class="del-btn" @click="dialogVisible=true">删除文章</button>
      <button class="commit-btn" @click="publishArticleHandle">提交发布</button>
    </div>
    <div class="post-main">
      <mavon-editor
          ref="md"
          style="width: 100%; height: 100%"
          v-model="mdValue"
          :codeStyle="codeStyle"
          :xssOptions="xssOptions"
          @imgAdd="updateImageHandle"
          @save="updateArticleInfo"
      ></mavon-editor>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="30%"
    >
      <span>确定删除此文章嘛？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="el-btn" @click="dialogVisible = false">取消</el-button>
        <el-button class="el-btn" type="primary" @click="deleteArticleHandle">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import CONST from "@/global/const"
import api from "@/api/modules"
import {articleType} from "@/type"
import Index from "../../../index.html";
import {generateLightColor, getStringLengthOfChar} from "@/global/utils";
import router from "@/router";

export default {
  name: "ArticleEditView",
  mounted() {
    api.articleApi.getArticleInfo(this.$route.params.postId).then(res => {
      this.article = res.data.data.article;
      this.mdValue = this.article.content
      this.tagList = res.data.data.tag ? res.data.data.tag : [];
      for (let i = 0; i < this.tagList.length; ++i) {
        let childDiv = this.addTagDivHandle(this.tagList[i])
        let listDiv = document.querySelector('.tag-show')
        let tagInput = document.querySelector('.tag-enter') as HTMLInputElement;
        let currentWidth = parseInt(window.getComputedStyle(tagInput).width);
        tagInput.style.width = (currentWidth - 86) + 'px';
        listDiv.appendChild(childDiv)
      }
    }).catch(err => {
      console.log(err)
    })
    this.interval = setInterval(() => {
      this.article.content = encodeURIComponent(this.mdValue)
      api.articleApi.updateArticleInfo({
        article: this.article,
        tag: this.tagList
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.article.content = decodeURIComponent(this.article.content)
    }, 10000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  data() {
    let mdValue: string
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
      mdValue,
      xssOptions: {
        whiteList: {
          span: ['style']
        }
      },
      dialogVisible: false
    }
  },
  methods: {
    addTagDivHandle(tag: string) {
      let childDiv = document.createElement("div") as HTMLElement;
      childDiv.textContent = tag
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
      childDiv.style.zIndex='-1'
      childDiv.addEventListener('mouseover', () => {
        childDiv.style.filter = "brightness(80%)";
      })
      childDiv.addEventListener('mouseout', () => {
        childDiv.style.filter = "brightness(100%)";
      })
      childDiv.addEventListener('dblclick', () => {
        let tagInput = document.querySelector('.tag-enter') as HTMLInputElement;
        let currentWidth = parseInt(window.getComputedStyle(tagInput).width);
        tagInput.style.width = (currentWidth + 86) + 'px'
        for (let i = 0; i < this.tagList.length; ++i)
          if (this.tagList[i] === childDiv.textContent) {
            this.tagList.splice(i, 1)
          }
        childDiv.remove();
      })
      return childDiv;
    },
    tagEnterHandle() {
      if (getStringLengthOfChar(this.tagTemp) > 12 || getStringLengthOfChar(this.tagTemp) <= 0) {
        alert("每个标签的必须保证在1-12个字节内");
      } else if (this.tagList.length >= 3) {
        let tagInput = document.querySelector('.tag-enter') as HTMLInputElement;
        tagInput.value = '';
        alert("每篇文章限制标签数为3个以内");
      } else {
        this.tagList.push(this.tagTemp);
        let listDiv = document.querySelector('.tag-show');
        let childDiv = this.addTagDivHandle(this.tagTemp);
        let tagInput = document.querySelector('.tag-enter') as HTMLInputElement;
        let currentWidth = parseInt(window.getComputedStyle(tagInput).width);
        tagInput.style.width = (currentWidth - 86) + 'px';
        listDiv.appendChild(childDiv)
        tagInput.value = ''
        this.tagTemp = ''
      }
    },
    updateImageHandle(pos: number, file: File) {
      let formData = new FormData();
      formData.append('file', file);
      api.articleApi.updateImageHandle(formData).then(res => {
        this.$refs.md.$img2Url(pos, res.data.data.url)
      }).catch(err => {
        console.log(err)
      })
    },
    updateArticleInfo() {
      this.article.content = encodeURIComponent(this.mdValue)
      api.articleApi.updateArticleInfo({
        article: this.article,
        tag: this.tagList
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      alert("已保存到草稿箱！")
    },
    publishArticleHandle() {
      this.article.content = encodeURIComponent(this.mdValue)
      api.articleApi.publishArticle({
        article: this.article,
        tag: this.tagList
      }).then(res => {
        // TODO:页面跳转事宜
        if (res.data.code === 200) {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteArticleHandle() {
      api.articleApi.deleteArticle(this.article.id).then(res => {
        if (res.data.code === 200) {
          alert(res.data.message)
          router.push('/')
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

.dialog-footer {
  .el-btn {
    width: max-content;
    padding: 5px;
  }
}
</style>
