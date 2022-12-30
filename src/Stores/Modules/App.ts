/*
 * @Description: app
 * @Author: 王占领
 * @Date: 2022-07-26 14:00:31
 * @LastEditTime: 2022-12-23 17:38:35
 * @LastEditors: 王占领
 */
import { defineStore } from "pinia";
import { APP_STORE_KEY } from "../StoreKeys";
import settings from "@/Settings.js";

export const useAppStore = defineStore(APP_STORE_KEY, {
   state: () => ({
      sidebar: {
         opened: !(
            document.body.getBoundingClientRect().width <=
            settings.sidebarOpenedMinWidth
         ),
         withoutAnimation: false
      },
      device: "desktop"
   }),
   actions: {
      toggleSideBar() {
         this.sidebar.opened = !this.sidebar.opened;
         this.sidebar.withoutAnimation = false;
      },
      closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
         this.sidebar.opened = false;
         this.sidebar.withoutAnimation = withoutAnimation;
      },
      toggleDevice(device: string) {
         this.device = device;
      },
      resetSidebar() {
         this.sidebar.opened = !(
            document.body.getBoundingClientRect().width <=
            settings.sidebarOpenedMinWidth
         );
         this.sidebar.withoutAnimation = false;
      }
   }
});
