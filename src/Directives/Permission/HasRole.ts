/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-07 13:16:23
 * @LastEditTime: 2022-12-23 14:26:18
 * @LastEditors: 王占领
 */
/**
 * 角色权限处理
 */

import { useUserStore } from "@/Stores";

export default {
   mounted(el: HTMLElement, binding: { value: string[] }) {
      const { value } = binding;
      const superAdmin = "admin";
      const roles = useUserStore().userRoles;

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
