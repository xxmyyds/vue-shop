import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
// 导入字体图标
import "./assets/fonts/iconfont.css";
// 导入全局样式表
import "./assets/css/global.css";
// 全局配置axios
import axios from "axios";
// 导入插件
import TreeTable from "vue-table-with-tree-grid";
// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// 导入富文本编辑器对应的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 导入Nprogress包对应的JS和CSS
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// 配置请求的根路径
axios.defaults.baseURL = "http://120.53.120.229:8888/api/private/v1/";
// 通过axios请求拦截器添加token 展示进度条   Nprogress.start();
axios.interceptors.request.use(config => {
  // 为请求头对象添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token");
  Nprogress.start();
  return config;
});
// 在response响应拦截器中设置隐藏进度条   Nprogress.done();
axios.interceptors.response.use(response => {
  Nprogress.done();
  return response;
});
// 将axios挂载到vue原型对象的$http属性上
Vue.prototype.$http = axios;
// 你运行的Vu是开发模式。为生产部署时，请确保启用生产模式
Vue.config.productionTip = false;
// 注册为全局可用组件
Vue.component("tree-table", TreeTable);
// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor);
// 注册一个全局的时间过滤器
Vue.filter("dateFormat", function(originval) {
  const dt = new Date(originval);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");
  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
