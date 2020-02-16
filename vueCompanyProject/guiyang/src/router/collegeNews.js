/**
 * ###### Mon Aug 7 09:36:58 CST 2017
 * @name collegeAndNewsRouter
 * @desc 大学生就业和新闻管理路由
 * @author jinglf000
 */

// 大学生就业和新闻管理整合成一个group-colNews模块
/* eslint-disable global-require */
const CollegeBase = r => require.ensure([], () => r(require('@/views/college/jianxiBase')), 'group-colNews');
const CollegeBaseDetail = r => require.ensure([], () => r(require('@/views/college/jianxiBaseDetail')), 'group-colNews');
const CollegeManage = r => require.ensure([], () => r(require('@/views/college/manage')), 'group-colNews');
const CollegeManageDetail = r => require.ensure([], () => r(require('@/views/college/manageDetail')), 'group-colNews');
const CollegePeople = r => require.ensure([], () => r(require('@/views/college/people')), 'group-colNews');
const CollegePeopleDetail = r => require.ensure([], () => r(require('@/views/college/peopleDetail')), 'group-colNews');

/* eslint-disable global-require */
const NewsList = r => require.ensure([], () => r(require('@/views/news/list')), 'group-colNews');
const NewsDetail = r => require.ensure([], () => r(require('@/views/news/detailRich')), 'group-colNews');
const NewsType = r => require.ensure([], () => r(require('@/views/news/type')), 'group-colNews');
const NewsSync = r => require.ensure([], () => r(require('@/views/news/sync')), 'group-colNews');

const collegeRouters = [
	{
		path: '/college/base',
		name: 'collegeBase',
		meta: {
			tabName: '见习基地管理'
		},
		component: CollegeBase
	},
	{
		path: '/college/baseDetail',
		name: 'collegeBaseDetail',
		meta: {
			tabName: '见习基地(单位)信息',
			noTabs: true,
			parentRoute: 'collegeBase'
		},
		component: CollegeBaseDetail
	},
	{
		path: '/college/manage',
		name: 'collegeManage',
		meta: {
			tabName: '见习生派遣管理'
		},
		component: CollegeManage
	},
	{
		path: '/college/manageDetail',
		name: 'collegeManageDetail',
		meta: {
			tabName: '见习生派遣信息',
			noTabs: true,
			parentRoute: 'collegeManage'
		},
		component: CollegeManageDetail
	},
	{
		path: '/college/people',
		name: 'collegePeople',
		meta: {
			tabName: '见习生管理'
		},
		component: CollegePeople
	},
	{
		path: '/college/peopleDetail',
		name: 'collegePeopleDetail',
		meta: {
			tabName: '见习生信息',
			noTabs: true,
			parentRoute: 'collegePeople'
		},
		component: CollegePeopleDetail
	}
];

const newsRouters = [
	{
		path: '/news/list',
		name: 'newsList',
		meta: {
			tabName: '新闻管理'
		},
		component: NewsList
	},
	{
		path: '/news/detail',
		name: 'newsDetail',
		meta: {
			tabName: '新闻详情',
			noTabs: true,
			parentRoute: 'newsList'
		},
		component: NewsDetail
	},
	{
		path: '/news/type',
		name: 'newsType',
		meta: {
			tabName: '新闻类型管理'
		},
		component: NewsType
	},
	{
		path: '/news/sync',
		name: 'newsSync',
		meta: {
			tabName: '新闻同步'
		},
		component: NewsSync
	}
];

export default collegeRouters.concat(newsRouters);
