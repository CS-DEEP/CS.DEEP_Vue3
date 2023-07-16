<template>
  <div class="user-page">
    <div class="main">
      <div class="left">
        <div class="user-card">
          <UserCard :user="user"/>
        </div>
        <div class="behavior">
          <div class="edit-follow">
            <router-link class="span" to="#" v-show="isOwn">编辑个人资料</router-link>
            <span class="span" v-show="!isOwn">关注</span>
          </div>
          <div class="follow-fan">
            <router-link class="span" to="#">{{ following_count }}<span> 关注</span></router-link>
            <router-link class="span" to="#">{{ follower_count }}<span> 粉丝</span></router-link>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="heatmap-part">
          <span>活跃度热力图</span>
          <div class="heatmap">
            <CalendarHeatmap/>
            <div class="desc">
              <div class="box" v-for="(color, index) in colors" :key="index" :style="`background:${color};`"></div>
            </div>
          </div>
        </div>
        <div class="article-list">
          <span>博客文章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserCard from "@/components/common/UserCard.vue";
import api from '@/api/modules/index.ts'
import CalendarHeatmap from "@/components/common/CalendarHeatmap.vue";
import CONST from "@/global/const/index.ts"

export default {
  name: "UserInfoView",
  components: {CalendarHeatmap, UserCard},
  mounted() {
    this.isOwn = parseInt(this.$route.params.userId) === this.$store.state.userinfo.id;
    api.userApi.getUserinfoData(this.$route.params.userId).then(res => {
      this.user = res.data.data.user;
    }).catch(err => {
      console.log(err)
    })
    api.userApi.getFollowingNum(this.$route.params.userId).then(res => {
      console.log(res.data)
      this.following_count = res.data.data.followingCount;
    }).catch(err => {
      console.log(err)
    })
    api.userApi.getFollowerNum(this.$route.params.userId).then(res => {
      this.follower_count = res.data.data.followerCount;
    }).catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      user: CONST.DEFAULTUSERINFO,
      following_count: 0,
      follower_count: 0,
      colors: CONST.COLORS,
      isOwn: true,
    }
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.user-page {
  min-width: 1400px;

  .main {
    width: 1050px;
    margin-top: 50px;
    margin-left: 240px;
    display: flex;
    flex-direction: row;

    .left {
      .behavior {
        margin-top: 20px;
        margin-left: 3px;

        .edit-follow {
          width: 220px;
          border: 1px solid #e8ecf3;
          border-radius: 5px;
          text-align: center;
          padding: 10px;
          background-color: #cbd3e1;

          .span {
            color: #222222;
            font-size: 18px;
          }

          &:hover {
            background-color: #8dafde;
          }
        }

        .follow-fan {
          display: flex;
          width: 220px;
          flex-flow: row nowrap;
          justify-content: space-around;
          padding-top: 10px;

          .span {
            padding: 5px;
            color: #222222;

            &:hover {
              border-bottom: 1px solid #e8ecf3;
            }
          }
        }
      }
    }

    .right {
      margin-left: 10px;
      margin-top: 25px;

      .heatmap-part {
        span {
          padding: 18px;
          font-family: '微软雅黑', 'sans-serif';
          font-size: 25px;
        }

        .heatmap {
          height: 160px;
          margin-left: 18px;
          margin-top: 20px;
          border: 2px solid #e8ecf3;
          border-radius: 5px;
          padding-top: 10px;
          position: relative;

          .desc {
            display: flex;
            flex-flow: row nowrap;
            position: absolute;
            bottom: 5px;
            right: 38px;

            .box {
              width: 11px;
              height: 11px;
            }
          }
        }
      }

      .article-list {
        margin-top: 20px;

        span {
          padding: 18px;
          font-family: '微软雅黑', 'sans-serif';
          font-size: 25px;
        }
      }
    }
  }
}
</style>
