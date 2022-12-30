/*
 * @Description: 生成枚举
 * @Author: 王占领
 * @Date: 2022-10-08 15:13:02
 * @LastEditTime: 2022-11-28 19:37:16
 * @LastEditors: 王占领
 */
import type { SimpleObj } from "@/Typings/Common";

type DefaultListKey = "list";
type DefaultEnumKey = "status";
type List = () => { value: string | number; label: string }[];
type EnumData<T extends string, U = SimpleObj> = {
   [p in T | DefaultListKey]: p extends DefaultListKey ? List : U;
};

const key: DefaultEnumKey = "status";

export function useMakeEnum<ReturnObjKey extends string = DefaultEnumKey>(
   enumObj: SimpleObj,
   enumKey: ReturnObjKey | DefaultEnumKey = key
): EnumData<ReturnObjKey | DefaultEnumKey> {
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

   return {
      [enumKey]: enumObj,
      list
   } as EnumData<ReturnObjKey | DefaultEnumKey>;
}
