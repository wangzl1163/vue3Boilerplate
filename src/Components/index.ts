/*
 * @Description  : components 入口
 * @Author       :
 * @Date         : 2022-02-22 13:53:15
 * @LastEditTime: 2022-12-28 17:18:32
 * @LastEditors: 王占领
 */

import type { App } from "vue";

import SvgIcon from "./SvgIcon/index.vue";
import Page from "./Page/index.vue";
import BeCirclePlus from "./CirclePlus/index";
import BeRemove from "./Remove/index";
import ShortCut from "./ShortCut/index.vue";
import Card from "./Card/index.vue";
import NodeTitle from "./NodeTitle/index.vue";
import Divider from "./Divider/index.vue";
import SelectTimeRefresh from "./SelectTimeRefresh/index.vue";
import RouterViewWrapper from "./RouterView/index";
import Tag from "./Tag/index.vue";
import LinkButton from "./LinkButton/index.vue";
import DatetimePicker from "./DatetimePicker/index.vue";
import FormWrapper from "./FormWrapper/index.vue";
import CardSelect from "./CardSelect/index.vue";
import Anchor from "./Anchor/index.vue";
import PrimaryPlainButton from "./PrimaryPlainButton/index.vue";
import Collapse from "./Collapse/index.vue";

// common组件用于全局注册
const common = {
   SvgIcon,
   Page,
   BeCirclePlus,
   BeRemove,
   ShortCut,
   Card,
   NodeTitle,
   Divider,
   SelectTimeRefresh,
   Tag,
   LinkButton,
   DatetimePicker,
   FormWrapper,
   CardSelect,
   PrimaryPlainButton
};

export default {
   install(app: App) {
      Object.entries(common).forEach((entry) => {
         app.component(entry[0], entry[1]);
      });
   }
};

// 所有组件
export {
   SvgIcon,
   BeCirclePlus,
   BeRemove,
   ShortCut,
   Card,
   NodeTitle,
   Divider,
   SelectTimeRefresh,
   RouterViewWrapper,
   Tag,
   LinkButton,
   DatetimePicker,
   FormWrapper,
   CardSelect,
   Anchor,
   PrimaryPlainButton,
   Collapse
};
