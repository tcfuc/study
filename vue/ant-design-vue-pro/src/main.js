import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入UI组件
import { Button, Layout, Icon, Drawer, Radio, Menu, Form, Input, Select, ConfigProvider, Dropdown, DatePicker } from "ant-design-vue";
// 引入权限组件
import Authorized from "./components/Authorized"
// 注册权限指令
import Auth from "./directives/auth";
// 引入封装请求
import request from "./utils/request";
// 引入国际化
import VueI18n from "vue-i18n";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
// 获取地址栏信息
import queryString from "query-string";
// 引入高亮插件
import VueHighlightjs from "vue-highlightjs";


Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(ConfigProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

Vue.component("IconFont", IconFont);
Vue.component('Authorized', Authorized);

Vue.use(Auth);
Vue.use(VueHighlightjs);
Vue.use(VueI18n);
// 在后
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || 'zhCN',
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});


Vue.prototype.$request = request;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
