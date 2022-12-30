/*
 * @Description  : 常量路由
 * @Author       : 王占领
 * @Date         : 2022-02-22 10:59:32
 * @LastEditTime: 2022-12-30 10:49:09
 * @LastEditors: 王占领
 */

import type { RouteRecordRaw } from "vue-router";

const constantRoutes = [
   {
      order: -1,
      path: "/login",
      name: "login",
      hidden: true,
      component: () => import("@/Views/Login/index.vue"),
      meta: {
         title: "登录"
      }
   },
   {
      order: -1,
      path: "/profile",
      name: "profile",
      hidden: true,
      redirect: "/profile/user",
      component: () => import("@/Layout/index.vue"),
      children: [
         {
            path: "user",
            name: "user",
            component: () => import("@/Views/User/index.vue"),
            meta: {
               title: "个人中心"
            }
         }
      ]
   },
   {
      order: -1,
      path: "/403",
      name: "403",
      hidden: true,
      component: () => import("@/Views/Error/403.vue"),
      meta: {
         title: "没有权限"
      }
   },
   {
      order: -1,
      path: "/500",
      name: "500",
      hidden: true,
      component: () => import("@/Views/Error/500.vue"),
      meta: {
         title: "服务器错误"
      }
   }
] as RouteRecordRaw[];

export default constantRoutes;
