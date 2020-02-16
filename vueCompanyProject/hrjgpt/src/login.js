import Vue from "vue";
import Login from "./login/login.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: h => h(Login)
}).$mount("#login");
var env = process.env.NODE_ENV;
console.log(env);