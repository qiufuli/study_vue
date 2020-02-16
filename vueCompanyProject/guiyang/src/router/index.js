/**
 * ###### Thu Jul 13 16:54:06 CST 2017
 * @name 项目路由
 * @description 项目中涉及到的所有的路由
 * @author jinglf000
 *
 */

// 引入 vue vue-router 和组件来配置路由
// 在router文件里配置所有的路由
// 根据不同的内容打包成不同的文件块
// 路由信息对象中要显式的标明，是否含有子路由 hasChilden,以保障功能的正确实现
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/index';
// import Login from '@/views/login';

import appCustomer from './appCustomer';// 审批和客户管理
import danganParty from './danganParty';// 流动人员档案和人事代理党委
import collegeNews from './collegeNews';// 大学生管理和新闻管理
import adSystem from './adSystem';// 广告管理和系统管理
import business from './business';// 业务管理
import patch from './patch';// 人才派遣
import examManagement from './examManagement';// 考试管理
import recruitSpread from './recruitSpread';// 招聘推广
import jobTraining from './jobTraining';// 职业培训
import responseRobot from './responseRobot';// 应答机器人
import Inform from './inform';// 应答机器人

/* eslint-disable global-require */
const Recruitment = r => require.ensure([], () => r(require('@/views/recruitment/recruit')), 'group-recruit');
const RecruitmentDetail = r => require.ensure([], () => r(require('@/views/recruitment/recruitDetail')), 'group-recruit');
const statistic = r => require.ensure([], () => r(require('@/views/statistic/statistic')), 'group-statistic');
const statement = r => require.ensure([], () => r(require('@/views/statistic/statisticDetail')), 'group-statistic');

Vue.use(Router);

// 预设login 登录模块用于处理 登录，多个命名视图使用 components
let routes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			tabName: '登录'
		},
		components: {
			login: ''
		}
	},
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		alias: '/',
		meta: {
			tabName: '首页'
		},
		name: 'index',
		component: Index
	},
	{
		path: '/recruit',
		name: 'recruit',
		meta: {
			tabName: '招聘会管理'
		},
		component: Recruitment
	},
	{
		path: '/recruitDetail',
		name: 'recruitmentDetail',
		meta: {
			tabName: '招聘会信息',
			noTabs: true,
			parentRoute: 'recruit'
		},
		component: RecruitmentDetail
	},
	{
		path: '/statistic',
		name: 'statistic',
		meta: {
			tabName: '统计分析'
		},
		component: statistic
	},
	{
		path: '/statistic/statement',
		name: 'statement',
		meta: {
			tabName: '统计分析详情',
			noTabs: true,
			parentRoute: 'statistic'
		},
		component: statement
	}
];
routes = routes.concat(appCustomer, danganParty, collegeNews, adSystem,
	business, patch, examManagement, recruitSpread, jobTraining, responseRobot, Inform);

// 可以使用children来配置嵌套路由
// 子路有不用设定'/'
// 同样可以使用编程的方式来实现路由跳转和跟路由跳转
export default new Router({
	routes
});

