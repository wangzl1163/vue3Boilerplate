/*
 * @Description: use global
 * @Author: 王占领
 * @Date: 2021-09-15 14:58:17
 * @LastEditTime: 2021-09-15 15:00:26
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\client\src\composables\useGlobal.js
 */

import { inject } from "vue";

export default function useGlobal(key = "globalProperties") {
   return inject(key);
}
