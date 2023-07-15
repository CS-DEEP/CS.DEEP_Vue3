<!--
  用途：论坛导航栏顶部
  创建人：yuzhiying
  时间：2023/7/12
 -->
<template>
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

        <el-sub-menu index="2" class="item2">
          <template #title><span>专业学习</span></template>
          <el-menu-item index="2-1"><span>勋哥牛哇</span></el-menu-item>
          <el-menu-item index="2-2"><span>标哥牛哇</span></el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4" class="item4">
          <template #title><span>关于本站</span></template>
          <el-menu-item index="4-1"><span>勋哥牛哇</span></el-menu-item>
          <el-menu-item index="4-2"><span>标哥牛哇</span></el-menu-item>
        </el-sub-menu>

        <div class="search-box">
          <el-menu-item index="5" class="item5">
            <el-input
                v-model="searchInput"
                placeholder="search"
                :prefix-icon="Search"
            >
            </el-input>
          </el-menu-item>
        </div>

        <el-menu-item index="7" class="item7">
          <el-button :icon="Edit" circle plain/>
        </el-menu-item>

        <el-menu-item index="8" class="item8">
          <div class="bell">
            <el-button type="plain" :icon="BellFilled" circle/>
          </div>
        </el-menu-item>

        <AvatarAndUsername v-show="$store.state.haveLogin"/>
        <RegisterAndLogin v-show="!$store.state.haveLogin"/>
      </el-menu>
    </div>
  </div>
</template>


<script lang='ts'>
import {ref} from 'vue'
import {
  Search,
  Edit,
  BellFilled,

} from '@element-plus/icons-vue'
import RegisterAndLogin from "@/components/mini/RegisterAndLogin.vue"
import AvatarAndUsername from "@/components/mini/AvatarAndUsername.vue"

export default {
  name: "TopNavBar",
  components: {
    RegisterAndLogin,
    AvatarAndUsername,
  },
  setup() {
    // 数据
    const searchInput = ref('')
    const activeIndex = ref('1')

    // 函数
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    return {
      // 导出的字体图标
      Search,
      Edit,
      BellFilled,

      //导出的数据
      searchInput,
      activeIndex,
      //导出的函数
      handleSelect,
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
  min-width: 1500px;
  border-bottom: 1px solid gainsboro;

  .content {
    width: 1500px;
    margin: 0 auto;
    padding: 0;
    position: relative;

    .el-menu-demo {
      border: none;

      .item8 {
        width: 10px;
        margin-top: -9px;
        border-bottom: 0;

        .bell {
          height: 32px;
          width: 32px;

          .el-button:hover {
            background-color: #d7dfea;
          }

          .el-button {
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

        .el-button:hover {
          background-color: #d7dfea;
        }

        .el-button {
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
          width: 200px;
          padding: 0;
          margin-right: 10px;
          border-bottom: 0;
          float: right;
          transition: width 1s ease;

          .el-input {
            margin-top: 10px;
            padding: 0;
            font-size: 15px;
            font-family: "Times New Roman", "宋体", "sans-serif";
          }
        }

        .item5:hover, .item5:focus-within {
          width: 300px;
          background-color: white;
        }
      }

      .item4 {
        span {
          font-family: '宋体', 'sans-serif';
          font-size: 15px;
          color: #222222;
        }
      }

      .item2 {
        margin-left: 10px;
        span {
          font-family: '宋体', 'sans-serif';
          font-size: 15px;
          color: #222222;
        }
      }

      .item1:hover {
        background-color: #fff;
      }

      .item1 {
        border-bottom: 0;
        padding: 0;
        margin-left: 300px;

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
