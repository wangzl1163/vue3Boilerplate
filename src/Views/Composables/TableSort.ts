/*
 * @Description:
 * @Author: 王占领
 * @Date: 2023-01-11 15:19:21
 * @LastEditTime: 2023-01-11 15:36:11
 * @LastEditors: 王占领
 */

import type { SimpleObj } from "@/Typings/Common";

export function useSort() {
   const datetimeSort = (key: string) => (v1: SimpleObj, v2: SimpleObj) => {
      const tmp1 = new Date(v1[key]).getTime();
      const tmp2 = new Date(v2[key]).getTime();

      if (tmp1 > tmp2) {
         return -1;
      }

      if (tmp1 < tmp2) {
         return 1;
      }

      return 0;
   };

   return {
      datetimeSort
   };
}
