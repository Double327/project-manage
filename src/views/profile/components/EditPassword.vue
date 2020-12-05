<template>
  <el-card>
    <el-form ref="form" :rules="rules" :model="info">
      <el-form-item label="原密码" label-width="80px" prop="oldPassword">
        <el-input type="password" v-model="info.oldPassword" autosize></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-width="80px" prop="newPassword">
        <el-input type="password" v-model="info.newPassword" autosize></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="80px" prop="confirmPassword">
        <el-input type="password" v-model="info.confirmPassword" autosize></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {resetPassword} from "@/api/user/user";

export default {
  name: "EditPassword",
  data() {
    const confirmPassword = (rule, value, callback) => {
      if (this.info.newPassword !== this.info.confirmPassword) {
        callback(new Error('两次密码不一致!'));
      }
      callback();
    };
    return {

      info: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原密码!', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度为6～20字符', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码!', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度为6～20字符', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '请确认密码!', trigger: 'blur'},
          {min: 6, max: 20, message: '密码长度为6～20字符', trigger: 'blur'},
          {required: true, validator: confirmPassword, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          resetPassword(this.info.oldPassword, this.info.newPassword).then(res => {
            this.msgSuccess(res.msg);
          }).catch(err => {
            this.msgError(err);
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
