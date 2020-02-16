// 引入vue和vuex，进行全局状态管理
import Vue from 'vue';
import Vuex from 'vuex';
import Router from '@/router/index';
import { MAX_TAB } from '@/common/js/config';

// 在vue项目中使用Vuex
Vue.use(Vuex);

// 配置
export default new Vuex.Store({
	// 实际状态，mapState应用在子组件中，对应于state，提供快捷的计算属性
	state: {
		maxTab: MAX_TAB,
		tabs: [], // 用于管理tabs 栏内容
		breadCrumb: [], // 用于管理子基别的路由
		infoResult: {},	// 用于分配科目返回重新查询数据
		isAllot: false,
		isDisRxam: false,
		isFpks: ''
	},
	// 可以认为是store的计算属性，mapGetters应用在子组件中，提供快捷的计算属性
	getters: {
		tabIncludes(state) {
			return state.tabs.map(item => item.components.join(',')).join(',');
		}
	},
	// key - value ===> type handle，唯一一种能够修改state的方式
	// 在组件内部使用的时候，使用‘事件触发的方式’ commit('increament');
	// mutation 必须是同步函数
	mutations: {
		// obj 为路由信息对象
		addTabs(state, obj) {
			if (obj.name === 'login') {
				return false;
			}
			// 获取路由对象对应的组件
			const matchComponts = Router.getMatchedComponents(obj);
			const matchCompontsNames = matchComponts.map(item => item.name);
			// const matchedViews = obj.matched;
			// const componentsNames = matchedViews.map((item) => {
			// 	const components = item.components;
			// 	const names = Object.keys(components);
			// 	return names.map(n => components[n].name).join(',');
			// });
			const num = state.tabs.findIndex(item => item.name === obj.name);
			const needInfo = {
				name: obj.name,
				params: obj.params,
				meta: obj.meta,
				components: matchCompontsNames
			};
			if (num === -1) {
				state.tabs.push(needInfo);
			} else {
				Object.assign(state.tabs[num], needInfo);
			}
		},
		// 删除tabs页，state为store中的state
		delTabs(state, name) {
			const tabs = state.tabs;
			// 删除tab的同时完成路由的切换
			if (tabs.length > 1) {
				// const
				let num = tabs.findIndex(item => item.name === name);
				const curRoute = Router.currentRoute;
				// 处理子页面路由跳转
				const isfromChildRoute = state.breadCrumb[0] ? name === state.breadCrumb[0].name : false;
				if (name === curRoute.name || isfromChildRoute) {
					// 路由转换，若销毁的为当前路由，路由跳转
					num = ((num - 1) >= 0) ? (num - 1) : tabs.length - 1;
					Router.push({ name: tabs[num].name, params: tabs[num].params });
				}
				tabs.splice(tabs.findIndex(item => item.name === name), 1);
			}
		},
		routeInfo(state, payload) {
			const toParentRoute = payload.to.meta.parentRoute;
			let breadCrumb = state.breadCrumb;
			// 使用breadCrumb记录所有面包屑路径
			if (toParentRoute === undefined) {
				breadCrumb = [];
			} else {
				/* eslint-disable no-lonely-if */
				if (breadCrumb.length === 0) {
					breadCrumb = [payload.from, payload.to];
				} else {
					if (payload.to.name === breadCrumb[breadCrumb.length - 2].name) { // 返回状态
						breadCrumb.pop();
					} else {
						breadCrumb.push(payload.to);
					}
				}
			}
			state.breadCrumb = breadCrumb;
		}
	},
	// 可以异步更改state的内容，内部调用的方法还是mutations，通过dispatch来分发
	actions: {
		decrease(context) {
			setTimeout(() => {
				context.commit('increament', -1);
			}, 1000);
		}
	}
});
