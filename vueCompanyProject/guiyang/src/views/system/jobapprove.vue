<docs>
	##系统管理---职位审批拒绝原因
	* @author Lxy
	* @date 2018年5月22日
	* @desc 查询and添加
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="24" align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							:loading="loading"
							@click="handleAdd('formInfo')">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="序号" width="90" prop="xh"></el-table-column>
					<el-table-column label="拒绝原因" prop="dmmc"></el-table-column>
					<el-table-column label="操作" width="90" prop="dmid">
						<template scope="scope">
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination layout="total,prev,pager,next,jumper"
					:total="pageTotal" @current-change="getData" :current-page.sync="form.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog 编辑 start -->
		<el-dialog :title="salaryTitle" :visible.sync="dialogFormInfo" size="tiny" @close="cancel('formInfo')">
			<el-form :model="formInfo" ref="formInfo" :rules="rulesFormInfo" label-width="110px">
				<el-form-item label="职位审批拒绝原因" prop="dmmc" required>
					<el-input type="textarea" v-model="formInfo.dmmc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click.native="save('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 编辑 end -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'sysJobapprove',
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// ## 查询
			// * 加载状态
			loading: false,
			// * 数据
			form: {
				pageNum: 1
			},
			// * 验证规则
			rules: {},
			// * 查询结果
			results: [],
			// * 分页
			pageTotal: 0,
			salaryTitle: '',
			dialogFormInfo: false,
			formInfo: {
				dmmc: ''
			},
			rulesFormInfo: {
				dmmc: [{ validator: validator('40, "bz", "拒绝原因", false') }]
			}
		};
	},
	computed: {
		beginOption() {
			const end = this.formInfo.bzjssj;
			return {
				disabledDate(time) {
					return time.getTime() > new Date(end).getTime();
				}
			};
		},
		endOption() {
			const begin = this.formInfo.bzkssj;
			return {
				disabledDate(time) {
					return time.getTime() < new Date(begin).getTime();
				}
			};
		}
	},
	methods: {
		// // 点击查询
		// submitForm(formName) {
		// 	this.$refs[formName].validate((valid) => {
		// 		if (valid) {
		// 			this.form.pageNum = 1;
		// 			this.getData();
		// 		}
		// 	});
		// },
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/zwjswhCx',
			{ params: this.form }).then((res) => {
				this.results = res.returnData.jsyy;
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
			this.salaryTitle = '添加职位审批拒绝原因';
			this.dialogFormInfo = true;
		},
		// 删除拒绝原因
		btnDelete(row) {
			this.$confirm('该操作将会删除该拒绝原因，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData(row);
			}).catch(() => {});
		},
		// 删除拒绝原因 接口
		delData(row) {
			$.put('/gyrcht/xtgl/xtgl/zwjsSc', {
				dmid: row.dmid
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 点击取消
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogFormInfo = false;
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					setTimeout(() => {
						this.dialogFormInfo = false;
					}, 5);
				}
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			$.post('/gyrcht/xtgl/xtgl/zwjsxzBc', this.formInfo)
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
		}
	},
	created() {
		this.getData();
	}
};
</script>
<style scoped>
.width_100 {
	width: 100%;
}
</style>
