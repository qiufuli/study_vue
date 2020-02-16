<docs>
		## 职位查看，业务管理--查询单位网上、现场、委托招聘会职位
</docs>
<template>
		<div class="tabs_joblist">
			<bread-crumb></bread-crumb>
			<el-tabs v-model="recruitType" type="border-card">
				<el-tab-pane label="网上招聘" name="web" :disabled="zpwszw === false">
					<!-- 网上招聘 查询 开始 -->
					<el-form :model="formWeb" :rules="rulesWeb" :label-width="labelWidth"
						ref="formWeb">
						<el-row>
							<el-col :span="12">
								<el-form-item prop="zwmc" label="职位名称">
									<el-input v-model="formWeb.zwmc"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="spzt" label="审批状态">
									<!-- <select-code v-model="formWeb.spzt" code="gyrlzyw_qzzp_d_spzt"></select-code> -->
									<el-select v-model="formWeb.spzt">
										<el-option label="全部" value="00"></el-option>
										<el-option label="待审批" value="20"></el-option>
										<el-option label="审批通过" value="30"></el-option>
										<el-option label="审批拒绝" value="40"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="zwzt" label="职位状态">
									<select-code v-model="formWeb.zwzt"
										:disabled="formWeb.spzt === '20' || formWeb.spzt === '40'"
										:showClearable="true"
										code="gyrlzyw_qzzp_d_yxzt"></select-code>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button type="primary" native-type="submit" :loading="loadingWeb"
									@click.prevent="submitWeb('formWeb')">查询</el-button>
								<el-button @click="cancel('formWeb')">重置</el-button>
							</el-form-item>
						</el-row>
					</el-form>
					<!-- 网上招聘 查询 结束 -->
					<!-- 网上招聘 列表 开始 -->
					<div class="loading" v-loading="loadingWeb">
						<el-table :data="resultsWeb" class="table_wrap" stripe @cell-click="jobView">
							<el-table-column prop="zwmc" label="职位名称"
								class-name="color_anchor cur_pointer"></el-table-column>
							<el-table-column label="转正月薪（元）">
								<template scope="salary">
									<span v-if="salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyq}}-{{salary.row.xzdyz}}</span>
									<span v-else-if="!salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyz}}以下</span>
									<span v-else-if="salary.row.xzdyq && !salary.row.xzdyz">{{salary.row.xzdyq}}以上</span>
									<span v-else>不限</span>
								</template>
							</el-table-column>
							<el-table-column label="工作经验（年）" prop="gznx"></el-table-column>
							<el-table-column label="学历要求" prop="xlyqmc"></el-table-column>
							<el-table-column label="工作地点" prop="gzdmc"></el-table-column>
							<el-table-column label="招聘人数" >
								<template scope="people">
									<span v-if="+people.row.nanrs && +people.row.nvrs">共{{people.row.zprs}}人，男性{{people.row.nanrs}}人，女性{{people.row.nvrs}}人</span>
									<span v-else-if="!+people.row.nanrs && +people.row.nvrs">女性{{people.row.nvrs}}人</span>
									<span v-else-if="people.row.zprs == -2">男性，人数不限</span>
									<span v-else-if="people.row.zprs == -3">女性，人数不限</span>
									<span v-else-if="+people.row.nanrs && !+people.row.nvrs">男性{{people.row.nanrs}}人</span>
									<span v-else-if="people.row.zprs > 0 && people.row.nanrs == 0 && people.row.nvrs == 0">不限男女，人数{{people.row.zprs}}人</span>
									<span v-else>不限男女，人数不限</span>
									<!-- <span v-if="+people.row.nanrs || +people.row.nvrs"
										:title="`男${people.row.nanrs}人，女${people.row.nvrs}人`">{{people.row.zprs}}</span>
									<span v-else>不限</span> -->
								</template>
							</el-table-column>
							<el-table-column label="时间" prop="sj"></el-table-column>
							<el-table-column label="职位状态" prop="zwzt">
								<template scope="zwScope">
									<span v-if="zwScope.row.yxzt == '01'">招聘中</span>
									<span v-else-if="zwScope.row.yxzt == '02'">已停招</span>
									<span v-else-if="zwScope.row.spzt == '20'">待审批</span>
									<span v-else-if="zwScope.row.spzt == '40'">审批拒绝</span>
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination_wrap" v-show="resultsWeb.length > 0">
							<el-pagination
								layout="total,prev,pager,next"
								:total="pageTotalWeb"
								:current-page.sync="formWeb.pageNum"
								@current-change="getDataWebJob"
							></el-pagination>
						</div>
					</div>
					<!-- 网上招聘 列表 结束 -->
				</el-tab-pane>
				<el-tab-pane label="现场招聘" name="xian" :disabled="zpxczw === false">
					<el-row :gutter="20">
						<!-- 现场招聘会列表 开始 -->
						<el-col :span="8" >
							<div class="list">
								<!-- 招聘会标题 开始 -->
								<el-row>
									<div class="inline_block margin_r_10 margin_b_10">
										<label for="" class="title_select_label">简章</label>
										<el-select v-model="formXianList.sczpjzzt" size="small"
											class="list_select" @change="getDataXianList">
											<el-option value="" label="全部"></el-option>
											<el-option value="1" label="已提交"></el-option>
											<el-option value="0" label="未提交"></el-option>
										</el-select>
									</div>
									<div class="inline_block margin_b_10">
										<label for="" class="title_select_label">日期</label>
										<el-date-picker v-model="formXianList.zphrq" style="width:120px;" :editable="false"
											size="small" @change="getDataXianList"></el-date-picker>
									</div>
								</el-row>
								<!-- 招聘会标题 结束 -->
								<!-- 列表 开始 -->
								<div class="list_border">
									<h3 class="date_title">招聘会日期</h3>
									<ul v-loading="loadingXianList" class="list_con_wrap" v-show="resultsXianList.length > 0">
										<li v-for="(item, index) in resultsXianList" :key="index"
											class="list_con" @click="getJobXianList(item)" :class="item.actived ? 'actived' : ''">
											<p>
												<span class="time">{{item.zphrq}}</span>
												<span :class="item.zphzt === '2' ? 'status_active' : ''">（{{zhaoPinState(item.zphzt)}}）</span>
											</p>
											<p>{{item.zphbt}}（{{item.bczw}}）</p>
										</li>
									</ul>
									<!-- 列表 结束 -->
									<div class="pagination_wrap" v-show="resultsXianList.length > 0">
										<el-pagination
											layout="total,prev,pager,next"
											:total="pageTotalXian"
											:current-page.sync="formXianList.pageNum"
											@current-change="getDataXianList"></el-pagination>
									</div>
									<p v-show="resultsXianList.length === 0" class="empty_text">暂无数据</p>
								</div>
							</div>
						</el-col>
						<!-- 现场招聘会列表 结束 -->
						<!-- 现场 职位列表 开始 -->
						<el-col :span="16" class="job_list" v-show="resultsXianList.length > 0">
							<div class="job_list loading" v-loading="loadingXianJob">
								<!-- 职位查询 条件 -->
								<el-row class="title_border">
									<el-form :model="formXianJob" :rules="rulesXianJob"
									:label-width="labelWidth" ref="formXianJob">
										<el-col :span="8">
											<el-form-item label="职位名称" prop="zwmc">
												<el-input v-model="formXianJob.zwmc"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="审批状态" prop="spzt">
												<!-- <select-code v-model="formXianJob.spzt" code="gyrlzyw_qzzp_d_spzt"></select-code> -->
												<el-select v-model="formXianJob.spzt">
													<el-option label="全部" value="00"></el-option>
													<el-option label="待审批" value="20"></el-option>
													<el-option label="审批通过" value="30"></el-option>
													<el-option label="审批拒绝" value="40"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label-width="55px">
												<el-button type="primary" size="small" class="no_radius"
													@click.prevent="submitXian('formXianJob')">查询</el-button>
												<el-button size="small" class="no_radius"
													@click="cancel('formXianJob')">重置</el-button>
											</el-form-item>
										</el-col>
									</el-form>
								</el-row>
								<!-- 职位列表 -->
								<el-table :data="resultsXianJob" class="table_wrap" stripe @cell-click="jobView">
									<el-table-column label="职位名称" prop="zwmc"
									class-name="color_anchor cur_pointer">
									</el-table-column>
									<el-table-column label="转正月薪（元）">
										<template scope="salary">
											<span v-if="salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyq}}-{{salary.row.xzdyz}}</span>
											<span v-else-if="!salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyz}}以下</span>
											<span v-else-if="salary.row.xzdyq && !salary.row.xzdyz">{{salary.row.xzdyq}}以上</span>
											<span v-else>不限</span>
										</template>
									</el-table-column>
									<el-table-column label="工作经验（年）" prop="gznx"></el-table-column>
									<el-table-column label="学历要求" prop="xlyqmc"></el-table-column>
									<el-table-column label="工作地" prop="gzdmc"></el-table-column>
									<el-table-column label="招聘人数">
										<template scope="people" >
											<span v-if="+people.row.nanrs && +people.row.nvrs">共{{people.row.zprs}}人，男性{{people.row.nanrs}}人，女性{{people.row.nvrs}}人</span>
											<span v-else-if="!+people.row.nanrs && +people.row.nvrs">女性{{people.row.nvrs}}人</span>
											<span v-else-if="people.row.zprs == -2">男性，人数不限</span>
											<span v-else-if="people.row.zprs == -3">女性，人数不限</span>
											<span v-else-if="+people.row.nanrs && !+people.row.nvrs">男性{{people.row.nanrs}}人</span>
											<span v-else-if="people.row.zprs > 0 && people.row.nanrs == 0 && people.row.nvrs == 0">不限男女，人数{{people.row.zprs}}人</span>
											<span v-else>不限男女，人数不限</span>
											<!-- <span v-if="+people.row.nanrs || +people.row.nvrs"
												:title="`男${people.row.nanrs}人，女${people.row.nvrs}人`">{{people.row.zprs}}</span>
											<span v-else>不限</span> -->
										</template>
									</el-table-column>
									<el-table-column label="时间" prop="sj" width="110"></el-table-column>
								</el-table>
								<div class="pagination_wrap" v-show="resultsXianJob.length > 0">
									<el-pagination
										layout="total,prev,pager,next,jumper"
										:total="pageTotalXianJob"
										:current-page.sync="formXianJob.pageNum"
										@current-change="getDataXianJob"></el-pagination>
								</div>
							</div>
						</el-col>
						<!-- 现场 职位列表 结束 -->
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="委托招聘" name="weituo" :disabled="zpwtzw === false">
					<el-row :gutter="20">
						<!-- 委托招聘 职位查询 开始-->
						<el-col :span="8">
							<div class="list">
								<!-- 招聘会标题 开始 -->
								<el-row>
									<div class="inline_block margin_r_10 margin_b_10">
										<label for="" class="title_select_label">简章</label>
										<el-select v-model="formWeiList.sczpjzzt" size="small"
										class="list_select" @change="getDataWeiList">
											<el-option value="" label="全部"></el-option>
											<el-option value="1" label="已提交"></el-option>
											<el-option value="0" label="未提交"></el-option>
										</el-select>
									</div>
									<div class="inline_block margin_b_10">
										<label for="" class="title_select_label">开始日期</label>
										<el-date-picker v-model="formWeiList.zphrq" style="width:120px;" :editable="false"
											size="small" @change="getDataWeiList"></el-date-picker>
									</div>
								</el-row>
								<!-- 招聘会标题 结束 -->
								<!-- 招聘会列表 -->
								<div class="list_border">
									<h3 class="date_title">委托招聘日期</h3>
									<ul v-loading="loadingWeiList" class="list_con_wrap" v-show="resultsWeiList.length > 0">
										<li v-for="(item, index) in resultsWeiList" :key="index"
											class="list_con" @click="getJobWeiList(item)" :class="item.actived ? 'actived' : ''">
											<p>
												<span class="time">{{`${item.zwydsj} → ${item.zwjsrq}`}}</span>
												<span :class="item.zphzt === '2' ? 'status_active' : ''">（{{zhaoPinState(item.zwyxzt)}}）</span>
											</p>
											<p>展位号：{{item.zphzwbh}}</p>
										</li>
									</ul>
									<div class="pagination_wrap" v-show="resultsWeiList.length > 0">
										<el-pagination
											layout="total,prev,pager,next"
											:total="pageTotalWeiList"
											:current-page.sync="formWeiList.pageNum"
											@current-change="getDataWeiList"></el-pagination>
									</div>
									<p v-show="resultsWeiList.length === 0" class="empty_text">暂无数据</p>
								</div>
							</div>
						</el-col>
						<!-- 委托招聘 职位查询 结束-->
						<!-- 委托招聘 职位列表 开始 -->
						<el-col :span="16" class="job_list" v-show="resultsWeiList.length > 0">
							<div class="loading job_list" v-loading="loadingWeiJob">
								<el-row class="title_border">
									<el-form :model="formWeiJob" :rules="rulesWeiJob" ref="formWeiJob"
									:label-width="labelWidth" >
										<el-col :span="8">
											<el-form-item label="职位名称" prop="zwmc">
												<el-input v-model="formWeiJob.zwmc"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label="审批状态" prop="spzt">
												<!-- <select-code v-model="formWeiJob.spzt" code="gyrlzyw_qzzp_d_spzt"></select-code> -->
												<el-select v-model="formWeiJob.spzt">
													<el-option label="全部" value="00"></el-option>
													<el-option label="待审批" value="20"></el-option>
													<el-option label="审批通过" value="30"></el-option>
													<el-option label="审批拒绝" value="40"></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="8">
											<el-form-item label-width="55px">
												<el-button type="primary" size="small" class="no_radius"
													@click.prevent="submitWei('formWeiJob')">查询</el-button>
												<el-button size="small" class="no_radius"
													@click="cancel('formWeiJob')">重置</el-button>
											</el-form-item>
										</el-col>
									</el-form>
								</el-row>
								<!-- 职位列表 -->
								<el-table :data="resultsWeiJob" class="table_wrap" stripe @cell-click="jobView">
									<el-table-column label="职位名称" prop="zwmc"
										class-name="color_anchor cur_pointer">
									</el-table-column>
									<el-table-column label="转正月薪（元）">
										<template scope="salary">
											<span v-if="salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyq}}-{{salary.row.xzdyz}}</span>
											<span v-else-if="!salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyz}}以下</span>
											<span v-else-if="salary.row.xzdyq && !salary.row.xzdyz">{{salary.row.xzdyq}}以上</span>
											<span v-else>不限</span>
										</template>
									</el-table-column>
									<el-table-column label="工作经验（年）" prop="gznx"></el-table-column>
									<el-table-column label="学历要求" prop="xlyqmc"></el-table-column>
									<el-table-column label="工作地" prop="gzdmc"></el-table-column>
									<el-table-column label="招聘人数">
										<template scope="people" >
											<span v-if="+people.row.nanrs && +people.row.nvrs">共{{people.row.zprs}}人，男性{{people.row.nanrs}}人，女性{{people.row.nvrs}}人</span>
											<span v-else-if="!+people.row.nanrs && +people.row.nvrs">女性{{people.row.nvrs}}人</span>
											<span v-else-if="people.row.zprs == -2">男性，人数不限</span>
											<span v-else-if="people.row.zprs == -3">女性，人数不限</span>
											<span v-else-if="+people.row.nanrs && !+people.row.nvrs">男性{{people.row.nanrs}}人</span>
											<span v-else-if="people.row.zprs > 0 && people.row.nanrs == 0 && people.row.nvrs == 0">不限男女，人数{{people.row.zprs}}人</span>
											<span v-else>不限男女，人数不限</span>
											<!-- <span v-if="+people.row.nanrs || +people.row.nvrs"
												:title="`男${people.row.nanrs}人，女${people.row.nvrs}人`">{{people.row.zprs}}</span>
											<span>不限</span> -->
										</template>
									</el-table-column>
									<el-table-column label="时间" prop="sj" width="110"></el-table-column>
								</el-table>
								<div class="pagination_wrap" v-show="resultsWeiJob.length > 0">
									<el-pagination
										layout="total,prev,pager,next,jumper"
										:total="pageTotalWeiJob"
										:current-page.sync="formWeiJob.pageNum"
										@current-change="getDataWeiJob"></el-pagination>
								</div>
							</div>
						</el-col>
						<!-- 委托招聘 职位列表 结束 -->
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<!-- 查看职位 详情 页面 开始 -->
			<el-dialog title="职位详情" :visible.sync="dialogJob" size="large">
				<job-view :zw-id="zwId"></job-view>
			</el-dialog>
		</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import jobView from '@/common/buss/jobView';
