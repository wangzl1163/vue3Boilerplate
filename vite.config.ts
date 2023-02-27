/*
 * @Description  : vite config
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:12
 * @LastEditTime: 2022-12-29 14:22:43
 * @LastEditors: 王占领
 */

import { defineConfig, HttpProxy, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import compressionPlugin from "vite-plugin-compression";
import vueSetupExtendPlugin from "vite-plugin-vue-setup-extend";
import gojsHackPlugin from "./plugins/GojsHack";
import checkerPlugin from "vite-plugin-checker";
import removeConsolePlugin from "vite-plugin-remove-console";
import * as path from "path";

import type { ClientRequest, IncomingMessage, ServerResponse } from "http";

const proxyRequestLog = (
   proxyReq: ClientRequest,
   req: IncomingMessage,
   res: ServerResponse,
   options: HttpProxy.ServerOptions
) => {
   console.group("request info:");
   console.log("raw url: ", req.url);
   // console.log("proxy url: ", "");
   console.log("method: ", req.method);
   console.groupEnd();
};

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
      vueSetupExtendPlugin(), // name 可以写在 script 标签上
      splitVendorChunkPlugin(),
      compressionPlugin({
         ext: ".gz",
         deleteOriginFile: false
      }),
      createSvgIconsPlugin({
         // 配置svg文件所在的文件路径
         iconDirs: [path.resolve(__dirname, "src/Assets/Icons/svg")],
         symbolId: "icon-[dir]-[name]"
      }),
      eslintPlugin({
         eslintOptions: {
            fix: true,
            cache: false
         }
      }),
      gojsHackPlugin(),
      checkerPlugin({ vueTsc: true }),
      removeConsolePlugin()
   ],
   server: {
      port: 10101,
      strictPort: true,
      proxy: {
         "/cdsi/api/v1/": {
            target: "http://172.20.72.106:30771", // "http://172.20.14.86:8000"
            changeOrigin: true,
            configure: (proxy, options) => {
               // proxy 是 'http-proxy' 的实例
               proxy.on("proxyReq", proxyRequestLog);
            }
         },
         "/permission/login/": {
            target: "http://172.20.80.12:8888",
            changeOrigin: true,
            configure: (proxy, options) => {
               proxy.on("proxyReq", proxyRequestLog);
            },
            rewrite: (path) => path.replace(/^\/permission\/login/, "")
         },
         "/permission/sys/": {
            target: "http://172.20.80.12:8001",
            configure: (proxy, options) => {
               proxy.on("proxyReq", proxyRequestLog);
            },
            rewrite: (path) => path.replace(/^\/permission\/sys/, "")
         },
         "/socket.io": {
            target: "ws://localhost:3000",
            ws: true
         }
      }
   },
   build: {
      reportCompressedSize: false
   }
});

// 注册全局环境变量
import randomKey from "./src/Utils/RandomKey";
(import.meta as unknown as { env: Record<string, string> }).env = {
   AESKEY: randomKey.getKey(64),
   AESIV: randomKey.getKey(32)
};
