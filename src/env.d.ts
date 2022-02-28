/*
 * @Description: 
 * @Author: 王占领
 * @Date: 2022-02-18 09:52:06
 * @LastEditTime: 2022-02-18 15:58:52
 * @LastEditors: 王占领
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
