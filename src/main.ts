/*
 * @Description  :  app 入口
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:12
 * @LastEditTime: 2022-12-30 10:24:30
 * @LastEditors: 王占领
 */
import { createApp, createVNode } from "vue";
import ElementPlus, { ElMessageBox } from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElIcons from "@element-plus/icons-vue";
import BigElement from "big-element";
import "big-element/packages/Theme/index.css";
import { BeEcharts } from "big-element/packages/Components/ECharts";
import "big-element/packages/Theme/Components/ECharts.css";
import moment from "moment";
import Stores from "./Stores";
import Router from "./Router";
import Components, { SvgIcon } from "./Components";
import PermissionDirectives from "./Directives/Permission/index";
import { initTheme, styleVars } from "./Assets/Theme";
import { globalProperties } from "./InjectionKeys";
import App from "./App.vue";
import "./Permission";
import "text-security/text-security-disc.css";
import "virtual:svg-icons-register";

import type { AppContext } from "vue";
import type {
   ElMessageBoxOptions,
   ElMessageBoxShortcutMethod
} from "element-plus";

// 全局注册 moment 语言包
moment.locale("zh-cn");

const app = createApp(App);

// 注册 element-plus 图标组件
Object.entries(ElIcons).forEach((elIcon) => {
   app.component(elIcon[0], elIcon[1]);
});

app.use(ElementPlus, { locale: zhCn, zIndex: 2000 });
app.use(BigElement);
app.use(Stores);
app.use(Router);
app.use(Components);
app.use(BeEcharts);
app.use(PermissionDirectives);
app.mount("#app");

// 设置 echarts loading 动画 option
app.provide("ecLoadingOptions", {
   textColor: styleVars().textColorRegular,
   maskColor: styleVars().maskColor
});

app.config.globalProperties.$styleVars = styleVars();
app.config.globalProperties.$confirm = ((
   message: ElMessageBoxOptions["message"],
   options?: ElMessageBoxOptions,
   appContext?: AppContext | null
) => {
   return ElMessageBox.confirm(
      message,
      {
         title: "警告",
         ...options,
         customClass:
            (options?.customClass ?? "") +
            " confirm-box confirm-box--" +
            options?.type,
         icon: createVNode(SvgIcon, { icon: "information" }),
         customStyle: {
            width: "520px",
            ...options?.customStyle
         }
      },
      appContext
   );
}) as ElMessageBoxShortcutMethod;

app.provide(globalProperties, app.config.globalProperties);

initTheme();
