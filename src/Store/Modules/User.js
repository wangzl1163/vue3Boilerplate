import {
   SET_USER_NAME,
   SET_USER_AVATAR,
   SET_ROLES,
   SET_PERMISSIONS,
   SET_AUTH_TYPE,
   SET_USER_INFO
} from "../MutationTypes";
import { login, logout, getUserInfo } from "@/Apis/Login";
import avatar from "@/Assets/Images/Avatar.png";

const user = {
   state: {
      name: "",
      avatar,
      roles: [],
      permissions: [],
      authType: "",
      userInfo: null
   },

   mutations: {
      [SET_USER_NAME]: (state, name) => {
         state.name = name;
      },
      [SET_USER_AVATAR]: (state, avatar) => {
         state.avatar = avatar;
      },
      [SET_ROLES]: (state, roles) => {
         state.roles = roles;
      },
      [SET_PERMISSIONS]: (state, permissions) => {
         state.permissions = permissions;
      },
      [SET_AUTH_TYPE]: (state, authType) => {
         state.authType = authType;
      },
      [SET_USER_INFO]: (state, info) => {
         state.userInfo = info;
      }
   },

   actions: {
      // 登录
      Login({ dispatch }, userInfo) {
         const username = userInfo.username.trim();
         const password = userInfo.password;
         const code = userInfo.code;
         const uuid = userInfo.uuid;

         return new Promise((resolve, reject) => {
            login({ username, password })
               .then((res) => {
                  console.log("----- login res: ", res);
                  dispatch("StoreToken", res.message.token);
                  resolve();
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },

      // 获取用户信息
      GetUserInfo({ commit, state }) {
         return new Promise((resolve, reject) => {
            getUserInfo()
               .then((res) => {
                  const avatar = !res.message.avatar
                     ? state.avatar
                     : res.message.avatar;

                  // if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                  //    commit(SET_ROLES, res.roles)
                  //    commit(SET_PERMISSIONS, res.permissions)
                  // } else {
                  commit(SET_ROLES, [res.message.UserType]);
                  // }
                  commit(SET_AUTH_TYPE, res.message.AuthType);
                  // commit(SET_USER_NAME, res.message.Username === 'admin' ? 'admin' : res.message.user_info.alias_name)
                  commit(
                     SET_USER_NAME,
                     res.message.user_info
                        ? res.message.user_info.alias_name
                        : res.message.Username
                  );
                  commit(SET_USER_AVATAR, avatar);
                  commit(SET_USER_INFO, res.message.user_info || {});
                  resolve(res);
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },

      // 退出系统
      LogOut({ dispatch }) {
         return new Promise((resolve, reject) => {
            logout()
               .then(() => {
                  dispatch("Reset");
                  resolve();
               })
               .catch((error) => {
                  reject(error);
               });
         });
      },

      // 前端 登出
      FedLogOut({ dispatch }) {
         return new Promise((resolve) => {
            dispatch("StoreToken", "");
            resolve();
         });
      },

      // reset
      Reset({ commit, dispatch }) {
         dispatch("StoreToken", "");
         commit(SET_ROLES, []);
         commit(SET_PERMISSIONS, []);
         commit(SET_AUTH_TYPE, "");
         commit(SET_USER_NAME, "");
         commit(SET_USER_AVATAR, avatar);
         commit(SET_USER_INFO, null);
         dispatch("DeleteAllPermissionRoutes");
      }
   },

   getters: {
      avatar: (state) => state.avatar,
      userName: (state) => state.name,
      userRoles: (state) => state.roles,
      // isShowProfile: state => state.name !== 'admin',
      // 统一SaaS登陆以及用户admin登录不显示个人信息
      isShowProfile: (state) =>
         state.authType !== "union_auth" && state.name !== "admin",
      userInfo: (state) => ({
         ...state.userInfo,
         create_at: state.userInfo.create_at.split("T")[0]
      })
   }
};

export { user };
