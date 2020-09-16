<template>
  <div class="reset-password">
    <el-form
      class="account-login-form"
      :model="form"
      :rules="formRules"
      ref="form"
      style="width: 500px;"
    >
      <el-form-item prop="oldPassword" required label="旧密码">
        <el-input
          placeholder="旧密码"
          type="password"
          v-model="form.oldPassword"
          :min="6"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" required label="新密码">
        <el-input
          placeholder="新密码"
          type="password"
          :min="6"
          v-model="form.newPassword"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword" required label="确认密码">
        <el-input
          placeholder="确认密码"
          type="password"
          :min="6"
          v-model="form.confirmPassword"
        ></el-input>
      </el-form-item>

      <el-button class="account-login-btn" type="warning" @click="submit"
        >确定</el-button
      >
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import apiAccount from "@/apis/apiAccount.js";

export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      formRules: {
        oldPassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
          {
            message: "密码长度为6-18位",
            pattern: /^\w{6,18}$/,
          },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            message: "密码长度为6-18位",
            pattern: /^\w{6,18}$/,
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
          {
            message: "密码长度为6-18位",
            pattern: /^\w{6,18}$/,
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$validate("form")
        .then((res) => {
          const { newPassword, confirmPassword } = this.form;
          if (newPassword !== confirmPassword) {
            this.$message.error("两次输入的密码不一致！");
            return;
          }
          apiAccount.resetPwd({ ...this.form }).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  padding: 50px;
}
</style>
