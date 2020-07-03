/**
 * /* eslint-disable no-control-regex
 *
 * @format
 */

/**
 * /*
 * 截取字符串 兼容汉字和英文
 *
 * @format
 */

export function subStr(str, n) {
  var r = /[^\x00-\xff]/g;
  if (str.replace(r, "mm").length <= n) {
    return str;
  }
  // var m=Math.floor(n/2);
  for (var i = n; i < str.length; i++) {
    if (str.substr(0, i).replace(r, "mm").length >= n) {
      return str.substr(0, i) + '<i class="dian">...</i>';
    }
  }
  return str;
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const Debounce = (func, wait = 500, immediate = true) => {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
};

/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function() {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};

/* 格式化时间戳
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 时间戳转化为几天几分几秒 time 时间戳
export const formatTimeStamp = (time) => {
  if (!time) {
    return;
  }
  let days = parseInt(time / (1000 * 60 * 60 * 24));
  let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = ((time % (1000 * 60)) / 1000).toFixed(0);
  days = days ? days + " 天 " : "";
  hours = hours ? hours + " 小时 " : "";
  minutes = minutes ? minutes + " 分钟 " : "";
  seconds = seconds ? seconds + " 秒" : "";

  return days + hours + minutes + seconds;
};

/**
 * 使用a标签下载一个文件
 * @param {} url  下载文件的路径
 */
export const createIFrameDownLoad = (url) => {
  const iframeDom = document.createElement("iframe");
  iframeDom.style.zIndex = -100;
  iframeDom.style.position = "fixed";
  document.body.insertBefore(iframeDom, document.body.children[0]);
  const iframeWin = iframeDom.contentWindow; // 1.获取iframe中的window
  const iframeDocs = iframeWin.document; // 2.获取iframe中的document
  iframeDocs.write(`<!doctype html>`);
  iframeDocs.write(`
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <a href="${url}"  target="_self" id="downLoad"></a>
        </body>
        </html>
      `);
  const a = iframeDocs.querySelector("#downLoad");
  a.click();
  setTimeout(() => {
    document.body.removeChild(iframeDom);
  }, 1500);
};

/**
 * a 标签下载
 * 文件流的形式 blob
 * res 后台返回的文件流
 * file 当前文件
 */
export const createFileDown = (res, file) => {
  if (!res) {
    throw new Error("获取的文件流为空");
  }
  console.log(res);
  const content = res;
  const blob = new Blob([content]);
  const fileName = file.name || file;
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};

/*
    验证姓名 纯中文、纯字母、中文+字母、字母+中文
  */

export const checkName = (name) => {
  if (!name) {
    return "";
  }
  let reg = /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|([A-Za-z]))+$/g;
  return reg.test(name);
};

/**
 *证件号码 数字 数字+字母 字母+数字
 * ?![0-9] 查找后边（右边）不是纯数字
 * ？![a-zA-Z] 查找右边（后右边） 不是纯字母
 */

export const checkIcd = (num) => {
  if (!num) {
    return "";
  }
  // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+/g; 数字+字母  [\u4e00-\u9fa5]
  let reg = /^(?![a-zA-Z]+$)[0-9A-Za-z]+$/g;
  return reg.test(num);
};

//深拷贝
export const DeepClone = (data) => {
  var type = Object.prototype.toString.call(data);
  var obj;
  if (type === "[object Array]") {
    obj = [];
  } else if (type === "[object Object]") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "[object Array]") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(DeepClone(data[i]));
    }
  } else if (type === "[object Object]") {
    for (var key in data) {
      obj[key] = DeepClone(data[key]);
    }
  }
  return obj;
};
