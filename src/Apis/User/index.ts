/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-12-21 11:15:20
 * @LastEditTime: 2022-12-28 16:13:42
 * @LastEditors: 王占领
 */
import request from "@/Utils/HttpRequest";

function getUserProfile(params: Record<string, string>) {
   return request.$get("", params);
}

function updateUserProfile(params: Record<string, string>) {
   return request.$post("", params);
}

// 修改密码，{username，password：旧密码， modify_password：新密码}
function updateUserPwd(data: Record<string, string>) {
   return request.$put("/login/modify", data);
}

export { getUserProfile, updateUserProfile, updateUserPwd };
