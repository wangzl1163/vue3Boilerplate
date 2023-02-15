/*
 * @Description:
 * @Author: 王占领
 * @Date: 2022-10-21 10:03:32
 * @LastEditTime: 2022-10-21 10:07:20
 * @LastEditors: 王占领
 */
import { useMakeEnum } from "./Composables/MakeEnum";

enum WeekEnum {
   "SUN",
   "MON",
   "TUE",
   "WED",
   "THU",
   "FRI",
   "SAT"
}

export const Week = useMakeEnum(WeekEnum, "weekday");
