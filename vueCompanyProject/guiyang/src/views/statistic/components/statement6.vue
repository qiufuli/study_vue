<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 单位发送短信统计表
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="起始时间">
							<date-ass
								:begin.sync="form.qssjks" :end.sync="form.qssjjs"
								propBegin="qssjks" propEnd="qssjjs"></date-ass>
						</el-form-item>
					</el-col>
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
				<h3 class="table_title">单位发送短信统计表</h3>
				<el-table :data="results" show-summary
					border stripe class="table_wrap width_100">
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column sortable label="数量" prop="dxsl"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement6',
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
				dwmc: '',
				qssjks: '',
				qssjjs: ''
			},
			formRight: {},
			// 验证
			rules: {
				dwmc: [{ validator: validator('128, "less", "单位名称", true') }]
			},
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
			const url = `/gyrcht/bbtj/bbtj/dwfsdxtjdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/dwfsdxtjCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.dxtjs;
				for (let i = 0; i < this.results.length; i++) {
					this.results[i].dxsl = parseInt(this.results[i].dxsl, 10);
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
			this.$refs.form.validate((valid) => {
				if (valid) {
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
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
