import request from "@/Utils/HttpRequest";
import { useTokenStore } from "@/Stores";

import type { MenuInfo } from "@/Typings/MenuInfo";

export default function getRouters() {
   return request.get(
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
