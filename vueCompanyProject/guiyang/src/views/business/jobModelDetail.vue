<docs>
		## 业务管理---委托/现场招聘海报--职位--发布职位（职位模板）---职位编辑/新增
		* @date ###### Fri Sep 1 17:38:36 CST 2017
		* @author jinglf000
		* @desc 职位的新增和编辑，处理职位模板的编辑、发布、新增
</docs>
<template>
		<div>
			<bread-crumb></bread-crumb>
			<p class="co_name">当前单位：{{coName}}</p>
			<div class="detail_wrap" v-loading="loading">
			<!-- 编辑 区域 开始 -->
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="detailForm">
				<el-row>
					<el-col :span="12">
						<el-form-item prop="zwmc" label="职位名称" required>
							<el-input v-model="form.zwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="gzxz" label="工作性质" >
							<select-code v-model="form.gzxz" code="gyrlzyw_qzzp_d_gzxz"
								:has-all="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="gznx" label="工作年限">
							<el-input v-model="form.gznx" class="width_100">
								<template slot="append">年</template>
							</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item prop="zwlx" label="职位类型">
							<job-select v-model="form.zwlx"></job-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="gzddq" label="工作地点" class="is-required">
							<address-select :changeOnSelect="false" v-model="form.gzddq" xzqhjb="3"></address-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item prop="xl" label="学历要求" >
							<select-code v-model="form.xl" code="gyrlzyw_qzzp_d_xl"
							:has-all="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="sxzy" label="所需专业">
							<major-select v-model="form.sxzy"></major-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item prop="bm_id" label="部门">
							<el-select v-model="form.bm_id" class="width_100"
								@change="changeDepartment">
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(item, index) in departmentList" :key="index"
									:label="item.bmmc" :value="item.bm_id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.bm_id">
						<el-form-item prop="bmlxr" label="联系人">
							<el-input v-model="form.bmlxr" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.bm_id">
						<el-form-item prop="bmlxfs" label="联系方式">
							<el-input v-model="form.bmlxfs" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="年龄范围" class="is-required">
							<el-col :span="11">
								<el-form-item prop="nlq" required>
									<el-input v-model="form.nlq" placeholder="年龄起">
										<template slot="append">岁</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item prop="nlz">
									<el-input v-model="form.nlz" placeholder="年龄止（不填为不限）">
										<template slot="append">岁</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="sfsx" label="是否双休" label-width="130px" class="is-required">
							<el-switch v-model="form.sfsx"
								:on-color="colorOn" on-text="是" on-value="1"
								:off-color="colorOff" off-text="否" off-value="0"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="sftgzs" label="是否提供住宿" label-width="130px" class="is-required">
							<el-switch v-model="form.sftgzs"
								:on-color="colorOn" on-text="是" on-value="1"
								:off-color="colorOff" off-text="否" off-value="0"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="招聘人数" >
							<el-select v-model="form.zprszt" class="width_100"
							@change="changeDiy">
								<el-option value="1" label="性别不限"></el-option>
								<el-option value="2" label="限男"></el-option>
								<el-option value="3" label="限女"></el-option>
								<el-option value="4" label="自定义"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="总人数" v-show="form.zprszt === '1'">
							<el-col :span="12">
									<el-form-item>
										<el-switch v-model="form.isDiy" :width="80"
										:on-color="colorOn" on-text="自定义" on-value="1"
										:off-color="colorOn" off-text="不限" off-value="0"
										@change="changeSwitch(1)">
										</el-switch>
									</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="zprsa" required>
									<el-input v-model="form.zprsa" :width="80"
									v-show="form.isDiy === '1'">
										<template slot="append">人</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="男性人数" v-show="form.zprszt === '2' || form.zprszt === '4'">
							<el-col :span="12">
								<el-form-item v-show="form.zprszt === '2'">
									<el-switch v-model="form.isDiy1" :width="80"
									:on-color="colorOn" on-text="自定义" on-value="1"
									:off-color="colorOn" off-text="不限" off-value="0"
									@change="changeSwitch(2)">
									</el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="nanrs" required>
									<el-input v-model="form.nanrs" class="width_100"
									v-show="form.isDiy1 === '1'">
										<template slot="append">人</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="女性人数" v-show="form.zprszt === '3' || form.zprszt === '4'">
							<el-col :span="12">
								<el-form-item v-show="form.zprszt === '3'">
									<el-switch v-model="form.isDiy2" :width="80"
									:on-color="colorOn" on-text="自定义" on-value="1"
									:off-color="colorOn" off-text="不限" off-value="0"
									@change="changeSwitch(3)">
									</el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="nvrs" required>
									<el-input v-model="form.nvrs" class="width_100"
									v-show="form.isDiy2 === '1'">
										<template slot="append">人</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item prop="sfsy" label="是否试用" class="is-required">
							<el-switch v-model="form.sfsy"
								:on-color="colorOn" on-text="是" on-value="1"
								:off-color="colorOff" off-text="否" off-value="0"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.sfsy === '1'">
						<el-form-item prop="syq" label="试用期" class="is-required">
							<select-code code="gyrlzyw_qzzp_d_syq" v-model="form.syq"
								:has-all="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.sfsy === '1'">
						<el-form-item prop="syqgz" label="试用工资" class="is-required">
							<el-input v-model="form.syqgz"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						<el-form-item label="转正月薪" prop="yxfw" class="is-required">
							<el-col :span="11">
								<el-form-item prop="yxfwq">
									<el-input v-model="form.yxfwq" placeholder="月薪起" class="width_100">
										<template slot="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item prop="yxfwz">
									<el-input v-model="form.yxfwz" placeholder="月薪止（不填为不限）" class="width_100">
										<template slot="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="福利" prop="fl">
						<el-input v-model="form.fl" type="textarea" :autosize="{ minRows: 2 }"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="职位描述" prop="zwms">
						<el-input v-model="form.zwms" type="textarea" :autosize="{ minRows: 2 }"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="职位要求" prop="zwyq">
						<el-input v-model="form.zwyq" type="textarea" :autosize="{ minRows: 2 }"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item>
						<!-- <el-button type="primary" class="btn_square"
							@click="publishModel('detailForm')">发布职位</el-button> -->
						<el-button type="primary" class="btn_square"
							@click="saveModel('detailForm')">存模板</el-button>
						<!-- <el-button type="primary" class="btn_square"
							@click="savePublishModel('detailForm')">发布并存模板</el-button> -->
					</el-form-item>
				</el-row>
			</el-form>
			<!-- 编辑 区域 结束 -->
			</div>
			<!-- 选择招聘会 开始 -->
			<el-dialog title="选择招聘会" :visible.sync="dialogZph"
				@close="dialogZphClose">
				<el-form :form="form" :label-width="labelWidth">
					<el-form-item v-if="zphList.length > 0"
						label="选择招聘会" class="is-required">
						<checkbox-group
							v-model="form.zph_ids"
							:list="zphList"
							:option="checkboxGroupOption"></checkbox-group>
					</el-form-item>
					<el-form-item v-else label="无可用招聘会"></el-form-item>
				</el-form>
				<div class="footer" slot="footer">
					<el-button @click="dialogZphClose">取消</el-button>
					<el-button @click="dialogPubSubmit" type="primary"
						:disabled="form.zph_ids.length === 0">确定</el-button>
				</div>
			</el-dialog>
			<!-- 选择招聘会 结束 -->
		</div>
