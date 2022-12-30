/*
 * @Description: token store
 * @Author: 王占领
 * @Date: 2022-12-21 11:15:21
 * @LastEditTime: 2022-12-23 15:24:48
 * @LastEditors: 王占领
 */
import { defineStore } from "pinia";
import { TOKEN_STORE_KEY } from "../StoreKeys";

export const useTokenStore = defineStore(TOKEN_STORE_KEY, {
   state() {
      return {
         token: ""
      };
   },
   actions: {
      async storeToken(token: string) {
         this.token = token;
      }
   }
});
