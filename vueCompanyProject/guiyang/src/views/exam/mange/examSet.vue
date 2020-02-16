<docs>
	## 考试管理---单位、职位、科目，的发布、分配功能
	* 字段缩写： co:单位相关、job:职位相关、sub:科目相关
</docs>

<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<el-row>
			<!-- 单位start -->
			<el-col :span="kslx==='10' ? 14 : 24">
				<p class="query_wrap company_info" :title="examName">考试名称：{{examName}}</p>
				<el-col :span="12">
					<div class="po_r dwmc_add">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingCo" @click="addCo"></el-button>
						<!-- 单位列表 start -->
						<el-table :data="resCo" class="exam_table table_wrap"
							highlight-current-row @current-change="changeCo">
							<el-table-column label="单位名称" prop='dwmc' class-name="cur_pointer">
								<template scope="name">
									<span>{{`${name.row.dwbh} ${name.row.dwmc}`}}</span>
								</template>
							</el-table-column>
							<el-table-column label="" width="90">
								<template scope="operate">
									<el-button title="编辑" type="primary" size="mini" icon="edit"
										@click.stop="editCo(operate.row)"></el-button>
									<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delCo(operate.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 单位列表 end -->
					</div>
					<!-- 分页 start -->
					<div class="pagination_wrap" v-show="resCo.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalCo"
							:current-page.sync="formCo.pageNum"
							@current-change="getcomData"></el-pagination>
					</div>
					<!-- 分页 end -->
				</el-col>
				<!-- 单位end -->

				<!-- 职位start -->
				<el-col :span="12">
					<div class="po_r">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingJob" @click="addJob()"></el-button>
						<!-- 职位列表 start -->
						<el-table :data="resJob" class="exam_table table_wrap"
							highlight-current-row @current-change="changeJob">
							<el-table-column label="职位名称" prop='zwmc' class-name="cur_pointer">
								<template scope="name">
									<span>{{`${name.row.zwbh} ${name.row.zwmc}`}}</span>
								</template>
							</el-table-column>
							<el-table-column label="" width="90">
								<template scope="operate">
									<el-button title="编辑" type="primary" size="mini" icon="edit"
										@click.stop="editJob(operate.row)"></el-button>
									<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delJob(operate.row,operate.$index)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 职位列表 end -->
					</div>
					<!-- 分页 start -->
					<div class="pagination_wrap" v-show="resJob.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalJob"
							:current-page.sync="formSearchJob.pageNum"
							@current-change="getjobData"></el-pagination>
					</div>
					<!-- 分页 end -->
				</el-col>
			</el-col>
			<!-- 职位end -->

			<!-- 科目start -->
			<el-col :span="10" v-if="kslx==='10'">
				<!-- 查询 start -->
				<div class="query_wrap">
					<el-form :model="formSub" :rules="rulesSub" :label-width="labelWidth"
						ref="formSub">
							<el-row>
								<el-col class="btns_right">
									<el-form-item label-width="0">
										<el-button size="small" type="primary" icon="plus"
											@click="addSub">添加科目</el-button>
									</el-form-item>
								</el-col>
							</el-row>
					</el-form>
				</div>
				<!-- 查询 end -->
				<div class="po_r po_mar">
					<el-button class="btn_square btn_add"
						size="small" type="primary" icon="setting" title="科目设置"
						:loading="loadingSub" @click="setSub">
					</el-button>
					<!-- 科目列表 start -->
					<el-table :data="resSub" class="exam_table table_wrap">
						<el-table-column label="科目名称" prop='kmmc' class-name="cur_pointer">
							<template scope="name">
								<span>{{`${name.row.kmbh} ${name.row.kmmc}`}}</span>
							</template>
						</el-table-column>
						<el-table-column label="考试时间" width="110">
							<template scope="scope">
								<span>{{ scope.row.ksrq }}</span>
								<span class="examKssj">{{`${scope.row.kmkssj}-${scope.row.kmjssj}`}}</span>
							</template>
						</el-table-column>
						<el-table-column label="" width="70">
							<template scope="operate">
								<el-button title="删除" size="mini" type="danger" icon="delete"
									@click="delSub(operate.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 科目列表 end -->
				</div>
			</el-col>
			<!-- 科目end -->

		</el-row>
    <!-- 单位信息start -->
    <el-dialog title="分配单位信息" :visible.sync="dialogCo" size="tiny"
			@close="resetFn('formInfoCo', 'dialogCo')">
      <el-form :model="formInfoCo" :label-width="labelWidth" :rules="rulesInfoCo"
				ref="formInfoCo">
				<el-form-item label="单位名称" prop="dwmc" required>
					<el-autocomplete v-model="formInfoCo.dwmc"
					:fetch-suggestions="suggestionCompany" :props="suggestionProp"
							class="width_100" @select="selectCom"></el-autocomplete>
				</el-form-item>
				<el-form-item label="单位编号" prop="dwbh" required>
					<el-input v-model="formInfoCo.dwbh"></el-input>
				</el-form-item>
			</el-form>
			<div class=" footer" slot="footer">
				<el-button class="no_radius" size="small"
					@click="resetFn('formInfoCo', 'dialogCo')">取消</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveCom('formInfoCo')">保存</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveAddCom('formInfoCo')">保存并添加</el-button>
			</div>
    </el-dialog>
    <!-- 单位信息end -->

		<!-- 职位信息 start -->
		<el-dialog title="职位信息" :visible.sync="dialogJob" size="small" top="5%"
			@close="resetFn('formInfoJob', 'dialogJob')">
			<el-form :model="formInfoJob" :label-width="labelWidth" :rules="rulesInfoJob"
				ref="formInfoJob">
				<h3 class="title">基本信息</h3>
				<el-form-item label="职位名称" prop="zwmc" required>
					<el-input v-model="formInfoJob.zwmc"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="职位编号" prop="zwbh" required>
							<el-input v-model="formInfoJob.zwbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="招聘人数" prop="zprs" required>
							<el-input v-model="formInfoJob.zprs" :min="0" :max="9999" class="width_100"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="title">职位要求</h3>
				<el-form-item label="出生日期">
					<date-ass
						:begin.sync="formInfoJob.csrqq" propBegin="csrqq"
						:end.sync="formInfoJob.csrqz" propEnd="csrqz"></date-ass>
				</el-form-item>
				<el-form-item label="学历" prop="xl">
					<select-code v-model="formInfoJob.xl" code="gyrlzyw_bkxt_d_bkxl"
							:has-all="false"></select-code>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="是否全日制" prop="sfqrz" label-width="100px">
							<el-select v-model="formInfoJob.sfqrz" class="width_100" :disabled="sfqrzZt==='0'">
								<el-option label="不限" value="8"></el-option>
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="xb">
							<el-select v-model="formInfoJob.xb" class="width_100">
								<el-option label="不限" value="8"></el-option>
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="填写要求" prop="txyq">
					<el-input v-model="formInfoJob.txyq" type="textarea"
						:autosize="{ minRows: 2, maxRows: 4 }"></el-input>
				</el-form-item>
			</el-form>
			<div class="btns_right">
				<el-button class="btn_square" @click="resetFn('formInfoJob', 'dialogJob')">取消</el-button>
				<el-button class="btn_square" type="primary" @click="saveJob('formInfoJob')">保存</el-button>
				<el-button class="btn_square" type="primary" @click="saveAddJob('formInfoJob')">保存并添加</el-button>
			</div>
		</el-dialog>
		<!-- 职位信息 end -->

		<!-- 科目信息 start -->
		<el-dialog title="科目信息" :visible.sync="dialogSub" size="tiny"
			@close="resetFn('formInfoSub', 'dialogSub')">
			<el-form :model="formInfoSub" :label-width="labelWidth" :rules="rulesInfoSub"
				ref="formInfoSub">
				<el-form-item label="科目名称" prop="kmmc" required>
					<el-input v-model="formInfoSub.kmmc"></el-input>
				</el-form-item>
				<el-form-item label="科目编号" prop="kmbh" required>
					<el-input v-model="formInfoSub.kmbh"></el-input>
				</el-form-item>
				<el-form-item label="考试日期" prop="ksrq" required>
					<el-date-picker v-model="formInfoSub.ksrq"
						:editable="false"
						class="width_100"
						:disabled="resSubKm.length > 0"
						:picker-options="timeRangekm"
						:default-value="defaultExam"></el-date-picker>
				</el-form-item>
				<el-form-item label="考试时间" class="is-required">
					<el-time-picker
						class="width_100"
						is-range
						format="HH:mm"
						v-model="timeRange"
						placeholder="选择时间范围"
						:editable="false"
						@change="changeTime">
					</el-time-picker>
				</el-form-item>
			</el-form>
			<div class="dialog-footer km_footer">
				<el-button class="no_radius" size="small"
					@click="resetFn('formInfoSub', 'dialogSub')">取消</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveSub('formInfoSub')">保存</el-button>
			</div>
			<div class="km_b">
				<div class="km_item">
					<!-- 科目列表 start -->
					<el-table :data="resSubKm" class="exam_table table_wrap"
						highlight-current-row>
						<el-table-column label="科目名称" prop='kmmc'>
							<template scope="stateKm">
								<span>{{`${stateKm.row.kmbh} ${stateKm.row.kmmc}`}}</span>
							</template>
						</el-table-column>
						<el-table-column label="考试时间" width="110">
							<template scope="scope">
								<span>{{ scope.row.ksrq }}</span>
								<span class="examKssj">{{`${scope.row.kmkssj}-${scope.row.kmjssj}`}}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="90">
							<template scope="operate">
								<el-button title="编辑" type="primary" size="mini" icon="edit"
									@click="editsubKm(operate.row)"></el-button>
								<el-button title="删除" size="mini" type="danger" icon="delete"
									@click.stop="delsubKm(operate.row,operate.$index)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 职位列表 end -->
				</div>
				<!-- 分页 start -->
				<div class="pagination_wrap" v-show="resSubKm.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="totalSubkm"
						:current-page.sync="formJob.pageNum"
						@current-change="getkmxxData"></el-pagination>
				</div>
			</div>
		</el-dialog>
		<!-- 科目信息 end -->

		<!-- 科目设置 start -->
		<el-dialog title="设置科目" :visible.sync="dialogSubList" size="small"
			@close="cancelSetSub()">
			<div class="check_wrap">
				<el-checkbox-group v-model="selectedKm"
				:max="2">
					<el-row>
						<el-col :span="8" v-for="item in subOpt" :key="item">
							<el-checkbox class="sub_checkbox" :checked="item.sfxz === '1'" :label="item" :title="item.kmmc" >{{item.kmmc}}</el-checkbox>
						</el-col>
					</el-row>
				</el-checkbox-group>
			</div>
			<div class="footer" slot="footer">
				<el-button @click="cancelSetSub()">取消</el-button>
				<el-button type="primary" @click="saveSetSub()">保存</el-button>
			</div>
		</el-dialog>
		<!-- 科目设置 end -->
	</div>
</template>

<script>
	import breadCrumb from '@/common/vue/breadCrumb';
	import { labelWidth } from '@/common/js/config';
	import { validator } from '@/common/js/valid';
	import dateAss from '@/common/vue/dateAss';
	import selectCode from '@/common/vue/selectCode';
	import $ from '@/common/js/axios';

	export default {
		name: 'examSet',
		components: { breadCrumb, dateAss, selectCode },
		data() {
			return {
				labelWidth,
				kslx: '',   // 考试类型
				examId: '', // 考试id
				examName: '', // 考试名称
				// 单位、职位、科目 查询相关 ====================>
				// 查询加载状态
				loadingCo: false,
				loadingJob: false,
				loadingSub: false,
				// 查询表单（搜索框）
				formCo: {
					ks_id: '',
					czlx: '0',
					pageNum: 1
				},
				formJob: {
					zwmc: '',
					pageNum: 1
				},
				formSub: {
					kmmc: '',
					pageNum: 1
				},
				// 校验
				rulesCo: {
					dwmc: [{ validator: validator('64, "normal", "单位名称", false') }]
				},
				rulesJob: {
					zwmc: []
				},
				rulesSub: {
					kmmc: []
				},
				suggestionProp: {
					value: 'dwmc',
					label: 'dwmc'
				},
				// 查询结果（total：总条数）（表格数据）
				totalCo: 0,
				resCo: [],
				totalJob: 0,
				resJob: [],
				totalSub: 0,
				totalSubkm: 0,
				resSub: [],
				resSubKm: [],
				// 单位、职位、科目（弹窗） ====================>
				// 弹窗可见状态
				dialogCo: false,
				dialogJob: false,
				dialogSub: false,
				// 弹窗表单
				formInfoCo: {
					dwmc: '',
					czlx: '',
					ks_id: '',
					dwbh: ''
				},
				// 添加职位
				formInfoJob: {
					zwmc: '',
					zwbh: '',
					zprs: '',
					csrqq: '',
					csrqz: '',
					xl: '',
					sfqrz: '',
					xb: '',
					txyq: '',
					zw_id: '',
					ks_id: '',
					dwyh_id: ''
				},
				// 添加科目
				formInfoSub: {
					kmmc: '',
					kmbh: '',
					ksrq: '',
					kmkssj: '', // 科目开始时间
					kmjssj: '', // 科目结束时间
					km_id: '',
					ks_id: '',
					czlx: ''
				},
				// 查询考试下所有科目
				formSearchJob: {
					ks_id: '',
					dwyh_id: '',
					czlx: '0',
					pageNum: 1
				},
				// 设置科目保存
				setFpkm: {
					ks_id: '',
					dwyh_id: '',
					czlx: '0',
					zw_id: '',
					fpkmEntities: []
				},
				// 查询已分配好科目
				searchKm: {
					ks_id: '',
					dwyh_id: '',
					zw_id: ''
				},
				// 科目选中值
				selectedKm: [],
				// 弹窗表单校验
				rulesInfoCo: {
					dwbh: [{ validator: validator('2, "number", "单位编号", false', this.checkDwCode), trigger: 'blur' }],
					dwmc: [{ required: true, message: '单位名称不能为空' }]
				},
				rulesInfoJob: {
					zwmc: [{ validator: validator('64, "full", "职位名称", false', this.checkZwnumCode), trigger: 'blur' }],
					zwbh: [{ validator: validator('2, "number", "职位编号", false', this.checkZwCode), trigger: 'blur' }],
					zprs: [{ validator: validator('6, "number", "招聘人数", false') }],
					txyq: [{ validator: validator('256, "less", "填写要求", true') }]
				},
				rulesInfoSub: {
					kmmc: [{ validator: validator('64, "full", "科目名称", false', this.checkkmCode), trigger: 'blur' }],
					kmbh: [{ validator: validator('2, "number", "科目编号", false', this.checkNewsCode), trigger: 'blur' }],
					ksrq: [{ required: true, message: '考试日期不能为空' }]
				},
				timeRange: [],
				// 删除科目提示信息
				kmMessage: '',
				// 科目设置 ====================>
				dialogSubList: false,
				checkAll: true,
				isIndeterminate: true,
				// 考试日期
				isSelectKs: false,
				// 单位用户id
				dwyhIds: '',
				sfqrzZt: '',
				// 职位id
				zwId: '',
				subOpt: [],
				minTime: '', // 最小时间
				maxTime: ''  // 最大时间
			};
		},
		computed: {
			// 默认到最小时间
			defaultExam() {
				const date = new Date(this.minTime);
				return date.setDate(date.getDate() + 1);
			},
			// 添加科目时间禁用范围
			timeRangekm() {
				const min = new Date(this.minTime).getTime();
				const max = new Date(this.maxTime).getTime() - 8.64e7;
				return {
					disabledDate(time) {
						const select = time.getTime();
						return select < min || select > max;
					}
				};
			}
		},
		methods: {
			// 单位编号唯一性
			checkDwCode(rule, val, callback) {
				const data = {
					ks_id: this.examId,
					dwbh: this.formInfoCo.dwbh,
					czlx: this.formInfoCo.czlx,
					fpdw_id: this.formInfoCo.fpdw_id
				};
				$.get('/gyrcht/ksgl/fpdwzw/fpdw/check_Dwbh', {
					params: data
				}).then((res) => {
					if (res.returnData.executeResult === '0') {
						callback(new Error(res.returnData.message));
					} else {
						callback();
					}
				}).catch(() => { });
			},
			// 校验职位编号唯一性
			checkZwCode(rule, val, callback) {
				const data = {
					ks_id: this.examId,
					zwbh: this.formInfoJob.zwbh,
					czlx: this.formInfoJob.czlx,
					dwyh_id: this.dwyhIds,
					zw_id: this.formInfoJob.zw_id
				};
				$.get('/gyrcht/ksgl/fpdwzw/fpzw/check_Zwbh', {
					params: data
				}).then((res) => {
					if (res.returnData.executeResult === '0') {
						callback(new Error(res.returnData.message));
					} else {
						callback();
					}
				}).catch(() => { });
			},
			// 校验科目编号唯一性
			checkNewsCode(rule, val, callback) {
				const data = {
					ks_id: this.examId,
					kmbh: this.formInfoSub.kmbh,
					czlx: this.formInfoSub.czlx,
					km_id: this.formInfoSub.km_id
				};
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/check_Kmbh', {
					params: data
				}).then((res) => {
					if (res.returnData.executeResult === '0') {
						callback(new Error(res.returnData.message));
					} else {
						callback();
					}
				}).catch(() => { });
			},
			// 校验职位名称唯一性
			checkZwnumCode(rule, val, callback) {
				const data = {
					ks_id: this.examId,
					zwmc: this.formInfoJob.zwmc,
					czlx: this.formInfoJob.czlx,
					dwyh_id: this.dwyhIds,
					zw_id: this.formInfoJob.zw_id
				};
				$.get('/gyrcht/ksgl/fpdwzw/fpzw/check_Zwmc', {
					params: data
				}).then((res) => {
					if (res.returnData.executeResult === '0') {
						callback(new Error(res.returnData.message));
					} else {
						callback();
					}
				}).catch(() => { });
			},
			// 校验科目名称唯一性
			checkkmCode(rule, val, callback) {
				const data = {
					ks_id: this.examId,
					kmmc: this.formInfoSub.kmmc,
					czlx: this.formInfoSub.czlx,
					km_id: this.formInfoSub.km_id
				};
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/check_Kmmc', {
					params: data
				}).then((res) => {
					if (res.returnData.executeResult === '0') {
						callback(new Error(res.returnData.message));
					} else {
						callback();
					}
				}).catch(() => { });
			},
			// 选中单位改变 ====================>
			changeCo(val) {
				this.dwyhIds = val.dwyh_id;
				this.zwId = '';
				this.resSub = [];
				this.getjobData();
			},
			// 选中职位改变
			changeJob(val) {
				if (val) {
					this.zwId = val.zw_id;
					this.getfpkmData();
				}
			},
			// 默认查询所有该场考试的所有单位
			getcomData() {
				this.loading = true;
				this.formCo.ks_id = this.examId;
				$.get('/gyrcht/ksgl/fpdwzw/fpdw/fpdwCx', {
					params: this.formCo
				}).then((res) => {
					this.resCo = res.returnData.fpdws;
					this.sfqrzZt = res.returnData.sfqrzZt;
					this.totalCo = +res.rowsCount || 0;
					if (res.returnData.fpdws.length === 0) {
						this.dwyhIds = '';
					}
					this.loading = false;
					this.resJob = [];
					this.resSub = [];
				}).catch(() => {
					this.loading = false;
				});
			},
			// 添加单位 ====================>
			addCo() {
				this.dialogCo = true;
				this.formInfoCo.czlx = '0';
				this.formInfoCo.dwyh_id = '';
			},
			// 添加考试单位
			addksCom() {
				$.put('/gyrcht/ksgl/fpdwzw/fpdw/fpdwBc',
				this.formInfoCo).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('分配单位添加成功！');
						this.getcomData();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			// 保存考试单位信息
			saveCom(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formInfoCo.ks_id = this.examId;
						this.addksCom();
						this.dialogCo = false;
					}
				});
			},
			// 报存并添加单位
			saveAddCom(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formInfoCo.ks_id = this.examId;
						this.addksCom();
						setTimeout(() => {
							this.$refs[formName].resetFields();
							this.formInfoCo.czlx = '0';
						}, 5);
					}
				});
			},
			// 添加职位
			addJob() {
				if (!this.dwyhIds) {
					this.$message.warning('请选择单位后再添加职位！');
				} else {
					this.dialogJob = true;
					this.formInfoJob.czlx = '0';
					this.formInfoJob.zw_id = '';
				}
			},
			// 默认查询所有该场考试下的单位下的所有职位
			getjobData() {
				this.formSearchJob.dwyh_id = this.dwyhIds;
				this.loading = true;
				$.get('/gyrcht/ksgl/fpdwzw/fpzw/fpzwCx', {
					params: this.formSearchJob
				}).then((res) => {
					this.resJob = res.returnData.fpzwxxs;
					this.totalJob = +res.rowsCount || 0;
					this.loading = false;
					this.resSub = [];
				}).catch(() => {
					this.loading = false;
				});
			},
			// 分配职位
			addksJob() {
				this.formInfoJob.dwyh_id = this.dwyhIds;
				$.post('/gyrcht/ksgl/fpdwzw/fpzw/fpzwxxBc',
				this.formInfoJob).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('分配职位添加成功！');
						this.getjobData();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			// 保存职位信息
			saveJob(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formInfoJob.ks_id = this.examId;
						this.addksJob();
						this.dialogJob = false;
					}
				});
			},
			// 报存并添加职位信息
			saveAddJob(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formInfoJob.ks_id = this.examId;
						this.addksJob();
						setTimeout(() => {
							this.$refs[formName].resetFields();
							this.formInfoJob.czlx = '0';
						}, 5);
					}
				});
			},
			// 添加科目
			addSub() {
				this.formInfoSub.czlx = '0';
				this.dialogSub = true;
				this.checkDate();
				this.getkmxxData();
			},
			// 科目信息保存
			saveSub(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.timeRange && this.timeRange[0]) {
							$.put('/gyrcht/ksgl/fpdwzw/fpkm/kmxxBc',
							this.formInfoSub).then((res) => {
								if (res.returnData.executeResult === '1') {
									this.$message.success('科目添加成功！');
									this.getkmxxData();
								} else {
									this.$message.error(res.returnData.message);
								}
								this.$refs[formName].resetFields();
								this.timeRange = [];
								this.formInfoSub.czlx = '0';
								this.formInfoSub.km_id = '';
								this.checkDate();
								this.loading = false;
							}).catch(() => {
								this.loading = false;
							});
						} else {
							this.$message.warning('请选择考试时间!');
						}
					}
				});
			},
			// 查询考试下所有科目
			getkmData() {
				this.loading = true;
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/kmxxCx_fp', {
					params: {
						ks_id: this.examId,
						czlx: '0',
						dwyh_id: this.dwyhIds,
						zw_id: this.zwId }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.dialogSubList = true;
						this.subOpt = res.returnData.kmxxs;
						this.totalSub = +res.rowsCount || 0;
						this.loading = false;
					} else {
						this.$message.warning('你还没有可设置的科目，请先添加科目！');
					}
				}).catch(() => {
					this.loading = false;
				});
			},
			// 保存设置科目
			saveSetSub() {
				this.setFpkm.ks_id = this.examId;
				this.setFpkm.dwyh_id = this.dwyhIds;
				this.setFpkm.zw_id = this.zwId;
				this.setFpkm.fpkmEntities = this.selectedKm;
				$.put('/gyrcht/ksgl/fpdwzw/fpkm/fpkmBc',
				this.setFpkm).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('科目设置成功！');
						this.getfpkmData();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.selectedKm = [];
					this.dialogSubList = false;
					this.loading = false;
				}).catch(() => {
					this.dialogSubList = false;
					this.loading = false;
				});
			},
			// 发布科目查询
			getfpkmData() {
				this.loading = true;
				this.searchKm.dwyh_id = this.dwyhIds;
				this.searchKm.zw_id = this.zwId;
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/fpkmCx', {
					params: this.searchKm
				}).then((res) => {
					this.resSub = res.returnData.fpkms;
					this.pageTotal = +res.rowsCount || 0;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			// 查询已添加的科目
			getkmxxData() {
				this.loading = true;
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/kmxxCx', {
					params: { ks_id: this.examId, czlx: '0' }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.resSubKm = res.returnData.kmxxs;
						this.formInfoSub.ksrq = res.returnData.kmxxs[0].ksrq;
						this.totalSubkm = +res.rowsCount || 0;
						this.loading = false;
					}
					this.minTime = res.returnData.ksxq.dyzkzjssj;
					this.maxTime = res.returnData.ksxq.cxcjkssj;
				}).catch(() => {
					this.loading = false;
				});
			},
			// 编辑科目
			editsubKm(row) {
				setTimeout(() => {
					Object.keys(this.formInfoSub).forEach((item) => {
						if (item !== 'ks_id' && item !== 'czlx') {
							this.formInfoSub[item] = row[item];
						}
					});
					this.formInfoSub.kmkssj = row.kmkssj;
					this.formInfoSub.kmjssj = row.kmjssj;
					this.formInfoSub.czlx = '1';
					this.timeRange = [new Date(`${row.ksrq} ${row.kmkssj}`), new Date(`${row.ksrq} ${row.kmjssj}`)];
				}, 1);
			},
			// 删除科目
			delsubKm(row, i) {
				this.$confirm('确定要删除该科目么？', '提示', {
					type: 'warning'
				}).then(() => {
					$.delete('/gyrcht/ksgl/fpdwzw/fpkm/kmxxSc', {
						params: { km_id: row.km_id, ks_id: this.examId }
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.resSubKm.splice(i, 1);
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 模糊查询选中单位赋值dwyh_id
			selectCom(item) {
				this.formInfoCo.dwyh_id = item.dwyh_id;
			},
			// 单位输入建议,query 参数，cb回调函数（表明获取建议列表成功）
			suggestionCompany(query, cb) {
				// 先进行数据校验
				this.$refs.formInfoCo.validateField('dwmc', (errorMsg) => {
					// 数据为空不进行联想
					if (query === '') {
						return cb([]);
					}
					// 验证成功之后进行联想
					if (!errorMsg) {
						// 延迟 200ms 提交接口
						clearTimeout(this.timeout);
						this.timeout = setTimeout(() => {
							$.get('/gyrcht/ksgl/fpdwzw/fpdw/getFpdwlb', {
								params: { dwmc: query }
							}).then((res) => {
								if (res.returnData.executeResult === '1') {
									cb(res.returnData.fpdwlb);
								} else {
									cb([]);
								}
							}).catch(() => {});
						}, 200);
					} else {
						cb([]);
					}
				});
			},
			// 删除考试单位 ====================>
			delCo(row) {
				this.$confirm('确定要删除该单位么？', '提示', {
					type: 'warning'
				}).then(() => {
					$.delete('/gyrcht/ksgl/fpdwzw/fpdw/fpdwSc', {
						params: { fpdw_id: row.fpdw_id, dwyh_id: row.dwyh_id, ks_id: this.$route.params.id }
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.getcomData();
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 删除相应单位下的职位
			delJob(row, i) {
				this.$confirm('确定要删除该职位么？', '提示', {
					type: 'warning'
				}).then(() => {
					$.delete('/gyrcht/ksgl/fpdwzw/fpzw/fpzwxxSc', {
						params: { zw_id: row.zw_id, ks_id: this.$route.params.id }
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.resJob.splice(i, 1);
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 删除科目
			delSub() {
				if (this.resSub.length === 1) {
					this.kmMessage = '确定要删除该科目么？';
				} else {
					this.kmMessage = '此操作将把该职位下的所有科目都删除，确定要删除么？';
				}
				this.$confirm(this.kmMessage, '提示', {
					type: 'warning'
				}).then(() => {
					const fpkmIds = [];
					this.resSub.forEach((item) => {
						fpkmIds.push(item.fpkm_id);
					});
					const fpkmIdsStr = fpkmIds.join(',');
					$.delete('/gyrcht/ksgl/fpdwzw/fpkm/fpkmSc', {
						params: {
							fpkm_ids: fpkmIdsStr,
							ks_id: this.examId
						}
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.resSub = [];
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 修改 ====================>
			editCo(row) {
				this.dialogCo = true;
				setTimeout(() => {
					Object.keys(this.formInfoCo).forEach((item) => {
						this.formInfoCo[item] = row[item];
						this.formInfoCo.czlx = '1';
						this.formInfoCo.fpdw_id = row.fpdw_id;
					});
				}, 1);
			},
			editJob(row) {
				this.dialogJob = true;
				setTimeout(() => {
					Object.keys(this.formInfoJob).forEach((item) => {
						this.formInfoJob[item] = row[item];
					});
					this.formInfoJob.czlx = '1';
					this.formInfoJob.fpdw_id = row.fpdw_id;
				}, 1);
			},
			// 弹窗操作 ====================>
			// 关闭
			resetFn(formName, showState) {
				setTimeout(() => {
					if (this.$refs[formName]) {
						this.$refs[formName].resetFields();
					}
					this.timeRange = [];
				}, 5);
				this[showState] = false;
			},
			// 科目设置 ====================>
			// 点击科目设置
			setSub() {
				if (!this.zwId) {
					this.$message.warning('请先选择职位后再设置科目！');
				} else {
					this.getkmData();
					this.selectedKm = [];
				}
			},
			// 取消
			cancelSetSub() {
				this.dialogSubList = false;
			},
			changeTime(val) {
				if (val) {
					const range = val.split(' - ');
					this.formInfoSub.kmkssj = range[0];
					this.formInfoSub.kmjssj = range[1];
				}
			},
			// 校验设置考试时间必须为同一天
			checkDate() {
				$.get('/gyrcht/ksgl/fpdwzw/fpkm/check_Ksrq', {
					params: { ks_id: this.examId }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.isSelectKs = true;
						this.formInfoSub.ksrq = res.returnData.ksrq;
					} else {
						this.isSelectKs = false;
					}
				}).catch(() => {
					this.loading = false;
				});
			}
		},
		created() {
			const params = this.$route.params;
			this.examId = params.id;
			this.formInfoSub.ks_id = params.id;
			this.formSearchJob.ks_id = params.id;
			this.searchKm.ks_id = params.id;
			this.examName = params.ksmc; // 接收考试名称
			this.kslx = params.kslx;
			this.getcomData();
		},
		// 导航到该组件之前
		beforeRouteEnter(to, from, next) {
			// 如果没有参数，导航到 index主页
			if (to.params.ksmc === undefined) {
				next({ name: 'index' });
			} else {
				next();
			}
		}
	};
</script>

<style lang="less" scoped>
.btn_square {
	padding: 7px 8px;
}
.btn_add {
	position: absolute;
	top: 5px;
	right: 20px;
	z-index: 1;
}
.appendWrap {
	padding-right: 40px;
	box-sizing: border-box;
}
.appendText {
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: rgb(72, 85, 106);
	line-height: 1;
	padding: 11px 0 8px 12px;
	box-sizing: border-box;
}
.sub_checkbox {
	margin: 0 0 10px 20px;
	max-width: 220px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
}
.sub_delbtn {
	margin-right: 20px;
	float: right;
}
.po_r{
	margin-top: 26px;
}
.po_mar{
	margin: 0;
}
.dwmc_add{
	margin-top: 25px;
}
.query_wrap{
	margin-left: 10px;
}
.company_info{
	color: #818a96;
	font-size: 16px;
	margin-top: 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.km_footer{
	text-align: right;
}
.km_item{
	margin-top: 20px;
}
.examKssj{
	display: block;
}
</style>

