<docs>
	## 人事代理党委---思想汇报类别
	* @author jinglf000
	* @date 2017-08-06
	* @desc 添加、修改、删除思想汇报类型
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" label-width="25%" ref="queryForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="思想汇报类别名称" prop="sxhblxmc">
							<el-input v-model="form.sxhblxmc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit"
								@click.prevent="submit('queryForm')">查询</el-button>
							<el-button @click="reset('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="align_right">
						<el-button type="primary" size="small" class="btn_square" icon="plus"
							:loading="loading"
							@click="add('formType')">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!--查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="序号" prop="xh" width="110"></el-table-column>
					<el-table-column label="思想汇报类别名称" prop="sxhblxmc"></el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="scope">
							<el-button title="编辑" size="mini" icon="edit" type="primary"
								@click="edit(scope.row)"></el-button>
							<el-button title="删除" size="mini" icon="delete" type="danger"
								@click="del(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0"  >
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="formRight.pageNum">
					</el-pagination>
				</div>
			</div>
		</div>
		<!--查询结果 结束  -->
		<!--修改类型 对话框 开始  -->
		<el-dialog :title="dialogTitle" :visible.sync="dialog" size="tiny"
			@close="cancel('formType')">
			<el-form :model="formType" :rules="rulesType" :label-width="labelWidth" ref="formType">
				<el-form-item label="序号" prop="xh" class="is-required">
					<el-input v-model="formType.xh"></el-input>
				</el-form-item>
				<el-form-item label="类别名称" prop="sxhblxmc" class="is-required">
					<el-input v-model="formType.sxhblxmc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="cancel('formType')">取消</el-button>
				<el-button type="primary" @click="save('formType')">确定</el-button>
			</div>
		</el-dialog>
		<!--修改类型 对话框 结束  -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';

export default {
	name: 'partyThouType',
	data() {
		// 思想汇报类别 序号唯一性查询
		const checkOnlyNum = (rule, val, callback) => {
			if (!val) {
				return callback(new Error('序号不能为空'));
			}
			// 接口
			$.get('/gyrcht/rsdldw/rsdldw/xhCx', {
				params: {
					xh: val,
					sxhblx_id: this.formType.sxhblx_id,
					czlx: this.formType.czlx
				}
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error('序号重复！'));
				} else {
					callback();
				}
			}).catch(() => {});
		};
		// 思想汇报类别 名称唯一性查询
		const checkOnlyName = (rule, val, callback) => {
			const data = {
				sxhblxmc: this.formType.sxhblxmc,
				sxhblxid: this.formType.sxhblx_id,
				czlx: this.formType.czlx
			};
			$.get('/gyrcht/rsdldw/rsdldw/sxhblbmcCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback('类别名称重复！');
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			labelWidth,
			loading: false,
			form: {
				sxhblxmc: '',
				pageNum: 1
			},
			formRight: {},
			rules: {
				sxhblxmc: [{ validator: validator('64,"normal","思想汇报类别名称",true') }]
			},
			pageTotal: 0,
			results: [],
			dialogTitle: '',
			formType: {
				czlx: '',
				sxhblx_id: '',
				sxhblxmc: '',
				xh: ''
			},
			dialog: false,
			rulesType: {
				sxhblxmc: [{ validator: validator('64, "full", "思想汇报类别名称", false', checkOnlyName), trigger: 'blur' }],
				xh: [{ validator: validator('2, "num", "序号", false', checkOnlyNum), trigger: 'blur' }]
			}
		};
	},
	methods: {
		// 思想汇报类别 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/sxhblbCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.sxhblbs;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 删除 接口
		delData(id) {
			$.delete('/gyrcht/rsdldw/rsdldw/sxhblbSc', {
				params: {
					sxhblx_id: id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			});
		},
		// 添加/编辑思想汇报接口
		postData() {
			let msg;
			if (this.formType.czlx === '0') {
				msg = '添加成功！';
			} else {
				msg = '修改成功！';
			}
			$.post('/gyrcht/rsdldw/rsdldw/sxhblbBc', this.formType).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success(msg);
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			});
		},
		// 提交 查询
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置
		reset(formName) {
			this.$refs[formName].resetFields();
		},
		// 编辑类别
		edit(row) {
			this.dialog = true;
			setTimeout(() => {
				this.dialogTitle = '编辑';
				this.formType.czlx = '1';
				this.formType.xh = row.xh;
				this.formType.sxhblx_id = row.sxhblx_id;
				this.formType.sxhblxmc = row.sxhblxmc;
			}, 1);
		},
		// 删除类别
		del(row) {
			this.$confirm('此操作将永久删除该思想汇报类别，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData(row.sxhblx_id);
			}).catch(() => {});
		},
		// 添加类别
		add(formName) {
			this.dialog = true;
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.dialogTitle = '添加';
			this.formType.czlx = '0';
			this.formType.sxhblx_id = '';
		},
		// 对话框取消
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialog = false;
		},
		// 对话框提交
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					setTimeout(() => {
						this.dialog = false;
					}, 5);
				}
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>
<style>

</style>
