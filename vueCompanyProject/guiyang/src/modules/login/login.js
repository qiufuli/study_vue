/**
 * ###### Fri Jul 14 09:43:39 CST 2017
 * @name 登录模块入口文件
 * @description 登录模块入口的文件
 * @author jinglf000
 *
 */
import Vue from 'vue';
import 'babel-polyfill';
import ElementUI from 'element-ui';
/* eslint-disable */
import '@theme/index.css';
import login from './login.vue';
import '@/styles/s1/css/common.css';

Vue.use(ElementUI);
/* eslint-disable  no-new */
new Vue({
	el: '#login',
	template: '<login/>',
	components: { login }
});
