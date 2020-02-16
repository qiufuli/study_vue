<docs>
	##
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 年度每月招聘情况统计表
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="form">
				<el-row>
					<el-col :span="6">
						<el-form-item label="年份" prop="nf">
							<el-date-picker v-model="form.nf"
								type="year" class="width_100" :clearable="false"
								:editable="false" placeholder="选择年"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="18">
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
		<div class="loading" v-loading="loading">
			<div class="statement_wrap" v-if="loadingEnd">
				<h3 class="table_title">年度每月招聘情况统计表</h3>
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<td width="30%" colspan="2">招聘名称</td>
							<td colspan="5"></td>
						</tr>
						<tr>
							<td rowspan="2" colspan="2">招聘情况</td>
							<td width="14%" rowspan="2">单位家数</td>
							<td colspan="2">提供岗位</td>
							<td width="14%" rowspan="2">求职人数</td>
							<td width="14%" rowspan="2">达成意向数</td>
						</tr>
						<tr>
							<td width="14%" class="no_bdt"></td>
							<td width="14%">其中高校毕业生人数</td>
						</tr>
					</thead>
					<tbody>
 						<template v-for="(item, index) in results">
							<tr align="center" :key="index">
								<td width="15%" rowspan="4"
									style="">{{ months[index] }}</td>
								<td width="15%" align="left">现场招聘会</td>
								<td width="14%">{{ results[index].xczphdws }}</td>
								<td width="14%">{{ results[index].xczphtggw }}</td>
								<td width="14%">{{ results[index].xczphtggwgx }}</td>
								<td width="14%">{{ results[index].xczphqqrs }}</td>
								<td width="14%">{{ results[index].xczphdcyxs }}</td>
							</tr>
							<tr align="center" :key="index">
								<td align="left">网络招聘</td>
								<td>{{ results[index].wlzpdws }}</td>
								<td>{{ results[index].wlzptggw }}</td>
								<td>{{ results[index].wlzphtggwgx }}</td>
								<td>{{ results[index].wlzpqzrs }}</td>
								<td>{{ results[index].wlzpdcyxs }}</td>
							</tr>
							<tr align="center" :key="index">
								<td align="left">委托招聘</td>
								<td>{{ results[index].wtzpdws }}</td>
								<td>{{ results[index].wtzptggw }}</td>
								<td>{{ results[index].wtzptggwgx }}</td>
								<td></td>
								<td></td>
							</tr>
							<tr align="center" :key="index">
								<td align="left"><span class="pl10">报纸招聘</span></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</template>
						<tr>
							<td colspan="2">合计</td>
							<td>{{total.hjdwsl}}</td>
							<td>{{total.hjzprs}}</td>
							<td>{{total.hjzpgxbysrs}}</td>
							<td>{{total.hjqzrs}}</td>
							<td>{{total.hjdcyxrs}}</td>
						</tr>
						<tr>
							<td colspan="2">备注</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';

export default {
	name: 'statement4',
	data() {
		const now = new Date();
		return {
			// label宽度
			labelWidth,
			// 加载状态
			loading: false,
			loadingEnd: false,
			// 查询表单
			form: {
				nf: now
			},
			formRight: {},
			// 十二个月的数据
			results: [],
			// 总计
			total: {},
			months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		};
	},
	methods: {
		// 导出
		exportDoc() {
			let year;
			if (typeof this.formRight.nf === 'object') {
				year = this.getYear(this.formRight.nf);
			}
			const url = `/gyrcht/bbtj/bbtj/ndmyzptjdcCx?nf=${year}`;
			window.open(url);
		},
		getYear(date) {
			return `${date.getFullYear()}`;
		},
		getData() {
			let year;
			if (typeof this.formRight.nf === 'object') {
				year = this.getYear(this.formRight.nf);
			}
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/ndmyzptjCx', {
				params: {
					nf: year
				}
			}).then((res) => {
				const data = res.returnData;
				// 十二月份数据数组
				this.results = data.ndmyzpqk;
				// 合计数据
				this.total = {
					hjdwsl: data.hjdwsl,
					hjzprs: data.hjzprs,
					hjzpgxbysrs: data.hjzpgxbysrs,
					hjqzrs: data.hjqzrs,
					hjdcyxrs: data.hjdcyxrs
				};
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
