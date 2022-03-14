/// <reference types="vite/client" />

declare module "*.vue" {
   import type { DefineComponent } from "vue";

   const component: DefineComponent<{}, {}, any>;
   export default component;
}

// 定义 module 防止 ts 编译报错
declare module "big-element";
declare module "big-element/packages/Components/Echarts";
