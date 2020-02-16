<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 网上支付对账表
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="起始时间">
							<date-ass
								:begin.sync="form.qssjks" :end.sync="form.qssjjs"
								propBegin="qssjks" propEnd="qssjjs"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="支付方式" prop="zffs">
							<el-select v-model="form.zffs">
								<el-option label="全部" value=""></el-option>
								<el-option label="支付宝" value="20"></el-option>
								<!-- <el-option label="微信" value="30"></el-option> -->
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submit">查询</el-button>
							<el-button @click="reset">重置</el-button>
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
				<h3 class="table_title">网上支付对账表<small v-show="results.length > 0"
					>（合计订单金额 {{totalOrderAmount}}元，合计支付金额 {{totalAmountOfPayment}}元）</small>
				</h3>
				<!-- show-summary :summary-method="getSum" -->
				<el-table :data="results"
					border stripe class="table_wrap width_100">
					<el-table-column label="订单号" prop="ddbh"></el-table-column>
					<el-table-column label="订单渠道" prop="ddqd"></el-table-column>
					<el-table-column label="支付方式" prop="zffs"></el-table-column>
					<el-table-column label="平台订单号" prop="ddpth"></el-table-column>
					<el-table-column label="订单金额（元）" prop="ddje"></el-table-column>
					<el-table-column label="支付金额（元）" prop="zfje"></el-table-column>
					<el-table-column label="订单时间" prop="ddsj" width="110"></el-table-column>
					<el-table-column label="支付时间" prop="zfsj" width="110"></el-table-column>
				</el-table>
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
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement10',
	components: { dateAss },
	data() {
		return {
			// label宽度
			labelWidth,
			// 加载状态
			loading: false,
			loadingEnd: false,
			// 查询表单
			form: {
				qssjks: '',
				qssjjs: '',
				zffs: '',
				pageNum: 1
			},
			formRight: {},
			// 查询结果
			results: [],
			pageTotal: 0,
			// 支付金额合计
			totalAmountOfPayment: '',
			// 订单金额合计
			totalOrderAmount: ''
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/wszfdztjdcCx?${urlQuery.join('&')}&pageSize=${this.pageTotal}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/wszfdztjCx', {
				params: this.formRight
			}).then((res) => {
				const data = res.returnData;
				this.results = data.wszfdztjs;
				this.totalAmountOfPayment = data.hjzfje;
				this.totalOrderAmount = data.hjddje;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
				this.loadingEnd = true;
			}).catch(() => {
				this.loading = false;
				this.loadingEnd = false;
			});
		},
		// 点击查询
		submit() {
			Object.assign(this.formRight, this.form);
			this.getData();
		},
		// 重置表单
		reset() {
			this.$refs.form.resetFields();
			this.loadingEnd = false;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style></style>
