<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 短信明细表
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="form">
				<el-row>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="短信内容" prop="dxnrgjz">
							<el-input v-model="form.dxnrgjz" placeholder="请输入关键字"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="起始时间">
							<date-ass
								:begin.sync="form.qssjks" :end.sync="form.qssjjs"
								propBegin="qssjks" propEnd="qssjjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="短信类型" prop="dxlx">
							<select-code v-model="form.dxlx" code="gyrlzyw_qzzp_d_dxlx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发送状态" prop="fszt">
							<el-select v-model="form.fszt">
								<el-option label="全部" value=""></el-option>
								<el-option label="成功" value="1"></el-option>
								<el-option label="失败" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submit('form')">查询</el-button>
							<el-button @click="reset('form')">重置</el-button>
							<el-button
								type="primary" icon="btn-download" size="small"
								:disabled="!loadingEnd"
								class="btn_square float_r" :loading="loading"
								@click="exportDoc">导出</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start -->
		<div class="loading" v-loading="loading" v-show="loadingEnd">
			<div class="no_padding statement_wrap">
				<h3 class="table_title">短信明细表<span v-show="messageTotal">（合计：{{ messageTotal }}条）</span></h3>
				<el-table :data="results"
					border stripe class="table_wrap width_100">
					<el-table-column label="手机号" prop="sjh" width="120"></el-table-column>
					<el-table-column label="短信内容" prop="dxnr" min-width="300"></el-table-column>
					<el-table-column label="短信类型" prop="dxlx"></el-table-column>
					<el-table-column label="条数" prop="fsts"></el-table-column>
					<el-table-column label="发送状态" prop="fszt">
						<template scope="postCode">
							<span>{{ +postCode.row.fszt? '成功' : '失败' }}</span>
						</template>
					</el-table-column>
					<el-table-column label="发送人" prop="fsr"></el-table-column>
					<el-table-column label="发送时间" prop="fssj" width="110"></el-table-column>
				</el-table>
			</div>
		</div>
		<div class="pagination_wrap" v-show="results.length > 0 && loadingEnd">
			<el-pagination
				layout="total,prev,pager,next,jumper"
				:total="pageTotal"
				@current-change="getData"
				:current-page.sync="formRight.pageNum">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'statement8',
	components: { dateAss, selectCode },
	data() {
		return {
			// label宽度
			labelWidth,
			// 加载状态
			loading: false,
			loadingEnd: false,
			// 查询表单
			form: {
				sjh: '',
				dxnrgjz: '',
				qssjks: '',
				qssjjs: '',
				fszt: '',
				dxlx: '',
				pageNum: 1
			},
			// 待提交表单
			formRight: {},
			// 验证
			rules: {
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }],
				dxnrgjz: [{ validator: validator('256, "full", "短信内容", true') }]
			},
			// 查询结果
			results: [],
			pageTotal: 0,
			messageTotal: ''
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/dxmxtjdcCx?${urlQuery.join('&')}&pageSize=${this.pageTotal}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/dxmxtjCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.dxmxs;
				this.messageTotal = res.returnData.hjdxts;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
				this.loadingEnd = true;
			}).catch(() => {
				this.loading = false;
				this.loadingEnd = false;
			});
		},
		// 点击查询
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		reset(formName) {
			this.$refs[formName].resetFields();
			this.loadingEnd = false;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style></style>
