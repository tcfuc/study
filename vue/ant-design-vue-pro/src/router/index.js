import Vue from "vue";
import VueRouter from "vue-router";
// 加载动画
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// lodash
import findLast from "lodash/findLast";
// 权限
import { check, isLogin } from "../utils/auth";
// 通知提醒框
import { Notification } from "ant-design-vue";

import NotFound from "../views/404";
import Forbidden from "../views/403";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      // user
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
    ]
  },
  {
    path: "/",
    meta: { authority: ['admin', 'user', 'guest'] },
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      // dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"),
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ['admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () => import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分步表单" },
            hideChildrenInMenu: true,
            component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Index"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"),
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: '/user/login'
      })
    } else if (to.path !== "/403") {
      Notification["error"]({
        message: '403',
        description:
          '你没有权限访问，请联系管理员咨询。',
      });
      next({
        path: '/403'
      })
    }
    NProgress.done();
  }
  next();
})

router.afterEach(() => {
  NProgress.done();
})

// vue-router在3.0版本以上重复导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;
