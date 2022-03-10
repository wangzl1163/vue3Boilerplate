/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime : 2022-03-07 13:31:22
 * @LastEditors  : 王占领
 */
/**
 * 操作权限处理
 */

import store from "@/Store";

export default {
   mounted(el, binding) {
      const { value } = binding;
      const allPermission = "*:*:*";
      const permissions = store.getters && store.getters.permissions;

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
