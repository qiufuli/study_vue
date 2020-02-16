/**
 * ###### Mon Aug 7 09:36:58 CST 2017
 * @name examManagementRouter
 * @desc 考试管理路由
 * @author lvllp000
 */

/* eslint-disable global-require */
// 考试发布
const ExamPost = r => require.ensure([], () => r(require('@/views/exam/mange/examPost')), 'group-examInformation');
const ExamDetail = r => require.ensure([], () => r(require('@/views/exam/mange/examDetail')), 'group-examInformation');
const ExamSet = r => require.ensure([], () => r(require('@/views/exam/mange/examSet')), 'group-examInformation');
// 考点/考场
const ExamRoom = r => require.ensure([], () => r(require('@/views/exam/room/examRoom')), 'group-examInformation');
// 考生分配
const Examinee = r => require.ensure([], () => r(require('@/views/exam/room/examinee')), 'group-examInformation');
const ExamineeDetail = r => require.ensure([], () => r(require('@/views/exam/room/examineeDetail')), 'group-examInformation');
// 成绩管理
const ExamGrade = r => require.ensure([], () => r(require('@/views/exam/examGrade')), 'group-examInformation');
// 报名管理
const ExamEnrol = r => require.ensure([], () => r(require('@/views/exam/examEnrol')), 'group-examInformation');
const ExamEnrolDetail = r => require.ensure([], () => r(require('@/views/exam/examEnrolDetail')), 'group-examInformation');

const examRouters = [
	{
		path: '/exam/examPost',
		name: 'examPost',
		meta: {
			tabName: '发布考试'
		},
		component: ExamPost
	},
	{
		path: '/exam/examDetail',
		name: 'examDetail',
		meta: {
			tabName: '添加/编辑考试',
			noTabs: true,
			parentRoute: 'examPost'
		},
		component: ExamDetail
	},
	{
		path: '/exam/examSet',
		name: 'examSet',
		meta: {
			tabName: '考试设置',
			noTabs: true,
			parentRoute: 'examPost'
		},
		component: ExamSet
	},
	{
		path: '/exam/examRoom',
		name: 'examRoom',
		meta: {
			tabName: '考点/考场设置'
		},
		component: ExamRoom
	},
	{
		path: '/exam/examinee',
		name: 'examinee',
		meta: {
			tabName: '考生分配'
		},
		component: Examinee
	},
	{
		path: '/exam/examinee/detail',
		name: 'examineeDetail',
		meta: {
			tabName: '分配考生',
			noTabs: true,
			parentRoute: 'examinee'
		},
		component: ExamineeDetail
	},
	{
		path: '/exam/grade',
		name: 'examGrade',
		meta: {
			tabName: '成绩管理'
		},
		component: ExamGrade
	},
	{
		path: '/exam/enrol',
		name: 'examEnrol',
		meta: {
			tabName: '报名管理'
		},
		component: ExamEnrol
	},
	{
		path: '/exam/enrol/detail',
		name: 'examEnrolDetail',
		meta: {
			tabName: '报名详情',
			noTabs: true,
			parentRoute: 'examEnrol'
		},
		component: ExamEnrolDetail
	}
];

export default examRouters;
