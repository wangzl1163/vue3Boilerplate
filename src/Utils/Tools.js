// 数组工具
const ArrayTools = {
   /**
    * 获取元素在数组中的下标，无匹配值返回-1
    * @param {Array} array 要解析的数组
    * @param {string | number | null | undefined} targetValue 要比对的目标值
    * @param {string} [key='id'] 元素为对象时要进行比对的属性名
    * @returns 所在数组中的下标
    */
   getIndex: function (array, targetValue, key = 'id') {
      return array.findIndex(item => typeof item === 'object' ? item[key] === targetValue : item === targetValue)
   },
   /**
    * 多维数组拉平为一维数组
    * @param {Array} array 要拉平的数组
    * @returns 返回一个新数组
    */
   flat: function (array) {
      if (!Array.isArray(array)) {
         throw (new Error('flat函数期望传入一个数组，参数错误。'))
      }

      const res = []
      const fun = function () {
         for (const item of array) {
            if (Array.isArray(item)) {
               res.push(...fun(item))
            } else {
               res.push(item)
            }
         }
      }
      fun()

      return res
   },
   /**
    * 数组去重
    * @param {Array} array 要去重的数组
    * @returns 返回一个新数组
    */
   distinct: function (array) {
      if (!Array.isArray(array)) {
         return array
      }

      return array.filter((item, index, self) => {
         if (typeof (item) !== 'object' && typeof (item) !== 'function') {
            return self.indexOf(item) === index
         }

         const currentItemIndex = self.findIndex(function (element) {
            return JSON.stringify(element) === JSON.stringify(item)
         })

         return currentItemIndex === index
      })
   }
}

// 字符串工具
const StringTools = {
   /**
    * 左侧填充
    * @param {string | number} string 要填充的字符串
    * @param {number} [length=2] 填充后的总长度
    * @param {string} [chars='0'] 用于填充的字符
    * @returns 填充后的字符串
    */
   padLeft: function (string, length = 2, chars = '0') {
      const str = typeof string === 'string' ? string : string.toString()
      return new Array(length - str.length + 1).join(chars) + str
   },

   /**
    * 右侧填充
    * @param {string | number} string 要填充的字符串
    * @param {number} [length=2] 填充后的总长度
    * @param {string} [chars='0'] 用于填充的字符
    * @returns 填充后的字符串
    */
   padRight: function (string, length = 2, chars = '0') {
      const str = typeof string === 'string' ? string : string.toString()
      return str + new Array(length - str.length + 1).join(chars)
   }
}

// 对象处理工具
const ObjectTools = {
   /**
    * 是否是空，包括：null，undefined
    * @param {any} source 任意值
    * @returns Boolean true：是空，false：不是空
    */
   isEmpty: function (source) {
      return source === null || source === undefined
   },

   /**
    * 是否是空或空对象，包括：null，undefined，{}
    * @param {Object} obj 对象
    * @returns Boolean true：是空或空对象，false：不是空或空对象
    */
   isEmptyObject: function (obj) {
      if (
         Object.prototype.toString.call(obj) !== '[object Null]' &&
         Object.prototype.toString.call(obj) !== '[object Undefined]'
      ) {
         if (Object.prototype.toString.call(obj) === '[object Object]') {
            return !(Object.keys(obj).length > 0)
         }

         return false
      }

      return true
   }
}

