<!-- 
  用途：用户信息卡片
  创建人：yuzhiying
  时间：2023/7/15
 -->
<template>
  <div class="userInfo">
    <!-- 头像区域 -->
    <div class="avatar">
      <el-avatar :size="220"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <!-- 用户名称区域 -->
    <div class="userNameBox">
      <span>{{ userName }}</span>
    </div>

    <!-- 个人自述 -->
    <div class="selfTalk">
      <span>It's too late to see you~</span>
        
  
    </div>

    <!-- 描述标志区域 -->
    <div class="description">
      <ul>
        <li>
          <i class="iconfont icon-xuexiao_xuexiaoxinxi"></i>
          <span>SCNU</span>
        </li>
        <li>
          <i class="iconfont icon-diliweizhi"></i>
          <span>China</span>
        </li>
        <li>
          <i class="iconfont icon-shizhong"></i>
          <span>19:55</span>
        </li>
        <li>
          <i class="iconfont icon-lianjie"></i>
          <span><a href="https://element-plus.org" target="_blank" >https://element-plus.org</a></span>
        </li>
      </ul>
      
    </div>
    
  </div>
</template>

<script lang="ts" >
import {ref} from 'vue'


export default{
  name: "UserCard",
  component:{

  },
  setup(){
    // 定义的数据
    const userName = ref('yuzhiying')


    // 定义的函数


    return{
      // 导出的数据
      userName,



      // 导出的字体图标




      // 导出的函数


    }
  }

}
</script>

<style scoped lang='scss'>
*{
    border: 0;
    margin: 0;
    padding: 0;
}

.userInfo{
  width: 220px;
  .userNameBox{
    padding-left: 0px;
    font-size: 24px;
  }

  // 个人自述
  .selfTalk{
    margin-top: 10px;
    width: 220px;
    height: 48px;  
    span{
      font-size: 16px;
    }
  }
  .description{
    width: 220px;
    height: 48px;
    padding-top: 5px;
    
    li:nth-child(4){
      a{
        text-decoration:none
      }
    }
    li{
      width: 220px;
      span{
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }

}

</style>
