/**
 * ###### Tue Jul 10 09:43:44 CST 2018
 * @name recruitSpreadRouter
 * @description 招聘推广路由
 * @author chenxue
 *
 */

// recruitSpread业务（招聘推广），用于异步对应的路由
/* eslint-disable global-require */
const BusinessType = r => require.ensure([], () => r(require('@/views/recruitSpread/businessType')), 'group-recruitSpread');
const KeyBusiness = r => require.ensure([], () => r(require('@/views/recruitSpread/keyBusiness')), 'group-recruitSpread');
const KeyCompany = r => require.ensure([], () => r(require('@/views/recruitSpread/keyCompany')), 'group-recruitSpread');
const UrgentJob = r => require.ensure([], () => r(require('@/views/recruitSpread/urgentJob')), 'group-recruitSpread');

// recruitSpread router
const recruitSpreadRouters = [
	{
		path: '/recruitSpread/businessType',
		name: 'businessType',
		meta: {
			tabName: '热门行业'
		},
		component: BusinessType
	},
	{
		path: '/recruitSpread/keyBusiness',
		name: 'keyBusiness',
		meta: {
			tabName: '热门企业'
		},
		component: KeyBusiness
	},
	{
		path: '/recruitSpread/keyCompany',
		name: 'keyCompany',
		meta: {
			tabName: '重点企业'
		},
		component: KeyCompany
	},
	{
		path: '/recruitSpread/urgentJob',
		name: 'urgentJob',
		meta: {
			tabName: '急需岗位'
		},
		component: UrgentJob
	}
];

export default recruitSpreadRouters;
