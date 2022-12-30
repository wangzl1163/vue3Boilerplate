/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-05-07 17:30:46
 * @LastEditTime: 2022-12-29 14:28:58
 * @LastEditors: 王占领
 */
import request from "@/Utils/HttpRequest";
import { useTokenStore } from "@/Stores";

import type { MenuInfo } from "@/Typings/MenuInfo";

export default function getRouters() {
   return request.$get<{ data: MenuInfo[] }, null>(
      "/func/getMenuList",
      { appCode: "ctfo-bigdata-share" },
      {
         baseURL: "/permission/sys",
         headers: {
            Authorization: useTokenStore().token
         }
      }
   );
}
