<docs>
	## 招聘推广，热门企业 树渲染组件
	* @data ###### Tue Jul 10 14:48:50 CST 2018
	* @author chenxue
	* @desc 热门企业 树渲染组件
	## 使用（全局引入）
	*	prop data 数据，
	*	events `editClick` 编辑按钮点击；`delClick` 删除按钮点击
	## 优化
	*  当备注内容过长时
</docs>
<template>
	<div class="tree">
		<el-row class="tree_con">
			<el-popover ref="popover" title="备注" width="200" :disabled="popoverDisabled"
			trigger="hover" :content="data.bz">
			</el-popover>
			<el-col :span="5" class="name" :style="style">{{data.zdhymc}}</el-col>
			<el-col :span="5">{{parent.zdhymc || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="2">{{data.cjr || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="4">{{data.cjsj || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="6" class="remark" ref="remark">{{data.bz || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="2" class="align_center operates">
				<span class="padding"></span>
				<span>
					<!-- <el-button type="primary" size="mini"
					@click.stop="edit" icon="edit" >
					</el-button> -->
					<el-button type="danger"	icon="delete"
					@click.stop="del" size="mini" >
					</el-button>
				</span>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	name: 'newsTree',
	props: {
		data: {
			required: true,
			type: Object
		},
		level: {
			required: true
		},
		parent: {
			required: true
		}
	},
	computed: {
		// 计算新闻子类偏移的距离
		style() {
			const num = 30 + (16 * (+this.level - 1));
			return {
				paddingLeft: `${num}px`
			};
		},
		state() {
			// const todos = this.data.czlx.split(',');
			// return {
			// 	sfqy: todos[0] === '0' ? '否' : '是',
			// 	sfyxsc: todos[1]
			// };
		}
	},
	data() {
		return {
			// 判断是否显示popover
			popoverDisabled: true
		};
	},
	methods: {
		// 向父组件触发editClick事件
		// edit() {
		// 	this.$emit('editClick');
		// },
		// 向父组件触发delClick事件
		del() {
			this.$emit('delClick');
		},
		// 判断是否显示 popover，必须在DOM元素存在的时候
		popover() {
			// const remark$el = this.$refs.remark.$el;
			// if (remark$el.scrollWidth > remark$el.offsetWidth) {
			// 	this.popoverDisabled = false;
			// } else {
			// 	this.popoverDisabled = true;
			// }
		}
	},
	mounted() {
		this.popover();
	},
	updated() {
		this.popover();
	}
};
</script>
<style scoped>
	.tree{
		top: 0;
		position: absolute;
		width: 100%;
		right: 0;
	}
	.el-col{
		text-align: center;
	}
	.name {
		padding-left: 30px;
		text-align: left;
	}
	.remark{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.operates{
		text-align: left;
	}
	.padding{
		margin-left: 42%;
	}
</style>
