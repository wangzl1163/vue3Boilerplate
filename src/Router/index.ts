/*
 * @Description  : router
 * @Author       : 王占领
 * @Date         : 2022-02-18 16:25:36
 * @LastEditTime: 2022-12-22 17:05:11
 * @LastEditors: 王占领
 */
import { createRouter, createWebHistory } from "vue-router";
import routes from "./Modules";

const router = createRouter({
   history: createWebHistory(),
   routes: routes
});

export * from "./Modules";

export default router;
