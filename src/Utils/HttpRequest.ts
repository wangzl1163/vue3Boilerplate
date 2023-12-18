import axios from "axios";
import { useTokenStore, useUserStore } from "@/Stores";
import exception from "@/Utils/Exceptions";
import loadingBar from "@/Plugins/LoadingBar/Index.js";

import type { AxiosRequestConfig } from "axios";

const successCodes = [200, 0, '200'];
const queue401 = [];
let hideError = false;
let controller = new AbortController();
let postRequestList: string[{ url: string, data: string }] = [];

// 创建axios实例
const http = axios.create({
   baseURL: import.meta.env.VITE_BASE_API, // api的base_url
   timeout: 60000 * 3 // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
   (config) => {
      // 设置请求可取消
      config.signal = controller.signal;

      if (!config.headers?.noLoading) {
         loadingBar.start();
      }

      const tokenStore = useTokenStore();
      if (tokenStore.token && !config.headers?.Authorization) {
         config.headers!.Authorization = "Bearer " + tokenStore.token;
      }

      // 在 option 中配置 data 对象
      if (config.data && config.data.hideError) {
         hideError = true;
      } else {
         hideError = false;
      }

      return config;
   },
   (err) => {
      if (hideError) {
         loadingBar.error();
      } else {
         exception(-9999);
      }
      return Promise.reject(err);
   }
);

// 响应拦截器
http.interceptors.response.use(
   (response) => {
      // 过滤文件流格式
      if (
         response.headers["content-type"] === "application/octet-stream" ||
         response.headers["content-type"] === "image/Jpeg"
      ) {
         loadingBar.finish();
         return Promise.resolve(response.data);
      }

      if (successCodes.includes(response.data.code)) {
         if (response.data.message) {
            const { monitor_data } = response.data.message;
            if (monitor_data) {
               const mockObj = response.config.url?.includes("_range")
                  ? { values: [] }
                  : { value: ["", ""] };
               response.data.message.result =
                  monitor_data.data.result === null ||
                     monitor_data.data.result.length === 0
                     ? [mockObj]
                     : monitor_data.data.result;
            }
         }

         loadingBar.finish();
         return Promise.resolve(response.data);
      } else {
         if (hideError) {
            loadingBar.error();
         } else {
            exception(
               response.data.code,
               response.data.errMsg || response.data.message
            );
         }

         const errorData = {
            ...response,
            errorUrl: response.request.responseURL
         };

         return Promise.reject(errorData);
      }
   },
   (err) => {
      // 主动取消请求，不做提示
      if (hideError || err.message === "canceled") {
         loadingBar.error();
      } else {
         loadingBar.finish();

         if (err.response) {
            if (err.response.status === 401) {
               queue401.push(err.response);
               // 多个接口同时请求，只提示一次登录过期
               if (queue401.length === 1) {
                  exception(
                     err.response.status,
                     err.response.data.message ||
                     err.response.data.errMsg ||
                     "登录信息已过期"
                  );

                  useUserStore().reset();

                  if (!location.href.includes("/login")) {
                     location.href = "/login";
                  }
               }
            } else {
               exception(
                  err.response.status,
                  err.response.data.errMsg || err.response.data.message || ""
               );
            }
         } else {
            exception(-504, "");
         }
      }

      const errorData = {
         config: err.config,
         data: err.response.data,
         errorUrl: err.config ? err.config.url : "",
         ...err
      };

      return Promise.reject(errorData);
   }
);

/**
 * http请求
 * @param {url} 请求地址
 * @param {data} 请求数据
 * @param {type} 请求类型 GET POST,默认值：GET
 * @param {options} 请求配置
 */
class Request {
   private url: string;
   private type: string | undefined;
   private data: {
      [key: string]: Record<string, string>;
   };
   private options: Record<string, string> | undefined;
   constructor() {
      this.url = "";
      this.data = {};
   }
   $ajax(url: string, data = {}, { type = "GET", options = {} } = {}) {
      this.url = url;
      this.type = type.toLocaleUpperCase().trim();
      this.data = this.type === "GET" ? { params: data } : data;
      this.options = options;

      switch (this.type) {
         case "GET": {
            return new Promise((resolve, reject) => {
               const config = Object.assign(this.data, this.options);
               http
                  .get(this.url, config)
                  .then((response) => {
                     // 图片
                     if (response instanceof Blob) {
                        return resolve(response);
                     }

                     return resolve(response);
                  })
                  .catch((err) => {
                     log(err);
                     return reject(err);
                  });
            });
         }
         case "POST": {
            return new Promise((resolve, reject) => {
               if (!this.url.includes("login")) {
                  const dataJson = JSON.stringify(this.data);
                  if (postRequestList.find((pd) => pd.url === this.url && pd === dataJson)) {
                     exception(undefined, '请不要提交重复的数据');
                     return reject({ message: '请不要提交重复的数据' });
                  }
                  postRequestList.push({ url: this.url, data: dataJson });
               }

               http
                  .post(this.url, this.data, this.options)
                  .then((response) => {
                     // blob类型
                     if (response instanceof Blob) {
                        return resolve(response);
                     }

                     return resolve(response);
                  })
                  .catch((err) => {
                     postRequestList = postRequestList.filter((pd) => pd.url !== err.config.url || pd.data !== err.config.data);

                     log(err);

                     return reject(err);
                  });
            });
         }
         case "PUT": {
            return new Promise((resolve, reject) => {
               http
                  .put(this.url, this.data, this.options)
                  .then((response) => {
                     return resolve(response);
                  })
                  .catch((err) => {
                     log(err);
                     return reject(err);
                  });
            });
         }
         case "DELETE": {
            return new Promise((resolve, reject) => {
               http
                  .delete(this.url, this.options)
                  .then((response) => {
                     return resolve(response);
                  })
                  .catch((err) => {
                     log(err);
                     return reject(err);
                  });
            });
         }
      }

      function log(err: {
         message: string;
         errorUrl: string;
         config: AxiosRequestConfig;
         data: Record<string, string>;
      }) {
         if (err.message === "canceled") {
            return console.warn("尚未完成的 http 请求已取消: ", err.message);
         }

         console.group("%c http 请求错误：", "color:red;");

         const keys = Object.keys(err);
         if (keys.length > 0) {
            console.log(
               "%c地址：",
               "font-family:PingFang SC, Microsoft YaHei;",
               err.errorUrl
            );
            console.log(
               "%c方式：",
               "font-family:PingFang SC, Microsoft YaHei;",
               err.config.method
            );
            console.log(
               "%c参数：",
               "font-family:PingFang SC, Microsoft YaHei;",
               err.config.params
            );
            console.log(
               "%c结果：",
               "font-family:PingFang SC, Microsoft YaHei;",
               err.data
            );
            console.log(
               "%c详细信息：",
               "font-family:PingFang SC, Microsoft YaHei;",
               err
            );
         } else {
            console.log(
               `%c error:`,
               "font-family:PingFang SC, Microsoft YaHei;",
               err
            );
         }
         console.groupEnd();
      }
   }

   $http() {
      return http;
   }

   $get(url: string, data = {}, options = {}) {
      return this.$ajax(url, data, { options: options });
   }

   $post(url: string, data = {}, options = {}) {
      return this.$ajax(url, data, { type: "POST", options: options });
   }

   $put(url: string, data = {}, options = {}) {
      return this.$ajax(url, data, { type: "PUT", options: options });
   }

   $delete(url: string, options = {}) {
      return this.$ajax(url, {}, { type: "DELETE", options: options });
   }

   $abort() {
      // 取消尚未完成的请求
      controller.abort();

      // 重置 controller 防止新请求无法发出
      controller = new AbortController();
   }

   $clearPostData() {
      postDataList = [];
   }
}

export default new Request();
