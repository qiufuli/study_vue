<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 薪酬统计表（职位类别）
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
						<el-form-item label="职位分类" prop="zwfl">
							<job-select v-model="form.zwfl" :changeOnSelect="false"></job-select>
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
				<h3 class="table_title">薪酬统计表（职位类别）</h3>
				<el-table :data="results"
					border stripe class="table_wrap width_100">
					<el-table-column label="职位分类" prop="zwflmc"></el-table-column>
					<el-table-column label="平均工资" prop="pjgz"></el-table-column>
					<el-table-column label="最低工资" prop="zdgz"></el-table-column>
					<el-table-column label="最高工资" prop="zggz"></el-table-column>
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
import jobSelect from '@/common/vue/multiSelect/jobSelect';

export default {
	name: 'statement5',
	components: { dateAss, jobSelect },
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
				zwfl: '',
				pageNum: 1
			},
			formRight: {},
			results: [],
			pageTotal: 0
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/xctjbzwdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/xctjbzwCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.xctjs;
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
