<template>
   <div class="login">
      <div class="logo" @click="handleLogoClick">
         <SvgIcon icon="logo-title"></SvgIcon>
      </div>
      <div class="login__content">
         <div class="login-logo"></div>
         <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="top"
            hide-required-asterisk
         >
            <div class="title">
               <div>欢迎使用</div>
               <div>大数据共享交换平台</div>
            </div>
            <el-form-item label="用户名" prop="username">
               <div class="form-item__area">
                  <el-input
                     v-model="loginForm.username"
                     type="text"
                     autocomplete="off"
                     placeholder="用户名"
                  >
                     <template #suffix>
                        <el-icon
                           v-show="loginForm.username"
                           class="input-icon"
                           @click="loginForm.username = ''"
                           ><CircleCloseFilled
                        /></el-icon>
                     </template>
                  </el-input>
               </div>
            </el-form-item>
            <el-form-item label="密码" prop="password">
               <div class="form-item__area">
                  <el-input
                     ref="password"
                     type="text"
                     v-model="loginForm.password"
                     placeholder="密码"
                     :class="
                        passwordInputType === 'password'
                           ? 'password-security'
                           : ''
                     "
                     @keyup.enter="handleLogin"
                  >
                     <template #suffix>
                        <SvgIcon
                           v-show="
                              loginForm.password &&
                              passwordInputType === 'password'
                           "
                           icon="eye-filled"
                           className="input-icon"
                           @click="passwordInputType = 'text'"
                        ></SvgIcon>
                        <SvgIcon
                           v-show="
                              loginForm.password && passwordInputType === 'text'
                           "
                           icon="eye-off"
                           className="input-icon"
                           @click="passwordInputType = 'password'"
                        ></SvgIcon>
                     </template>
                  </el-input>
               </div>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
               <div class="form-item__area">
                  <el-input
                     v-model="loginForm.code"
                     auto-complete="off"
                     placeholder="验证码"
                     style="width: calc(100% - 112px)"
                     @keyup.enter="handleLogin"
                  >
                  </el-input>
                  <ValidateCode
                     v-model="validateCode"
                     class="login-code mt-1 ml-3"
                  ></ValidateCode>
               </div>

               <!-- <div class="login-code">
               <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div> -->
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="font-weight: 400"
               >记住密码</el-checkbox
            >
            <el-button
               :loading="loading"
               type="primary"
               class="login-btn w-full"
               @click.prevent="handleLogin"
            >
               <span v-if="!loading">立即登录</span>
               <span v-else>登录中...</span>
            </el-button>
         </el-form>
      </div>

      <!--  底部  -->
      <!-- <div class="el-login-footer">
         <span>Copyright © 2022 千方科技 All Rights Reserved.</span>
      </div> -->
   </div>
</template>

<script lang="js">
import { mapState,mapActions  } from "pinia";
import { usePermissionStore, useUserStore } from '@/Stores';
import { getCodeImg } from "@/Apis/Login";
import { encryption, decryption } from "@/Utils/AES";
import settings from "@/Settings";
import ValidateCode from "./ValidateCode.vue";

