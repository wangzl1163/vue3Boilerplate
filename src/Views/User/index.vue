<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="8" :xs="24">
            <el-card class="box-card">
               <template #header>
                  <div class="clearfix">
                     <span>个人信息</span>
                  </div>
               </template>

               <div>
                  <div class="text-center">
                     <img
                        v-bind:src="avatar"
                        title="头像"
                        class="img-circle img-lg"
                     />
                  </div>
                  <ul class="list-group list-group-striped">
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />用户名称
                        <div class="pull-right">{{ userName }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="phone" />手机号码
                        <div class="pull-right">
                           {{ userInfo.phone_number }}
                        </div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="email" />用户邮箱
                        <div class="pull-right">{{ userInfo.email }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="tree" />所属部门
                        <div class="pull-right" v-if="userInfo.department">
                           {{ userInfo.department }}
                           <!-- / {{ postGroup }} -->
                        </div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="peoples" />所属角色
                        <div class="pull-right">
                           {{
                              userRoles.join(",") === "admin"
                                 ? "管理员"
                                 : "用户"
                           }}
                        </div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="date" />创建日期
                        <div class="pull-right">{{ userInfo.create_at }}</div>
                     </li>
                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="16" :xs="24">
            <el-card>
               <template #header>
                  <div class="clearfix">
                     <span>基本资料</span>
                  </div>
               </template>

               <el-tabs v-model="activeTab">
                  <!-- <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane> -->
                  <el-tab-pane label="修改密码" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
import userInfo from "./UserInfo.vue";
import resetPwd from "./ResetPwd.vue";
import { getUserProfile } from "@/Apis/User";

export default {
   name: "Profile",
   components: { userInfo, resetPwd },
   data() {
      return {
         user: {},
         roleGroup: {},
         postGroup: {},
         activeTab: "resetPwd"
      };
   },
   computed: mapGetters(["avatar", "userName", "userInfo", "userRoles"]),
   created() {
      // this.getUser()
   },
   methods: {
      getUser() {
         getUserProfile().then((response) => {
            this.user = response.data;
            this.roleGroup = response.roleGroup;
            this.postGroup = response.postGroup;
         });
      }
   }
};
</script>

<style lang="less" scoped>
.list-group {
   .list-group-item {
      box-sizing: border-box;
      padding: 5px 0;

      .pull-right {
         display: inline;
      }
   }
}
</style>
