/*
 * @Description: 网络连接状态
 * @Author: 王占领
 * @Date: 2022-11-03 16:36:04
 * @LastEditTime: 2022-11-03 16:39:26
 * @LastEditors: 王占领
 */

import { useMakeEnum } from "./Composables/MakeEnum";

enum Status {
   "已连接" = "true",
   "未连接" = "false"
}

export const NetworkStatus = useMakeEnum(Status, "status");
