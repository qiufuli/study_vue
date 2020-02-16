/**
 * ###### 2017-9-11 11:46:13
 * @name patchRouter
 * @description 人才派遣路由
 * @author shj
 *
 */

//  人才派遣 人才库
// 我的客户
/* eslint-disable global-require */
const PatchMyClients = r => require.ensure([], () => r(require('@/views/patch/myClients')), 'group-patch');
const TalentPool = r => require.ensure([], () => r(require('@/views/talentPool/greenCard')), 'group-patch');
const TalentPoDetail = r => require.ensure([], () => r(require('@/views/talentPool/talePoDetail')), 'group-patch');

const patchRouters = [
	{
		path: '/patch/myClients',
		name: 'patchMyClients',
		meta: {
			tabName: '我的客户'
		},
		component: PatchMyClients
	},
	{
		path: '/talentPool/greenCard',
		name: 'greenCard',
		meta: {
			tabName: '绿卡查询'
		},
		component: TalentPool
	},
	{
		path: '/talentPool/talePoDetail',
		name: 'talePoDetail',
		meta: {
			tabName: '添加/编辑绿卡',
			noTabs: true,
			parentRoute: 'greenCard'
		},
		component: TalentPoDetail
	}
];

export default patchRouters;
