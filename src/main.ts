/*
 * @Description  : app 入口
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElIcons from "@element-plus/icons-vue";
import BigElement from "big-element";
import "big-element/packages/Theme/index.css";
import { BeECharts } from "big-element/packages/Components/ECharts";
import "big-element/packages/Theme/Components/ECharts.css";
import Store from "./Store";
import Router from "./Router";
import Components from "./Components";
import "virtual:svg-icons-register";
import "./Permission";
import PermissionDirectives from "./Directives/Permission/index";
import App from "./App.vue";

const app = createApp(App);

// 注册 element-plus 图标组件
Object.entries(ElIcons).forEach((elIcon) => {
   app.component(elIcon[0], elIcon[1]);
});

app.use(ElementPlus, { locale: zhCn });
app.use(BigElement);
app.use(Store);
app.use(Router);
app.use(Components);
app.use(BeECharts);
app.use(PermissionDirectives);
app.mount("#app");
