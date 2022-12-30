import { DateTools } from "./Tools";
import { styleVars as getStyleVars } from "@/Assets/Theme";

const styleVars = getStyleVars();

/**
 * 创建Echarts图的options
 * @param {String} type 图类型
 * @param {String} name
 * @param {Array} data
 * @param {Object} title
 * @param {Array} color
 * @param {Object} params
 */
const createOptions = (
   type = "",
   name = "",
   data = [],
   title = {},
   color = ["#007AF5", "#F9B939"],
   { config = {}, seriesItemConfig = {} } = {}
) => {
   const configuration = {
      textStyle: {
         color: styleVars.textColorRegular
      },
      ...config
   };

   return {
      title: {
         text: title.text,
         left: 40,
         textStyle: {
            color: styleVars.textColorRegular,
            fontFamily: "Microsoft YaHei",
            fontSize: 14,
            fontWeight: 400,
            ...title.textStyle
         }
      },
      ...configuration,
      legend: {
         ...config.legend,
         textStyle: {
            color: styleVars.legendTextColor,
            ...config?.legend?.textStyle
         }
      },
      color: color,
      series: [
         {
            name: name,
            type: type,
            label: {
               show: false
            },
            hoverAnimation: false,
            data: data,
            ...seriesItemConfig
         }
      ]
   };
};

/**
 * 创建Echarts饼图options，默认为环状饼图
 * @param {String} name
 * @param {Array} data series data 值格式：[{value: [int], name: [string]}, ...]
 * @param {Array} color 全局颜色
 * @param {Array} radius 饼图半径 ['内半径', '外半径']
 * @param {Object} params 配置项，config：全局配置项，seriesItemConfig：series的配置项
 */
const createPieOptions = (
   name = "",
   data = [],
   color = ["#007AF5", "#F9B939"],
   radius = ["70%", "100%"],
   { config = {}, series = [], seriesItemConfig = {} } = {}
) => {
   const seriesItemConfiguration = {
      radius,
      ...seriesItemConfig
   };
   return createOptions("pie", name, data, {}, color, {
      config,
      series,
      seriesItemConfig: seriesItemConfiguration
   });
};

/**
 * 创建Echarts折线图options，默认为不带阴影面积的折线图
 * @param {String} name
 * @param {Array} data series data 值格式：[[[x], [y], [其他维度的值], ...], ...]
 * @param {Array} color 全局颜色
 * @param {Object} params 配置项，config：全局配置项，seriesItemConfig：series的配置项
 */
const createLineOptions = (
   name = "",
   data = [],
   title,
   color = ["#005FC1"],
   { config = {}, seriesItemConfig = {} } = {}
) => {
   const axisLine = {
      lineStyle: {
         color: styleVars.axisLineColor
      }
   };
   const splitLine = {
      lineStyle: {
         color: styleVars.splitLineColor,
         type: "dashed"
      }
   };
   const echartsTitle = typeof title === "string" ? { text: title } : title;

   const configuration = {
      tooltip: {
         show: true,
         trigger: "axis",
         formatter: function (params) {
            const timeStr = params[0].value[0];
            const valueStr = params
               .map(
                  (param) =>
                     param.marker + param.seriesName + "：" + param.value[1]
               )
               .join("<br/>");

            return `${timeStr}<br/>${valueStr}`;
         }
      },
      ...config,
      grid: {
         top: 50,
         left: 0,
         right: 25,
         bottom: 0,
         containLabel: true,
         ...(config.grid || {})
      },
      xAxis: {
         type: "time",
         boundaryGap: false,
         axisLine,
         splitLine: {
            show: false,
            ...splitLine
         },
         ...(config.xAxis || {})
      },
      yAxis: {
         type: "value",
         axisLine: {
            show: false,
            ...axisLine
         },
         splitLine,
         ...(config.yAxis || {})
      }
   };
   return createOptions("line", name, data, echartsTitle, color, {
      config: configuration,
      seriesItemConfig: {
         symbol: "none",
         ...seriesItemConfig
      }
   });
};

/**
 * 创建Echarts柱状图options
 * @param {String} name
 * @param {Array} data series data 值格式：[[[x], [y], [其他维度的值], ...], ...]
 * @param {Array} color 全局颜色
 * @param {Object} params 配置项，config：全局配置项，seriesItemConfig：series的配置项
 */
