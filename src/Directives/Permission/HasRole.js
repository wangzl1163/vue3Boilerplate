/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime : 2022-03-07 13:30:32
 * @LastEditors  : 王占领
 */
/**
 * 角色权限处理
 */

import store from "@/Store";

export default {
   mounted(el, binding) {
      const { value } = binding;
      const superAdmin = "admin";
      const roles = store.getters && store.getters.userRoles;

      if (value && value instanceof Array && value.length > 0) {
         const roleFlag = value;

         const hasRole = roles.some((role) => {
            return superAdmin === role || roleFlag.includes(role);
         });

         if (!hasRole) {
            el.parentNode && el.parentNode.removeChild(el);
         }
      } else {
         throw new Error(`请设置角色权限标签值"`);
      }
   }
};
