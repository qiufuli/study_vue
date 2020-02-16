<docs>
		## mulitSelect 地址选择封装
		* @date ###### Tue Sep 5 11:02:18 CST 2017
		* @author jinglf000
		* @desc 对学历，从数据的角度去分析比较容易理解
		/xmtyzjht/zylb/zylb/zylbCx 7.99

		## 多级选择，被职位、地址、专业、行业
		* 职位 localStorage 存储的key为 ‘jobclass’
		* 行业 localStorage 存储的key为 ‘tradeclass’
		* 地址 localStorage 存储的key为 ‘area’
		* 专业 localStorage 存储的key为 ‘majorclass'’
</docs>
<template>
	<div>
		<el-popover
			ref="popover"
			:width="width"
			trigger="click"
			transition="el-zoom-in-top"
			:visible-arrow="false"
			placement="bottom-start"
			popper-class="popover_wrap"
			v-model="visible">
				<div class="pop_header" >
					<div class="header_wrap">
						<div class="header_item " @click="tabsClick(item)" :class="item.class"
						v-for="(item, index) in tabs" :key="index">{{item.label}}</div>
					</div>
				</div>
				<div class="pop_content">
					<div class="pop_pane" v-for="(item, index) in tabs" :key="index" v-show="item.class !== ''">
						<ul class="pane_li_wrap">
							<li v-for="(val, i) in item.data" :key="i" class="pane_li"
							:class="item.id === val.id ? panesActiveClass : ''"
							@click.stop.prevent="paneHandle(val)">{{val.name}}</li>
						</ul>
					</div>
				</div>
		</el-popover>
		<el-input
			:icon="iconType"
			@mouseenter.native="handleOn"
			@mouseleave.native="handleOut"
			:on-icon-click="handleClickIcon"
			v-model="mulit"
			readonly
			ref="selectInput"
			v-popover:popover>
		</el-input>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { similarStr } from '@/common/js/utils';

