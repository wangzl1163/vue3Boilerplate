/*
 * @Description: use global
 * @Author: 王占领
 * @Date: 2021-09-15 14:58:17
 * @LastEditTime: 2022-12-28 14:46:18
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\client\src\composables\useGlobal.js
 */

import { inject } from "vue";
import { globalProperties } from "@/InjectionKeys";

export function useGlobal(key = globalProperties) {
   return inject(key)!;
}
