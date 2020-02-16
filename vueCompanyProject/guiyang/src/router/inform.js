/**
 * ###### Tue Jul 30 15:39:44 CST 2018
 * @name informRouter
 * @description 资讯路由
 * @author chenxue
 *
 */

// inform业务（应答机器人），用于异步对应的路由
/* eslint-disable global-require */
const InformTypeManage = r => require.ensure([], () => r(require('@/views/inform/informTypeManage')), 'inform-responseRobot');
const InformManage = r => require.ensure([], () => r(require('@/views/inform/informManage')), 'inform-responseRobot');
const InformDetail = r => require.ensure([], () => r(require('@/views/inform/informDetail')), 'inform-responseRobot');
const CommentDetail = r => require.ensure([], () => r(require('@/views/inform/commentDetail')), 'inform-responseRobot');

// informRouters router
const informRouters = [
	{
		path: '/inform/informTypeManage',
		name: 'informTypeManage',
		meta: {
			tabName: '类型维护'
		},
		component: InformTypeManage
	},
	{
		path: '/inform/informManage',
		name: 'informManage',
		meta: {
			tabName: '资讯维护'
		},
		component: InformManage
	},
	{
		path: '/inform/informDetail',
		name: 'informDetail',
		meta: {
			tabName: '添加/编辑资讯',
			noTabs: true,
			parentRoute: 'informManage'
		},
		component: InformDetail
	},
	{
		path: '/inform/commentDetail',
		name: 'commentDetail',
		meta: {
			tabName: '评论详情',
			noTabs: true,
			parentRoute: 'informManage'
		},
		component: CommentDetail
	}
];

export default informRouters;
