<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="我的信息">
          <user-card :user="user"/>
        </el-tab-pane>
        <el-tab-pane label="修改联系方式">
          <edit-profile :user="user"/>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <edit-password/>
        </el-tab-pane>
        <el-tab-pane label="登录日志">登录日志</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import EditPassword from "@/views/profile/components/EditPassword";
import EditProfile from "@/views/profile/components/EditProfile";
import {getUserProfile} from "@/api/user/user";
import UserCard from "@/views/profile/components/UserCard";

export default {
  name: "profile",
  components: {UserCard, EditProfile, EditPassword},
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      getUserProfile().then(res => {
        this.user = res.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
