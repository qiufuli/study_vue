<template>
	<li>
		<i v-show="iconClass" class="iconfont" :class="iconClass"></i>
		<router-link
			v-if="!menu.hasChild"
			class="link"
			:to="menu.url" exact>
			{{menu.name}}
		</router-link>
		<span v-else
			class="link"
			:class="menu.hasChild ? ( isShow ? 'switch_level2 down': 'switch_level2' ): ''"
			@click="toggleSub">
			{{menu.name}}
		</span>
		<transition name="menu">
			<ul class="level_2" v-if="menu.hasChild" v-show="isShow">
				<li v-for="(item, index) in menu.children" :key="index">
					<router-link v-if="!item.hasChild"
						class="link" :to="item.url" exact>{{item.name}}</router-link>
					<menu-list v-else :menu="item"></menu-list>
				</li>
			</ul>
		</transition>
	</li>
</template>

<script>
import menuJSON from '@/common/menu.json';
// 列表渲染组件用于渲染后台多级菜单
export default {
	// 实际的组件名称即为文件名
	// menu-list 为便于调试的别名
	name: 'menu-list',
	data() {
		return {
			isShow: false
		};
	},
	methods: {
		// 切换左侧菜单栏
		toggleSub() {
			if (this.menu.hasChild) {
				this.isShow = !this.isShow;
			}
		}
	},
	computed: {
		iconClass() {
			const result = menuJSON.find(item => item.url === this.menu.url);
			if (result) {
				return result.icon;
			}
		}
	},
	props: {
		menu: {
			type: Object,
			required: true
		}
	}
};
</script>

<style>
/* 菜单折叠 箭头标志 动画*/
.menu_list li .switch_level2:after{
	content: '\e601';
	font-family: 'iconfont';
	position: absolute;
	right: 20px;
	top: 13px;
	transition: all ease .3s;
}
.menu_list li .switch_level2.down:after{
	/*content: '\e64a';*/
	transform: rotate(-180deg);
}

/* 子 menu 动画 */
.menu-enter-active {
	transition: all .3s cubic-bezier(.09,.89,.57,.9);
}
.menu-leave-active {
	transition: all .1s ease;
}
.menu-enter{
	transform: translateY(-10px);
	opacity: 0;
}
.icon-college:before{
	  font-size: 18px;
}
</style>
