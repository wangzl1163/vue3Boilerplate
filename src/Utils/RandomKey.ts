/*
 * @Description  : random key
 * @Author       : 王占领
 * @Date         : 2022-02-23 11:42:19
 * @LastEditTime: 2023-02-27 14:23:49
 * @LastEditors: 王占领
 */
export default {
   /**
    * 生成一个由随机字母与数字组成的字符串——key
    *
    * @param length key的长度，默认16位
    * @param blackList 要屏蔽的字母或数字
    * @returns key值
    */
   getKey(length = 16, blackList: (string | number)[] = []) {
      let s = "";
      const randomChar = function (): string {
         const n = Math.floor(Math.random() * 62);

         // 1-10
         if (n < 10) {
            if (blackList.includes(n)) {
               return randomChar();
            }

            return n.toString();
         }

         // A-Z
         if (n < 36) {
            if (blackList.includes(String.fromCharCode(n + 55))) {
               return randomChar();
            }

            return String.fromCharCode(n + 55);
         }

         // a-z
         if (blackList.includes(String.fromCharCode(n + 61))) {
            return randomChar();
         }

         return String.fromCharCode(n + 61);
      };

      while (s.length < length) s += randomChar();

      return s;
   }
};
