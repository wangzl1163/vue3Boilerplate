/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime: 2022-12-23 14:33:46
 * @LastEditors: 王占领
 */
import hasRole from "./HasRole";
import hasPermi from "./HasPermi";

import type { App } from "vue";

const install = function (app: App) {
   app.directive("hasRole", hasRole);
   app.directive("hasPermi", hasPermi);
};

export default install;
