<docs>
	## 审批管理---职位审批，查询页面
	### @author jinglf000
	### @date ###### Mon Jul 24 09:29:02 CST 2017
</docs>


<template>
	<div>
		<!-- 查询表单开始 -->
		<div class="query_wrap">
			<el-form :model="form" class="query" ref="queryForm" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc" type="text"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职位名称" prop="zwmc">
							<el-input v-model="form.zwmc" type="text"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="提交日期">
							<date-ass :begin.sync="form.tjrqks" :end.sync="form.tjrqjs"
							propBegin="tjrqks" propEnd="tjrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="招聘类型" prop="zplx" >
							<select-code v-model="form.zplx" code="gyrlzyw_qzzp_d_zplx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.zplx === '02'">
						<el-form-item label="招聘会日期" prop="zphrq" >
							<el-date-picker v-model="form.zphrq"
								class="width_100" :editable="false"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item>
							<el-button type="primary" @click.prevent="submitForm('queryForm')" native-type="submit" :loading="loading">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-form-item>
							<el-button type="primary" class="btn_square small_btn" icon="circle-check"
							@click="jobPublishApp">批量审批</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单结束  -->
		<div class="loading" v-loading="loading">
			<!-- 查询结果 开始-->
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100" ref="jobTable"
				@selection-change="jobtableSelect">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column label="职位名称" prop="zwmc"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc" min-width="180"></el-table-column>
					<el-table-column label="招聘类型" prop="zplxmc" min-width="130"></el-table-column>
					<el-table-column label="提交日期" prop="tjrq" min-width="110"></el-table-column>
					<el-table-column label="操作" width="90">
						<template scope="operate">
							<el-button icon="btn-approval" title="审批" size="mini" type="primary"
								@click="approval(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页开始 -->
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						:current-page.sync="formRight.pageNum"
						@current-change="getData"></el-pagination>
				</div>
				<!-- 分页结束 -->
			</div>
			<!-- 查询结果 结束-->
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import checkboxGroup from '@/common/vue/checkboxGroup';

export default {
	name: 'job',
	components: { dateAss, selectCode, checkboxGroup },
	data() {
		return {
			// 按钮权限
			btns: {},
			// 统一label宽度
			labelWidth,
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				dwmc: '',
				zwmc: '',
				zplx: '',
				tjrqks: '',
				tjrqjs: '',
				zphrq: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				dwmc: [{ validator: validator('128, "bz", "单位名称", true') }],
				zwmc: [{ validator: validator('64, "full", "职位名称", true') }]
			},
			// 查询结果
			results: [],
			formApprove: {
				dwzw_id: '',
				spzt: '30',
				zplx: '01',
				spbz: '',
				splx: '01',
				spyy: '',
				fsyzm: ''
			},
			// 总数
			pageTotal: 0
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.zplx': function (val) {
			if (val !== '02') {
				this.form.zphrq = '';
			}
		}
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
		// 执行查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/spgl/zwsp/zwsplbCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.zwsplb;
				this.pageTotal = +res.rowsCount || 0;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击审批
		approval(row) {
			this.$router.push({ name: 'appJobDetail',
				params: {
					id: row.dwzw_id,
					zplx: row.zplx,
					dwmc: row.dwmc,
					onLineApproval: this.btns.wssp,
					scenceApproval: this.btns.xcsp,
					entrustApproval: this.btns.wtsp
				}
			});
		},
		// 职位批量审批（发布选中的职位）
		jobPublishApp() {
			if (this.selectedRows.length === 0) {
				this.$message.warning('请先勾选审批的职位');
			} else {
				this.formApprove.dwzw_id =	this.selectedRows.map(item => item.dwzw_id).join(',');
				this.putData();
				this.dialogPublish = false;
			}
		},
		// 职位 接口
		putData() {
			$.put('/gyrcht/spgl/zwsp/zwxxXg', this.formApprove).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('职位审批成功!');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// table复选框选中
		jobtableSelect(rows) {
			this.selectedRows = rows;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 重载路由
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>

<style></style>
