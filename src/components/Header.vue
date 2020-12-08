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
          <router-link to="/user/profile">
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="handleLogout">退出登录</span>
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
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("LogOut").then(() => {
        this.msgSuccess('退出登录成功!!!');
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: rgb(128, 30, 31);
  z-index: 999;

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
