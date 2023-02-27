/*
 * @Description: 扩展 vue 实例全局属性
 * @Author: 王占领
 * @Date: 2022-11-30 15:49:39
 * @LastEditTime: 2022-12-28 14:50:43
 * @LastEditors: 王占领
 */
export {};

declare module "vue" {
   export interface ComponentCustomProperties {
      $styleVars: Record<string, string | number>;
   }
}

//扩展 route 相关类型
declare module "vue-router" {
   export interface _RouteRecordBase {
      order?: number;
      hidden?: boolean;
      level?: number;
      alwaysShow?: boolean;
   }
   export interface RouteMeta {
      title: string;
      icon?: string;
      noCache?: boolean;
      breadcrumb?: boolean;
      activeMenu?: string;
   }
}
