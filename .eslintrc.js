/*
 * @Description  :
 * @Author       : 王占领
 * @Date         : 2022-03-01 18:13:55
 * @LastEditTime: 2022-12-26 14:54:07
 * @LastEditors: 王占领
 */

module.exports = {
   env: {
      browser: true,
      node: true,
      es2022: true
   },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "./.eslintrc-auto-import.json"
   ],
   plugins: ["@typescript-eslint"],
   parser: "vue-eslint-parser",
   parserOptions: {
      parser: "@typescript-eslint/parser",
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
      "no-unused-vars": ["off"],
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off"
   }
};
