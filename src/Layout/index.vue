<!--
 * @Description  : layout
-->
<template>
   <div :class="classObj" class="app-wrapper">
      <div
         v-if="device === 'mobile' && sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside"
      />
      <sidebar class="sidebar-container" />
      <div :class="{ hasTagsView: showTagsView }" class="main-container">
         <div :class="{ 'fixed-header': isFixedHeader }">
            <navbar />
            <tags-view v-if="showTagsView" />
         </div>
         <app-main />
      </div>
   </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import request from "@/Utils/HttpRequest";
import { useAppStore, useSettingStore } from "@/Stores";
import { AppMain, Navbar, Sidebar, TagsView } from "./Components";
import ResizeMixin from "./Mixin/ResizeHandler";

export default {
   name: "Layout",
   components: {
      AppMain,
      Navbar,
      Sidebar,
      TagsView
   },
   mixins: [ResizeMixin],
   computed: {
      ...mapState(useAppStore, {
         sidebar: (store) => store.sidebar,
         device: (store) => store.device
      }),
      ...mapState(useSettingStore, ["showTagsView", "isFixedHeader"]),
      classObj() {
         return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === "mobile"
         };
      }
   },
   methods: {
      ...mapActions(useAppStore, ["closeSideBar"]),
      handleClickOutside() {
         this.closeSideBar({ withoutAnimation: false });
      }
   },
   beforeRouteLeave() {
      request.$abort();
      request.$clearPostData();
   },
   beforeRouteUpdate(to, from, next) {
      if (to.path !== from.path) {
         request.$abort();
         request.$clearPostData();
      }

      next();
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Mixin.less";
@import "@/Assets/Style/Variables.less";
.app-wrapper {
   .clearfix();
   position: relative;
   height: 100%;
   width: 100%;

   &.mobile.openSidebar {
      position: fixed;
      top: 0;
   }
}

.drawer-bg {
   background: #000;
   opacity: 0.3;
   width: 100%;
   top: 0;
   height: 100%;
   position: absolute;
   z-index: 999;
}

.main-container {
   position: relative;
   min-height: 100%;
   transition: margin-left 0.28s;
   margin-left: @sidebar-width;
   background-color: @bg-color;
}

.fixed-header {
   position: fixed;
   top: 0;
   right: 0;
   z-index: 9;
   width: calc(100% - @sidebar-width);
   transition: width 0.28s;
}

.hideSidebar .fixed-header {
   width: calc(100% - @header-height);
}

.mobile .fixed-header {
   width: 100%;
}
</style>