// Date对象工具
const DateTools = {
   /**
    * 日期或时间格式化
    * @param {string} fmt 日期或时间格式
    * @param {Date} date Date对象或日期时间字符串
    * @returns 格式化后的日期或时间字符串
    */
   dateTimeFormat: function (fmt, date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
         date = new Date(date)
      }

      const o = {
         'M+': date.getMonth() + 1, //月份   
         'd+': date.getDate(), //日   
         'H+': date.getHours(), //小时   
         'm+': date.getMinutes(), //分   
         's+': date.getSeconds(), //秒   
         'q+': Math.floor((date.getMonth() + 3) / 3), //季度   
         'S': date.getMilliseconds() //毫秒   
      }

      if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }

      for (const k in o) {
         if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
         }
      }

      return fmt
   },

   /**
    * 全日期时间简单格式化，只能自定义日期的连接字符，默认为‘-’
    * @param {Date} date Date对象或日期时间字符串
    * @returns 格式化后的全日期时间字符串
    */
   sampleFormat: function (date, separator = '-') {
      if (!date) {
         return date
      }

      if (Object.prototype.toString.call(date) !== '[object Date]') {
         date = new Date(date)
      }

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const formatNumber = n => n.toString()[1] ? n : '0' + n

      return [year, month, day].map(formatNumber).join(separator) + ' ' + [hour, minute, second].map(formatNumber).join(':')
   },
   /**
    * 获取当前周开始和当前日期时间
    * @param {string} format 格式，默认：'yyyy-MM-dd'
    * @returns 返回一个对象，包含开始与结束日期，{start：'', end: ''}
    */
   thisWeek: function (format = 'yyyy-MM-dd') {
      const start = new Date()
      const end = new Date()
      const i = end.getDay() ? end.getDay() - 1 : 6
      start.setTime(start.getTime() - 3600 * 1000 * 24 * i)

      return {
         start: this.dateTimeFormat(format, start),
         end: this.dateTimeFormat(format, end)
      }
   },
   /**
    * 获取当月开始到当前的日期时间
    *
    * @param {string} format 格式，默认：'yyyy-MM-dd'
    * @returns 返回一个对象，包含开始与结束日期，{start：'', end: ''}
    */
   thisMonth: function (format = 'yyyy-MM-dd') {
      const start = new Date()
      const end = new Date()
      let i = end.getDate()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (i - 1))

      return {
         start: this.dateTimeFormat(format, start),
         end: this.dateTimeFormat(format, end)
      }
   },
   /**
    * 计算两个日期之间的差值
    * @param {string | Date} date1 日期1
    * @param {string | Date} date2 日期2
    * @returns 返回差值对象，包含相差的毫秒数、分钟数、小时数、天数
    */
   dateDiff: function (date1, date2) {
      date1 = typeof date1 === 'string' ? date1.includes(':') ? date1 : date1 + ' 00:00:00' : date1
      date2 = typeof date2 === 'string' ? date2.includes(':') ? date2 : date2 + ' 00:00:00' : date2

      const time1 = Date.parse(new Date(date1))
      const time2 = Date.parse(new Date(date2))
      // 两个时间戳相差的毫秒数
      const diffMilliseconds = time2 - time1
      // 相差的天数
      const diffDays = Math.floor(diffMilliseconds / (24 * 3600 * 1000))
      // 计算出小时数——// 计算天数后剩余的毫秒数
      const leave1 = diffMilliseconds % (24 * 3600 * 1000)
      const diffHours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      const diffMinutes = Math.floor(leave2 / (60 * 1000))

      return {
         milliseconds: diffMilliseconds,
         hours: diffHours,
         minutes: diffMinutes,
         days: diffDays
      }
   }
}

// url工具
const UrlTools = {
   /**
    * 解析url中的参数
    * @param {string} queryString url
    * @returns 解析后的参数对象
    */
   parseQueryString: function (queryString) {
      if (queryString) {
         let params = decodeURIComponent(queryString).split('?')[1].split('&')
         let query = {}

         for (const item of params) {
            let arr = item.split('=')
            query[arr[0]] = arr[1]
         }

         return query
      }

      return null
   }
}

// number工具
const NumberTools = {
   /**
    * 将一个字符串string转换为radix进制的整数， 
    * 可以设置def默认值，如果转换失败，则返回设置的默认值
    * @param {string} string 要转换的字符串
    * @param {number} [def=0] 默认值，默认为0
    * @param {number} [radix=10] 数字进制，介于2-36之间的数
    * @returns 转换的数字
    */
   tryParseInt: function (string, def = 0, radix = 10) {
      const num = parseInt(string, radix)

      return isNaN(num) ? def : num
   },

   /**
    * 解析一个参数（必要时先转换为字符串）并返回一个浮点数。
    * 可以设置def默认值，如果转换失败，则返回设置的默认值
    * @param {string} string 
    * @param {number} [def=0] 默认值，默认为0
    * @returns 转换的浮点数
    */
   tryParseFloat: function (string, def = 0) {
      const num = parseFloat(string)

      return isNaN(num) ? def : num
   },

   /**
    * 添加千位符
    * @param {Number} num 
    */
   thousandBit: function (num) {
      const res = num.toString().replace(
         /\d+/,
         function (n) { // 先提取整数部分
            return n.replace(
               /(\d)(?=(\d{3})+$)/g,
               function ($1) {
                  return $1 + ','
               }
            )
         }
      )
      return res
   }
}

