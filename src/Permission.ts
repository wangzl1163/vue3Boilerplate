/*
 * @Description  : permission
 * @Author       :
 * @Date         : 2022-02-25 14:05:11
 * @LastEditTime: 2022-12-28 17:11:48
 * @LastEditors: 王占领
 */
import router from "./Router";
import loadingBar from "./Plugins/LoadingBar/Index";
import { ElMessage } from "element-plus";
import { useTokenStore, usePermissionStore, useUserStore } from "./Stores";
import settings from "./Settings";

import type { RouteLocationNormalized } from "vue-router";

const whiteList = ["/login", "/register"];

/** 配置全局导航守卫--权限验证 */
router.beforeEach(async (to, from, next) => {
   loadingBar.start();

   document.title = !to.meta.title
      ? settings.title
      : to.meta.title + settings.titleSuffix;

   const tokenStore = useTokenStore();
   const userStore = useUserStore();
   const permissionStore = usePermissionStore();
   // 从saas过来的要覆盖用户信息
   if (to.query.token) {
      tokenStore.storeToken(to.query.token as string);
      return await userStore
         .getUserInfo()
         .then(() => {
            return permissionStore.generateRoutes().then((accessRoutes) => {
               // 根据roles权限生成可访问的路由表
               accessRoutes.forEach((route) => {
                  router.addRoute(route); // 动态添加可访问路由表
               });

               return next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
         })
         .catch((err) => {
            return userStore.fedLogOut().then(() => {
               ElMessage.error(err.message || err);
               return next("/login");
            });
         });
   }

   if (tokenStore.token) {
      // 如果未加载用户信息先加载用户信息
      if (!userStore.name) {
         // 拉取user_info
         await userStore
            .getUserInfo()
            .then(() => {
               return permissionStore.generateRoutes().then((accessRoutes) => {
                  console.log("----- accessRoutes: ", accessRoutes);
                  // 根据roles权限生成可访问的路由表
                  accessRoutes.forEach((route) => {
                     router.addRoute(route); // 动态添加可访问路由表
                  });

                  next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
               });
            })
            .catch(() => {
               return userStore.fedLogOut().then(() => {
                  next("/login");
               });
            });
      } else {
         if (
            router.getRoutes().length < permissionStore.permissionRoutes.length
         ) {
            permissionStore.permissionRoutes.forEach((r) => {
               if (!router.hasRoute(r.name!)) {
                  router.addRoute(r);
               }
            });

            next({ ...to, replace: true });
         } else {
            next();
         }
      }
   } else {
      // 在免登录白名单，直接进入
      if (whiteList.includes(to.path)) {
         return next();
      }

      ElMessage.error("您还没有登录，即将跳转到登录页面");

      await new Promise((resolve) => {
         setTimeout(() => {
            return resolve(next("/login"));
         }, 3000);
      });

      loadingBar.finish();
   }
});

router.afterEach((to) => {
   (to.matched as unknown as RouteLocationNormalized[]).forEach((record) => {
      if (record.path === to.path) {
         if (Object.keys(to.query).length > 0) {
            record.query = to.query;
         }

         if (Object.keys(to.params).length > 0) {
            record.params = to.params;
         }
      }
   });

   loadingBar.finish();
});