export default {
   name: "Login",
   components: { ValidateCode },
   data() {
      return {
         codeUrl: "",
         loginForm: {
            username: "",
            password: "",
            rememberMe: false,
            code: "",
            uuid: ""
         },
         loginRules: {
            username: [
               { required: true, trigger: "blur", message: "请输入用户名" }
            ],
            password: [
               { required: true, trigger: "blur", message: "密码不能少于6位" }
            ],
            code: [{ required: true, trigger: "blur", message: "请输入验证码" }]
         },
         loading: false,
         redirect: undefined,
         validateCode: "",
         passwordInputType: "password"
      };
   },
   computed: {
      ...mapState(usePermissionStore,["permissionRoutes"])
   },
   watch: {
      $route: {
         handler: function (route) {
            this.redirect = route.query && route.query.redirect;
         },
         immediate: true
      }
   },
   created() {
      // this.getCode()
      this.getPassword();
   },
   methods: {
      ...mapActions(useUserStore,['reset','doLogin']),
      getCode() {
         getCodeImg().then((res) => {
            if (res) {
               this.codeUrl = "data:image/gif;base64," + res.img;
               this.loginForm.uuid = res.uuid;
            }
         });
      },
      getPassword() {
         const username = localStorage.getItem("username");
         const password = localStorage.getItem("password");
         const rememberMe = localStorage.getItem("rememberMe");

         this.loginForm = {
            ...this.loginForm,
            username:
               username === undefined ? this.loginForm.username : username,
            password:
               password === undefined
                  ? this.loginForm.password
                  : decryption(password, settings.aesKey, settings.aesIv),
            rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
         };

         if (this.loginForm.rememberMe) {
            this.passwordInputType = "password";
         }
      },
      handleLogin() {
         this.$refs.loginForm.validate((valid) => {
            if (valid) {
               if (
                  this.loginForm.code.toLowerCase() !==
                  this.validateCode.toLowerCase()
               ) {
                  return this.$message.error("验证码不正确");
               }

               this.loading = true;

               this.reset()
                  .then(() => {
                     return this.doLogin( this.loginForm);
                  })
                  .then(() => {
                     if (this.loginForm.rememberMe) {
                        localStorage.setItem(
                           "username",
                           this.loginForm.username
                        );
                        localStorage.setItem(
                           "password",
                           encryption(
                              this.loginForm.password,
                              settings.aesKey,
                              settings.aesIv
                           )
                        );
                        localStorage.setItem(
                           "rememberMe",
                           this.loginForm.rememberMe
                        );
                     } else {
                        localStorage.removeItem("username");
                        localStorage.removeItem("password");
                        localStorage.removeItem("rememberMe");
                     }

                     const firstRoute = this.permissionRoutes.filter(
                        (pr) => !pr.hidden
                     )[0];

                     this.$router.push({
                        path: this.redirect || firstRoute.path
                     });
                  })
                  .finally(() => {
                     this.loading = false;
                  })
                  .catch((e) => {
                     console.log("----- login error: ", e);

                     //  this.getCode()
                  });
            }
         });
      },
      handleLogoClick() {
         window.location.href = import.meta.env.VITE_PORTAL_URL;
      },
      click(){
         console.log('----- 111');
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";

.logo {
   position: absolute;
   top: 34px;
   left: 22px;
   .flex();
   font-size: 32px;
   cursor: pointer;

   & svg {
      width: 100%;
   }
}
.login {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   background-image: url("../../Assets/Images/login_bg_2x.png");
   background-size: cover;
   .login__content {
      .flex(flex-start);
      width: 898px;
   }
}
.login-logo {
   width: 440px;
   height: 520px;
   background-image: url("../../Assets/Images/login_logo_2x.png");
   background-size: cover;
}
.title {
   margin-bottom: 22px;
   font-weight: 500;
   & div:first-of-type {
      font-size: @font-size-medium;
      color: @text-color-regular;
   }
   & div:last-of-type {
      font-size: @font-size-large;
   }
}

:deep(.login-form) {
   height: 520px;
   width: 458px;
   background: @color-white;
   padding: 40px 69px 49px 69px;
}
:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label) {
   margin-bottom: 4px;
   font-weight: 500;
}
.login-tip {
   font-size: 13px;
   text-align: center;
   color: #bfbfbf;
}
.login-code {
   height: 41px;
   float: right;
   img {
      cursor: pointer;
      vertical-align: middle;
   }
}
:deep(.form-item__area) {
   padding: 0 4px;
   width: 100%;
   height: 48px;
   line-height: 48px;
   background-color: @bg-color;
   border-radius: 4px;
   & .el-input__wrapper {
      box-shadow: none;
      background-color: @bg-color;
      & .is-focus,
      &:hover {
         box-shadow: none;
      }
   }
}
.el-login-footer {
   height: 40px;
   line-height: 40px;
   position: fixed;
   bottom: 0;
   width: 100%;
   text-align: center;
   color: #fff;
   font-family: Arial;
   font-size: 12px;
   letter-spacing: 1px;
}
.login-code-img {
   height: 38px;
}
.login-btn {
   height: 48px;
   font-size: 18px;
}
.input-icon {
   font-size: 20px;
   cursor: pointer;
   color: @icon-color-disabled;
}
</style>
