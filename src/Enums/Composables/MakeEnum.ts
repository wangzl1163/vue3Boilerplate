/*
 * @Description: 生成枚举
 */
// 把对象类型映射为拥有原对象的属性和以原属性的值作为属性名原属性名作为值的新属性的对象
type OvonicObj<T extends Record<string, string | number>> = {
   [p in keyof T | T[keyof T]]: p extends keyof T
      ? T[p]
      : keyof { [k in keyof T as T[k] extends p ? k : never]: T[k] };
};

type DefaultListKey = "list";

type List = () => { value: string | number; label: string }[];
type EnumData<T extends string, U> = {
   [p in T | DefaultListKey]: p extends DefaultListKey ? List : U;
};

export function useMakeEnum<
   T extends Record<string, string | number>,
   ReturnObjKey extends string
>(enumObj: T, enumKey: ReturnObjKey): EnumData<ReturnObjKey, OvonicObj<T>> {
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

   const mapObj: Record<string, string | number> = values.every(
      (val) => typeof val === "number"
   )
      ? enumObj
      : Object.entries(enumObj).reduce<Record<string, string | number>>(
           (p, c) => {
              p[c[0]] = c[1];
              p[c[1]] = c[0];
              return p;
           },
           {}
        );

   return {
      [enumKey]: mapObj,
      list
   } as EnumData<ReturnObjKey, OvonicObj<T>>;
}
