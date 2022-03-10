/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-01 18:13:55
 * @LastEditTime : 2022-03-01 18:15:18
 * @LastEditors  : 王占领
 */

module.exports = {
   env: {
      browser: true,
      node: true,
      es2022: true
   },
   extends: ["eslint:recommended", "prettier"],
   plugins: [],
   parser: "vue-eslint-parser",
   parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      ecmaFeatures: {
         jsx: true
      }
   },
   globals: {
      // 指定全局变量，用以避免报no-undef错误
      defineProps: "writable",
      defineEmits: "writable"
   },
   rules: {
      "no-tabs": ["error", { allowIndentationTabs: true }],
      "no-unused-vars": ["off"]
   }
};
