/** @format */

import axios from "axios";
import config from "./config";
import Vue from "vue";
let vm = new Vue();
// 请求次数
let repeat_count = 0;

import router from "../router";

//数据解密
// eslint-disable-next-line
// import {decryptRAS, decodeAesString} from '@/utils/CryptoJS.js';

import store from "@/store";

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    });

    // request 拦截器
    instance.interceptors.request.use(
      (config) => {
        // 设置accessToken
        if (!config.headers["Pigeon-Token"]) {
          config.headers["Pigeon-Token"] = store.state.accessToken ? store.state.accessToken : null;
        }
        return config;
      },

      (error) => {
        // 请求错误时
        console.log(error);
        // 1. 判断请求超时
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
          // return instance.request(originalRequest);// 再重复请求一次
        }
        vm.$message.error(error.message);
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        // 返回数据先解密
        // data.k判断后端返回的数据是否加密;
        // if (data.k) {
        //   data = JSON.parse(decodeAesString(data.d, decryptRAS(data.k)));
        // }
        const headers = response.headers;
        // 文件下载响应的文件流
        if (headers["content-type"] && headers["content-type"].indexOf("application/octet-stream") > -1) {
          return response.data;
        }
        // 根据返回的code值来做不同的处理
        if (data.code == 200) {
          return data;
        } else if (data.code == 403) {
          // 无权限
          // 无权限
          // vm.$message.error(data.msg);
        } else if (data.code == 401) {
          // accessToken过期
          // 重新在请求一次
          return instance({
            url: "/refreshToken",
            method: "get",
            params: {
              refreshToken: store.state.refreshToken ? store.state.refreshToken : null
            }
          })
            .then((res) => {
              if (res && res.code == 200) {
                // 新的token
                store.commit("setAccessToken", res.data.access_token);
                // 重新在请求之前的接口
                return instance(options)
                  .then((res) => {
                    resolve(res);
                    return false;
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                // code 不是200 即refreshToken 过期
                window.clearVuexAlong(true, true);
                router.push("/login");
              }
              // return false;
            })
            .catch((error) => {
              reject(error);
            });
        }
        vm.$message.error(data.msg);
      },
      (err) => {
        var error = JSON.parse(JSON.stringify(err));
        if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
          // return instance.request(originalRequest); // 再重复请求一次
          // 请求处理
          repeat_count++;
          if (repeat_count > config.retry) {
            repeat_count = 0;
            return;
          }
          // 重新在请求一次
          return instance(options)
            .then((res) => {
              resolve(res);
              return false;
            })
            .catch((error) => {
              reject(error);
            });
        }
        err.response && vm.$message.error(err.response.data.msg);
        return Promise.reject(err);
      }
    );

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}
