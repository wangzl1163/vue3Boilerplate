<!--
 * @Description  : 
 * @Author       : 王占领
 * @Date         : 2022-02-25 13:56:40
 * @LastEditTime: 2022-12-29 17:04:39
 * @LastEditors: 王占领
-->
<template>
   <div :class="{ 'has-logo': true }">
      <logo :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
         <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :unique-opened="true"
            :collapse-transition="false"
            mode="vertical"
         >
            <sidebar-item
               v-for="(route, index) in permissionRoutes"
               :key="route.path + index"
               :item="route"
               :base-path="route.path"
            />
         </el-menu>
      </el-scrollbar>
   </div>
</template>

<script>
import { mapState } from "pinia";
import { usePermissionStore, useAppStore } from "@/Stores";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import { styleVars } from "@/Assets/Theme";

export default {
   name: "Sidebar",
   components: { SidebarItem, Logo },
   computed: {
      ...mapState(useAppStore, ["sidebar"]),
      ...mapState(usePermissionStore, ["permissionRoutes"]),
      activeMenu() {
         const route = this.$route;
         const { meta, path } = route;
         // if set path, the sidebar will highlight the path you set
         if (meta.activeMenu) {
            return meta.activeMenu;
         }
         return path;
      },
      variables() {
         return styleVars();
      },
      isCollapse() {
         return !this.sidebar.opened;
      }
   }
};
</script>
