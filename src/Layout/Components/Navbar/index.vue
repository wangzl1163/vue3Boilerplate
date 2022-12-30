<template>
   <div class="navbar">
      <hamburger
         id="hamburger-container"
         :is-active="sidebar.opened"
         class="hamburger-container"
         @toggleClick="toggleSideBar"
      />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

      <div class="right-menu">
         <!-- <template v-if="device !== 'mobile'">
            <screenfull id="screenfull" class="right-menu-item hover-effect" />
         </template> -->
         <span style="display: inline-block" class="mr-1">{{ userName }}</span>
         <el-dropdown
            class="avatar-container right-menu-item hover-effect mr-6"
            trigger="click"
         >
            <div class="avatar-wrapper">
               <img :src="currentAvatar" class="user-avatar" />
               <el-icon><caret-bottom /></el-icon>
            </div>
            <template v-slot:dropdown>
               <el-dropdown-menu>
                  <!-- <router-link to="/profile" v-if="isShowProfile"> -->
                  <el-dropdown-item @click="visible = true"
                     >个人中心</el-dropdown-item
                  >
                  <!-- </router-link> -->

                  <el-dropdown-item
                     :divided="isShowProfile"
                     @click.native="logout"
                  >
                     <span>退出登录</span>
                  </el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
      </div>
   </div>

   <BeDialog title="个人信息" v-model:visible="visible" :showFooter="false">
      <ul class="user-info">
         <li class="user-info__item">
            <span class="user-info__item--label">用户名称：</span>
            <span>{{ userName }}</span>
         </li>
         <li class="user-info__item">
            <span class="user-info__item--label">账号：</span>
            <span>{{ account }}</span>
         </li>
         <li class="user-info__item">
            <span class="user-info__item--label">手机号：</span>
            <span>{{ userInfo.mobliePhone }}</span>
         </li>
         <li class="user-info__item">
            <span class="user-info__item--label">邮箱：</span>
            <span>{{ userInfo.email }}</span>
         </li>
      </ul>
   </BeDialog>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useUserStore, useAppStore } from "@/Stores";
import Breadcrumb from "./Breadcrumb.vue";
import Hamburger from "./Hamburger.vue";
import Screenfull from "@/Components/Screenfull/index.vue";

export default {
   components: {
      Breadcrumb,
      Hamburger,
      Screenfull
   },
   data() {
      return {
         visible: false
      };
   },
   computed: {
      ...mapState(useAppStore, ["sidebar", "device"]),
      ...mapState(useUserStore, [
         "currentAvatar",
         "isShowProfile",
         "userName",
         "account"
      ])
   },
   methods: {
      ...mapActions(useAppStore, ["toggleSideBar"]),
      ...mapActions(useUserStore, ["logOut"]),
      logout() {
         this.$confirm("确定注销并退出系统吗？", {
            title: "提示",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         })
            .then(() => {
               this.logOut().then(() => {
                  this.$router.replace("/login");
               });
            })
            .catch((err) => {
               console.log("----- 取消了退出: ", err);
            });
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.navbar {
   position: relative;
   height: @navbar-height;
   overflow: hidden;
   background: @color-white;
   box-shadow: inset 0 -1px 0 0 @color-gray-space-light-7;
   color: @text-color-primary;

   .hamburger-container {
      line-height: @navbar-height;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
         // background: rgba(0, 0, 0, 0.025);
      }
   }

   .breadcrumb-container {
      float: left;
   }

   .errLog-container {
      display: inline-block;
      vertical-align: top;
   }

   .right-menu {
      float: right;
      height: 100%;
      line-height: @navbar-height;

      &:focus {
         outline: none;
      }

      .right-menu-item {
         display: inline-block;
         font-size: 18px;
         vertical-align: middle;

         &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
               background: @color-gray-space-light-9;
            }
         }
      }

      .avatar-container {
         .avatar-wrapper {
            .flex();

            .user-avatar {
               cursor: pointer;
               width: 32px;
               height: 32px;
            }

            .el-icon {
               cursor: pointer;
            }
         }
      }
   }

   :global(.user-info) {
      margin-block: 0;
   }
   :global(.user-info__item--label) {
      display: inline-block;
      width: 70px;
      text-align: right;
   }
}
</style>
