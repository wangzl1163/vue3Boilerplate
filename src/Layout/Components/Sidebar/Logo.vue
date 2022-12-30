<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime: 2022-12-29 11:14:49
 * @LastEditors: 王占领
-->
<template>
   <div class="sidebar-logo-container" :class="{ collapse: collapse }">
      <transition name="sidebarLogoFade">
         <router-link
            v-if="collapse"
            key="collapse"
            class="sidebar-logo-link"
            to="#"
            @click="handleRouterLinkClick"
         >
            <!-- <img v-if="logo" :src="logo" class="sidebar-logo" /> -->
            <svg-icon
               v-if="logo"
               icon="logo"
               className="sidebar-logo"
            ></svg-icon>
            <h1 v-else class="sidebar-title">{{ title }}</h1>
         </router-link>
         <router-link
            v-else
            key="expand"
            class="sidebar-logo-link"
            to="#"
            @click="handleRouterLinkClick"
         >
            <!-- <img v-if="logo" :src="logo" class="sidebar-logo" /> -->
            <svg-icon
               v-if="logo"
               icon="logo"
               className="sidebar-logo"
            ></svg-icon>
            <h1 class="sidebar-title">{{ title }}</h1>
         </router-link>
      </transition>
   </div>
</template>

<script>
import settings from "@/Settings";

export default {
   name: "SidebarLogo",
   props: {
      collapse: {
         type: Boolean,
         required: true
      }
   },
   data() {
      return {
         title: settings.title,
         logo: true
      };
   },
   computed: {
      portalHome() {
         return import.meta.env.VITE_PORTAL_URL;
      }
   },
   methods: {
      handleRouterLinkClick() {
         this.$store.dispatch("reset").then(() => {
            window.location.href = this.portalHome;
         });
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.sidebarLogoFade-enter-active {
   transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
   opacity: 0;
}

.sidebar-logo-container {
   position: relative;
   width: 100%;
   height: @header-height;
   line-height: @header-height;
   // background-image: url(../../../Assets/Images/BgImg.png);
   // background-repeat: no-repeat;
   // background-position: top left;
   left: 12px;
   overflow: hidden;

   & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
         margin-right: 4px !important;
         vertical-align: middle;
         font-size: 32px;
      }

      & .sidebar-title {
         display: inline-block;
         margin: 0;
         color: @color-white;
         line-height: @header-height;
         font-size: @font-size-medium;
         vertical-align: middle;
      }
   }

   &.collapse {
      visibility: initial;
      .sidebar-logo {
         margin-right: 0px;
      }
   }
}
</style>
