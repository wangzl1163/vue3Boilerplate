import { useMakeEnum } from "./Composables/MakeEnum";

enum Status {
   "成功" = "success",
   "失败" = "failed"
}

export const ActionStatus = useMakeEnum(Status, "status");
