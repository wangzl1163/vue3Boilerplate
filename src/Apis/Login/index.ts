import request from "@/Utils/HttpRequest";
import { useUserStore, useTokenStore } from "@/Stores";

function login(params: Record<string, string | false>, isAdmin: boolean) {
   return request.post(isAdmin ? "/login" : "/auth/accessCode", params, {
      baseURL: isAdmin ? "/cdsi/api/v1" : "/permission/login"
   });
}

function getToken(clientId: string, code: string) {
   return request.post(
      `/sso/loginByApp?clientId=${clientId}&code=${code}`,
      {},
      { baseURL: "/permission/login" }
   );
}

function logout() {
   return request.get("/logout");
}

function getUserInfo() {
   const userStore = useUserStore();
   const tokenStore = useTokenStore();

   return request.get(
      userStore.isAdmin ? "/login/auth" : "/system/getUserInfo",
      {},
      {
         baseURL: userStore.isAdmin ? "/cdsi/api/v1" : "/permission/sys",
         headers: { Authorization: tokenStore.token }
      }
   );
}

function getCodeImg(params: string) {
   return request.get("");
}

export { login, logout, getUserInfo, getCodeImg, getToken };
