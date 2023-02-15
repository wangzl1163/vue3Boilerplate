/*
 * @Description: 生成静态资源的 url
 * @Author: 王占领
 * @Date: 2023-02-13 16:26:55
 * @LastEditTime: 2023-02-13 16:33:48
 * @LastEditors: 王占领
 */
export function useStaticUrl() {
   return (
      name: string,
      option: { path: string; type: "png" | "gif" } = {
         path: "Images",
         type: "png"
      }
   ) => {
      return new URL(
         `../Assets/${option.path}/${name}.${option.type}`,
         import.meta.url
      ).href;
   };
}
