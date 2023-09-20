<!--
  用途：论坛导航栏顶部
 -->
<template>
  <el-affix :offset="0">
    <div class="topNav">
      <div class="content">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            menu-trigger="click"
            unique-opened="true"
            @select="handleSelect"
        >
          <el-menu-item index="1" class="item1">
            <router-link to="/" class="font-icon">CS.DEEP</router-link>
          </el-menu-item>
          <div class="item-list">
            <el-dropdown>
              <el-button class="big-title">
                <span class="bat-title">专业学习</span>
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/cate/0">专业知识</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/cate/1">分享发现</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/cate/2">吐槽讨论</router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="item-list">
            <el-dropdown>
              <el-button class="big-title">
                <span class="bat-title">关于本站</span>
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/about">本站介绍</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>入门指引</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="search-box">
            <el-menu-item index="5" class="item5">
              <el-input
                  v-model="searchInput"
                  placeholder="search"
                  :suffix-icon="Search"
                  @input="searchHandle"
                  @keydown.enter="jumpToSearchPage"
              >
              </el-input>
              <div class="search-extern-res">
                <div class="searchRes" v-show="showRes">
                  <div class="resItem" v-for="(item,index) in searchResult" :key="index"
                       @click="toArticleDetails(item.id)" :to="`/post/${item.id}`">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </el-menu-item>
          </div>
          <el-menu-item index="7" class="item7">
            <el-button class="edit" :icon="Edit" circle plain @click="toMyDraftPage"/>
          </el-menu-item>
          <el-menu-item index="8" class="item8">
            <div class="bell">
              <el-button class="bell" type="plain" :icon="BellFilled" circle @click="toMyMessagePage"/>
            </div>
          </el-menu-item>

          <AvatarAndUsername v-show="$store.state.haveLogin"/>
          <RegisterAndLogin v-show="!$store.state.haveLogin"/>
        </el-menu>
      </div>
    </div>
  </el-affix>

</template>


<script lang='ts'>
import {Ref, ref} from 'vue'
import {
  Search,
  Edit,
  BellFilled,
} from '@element-plus/icons-vue'
import RegisterAndLogin from "@/components/mini/RegisterAndLogin.vue"
import AvatarAndUsername from "@/components/mini/AvatarAndUsername.vue"
import router from "@/router";
import store from "@/store";
import api from "@/api/modules"
import {articleBaseInfo} from "@/type";
import {ElMessage} from "element-plus";
import CONST from "@/global/const"

export default {
  name: "TopNavBar",
  components: {
    RegisterAndLogin,
    AvatarAndUsername,
  },
  setup() {
    const searchInput = ref('')
    const activeIndex = ref('1')
    const resCount = ref(2)
    const showRes = ref(false)
    const searchResult: Ref<articleBaseInfo[]> = ref([CONST.DEFAULTARTICLE, CONST.DEFAULTARTICLE])
    const toMyMessagePage = () => {
      router.push({name: 'message', params: {userId: store.state.userinfo.id}})
    }
    const toMyDraftPage = () => {
      router.push({name: 'draft', params: {userId: store.state.userinfo.id}})
    }
    const searchHandle = () => {
      showRes.value = true
      api.articleApi.getRealTimeSearch(searchInput.value).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.articleCount > 0) {
            showRes.value = true
          }
          if (res.data.data.articleCount > 5) {
            searchResult.value = res.data.data.articleList.slice(0, 5)
          } else {
            searchResult.value = res.data.data.articleList
          }
        } else {
          ElMessage({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
    const jumpToSearchPage = () => {
      router.push({name: 'search', params: {keyword: searchInput.value}})
      showRes.value = false
      searchInput.value = ''
    }
    const toArticleDetails = (id: number) => {
      router.push({name: 'articleDetails', params: {postId: id}})
      showRes.value = false
      searchInput.value = ''
    }
    return {
      Search,
      Edit,
      BellFilled,
      showRes,
      resCount,
      searchInput,
      activeIndex,
      searchResult,
      toMyMessagePage,
      toMyDraftPage,
      searchHandle,
      jumpToSearchPage,
      toArticleDetails
    }
  }
}

</script>


<style scoped lang='scss'>
* {
  border: 0;
  margin: 0;
  box-sizing: border-box;
}

.topNav {
  background-color: #fff;
  height: 60px;
  min-width: 1400px;
  border-bottom: 1px solid gainsboro;

  .content {
    width: 1400px;
    margin: 0 auto;
    padding: 0;
    position: relative;

    .el-menu-demo {
      border: none;

      .item-list {
        margin-top: 15px;
        margin-left: 10px;

        .big-title {
          border: none;
          color: #222222;
          transition: all 1s linear;
          background-color: white;

          .bat-title {
            font-size: 17px;
            font-family: '宋体', 'sans-serif';
          }

          &:hover {
            background-color: transparent !important;
          }
        }
      }


      .item8 {
        width: 10px;
        margin-top: -9px;
        border-bottom: 0;

        .bell {
          height: 32px;
          width: 32px;

          .bell:hover {
            background-color: #d7dfea;
          }

          .bell {
            width: 32px;
            height: 32px;
            margin: 0;
            padding-left: 13px;
          }
        }
      }

      .item8:hover {
        background-color: #fff;
      }

      .item7:hover {
        background-color: #fff;
      }

      .item7 {
        margin-top: 15px;
        width: 10px;
        border-bottom: 0;

        .edit:hover {
          background-color: #d7dfea;
        }

        .edit {
          width: 32px;
          height: 32px;
          padding-left: 13px;
          margin: 0;

        }
      }

      .item6:hover {
        background-color: #fff;
      }

      .item6 {
        margin-top: 20px;
        height: 20px;
        border-bottom: 0;
        width: 120px;

      }

      .search-box {
        width: 400px;
        margin-top: -2px;

        .item5 {
          width: 350px;
          padding: 0;
          margin-right: 10px;
          border-bottom: 0;
          float: right;
          transition: width 1s ease;
          background-color: white;
          position: relative;

          .el-input {
            background-color: white;
            width: 350px;
            margin-top: 10px;
            padding: 0;
            font-size: 15px;
            font-family: "Times New Roman", "宋体", "sans-serif";
          }

          .search-extern-res {
            position: absolute;
            top: 49px;
            z-index: 10000;

            .searchRes {
              position: relative;
              width: 350px;
              height: max-content;
              background-color: #ffffff;
              border-radius: 5px;
              display: flex;
              flex-direction: column;

              .resItem {
                height: 40px;
                padding-left: 5px;
                padding-bottom: 5px;
                font-size: 15px;
                color: #222222;
                display: flex;
                font-family: "Times New Roman", "宋体", "sans-serif";
                align-items: center;
                user-select: none;

                &:hover {
                  background-color: #e3e5e7;
                }
              }
            }
          }
        }
      }

      .item1:hover {
        background-color: #fff;
      }

      .item1 {
        border-bottom: 0;
        padding: 0;
        margin-left: 240px;
        margin-top: 2px;


        .font-icon {
          font-size: 25px;
          color: #265faf;
          font-family: "Times New Roman", "sans-serif";
        }
      }
    }
  }

}

</style>
