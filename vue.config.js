/** @format */

const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const projectName = "pigeon-flow-form";
// const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';
const BASE_URL = process.env.NODE_ENV === "production" ? "/" + projectName + "/" : "/" + projectName + "/";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 配置全局样式变量
      }
    }
  },
  outputDir: projectName,
  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: (config) => {
    // 配置入口( 兼容 es6 es7 )
    config.entry.app = ["@babel/polyfill", "./src/main.js"];
    // 别名
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("assets", resolve("src/assets"))
      .set("mock", resolve("src/mock"))
      .set("utils", resolve("src/utils"))
      .set("api", resolve("src/api"));
  },
  configureWebpack: (config) => {
    //警告 webpack 的性能提示 关闭文件大小的警告
    config.performance = {
      hints: false
    };
    config.optimization = {
      splitChunks: {
        chunks: "all", // 同步 异步 都采用代码分割
        minSize: 30000, // 30kib 引入的库大于 30000  才会做代码分割
        minChunks: 1, // 当某个模块至少被引用1次时，才做代码分割
        maxAsyncRequests: 5, // 同时加载模块的个数
        maxInitialRequests: 3, //首页入口文件 最多同时加载3个
        automaticNameDelimiter: "~", // 连接符
        name: true,
        cacheGroups: {
          // 同步代码继续执行
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 同步 引入的库是否在 node_modules中
            priority: -10 // 值越大，优先级就越高
            // filename: 'vendors.js' // 放开报错，原因未知
          },
          default: {
            priority: -20,
            reuseExistingChunk: true // 当一个模块之前引用过，再次使用时可以直接复用
            // filename: 'common.js'
          }
        }
      }
    };
  },
  // node_modules 下babel转义
  // transpileDependencies: [],
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    // proxy: 'http://localhost:9527'
  }
};
