<docs>
	##系统管理---最低工资标准
	* @author SHJ
	* @date 2017年8月19日
	* @desc 查询
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="年份" prop="nf">
							<el-date-picker v-model="form.nf" align="right" :editable="false" type="year" placeholder="选择年" class="width_100"></el-date-picker>
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
					<el-col :span="12" align="right">
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
					<el-table-column label="工资标准" prop="gzbz"></el-table-column>
					<el-table-column label="标准开始时间" prop="bzkssj"></el-table-column>
					<el-table-column label="标准结束时间" prop="bzjssj"></el-table-column>
					<el-table-column label="操作" width="90" prop="zdgzbz_id">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
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
				<el-form-item label="最低工资标准" prop="gzbz" required>
					<el-input type="text" v-model="formInfo.gzbz"></el-input>
				</el-form-item>
				<el-form-item label="标准开始时间" prop="bzkssj">
					<el-date-picker v-model="formInfo.bzkssj" :editable="false" class="width_100"
						:picker-options="beginOption" @change="changeBegin">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="标准结束时间" prop="bzjssj">
					<el-date-picker v-model="formInfo.bzjssj" :editable="false" class="width_100"
						:picker-options="endOption" @change="changeEnd">
					</el-date-picker>
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
	name: 'sysSalaryLow',
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// ## 查询
			// * 加载状态
			loading: false,
			// * 数据
			form: {
				nf: '',
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
				zdgzbz_id: '',
				gzbz: '',
				bzkssj: '',
				bzjssj: '',
				czlx: ''
			},
			rulesFormInfo: {
				gzbz: [{ validator: validator('4, "num", "工资标准", false') }],
				bzkssj: [{ required: true, message: '标准开始时间不能为空' }],
				bzjssj: [{ required: true, message: '标准结束时间不能为空' }]
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
		// 点击查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
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
			if (typeof this.form.nf === 'object') {
				this.form.nf = this.form.nf.getFullYear().toString();
			}
			$.get('/gyrcht/xtgl/xtgl/zdgzCx', {
				params: this.form
			}).then((res) => {
				this.results = res.returnData.zdgzlb;
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
			this.salaryTitle = '添加最低工资标准';
			this.dialogFormInfo = true;
			this.formInfo.czlx = '0';
		},
		// 编辑
		handleEdit(row) {
			this.salaryTitle = '编辑最低工资标准';
			setTimeout(() => {
				Object.keys(this.formInfo).forEach((item) => {
					this.formInfo[item] = row[item];
				});
				this.formInfo.czlx = '1';
			}, 1);
			this.dialogFormInfo = true;
		},
		// 开始时间 变化
		changeBegin(val) {
			this.$emit('update:begin', val);
		},
		// 结束时间 变化
		changeEnd(val) {
			this.$emit('update:end', val);
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
			$.post('/gyrcht/xtgl/xtgl/zdgzBc', this.formInfo)
				.then((res) => {
					this.formInfo.zdgzbz_id = '';
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
