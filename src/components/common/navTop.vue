<!-- 
  用途：论坛导航栏顶部
  创建人：yuzhiying
  时间：2023/7/12
 -->
 <template>
    <!-- 大盒子包住导航区域 -->
    <div class="topNav">
  
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      menu-trigger="click"
      unique-opened="true"
      @select="handleSelect"
    >
    <!-- 左边区域 -->
      <el-menu-item index="1" class="item1">
        <el-link href="https://element-plus.org" target="_blank" :underline="false">CS.DEEP</el-link>
      </el-menu-item>
      <el-sub-menu index="2" class="item2">
        <template #title>专业学习</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" class ="item3">友情链接</el-menu-item>
      <el-sub-menu index="4" class ="item4">
        <template #title>关于本站</template>
        <el-menu-item index="4-1">haha</el-menu-item>
        <el-menu-item index="4-2">haha</el-menu-item>
        <el-menu-item index="4-3">haha</el-menu-item>
      </el-sub-menu>
  
      <!-- 右边区域 -->
      <el-menu-item index="5" class="item5">
        <el-input 
          v-model="searchInput"
          placeholder="搜索"
          :prefix-icon="Search"
        >
        </el-input>
      </el-menu-item>
  
      <el-sub-menu index="6" class ="item6">
        <template #title v-bind="fontChoice">{{ fontChoice }}</template>
        <el-menu-item index="6-1" @click="chooseFont1" ><el-icon :size="15" v-show=" showFont1 " ><Check/></el-icon>简体中文</el-menu-item>
        <el-menu-item index="6-2" @click="chooseFont2" ><el-icon :size="15" v-show=" !showFont1 "><Check/></el-icon>English</el-menu-item>
      </el-sub-menu>
  
      <el-menu-item index="7" class="item7">
        <el-button :icon="Edit" circle plain />
      </el-menu-item>
  
      <el-menu-item index="8" class="item8">
        <div class="bell">
          <el-button type="plain" :icon="BellFilled" circle />
        </div>
      
      </el-menu-item>
  
      <el-menu-item index="9" class="item9">
        <el-button round>
          
          <img src="../../assets/image/forum.png"  alt="头像" class="avatar">
          
          <!-- <el-icon :size="15" type="margin = 0"><DCaret/></el-icon> -->
          {{ useName }}
        </el-button>
      </el-menu-item>
  
    </el-menu>
    </div>
  
  
  
    
  </template>
   
  
  
  
  
  <script lang='ts'>
  import {ref} from 'vue'
  import {
    ArrowDown,
    Search,
    DCaret,
    Check,
    Edit,
    BellFilled,
  
  } from '@element-plus/icons-vue'
  
  export default {
    name: "navTop",
    components:{
      DCaret,
      Search,
      Edit,
      BellFilled,
      Check
  
    },
    setup(){
      // 数据
      let showFont1 = true
      const fontChoice = ref('简体中文')
      const searchInput = ref('')
      const activeIndex = ref('1')
      const useName = ref('yuzhiying')
  
      // 函数
      const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    
  
      const chooseFont1 = () =>{
        fontChoice.value = "简体中文"
        showFont1 = true
      }
      const chooseFont2= ()=>{
        fontChoice.value = "English"
        showFont1 = false
      }
  
      return{
        // 导出的字体图标
        ArrowDown,
        Search,
        DCaret,
        Check,
        Edit,
        BellFilled,
  
        //导出的数据
        searchInput,
        activeIndex,
        useName,
        fontChoice,
        showFont1,
  
  
        //导出的函数
        handleSelect,
        chooseFont1,
        chooseFont2
  
      }
    }
  }
  
  </script>
  
  
  <!-- element中的元素的样式写的时候，
    最后一步一定是要它名字作为类名，
    这样的写的样式才能够生效 -->
  
  <style scoped lang='scss'>
  *{
    border: 0;
    margin: 0;
  }
  
  .topNav{
    // position: fixed;
    // top: 0;
    background-color: #fff;
    margin-left: 280px;
    .el-menu-demo{
      
      .item9:hover{
        background-color: #fff;
      }
      .item9{
        padding: 0;
        margin-top: 15px;
        border-bottom: 0;
        .el-button:hover{
          background-color: #d7dfea;
        }
        .el-button{
          .avatar{
            
            height: 18px;
            width: 18px;
            margin-right: 10px;
            
          }
        }
      }
      .item8{
        width: 10px;
        // margin-top: 15px;
        border-bottom: 0;
        .bell{
          height: 32px;
          width: 32px;
          .el-button:hover{
          background-color: #d7dfea;
        }
        .el-button{
          width: 32px;
          height: 32px;
          margin: 0;
          padding-left: 5px;
          
        }
        }
        
      }
      .item8:hover{
        background-color: #fff;
      }
      .item7:hover{
        background-color: #fff;
      }
      .item7{
        margin-top: 15px;
        width: 10px;
        border-bottom: 0;
        .el-button:hover{
          background-color: #d7dfea;
        }
        .el-button{
          width: 32px;
          height: 32px;
          // padding: 0;
          margin: 0;
          
        }
        
        
  
      }
      .item6:hover{
        background-color: #fff;
      }
      .item6{
        margin-top: 20px;
        height: 20px;
        border-bottom: 0;
        width: 120px;
  
      }
  
      .item5{
        padding: 0;
        margin-left: 20px;
        border-bottom: 0;
        .el-input{
          margin-top: 10px;
          padding: 0;
        }
      }
      .item5:hover{
        background-color: #fff;
      }
      .item4{
        padding: 0;
        .el-sub-menu__title{
          i{
            padding-left: 10px;
          }
        }
      }
      
      .item3{
      padding: 0;
      }
      .item2{
      padding: 0;
      }
      .item1:hover{
        background-color: #fff;
      }
      .item1{
      border-bottom: 0;
      padding: 0;
      .el-link{
        font-size: 18px;
        color: #265faf;
    }
    }
  
  
  }
  
  }
  
  </style>
  