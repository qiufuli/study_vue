import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import '@/common/scss/index.scss';
import $alert from '@/base/alert/index';
import $toast from '@/base/toast/index';
import $confirm from '@/base/confirm/index';
import loading from '@/base/loading/index';

import App from './App';
import router from './router';

fastclick.attach(document.body);
Vue.config.productionTip = false;

// 定义alert 组件
Vue.prototype.$alert = $alert;
Vue.prototype.$toast = $toast;
Vue.prototype.$confirm = $confirm;
Vue.use(loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
