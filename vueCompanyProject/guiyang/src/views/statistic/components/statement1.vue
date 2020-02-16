<docs>
	## 每月报省人才交流中心报表
	* @date ###### 2017年10月20日
	* @author shj
	* @desc 人才市场供求信息统计表一
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
								class="btn_square float_r" :loading="loading"
								:disabled="!loadingEnd"
								@click="exportDoc">导出</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start -->
		<div class="loading" v-loading="loading">
			<div class="statement_wrap" v-show="loadingEnd">
				<h3 class="table_title">人才市场供求信息统计表一<small>{{dateRange}}</small></h3>
				<p class="clearfix">
					<span class="float_l">填报单位：</span>
					<span class="float_r">贵阳市人力资源市场</span>
				</p>
				<table border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<td class="order" rowspan="3"></td>
							<td class="b" colspan="5">人才市场用人单位招聘需求排行（前20位）</td>
							<td class="b" colspan="5">人才市场各类人才择业需求排行（前20位）</td>
						</tr>
						<tr>
							<td rowspan="2">专业类型</td>
							<td rowspan="2">总需求数</td>
							<td colspan="3">学历分类</td>
							<td rowspan="2">专业类型</td>
							<td rowspan="2">总接洽人</td>
							<td colspan="3">学历分类</td>
						</tr>
						<tr>
							<td>本科以上</td>
							<td>本科</td>
							<td>本科以下</td>
							<td>本科以上</td>
							<td>本科</td>
							<td>本科以下</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in tableRows" :key="index">
							<td class="order">{{1 + index}}</td>
							<td align="left">{{results.zpxqph[index]? results.zpxqph[index].zymc : ''}}</td>
							<td>{{results.zpxqph[index]? results.zpxqph[index].rs : ''}}</td>
							<td>{{results.zpxqph[index]? results.zpxqph[index].bkysrs : ''}}</td>
							<td>{{results.zpxqph[index]? results.zpxqph[index].bkrs : ''}}</td>
							<td>{{results.zpxqph[index]? results.zpxqph[index].bkyxrs : ''}}</td>
							<td align="left">{{results.zyxqph[index]? results.zyxqph[index].zymc : ''}}</td>
							<td>{{results.zyxqph[index]? results.zyxqph[index].rs : ''}}</td>
							<td>{{results.zyxqph[index]? results.zyxqph[index].bkysrs : ''}}</td>
							<td>{{results.zyxqph[index]? results.zyxqph[index].bkrs : ''}}</td>
							<td>{{results.zyxqph[index]? results.zyxqph[index].bkyxrs : ''}}</td>
						</tr>
					</tbody>
					<tfoot>
						<tr height="30px">
							<td></td>
							<td>人才市场总体情况</td>
							<td colspan="11"></td>
						</tr>
						<tr class="count">
							<td colspan="2">招聘单位总数：</td>
							<td align="right" colspan="2"><span class="margin_r_10">{{results.zpdwzs}}</span></td>
							<td colspan="2">(家/次)</td>
						</tr>
						<tr class="count">
							<td colspan="2">招聘人数：</td>
							<td align="right" colspan="2"><span class="margin_r_10">{{results.zprs}}</span></td>
							<td colspan="2">(人)</td>
						</tr>
						<tr class="count">
							<td colspan="2">求职人员总数：</td>
							<td align="right" colspan="2"><span class="margin_r_10">{{results.qzryzs}}</span></td>
							<td colspan="2">(人次)</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement1',
	components: { dateAss },
	data() {
		return {
			// 总行数
			maxRows: 20,
			// label宽度
			labelWidth,
			// 加载中
			loading: false,
			// 加载结束
			loadingEnd: false,
			// 表头时间
			dateBegin: '',
			dateEnd: '',
			// 查询表单
			form: {
				qssjks: '',
				qssjjs: ''
			},
			formRight: {},
			results: {}
		};
	},
	computed: {
		tableRows() {
			if (this.loadingEnd) {
				const res = this.results;
				return res.zpxqph.length >= res.zyxqph.length ? res.zpxqph : res.zyxqph;
			}
		},
		dateRange() {
			if (!this.dateBegin && !this.dateEnd) {
				return '';
			}
			return `（${this.dateBegin}至${this.dateEnd}）`;
		}
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/rcscxxbdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/rcscxxbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.rcsctjjg;
				this.dateBegin = this.formRight.qssjks;
				this.dateEnd = this.formRight.qssjjs;
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
