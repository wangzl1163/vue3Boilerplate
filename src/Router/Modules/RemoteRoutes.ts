/*
 * @Description: 用于匹配后端返回的菜单
 * @Author: 王占领
 * @Date: 2022-12-21 11:15:21
 * @LastEditTime: 2022-12-28 15:49:00
 * @LastEditors: 王占领
 */
import type { RouteRecordRaw } from "vue-router";

export const RemoteRoutes: RouteRecordRaw[] = [
   {
      order: 1,
      path: "/",
      name: "index",
      level: 1,
      redirect: "/home",
      component: () => import("@/Layout/index.vue"),
      meta: {
         title: "首页",
         icon: "overview"
      },
      children: [
         {
            path: "home",
            name: "home",
            component: () => import("@/Views/Home/index.vue"),
            meta: {
               title: "首页",
               noCache: true,
               breadcrumb: false,
               activeMenu: "/home"
            }
         }
      ]
   }
];
