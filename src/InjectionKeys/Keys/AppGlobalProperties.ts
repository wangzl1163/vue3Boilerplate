/*
 * @Description: app config globalProperties
 * @Author: 王占领
 * @Date: 2022-12-28 14:36:17
 * @LastEditTime: 2022-12-28 14:38:58
 * @LastEditors: 王占领
 */
import type { InjectionKey, ComponentCustomProperties } from "vue";

export const globalProperties = Symbol(
   "globalProperties"
) as InjectionKey<ComponentCustomProperties>;
