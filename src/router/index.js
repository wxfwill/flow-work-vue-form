/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import From from "../views/form/testForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "from",
    component: From
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/customize-form",
    name: "自定义表单",
    meta: {
      type: "form"
    },
    component: () => import(/*webpackChunkName: "businessForm" */ "../views/form/customizeForm/index")
  },
  {
    path: "/text-form",
    name: "测试表单",
    component: () => import(/*webpackChunkName: "test-form" */ "../views/form/testForm.vue")
  }
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes
// });

export default routes;
