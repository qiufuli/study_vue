<docs>
		## 面包屑
		* @date ###### Fri Sep 15 09:41:59 CST 2017
		* @author jinglf000
		* @desc 路径 和 返回按钮
		## 实现配置
		* 路由必须要有层级关系，父-->子（子路由中的meta必须事先声明，noTabs: true, parentRoute: 'appJob'）
			* noTabs 没有tabs页
			* parentRoute 为父页面
		## 使用方式见：企业审批页面
		* <bread-crumb></bread-crumb>
		* 同时还包括对应的路由配置
</docs>
<template>
	<div>
		<div class="crumbs_wrap">
			<div class="crumbs">
				<span>所在位置：</span>
				<span v-for="(item, index) in breadPath"
					:key="index">{{ item.meta.tabName }}<span class="fill">{{index < breadPath.length - 1 ? '>' : ''}}</span>
				</span>
			</div>
			<router-link class="return_btn" title="返回" :to="{ name: routeFrom.name, params: routeFrom.params }">
				<i class="iconfont icon-fanhui"></i>
			</router-link>
		</div>
	</div>
</template>

<script>

export default {
	name: 'breadCrumb',
	data() {
		return {
			routeFrom: null,
			breadPath: []
		};
	},
	created() {
		const routerHistory = this.$store.state.breadCrumb;
		this.routeFrom = routerHistory[routerHistory.length - 2];
		this.breadPath = routerHistory;
	}
};
</script>
<style scoped>
.crumbs_wrap {
	padding: 5px 10px;
	background-color: #fff;
}
.iconfont.icon-return {
	font-size: 16px;
	line-height: 26px;
}
.iconfont.icon-return:before{
	padding: 5px;
	border-radius: 4px;
	transition: all ease-in-out .3s;
}
.iconfont.icon-return:hover:before{
	background-color: #3399ff;
	color: #fff;
}
.crumbs {
	display: inline-block;
	color: #818a96;
	font-size: 12px;
	line-height: 26px;
}
.crumbs .fill {
	padding: 0 10px;
}
.return_btn {
	color: #3399ff;
}
</style>
