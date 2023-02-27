/*
 * @Description: 生成静态资源的 url
 * @Author: 王占领
 * @Date: 2023-02-13 16:26:55
 * @LastEditTime: 2023-02-23 11:07:55
 * @LastEditors: 王占领
 */
export function useStaticUrl() {
   return (
      name: string,
      {
         path = "Images",
         type = "png"
      }: { path?: string; type?: "png" | "gif" | "mp4" } = {}
   ) => {
      return new URL(`../Assets/${path}/${name}.${type}`, import.meta.url).href;
   };
}
