/*
 * @Description  : 各个功能模块的路由入口
 * @Author       : 王占领
 * @Date         : 2022-02-22 10:58:36
 * @LastEditTime : 2022-02-23 16:54:36
 * @LastEditors  : 王占领
 */
import ConstantRoutes from './ConstantRoutes';

export default [
	...ConstantRoutes
]

export { default as ConstantRoutes } from './ConstantRoutes';
export * from './MapComponents'