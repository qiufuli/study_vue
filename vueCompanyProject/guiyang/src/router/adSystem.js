/**
 * ###### 2017年8月19日 13:16:53
 * @name advertisingRouter&SystemRouter
 * @description 广告管理和系统管理的路由添加
 * @author Shj
 *
 */

// advertising业务（广告管理）单独打包成一个'group-ad' js包，用于异步对应的路由
/* eslint-disable global-require */
const adReady = r => require.ensure([], () => r(require('@/views/ad/ready')), 'group-ad');
const adFinished = r => require.ensure([], () => r(require('@/views/ad/finished')), 'group-ad');

// system业务（系统管理）单独打包成一个'group-system' js包，用于异步对应的路由
const sysLog = r => require.ensure([], () => r(require('@/views/system/log')), 'group-system');
const sysFriendLink = r => require.ensure([], () => r(require('@/views/system/friendlink')), 'group-system');
const sysParams = r => require.ensure([], () => r(require('@/views/system/params')), 'group-system');
const sysHotJob = r => require.ensure([], () => r(require('@/views/system/hotjob')), 'group-system');
const sysSalaryLow = r => require.ensure([], () => r(require('@/views/system/salary')), 'group-system');
const sysPersonWeiHu = r => require.ensure([], () => r(require('@/views/system/personWeiHu')), 'group-system');
const sysAnnounce = r => require.ensure([], () => r(require('@/views/system/announce')), 'group-system');
const jobApprove = r => require.ensure([], () => r(require('@/views/system/jobapprove')), 'group-system');
const comApprove = r => require.ensure([], () => r(require('@/views/system/comapprove')), 'group-system');
const comRecord = r => require.ensure([], () => r(require('@/views/system/comRecord')), 'group-system');
const comAppRecord = r => require.ensure([], () => r(require('@/views/system/comAppRecord')), 'group-system');
const jobRecord = r => require.ensure([], () => r(require('@/views/system/jobRecord')), 'group-system');
const jobAppRecord = r => require.ensure([], () => r(require('@/views/system/jobAppRecord')), 'group-system');
// advertising router
const adRouters = [
	{
		path: '/ad/ready',
		name: 'adReady',
		meta: {
			tabName: '待处理广告'
		},
		component: adReady
	},
	{
		path: '/ad/finished',
		name: 'adFinished',
		meta: {
			tabName: '广告管理'
		},
		component: adFinished
	}
];

// system router
const systemRouters = [
	{
		path: '/system/log',
		name: 'sysLog',
		meta: {
			tabName: '操作日志'
		},
		component: sysLog
	},
	{
		path: '/system/friendlink',
		name: 'sysFriendLink',
		meta: {
			tabName: '友情链接'
		},
		component: sysFriendLink
	},
	{
		path: '/system/params',
		name: 'sysParams',
		meta: {
			tabName: '系统参数'
		},
		component: sysParams
	},
	{
		path: '/system/hotjob',
		name: 'sysHotJob',
		meta: {
			tabName: '热门职位'
		},
		component: sysHotJob
	},
	{
		path: '/system/salary',
		name: 'sysSalaryLow',
		meta: {
			tabName: '最低工资标准'
		},
		component: sysSalaryLow
	},
	{
		path: '/system/person',
		name: 'sysPersonWeiHu',
		meta: {
			tabName: '人才数据维护'
		},
		component: sysPersonWeiHu
	},
	{
		path: '/system/announce',
		name: 'sysAnnounce',
		meta: {
			tabName: '通知公告'
		},
		component: sysAnnounce
	},
	{
		path: '/system/jobapprove',
		name: 'jobApprove',
		meta: {
			tabName: '职位审批拒绝原因'
		},
		component: jobApprove
	},
	{
		path: '/system/comapprove',
		name: 'comApprove',
		meta: {
			tabName: '单位审批拒绝原因'
		},
		component: comApprove
	},
	{
		path: '/system/comRecord',
		name: 'comRecord',
		meta: {
			tabName: '单位录入记录'
		},
		component: comRecord
	},
	{
		path: '/system/comAppRecord',
		name: 'comAppRecord',
		meta: {
			tabName: '单位审核记录'
		},
		component: comAppRecord
	},
	{
		path: '/system/jobRecord',
		name: 'jobRecord',
		meta: {
			tabName: '职位录入记录'
		},
		component: jobRecord
	},
	{
		path: '/system/jobAppRecord',
		name: 'jobAppRecord',
		meta: {
			tabName: '职位审核记录'
		},
		component: jobAppRecord
	}
];

export default adRouters.concat(systemRouters);
