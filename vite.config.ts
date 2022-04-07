import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import eslintPlugin from "@nabla/vite-plugin-eslint";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src")
      }
   },
   plugins: [
      vue(),
      vueJsx({}),
      createSvgIconsPlugin({
         // 配置路劲在你的src里的svg存放文件
         iconDirs: [path.resolve(__dirname, "src/Assets/Icons/svg")],
         symbolId: "icon-[dir]-[name]"
      }),
      eslintPlugin({
         eslintOptions: {
            fix: true,
            cache: false
         }
      })
   ],
   server: {
      port: 3000,
      strictPort: true,
      proxy: {
         // 字符串简写写法
         "/foo": "http://localhost:4567",
         // 选项写法
         "/api": {
            target: "http://jsonplaceholder.typicode.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, "")
         },
         // 正则表达式写法
         "^/fallback/.*": {
            target: "http://jsonplaceholder.typicode.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/fallback/, "")
         },
         // 使用 proxy 实例
         "/api": {
            target: "http://jsonplaceholder.typicode.com",
            changeOrigin: true,
            configure: (proxy, options) => {
               // proxy 是 'http-proxy' 的实例
            }
         },
         // Proxying websockets or socket.io
         "/socket.io": {
            target: "ws://localhost:3000",
            ws: true
         }
      }
   }
});

// 注册全局环境变量
import randomKey from "./src/Utils/RandomKey";
import.meta.env = {
   AESKEY: randomKey.getKey(64),
   AESIV: randomKey.getKey(32)
};
