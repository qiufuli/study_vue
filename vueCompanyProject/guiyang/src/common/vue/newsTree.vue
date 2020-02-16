<docs>
	## 新闻管理，新闻类型 树渲染组件
	* @data ###### Tue Aug 8 14:18:50 CST 2017
	* @author jinglf000
	* @desc 新闻类型 树渲染组件
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
			<el-col :span="4" class="name" :style="style">{{data.xwlxmc}}</el-col>
			<el-col :span="5" >{{parent.xwlxmc || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="9" v-if="popover" :title="data.bz" class="remark" ref="remark">{{data.bz || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="9" v-else class="remark" ref="remark">{{data.bz || '&nbsp;&nbsp;'}}</el-col>
			<el-col :span="2" >{{state.sfqy}}</el-col>
			<el-col :span="4" class="align_center operates">
				<span class="padding"></span>
				<span v-if="level > 1">
					<el-button type="primary" size="mini"
					@click.stop="edit" icon="edit" >
					</el-button>
					<el-button type="danger" v-if="state.sfyxsc === '1'"	icon="delete"
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
			const todos = this.data.czlx.split(',');
			return {
				sfqy: todos[0] === '0' ? '否' : '是',
				sfyxsc: todos[1]
			};
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
		edit() {
			this.$emit('editClick');
		},
		// 向父组件触发delClick事件
		del() {
			this.$emit('delClick');
		},
		// 判断是否显示 popover，必须在DOM元素存在的时候
		popover() {
			const remark$el = this.$refs.remark.$el;
			if (remark$el.scrollWidth > remark$el.offsetWidth) {
				this.popoverDisabled = false;
			} else {
				this.popoverDisabled = true;
			}
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
		margin-left: 30%;
	}
</style>
