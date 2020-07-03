import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import "./assets/css/reset.css";
import api from "./http/index.js";

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.use(api);

import dialog from "components/dialog/dialog.vue";
Vue.component("custom-dialog", dialog);

// 全局控制element元素尺寸
Vue.prototype.$ELEMENT = {size: "small", zIndex: 3000};

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