</template>
<script>
import { labelWidth, colorOn, colorOff, baseRichConfig } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';
import jobSelect from '@/common/vue/multiSelect/jobSelect';
import addressSelect from '@/common/vue/multiSelect/addressSelect';
import majorSelect from '@/common/vue/multiSelect/majorSelect';
import checkboxGroup from '@/common/vue/checkboxGroup';
import breadCrumb from '@/common/vue/breadCrumb';

export default {
	name: 'bussJobModelDetail',
	components: {
		selectCode,
		jobSelect,
		addressSelect,
		majorSelect,
		checkboxGroup,
		breadCrumb
	},
	data() {
		// 年龄范围校验
		const checkAge = (rule, val, callback) => {
			if (+this.form.nlq < 18) {
				return callback(new Error('年龄不能小于18岁'));
			}
			if (this.form.nlq && this.form.nlz && +this.form.nlz < +this.form.nlq) {
				return callback(new Error('年龄起应小于年龄止'));
			}
			callback();
		};
		// 转正月薪校验
		const checkMoney = (rule, val, callback) => {
			if (+this.form.yxfwq < this.minSalary) {
				return callback(new Error(`月薪应大于最低标准${this.minSalary}元`));
			}
			if (this.form.yxfwq && this.form.yxfwz && +this.form.yxfwz < +this.form.yxfwq) {
				return callback(new Error('转正月薪起应小于止'));
			}
			callback();
		};
		return {
			colorOff,
			colorOn,
			baseRichConfig,
			coName: '',
			jobId: '',
			yhId: '',
			zpType: '',
			companyId: '',
			isNew: '',
			labelWidth,
			loading: false,
			numDisabled: true,
			zphList: [],
			departmentList: [],
			form: {
				bm_id: '',
				bmlxr: '',
				bmlxfs: '',
				czlx: '',
				fl: '',
				gzddq: '',
				gznx: '',
				gzxz: '',
				zprs: 0,
				zprsa: 0,
				nanrs: 0,
				nvrs: 0,
				nlq: 18,
				nlz: '',
				sfsx: '0',
				sfsy: '1',
				sftgzs: '0',
				sxzy: '',
				syq: '',
				syqgz: '',
				xl: '',
				yxfwq: '',
				yxfwz: '',
				zwlx: '',
				zwmc: '',
				zwms: '',
				zwyq: '',
				fblx: '', // ：发布类型(0：发布职位1：保存模板 2：发布并保存)
				dwzwmb_id: '', // 职位模板id
				dwxx_id: '', // 企业信息id
				yh_id: '', // 用户id
				zph_ids: [], // 发布时招聘会id
				zplx: '', // 招聘类型
				minSalary: 0,
				zprszt: '1',
				isDiy: '0',
				isDiy1: '0',
				isDiy2: '0'
			},
			rules: {
				nlq: [{ validator: validator('2, "number", "年龄起", false', checkAge) }],
				nlz: [{ validator: validator('2, "number", "年龄止", true', checkAge) }],
				nanrs: [{ validator: validator('4, "number", "男性人数", false') }],
				nvrs: [{ validator: validator('4, "number", "女性人数", false') }],
				zprsa: [{ validator: validator('4, "number", "总人数", false') }],
				fl: [{ validator: validator('256, "least", "福利", true') }],
				gznx: [{ validator: validator('2, "number", "工作年限", true') }],
				gzxz: [{ required: true, message: '工作性质不能为空' }],
				syq: [{ required: true, message: '试用期不能为空' }],
				syqgz: [{ validator: validator('6, "number", "试用工资", false', this.minMoney), trigger: 'blur' }],
				zwmc: [{ validator: validator('128, "normal", "职位名称", false') }],
				xl: [{ required: true, message: '学历要求不能为空' }],
				gzddq: [{ required: true, message: '工作地点不能为空' }],
				zwms: [{ validator: validator('1024, "least", "职位描述", true') }],
				zwyq: [{ validator: validator('1024, "least", "职位要求", true') }],
				zwlx: [{ required: true, message: '职位类型不能为空' }],
				yxfwq: [{ validator: validator('6, "number", "转正月薪起", false', checkMoney), trigger: 'blur' }],
				yxfwz: [{ validator: validator('6, "number", "转正月薪止", true', checkMoney), trigger: 'blur' }]
			},
			// 发布职位时选择招聘会列表
			dialogZph: false
		};
	},
	watch: {
		/* eslint-disable func-names */
		// 监控是否试用
		'form.sfsy': function (val) {
			if (val === '1') {
				this.rules.syq = [{ required: true, message: '试用期不能为空' }];
				this.rules.syqgz = [{ validator: validator('6, "number", "试用工资", false', this.minMoney), trigger: 'blur' }];
			} else {
				this.form.syq = '';
				this.form.syqgz = '';
				this.rules.syq = [];
				this.rules.syqgz = [{ trigger: 'blur' }];
			}
		}
	},
	computed: {
		// 现场招聘会占位，委托招聘会占位
		checkboxGroupOption() {
			let option = null;
			switch (this.zpType) { // 02现场, 获取现场招聘列表
			case '02': option = { label: 'zphrq,zphbt', value: 'zph_id' };
				break; // 03委托，获取委托招聘列表
			case '03': option = { label: 'zphzwbh,zwydsj,,,zwjsrq', value: 'wtzwyd_id' };
				break;
			default: break;
			}
			return option;
		}
	},
	methods: {
		// 试用期工资校验
		minMoney(rule, val, callback) {
			if (+this.form.syqgz < this.minSalary) {
				return callback(new Error(`试用工资应大于最低标准${this.minSalary}元`));
			}
			callback();
		},
		// 招聘人数开关
		changeDiy() {
			if (this.form.zprszt === '4') {
				this.form.isDiy1 = '1';
				this.form.isDiy2 = '1';
			}
		},
		changeSwitch(num) {
			if (num === 1) {
				this.form.zprsa = 0;
			}
			if (num === 2) {
				this.form.nanrs = 0;
			}
			if (num === 3) {
				this.form.nvrs = 0;
			}
		},
		// 部门查询
		getDataDepartment() {
			$.get('/gyrcht/ywgl/xczpdy/bmlbCx', {
				params: { dwxx_id: this.companyId }
			}).then((res) => {
				const data = res.returnData;
				if (data.executeResult === '1') {
					this.departmentList = data.zwxxlb;
				}
			}).catch(() => {});
		},
		// 选择部门，带出联系人与联系方式
		changeDepartment() {
			const selectValue = this.departmentList.find(item => item.bm_id === this.form.bm_id);
			if (selectValue) {
				this.form.bmlxr = selectValue.bmlxr;
				this.form.bmlxfs = selectValue.bmlxfs;
			} else {
				this.form.bmlxr = '';
				this.form.bmlxfs = '';
			}
		},
		// 获取职位详情
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/xczpdy/zwmbxqCx', {
				params: { dwzwcg_id: this.jobId }
			}).then((res) => {
				this.loading = false;
				const data = res.returnData.zwmbxq;
				if (data.zprs < 0) {
					if (data.zprs === -1) {
						this.form.zprszt = '1';
					}
					if (data.zprs === -2) {
						this.form.zprszt = '2';
					}
					if (data.zprs === -3) {
						this.form.zprszt = '3';
					}
				} else if (data.zprs > 0) {
					if (data.nanrs === 0 && data.nvrs === 0) {
						this.form.zprszt = '1';
						this.form.zprsa = data.zprs;
						this.form.isDiy = '1';
					}
					if (data.nanrs > 0 && data.nvrs === 0) {
						this.form.zprszt = '2';
						this.form.isDiy1 = '1';
					}
					if (data.nanrs === 0 && data.nvrs > 0) {
						this.form.zprszt = '3';
						this.form.isDiy2 = '1';
					}
					if (data.nanrs > 0 && data.nvrs > 0) {
						this.form.zprszt = '4';
					}
				} else {
					this.form.zprszt = '1';
					this.form.zprsa = 0;
				}
				Object.keys(this.form).forEach((item) => {
					if (data[item]) {
						this.form[item] = data[item];
					}
				});
			}).catch(() => {
				this.loading = true;
			});
		},
		// 发布职位，存模板，发布并存模板 接口
		putData() {
			this.loading = true;
			// 数据赋值
			this.form.dwzwmb_id = this.jobId;
			this.form.dwxx_id = this.companyId;
			this.form.yh_id = this.yhId;
			// 判断操作类型
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			// 男女不限
			if (this.form.zprszt === '1' && this.form.isDiy === '0') {
				this.form.zprs = -1;
				this.form.nanrs = 0;
				this.form.nvrs = 0;
			} else if (this.form.zprszt === '1' && this.form.isDiy === '1') {
				if (parseInt(this.form.zprsa, 10) === 0) {
					this.$message.warning('自定义的招聘人数不能为0！');
					this.loading = false;
					return false;
				}
				this.form.zprs = this.form.zprsa;
				this.form.nanrs = 0;
				this.form.nvrs = 0;
			}
			// 限男
			if (this.form.zprszt === '2' && this.form.isDiy1 === '0') {
				this.form.zprs = -2;
				this.form.nanrs = 0;
				this.form.nvrs = 0;
			} else if (this.form.zprszt === '2' && this.form.isDiy1 === '1') {
				if (parseInt(this.form.nanrs, 10) === 0) {
					this.$message.warning('自定义的男性人数不能为0！');
					this.loading = false;
					return false;
				}
				this.form.zprs = this.form.nanrs;
				this.form.nvrs = 0;
			}
			// 限女
			if (this.form.zprszt === '3' && this.form.isDiy2 === '0') {
				this.form.zprs = -3;
				this.form.nanrs = 0;
				this.form.nvrs = 0;
			} else if (this.form.zprszt === '3' && this.form.isDiy2 === '1') {
				if (parseInt(this.form.nvrs, 10) === 0) {
					this.$message.warning('自定义的女性人数不能为0！');
					this.loading = false;
					return false;
				}
				this.form.zprs = this.form.nvrs;
				this.form.nanrs = 0;
			}
			// 自定义
			if (this.form.zprszt === '4') {
				if (parseInt(this.form.nvrs, 10) === 0 || parseInt(this.form.nanrs, 10) === 0) {
					this.$message.warning('自定义的男性人数和女性人数均不能为0！');
					this.loading = false;
					return false;
				}
				this.form.zprs = parseInt(this.form.nvrs, 10) + parseInt(this.form.nanrs, 10);
			}
			$.put('/gyrcht/ywgl/xczpdy/zwmbXg', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功！');
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 发布职位
		// publishModel(formName) {
		// 	this.$refs[formName].validate((valid) => {
		// 		if (valid) {
		// 			this.form.fblx = '0';
		// 			this.dialogZph = true;
		// 			if (this.zpType === '02') { // 现场招聘
		// 				this.form.zplx = '02';
		// 				this.getDataXianChangList();
		// 			} else if (this.zpType === '03') { // 委托招聘
		// 				this.form.zplx = '03';
		// 				this.getDataWeiTuoList();
		// 			}
		// 		} else {
		// 			this.$message.warning('有未符合要求的录入项，请检查后再次提交');
		// 		}
		// 	});
		// },
		// 保存模板
		saveModel(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.fblx = '1';
					this.form.zph_ids = [];
					this.form.zphrq = '';
					this.putData();
				} else {
					this.$message.warning('有未符合要求的录入项，请检查后再次提交');
				}
			});
		},
		// 发布并保存
		// savePublishModel(formName) {
		// 	this.$refs[formName].validate((valid) => {
		// 		if (valid) {
		// 			this.form.fblx = '2';
		// 			this.dialogZph = true;
		// 			if (this.zpType === '02') { // 现场招聘
		// 				this.form.zplx = '02';
		// 				this.getDataXianChangList();
		// 			} else if (this.zpType === '03') { // 委托招聘
		// 				this.form.zplx = '03';
		// 				this.getDataWeiTuoList();
		// 			}
		// 		} else {
		// 			this.$message.warning('有未符合要求的录入项，请检查后再次提交');
		// 		}
		// 	});
		// },
		// 招聘会选择
		dialogPubSubmit() {
			this.checkJobNameOnly().then((res) => {
				if (res.returnData.executeResult === '1') {
					this.dialogZph = false;
					this.putData();
				} else {
					this.$confirm(res.returnData.message, '提示', {
						type: 'warning'
					}).then(() => {
						this.dialogZph = false;
						this.putData();
					}).catch(() => {});
				}
			}).catch(() => {});
		},
		// 获取现场招聘会，可用招聘会列表
		getDataXianChangList() {
			$.get('/gyrcht/ywgl/xczpdy/zphlbCx', {
				params: {
					dwxx_id: this.companyId,
					sczpjzzt: '', // 提交简章状态
					zphbs: '1', // 招聘会标识(1:可用 0:全部)
					pageSize: 5000 // 把所有的可用的招聘会都查询出来(设置的足够大)
				}
			}).then((res) => {
				this.zphList = res.returnData.xczplb;
			}).catch(() => {});
		},
		// 获取委托招聘会，可以占位列表
		getDataWeiTuoList() {
			$.get('/gyrcht/ywgl/wtzp/wtzwlbCx', {
				params: {
					dwxx_id: this.companyId,
					wtzwbs: '1', // 委托展位标识(0:可用1:全部)
					sczpjzzt: '', // (1：已提交 0：未提交)全部
					pageSize: 5000 // 把所有的可用的委托招聘会都查询出来(设置的足够大)，不要分页
				}
			}).then((res) => {
				this.zphList = res.returnData.wtzplb;
			}).catch(() => {});
		},
		// 查询职位是否已存在 弹出提示
		checkJobNameOnly() {
			const data = {
				zwmc: this.form.zwmc,
				dwxx_id: this.companyId,
				dwzw_id: this.jobId,
				zph_id: this.form.zph_ids.join(','),
				czlx: this.zpType
			};
			return $.post('/gyrcht/ywgl/wtzp/zwjyCx', data);
		},
		dialogZphClose() {
			setTimeout(() => {
				this.zphList = [];
				this.form.zph_ids = [];
			}, 1);
			this.dialogZph = false;
		},
		getMinSalary() {
			$.get('/gyrcht/ywgl/xczpdy/zdgzbzCx').then((res) => {
				this.minSalary = +res.returnData.zdgzbz;
				if (res.returnData.executeResult === '1') {
					this.form.yxfwq = this.minSalary;
				}
			}).catch(() => {});
		}
	},
	created() {
		const params = this.$route.params;
		/* eslint-disable no-return-assign */
		['coName', 'isNew', 'jobId', 'yhId', 'companyId', 'zpType'].forEach(item => (this[item] = params[item]));
		this.getMinSalary();
		if (!params.isNew) {
			this.getData();
		}
		this.getDataDepartment();
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.isNew === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
