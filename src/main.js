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
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(localStorage.getItem('token')){ //判断本地是否存在access_token
      next();
    }else {
     if(to.path === '/login'){
        next();
      }else {
        next({
          path:'/login'
        })
      }
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/login"){
    if(localStorage.getItem('token')){
      next({
        path:'./skyblade'
      });
    }else {
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");