import { defineStore } from "pinia";
import md5 from "crypto-js/md5";
import { JSEncrypt } from "jsencrypt";
import router from "@/Router";
import { USER_STORE_KEY } from "../StoreKeys";
import { login, logout, getUserInfo, getToken } from "@/Apis/Login";
import avatar from "@/Assets/Images/Avatar.png";
import { useTokenStore } from "./Token";
import { usePermissionStore } from "./Permission";
import { useAppStore } from "./App";
import { useSettingStore } from "./Settings";

type UserInfo = {
   username: string;
   password: string;
};

export const useUserStore = defineStore(USER_STORE_KEY, {
   state: () => ({
      isAdmin: false,
      name: "",
      avatar,
      roles: [] as string[],
      permissions: [],
      authType: "",
      userInfo: null as null | Record<string, string | string[]>
   }),
   actions: {
      // 登录
      doLogin(userInfo: UserInfo) {
         const username = userInfo.username.trim();
         const password = userInfo.password;

         return new Promise((resolve, reject) => {
            const isAdmin = username === "admin";
            let data: Record<string, string | false> = {
               uyh: username,
               umy: md5(password).toString()
            };

            if (!isAdmin) {
               const encrypt = new JSEncrypt();
               encrypt.setPublicKey(
                  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDt30AcO8CSAfzSa5L8ikVrfehH6aFw9KyL85NzOAduOfnPcbiAGLjLWEKOkOhkYrlSAfU5s+pa3OQTsgpfCkVVm56dEQh8sajIR4uyGbhv0/CdvPTZS5o3sP6Yi9TemWZ443+QNjajN6MSCTmTY86ZoR9jmTcJtV4kNTQWDov6qQIDAQAB"
               );

               data = {
                  account: username,
                  password: encrypt.encrypt(password)
               };
            }

            this.isAdmin = isAdmin;

            login(data, isAdmin)
               .then((res) => {
                  console.log("----- login res: ", res);

                  const tokenStore = useTokenStore();
                  const result = isAdmin
                     ? tokenStore.storeToken(res.message.token)
                     : getToken("1567055194267410433", res.data.code).then(
                          (res) => {
                             return tokenStore.storeToken(res.data);
                          }
                       );
                  result
                     .then(() => {
                        return this.getUserInfo();
                     })
                     .then(() => {
                        return usePermissionStore().generateRoutes();
                     })
                     .then(() => {
                        resolve(undefined);
                     });
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },
      // 获取用户信息
      getUserInfo() {
         return new Promise((resolve, reject) => {
            getUserInfo()
               .then((res) => {
                  let avatar = this.avatar;

                  if (!this.isAdmin) {
                     this.roles = res.data.funcCodes as string[];
                     this.permissions = [];
                     this.authType = "union_auth";
                     this.name = res.data.name as string;
                     this.avatar = avatar;
                     this.userInfo = res.data;
                  } else {
                     const userInfo = res.message.user_info as unknown as {
                        alias_name: string;
                     };

                     avatar = !res.message.avatar
                        ? this.avatar
                        : res.message.avatar;
                     this.roles = [res.message.UserType];
                     this.authType = "union_auth";
                     this.name = userInfo
                        ? userInfo.alias_name
                        : res.message.Username;
                     this.avatar = avatar;
                     this.userInfo = userInfo || {};
                  }

                  resolve(res);
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },
      // 退出系统
      logOut() {
         return new Promise((resolve, reject) => {
            logout()
               .then(() => {
                  this.reset();
                  resolve(undefined);
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },
      // 前端 登出
      fedLogOut() {
         return new Promise((resolve) => {
            const tokenStore = useTokenStore();
            tokenStore.storeToken("");
            this.name = "";

            resolve(undefined);
         });
      },

      // reset
      reset() {
         const tokenStore = useTokenStore();
         const permissionStore = usePermissionStore();
         const appStore = useAppStore();
         const settingStore = useSettingStore();

         tokenStore.storeToken("");
         this.roles = [];
         this.permissions = [];
         this.authType = "";
         this.name = "";
         this.avatar = avatar;
         this.userInfo = null;

         // 重置路由
         router.getRoutes().forEach((r) => {
            router.removeRoute(r.name!);
         });
         permissionStore.resetPermissionRoutes();
         permissionStore.permissionRoutes.forEach((pr) => {
            router.addRoute(pr);
         });

         appStore.resetSidebar();
         settingStore.resetSetting();

         return Promise.resolve();
      }
   },
   getters: {
      currentAvatar: (state) => state.avatar,
      userName: (state) => state.name,
      userRoles: (state) => state.roles,
      // 统一SaaS登陆以及用户admin登录不显示个人信息
      isShowProfile: (state) =>
         state.authType !== "union_auth" && state.name !== "admin",
      userInfos: (state) => ({
         ...state.userInfo,
         create_at: (state.userInfo?.create_at as string)?.split("T")?.[0] ?? ""
      }),
      account: (state) =>
         state.isAdmin ? state.name : state.userInfo?.loginAccount
   }
});
