<template>
   <el-form ref="form" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="password">
         <el-input
            v-model="user.password"
            placeholder="请输入旧密码"
            ref="password"
            :type="passwordInputType"
            :key="passwordKey"
            :readonly="passwordReadonly"
            @focus="handleFocus"
            @blur="handleBlur"
            @mousedown="handleMousedown"
         />
      </el-form-item>
      <el-form-item label="新密码" prop="modify_password">
         <el-input
            ref="modifyPassword"
            v-model="user.modify_password"
            placeholder="请输入新密码"
            :type="passwordInputType2"
            :key="passwordKey2"
            :readonly="passwordReadonly2"
            @focus="handleFocus2"
            @blur="handleBlur2"
            @mousedown="handleMousedown2"
         />
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" />
    </el-form-item> -->
      <el-form-item>
         <el-button type="primary" size="mini" @click="submit">保存</el-button>
         <el-button type="danger" size="mini" @click="close">关闭</el-button>
      </el-form-item>
   </el-form>
</template>

<script>
import { updateUserPwd } from "@/Apis/User";
import md5 from "crypto-js/md5";

export default {
   data() {
      const equalToPassword = (rule, value, callback) => {
         if (this.user.newPassword !== value) {
            callback(new Error("两次输入的密码不一致"));
         } else {
            callback();
         }
      };

      return {
         test: "1test",
         user: {
            username: "",
            password: "",
            modify_password: "",
            confirmPassword: undefined
         },
         // 表单校验
         rules: {
            oldPassword: [
               { required: true, message: "旧密码不能为空", trigger: "blur" }
            ],
            newPassword: [
               { required: true, message: "新密码不能为空", trigger: "blur" },
               {
                  min: 6,
                  max: 20,
                  message: "长度在 6 到 20 个字符",
                  trigger: "blur"
               }
            ],
            confirmPassword: [
               { required: true, message: "确认密码不能为空", trigger: "blur" },
               { required: true, validator: equalToPassword, trigger: "blur" }
            ]
         },
         passwordInputType: "text",
         passwordReadonly: false,
         passwordKey: Date.now().toString(),
         passwordInputType2: "text",
         passwordReadonly2: false,
         passwordKey2: Date.now().toString()
      };
   },
   computed: {
      userName() {
         return this.$store.state.user.name === "admin"
            ? this.$store.state.user.name
            : this.$store.state.user.userInfo.user_name;
      },
      umy() {
         return md5(this.user.password).toString();
      },
      mdmy() {
         return md5(this.user.modify_password).toString();
      }
   },
   watch: {
      "user.password": function (val) {
         if (val) {
            this.passwordInputType = "password";
         } else {
            setTimeout(() => {
               this.passwordInputType = "text";
               this.$refs.password.blur();
               this.$refs.password.focus();
            }, 0);
         }
      },
      "user.modify_password": function (val) {
         if (val) {
            this.passwordInputType2 = "password";
         } else {
            setTimeout(() => {
               this.passwordInputType2 = "text";
               this.$refs.modifyPassword.blur();
               this.$refs.modifyPassword.focus();
            }, 0);
         }
      }
   },
   methods: {
      submit() {
         this.$refs.form.validate((valid) => {
            if (valid) {
               updateUserPwd({
                  uyh: this.userName,
                  umy: this.umy,
                  mdmy: this.mdmy
               }).then(() => {
                  this.$message.success("修改成功");
               });
            }
         });
      },
      close() {
         this.$store.dispatch("delView", this.$route);
         this.$router.push({ path: "/index" });
      },
      handleFocus() {
         setTimeout(() => {
            this.passwordReadonly = false;
         }, 0);
      },
      handleBlur() {
         setTimeout(() => {
            this.passwordReadonly = true;
         }, 0);
      },
      handleMousedown() {
         if (!this.user.password) {
            this.passwordReadonly = true;
            this.passwordKey = Date.now().toString();
            setTimeout(() => {
               this.$refs.password.focus();
            }, 0);
         }
      },
      handleFocus2() {
         setTimeout(() => {
            this.passwordReadonly2 = false;
         }, 0);
      },
      handleBlur2() {
         setTimeout(() => {
            this.passwordReadonly2 = true;
         }, 0);
      },
      handleMousedown2() {
         if (!this.user.modify_password) {
            this.passwordReadonly2 = true;
            this.passwordKey2 = Date.now().toString();
            setTimeout(() => {
               this.$refs.modifyPassword.focus();
            }, 0);
         }
      }
   }
};
</script>
