<template>
  <div class="navbar clearfix">
    <div class="left-box">
      <router-link to="/index" class="logo"><img src="@/assets/img/img_index/logo.png" alt=""/></router-link>
    </div>

    <div class="right-box">
      <el-dropdown class="user-dropdown">
        <div class="el-dropdown-link">
          <el-avatar class="dropdown-avatar" :src="avatar" :size="60"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/index">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {}
  },
  computed: {
    avatar() {
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100px;
  background-color: rgb(128, 30, 31);

  .left-box {
    float: left;

    .logo {
      display: block;
      height: 100px;
      overflow: hidden;
      img {
        margin: 15px 0 15px 30px;
      }
    }
  }

  .right-box {
    float: right;
    height: 70px;
    margin-top: 20px;
    margin-right: 40px;
  }
}
</style>
