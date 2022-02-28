/*
 * @Description  : 常量路由
 * @Author       : 王占领
 * @Date         : 2022-02-22 10:59:32
 * @LastEditTime : 2022-02-25 14:33:39
 * @LastEditors  : 王占领
 */
export default [
	{
      path: '/login',
      hidden: true,
      component: () => import(/* webpackChunkName: "login" */ '@/Views/Login/index.vue'),
      meta: {
         title: '登录'
      }
   },
   {
      path: '/',
      level: 1,
      redirect: 'index',
      component: () => import('@/Layout/index.vue'),
      children: [
         {
            path: 'index',
            component: () => import(/* webpackChunkName: "home" */ '@/Views/Home/index.vue'),
            name: '首页',
            meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
         }
      ]
   },
   {
      path: '/profile',
      hidden: true,
      redirect: 'user',
      children: [
         {
            path: '/user',
            name: 'user',
            component: () => import(/* webpackChunkName: "profile" */ '@/Views/User'),
            meta: {
               title: '个人中心'
            }
         }
      ]
   },
   {
      path: '/403',
      hidden: true,
      component: () => import(/* webpackChunkName: "page403" */ '@/Views/SystemPages/403.vue'),
      meta: {
         title: '没有权限'
      }
   },
   {
      path: '/500',
      hidden: true,
      component: () => import(/* webpackChunkName: "page500" */ '@/Views/SystemPages/500.vue'),
      meta: {
         title: '服务器错误'
      }
   },
   {
      path: '/:pathMatch(.*)*',
      hidden: true,
      component: () => import(/* webpackChunkName: "page404" */ '@/Views/SystemPages/404.vue'),
      meta: {
         title: '页面不存在'
      }
   }
]