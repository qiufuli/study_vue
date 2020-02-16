<docs>
	## 统计分析查询页
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 初次查询后显示数据
</docs>
<template>
	<div>
		<bread-crumb></bread-crumb>
		<statement1 v-if="componentName === 'statement1'"></statement1>
		<statement2 v-else-if="componentName === 'statement2'"></statement2>
		<statement3 v-else-if="componentName === 'statement3'"></statement3>
		<statement4 v-else-if="componentName === 'statement4'"></statement4>
		<statement5 v-else-if="componentName === 'statement5'"></statement5>
		<statement6 v-else-if="componentName === 'statement6'"></statement6>
		<statement7 v-else-if="componentName === 'statement7'"></statement7>
		<statement8 v-else-if="componentName === 'statement8'"></statement8>
		<statement9 v-else-if="componentName === 'statement9'"></statement9>
		<statement10 v-else-if="componentName === 'statement10'"></statement10>
	</div>
</template>
<script>
import breadCrumb from '@/common/vue/breadCrumb';
import statement1 from './components/statement1';
import statement2 from './components/statement2';
import statement3 from './components/statement3';
import statement4 from './components/statement4';
import statement5 from './components/statement5';
import statement6 from './components/statement6';
import statement7 from './components/statement7';
import statement8 from './components/statement8';
import statement9 from './components/statement9';
import statement10 from './components/statement10';

export default {
	name: 'statement',
	components: {
		breadCrumb,
		statement1,
		statement2,
		statement3,
		statement4,
		statement5,
		statement6,
		statement7,
		statement8,
		statement9,
		statement10
	},
	data() {
		return {
			componentName: ''
		};
	},
	created() {
		this.componentName = this.$route.params.componentName;
	},
	// 导航到该组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (!to.params.componentName) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
