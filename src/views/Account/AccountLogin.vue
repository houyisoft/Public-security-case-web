<template>
  <div class="account-login">
    <div class="account-login-wrap">
      <div style="padding: 50px 0px 70px 0px">
        <el-image
          class="account-login-img"
          style="width:108px"
          :src="require('@/assets/images/login/logo.png')"
        ></el-image>
        <div class="account-login-title">执 法 办 案 区 智 能 管 控 平 台</div>
        <el-form
          size="medium"
          class="account-login-form"
          :model="loginFormData"
          :rules="loginFormRules"
          ref="loginForm"
        >
          <el-form-item prop="username" style="margin-bottom: 30px;">
            <el-input
              placeholder="账号"
              style="position:relative;text-align:center;width: 420px;"
              v-model="loginFormData.username"
            ></el-input>
            <span class="logintitle">账号：</span>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 10px;">
            <el-input
              placeholder="密码"
              type="password"
              style="position:relative;text-align:center;width: 420px;"
              v-model="loginFormData.password"
            ></el-input>
            <span class="logintitle">密码：</span>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isRemember" @change="rememberPass">记住密码</el-checkbox>
          </el-form-item>
          <el-button class="account-login-btn" type="warning" @click="postLoginFormData">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiAccount from "@/apis/apiAccount.js";
import { setToken } from "@/utils/auth.js";

export default {
  data() {
    return {
      loginFormData: {
        username: "",
        password: ""
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      isRemember: false // 是否记住密码
    };
  },
  created() {
    let loginFormData = window.localStorage.getItem("loginFormData");
    //判断是否点击了记住密码
    if (loginFormData && localStorage.isRememberPass) {
      this.loginFormData = JSON.parse(loginFormData);
      this.isRemember = true;
    } else {
      this.loginFormData = {
        username: "",
        password: ""
      };
      this.isRemember = false;
    }
  },
  methods: {
    //点击记住密码
    rememberPass(val) {
      localStorage.isRememberPass = val;
    },
    postLoginFormData() {
      this.$validate("loginForm")
        .then(res => {
          apiAccount
            .JumpBL({
              Account: this.loginFormData.username
            })
            .then(data => {
              if (data.data[0] != null && data.data[1] != null) {
                var people = data.data[0];
                var police = data.data[1];
                var casedata = data.data[2];
                let httppath="http://10.24.157.116:7000/static/templates/index.html?authType=glzx&comPage=glzx&alarmCode=" +this.loginFormData.username +"&identifyCode=" +police.idno + "&caseCode=" +casedata.zfcaseId +"&caseMark=&personnelCode=" +people.ypeople +"&fromType=glzx" +"&bllb=" +people.biLuType;
                console.log("BLhttpPath",httppath);
                window.open(
                  "http://10.24.157.116:7000/static/templates/index.html?authType=glzx&comPage=glzx&alarmCode=" +
                    this.loginFormData.username +
                    "&identifyCode=" +
                    police.idno +
                    "&caseCode=" +
                    casedata.zfcaseId +
                    "&caseMark=&personnelCode=" +
                    people.ypeople +
                    "&fromType=glzx" +
                    "&bllb=" +
                    people.biLuType +"&RoomId="+people.distributionRoomId,
                  "_self"
                );
                debugger;
                console.log("修改门牌：", people.distributionRoomId);
                apiAccount
                  .operatorLED({
                    functionRoom: people.distributionRoomId,
                    TextValue: "使用中"
                  })
                  .then(res => {
                    console.log("修改门牌返回：", res.code);
                    console.log("修改门牌返回：", res.msg);
                  });
              } else {
                apiAccount
                  .login({
                    username: this.loginFormData.username,
                    password: this.loginFormData.password
                  })
                  .then(res => {
                    if (res.code == 0) {
                      apiAccount.getTitle().then(res => {
                        if (res.code == 0) {
                          this.$store.commit(
                            "updateTitle",
                            res.rows[0].configNr
                          );
                        }
                      });
                      this.$store.dispatch("initData");
                      this.$store.commit("updateToken", res.msg);
                      setToken(res.msg);
                      this.$store.commit("updateUserInfo", res.data);

                      if (this.isRemember) {
                        window.localStorage.setItem(
                          "loginFormData",
                          JSON.stringify(this.loginFormData)
                        );
                      } else {
                        window.localStorage.removeItem("loginFormData");
                      }

                      const redirectTo = decodeURIComponent(this.$route.query.redirectTo || '');
                      if (redirectTo) {
                        this.$router.push(redirectTo);
                      } else {
                        this.$router.push("/");
                      }
                    } else {
                      this.$message.error(res.msg);
                    }
                  });
              }
            });
        })
        .catch(err => {
          console.log("登录表单验证失败", err);
        });
    }
  }
};
</script>

<style 
 lang="scss">
.account-login {
  height: 100vh;
  background-image: url(../../assets/images/login/login_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;

  .account-login-wrap {
    width: 50%;
    text-align: center;
    background: url(../../assets/images/login/form_bg.png) no-repeat;
    background-size: 100% 100%;

    .account-login-title {
      font-size: 30px;
      font-weight: bold;
      color: #6cdffc;
      margin-bottom: 50px;
      margin-top: 20px;
    }

    .account-login-form {
      width: 420px;
      margin: 0 auto;
      text-align: justify;
      .el-input__inner {
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        background: rgba(56, 166, 243, 0.5);
        border: 1px solid rgba(172, 231, 253, 1);
        border-radius: 4px;
        text-align: center;
        z-index: 99;
        height: 50px;
        line-height: 50px;
      }
      .el-checkbox__label {
        color: rgba(255, 255, 255, 1);
      }
      .is-checked .el-checkbox__inner {
        background: rgba(56, 166, 243, 0.5);
        border: 1px solid rgba(172, 231, 253, 1);
      }
      .logintitle {
        position: absolute;
        left: 10px;
        top: 2px;
        color: rgba(255, 255, 255, 1);
      }
      .account-login-btn {
        width: 100%;
        margin-top: 20px;
        background: rgb(251, 185, 92) !important;
        border-radius: 4px;
        padding: 13px !important;
        font-size: 24px;
      }
    }
  }
}
.el-image__inner--center {
  transform: none;
  position: static;
  top: inherit;
  left: inherit;
}
.el-form-item--medium .el-form-item__content,
.el-form-item--medium .el-form-item__label {
  line-height: 50px;
}
.el-input--medium {
  font-size: 18px;
}
.el-input .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}

.el-form-item__error {
  color: rgb(245, 108, 108);
  font-size: 14px;
  line-height: 1;
  padding-top: 5px !important;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
