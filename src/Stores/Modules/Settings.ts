/*
 * @Description  : setting
 * @Author       : 王占领
 * @Date         : 2022-02-23 16:20:13
 * @LastEditTime: 2022-12-29 11:20:14
 * @LastEditors: 王占领
 */
import { defineStore } from "pinia";
import { SETTING_STORE_KEY } from "../StoreKeys";
import defaultSettings from "@/Settings.js";

const StorageKey = "layout-setting";

const storageSetting = localStorage.getItem(StorageKey)
   ? JSON.parse(localStorage.getItem(StorageKey)!)
   : {};

const makeState = () => ({
   theme: storageSetting.theme || defaultSettings.theme,
   sideTheme: storageSetting.sideTheme || "",
   tagsView: storageSetting.tagsView ?? defaultSettings.tagsView,
   fixedHeader:
      storageSetting.fixedHeader === undefined ||
      storageSetting.fixedHeader !== defaultSettings.fixedHeader
         ? defaultSettings.fixedHeader
         : storageSetting.fixedHeader
});

export const useSettingStore = defineStore(SETTING_STORE_KEY, {
   state: makeState,
   actions: {
      changeSetting(data: {
         key: "theme" | "sideTheme" | "fixedHeader";
         value: string;
      }) {
         if (Object.prototype.hasOwnProperty.call(this, data.key)) {
            this[data.key] = data.value;

            localStorage.setItem(StorageKey, JSON.stringify(this.$state));
         }
      },
      resetSetting() {
         const tmp = makeState();

         this.theme = tmp.theme;
         this.sideTheme = tmp.sideTheme;
         this.tagsView = tmp.tagsView;
         this.fixedHeader = tmp.fixedHeader;
      }
   },
   getters: {
      currentTheme: (state) => state.theme,
      showTagsView: (state) => state.tagsView,
      isFixedHeader: (state) => state.fixedHeader
   }
});
