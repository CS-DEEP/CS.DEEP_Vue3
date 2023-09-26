<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="web-intro">
          <p>入门指引</p>
        </div>
      </el-header>
    </el-container>

    <el-main>
      <div class="container">
        <div class="simpleIntro">
          <p>为了方便论坛用户更好地了解本论坛的使用，特撰写此“入站指引”介绍本论坛的主要功能，主要包括:</p>
          <ul>
            <li>1. 论坛首页</li>
            <li>2. 文章编辑</li>
            <li>3. 文章详情页</li>
            <li>4. 全局搜索</li>
            <li>5. 用户中心</li>
          </ul>
        </div>
        <div class="homeFun">
          <h2>论坛首页</h2>
          <p>1. 用户可以点击<strong>发布</strong>进入文章的编辑页面,对于文章编辑页面下文有详细概述。</p>
          <p>2. 在首页的侧边可以实时看到论坛的流量情况，包括：用户数、博客数、创立时间。</p>
          <p>3. 首页主体是论坛文章的展示，我们采用分页展示的方式，除此之外还有按照发布时间、文章热度、推荐等方式进行排列展示。</p>
          <el-image
              style="width: 800px; height: 500px"
              :src='homeImg'
              :zoom-rate="1.2"
              :preview-src-list="homeImgList"
              :initial-index="0"
              fit="cover"
          />
        </div>
        <div class="editFun">
          <h2>文章编辑</h2>
          <p>文章编辑页面如下图，主要包括文章标题、文章分类、文章标签、内容主体、文章发布、文章删除几部分内容。</p>
          <p>1. 对于文章分类有<strong>专业知识、分享发现、吐槽讨论</strong>三种可供选择。</p>
          <p>2. 对于文章标签用户的可塑性较高，可以任意填写<strong>三个</strong>与文章相关的标签，但是对于标签的字数有一定的限制。</p>
          <p>3. 文章内容的编写采用markdown的这一方式来进行，对markdown不了解的用户可以点击<strong>右上角的问号</strong>来查询。</p>
          <p>4. 如果未完成文章的内容编写可以点击保存保存到草稿箱；同样也可对文章进行发布和删除操作。</p>
          <el-image
              style="width: 800px; height: 500px"
              :src='editImg'
              :zoom-rate="1.2"
              :preview-src-list="editImgList"
              :initial-index="0"
              fit="cover"
          />
        </div>
        <div class="detailFun">
          <h2>文章详情页</h2>
          <p>1. 文章详情页本平台采用marked + highlight.js实现对markdown格式的转换，展示文章的标题，标签，正文等内容。</p>
          <p>2. 在文章详情页用户可以进行点赞、收藏、评论等功能。</p>
          <p>3. 如果用户对文章作者感兴趣可以点击作者头像来进入作者用户的个人信息页进行关注等操作。</p>
          <el-image
              style="width: 800px; height: 500px"
              :src='detailImg'
              :zoom-rate="1.2"
              :preview-src-list="detailImgList"
              :initial-index="0"
              fit="cover"
          />
        </div>
        <div class="searchFun">
          <h2>全局搜索</h2>
          <p>1. 本论坛的搜索采用opengauss数据库实现文章的全局关键字搜索，会根据用户输入的关键词进行实时搜索结果的展现。</p>
          <p>2. 搜索结果下拉列表只会展示至多5条数据，更多的结果可进行搜索结果页面查看。</p>
          <el-image
              style="width: 800px; height: 500px"
              :src='searchImg'
              :zoom-rate="1.2"
              :preview-src-list="searchImgList"
              :initial-index="0"
              fit="cover"
          />
        </div>
        <div class="userFun">
          <h2>用户中心</h2>
          <p>1. 用户在个人中心可以点击<strong>编辑个人资料</strong>进行个人信息的编辑。</p>
          <p>2. 用户可以实时得到自己的关注数和粉丝数，点击两者可分别进入关注或者粉丝的列表页面。</p>
          <p>3. 用户还可以在博客文章的区域看到自己发布的文章。</p>
          <p>4. 活跃度热力图展示是本论坛的一大特色，用户可以通过<strong>发布文章、对文章进行评论、关注用户</strong>等方式得到活跃度的提升，不同颜色代表活跃度的高低，颜色越深代表活跃度越高。用户可以查看过去一年自身的活跃度变化。
          </p>
          <el-image
              style="width: 800px; height: 500px"
              :src='userImg'
              :zoom-rate="1.2"
              :preview-src-list="userImgList"
              :initial-index="0"
              fit="cover"
          />
        </div>
        <div class="errLink">
          <h2>Issue提出</h2>
          <p style="padding-bottom: 20px">最后的最后如果发现论坛的Bug欢迎邮箱联系: cs_deep@163.com，让我们共同维护这个平台吧~</p>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script lang="ts">
import HomeFunImg from "@/assets/image/homeFun.png"
import EditFunImg from "@/assets/image/editFun.png"
import DetailFunImg from "@/assets/image/detailFun.png"
import SearchFunImg from "@/assets/image/searchFun.png"
import UserFunImg from "@/assets/image/userFun.png"

export default {
  name: "GuidanceView",
  data() {
    return {
      homeImg: HomeFunImg,
      homeImgList: [HomeFunImg],
      editImg: EditFunImg,
      editImgList: [EditFunImg],
      detailImg: DetailFunImg,
      detailImgList: [DetailFunImg],
      searchImg: SearchFunImg,
      searchImgList: [SearchFunImg],
      userImg: UserFunImg,
      userImgList: [UserFunImg]
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

.common-layout {
  .el-header {
    padding: 0;
    min-width: 1400px;
    width: 100%;
    height: 118px;
    background-color: #e8ecf3;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    .web-intro {
      p {
        font-size: 2rem;
        font-weight: bold;
        color: #667c99;
      }
    }
  }

  .el-main {
    .container {
      font-family: "Times New Roman", "宋体", "sans-serif";
      width: 800px;
      margin-left: auto;
      margin-right: auto;

      h1 {
        margin-top: 10px;
      }

      h2 {
        padding-top: 15px;
        padding-bottom: 3px;
        border-bottom: 2px solid #b3d4fc;
      }

      p {
        font-family: "Times New Roman", "宋体", "sans-serif";
        margin-top: 8px;
        line-height: 30px;
        font-size: 16px;

        &:first-of-type {
          span {
            font-weight: bold;
          }

        }
      }

      ul {
        margin: 10px 0 0 0;
        font-size: 17px;
        list-style-type: none;
        width: auto;

        li {
          margin: 5px 0;
          line-height: 25px;
          font-weight: 700;

          strong {
            color: black;
          }
        }
      }
    }
  }
}
</style>
