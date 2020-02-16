/**
 * ###### Mon Jul 10 09:43:44 CST 2018
 * @name jobTrainingRouter
 * @description 职业培训路由
 * @author chenxue
 *
 */

// jobTraining业务（职业培训），用于异步对应的路由
/* eslint-disable global-require */
const TrainingDirection = r => require.ensure([], () => r(require('@/views/jobTraining/trainingDirection')), 'group-jobTraining');
const TrainingDirectionDetail = r => require.ensure([], () => r(require('@/views/jobTraining/trainingDirectionDetail')), 'group-jobTraining');
const IntentionCount = r => require.ensure([], () => r(require('@/views/jobTraining/intentionCount')), 'group-jobTraining');

// recruitSpread router
const jobTrainingRouters = [
	{
		path: '/jobTraining/trainingDirection',
		name: 'trainingDirection',
		meta: {
			tabName: '培训方向'
		},
		component: TrainingDirection
	},
	{
		path: '/jobTraining/trainingDirectionDetail',
		name: 'trainingDirectionDetail',
		meta: {
			tabName: '添加/编辑培训方向',
			noTabs: true,
			parentRoute: 'trainingDirection'
		},
		component: TrainingDirectionDetail
	},
	{
		path: '/jobTraining/intentionCount',
		name: 'intentionCount',
		meta: {
			tabName: '意向统计'
		},
		component: IntentionCount
	}
];

export default jobTrainingRouters;
