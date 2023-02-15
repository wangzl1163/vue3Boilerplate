/*
 * @Description: 生成枚举
 * @Author: 王占领
 * @Date: 2022-10-08 15:13:02
 * @LastEditTime: 2023-01-17 16:19:40
 * @LastEditors: 王占领
 */
import type { SimpleObj } from "@/Typings/Common";

type DefaultListKey = "list";

type List = () => { value: string | number; label: string }[];
type EnumData<T extends string, U = SimpleObj> = {
   [p in T | DefaultListKey]: p extends DefaultListKey ? List : U;
};

export function useMakeEnum<ReturnObjKey extends string>(
   enumObj: SimpleObj,
   enumKey: ReturnObjKey
): EnumData<ReturnObjKey> {
   let list: List = function () {
      return Object.entries(enumObj).map((entry) => ({
         value: entry[1] as string | number,
         label: entry[0]
      }));
   };

   const values = Object.values(enumObj);
   if (values.some((val) => ["number"].includes(typeof val))) {
      list = function () {
         return Object.entries(enumObj)
            .filter((en) => en.some((item) => typeof item === "number"))
            .map((entry) => ({
               value: entry[1] as string | number,
               label: entry[0]
            }));
      };
   }

   const mapObj = values.every((val) => typeof val === "number")
      ? enumObj
      : Object.entries(enumObj).reduce((p, c) => {
           p[c[0]] = c[1];
           p[c[1]] = c[0];
           return p;
        }, {} as Record<string, string | number>);

   return {
      [enumKey]: mapObj,
      list
   } as EnumData<ReturnObjKey>;
}
