/*
 * @Description: theme map index
 * @Author: 王占领
 * @Date: 2022-12-29 15:30:20
 * @LastEditTime: 2022-12-29 16:35:36
 * @LastEditors: 王占领
 */
import { light } from "./Light";

const common = {
   "font-family":
      '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB","Microsoft YaHei", "微软雅黑", Arial, sans-serif',

   gutter: 12,

   "color-white": "#ffffff",
   "color-white-85": "rgba(255, 255, 255, 0.85)",
   "color-white-60": "rgba(255, 255, 255, 0.6)",
   "color-black": "#000000",
   "border-radius-base": "4px"
};

const maps: Record<string, Record<string, string | number>> = {
   light: { ...common, ...light }
};

export default maps;
