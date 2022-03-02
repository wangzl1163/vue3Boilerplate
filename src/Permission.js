import router from "./Router";
import loadingBar from "./Plugins/LoadingBar/Index";
import { ElMessage } from "element-plus";
import store from "./Store";
import settings from "./Settings";

const whiteList = ["/login", "/register"];

/** 配置全局导航守卫--权限验证 */
router.beforeEach(async (to, from, next) => {
   loadingBar.start();

   document.title = to.meta.title
      ? settings.title
      : to.meta.title + settings.titleSuffix;

   // to.query.token && store.dispatch('storeToken', to.query.token);
   // 从saas过来的要覆盖用户信息
   if (to.query.token) {
      store.dispatch("storeToken", to.query.token);
      return store
         .dispatch("GetUserInfo")
         .then(() => {
            return store.dispatch("GenerateRoutes").then((accessRoutes) => {
               // 测试 默认静态页面
               // store.dispatch('generateRoutes', { roles }).then(accessRoutes => {
               // 根据roles权限生成可访问的路由表
               accessRoutes.forEach((route) => {
                  router.addRoute(route); // 动态添加可访问路由表
               });

               return next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
         })
         .catch((err) => {
            return store.dispatch("FedLogOut").then(() => {
               ElMessage.error(err.message || err);
               return next("/login");
            });
         });
   }

   if (store.state.token.token) {
      // 如果未加载用户信息先加载用户信息
      // console.log(JSON.stringify(store.state.user))
      if (!store.state.user.name) {
         // 拉取user_info
         store
            .dispatch("GetUserInfo")
            .then(() => {
               store.dispatch("GenerateRoutes").then((accessRoutes) => {
                  // 测试 默认静态页面
                  // store.dispatch('generateRoutes', { roles }).then(accessRoutes => {
                  // 根据roles权限生成可访问的路由表
                  accessRoutes.forEach((route) => {
                     router.addRoute(route); // 动态添加可访问路由表
                  });

                  next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
               });
            })
            .catch((err) => {
               store.dispatch("FedLogOut").then(() => {
                  ElMessage.error(err.message || err);
                  next("/login");
               });
            });
      } else {
         next();
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
   to.matched.forEach((record) => {
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