import breadCrumb from '@/common/vue/breadCrumb';

export default {
	name: 'bussRecruitJobList',
	components: { selectCode, jobView, breadCrumb },
	data() {
		return {
			labelWidth,
			companyId: '',
			dialogJob: false,
			zwId: '',
			// ==============================> 网上招聘
			formWeb: {
				zwmc: '',
				zph_id: '111111', // 假定zph_id为1，使得校验通过
				dwxx_id: '',
				zplx: '01', // 招聘类型(01：网上02：现场03：委托)
				spzt: '00', // 审批状态(00：全部20:待审批30:审批通过40:审批拒绝 )
				zwzt: '01', // 职位状态(01已发布默认，02已停招)（gyrlzyw_qzzp_d_yxzt）
				pageNum: 1
			},
			rulesWeb: {
				zwmc: [{ validator: validator('64, "less", "单位名称", true') }]
			},
			resultsWeb: [],
			loadingWeb: false,
			pageTotalWeb: 0,
			// =========================> 现场招聘
			// 现场招聘会列表
			loadingXianList: false,
			formXianList: {
				zphrq: '',
				dwxx_id: '',
				pageNum: 1,
				sczpjzzt: '',
				zphbs: '0'// 招聘会标识(1可用 0全部)
			},
			resultsXianList: [],
			pageTotalXian: 0,
			// 现场招聘会职位列表
			formXianJob: {
				zph_id: '',
				zwmc: '',
				// zwzt: '', // 职位状态(10：带录入、20：已结束（gyrlzyw_qzzp_d_zwlrzt）
				zplx: '02', // 招聘类型(01：网上02：现场03：委托)
				dwxx_id: '',
				spzt: '00', // 审批状态(00：全部20:待审批30:审批通过40:审批拒绝 )
				pageNum: 1
			},
			rulesXianJob: {
				zwmc: [{ validator: validator('64, "less", "单位名称", true') }]
			},
			resultsXianJob: [],
			pageTotalXianJob: 0,
			loadingXianJob: false,
			// ==================================> 委托招聘列表
			// 委托招聘会列表
			loadingWeiList: false,
			formWeiList: {
				dwxx_id: '',
				zphrq: '', // 招聘会日期
				wtzwbs: '1', // 委托展位标识(0:可用1:全部)
				sczpjzzt: '', // (1：已提交 0：未提交)
				pageNum: 1
			},
			resultsWeiList: [],
			pageTotalWeiList: 0,
			// 委托招聘职位列表
			formWeiJob: {
				zph_id: '',
				zwmc: '',
				zwzt: '', // 职位状态(10：带录入、20：已结束（gyrlzyw_qzzp_d_zwlrzt）
				zplx: '03', // 招聘类型(01：网上02：现场03：委托)
				dwxx_id: '',
				spzt: '00', // 审批状态(00：全部20:待审批30:审批通过40:审批拒绝 )
				pageNum: 1
			},
			rulesWeiJob: {
				zwmc: [{ validator: validator('64, "less", "单位名称", true') }]
			},
			resultsWeiJob: [],
			pageTotalWeiJob: 0,
			loadingWeiJob: false,
			recruitType: 'web',
			zpwszw: false, // 是否可以查询 网上招聘职位 默认不可以
			zpxczw: false, // 是否可以查询 现场招聘职位 默认不可以
			zpwtzw: false  // 是否可以查询 委托招聘职位 默认不可以
		};
	},
	watch: {
		/* eslint-disable func-names */
		'formWeb.spzt': function (val) {
			if (val === '30') {
				this.formWeb.zwzt = '01';
			} else if (val === '40' || val === '20') {
				this.formWeb.zwzt = '';
			}
		},
		recruitType(val) {
			switch (val) {
			case 'web':
				this.getDataWebJob();
				break;
			case 'xian':
				this.getDataXianList();
				break;
			case 'weituo':
				this.getDataWeiList();
				break;
			default:
				break;
			}
		}
	},
	methods: {
		// 点击职位名称 查询职位
		jobView(row, column) {
			if (column.property === 'zwmc') {
				this.dialogJob = true;
				this.zwId = row.dwzw_id;
			}
		},
		// 招聘会状态
		zhaoPinState(val) {
			let text;
			switch (val) {
			case '1': text = '未开始'; break;
			case '2': text = '进行中'; break;
			default: text = '已结束';
			}
			return text;
		},
		// =======================> 网上招聘
		// 查询职位列表
		getDataWebJob() {
			this.formWeb.dwxx_id = this.companyId;
			this.loadingWeb = true;
			$.get('/gyrcht/ywgl/xczpdy/zwlbCx', {
				params: this.formWeb
			}).then((res) => {
				this.loadingWeb = false;
				this.resultsWeb = res.returnData.zwlb;
				this.pageTotalWeb = +res.rowsCount;
			}).catch(() => {
				this.loadingWeb = false;
			});
		},
		// 查询按钮 提交
		submitWeb(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.getDataWebJob();
				}
			});
		},
		// 查询按钮取消
		cancel(formName) {
			this.$refs[formName].resetFields();
		},
		// ==================================> 现场招聘
		// 查询招聘列表
		getDataXianList() {
			this.formXianList.dwxx_id = this.companyId;
			this.loadingXianList = true;
			$.get('/gyrcht/ywgl/xczpdy/zphlbCx', {
				params: this.formXianList
			}).then((res) => {
				this.loadingXianList = false;
				const dataList = res.returnData.xczplb;
				this.resultsXianList = dataList;
				this.pageTotalXian = +res.rowsCount;
				// 查询成功默认查询第一个招聘会的内容，并为第一赋选中状态
				if (dataList.length > 0) {
					this.$set(dataList[0], 'actived', true);
					this.formXianJob.zph_id = dataList[0].zph_id;
					this.getDataXianJob();
				} else {
					this.resultsXianJob = [];
				}
			}).catch(() => {
				this.loadingXianList = false;
			});
		},
		// 查询招聘会下的职位列表
		getDataXianJob() {
			// 赋初始值
			this.formXianJob.dwxx_id = this.companyId;
			this.loadingXianJob = true;
			$.get('/gyrcht/ywgl/xczpdy/zwlbCx', {
				params: this.formXianJob
			}).then((res) => {
				this.resultsXianJob = res.returnData.zwlb;
				this.pageTotalXianJob = +res.rowsCount;
				this.loadingXianJob = false;
			}).catch(() => {
				this.loadingXianJob = false;
			});
		},
		// 点击获取该招聘会列表下所有的招聘会职位
		getJobXianList(row) {
			/* eslint-disable no-return-assign */
			this.resultsXianList.forEach(item => (item.actived = false));
			if (!row.actived) {
				this.$set(row, 'actived', true);
			}
			this.formXianJob.zph_id = row.zph_id;
			row.actived = true;
			this.getDataXianJob();
		},
		// 现场招聘职位查询 确认按钮 submit
		submitXian(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.getDataXianJob();
				}
			});
		},
		// ===================================> 委托招聘
		// 获取委托招聘会列表
		getDataWeiList() {
			this.loadingWeiList = true;
			this.formWeiList.dwxx_id = this.companyId;
			$.get('/gyrcht/ywgl/wtzp/wtzwlbCx', {
				params: this.formWeiList
			}).then((res) => {
				this.loadingWeiList = false;
				const dataList = res.returnData.wtzplb;
				this.resultsWeiList = dataList;
				this.pageTotalWeiList = +res.rowsCount;
				// 查询成功默认查询第一个招聘会的内容，并为第一赋选中状态
				if (dataList.length > 0) {
					this.$set(dataList[0], 'actived', true);
					this.formWeiJob.zph_id = dataList[0].wtzwyd_id;
					this.getDataWeiJob();
				} else {
					this.resultsWeiJob = [];
				}
			}).then(() => {
				this.loadingWeiList = false;
			}).catch(() => {});
		},
		// 获取招聘会列表下所有的职位
		getDataWeiJob() {
			this.formWeiJob.dwxx_id = this.companyId;
			this.loadingWeiJob = true;
			$.get('/gyrcht/ywgl/xczpdy/zwlbCx', {
				params: this.formWeiJob
			}).then((res) => {
				this.loadingWeiJob = false;
				this.resultsWeiJob = res.returnData.zwlb;
				this.pageTotalWeiJob = +res.rowsCount;
			}).catch(() => {
				this.loadingWeiJob = false;
			});
		},
		// 点击获取该招聘会列表下所有的招聘会职位
		getJobWeiList(row) {
			/* eslint-disable no-return-assign */
			this.resultsWeiList.forEach(item => (item.actived = false));
			if (!row.actived) {
				this.$set(row, 'actived', true);
			}
			this.formWeiJob.zph_id = row.wtzwyd_id;
			row.actived = true;
			this.getDataWeiJob();
		},
		// 委托招聘职位查询 确认按钮 submit
		submitWei(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.getDataWeiJob();
				}
			});
		},
		// 初始化操作（查询，赋值）
		initFn() {
			const params = this.$route.params;
			this.zpwszw = params.zpwszw;
			this.zpxczw = params.zpxczw;
			this.zpwtzw = params.zpwtzw;
			this.companyId = params.companyId;
			if (this.zpwszw) {
				this.recruitType = 'web';
				this.getDataWebJob();
			} else if (this.zpxczw) {
				this.recruitType = 'xian';
				this.getDataXianList();
			} else if (this.zpwtzw) {
				this.recruitType = 'weituo';
				this.getDataWeiList();
			}
		}
	},
	created() {
		this.initFn();
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.companyId) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style scope="scoped">
.date_title {
	font-size: 14px;
	font-style: normal;
	text-align: center;
	line-height: 40px;
	background-color: rgb(238, 241, 246);
}
.list_border {
	border: 1px solid rgb(223, 229, 236);
}
</style>
