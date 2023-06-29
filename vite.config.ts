/*
 * @Description  : vite config
 * @Author       : 王占领
 * @Date         : 2022-02-23 10:33:12
 * @LastEditTime: 2022-12-29 14:22:43
 * @LastEditors: 王占领
 */

import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import AutoImportPlugin from "unplugin-auto-import/vite";
import { defineConfig, HttpProxy, splitVendorChunkPlugin } from "vite";
import checkerPlugin from "vite-plugin-checker";
import compressionPlugin from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import removeConsolePlugin from "vite-plugin-remove-console";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueSetupExtendPlugin from "vite-plugin-vue-setup-extend";
import gojsHackPlugin from "./plugins/GojsHack";

import type { ClientRequest, IncomingMessage, ServerResponse } from "http";
import type { PluginOption } from "vite";

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

// https://cn.vitejs.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src")
      }
   },
   plugins: [
      vue(), // 官方插件，用于支持 Vue 的单文件组件写法即支持 .vue 格式的文件
      vueJsx({}), // 官方插件，用于支持 Vue 组件中的 JSX 语法
      splitVendorChunkPlugin(), // 官方插件，用于支持分割代码文件块
      vueSetupExtendPlugin(), // 支持 script setup 语法下把组件的 name 写在 script 标签上
      // 支持生成 js、css 文件的 gzip 压缩文件
      compressionPlugin({
         ext: ".gz",
         deleteOriginFile: false
      }),
      // 支持 svg 文件作为图标
      createSvgIconsPlugin({
         // 配置svg文件所在的文件路径
         iconDirs: [path.resolve(__dirname, "src/Assets/Icons/svg")],
         symbolId: "icon-[dir]-[name]"
      }),
      // 支持在 Vite 中使用 ESlint
      eslintPlugin({
         eslintOptions: {
            fix: true,
            cache: false
         }
      }),
      gojsHackPlugin(),
      // 支持实时类型检查并将错误呈现在页面中
      checkerPlugin({
         typescript: true,
         enableBuild: false,
         overlay: { initialIsOpen: false }
      }),
      removeConsolePlugin(), // 支持构建时删除 console 输出
      ViteImageOptimizer() as unknown as PluginOption, // 支持压缩 svg 和各种图片
      // 支持自动导入模块，在需要使用某模块时不需要再手动导入
      AutoImportPlugin({
         // 默认支持的文件格式为：.ts, .tsx, .js, .jsx, .vue
         dirs: ["./src/Composables"], // ./src/Composables/** 写法：如果 Composables 下存在文件夹会搜索其下的文件夹中的模块即支持文件夹嵌套
         dts: true,
         eslintrc: {
            enabled: true // <-- this
         },
         imports: [
            "vue",
            "vue-router",
            {
               "@vueuse/core": ["useInterval"]
            },
            "pinia"
         ],
         vueTemplate: true
      })
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
