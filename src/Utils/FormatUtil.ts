/*
 * @Description: format util
 * @Author: 王占领
 * @Date: 2021-06-07 09:52:39
 * @LastEditTime: 2022-12-26 16:41:46
 * @LastEditors: 王占领
 * @FilePath: \web-ccs-test\client\src\utils\formatUtil.js
 */
export function dictToQueryParams(
   obj: Record<string | number | symbol, unknown>
) {
   const str = Object.keys(obj).reduce((result, item) => {
      return `${result}${item}=${obj[item]}&`;
   }, "?");
   return str.substring(0, str.length - 1);
}

export default {
   dictToQueryParams,
   /**
    * 字节转为GB
    * @param {Number} bytes 字节数
    * @param {Number} precision 小数位精确度
    */
   byte2GB: (bytes: number, precision = 2) =>
      isNaN(bytes)
         ? bytes
         : ((bytes * 1.0) / 1024 / 1024 / 1024).toFixed(precision),

   /**
    * 字节转为KB
    * @param {Number} bytes 字节数
    * @param {Number} precision 小数位精确度
    */
   byte2KB: (bytes: number, precision = 2) =>
      isNaN(bytes) ? bytes : ((bytes * 1.0) / 1024).toFixed(precision),

   /**
    * 字节转为MB
    * @param {Number} bytes 字节数
    * @param {Number} precision 小数位精确度
    */
   byte2MB: (bytes: number, precision = 2) =>
      isNaN(bytes) ? bytes : ((bytes * 1.0) / 1024 / 1024).toFixed(precision),
   /**
    * 转为Byte
    * @param {Number | String} value 当前值可以包含单位
    * @param {String} unit 当前单位
    * @param {Number} precision 小数位精确度
    * @returns
    */
   convert2Byte: (value: string, unit: string, precision = 2) => {
      if (!value) {
         return value;
      }

      let noUnitStr = "";

      if (
         unit === "GB" ||
         unit === "GiB" ||
         unit === "Gi" ||
         value.includes("G")
      ) {
         noUnitStr = value.replace(/G(i)?(B)?/g, "");
         return (Number(noUnitStr) * 1.0 * Math.pow(1024, 3)).toFixed(
            precision
         );
      }

      if (
         unit === "MB" ||
         unit === "MiB" ||
         unit === "Mi" ||
         value.includes("M")
      ) {
         noUnitStr = value.replace(/M(i)?(B)?/g, "");
         return (Number(noUnitStr) * 1.0 * Math.pow(1024, 2)).toFixed(
            precision
         );
      }

      if (
         unit === "KB" ||
         unit === "KiB" ||
         unit === "Ki" ||
         value.includes("K")
      ) {
         noUnitStr = value.replace(/K(i)?(B)?/g, "");
         return (Number(noUnitStr) * 1.0 * Math.pow(1024, 1)).toFixed(
            precision
         );
      }

      return value;
   },
   /**
    * 日期或时间格式化
    * * @param {Date | string | number} datetime Date对象或日期时间字符串
    * @param {string} fmt 日期或时间格式
    * @returns 格式化后的日期或时间字符串
    */
   dateTimeFormat: function (
      datetime: Date | string | number,
      fmt = "yyyy-MM-dd HH:mm:ss"
   ) {
      const date = new Date(datetime);

      const o: Record<string, number> = {
         "M+": date.getMonth() + 1, // 月份
         "d+": date.getDate(), // 日
         "H+": date.getHours(), // 小时
         "m+": date.getMinutes(), // 分
         "s+": date.getSeconds(), // 秒
         "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
         S: date.getMilliseconds() // 毫秒
      };

      if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
         );
      }

      for (const k in o) {
         if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
               RegExp.$1,
               RegExp.$1.length == 1
                  ? o[k].toString()
                  : ("00" + o[k]).substr(("" + o[k]).length)
            );
         }
      }

      return fmt;
   },
   /**
    * 一组时间戳转化为日期时间格式
    * @param {Array} arr 一维或二维数组
    * @param {Int} rate 转换率，1s = 1000ms rate = 1000
    * @param {Int} index 时间戳所在的一维数组或者二维数组中的第二维的索引值
    */
   timestamp2DateTime: function (
      arr: unknown[],
      rate = 1,
      index = 0,
      formatStr = "yyyy-MM-dd HH:mm:ss"
   ) {
      const convert2Timestamp = (time: number) =>
         time.toString().includes(".") ? time * 1000 * rate : time * rate;

      arr.forEach((item) => {
         if (Array.isArray(item)) {
            item[index] = this.dateTimeFormat(
               convert2Timestamp(item[index]),
               formatStr
            );
         } else {
            item = this.dateTimeFormat(
               convert2Timestamp(item as number),
               formatStr
            );
         }
      });

      return arr;
   },
   /**
    * 生成时间范围参数
    * @param {Number|Object} timeRange 时间范围，单位：小时，或者为 {start:开始日期时间，end：结束日期时间}的对象
    * @param {Number} step 时间跨度（步长），单位：秒
    * @returns 返回包含开始时间、结束时间、步长的对象，时间单位：秒，步长单位：秒
    */
   createTimeRangeParams: function (
      timeRange: number | Record<string, string | number | Date>,
      step = 15
   ) {
      if (typeof timeRange === "object") {
         return {
            start: new Date(timeRange.start).getTime() / 1000,
            end: new Date(timeRange.end).getTime() / 1000,
            step
         };
      }

      return {
         start: (Date.now() - timeRange * 60 * 60 * 1000) / 1000,
         end: Date.now() / 1000,
         step: step
      };
   },
   /**
    * 单位转换
    * @param {Array} arr 数据数组
    * @param {String} unit 单位，可选值：KB，MB，GB，kbps
    */
   convertUnit: function (arr: unknown[][], unit: "KB" | "MB" | "GB" | "kbps") {
      const convert = {
         KB: this.byte2KB,
         MB: this.byte2MB,
         GB: this.byte2GB,
         kbps: (speedValue: number, precision = 2) =>
            isNaN(speedValue)
               ? speedValue
               : ((speedValue * 1.0) / 1000).toFixed(precision),
         K: (num: number, precision = 2) =>
            isNaN(num) ? num : ((num * 1.0) / 1000).toFixed(precision)
      };

      return arr.map((item) => {
         item[1] = convert[unit](item[1] as number);
         return item;
      });
   },
   /**
    * 从已有的颜色表中获取指定个数的颜色，默认值为最大值
    * @param {Number} num 颜色个数
    * @param {Boolean} isShuffle 是否乱序
    */
   getColors: function (num = 20, isShuffle = false) {
      const colors = [
         "#2ec7c9",
         "#b6a2de",
         "#5ab1ef",
         "#ffb980",
         "#d87a80",
         "#8d98b3",
         "#e5cf0d",
         "#97b552",
         "#95706d",
         "#dc69aa",
         "#07a2a4",
         "#9776F8",
         "#5687F8",
         "#40A9FF",
         "#13BACC",
         "#28D16E",
         "#98CE24",
         "#ECC129",
         "#F47F50",
         "#D55B5B"
      ];
      if (isShuffle) {
         return colors.sort(() => Math.random() - 0.5).slice(0, num);
      }

      return colors.slice(0, num);
   }
};
