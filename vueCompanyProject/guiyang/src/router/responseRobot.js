/**
 * ###### Tue Jul 10 10:13:44 CST 2018
 * @name responseRobotRouter
 * @description 应答机器人路由
 * @author chenxue
 *
 */

// responseRobot业务（应答机器人），用于异步对应的路由
/* eslint-disable global-require */
const QuestionManage = r => require.ensure([], () => r(require('@/views/responseRobot/questionManage')), 'group-responseRobot');
const QuestionDetail = r => require.ensure([], () => r(require('@/views/responseRobot/questionDetail')), 'group-responseRobot');
const TypeManage = r => require.ensure([], () => r(require('@/views/responseRobot/typeManage')), 'group-responseRobot');

// responseRobot router
const responseRobotRouters = [
	{
		path: '/responseRobot/typeManage',
		name: 'typeManage',
		meta: {
			tabName: '类型维护'
		},
		component: TypeManage
	},
	{
		path: '/responseRobot/questionManage',
		name: 'questionManage',
		meta: {
			tabName: '问题维护'
		},
		component: QuestionManage
	},
	{
		path: '/responseRobot/questionDetail',
		name: 'questionDetail',
		meta: {
			tabName: '添加/编辑问题',
			noTabs: true,
			parentRoute: 'questionManage'
		},
		component: QuestionDetail
	}
];

export default responseRobotRouters;