// function工具
const FunctionTools = {
   /**
    * 防抖，支持取消、立即执行
    * @param {Function} func 要防抖的函数
    * @param {number} wait 延迟的执行的时间，单位：ms，默认：500ms
    * @returns 返回一个已经被防抖的函数
    */
   debounce: function (func, wait = 500) {
      let timeout = null
      let lastArgs = null

      function debounced(...args) {
         lastArgs = args

         if (timeout) {
            clearTimeout(timeout)
            timeout = null
         }

         // 以Promise的形式返回函数执行结果
         return new Promise((res, rej) => {
            timeout = setTimeout(async () => {
               try {
                  const result = await func.apply(this, lastArgs)
                  return res(result)
               } catch (e) {
                  return rej(e)
               }
            }, wait)
         })
      }

      // 允许取消
      function cancel() {
         if (timeout !== null) {
            clearTimeout(timeout)
         }

         timeout = null
      }

      // 允许立即执行
      function flush() {
         cancel()
         return func.apply(this, lastArgs)
      }

      debounced.cancel = cancel
      debounced.flush = flush

      return debounced
   },
   /**
    * 节流，支持取消、立即执行
    * @param {Function} func 要节流的函数
    * @param {number} wait 限制调用达到的毫秒数，单位：ms，默认：500ms
    * @param {boolean} execFirstCall 是否执行最先一次调用，默认：false
    * @returns 返回一个已经被节流的函数
    */
   throttle: function (func, wait = 500, execFirstCall = false) {
      let timeout = null
      let lastArgs
      let firstCallTimestamp

      function throttled(...args) {
         // 如果第一次执行时的时间戳不存在，则初始化第一次执行的时间戳
         if (!firstCallTimestamp) firstCallTimestamp = new Date().getTime()

         if (!execFirstCall || !lastArgs) {
            console.log('set lastArgs:', args)
            lastArgs = args
         }

         if (timeout) {
            clearTimeout(timeout)
            timeout = null
         }

         // 以Promise的形式返回函数执行结果
         return new Promise((res, rej) => {
            const fun = async () => {
               // 如果距离第一次执行的时间间隔已经大于等于需要等待的时间
               if (new Date().getTime() - firstCallTimestamp >= wait) {
                  try {
                     const result = await func.apply(this, lastArgs)
                     return res(result)
                  } catch (e) {
                     return rej(e)
                  } finally {
                     cancel()
                  }
               } else {
                  timeout = setTimeout(async () => {
                     try {
                        const result = await func.apply(this, lastArgs)
                        return res(result)
                     } catch (e) {
                        return rej(e)
                     } finally {
                        cancel()
                     }
                  }, firstCallTimestamp + wait - new Date().getTime())
               }
            }

            return fun()
         })
      }

      // 允许取消
      function cancel() {
         if (timeout !== null) {
            clearTimeout(timeout)
         }

         lastArgs = null
         timeout = null
         firstCallTimestamp = null
      }

      // 允许立即执行
      function flush() {
         cancel()
         return func.apply(this, lastArgs)
      }

      throttled.cancel = cancel
      throttled.flush = flush

      return throttled
   }
}

export {
   ArrayTools,
   StringTools,
   ObjectTools,
   DateTools,
   UrlTools,
   NumberTools,
   FunctionTools
}

export default {
   ...ArrayTools,
   ...StringTools,
   ...ObjectTools,
   ...DateTools,
   ...UrlTools,
   ...NumberTools,
   ...FunctionTools
}