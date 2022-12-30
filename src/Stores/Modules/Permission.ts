/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-02-23 16:20:13
 * @LastEditTime: 2022-12-30 10:50:06
 * @LastEditors: 王占领
 */

import { defineStore } from "pinia";
import { PERMISSION_STORE_KEY } from "../StoreKeys";
import { ConstantRoutes, RemoteRoutes } from "@/Router";
import getRouters from "@/Apis/Menu";
import { useUserStore } from "./User";

import type { RouteRecordRaw } from "vue-router";
import type { MenuInfo } from "@/Typings/MenuInfo";

export const usePermissionStore = defineStore(PERMISSION_STORE_KEY, {
   state: () => ({
      routes: [] as RouteRecordRaw[],
      addRoutes: [] as RouteRecordRaw[]
   }),
   actions: {
      // 生成路由
      generateRoutes() {
         return new Promise<RouteRecordRaw[]>((resolve) => {
            const userStore = useUserStore();
            const isAdmin = userStore.isAdmin;
            let accessRoutes: RouteRecordRaw[] = [
               {
                  order: -1,
                  path: "/:pathMatch(.*)*",
                  name: "404",
                  hidden: true,
                  component: () => import("@/Views/Error/404.vue"),
                  meta: {
                     title: "页面不存在"
                  }
               }
            ];

            if (isAdmin) {
               this.setRoutes(accessRoutes.concat(RemoteRoutes));

               return resolve(accessRoutes.concat(RemoteRoutes));
            } else {
               // 向后端请求路由数据
               return getRouters().then((res) => {
                  accessRoutes = (
                     convertToRouter(res.data, RemoteRoutes) || []
                  ).concat(accessRoutes);
                  this.setRoutes(accessRoutes);

                  return resolve(accessRoutes);
               });
            }
         });
      },
      setRoutes(routes: RouteRecordRaw[]) {
         this.addRoutes = routes;
         this.routes = (ConstantRoutes as RouteRecordRaw[])
            .concat(routes)
            .sort((a, b) => {
               return a.order! - b.order!;
            });
      },
      resetPermissionRoutes() {
         this.setRoutes([]);
      }
   },
   getters: {
      permissionRoutes: (state) =>
         convertToRouter(
            state.routes.slice() as unknown as MenuInfo[],
            (RemoteRoutes as RouteRecordRaw[]).concat(ConstantRoutes).concat([
               {
                  order: -1,
                  path: "/:pathMatch(.*)*",
                  name: "404",
                  hidden: true,
                  component: () => import("@/Views/Error/404.vue"),
                  meta: {
                     title: "页面不存在"
                  }
               }
            ])
         )
   }
});

// 遍历后台传来的路由字符串，转换为组件对象
function convertToRouter(asyncRouterMap: MenuInfo[], routes: RouteRecordRaw[]) {
   return asyncRouterMap.reduce<RouteRecordRaw[]>((pre, item) => {
      const r = routes.find(
         (fr) =>
            (fr.name === item.code && fr.path === item.url) ||
            fr.name === item.name
      );

      r &&
         pre.push({
            ...r,
            ...(item.children?.length && {
               children: convertToRouter(item.children, r.children!)
            })
         } as RouteRecordRaw);

      return pre;
   }, []);
}
