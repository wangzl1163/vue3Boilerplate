/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-02-18 09:52:06
 * @LastEditTime: 2022-12-23 11:13:26
 * @LastEditors: 王占领
 */

/// <reference types="vite/client" />
declare interface ImportMetaEnv {
   //环境变量
   readonly AESKEY: string;
   readonly AESIV: string;
}

declare interface ImportMeta {
   readonly env: ImportMetaEnv;
}

declare module "*.vue" {
   import type { DefineComponent } from "vue";

   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
   const component: DefineComponent<{}, {}, any>;
   export default component;
}

declare module "big-element";
declare module "big-element/packages/Components/ECharts";
