<docs>
	## 新闻管理---新闻类型管理
	* @date ###### Tue Aug 8 11:41:25 CST 2017
	* @author jinglf000
	* @desc 修改、编辑、新增新闻类型
	## 使用的newsTree组件渲染tree树内容，newsTree被全局引入了，未来优化的方向是提到本地
	## 逻辑较为复杂，中类不能超过8个；判断一次
</docs>
<template>
	<div>
		<!--菜单树 开始  -->
		<div class="query_wrap" v-loading="loading">
			<el-row>
				<el-button type="primary" @click="addTree('formType')" icon="plus" size="small">添加</el-button>
				<small class="required notice" >新闻类型层级不能超过四层</small>
			</el-row>
			<el-row class="tree_title">
				<el-col :span="4" class="tree_title_type">新闻类型</el-col>
				<el-col :span="5">上级栏目</el-col>
				<el-col :span="9">备注</el-col>
				<el-col :span="2">是否启用</el-col>
				<el-col :span="4">操作</el-col>
			</el-row>
			<div class="tree">
				<el-tree
					@node-click="nodeClick"
					class="el_tree"
					:highlight-current="true"
					:data="results"
					:props="props"
					:render-content="renderContent"
					:load="loadTree"
					lazy
					node-key="xwlx_id">
				</el-tree>
			</div>
		</div>
		<!--菜单树 结束  -->
		<!--新增和编辑 目录 开始  -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.state" size="tiny" class="dialog">
			<el-form :model="form" ref="formType" :rules="rules"
			:label-width="labelWidth" >
				<el-form-item prop="xwlxmc" required label="新闻类型">
					<el-input v-model="form.xwlxmc"></el-input>
				</el-form-item>
				<el-form-item prop="xwlx_id" label="上级">
					<el-input v-model="dialog.upper" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否启用" prop="sfqy" >
							<el-switch v-model="form.sfqy"
								:disabled="disabledSfqy === '1'"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="序号" prop="xh" required>
							<el-input v-model="form.xh" placeholder="请输入整数"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否列表" prop="sflb"
							v-show="dialog.level === 2">
							<el-switch v-model="form.sflb"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"
								:disabled="dialog.switch"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="备注" prop="bz">
					<el-input type="textarea" v-model="form.bz" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogCancel('formType')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formType')">确定</el-button>
			</div>
		</el-dialog>
		<!--新增和编辑 目录 结束 -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';

