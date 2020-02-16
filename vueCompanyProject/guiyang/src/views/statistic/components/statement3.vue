<docs>
	##
	* @date ###### 2017年10月20日
	* @author shj
	* @desc 离校毕业生专场活动情况统计表
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth"
				ref="form">
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
		<div class="loading" v-loading="loading">
			<div class="statement_wrap" v-if="loadingEnd">
				<h3 class="table_title">第二届部分大中城市联合招聘<br>高校毕业生专场活动情况统计表</h3>
				<p class="chop">招聘单位（章）：</p>
				<h3 class="table_title">一、网络招聘会分会场网站情况统计表</h3>
				<table border="0" cellspacing="0" cellpadding="0" class="pl_10 align_l">
					<tbody>
						<tr>
							<td colspan="5" class="no_bd">一、招聘情况统计</td>
						</tr>
						<tr>
							<td width="50%" colspan="2">统计项</td>
							<td width="50%" colspan="3">数量</td>
						</tr>
						<tr>
							<td colspan="2">用人单位数量</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.yrdwsl}}</td>
						</tr>
						<tr>
							<td colspan="2">发布职位数量</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.fbzwsl}}</td>
						</tr>
						<tr>
							<td colspan="2">拟招聘人数</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.nzprs}}</td>
						</tr>
						<tr>
							<td colspan="2">注册简历人数</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.zcjlrs}}</td>
						</tr>
						<tr>
							<td width="17%" class="no_bdt"></td>
							<td>其中：外地生源毕业生人数</td>
							<td class="no_bdt"></td>
							<td colspan="2">{{results.byszchdtjjg.zpqks.wdsybysrs}}</td>
						</tr>
						<tr>
							<td colspan="2">投递简历次数</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.tdjlcs}}</td>
						</tr>
						<tr>
							<td colspan="2">初步达成意向人数</td>
							<td colspan="3">{{results.byszchdtjjg.zpqks.cbdcyxrs}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">二、单位性质分布</td>
						</tr>
						<tr>
							<td colspan="2">单位性质</td>
							<td>单位数量</td>
							<td>招聘人数</td>
							<td>简历投递数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.dwxzs" :key="index">
							<td colspan="2">{{item.dwxzmc}}</td>
							<td>{{item.dwsl}}</td>
							<td>{{item.zprs}}</td>
							<td>{{item.jltds}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">三、外地单位在本地招聘情况</td>
						</tr>
						<tr>
							<td colspan="2">地域</td>
							<td>单位数量</td>
							<td>招聘人数</td>
							<td>简历投递数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.dyzps" :key="index">
							<td colspan="2">{{item.dy}}</td>
							<td>{{item.dwsl}}</td>
							<td>{{item.zprs}}</td>
							<td>{{item.jltds}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">四、行业分布情况</td>
						</tr>
						<tr>
							<td colspan="2">行业大类</td>
							<td>单位数量</td>
							<td>招聘人数</td>
							<td>简历投递数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.hyfbs" :key="index">
							<td colspan="2">{{item.hydlmc}}</td>
							<td>{{item.dwsl}}</td>
							<td>{{item.zprs}}</td>
							<td>{{item.jltds}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">五、学历分布情况</td>
						</tr>
						<tr>
							<td colspan="2">学历</td>
							<td>职位数量</td>
							<td>招聘人数</td>
							<td>简历投递数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.xlfbs" :key="index">
							<td colspan="2">{{item.xlmc}}</td>
							<td>{{item.zwsl}}</td>
							<td>{{item.zprs}}</td>
							<td>{{item.jltds}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">六、求职者专业分布情况</td>
						</tr>
						<tr>
							<td colspan="2">学科门类</td>
							<td>简历注册数</td>
							<td colspan="2">初步达成意向人数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.qzzzyfbs" :key="index">
							<td colspan="2">{{item.xkmlmc}}</td>
							<td>{{item.jlzcs}}</td>
							<td colspan="2">{{item.cbdcyxrs}}</td>
						</tr>
						<tr>
							<td colspan="5" class="no_bd">七、职位分布情况</td>
						</tr>
						<tr>
							<td colspan="2">职位大类</td>
							<td>招聘人数</td>
							<td colspan="2">简历投递数</td>
						</tr>
						<tr v-for="(item, index) in results.byszchdtjjg.zwfbs" :key="index">
							<td colspan="2">{{item.zwdlmc}}</td>
							<td>{{item.zprs}}</td>
							<td colspan="2">{{item.jltds}}</td>
						</tr>
					</tbody>
				</table>
				<p class="remarks">备注：
					<br>1.此表由参与单位负责填写
					<br>2.网络招聘会中“初步达成意向”是指：求职者在线投递简历后，用人单位根据其简历、专业等基本条件进行筛选，初步认为可以进入下一轮测试。
					<br>3.请统计活动期间，在本网站招聘高校毕业生的用人单位情况及求职的高校毕业生情况。
					<br>4.本表电子版可在中国国家人才网活动专栏中下载。</p>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement3',
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
			results: {}
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/byszchddcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/byszchdCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData;
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
