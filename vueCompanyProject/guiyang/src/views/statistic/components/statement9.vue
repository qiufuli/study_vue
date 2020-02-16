<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 操作员录入统计表
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
					<el-col :span="12">
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
				<h3 class="table_title">操作员录入统计表</h3>
				<!-- 添加合计  -->
				<el-table :data="results" show-summary
					border stripe class="table_wrap width_100">
					<el-table-column label="操作员" prop="czy"></el-table-column>
					<!-- 需要合计的列 -->
					<el-table-column sortable label="单位录入数量" prop="dwlrsl"></el-table-column>
					<el-table-column sortable label="职位录入数量" prop="zwlrsl"></el-table-column>
					<el-table-column sortable label="单位审批数量" prop="dwspsl"></el-table-column>
					<el-table-column sortable label="职位审批数量" prop="zwspsl"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement9',
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
				qssjjs: ''
			},
			formRight: {},
			// 查询结果
			results: []
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/czylrtjdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/czylrtjCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.czys;
				for (let i = 0; i < this.results.length; i++) {
					this.results[i].dwlrsl = parseInt(this.results[i].dwlrsl, 10);
					this.results[i].dwspsl = parseInt(this.results[i].dwspsl, 10);
					this.results[i].zwlrsl = parseInt(this.results[i].zwlrsl, 10);
					this.results[i].zwspsl = parseInt(this.results[i].zwspsl, 10);
				}
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
