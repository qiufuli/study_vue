import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import '@/common/scss/index.scss';
import vueLazyload from 'vue-lazyload';

// 自谋
// import Help from './zm/help';

// 灵活
import Help from './lh/help';


fastclick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable global-require */
Vue.use(vueLazyload, {
  loading: require('./common/loading.png')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Help),
});
