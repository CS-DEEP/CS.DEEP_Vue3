<template>
  <div class="follower-page">
    <div class="nan" v-show="numOfItem===0"><span>暂无符合条件用户</span></div>
    <div class="main" v-show="numOfItem > 0">
      <div class="item" v-for="(item,index) in curList" :key="index">
        <div class="avatar" @click="toUserCenter(index)">
          <img :src="item.avatar" alt="avatar">
        </div>
        <div class="name-desc">
          <p @click="toUserCenter(index)">{{ item.username }}</p>
          <p>{{ item.description }}</p>
        </div>
        <el-button v-show="isOwn" class="btn" @click="followEachHandle(index)">
          <span v-show="!isFollow[(curPage-1) * 6 + index]">关注</span>
          <span v-show="isFollow[(curPage-1) * 6 + index]">已互关</span>
        </el-button>
      </div>
    </div>
    <div class="pagination" v-show="numOfItem > 6">
      <el-pagination
          small
          background
          layout="prev, pager, next"
          :default-page-size="6"
          v-model:current-page="curPage"
          @current-change="pageChangeHandle"
          :total="numOfItem"
      />
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="30%"
    >
      <span>确定取消对该用户的关注嘛？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="el-btn" @click="dialogVisible = false">取消</el-button>
        <el-button class="el-btn" type="primary" @click="cancelFollowHandle">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import api from "@/api/modules";
import {userType} from "@/type";
import router from "@/router";
import CONST from "@/global/const"

export default {
  name: "MyFollowerView",
  computed: {},
  mounted() {
    this.isOwn = parseInt(this.$route.params.userId) === this.$store.state.userinfo.id;
    api.userApi.getFollowerList(this.$route.params.userId).then(res => {
      this.followerList = res.data.data.follower;
      this.numOfItem = res.data.data.follower.length;
      for (let i = 0; i < this.numOfItem && i < 6; ++i) {
        this.curList.push(this.followerList[i])
      }
      for (let i = 0; i < this.numOfItem; ++i) {
        api.userApi.getFollowState(this.followerList[i].id).then(res => {
          this.isFollow.push(res.data.data.isFollow);
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    let isOwn = false;
    let target: number;
    let dialogVisible = false;
    let curPage = 1;
    let isFollow: Array<boolean> = [];
    let curList: Array<userType> = [];
    let followerList: Array<userType> = [];
    let numOfItem: number = 3;
    return {
      dialogVisible,
      followerList,
      numOfItem,
      isFollow,
      curList,
      curPage,
      target,
      isOwn
    }
  },
  methods: {
    pageChangeHandle(val: number) {
      this.curPage = val;
      // 分页每页显示6个用户
      let index = (val - 1) * 6;
      let tmpArr = [];
      for (let i = index; i < this.numOfItem && i < index + 6; ++i) {
        tmpArr.push(this.followerList[i])
      }
      this.curList = tmpArr;
    },
    toUserCenter(index) {
      router.push({name: 'userInfo', params: {userId: this.curList[index].id}})
    },
    cancelFollowHandle() {
      api.userApi.cancelFollowHandle(this.curList[this.target].id).then(res => {
        if (res.data.code === 200) {
          this.isFollow[(this.curPage - 1) * 6 + this.target] = false;
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogVisible = false
    },
    followEachHandle(index) {
      if (this.isFollow[(this.curPage - 1) * 6 + index]) {
        this.target = index;
        this.dialogVisible = true;
      } else {
        api.userApi.followHandle(this.curList[index].id).then(res => {
          if (res.data.code === 200) {
            this.isFollow[(this.curPage - 1) * 6 + index] = true;
          }
        }).catch(err => {
          console.log(err)
        })
      }
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

.follower-page {
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  .nan {
    text-align: center;
    width: 600px;

    span {
      color: #bbbaba;
      font-size: 25px;
    }
  }

  .main {
    height: 500px;

    .item {
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;
      padding-bottom: 20px;

      .avatar {
        img {
          width: 65px;
          height: auto;
          border-radius: 50%;
        }
      }

      .name-desc {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        justify-content: space-around;
        height: 65px;
        padding-left: 20px;

        p {
          font-family: "Times New Roman", "宋体", "sans-serif";
        }

        p:first-child {
          font-size: 18px;
          color: #fb7299;
        }
      }

      .btn {
        width: 50px;
        height: 30px;
        padding: 5px;
      }
    }
  }
}

.dialog-footer {
  .el-btn {
    width: max-content;
    padding: 5px;
  }
}
</style>
