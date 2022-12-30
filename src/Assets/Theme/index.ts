/*
 * @Description: 主题
 * @Author: 王占领
 * @Date: 2022-11-17 10:18:55
 * @LastEditTime: 2022-12-29 17:14:49
 * @LastEditors: 王占领
 */

import { useSettingStore } from "@/Stores";
import maps from "./ThemeMaps";

function setTheme(theme: string = useSettingStore().currentTheme) {
   const store = useSettingStore();
   // let link = document.getElementById("theme-link") as HTMLLinkElement;
   // const href = "/static/theme/" + theme + ".css";

   // if (!link) {
   //    link = document.createElement("link");
   //    link.id = "theme-link";
   //    link.rel = "stylesheet";
   //    link.href = href;

   //    const head = document.querySelector("head")!;
   //    head.appendChild(link);
   // } else {
   //    link.href = href;
   // }

   // document.documentElement.className = theme;

   Object.keys(maps[theme]).forEach((key) => {
      document.documentElement.style.setProperty(
         "--" + key,
         maps[theme][key] as string
      );
   });

   store.changeSetting({ key: "theme", value: theme });
}

function initTheme() {
   const theme = useSettingStore().currentTheme;
   if (theme) {
      return setTheme(theme);
   }

   setTheme();
}

const styleVars = () => {
   const theme = useSettingStore().currentTheme;
   return {
      menuText: maps[theme]["color-white-85"],
      menuActiveText: maps[theme]["color-white"],
      subMenuActiveText: maps[theme]["color-white"],
      menuBg: "transparent",
      menuHover: "rgba(0, 97, 194, 0.4)",
      subMenuBg: "transparent",
      subMenuHover: "rgba(0, 95, 193, 0.2)",
      sideBarWidth: "100%",
      subMenuActiveBg: maps[theme]["color-primary"],
      textColorPrimary: maps[theme]["text-color-primary"],
      textColorRegular: maps[theme]["text-color-regular"],
      textColorSecondary: maps[theme]["text-color-secondary"],
      colorBlack: maps[theme]["color-black"],
      colorWhite: maps[theme]["color-white"],
      colorWhite85: maps[theme]["color-white-85"],
      colorPrimary: maps[theme]["color-primary"],
      colorDanger: maps[theme]["color-danger"],
      colorSuccess: maps[theme]["color-success"],
      fontFamily: maps[theme]["font-family"],
      gutter: maps[theme]["gutter"],
      maskColor: maps[theme]["mask-color"],
      chartBgColor: maps[theme]["chart-bg-color"],
      axisLineColor: maps[theme]["axis-line-color"],
      splitLineColor: maps[theme]["split-line-color"],
      axisTickColor: maps[theme]["axis-tick-color"],
      legendTextColor: maps[theme]["text-color-legend"],
      dataZoomBackgroundColor: maps[theme]["data-zoom-bg-color"],
      dataZoomBorderColor: maps[theme]["data-zoom-border-color"],
      dataZoomMoveHandleColor: maps[theme]["data-zoom-move-handle-color"],
      iconDisabledColor: maps[theme]["icon-color-disabled"],
      iconSecondaryColor: maps[theme]["icon-color-secondary"]
   };
};

export { initTheme, setTheme, styleVars };
