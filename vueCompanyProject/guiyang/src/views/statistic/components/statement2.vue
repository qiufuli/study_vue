<docs>
	##
	* @date ###### 2017年11月1日
	* @author shj
	* @desc 每季度报省厅报表（高校毕业生）
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth"
				ref="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="起始月份">
							<date-ass dateType="month"
								:begin.sync="form.qsyfks" :end.sync="form.qsyfjs"
								propBegin="qsyfks" propEnd="qsyfjs"></date-ass>
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
			<div class="statement_wrap" v-show="loadingEnd">
				<h3 class="table_title">高校毕业生就业服务统计报表</h3>
				<p class="clearfix">
					<span class="float_l">市（州、地）名称：贵阳市人力资源市场</span>
					<span class="float_r">年&emsp;&emsp;&emsp;季度</span>
				</p>
				<el-tabs v-model="activeName">
					<!-- 总表 -->
					<el-tab-pane label="总表" name="tab1">
						<table border="0" cellspacing="0" cellpadding="0" class="diy_table">
							<thead>
								<tr>
									<td rowspan="4">项目</td>
									<td rowspan="4">本季度接待服务人员总数</td>
									<td class="b" colspan="13">登记要求就业情况</td>
								</tr>
								<tr>
									<td rowspan="3">本季度登记要求就业人员总数</td>
									<td colspan="12">&nbsp;</td>
								</tr>
								<tr>
									<td rowspan="2">大专及以下</td>
									<td rowspan="2">本科</td>
									<td rowspan="2">硕士及以上</td>
									<td rowspan="2">35岁以下</td>
									<td rowspan="2">36岁至55岁</td>
									<td rowspan="2">56岁以上</td>
									<td rowspan="2">本季度登记求职的高校毕业生人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="2">本季度登记失业的高校毕业生人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="2">本季度新认定的困难高校毕业生人数</td>
									<td class="no_bdl">&nbsp;</td>
								</tr>
								<tr>
									<td>女性</td>
									<td>女性</td>
									<td>女性</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="6%">序号</td>
									<td width="6%">1</td>
									<td width="6%">2</td>
									<td width="6%">3</td>
									<td width="6%">4</td>
									<td width="6%">5</td>
									<td width="6%">6</td>
									<td width="6%">7</td>
									<td width="6%">8</td>
									<td width="6%">9</td>
									<td width="6%">10</td>
									<td width="6%">11</td>
									<td width="6%">12</td>
									<td width="6%">13</td>
									<td width="6%">14</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>{{results.bjdjyrs}}</td>
									<td>{{results.bjddjjyrs}}</td>
									<td>{{results.bkyxrs}}</td>
									<td>{{results.bkrs}}</td>
									<td>{{results.bkysrs}}</td>
									<td>{{results.tjnlyxrs}}</td>
									<td>{{results.tjnlrs}}</td>
									<td>{{results.tjnlysrs}}</td>
									<td>{{results.qzdjbysjyrs}}</td>
									<td>{{results.qzdjbysjynvrs}}</td>
									<td>{{results.sydjbysjyrs}}</td>
									<td>{{results.sydjbysjynvrs}}</td>
									<td>{{results.knbysjyrs}}</td>
									<td>{{results.knbysjynvrs}}</td>
								</tr>
								<tr>
									<td>总计</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</el-tab-pane>
					<el-tab-pane label="续表1" name="tab2">
						<table border="0" cellspacing="0" cellpadding="0" class="diy_table">
							<thead>
								<tr>
									<td class="b" colspan="7">实现就业情况</td>
									<td class="b" colspan="4">服务用人单位情况</td>
									<td class="b" colspan="6">现场招聘服务</td>
								</tr>
								<tr>
									<td rowspan="3">本季度帮助实现就业人数</td>
									<td class="no_bdl" colspan="6">&nbsp;</td>
									<td rowspan="3">本季度服务用人单位数</td>
									<td class="no_bdl" colspan="3">&nbsp;</td>
									<td rowspan="3">现场招聘单位总数</td>
									<td class="no_bdl" colspan="3">&nbsp;</td>
									<td rowspan="3">本季度举办招聘会次数</td>
									<td class="no_bdl">&nbsp;</td>
								</tr>
								<tr>
									<td rowspan="2">登记求职的高校毕业生实现就业人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="2">登记失业的高校毕业生实现就业人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="2">认定的困难高校毕业生实现就业人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="2">国有企、事业单位数</td>
									<td rowspan="2">民营企、事业单位数</td>
									<td rowspan="2">外资企业数</td>
									<td rowspan="2">国有企、事业单位数</td>
									<td rowspan="2">民营企、事业单位数</td>
									<td rowspan="2">外资企业数</td>
									<td rowspan="2">毕业生专场数</td>
								</tr>
								<tr>
									<td>女性</td>
									<td>女性</td>
									<td>女性</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="5%">15</td>
									<td width="5%">16</td>
									<td width="5%">17</td>
									<td width="5%">18</td>
									<td width="5%">19</td>
									<td width="5%">20</td>
									<td width="5%">21</td>
									<td width="5%">22</td>
									<td width="5%">23</td>
									<td width="5%">24</td>
									<td width="5%">25</td>
									<td width="5%">26</td>
									<td width="5%">27</td>
									<td width="5%">28</td>
									<td width="5%">29</td>
									<td width="5%">30</td>
									<td width="5%">31</td>
								</tr>
								<tr>
									<td>{{results.bjdbzsxjyrs}}</td>
									<td>{{results.bzqzdjbysjyrs}}</td>
									<td>{{results.bzqzdjbysjynvrs}}</td>
									<td>{{results.bzsydjbysjyrs}}</td>
									<td>{{results.bzsydjbysjynvrs}}</td>
									<td>{{results.bzknbysjyrs}}</td>
									<td>{{results.bzknbysjynvrs}}</td>
									<td>{{results.bjdfwyrdwsl}}</td>
									<td>{{results.gydwsl}}</td>
									<td>{{results.mydwsl}}</td>
									<td>{{results.wzqysl}}</td>
									<td>{{results.xczpdwsl}}</td>
									<td>{{results.xcgydwsl}}</td>
									<td>{{results.xcmydwsl}}</td>
									<td>{{results.xcwzqysl}}</td>
									<td>{{results.xczphsl}}</td>
									<td>{{results.xcbyszcsl}}</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</el-tab-pane>
					<el-tab-pane label="续表2" name="tab3">
						<table border="0" cellspacing="0" cellpadding="0" class="diy_table">
							<thead>
								<tr>
									<td class="b" colspan="7">现场招聘服务</td>
									<td class="b" colspan="10">网络招聘服务</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td rowspan="3">提供招聘岗位数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="3">参会求职人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="3">达成初步就业意向人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="3">网络招聘单位总数</td>
									<td class="no_bdl" colspan="3">&nbsp;</td>
									<td rowspan="3">发布需求岗位数（个/次）</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="3">发布求职信息人数</td>
									<td class="no_bdl">&nbsp;</td>
									<td rowspan="3">本季度举办网络招聘会次数</td>
									<td class="no_bdl">&nbsp;</td>
								</tr>
								<tr>
									<td rowspan="2">参会招聘单位数</td>
									<td rowspan="2">面向毕业生岗位数</td>
									<td rowspan="2">参会毕业生</td>
									<td rowspan="2">毕业生达成就业意向数</td>
									<td rowspan="2">国有企、事业单位数</td>
									<td rowspan="2">民营企、事业单位数</td>
									<td rowspan="2">外资企业数</td>
									<td rowspan="2">面向毕业生岗位数（个/次）</td>
									<td rowspan="2">高校毕业生发布求职信息人数</td>
									<td rowspan="2">参会单位数</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="5%">32</td>
									<td width="5%">33</td>
									<td width="5%">34</td>
									<td width="5%">35</td>
									<td width="5%">36</td>
									<td width="5%">37</td>
									<td width="5%">38</td>
									<td width="5%">39</td>
									<td width="5%">40</td>
									<td width="5%">41</td>
									<td width="5%">42</td>
									<td width="5%">43</td>
									<td width="5%">44</td>
									<td width="5%">45</td>
									<td width="5%">46</td>
									<td width="5%">47</td>
									<td width="5%">48</td>
								</tr>
								<tr>
									<td>{{results.xcchzpdwsl}}</td>
									<td>{{results.xczpgwsl}}</td>
									<td>{{results.xcbysgwsl}}</td>
									<td>{{results.xcchqzrs}}</td>
									<td>{{results.xcchbysrs}}</td>
									<td>{{results.xcdccbjyyxrs}}</td>
									<td>{{results.xcbysdcjyyxrs}}</td>
									<td>{{results.wlzpdwsl}}</td>
									<td>{{results.wlgydwsl}}</td>
									<td>{{results.wlmydwsl}}</td>
									<td>{{results.wlwzqysl}}</td>
									<td>{{results.wlzpgwsl}}</td>
									<td>{{results.wlbysgwsl}}</td>
									<td>{{results.wlqzrs}}</td>
									<td>{{results.wlbysqzrs}}</td>
									<td>{{results.wlzphcs}}</td>
									<td>{{results.wlzphchdws}}</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</el-tab-pane>
					<el-tab-pane label="续表3" name="tab4">
						<table border="0" cellspacing="0" cellpadding="0" class="diy_table">
							<thead>
								<tr>
									<td class="b" colspan="3">网络招聘服务</td>
									<td class="b" colspan="3">流动人员档案管理</td>
									<td class="b" colspan="2">培训服务</td>
									<td class="b" colspan="2">测评服务</td>
									<td class="b" colspan="2">猎头服务</td>
									<td class="b" colspan="4">劳务（人才）派遣服务</td>
								</tr>
								<tr>
									<td colspan="3">&nbsp;</td>
									<td rowspan="3">现存档案总量数</td>
									<td rowspan="3">本季度新增档案份数</td>
									<td rowspan="3">以档案为依托的相关服务人员数</td>
									<td rowspan="3">本季度举办培训班（期/次）</td>
									<td rowspan="3">参加人数</td>
									<td rowspan="3">本季度组织测评（次数）</td>
									<td rowspan="3">测评人数</td>
									<td rowspan="3">本季度服务用人单位数</td>
									<td rowspan="3">成功推荐人才数</td>
									<td rowspan="3">委托派遣单位总数</td>
									<td rowspan="3">派遣人员总数</td>
									<td rowspan="3">本季度委托派遣单位数</td>
									<td rowspan="3">本季度派遣人数</td>
								</tr>
								<tr>
									<td rowspan="2">需求岗位数</td>
									<td rowspan="2">达成初步就业意向人数</td>
									<td class="no_bdl">&nbsp;</td>
								</tr>
								<tr>
									<td>毕业生达成初步就业意向人数</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="6%">49</td>
									<td width="6%">50</td>
									<td width="6%">51</td>
									<td width="6%">52</td>
									<td width="6%">53</td>
									<td width="6%">54</td>
									<td width="6%">55</td>
									<td width="6%">56</td>
									<td width="6%">57</td>
									<td width="6%">58</td>
									<td width="6%">59</td>
									<td width="6%">60</td>
									<td width="6%">61</td>
									<td width="6%">62</td>
									<td width="6%">63</td>
									<td width="6%">64</td>
								</tr>
								<tr>
									<td>{{results.wlzpxqgwsl}}</td>
									<td>{{results.wldccbjyyxrs}}</td>
									<td>{{results.wlbysdcjyyxrs}}</td>
									<td>{{results.xcdasl}}</td>
									<td>{{results.xzdafs}}</td>
									<td>{{results.daxgfwrys}}</td>
									<td>{{results.jbpxbs}}</td>
									<td>{{results.pxbcjrs}}</td>
									<td>{{results.cpcs}}</td>
									<td>{{results.cprs}}</td>
									<td>{{results.fwyrdws}}</td>
									<td>{{results.cgtjrcs}}</td>
									<td>{{results.wtpqdws}}</td>
									<td>{{results.pqrys}}</td>
									<td>{{results.bjdwtpqdws}}</td>
									<td>{{results.pqrs}}</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</el-tab-pane>
				</el-tabs>
				<el-row class="info">
					<el-col :span="6">负责人：</el-col>
					<el-col :span="6">填表人：</el-col>
					<el-col :span="6">联系电话：</el-col>
					<el-col :span="6">填表日期：{{writeDate}}</el-col>
				</el-row>
				<p class="remarks">填报说明：
					<br>1、本表为季度报表，由各市、州、地人才交流服务机构于每季度结束后2个工作日内报省人事厅人才交流中心，遇节假日顺延。
					<br>2、各市、州、地人才交流服务机构除上报纸质统计表外，还需要将电子版的统计报表发到以下邮箱：pengjiank@sohu.com。
					<br>联系人：彭健康，联系电话：0851-8640291。</p>
			</div>
		</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'statement2',
	components: { dateAss },
	data() {
		return {
			// label宽
			labelWidth,
			// 加载中
			loading: false,
			// 加载结束
			loadingEnd: false,
			// 查询表单
			form: {
				qsyfks: '',
				qsyfjs: ''
			},
			formRight: {},
			// 填表日期
			writeDate: '',
			// 结果
			results: {},
			// 默认tab栏选中总表
			activeName: 'tab1'
		};
	},
	methods: {
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/bbtj/bbtj/gxbysdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/bbtj/bbtj/gxbysCx', {
				params: this.formRight
			}).then((res) => {
				const data = res.returnData.gxbystjjg;
				this.writeDate = data.tbrq;
				delete data.tbrq;
				this.results = data;
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
		},
		// 日期值格式化(年-月)(string)
		yyyyMM(date) {
			const year = date.getFullYear();
			let month = `${date.getMonth() + 1}`;
			month = month.length === 1 ? `0${month}` : `${month}`;
			return `${year}-${month}`;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style></style>
