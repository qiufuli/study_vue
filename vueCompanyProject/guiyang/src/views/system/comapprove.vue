<docs>
	##系统管理---单位审批拒绝原因
	* @author Lxy
	* @date 2018年5月22日
	* @desc 查询and添加
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<!--<el-row>
					<el-col :span="6">
						<el-form-item label="年份" prop="nf">
							<el-date-picker v-model="form.nf" align="right" :editable="false" type="year" placeholder="选择年" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>-->
				<el-row>
					<!--<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('form')">查询</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>-->
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
					<el-table-column label="序号" prop="xh" width="90"></el-table-column>
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
				<el-form-item label="单位审批拒绝原因" prop="dmmc" required>
					<el-input type="textarea" v-model="formInfo.dmmc"></el-input>
				</el-form-item>
				<!--<el-form-item label="标准开始时间" prop="bzkssj">
					<el-date-picker v-model="formInfo.bzkssj" :editable="false" class="width_100"
						:picker-options="beginOption" @change="changeBegin">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="标准结束时间" prop="bzjssj">
					<el-date-picker v-model="formInfo.bzjssj" :editable="false" class="width_100"
						:picker-options="endOption" @change="changeEnd">
					</el-date-picker>
				</el-form-item>-->
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
	name: 'sysComApprove',
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
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/dwjswhCx',
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
			this.salaryTitle = '添加单位审批拒绝原因';
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
			$.put('/gyrcht/xtgl/xtgl/dwjsSc', {
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
			$.post('/gyrcht/xtgl/xtgl/dwjsxzBc', this.formInfo)
				.then((res) => {
					// this.formInfo.zdgzbz_id = '';
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