const createBarOptions = (
   name = "",
   data = [],
   title = "",
   config = {
      grid: {},
      xAxis: {},
      yAxis: {}
   },
   seriesItemConfig = {}
) => {
   const axisLine = {
      lineStyle: {
         color: styleVars.axisLineColor
      }
   };
   const splitLine = {
      lineStyle: {
         color: styleVars.splitLineColor,
         type: "dashed"
      }
   };
   const echartsTitle = typeof title === "string" ? { text: title } : title;

   const configuration = {
      ...config,
      grid: {
         top: 10,
         left: 20,
         right: 20,
         bottom: 5,
         containLabel: true,
         ...config.grid
      },
      xAxis: {
         type: "category",
         boundaryGap: false,
         axisLine,
         splitLine: {
            show: false,
            ...splitLine
         },
         ...config.xAxis
      },
      yAxis: {
         type: "value",
         axisLine: {
            show: false,
            ...axisLine
         },
         splitLine,
         ...config.yAxis
      }
   };
   const color = config.color || ["#005FC1"];
   return createOptions("bar", name, data, echartsTitle, color, {
      config: configuration,
      seriesItemConfig
   });
};

/**
 * 解构Promise.all的返回
 * @param {Array} res Promise.all的返回值
 * @param {String} key 接口返回的message中的key
 */
const resolveRes = (res, key) => res.map((item) => item.message[key]).flat();

/**
 * 解构Promise.allSettled的返回
 * @param {Array} res Promise.allSettled的返回值
 * @param {String} key 接口返回的message中的key
 * @param {Any} defaultValue 接口失败时返回的值
 */
const resolveAllSettledRes = (res, key, defaultValue = [], depth = 1) =>
   res
      .map((item) => {
         if (item.status === "fulfilled") {
            if (key) {
               return item.value.message[key] || item.value;
            }

            return item.value.message === undefined
               ? item.value
               : item.value.message;
         }

         return defaultValue;
      })
      .flat(depth);

/**
 * 字节转为GB
 * @param {Number} bytes 字节数
 * @param {Number} precision 小数位精确度
 */
const byte2GB = (bytes, precision = 2) =>
   isNaN(bytes)
      ? bytes
      : ((bytes * 1.0) / 1024 / 1024 / 1024).toFixed(precision);

/**
 * 字节转为KB
 * @param {Number} bytes 字节数
 * @param {Number} precision 小数位精确度
 */
const byte2KB = (bytes, precision = 2) =>
   isNaN(bytes) ? bytes : ((bytes * 1.0) / 1024).toFixed(precision);

/**
 * 字节转为MB
 * @param {Number} bytes 字节数
 * @param {Number} precision 小数位精确度
 */
const byte2MB = (bytes, precision = 2) =>
   isNaN(bytes) ? bytes : ((bytes * 1.0) / 1024 / 1024).toFixed(precision);

/**
 * 创建Echarts图中具有多个series的options
 * @param {String} type 图类型
 * @param {Object} title
 * @param {Array} data series data 值格式：[{name: 「name」,data:[「x」, 「y」, 「其他维度的值」, ...]}, ...]
 * @param {Array} color 全局颜色
 * @param {Object} options 其他配置
 */
const createMultiOptions = (
   type = "",
   title = {},
   data = [],
   color = ["#007AF5", "#F9B939"],
   {
      config = {
         legend: {}
      },
      seriesItemConfig = {}
   } = {}
) => {
   const configuration = {
      textStyle: {
         color: styleVars.textColorRegular
      },
      ...config,
      legend: {
         icon: "react",
         itemWidth: 10,
         itemHeight: 1,
         top: 20,
         right: 0,
         ...config.legend,
         textStyle: {
            color: styleVars.legendTextColor,
            ...config?.legend?.textStyle
         }
      }
   };
   const handledSeries = data.map((item) => {
      return {
         name: item.name,
         type: type,
         label: {
            show: false
         },
         hoverAnimation: false,
         data: item.data,
         ...seriesItemConfig
      };
   });

   return {
      title: {
         text: title.text,
         left: 40,
         textStyle: {
            color: styleVars.textColorRegular,
            fontFamily: "Microsoft YaHei",
            fontSize: 14,
            fontWeight: 400,
            ...title.textStyle
         }
      },
      color: color,
      ...configuration,
      series: [...handledSeries]
   };
};

/**
 * 创建具有多个series的折线图的options
 * @param {String | Object} title 标题组件，包含主标题和副标题。
 * @param {Array} data series data 值格式：[{name: 「name」,data:[「x」, 「y」, 「其他维度的值」, ...]}, ...]
 * @param {Array} color 全局颜色
 * @param {Object} options 配置项，config：全局配置项，seriesItemConfig：series的配置项
 */
