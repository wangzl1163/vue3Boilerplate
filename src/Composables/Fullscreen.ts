/*
 * @Description: fullscreen
 * @Author: 王占领
 * @Date: 2022-11-01 15:46:59
 * @LastEditTime: 2022-12-28 17:17:57
 * @LastEditors: 王占领
 */

import { ref } from "vue";
import { useGlobal } from "./Global";

export const useFullscreen = () => {
   const gp = useGlobal();
   const isFullscreen = ref(false);
   const fullscreen = (element: HTMLElement | string) => {
      if (document.fullscreenEnabled) {
         if (document.fullscreenElement) {
            document.exitFullscreen();
         } else {
            const el =
               typeof element === "string"
                  ? document.querySelector(element)
                  : element;
            el!.onfullscreenchange = () => {
               isFullscreen.value = !isFullscreen.value;
            };
            el?.requestFullscreen().catch((err: unknown) => {
               console.log("----- fullscreen error: ", err);
            });
         }
      } else {
         gp.$message.warning(
            "该浏览器版本不支持全屏，请升级浏览器或使用其他浏览器打开。"
         );
      }
   };

   return {
      isFullscreen,
      fullscreen
   };
};
