module.exports = {
   env: {
      browser: true,
      node: true,
      es2022: true
   },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
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
      "@typescript-eslint/no-unused-vars": "off"
   }
};
