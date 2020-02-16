/**
 * ###### Thu Aug 24 15:52:34 CST 2017
 * @name businessRoute
 * @author jinglf000
 * @description 业务办理路由
 *
 */

 /* eslint-disable global-require */
const BussRecruit = r => require.ensure([], () => r(require('@/views/business/recruit')), 'group-bussiness');
const BussCashier = r => require.ensure([], () => r(require('@/views/business/cashier')), 'group-bussiness');
const BussXianChang = r => require.ensure([], () => r(require('@/views/business/printXianChang')), 'group-bussiness');
const BussIntroduction = r => require.ensure([], () => r(require('@/views/business/introduction')), 'group-bussiness');
const BussWeituoJob = r => require.ensure([], () => r(require('@/views/business/weiTuoJob')), 'group-bussiness');
const BussXianChangJob = r => require.ensure([], () => r(require('@/views/business/xianChangJob')), 'group-bussiness');

const bussJobList = r => require.ensure([], () => r(require('@/views/business/jobList')), 'group-bussiness');
const bussJobModelDetail = r => require.ensure([], () => r(require('@/views/business/jobModelDetail')), 'group-bussiness');
const bussJobPubDetail = r => require.ensure([], () => r(require('@/views/business/jobPubDetail')), 'group-bussiness');

const BussWeiTuo = r => require.ensure([], () => r(require('@/views/business/printWeiTuo')), 'group-bussiness');
const BussCheckIn = r => require.ensure([], () => r(require('@/views/business/checkIn')), 'group-bussiness');
const AddCompany = r => require.ensure([], () => r(require('@/views/business/addCompany')), 'group-bussiness');

const BussRouter = [
	{
		path: '/business/recruit',
		name: 'bussCruit',
		meta: {
			tabName: '招聘办理'
		},
		component: BussRecruit
	},
	{
		path: '/business/joblist',
		name: 'bussJobList',
		meta: {
			tabName: '查询职位',
			noTabs: true,
			parentRoute: 'bussCruit'
		},
		component: bussJobList
	},
	{
		path: '/business/addCompany',
		name: 'addCompany',
		meta: {
			tabName: '添加单位',
			noTabs: true,
			parentRoute: 'bussCruit'
		},
		component: AddCompany
	},
	{
		path: '/business/cashier',
		name: 'bussCashier',
		meta: {
			tabName: '收银管理'
		},
		component: BussCashier
	},
	{
		path: '/business/xianchang',
		name: 'bussXianChang',
		meta: {
			tabName: '现场招聘海报打印'
		},
		component: BussXianChang
	},
	{
		path: '/business/xianchangjob',
		name: 'bussXianChangJob',
		meta: {
			tabName: '现场职位录入',
			noTabs: true,
			parentRoute: 'bussXianChang'
		},
		component: BussXianChangJob
	},
	{
		path: '/business/weituo',
		name: 'bussWeiTuo',
		meta: {
			tabName: '委托招聘海报打印'
		},
		component: BussWeiTuo
	},
	{
		path: '/business/weituojob',
		name: 'bussWeituoJob',
		meta: {
			tabName: '委托职位录入',
			noTabs: true,
			parentRoute: 'bussWeiTuo'
		},
		component: BussWeituoJob
	},
	{
		path: '/business/introduction',
		name: 'bussIntroduction',
		meta: {
			tabName: '简介录入',
			noTabs: true,
			parentRoute: 'bussXianChang, bussWeiTuo'
		},
		component: BussIntroduction
	},
	{
		path: '/business/jobmodeldetail',
		name: 'bussJobModelDetail',
		meta: {
			tabName: '职位模板详情',
			noTabs: true,
			parentRoute: 'bussXianChangJob, bussWeituoJob'
		},
		component: bussJobModelDetail
	},
	{
		path: '/business/jobpubdetail',
		name: 'bussJobPubDetail',
		meta: {
			tabName: '已发布职位详情',
			noTabs: true,
			parentRoute: 'bussXianChangJob, bussWeituoJob'
		},
		component: bussJobPubDetail
	},
	{
		path: '/business/checkin',
		name: 'bussCheckin',
		meta: {
			tabName: '现场招聘签到'
		},
		component: BussCheckIn
	}
];

export default BussRouter;
