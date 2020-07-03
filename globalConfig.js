/** @format */

let globalConfig = {};

// console.log('当前运行模式' + process.env.VUE_APP_ENVIRONMENT);

globalConfig.localUrl = "http://172.20.6.237"; // 前端地址
globalConfig.baseUrl = "http://172.16.121.4:9527"; // 后台接口  测试 http://172.16.119.238/fdsc    http://172.16.121.4:9527   172.18.1.163

// if (process.env.VUE_APP_ENVIRONMENT === 'development') {
//   globalConfig.isProd = false; // 开发环境配置
//   globalConfig.localUrl = 'http://172.20.6.237'; // 前端地址
//   globalConfig.baseUrl = 'http://172.16.119.238/fdsc'; // 后台接口  测试 http://172.16.119.238/fdsc
//   // globalConfig.baseUrl = 'http://172.20.8.235:8082/fdsc'; // 后台接口  台式机 测试
//   // globalConfig.baseUrl = 'http://172.18.1.90:8082/fdsc'; // 后台接口  笔记本 开发 李成
// } else if (process.env.VUE_APP_ENVIRONMENT === 'test') {
//   globalConfig.isProd = true; // 测试环境走线上配置
//   globalConfig.localUrl = 'https://test8.hua-cloud.net:5483'; // 前端地址
//   globalConfig.baseUrl = 'https://test8.hua-cloud.net:5483/fdsc'; // 后台 172.16.119.238/fdsc  https://test8.hua-cloud.net:5483/fdsc
// } else if (process.env.VUE_APP_ENVIRONMENT === 'production') {
//   globalConfig.isProd = true; // 部署环境
//   globalConfig.localUrl = 'https://sya.jcy.gz.gov.cn'; // 前端地址
//   globalConfig.baseUrl = 'https://sya.jcy.gz.gov.cn/fdsc'; // 后台
// }

module.exports = globalConfig;
