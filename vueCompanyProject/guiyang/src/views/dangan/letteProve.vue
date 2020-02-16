<docs>
	##人事代理党委---党组织维护
	* @date ###### Mon Aug 7 16:47:23 CST 2018
	* @author lvlp
	* @desc 调档函综合查询 查询 （目前已隐藏该目录——181108）
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="queryForm">
				<el-row>
          <el-col :span="12">
						<el-form-item label="审核日期">
							<date-ass
								:begin.sync="form.shksrq" :end.sync="form.shjsrq"
								propBegin="shksrq" propEnd="shjsrq"></date-ass>
						</el-form-item>
					</el-col>
          <el-col :span="12">
						<el-form-item label="申请日期">
							<date-ass
								:begin.sync="form.sqrqs" :end.sync="form.sqrqz"
								propBegin="sqrqs" propEnd="sqrqz"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
					<el-col :span="12">
						<el-form-item label="邮件发送日期">
							<date-ass
								:begin.sync="form.fsyjksrq" :end.sync="form.fsyjjsrq"
								propBegin="fsyjksrq" propEnd="fsyjjsrq"></date-ass>
						</el-form-item>
					</el-col>
          <el-col :span="6">
            <el-form-item label="身份证号" prop="sfzh">
              <el-input v-model="form.sfzh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
						<el-form-item label="流程状态" prop="lczt">
              <select-code v-model="form.lczt" code="gyrlzyw_ld_d_zmlczt"></select-code>
						</el-form-item>
					</el-col>
        </el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button native-type="submit" type="primary" :loading="loading"
								@click.prevent="submit('queryForm')">查询</el-button>
							<el-button @click="reset('queryForm')" >重置</el-button>
						</el-form-item>
					</el-col>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<!--<template scope="state">
							<span>{{ state.row.xb ==='1' ? '男' : '女' }}</span>
						</template>-->
					</el-table-column>
					<el-table-column label="身份证号码" prop="sfzh"></el-table-column>
					<el-table-column label="学历" prop="xl"></el-table-column>
					<el-table-column label="手机号" prop="sjh"></el-table-column>
					<el-table-column label="审核日期" prop="shrq"></el-table-column>
					<el-table-column label="调档函编号" prop="ddhbh"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="form.pageNum"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'danganLetteProve',
	components: { dateAss, selectCode },
	data() {
		return {
			labelWidth,
			loading: false,
			form: {
				sqrqs: '', // 申请日期始
				sqrqz: '', // 申请日期止
				fsyjksrq: '', // 邮件发送开始日期
				fsyjjsrq: '', // 邮件发送结束日期
				lczt: '', // 流程状态
				sfzh: '', // 身份证号
				shksrq: '', // 审核开始日期
				shjsrq: '', // 审核结束日期
				pageNum: 1
			},
			rules: {
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", true') }]
			},
			results: [],
			dialog: false,
			pageTotal: 0
		};
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ldryda/ldryda/ddhzhCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.ddhlsxx;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询提交表单
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					this.getData();
				}
			});
		},
		// 查询重置表单
		reset(formName) {
			this.$refs[formName].resetFields();
		},
		// 分页 查询
		pageChange(val) {
			this.form.pageNum = val;
			this.getData();
		}
	},
	created() {
		this.getData();
	}
};
</script>
