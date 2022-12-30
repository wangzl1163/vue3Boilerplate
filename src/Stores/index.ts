/*
 * @Description  : store
 * @Author       : 王占领
 * @Date         : 2022-02-22 10:08:13
 * @LastEditTime: 2022-12-26 14:24:48
 * @LastEditors: 王占领
 */
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { encryption, decryption } from "../Utils/AES";

import type { StateTree } from "pinia";

const isDevelopment = process.env.NODE_ENV !== "production";
const enc = isDevelopment
   ? (val: StateTree) => JSON.stringify(val)
   : encryption;
const dec = isDevelopment ? (val: string) => JSON.parse(val) : decryption;

const pinia = createPinia();
// 全局配置 pinia-plugin-persistedstate 的 persist 选项
pinia.use(({ options }) => {
   options.persist = true;
});
pinia.use(
   createPersistedState({
      storage: sessionStorage,
      serializer: {
         serialize(value) {
            return enc(value);
         },
         deserialize(value) {
            return dec(value);
         }
      }
   })
);

export default pinia;
export * from "./Modules/App";
export * from "./Modules/Permission";
export * from "./Modules/Settings";
export * from "./Modules/TagsView";
export * from "./Modules/Token";
export * from "./Modules/User";
