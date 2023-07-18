<template>
  <div class="edit-page">
    <p><span>Public profile</span></p>
    <div class="main">
      <div class="info">
        <div class="info-item">
          <span>username</span>
          <input type="text" :placeholder="this.$store.state.userinfo.username" v-model="username">
        </div>
        <div class="info-item">
          <span>description</span>
          <textarea :placeholder="this.$store.state.userinfo.description" v-model="description"></textarea>
        </div>
        <div class="info-item">
          <span>age</span>
          <select v-model="age">
            <option v-for="(number,index) in Array.from({ length: 100 }, (_, i) => i + 1)" :key="index" :value="number">
              {{ number }}
            </option>
          </select>
        </div>
        <div class="info-item">
          <span>gender</span>
          <select v-model="gender">
            <option value=1>男</option>
            <option value=0>女</option>
          </select>
        </div>
        <div class="update-btn" @click="uploadInfoHandle">
          <span>上传</span>
        </div>
      </div>
      <div class="avatar-part">
        <div class="span-avatar">
          <span>profile avatar</span>
          <div class="upload-avatar">
            <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="handleFileUpload">
            <img :src="currentImageUrl" alt="Uploaded Avatar" @click="triggerFileInput">
          </div>
          <span class="span">（点击头像更换）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api/modules/index.ts'
import {getImageFileFromUrl, fileToFormData} from '@/global/utils'

export default {
  name: "UserinfoEditView",
  data() {
    let avatar: Promise<File>
    return {
      username: this.$store.state.userinfo.username,
      description: this.$store.state.userinfo.description,
      age: this.$store.state.userinfo.age,
      gender: this.$store.state.userinfo.gender,
      defaultImageUrl: this.$store.state.userinfo.avatar,
      userImageUrl: this.$store.state.userinfo.avatar,
      avatar,
    }
  },
  mounted() {
    this.avatar = getImageFileFromUrl(this.$store.state.userinfo.avatar)
  },
  computed: {
    currentImageUrl() {
      return this.userImageUrl || this.defaultImageUrl;
    }
  },
  methods: {
    triggerFileInput() {
      // 虽然报错但是可以跑？奇奇怪怪的
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.avatar = file;
      this.userImageUrl = URL.createObjectURL(file);
    },
    uploadInfoHandle() {
      let formData = new FormData();
      fileToFormData(this.avatar).then(res => {
        formData = res;
      });
      api.userApi.uploadInfo({
        username: this.username,
        gender: this.gender,
        age: this.age,
        description: this.description,
        avatar: formData
      }).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          alert(res.data.message);
          api.userApi.getUserinfoData(this.$store.state.userinfo.id).then(res => {
            this.$store.commit('updateUserinfo', res.data.data.user)
          }).catch(err => {
            console.log(err)
          })
          this.$router.push({name: 'userInfo', params: {userId: this.$store.state.userinfo.id}})
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

.edit-page {
  min-width: 1400px;

  p {
    width: 800px;
    margin-left: 365px;
    margin-top: 50px;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;

    span {
      color: #222222;
      font-size: 30px;
      font-family: "Times New Roman", "sans-serif";
    }
  }

  .main {
    width: 800px;
    margin-left: 365px;
    display: flex;
    flex-flow: row nowrap;

    .info {
      width: 400px;

      .info-item {
        margin-top: 10px;

        span {
          width: 400px;
          padding: 5px;
          display: block;
          font-size: 20px;
          font-weight: normal;
          font-family: "Times New Roman", "sans-serif";
        }

        input, textarea, select {
          margin-left: 5px;
          padding: 5px;
          width: 400px;
          max-width: 400px;
          min-width: 400px;
          max-height: 150px;
          word-break: break-all;
          font-family: "Times New Roman", "微软雅黑", "sans-serif";
          border-radius: 5px;
          border: 1px #dcdcdc solid;
          color: #a9a6a6;
          font-size: 15px;
        }
      }

      .update-btn {
        margin-left: 5px;
        margin-top: 40px;

        span {
          display: block;
          width: 100px;
          height: max-content;
          padding: 10px;
          border: 1px solid #dcdcdc;
          border-radius: 5px;
          background-color: #238636;
          color: white;
          text-align: center;
        }
      }
    }

    .avatar-part {
      width: 200px;
      margin-left: 100px;
      margin-top: 10px;

      .span-avatar {

        span {
          text-align: center;
          width: 200px;
          padding: 5px;
          display: block;
          font-size: 20px;
          font-weight: normal;
          font-family: "Times New Roman", "sans-serif";
        }

        .upload-avatar {
          margin-top: 20px;

          img {
            display: block;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid #dcdcdc;

            &:hover {
              border: 1px solid #574242;
            }
          }
        }

        .span {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
