/*
 * @Description: 校验工具
 * @Author: 王占领
 * @Date: 2022-05-07 17:30:46
 * @LastEditTime: 2022-12-26 15:16:05
 * @LastEditors: 王占领
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
   return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
   const validMaps = ["admin", "editor"];
   return validMaps.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string) {
   const reg =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
   return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string) {
   const reg = /^[a-z]+$/;
   return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string) {
   const reg = /^[A-Z]+$/;
   return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string) {
   const reg = /^[A-Za-z]+$/;
   return reg.test(str);
}

/**
 * @param {string} email
 * @returns 正确为true，否则为false
 */
export function validEmail(email: string) {
   const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: unknown) {
   if (typeof str === "string" || str instanceof String) {
      return true;
   }
   return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg: unknown) {
   if (typeof Array.isArray === "undefined") {
      return Object.prototype.toString.call(arg) === "[object Array]";
   }
   return Array.isArray(arg);
}

/**
 *
 * @param {String} pn 手机号
 * @returns {Boolean} 正确为true，否则为false
 */
export function validPhoneNumber(pn: string) {
   return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
      pn
   );
}
