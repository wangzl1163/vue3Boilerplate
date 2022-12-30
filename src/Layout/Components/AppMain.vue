<!--
 * @Description  : app main
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime: 2022-12-23 16:16:47
 * @LastEditors: 王占领
-->
<template>
   <section class="app-main">
      <router-view v-slot="{ Component }">
         <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
               <component :is="Component" :key="key"></component>
            </keep-alive>
         </transition>
      </router-view>
   </section>
</template>

<script>
import { mapState } from "pinia";
import { useTagsViewStore } from "@/Stores";

export default {
   name: "AppMain",
   computed: {
      ...mapState(useTagsViewStore, ["cachedViews"]),
      key() {
         return this.$route.path;
      }
   }
};
</script>

<style lang="less" scoped>
@import "@/Assets/Style/Variables.less";
.app-main {
   height: calc(100vh - 48px);
   width: 100%;
   position: relative;
   overflow: auto;
   padding: 20px;
   background-color: @bg-color;
}

.fixed-header + .app-main {
   padding-top: 68px;
   height: 100vh;
}

.hasTagsView {
   .app-main {
      /* 82 = navbar + tags-view = 4 + 34 */
      min-height: calc(100vh - 82px);
   }

   .fixed-header + .app-main {
      padding-top: 82px;
   }
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
   .fixed-header {
      padding-right: 15px;
   }
}
</style>
