/*
 * @Description  : echarts init option
 * @Author       : 王占领
 * @Date         : 2022-06-08 14:01:43
 * @LastEditTime: 2022-12-29 17:07:42
 * @LastEditors: 王占领
 */
import { styleVars as getStyleVars } from "@/Assets/Theme";

import type { Obj } from "@/Typings/Common";

const styleVars = getStyleVars();

export const dataZoom = {
   type: "slider",
   left: 74,
   right: 78,
   backgroundColor: styleVars.dataZoomBackgroundColor,
   borderColor: styleVars.dataZoomBorderColor,
   dataBackground: {
      areaStyle: {
         color: "#EAEEF6",
         opacity: 1
      },
      lineStyle: {
         color: styleVars.dataZoomBorderColor
      }
   },
   selectedDataBackground: {
      lineStyle: {
         color: "#D4D8DD"
      },
      areaStyle: {
         color: "#DFE5EC",
         opacity: 1
      }
   },
   fillerColor: "rgba(0, 37, 92, 0.05)",
   moveHandleSize: 8,
   moveHandleStyle: {
      color: styleVars.dataZoomMoveHandleColor
   },
   handleStyle: {
      color: "#DFE4ED",
      borderColor: styleVars.dataZoomBorderColor,
      borderWidth: 1
   },
   emphasis: {
      moveHandleStyle: {
         color: styleVars.dataZoomMoveHandleColor
      }
   },
   labelFormatter: function (val: Obj, valStr: string) {
      const [date, time] = valStr.split(" ");
      return date + "\n" + time;
   }
};

export default {
   textStyle: {
      color: styleVars.textColorRegular
   },
   title: {
      textStyle: {
         color: styleVars.textColorRegular,
         fontWeight: 600,
         fontSize: 14,
         lineHeight: 24
      }
   },
   legend: {
      textStyle: {
         height: 10,
         color: styleVars.textColorRegular,
         rich: {
            a: {
               verticalAlign: "bottom"
            }
         }
      },
      icon: "circle",
      formatter: ["{a|{name}}"],
      itemHeight: 10,
      itemWidth: 10
   },
   xAxis: {
      type: "time",
      axisLabel: {
         formatter: "{HH}:{mm}"
      },
      axisLine: {
         lineStyle: {
            color: styleVars.axisLineColor
         }
      }
   },
   yAxis: {
      axisLine: {
         show: false
      },
      min: function (val: Obj) {
         return Math.floor((val.min as number) * 0.7);
      },
      max: function (val: Obj) {
         const max = val.max as number;
         if (max <= 25) {
            return parseFloat(
               (max > 0 && max !== 1 && max !== 2 ? max * 2 : 5).toFixed()
            );
         } else {
            return parseFloat((max + max * 0.2).toFixed());
         }
      }
   },
   grid: {
      right: 16,
      bottom: 46
   },
   dataZoom: [dataZoom]
};