export default {
	name: 'multiSelect',
	props: {
		tabsAciveClass: { // tabsActiveClass tabs栏选中状态class，默认is_active
			type: String,
			default: 'is_active',
			validator(val) {
				return val !== '';
			}
		},
		panesActiveClass: { // panesActiveClass panes栏选中状态class，默认is_active
			type: String,
			default: 'is_active',
			validator(val) {
				return val !== '';
			}
		},
		value: {}, // v-model值
		options: { // options 配置
			type: Array,
			default() {
				return ['大类', '中类', '小类', '细类'];
			}
		},
		fill: { // 显示选项的填充
			type: String,
			default: ' - '
		},
		local: { // localStorage 缓存地址
			type: String,
			default: ''
		},
		width: {
			type: Number,
			default: 320
		},
		/**
		 * @param {String} url
		 * @param {String} param
		 */
		api: { // 分组接口地址必填
			type: Object,
			required: true
		},
		// 默认为true，表示必须选到最后一级
		changeOnSelect: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			mulit: '',
			visible: false,
			itemId: '',
			tabs: [],
			// 图标 ： circle-close = 关闭； caret-bottom = 向下箭头；
			iconType: 'caret-bottom',
			// 是否显示关闭按钮
			isShowClose: false
		};
	},
	watch: {
		value(val) {
			const tabs0 = this.tabs.find(item => item.level === 0);
			if ((val === '' || val === undefined) && tabs0) {
				const tab = this.getTab(0, tabs0.data);
				tab.class = this.tabsAciveClass;
				this.tabs = [tab];
				this.mulit = '';
				return;
			}
			if (this.itemId !== val && tabs0) {
				this.tabs = this.defaultValue(tabs0.data, val);
				this.inputShowValue();
			}
		}
	},
	methods: {
		// 鼠标悬浮事件： handleOn 进入，handleOut 离开
		handleOn() {
			// 如果有值，显示清空按钮
			if (this.itemId) {
				this.iconType = 'circle-close';
				this.isShowClose = true;
			} else {
				this.iconType = 'caret-bottom';
				this.isShowClose = false;
			}
		},
		handleOut() {
			this.iconType = 'caret-bottom';
			this.isShowClose = false;
		},
		// 点击图标
		handleClickIcon() {
			if (this.isShowClose) {
				this.visible = false;
				this.iconType = 'caret-bottom';
				this.itemId = '';
				this.$emit('input', '');
			}
		},
		/**
		 * @desc 工具方法：根据返回值代码表规则，设置初始tab值用于显示，返回了用于显示的tabs
		 * 不可单独使用，必须赋值给this.tabs
		 * @param {Array} list codeData数据
		 * @param {String} string 默认值
		 * @return {Array} 返回值为tabs初始化结构，用于显示
		 */
		defaultValue(list, string) {
			let level = 0;
			const minVal = string;
			const fn = (arr, str) => {
				let tab = null;
				let child = null;
				const num = similarStr(arr, str, 'id');
				// 获取到选中的值，初始化tab对象
				child = arr[num];
				tab = this.getTab(level, arr);
				tab.id = child.id;
				tab.name = child.name;
				level++;
				// 递归调用
				if (Array.isArray(child.children) && child.children.length > 0) {
					if (this.local === 'area' && child.id === minVal) {
						tab.class = this.tabsAciveClass;
						return [tab];
					}
					return [tab].concat(fn(child.children, str));
				}
				tab.class = this.tabsAciveClass;
				return [tab];
			};
			return fn(list, string);
		},
		/**
		 * @desc 工具方法：生成tab结构，不可单独使用，返回的为tabs各项的数据结构
		 * 用于实现，显示tab对应的内容和con对应的内容
		 * @param {Number} level 层级标示
		 * @param {Array} data 内容数据
		 * @return {Object} tabs项默认结构
		 */
		getTab(level, data) {
			const arr = this.options;
			const obj = {
				level, // 层级关系
				data, // 数据
				label: arr[level], // 名称
				id: '',  // 选中id
				name: '', // 选中name
				class: '' // 选中class（不能为空用于判断选中状态）
			};
			return obj;
		},
		// 用于确定内部input 的显示内容和格式
		// 根据结构化的tabs值（最终的值）显示对应的input值
		// 默认读取this.tabs值，并把最终的值显示到input上，即赋值给mulit
		// 当level有值的时候，显示的是level之前所有的值
		inputShowValue(level) {
			let showValue;
			if (level !== undefined) {
				showValue = this.tabs.map(ele => (ele.level <= level ? ele.name : undefined))
				.filter(name => name !== undefined).join(this.fill);
			} else {
				showValue = this.tabs.map(ele => ele.name).join(this.fill);
			}
			this.mulit = showValue;
		},
		// 第一次初始化调用的接口
		getData() {
			// tabSet 方法
			const tabSet = (data) => {
				if (this.value !== '') { // 有默认值的初始化
					this.tabs = this.defaultValue(data, this.value);
					this.inputShowValue();
				} else {
					const tab = this.getTab(0, data);
					tab.class = this.tabsAciveClass;
					this.tabs.push(tab);
				}
			};
			// 判断是否可以从localStorage获取数据
			// const localData = localStorage.getItem(this.local);
			// if (this.local && localData) {
			// 	tabSet(JSON.parse(localData));
			// } else {
			$.get(this.api.url).then((res) => {
				const data = res.returnData;
				if (data.executeResult === '1') {
					tabSet(data[this.api.param]);
					// localStorage.setItem(this.local, JSON.stringify(data[this.api.param]));
				}
			}).catch(() => {});
			// }
		},
		// resetclass 重置class
		resetClass(obj) {
			obj.forEach((ele) => {
				ele.class = '';
			});
		},
		// 内容点击 选中处理
		paneHandle(item) {
			const tabs = this.tabs;
			// 当前选中对象（这才是箭头函数的极简形态呀！）
			const now = this.tabs.find(element => element.class !== '');
			const next = now.level + 1;
			// 若值已经被选中，直接显示即可；第二次点击并且下一级已经在tabs里
			if (now.id === item.id && tabs[next]) {
				this.resetClass(tabs);
				tabs[next].class = this.tabsAciveClass;
				tabs[next].id = '';
				tabs[next].name = '';
				// 若有值，显示下一级，第一次点击下一级存在但并没有在tabs里
			} else if (Array.isArray(item.children) && item.children.length > 0) {
				// 重置class
				this.resetClass(tabs);
				const tab = this.getTab(next, item.children);
				tab.class = this.tabsAciveClass;
				// 若存在则删除剩余的，替换成新的
				if (tabs[next]) {
					this.tabs.splice(next, tabs.length);
				}
				tabs.push(tab);
			// 没有返回最终的值，则显示值，最后一次点击，没有下一级
			} else {
				this.visible = false;
				if (this.tabs[next]) {
					this.tabs.splice(next, tabs.length);
				}
				// 为tab数据设定值
				now.id = item.id;
				now.name = item.name;
				// 在input中显示内容并通知选中值
				if (this.changeOnSelect) {
					this.inputShowValue(now.level);
					this.itemId = item.id;
					this.$emit('input', item.id);
				}
			}
			// 为tab数据设定值
			now.id = item.id;
			now.name = item.name;
			// 判断changeOnSelect的值，确定是否到最后一级才显示，在input中显示内容并通知选中值
			if (!this.changeOnSelect) {
				this.inputShowValue(now.level);
				this.itemId = item.id;
				this.$emit('input', item.id);
			}
		},
		// tabs栏点击处理
		tabsClick(item) {
			const tabs = this.tabs;
			// 重置class
			tabs.forEach((tab) => {
				tab.class = '';
				if (tab.level === item.level) {
					tab.class = this.tabsAciveClass;
				}
			});
		}
	},
	created() {
		this.getData();
		this.itemId = this.value;
	},
	updated() {
		const popover = this.$refs.popover;
		if (popover && popover.popperElm) {
			popover.popperElm.style.width = getComputedStyle(popover.referenceElm).width;
		}
	}
};
</script>
<style lang="less" >
	// 背景颜色
	@bg_color: #eef1f6;
	@border_color: #d1dbe5;
	@active_color: #20a0ff;

	// popover wrap class
	.popover_wrap{
		background-color: @bg_color;
		padding: 0;
		margin-top: 5px !important;
	}
	// 头部tabs
	.pop_header{
		// item
		.header_item{
			float: left;
			font-size: 14px;
			color: #8391a5;
			line-height: 32px;
			height: 32px;
			padding: 0 20px;
			cursor: pointer;
			box-sizing: border-box;
		}
		.header_item.is_active{
			background-color: #fff;
			border: 1px solid transparent;
			border-left-color: @border_color;
			border-right-color: @border_color;
			border-top: 0;
			margin-left: -1px;
			margin-right: -1px;
			color: @active_color;
		}
		// wrap
		.header_wrap{
			position: relative;
			margin-bottom: -1px;
		}
		.header_wrap:after{
			clear: both;
			display: block;
			content: '';
		}
		border-bottom: 1px solid @border_color;
	}

	// 内容contents
	.pop_content{
		background-color: #fff;
	}
	// wrap
	.pane_li_wrap{
		padding: 10px;
		color: #333;
	}
	.pane_li_wrap:after{
		content: '';
		display: block;
		clear: both;
	}
	// 每一项内容
	.pane_li {
		float: left;
		padding: 5px;
		margin: 0 5px;
		transition: all ease .2s;
		cursor: pointer;
	}
	.pane_li.is_active,
	.pane_li:hover{
		background-color: @active_color;
		border-radius: 5px;
		color: @bg_color;
	}
	// select content 动画状态
	.select-enter,
	.select-leave-to{
		height: 0;
	}
	.select-enter-active{
		transition: all ease .25s;
	}
	.select-leave-active{
		transition: all cubic-bezier(1.0, 0.5, 0.8, 1.0) .29s;
	}
</style>
