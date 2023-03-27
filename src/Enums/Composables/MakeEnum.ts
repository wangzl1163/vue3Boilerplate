/*
 * @Description: 生成枚举
 * @Author: 王占领
 * @Date: 2022-10-08 15:13:02
 * @LastEditTime: 2023-01-17 16:19:40
 * @LastEditors: 王占领
 */
// 把对象类型映射为拥有原对象的属性和以原属性的值作为属性名原属性名作为值的新属性的对象
type OvonicObj<T> = {
   [p in keyof T | T[keyof T]]: p extends keyof T
      ? T[p]
      : keyof { [k in keyof T as T[k] extends p ? k : never]: T[k] };
};

type DefaultListKey = "list";

type List = () => { value: string | number; label: string }[];
type EnumData<T extends string, U> = {
   [p in T | DefaultListKey]: p extends DefaultListKey ? List : U;
};

export function useMakeEnum<T, ReturnObjKey extends string>(
   enumObj: T,
   enumKey: ReturnObjKey
): EnumData<ReturnObjKey, OvonicObj<T>> {
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
        }, {});

   return {
      [enumKey]: mapObj,
      list
   };
}
