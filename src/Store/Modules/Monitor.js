import { createTimeRangeParams } from '@/Utils/PageUtils';

export const monitor = {
   state: {
      // 时间范围：1小时，步长：30秒
      timeRangeOneHours: () => createTimeRangeParams(1, 30),
      // 时间范围：2小时，步长：60秒
      timeRangeTwoHours:() => createTimeRangeParams(2, 60)
   },
   getters: {
      timeRangeTwoHours(state){
         return state.timeRangeTwoHours
      }
   }
}