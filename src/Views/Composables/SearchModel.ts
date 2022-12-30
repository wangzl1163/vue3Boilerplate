/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-04-29 09:57:58
 * @LastEditTime: 2022-12-28 13:41:21
 * @LastEditors: 王占领
 */
import { reactive } from "vue";
import { SimpleObj } from "@/Typings/Common";

export default function <T extends object | null = null>(
   rest: SimpleObj | undefined = undefined
) {
   const obj = {
      ...rest
   } as unknown as T extends null ? SimpleObj : T;

   return reactive<T extends null ? SimpleObj : T>(obj);
}