const createMultiLineOptions = (
   title,
   data = [],
   color = ["#005FC1"],
   { config = {}, seriesItemConfig = {} } = {}
) => {
   // 坐标轴线
   const axisLine = {
      lineStyle: {
         color: styleVars.axisLineColor
      }
   };
   // 分割线
   const splitLine = {
      lineStyle: {
         color: styleVars.splitLineColor,
         type: "dashed"
      }
   };
   const echartsTitle = typeof title === "string" ? { text: title } : title;
   const configuration = {
      tooltip: {
         show: true,
         trigger: "axis",
         formatter: function (params) {
            const timeStr = params[0].value[0];
            const valueStr = params
               .map(
                  (param) =>
                     param.marker + param.seriesName + "：" + param.value[1]
               )
               .join("<br/>");

            return `${timeStr}<br/>${valueStr}`;
         }
      },
      ...config,
      xAxis: {
         type: "time",
         boundaryGap: false,
         axisLine,
         splitLine: {
            show: false,
            ...splitLine
         },
         ...(config.xAxis || {})
      },
      yAxis: {
         type: "value",
         axisLine: {
            show: false,
            ...axisLine
         },
         splitLine,
         ...(config.yAxis || {})
      },
      grid: {
         top: 20,
         left: 10,
         right: 10,
         bottom: 10,
         containLabel: true,
         ...(config.grid || {})
      }
   };

   return createMultiOptions("line", echartsTitle, data, color, {
      config: configuration,
      seriesItemConfig: {
         symbol: "none",
         ...seriesItemConfig
      }
   });
};

/**
 * 一组时间戳转化为日期时间格式
 * @param {Array} arr 一维或二维数组
 * @param {Int} rate 转换率，1s = 1000ms rate = 1000
 * @param {Int} index 时间戳所在的一维数组或者二维数组中的第二维的索引值
 */
const timestamp2DateTime = (
   arr,
   rate = 1,
   index = 0,
   formatStr = "yyyy-MM-dd HH:mm:ss"
) => {
   const convert2Timestamp = (time) =>
      time.toString().includes(".")
         ? time * 1000 * rate
         : time.toString().length === 10 // 长度为10，单位为秒
         ? time * 1000 * rate
         : time * rate;

   arr.forEach((item) => {
      if (Array.isArray(item)) {
         item[index] = DateTools.dateTimeFormat(
            formatStr,
            convert2Timestamp(item[index])
         );
      } else {
         item = DateTools.dateTimeFormat(formatStr, convert2Timestamp(item));
      }
   });

   return arr;
};

/**
 * 从已有的颜色表中获取指定个数的颜色，最大值为11，默认值为1
 * @param {Number} num 颜色个数
 */
const getColors = (num = 1) =>
   [
      "#F7580E",
      "#00D4A2",
      "#A84FD5",
      "#F9B939",
      "#3C72DB",
      "#44B034",
      "#00D4FF",
      "#EB6D00",
      "#00E6B0",
      "#F9B939",
      "#C161F2"
   ].slice(0, num);

/**
 * 生成时间范围参数
 * @param {Number} timeRange 时间范围，单位：小时
 * @param {Number} step 时间跨度（步长），单位：秒
 */
const createTimeRangeParams = (timeRange, step) => ({
   start: (Date.now() - timeRange * 60 * 60 * 1000) / 1000,
   end: Date.now() / 1000,
   step: step
});

/**
 * 单位转换
 * @param {Array} arr 数据数组
 * @param {String} unit 单位，可选值：KB，MB，GB，kbps
 */
const convertUnit = (arr, unit) => {
   const convert = {
      KB: byte2KB,
      MB: byte2MB,
      GB: byte2GB,
      kbps: (speedValue, precision = 2) =>
         isNaN(speedValue)
            ? speedValue
            : ((speedValue * 1.0) / 1000).toFixed(precision)
   };

   return arr.map((item) => {
      item[1] = convert[unit](item[1]);
      return item;
   });
};

export {
   convertUnit,
   createTimeRangeParams,
   byte2MB,
   byte2KB,
   getColors,
   timestamp2DateTime,
   createBarOptions,
   createPieOptions,
   createLineOptions,
   resolveRes,
   resolveAllSettledRes,
   byte2GB,
   createMultiLineOptions
};
