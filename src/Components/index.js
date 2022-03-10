/*
 * @Description  : components 入口
 * @Author       :
 * @Date         : 2022-02-22 13:53:15
 * @LastEditTime : 2022-02-25 14:01:06
 * @LastEditors  :
 */
import SvgIcon from "./SvgIcon/index.vue";
import Page from "./Page/index.vue";

// common组件用于全局注册
const common = {
   SvgIcon,
   Page
};

export default {
   install(app) {
      Object.entries(common).forEach((entry) => {
         app.component(entry[0], entry[1]);
      });
   }
};

// 所有组件
export { SvgIcon, Page };
