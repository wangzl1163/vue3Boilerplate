/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime : 2022-03-07 13:40:48
 * @LastEditors  : 王占领
 */
import hasRole from "./HasRole";
import hasPermi from "./HasPermi";

const install = function (app) {
   app.directive("hasRole", hasRole);
   app.directive("hasPermi", hasPermi);
};

export default install;
