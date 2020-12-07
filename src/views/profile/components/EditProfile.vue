<template>
  <el-card>
    <el-form ref="form" :rules="rules" :model="user">
      <el-form-item label="手机号" label-width="80px" prop="phone">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {updateProfile} from "@/api/system/user";

export default {
  name: "EditProfile",
  props: {
    user: {
      required: true
    }
  },
  data() {
    return {
      rules: {
        email: [
          {required: true, message: '请输入邮箱!', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误!', trigger: 'blur'},
        ],
        phone: [
          {required: true, message: "请输入手机号!", trigger: "blur"},
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "手机号码格式错误!",
            trigger: "blur"
          }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const data = {
            phone: this.user.phone,
            email: this.user.email
          }
          updateProfile(data).then(res => {
            this.msgSuccess(res.msg);
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
