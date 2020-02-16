<docs>
	## 招聘推广----热门行业
	@date ###### Mon Jul 9 17:42:45 CST 2018
	@author cx
	@desc 热门行业库的查询、新增和删除操作
</docs>
<template>
	<div>
		<!-- 菜单树 开始 -->
		<div class="query_wrap">
			<el-row>
				<el-button type="primary" icon="plus" size="small" @click="addTree('formType')">添加</el-button>
			</el-row>
			<el-row class="tree_title">
				<el-col :span="5" class="tree_title_type">行业名称</el-col>
				<el-col :span="5">上级行业名称</el-col>
				<el-col :span="2">创建人</el-col>
				<el-col :span="4">创建时间</el-col>
				<el-col :span="6">备注</el-col>
				<el-col :span="2">操作</el-col>
			</el-row>
			<div class="tree">
				<el-tree
					v-if="!inResize"
					@node-click="nodeClick"
					class="el_tree"
					:highlight-current="true"
					:data="results"
					:props="props"
					:render-content="renderContent"
					:load="loadTree"
					lazy
					ref="treeIns"
					node-key="zdhy_id">
				</el-tree>
			</div>
		</div>
		<!-- 菜单树 结束 -->
		<!-- 添加 热门行业 开始 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.state" size="tiny" class="dialog">
			<el-form :model="form" ref="formType" :label-width="labelWidth" :rules="rules">
				<el-form-item prop="zdhymc" required label="行业名称">
					<el-input v-model="form.zdhymc"></el-input>
				</el-form-item>
				<el-form-item prop="zdhy_id" label="上级">
					<el-input v-model="dialog.upper" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="bz">
					<el-input type="textarea" v-model="form.bz" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogCancel('formType')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formType')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 添加 热门行业 结束 -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';

export default {
	name: 'businessType',
	inject: ['reload'],
	data() {
		return {
			inResize: false,
			labelWidth,
			results: [],
			props: {
				label: 'zdhymc',
				children: 'children'
			},
			loading: false,
			dialog: {
				title: '',
				state: false,
				level: 2,
				hasClicked: false,
				node: '',
				upper: '',
				data: ''
			},
			form: {
				zdhy_id: '',
				zdhymc: '',
				bz: ''
			},
			rules: {
				zdhymc: [{ validator: validator('12, "normal", "行业名称",false') }]
			},
			resolveFlag: true,
			resolveFunc: null
		};
	},
	methods: {
		// tree 点击回调，包含三个参数：data数据，node vue子实例
		nodeClick(data, node) {
			// data数据，upper上级，node节点，hasClick是否点击，level新增的节点
			this.dialog.data = data;
			this.dialog.upper = data.zdhymc;
			this.dialog.level = node.level + 1;
			this.dialog.hasClicked = true;
			this.dialog.node = node;
		},
		// 获取节点
		getData(resolve, id) {
			this.loading = true;
			$.get('/gyrcht/zdhy/zdhy/zdhyCx', {
				params: { zdhy_id: id }
			}).then((res) => {
				this.loading = false;
				resolve(res.returnData.zdhylb);
			}).catch(() => {
				this.loading = false;
			});
		},
		// 动态加载树
		loadTree(node, resolve) {
			if (this.resolveFlag) {
				this.resolveFunc = resolve;
			} else {
				this.resolveFlag = false;
			}
			if (node.level === 0 || !node || !node.data.zdhy_id) {
				return this.getData(resolve);
			}
			return this.getData(resolve, node.data.zdhy_id);
		},
		// 添加热门行业
		addTree(formName) {
			// dialog对话框
			this.dialog.state = true;
			this.dialog.title = '添加热门行业';
			// 表单重置
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.form.zdhy_id = this.dialog.data.zdhy_id;
		},
		// 添加 节点
		postData() {
			if (!this.form.zdhy_id) {
				this.form = {
					bz: this.form.bz,
					zdhymc: this.form.zdhymc
				};
			}
			// post 接口
			$.post('/gyrcht/zdhy/zdhy/zdhyBc', this.form).then((res) => {
				let parent = this.dialog.node.parent;
				if (res.returnData.executeResult === '1') {
					this.$message.success('热门行业添加成功！');
					parent = this.dialog.node;
					if (!parent) {
						this.$refs.treeIns.root.childNodes = [];
						this.loadTree(parent, this.resolveFunc);
					} else if (!this.form.zdhy_id) {
						this.loadTree(parent, (data) => {
							parent.doCreateChildren(data);
						});
					}
				} else {
					this.$message.warning(res.returnData.message);
				}
				// 清除子内容
				parent.childNodes = [];
				// 重新加载
				this.loadTree(parent, (data) => {
					parent.doCreateChildren(data);
				});
			}).catch(() => {});
		},
		// dialog 确认按钮
		dialogSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					this.dialog.state = false;
				}
			});
		},
		// dialog 取消按钮
		dialogCancel(formName) {
			this.dialog.state = false;
			this.$refs[formName].resetFields();
		},
		// 删除类型，store的remove和append方法都是，tree提供的内部方法
		// 前提是 node-key 必须唯一
		delData(node, data) {
			$.post('/gyrcht/zdhy/zdhy/zdhySc', {
				zdhy_id: data.zdhy_id
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					// 删除本条数据
					node.parent.removeChild(node);
					this.$message.success('删除成功！');
					this.dialog.hasClicked = false;
					this.dialog.upper = '';
					this.dialog.data.zdhy_id = '';
					const parent = this.dialog.node.parent;
					// 清除子内容
					parent.childNodes = [];
					// 重新加载
					this.loadTree(parent, (datas) => {
						parent.doCreateChildren(datas);
					});
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 删除 热门行业
		del(store, data) {
			this.$confirm('此操作将会删除该热门行业，是否继续？', '确认', {
				type: 'warning',
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.delData(store, data);
			}).catch(() => {});
		},
		renderContent(h, { data, node }) {
			return h('recruit-tree', {
				props: { data, level: node.level, parent: node.parent.data },
				on: {
					delClick: () => {
						this.del(node, data);
					}
				}
			});
		}
	}
};
</script>
<style>
	.query_wrap {
		padding-bottom: 10px;
	}
	.el_tree .el-tree-node{
		position: relative;
	}
	.tree_title {
		margin-top: 10px;
	}
	.tree_title .el-col{
		text-align: center;
		background-color: #eef1f6;
		padding: 10px 0;
		font-weight: bold;
		color: #1f2b3d;
		border-top: 1px solid #dfe5ec;
	}
	.tree_title .tree_title_type {
		text-align: left;
		padding-left: 30px;
	}
	/*修改默认选中样式  */
	.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
		background-color: rgba(19, 206, 102, .35);
	}
</style>
