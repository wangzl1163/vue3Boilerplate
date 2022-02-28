/*
 * @Description  : router
 * @Author       : 王占领
 * @Date         : 2022-02-18 16:25:36
 * @LastEditTime : 2022-02-23 18:09:39
 * @LastEditors  : 王占领
 */
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import routes from './Modules';

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router