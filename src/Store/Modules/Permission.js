import { SET_ROUTES } from "../MutationTypes";
import { ConstantRoutes, MapComponents } from "@/Router/Modules";
import getRouters from "@/Apis/Menu";
import layout from "@/Layout/index.vue";

const permission = {
   state: {
      routes: [],
      addRoutes: []
   },
   mutations: {
      [SET_ROUTES]: (state, routes) => {
         state.addRoutes = routes;
         state.routes = ConstantRoutes.concat(routes).sort((a, b) => {
            return a.order - b.order;
         });
      }
   },
   actions: {
      // 生成路由
      GenerateRoutes({ getters, commit }) {
         return new Promise((resolve) => {
            const isAdmin = getters.userRoles.includes("admin");
            const searchRoute = {
               moduleCode: "search",
               path: "search",
               name: "search",
               meta: { title: "日志检索", icon: "jiansuo", noCache: false },
               children: [
                  {
                     moduleCode: "searchDetail",
                     path: "detail",
                     name: "detail",
                     hidden: true,
                     meta: { title: "日志详情", noCache: true }
                  }
               ]
            };
            const clientRoute = {
               moduleCode: "client",
               path: "client",
               name: "client",
               meta: {
                  title: "客户端管理",
                  icon: "xitongguanli",
                  noCache: true
               }
            };
            const sourceRoute = {
               moduleCode: "source",
               path: "source",
               name: "source",
               meta: { title: "日志源管理", icon: "rizhiyuan", noCache: true }
            };
            const loggerRoute = {
               order: 3,
               level: 1,
               moduleCode: "logger",
               path: "/logger",
               redirect: "search",
               meta: {
                  title: "日志平台"
               },
               children: isAdmin
                  ? [searchRoute, clientRoute, sourceRoute]
                  : [searchRoute]
            };
            const configRoute = {
               order: 4,
               moduleCode: "config",
               path: "/config",
               level: 1,
               redirect: "host",
               meta: {
                  title: "配置管理"
               },
               children: [
                  {
                     moduleCode: "host",
                     path: "host",
                     name: "host",
                     meta: { title: "主机配置", icon: "zhuji1", noCache: true }
                  }
               ]
            };
            const routeList = isAdmin
               ? [loggerRoute, configRoute]
               : [loggerRoute];
            const accessedRoutes = filterAsyncRouter(routeList) || [];

            commit(SET_ROUTES, JSON.parse(JSON.stringify(accessedRoutes)));
            resolve(accessedRoutes);
            // 向后端请求路由数据
            // getRouters().then(res => {
            //    const accessedRoutes = filterAsyncRouter(res.data)
            //    accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
            //    commit(SET_ROUTES, accessedRoutes)
            //    resolve(accessedRoutes)
            // })
         });
      },
      DeleteAllPermissionRoutes({ commit }) {
         commit(SET_ROUTES, []);
      }
   },
   getters: {
      permissionRoutes: (state) => state.routes.slice(),
      addRoutes: (state) => state.addRoutes
   }
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
   return asyncRouterMap.filter((route) => {
      if (route.moduleCode) {
         if (route.level === 1) {
            route.component = layout;
         } else {
            route.component = loadView(route.moduleCode);
         }
      }

      if (route.children != null && route.children && route.children.length) {
         route.children = filterAsyncRouter(route.children);
      }

      return true;
   });
}

export const loadView = (moduleCode) => {
   // 路由懒加载
   return MapComponents[moduleCode];
};

export { permission };
