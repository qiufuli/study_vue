/**
 * ###### Tue Jul 18 11:08:44 CST 2017
 * @name approvalAndCustomerRouter
 * @description 审批管理和客户管理路由
 * @author jinglf000
 *
 */

// approval业务（审批管理）单独打包成一个'group-approval' js包，用于异步对应的路由
/* eslint-disable global-require */
const AppCompany = r => require.ensure([], () => r(require('@/views/approval/company')), 'group-approval');
const AppDomain = r => require.ensure([], () => r(require('@/views/approval/domain')), 'group-approval');
const AppJob = r => require.ensure([], () => r(require('@/views/approval/job')), 'group-approval');
const AppCompanyDetail = r => require.ensure([], () => r(require('@/views/approval/companyDetail')), 'group-approval');
const AppJobDetail = r => require.ensure([], () => r(require('@/views/approval/jobDetail')), 'group-approval');
const AppComReview = r => require.ensure([], () => r(require('@/views/approval/comReview')), 'group-approval');
const AppJobReview = r => require.ensure([], () => r(require('@/views/approval/jobReview')), 'group-approval');
const AppComReDetail = r => require.ensure([], () => r(require('@/views/approval/comReDetail')), 'group-approval');
const AppJobReDetail = r => require.ensure([], () => r(require('@/views/approval/jobReDetail')), 'group-approval');

// customer业务（客户管理）单独打包成一个'group-customer'
const cusCompany = r => require.ensure([], () => r(require('@/views/customer/company')), 'group-customer');
const cusCompanyDetail = r => require.ensure([], () => r(require('@/views/customer/companyDetail')), 'group-customer');
const cusPersonal = r => require.ensure([], () => r(require('@/views/customer/personal')), 'group-customer');
const cusPersonalDetail = r => require.ensure([], () => r(require('@/views/customer/personalDetail')), 'group-customer');
const cusPerResume = r => require.ensure([], () => r(require('@/views/customer/resume')), 'group-customer');

// approval router
const appRouters = [
	{
		path: '/approval/company',
		name: 'appCompany',
		meta: {
			tabName: '单位审批'
		},
		component: AppCompany
	},
	{
		path: '/approval/companyDetail',
		name: 'appCompanyDetail',
		meta: {
			tabName: '单位详情',
			noTabs: true,
			parentRoute: 'appCompany'
		},
		component: AppCompanyDetail
	},
	{
		path: '/approval/comReview',
		name: 'appComReview',
		meta: {
			tabName: '单位复审'
		},
		component: AppComReview
	},
	{
		path: '/approval/comReDetail',
		name: 'appComReDetail',
		meta: {
			tabName: '单位复审详情',
			noTabs: true,
			parentRoute: 'appComReview'
		},
		component: AppComReDetail
	},
	{
		path: '/approval/domain',
		name: 'appDomain',
		meta: {
			tabName: '域名审批'
		},
		component: AppDomain
	},
	{
		path: '/approval/job',
		name: 'appJob',
		meta: {
			tabName: '职位审批'
		},
		component: AppJob
	},
	{
		path: '/approval/jobDetail',
		name: 'appJobDetail',
		meta: {
			tabName: '职位详情',
			noTabs: true,
			parentRoute: 'appJob'
		},
		component: AppJobDetail
	},
	{
		path: '/approval/jobReview',
		name: 'appJobReview',
		meta: {
			tabName: '职位复审'
		},
		component: AppJobReview
	},
	{
		path: '/approval/jobReDetail',
		name: 'appJobReDetail',
		meta: {
			tabName: '职位复审详情',
			noTabs: true,
			parentRoute: 'appJobReview'
		},
		component: AppJobReDetail
	}
];
// customer router
const cusRouters = [
	{
		path: '/customer/company',
		name: 'cusCompany',
		meta: {
			tabName: '单位客户管理'
		},
		component: cusCompany
	},
	{
		// 为了实现嵌套子路由的功能，子路由上添加notabs，parentRoute
		path: '/customer/companyDetail',
		name: 'cusCompanyDetail',
		meta: {
			tabName: '单位客户详情',
			noTabs: true,
			parentRoute: 'cusCompany'
		},
		component: cusCompanyDetail
	},
	{
		path: '/customer/personal',
		name: 'cusPersonal',
		meta: {
			tabName: '个人客户管理'
		},
		component: cusPersonal
	},
	{
		path: '/customer/personalDetail',
		name: 'cusPersonalDetail',
		meta: {
			tabName: '个人客户详情',
			noTabs: true,
			parentRoute: 'cusPersonal'
		},
		component: cusPersonalDetail
	},
	{
		path: '/customer/personalDetail/resume',
		name: 'cusPerResume',
		meta: {
			tabName: '个人简历详情',
			noTabs: true,
			parentRoute: 'cusPersonalDetail'
		},
		component: cusPerResume
	}
];

export default appRouters.concat(cusRouters);
