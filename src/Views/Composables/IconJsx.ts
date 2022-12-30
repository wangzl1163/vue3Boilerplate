/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-07-28 09:48:17
 * @LastEditTime: 2022-12-28 16:24:46
 * @LastEditors: 王占领
 */
import { createVNode } from "vue";
import { ElIcon } from "element-plus";
import {
   EditPen,
   Delete,
   View,
   SwitchButton,
   Download
} from "@element-plus/icons-vue";
import { SvgIcon } from "@/Components/index";

import type { SimpleObj } from "@/Typings/Common";

const createIcon = (iconType: unknown) => ({
   "prefix-icon": () => {
      if (typeof iconType === "string") {
         return createVNode(SvgIcon, { icon: iconType });
      } else {
         return createVNode(
            ElIcon,
            {},
            { default: () => createVNode(iconType as SimpleObj) }
         );
      }
   }
});

export default function () {
   return {
      editIcon: createIcon(EditPen),
      deleteIcon: createIcon(Delete),
      viewIcon: createIcon(View),
      copyIcon: createIcon("copy"),
      switchIcon: createIcon(SwitchButton),
      downloadIcon: createIcon(Download),
      closeIcon: createIcon("close"),
      plusBoldIcon: createIcon("plus"),
      restartIcon: createIcon("restart"),
      recordIcon: createIcon("record"),
      deleteServerIcon: createIcon("delete-server"),
      addServiceMonitorIcon: createIcon("add-service-monitor"),
      deleteServiceMonitorIcon: createIcon("delete-service-monitor"),
      manageServiceMonitorIcon: createIcon("manage-service-monitor"),
      monitorDetailIcon: createIcon("service-monitor"),
      loggerViewIcon: createIcon("logger-view"),
      addPortMonitorIcon: createIcon("add-port-monitor"),
      addApiMonitorIcon: createIcon("add-api-monitor")
   };
}
