module.exports = {
   root: true,
   env: {
      browser: true,
      node: true,
      es2024: true
   },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
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
