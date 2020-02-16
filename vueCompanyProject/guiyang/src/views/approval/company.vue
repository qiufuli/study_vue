<docs>
	## 审批管理---单位审批，查询页面
	### @author jinglf000
	### @date ###### Mon Jul 24 09:29:02 CST 2017
</docs>

<template>
	<div class="">
		<!-- 查询表单 开始 -->
		<div class="query_wrap">
			<el-form :model="form" ref="queryForm" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input type="text" v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input type="text" v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="注册日期">
							<date-ass
								:begin.sync="form.zcrqks" :end.sync="form.zcrqjs"
								propBegin="zcrqks" propEnd="zcrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="提交日期">
							<date-ass
								:begin.sync="form.tjrqks" :end.sync="form.tjrqjs"
								propBegin="tjrqks" propEnd="tjrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 结束 -->
		<!-- 查询结果 开始-->
		<div class="loading" v-loading="loading">
			<!-- 查询表格 开始 -->
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="单位名称" prop="dwmc" min-width="140"></el-table-column>
					<el-table-column label="注册日期" prop="zcrq" width="130"></el-table-column>
					<el-table-column label="提交日期" prop="tjrq" width="150"></el-table-column>
					<!--<el-table-column label="联系人" prop="lxr"></el-table-column>-->
					<el-table-column label="手机号码" prop="sjh" width="130"></el-table-column>
					<!--<el-table-column label="单位类型" prop="dwlxmc"></el-table-column>-->
					<!--<el-table-column label="所属行业" prop="sshymc"></el-table-column>-->
					<el-table-column label="操作" fixed="right" width="90">
						<template scope="operate">
							<el-button icon="btn-approval" title="审批" size="mini" type="primary"
								@click="approval(operate.row.dwxxrz_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 查询表格 结束 -->
			<!-- 查询分页 开始 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
			<!-- 查询分页 结束 -->
		</div>
		<!-- 查询结果 结束 -->
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'company',
	components: {
		dateAss
	},
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
				sjh: '',
				zcrqks: '',
				zcrqjs: '',
				tjrqks: '',
				tjrqjs: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				dwmc: [{ validator: validator('128, "less", "单位名称", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }]
			},
			// 查询结果
			results: [],
			pageTotal: 0
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
		// 执行查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/spgl/dwsp/dwsplbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.dwsplb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击审批
		approval(companyId) {
			this.$router.push({ name: 'appCompanyDetail', params: { id: companyId, canSave: this.btns.dwsp } });
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
