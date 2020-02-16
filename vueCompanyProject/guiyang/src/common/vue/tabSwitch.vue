<template>
		<!-- params: tablink.params -->
		<router-link :to="{name: tablink.name}"
		class="link tab" :class="{ active_child: activeChild}"
		:exact="isExact" tag="div" >
			<a>{{tablink.meta.tabName}}</a>
			<i class="iconfont icon-close3 close-btn" @click="closeTabView" v-show="isShowClose"></i>
		</router-link>
</template>

<script>
export default {
	name: 'tab-switch',
	props: {
		tablink: {
			required: true,
			type: Object
		}
	},
	computed: {
		activeChild() {
			const breadCrumb0 = this.$store.state.breadCrumb[0];
			return breadCrumb0 ? breadCrumb0.name === this.tablink.name : false;
		},
		// 是否显示关闭按钮
		isShowClose() {
			if (this.$store.state.tabs.length === 1) {
				return false;
			}
			return true;
		},
		// 是否使用exact 精确路由匹配
		isExact() {
			return !this.tablink.meta.hasChildren;
		}
	},
	methods: {
		closeTabView() {
			this.$store.commit('delTabs', this.tablink.name);
		}
	}
};
</script>

<style scoped>
	.tab{
		display: inline-block;
		color: #666666;
		font-size: 14px;
		font-weight: 600;
		margin-right: 10px;
		line-height: 1;
		cursor: pointer;
		position: relative;
		border: 1px solid #e5e7ea;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border-bottom: none;
		padding: 8px 26px 8px 10px;
		transition: all ease-in-out .2s;
	}
	.tab a {
		color: inherit;
	}
	.close-btn{
		color: inherit;
		position: absolute;
		margin: 7px 6px;
		top: 0px;
		right: 0px;
		padding: 2px;
		font-size: 12px;
	}
	.tab.router-link-active{
		color: #fff;
		background-color: #46a3ff;
		border-color: #46a3ff;
		/*border-color: #3399ff;*/
	}
	.close-btn:hover{
		color: #fff;
		background-color: #f8736c;
		border-radius: 12px;
	}
	.tab.active_child {
		background-color: #2e8ae6;
		border-color: #2e8ae6;
		color: #fff;
	}
</style>
