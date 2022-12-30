/*
 * @Description  : 操作权限处理
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime: 2022-12-23 14:33:17
 * @LastEditors: 王占领
 */

import { useUserStore } from "@/Stores";

export default {
   mounted(el: HTMLElement, binding: { value: string[] }) {
      const { value } = binding;
      const allPermission = "*:*:*";
      const permissions = useUserStore().permissions;

      if (value && value instanceof Array && value.length > 0) {
         const permissionFlag = value;

         const hasPermissions = permissions.some((permission) => {
            return (
               allPermission === permission ||
               permissionFlag.includes(permission)
            );
         });

         if (!hasPermissions) {
            el.parentNode && el.parentNode.removeChild(el);
         }
      } else {
         throw new Error(`请设置操作权限标签值`);
      }
   }
};
