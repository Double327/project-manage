<template>
  <div class="login">
    <div class="login_form">
      <div class="title">
        <img src="@/assets/img/img_login/login_title.png" alt="用户登录">
      </div>
      <el-form label-width="90px">
        <el-form-item label="学号、工号">
          <el-input v-model="userInfo.no"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="14">
            <el-form-item>
              <el-input v-model="userInfo.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <img :src="codeImg" alt="验证码" @click="getCode">
            </el-form-item>
          </el-col>
        </el-form-item>
        <div class="login-btn">
          <img src="@/assets/img/img_login/login_button.png" alt="" @click="handleLogin">
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import {getCaptchaImg, login} from "@/api/login";

export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        no: '',
        password: '',
        code: '',
        uuid: ''
      },
      codeImg: '',
    }
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCaptchaImg().then(res => {
        this.codeImg = res.img;
        this.uuid = res.uuid;
      })
    },
    handleLogin() {
      login(this.userInfo).then(res => {
        console.log(res);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url("../../assets/img/img_login/bk_img.png");
  background-size: 100% 100%;
  height: 850px;
  padding-top: 60px;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #d4d2d2 0 0 10px;
  -moz-box-shadow: #d4d2d2 0 0 10px;

  .login_form {
    width: 400px;
    position: relative;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background-color: rgb(234, 232, 233);
    border-radius: 8px;
    padding: 30px 40px;

    .title {
      text-align: center;
      margin-bottom: 40px;
    }

    .login-btn {

      img {
        width: 370px;
        margin: 0 20px;
      }
    }
  }
}

</style>
