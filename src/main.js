import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from '@/utils/request'
import App from "./App.vue";
import router from "./router";
import address from "@/utils/address";
import store from './store'
import "./utils/rem.js";


Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$axios = request // ajax请求方法
Vue.prototype.$url = address

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");