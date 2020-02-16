<docs>
	##系统管理---友情链接
	* @author SHJ
	* @date 2017年8月26日
	* @desc 查询、添加/编辑、删除功能
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="链接类型" prop="ljlx">
							<select-code v-model="form.ljlx" code="gyrlzyw_qzzp_d_ljlx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="链接名称" prop="ljmc">
							<el-input type="text" v-model="form.ljmc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('form')">查询</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item align="right">
							<el-button icon="plus" size="small" type="primary" class="btn_square"
								@click="handleAdd('formLink')" :loading="loading">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100">
					<el-table-column label="链接类型" prop="ljlxmc"></el-table-column>
					<el-table-column label="链接名称" prop="ljmc"></el-table-column>
					<el-table-column label="链接URL" prop="ljurl"></el-table-column>
					<el-table-column label="操作" align="center" width="130">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row.yqlj_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog弹出对话框 添加/编辑 start -->
		<el-dialog :title="linkTitle" size="tiny" :visible.sync="dialogLink" @close="cancel('formLink')">
			<el-form ref="formLink" :model="formLink" :rules="rulesLink" :label-width="labelWidth">
				<el-form-item label="链接类型" prop="ljlx">
					<select-code v-model="formLink.ljlx" code="gyrlzyw_qzzp_d_ljlx" :hasAll="false"></select-code>
				</el-form-item>
				<el-form-item label="链接名称" prop="ljmc" class="is-required">
					<el-input type="text" v-model="formLink.ljmc"></el-input>
				</el-form-item>
				<el-form-item label="链接URL" prop="ljurl" required>
					<el-input type="text" v-model="formLink.ljurl" placeholder="例如：http://www.gyrc.cn/"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="px" class="is-required">
					<el-input type="text" v-model="formLink.px" :disabled="!formLink.ljlx"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formLink')">取消</el-button>
				<el-button type="primary" @click.native="save('formLink')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog弹出对话框 添加/编辑 end -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';

export default {
	name: 'sysFriendLink',
	components: {
		dateAss,
		selectCode
	},
	data() {
		// 链接名称 唯一性查询
		const checkOnlyName = (rule, val, callback) => {
			// 接口
			const data = {
				yqlj_id: this.formLink.yqlj_id,
				ljmc: this.formLink.ljmc,
				czlx: this.formLink.czlx
			};
			$.get('/gyrcht/xtgl/xtgl/yqljmcCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		// 排序 唯一性查询
		const checkOnlySort = (rule, val, callback) => {
			// 接口
			const data = {
				yqlj_id: this.formLink.yqlj_id,
				px: this.formLink.px,
				ljlx: this.formLink.ljlx,
				czlx: this.formLink.czlx
			};
			$.get('/gyrcht/xtgl/xtgl/yqljpxCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			// 统一的label宽度
			labelWidth,
			// 查询加载状态
			loading: false,
			// 查询表单
			form: {
				ljlx: '',
				ljmc: '',
				pageNum: 1
			},
			formRight: {},
			// 查询表单 验证规则
			rules: {
				ljmc: [{ validator: validator('48, " full", "链接名称", true') }]
			},
			// 查询结果
			results: [],
			// 查询结果 总条数
			pageTotal: 0,
			// 添加/编辑弹窗标题
			linkTitle: '',
			// 是否可见
			dialogLink: false,
			// 弹窗表单
			formLink: {
				ljlx: '',
				ljmc: '',
				ljurl: '',
				px: '',
				yqlj_id: '',
				czlx: ''
			},
			// 弹窗表单 验证规则
			rulesLink: {
				ljlx: [{ required: true, message: '请选择链接类型' }],
				ljmc: [{ validator: validator('48, "full", "链接名称", false', checkOnlyName), trigger: 'blur' }],
				ljurl: [{ validator: validator('128, "url", "链接URL", false') }],
				px: [{ validator: validator('2, "num", "排序", false', checkOnlySort), trigger: 'blur' }]
			}
		};
	},
	methods: {
		// 点击查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/yqljlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.ljlxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 添加
		handleAdd(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.linkTitle = '添加友情链接';
			this.dialogLink = true;
			this.formLink.czlx = '0';
		},
		// 编辑
		handleEdit(row) {
			this.linkTitle = '编辑友情链接';
			setTimeout(() => {
				Object.keys(this.formLink).forEach((item) => {
					this.formLink[item] = row[item];
				});
				this.formLink.czlx = '1';
			}, 1);
			this.dialogLink = true;
		},
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogLink = false;
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					setTimeout(() => {
						this.dialogLink = false;
					}, 5);
				}
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			$.post('/gyrcht/xtgl/xtgl/yqljBc', this.formLink)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
						this.getData();
					} else {
						this.$message.error(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		},
		// 删除
		handleDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.delData(id);
			}).catch(() => {
			});
		},
		delData(id) {
			$.delete('/gyrcht/xtgl/xtgl/yqljSc', {
				params: {
					yqlj_id: id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getData();
	}
};
</script>
<style>

</style>