export default {
	name: 'newsType',
	data() {
		return {
			labelWidth,
			colorOn,
			colorOff,
			results: [],
			props: {
				label: 'xwlxmc',
				children: 'children'
			},
			loading: false,
			// 新增编辑新闻类型弹出框
			dialog: {
				state: false,
				title: '',
				upper: '',
				data: '',
				node: '',
				hasClicked: false,
				switch: false,
				level: 2
			},
			form: {
				// 当czlx为0的时候，为新增，xwlx_id为上级id
				// 当czlx为1的时候，为编辑，xwlx_id为本级id
				xwlx_id: '',
				xwlxmc: '',
				czlx: '0',
				sfqy: '1',
				xh: '',
				bz: '',
				sfyxsc: '1',
				sflb: '1'
			},
			// 是否禁用掉启用按钮
			disabledSfqy: false,
			rules: {
				xwlxmc: [{ validator: validator('12, "normal", "新闻类型名称",false') }],
				xh: [{ validator: validator('2, "num", "序号",false') }],
				bz: [{ validator: validator('128, "normal", "备注",true') }]
			}
		};
	},
	methods: {
		// tree 点击回调，包含三个参数：data数据，node vue子实例
		nodeClick(data, node) {
			// data数据，upper上级，node节点，hasClick是否点击，level新增的节点
			this.dialog.data = data;
			this.dialog.upper = data.xwlxmc;
			this.dialog.node = node;
			this.dialog.hasClicked = true;
			this.dialog.level = node.level + 1;
		},
		// 获取节点 接口（分层次一级一级的获取节点）
		getData(resolve, id) {
			this.loading = true;
			$.get('/gyrcht/xwgl/xwgl/xwlxgllxCx', {
				params: { xwlx_id: id }
			}).then((res) => {
				this.loading = false;
				resolve(res.returnData.xwlxs);
			}).catch(() => {
				this.loading = false;
			});
		},
		// 删除类型，store的remove和append方法都是，tree提供的内部方法
		// 前提是 node-key 必须唯一
		delData(node, data) {
			$.delete('/gyrcht/xwgl/xwgl/xwlxglSc', {
				params: {
					xwlx_id: data.xwlx_id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					// 删除本条数据
					node.parent.removeChild(node);
					this.$message.success('删除成功！');
					this.dialog.hasClicked = false;
					const parent = this.dialog.node.parent;
					// if (type === '0') {
					// 	parent = this.dialog.node;
					// }
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
		// 添加，编辑节点
		postData() {
			const type = this.form.czlx;
			let msg = '添加';
			if (type === '1') {
				msg = '编辑';
			}
			// post 接口
			$.post('/gyrcht/xwgl/xwgl/xwlxglxjbjBc', this.form).then((res) => {
				let parent = this.dialog.node.parent;
				if (res.returnData.executeResult === '1') {
					this.$message.success(`新闻类型${msg}成功！`);
					if (type === '0') {
						parent = this.dialog.node;
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
		// 动态加载树
		loadTree(node, resolve) {
			if (node.level === 0) {
				return this.getData(resolve);
			}
			return this.getData(resolve, node.data.xwlx_id);
		},
		// 添加节点，前置操作为先选中一个节点，
		// 通过选中的节点获取到父节点的数据
		addTree(formName) {
			// 判断是否选中
			if (!this.dialog.hasClicked) {
				this.$message.warning('请先选择要添加到的新闻大类');
				return;
			}
			// dialog对话框
			this.dialog.state = true;
			this.dialog.title = '添加新闻类型';
			this.dialog.switch = false;
			// 表单重置
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
				this.form.czlx = '0';
			}
			this.form.xwlx_id = this.dialog.data.xwlx_id;
			this.form.sfyxsc = '1';
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
		// 编辑 新闻类型
		edit(node, data) {
			const czlxs = data.czlx.split(',');
			// 重设表单，
			setTimeout(() => {
				Object.keys(this.form).forEach((item) => {
					this.form[item] = data[item];
				});
				// czlx 操作类型中(根据索引)
				// 0 sfqy：是否启用
				// 1 sfyxc：是否允许删除
				// 2 url: 判断是否禁用 ‘是否启用’字段
				// 3 sflb：判断是否为列表，是，列表
				this.form.czlx = '1';
				this.form.sfyxsc = czlxs[1];
				this.form.sfqy = czlxs[0];
				this.form.sflb = czlxs[3];
				this.disabledSfqy = czlxs[4]; // 1:'true', 0:'false'
			}, 1);
			// 设置新增编辑对话框内容
			this.dialog = {
				node,
				data,
				state: true,
				upper: node.parent.data.xwlxmc,
				title: '编辑新闻类型',
				switch: !!czlxs[2],
				level: node.level,
				hasClick: false
			};
		},
		// 删除 新闻类型
		del(store, data) {
			this.$confirm('此操作将会删除该新闻类型，是否继续？', '确认', {
				type: 'warning',
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.delData(store, data);
			}).catch(() => {});
		},
		// tree 右侧渲染函数
		// data 选中组的数据，store选中组的tree内置实例
		renderContent(h, { data, node }) {
			return h('news-tree', {
				props: { data, level: node.level, parent: node.parent.data },
				on: {
					editClick: () => {
						this.edit(node, data);
					},
					delClick: () => {
						this.del(node, data);
					}
				}
			});
		}
	},
	created() {
		// this.getData();
	}
};
</script>
<style >
	.query_wrap {
		padding-bottom: 10px;
	}
	.red {
		color: red;
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
	.notice{
		padding-left: 20px;
	}
</style>
