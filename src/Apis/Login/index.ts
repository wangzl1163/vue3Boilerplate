/*
 * @Description: 登录 api
 * @Author: 王占领
 * @Date: 2022-05-07 17:30:46
 * @LastEditTime: 2022-12-29 13:49:02
 * @LastEditors: 王占领
 */
import request from "@/Utils/HttpRequest";
import { useUserStore, useTokenStore } from "@/Stores";

function login(params: Record<string, string | false>, isAdmin: boolean) {
   return request.$post<
      {
         message: Record<string, string>;
         data: Record<string, string>;
      },
      null
   >(isAdmin ? "/login" : "/auth/accessCode", params, {
      baseURL: isAdmin ? "/cdsi/api/v1" : "/permission/login"
   });
}

function getToken(clientId: string, code: string) {
   return request.$post<{ data: string }, null>(
      `/sso/loginByApp?clientId=${clientId}&code=${code}`,
      {},
      { baseURL: "/permission/login" }
   );
}

function logout() {
   return request.$get("/logout");
}

function getUserInfo() {
   const userStore = useUserStore();
   const tokenStore = useTokenStore();

   return request.$get<
      {
         message: Record<string, string>;
         data: Record<string, string[] | string>;
      },
      null
   >(
      userStore.isAdmin ? "/login/auth" : "/system/getUserInfo",
      {},
      {
         baseURL: userStore.isAdmin ? "/cdsi/api/v1" : "/permission/sys",
         headers: { Authorization: tokenStore.token }
      }
   );
}

function getCodeImg(params: string) {
   return request.$get("");
}

export { login, logout, getUserInfo, getCodeImg, getToken };
