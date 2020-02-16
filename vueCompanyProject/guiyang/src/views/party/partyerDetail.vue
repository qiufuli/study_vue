<docs>
	## 党员信息详情
	## 未完成部分
	*	涉及到代码表的部分，dangan
	*	还有一些逻辑判断问题，联调时修改
	## @author jinglf000
	## @date ###### Fri Aug 4 10:25:56 CST 2017
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div v-loading="loadingGet">
		<el-tabs v-model="tabOn">
			<el-tab-pane label="登记信息" name="register">
				<el-row>
					<el-col :span="10">
						<el-form :model="formReg" :rules="rulesReg" ref="formReg"
						:label-width="labelWidth" :show-message="showMessageReg">
							<el-form-item label="姓名" prop="zsxm" required>
								<el-input v-model="formReg.zsxm" :disabled="disabledReg"></el-input>
							</el-form-item>
							<el-form-item label="身份证号" prop="sfzh" required>
								<el-input v-model="formReg.sfzh" :disabled="disabledReg"
									@blur="formReg.sfzh = formReg.sfzh.toUpperCase()"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="xb">
								<el-select v-model="formReg.xb" disabled>
									<el-option label="男" value="1"></el-option>
									<el-option label="女" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否生效" prop="sfsx">
								<el-switch v-model="formReg.sfsx"
									:on-color="color.on" :off-color="color.off"
									on-value="1" off-value="0" on-text="是" off-text="否"
									:disabled="disabledReg"></el-switch>
							</el-form-item>
							<el-form-item v-show="this.$route.params.loginSave !== false">
								<el-button type="primary" native-type="submit"
									:loading="loadingReg" :disabled="disabledReg"
									@click.prevent="submitReg('formReg')">保存</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="党员信息" name="partyer">
				<el-form :model="formParty" :rules="rulesParty" :label-width="labelWidth" ref="formParty" >
					<el-row>
						<el-col :span="6">
							<el-form-item label="用户名" prop="yhm" :class="lczt === '20' ? 'is-required' : ''">
								<el-input v-model="formParty.yhm" :disabled="disabledReg || disabled.yhzt"
									placeholder="字母数字组合，最少为8位"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="姓名" prop="zsxm" required>
								<el-input v-model="formParty.zsxm" :disabled="disabledReg || disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="身份证号" prop="sfzh" required>
								<el-input v-model="formParty.sfzh" :disabled="disabledReg || disabled.yhzt"
									@blur="formParty.sfzh = formParty.sfzh.toUpperCase()"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="性别" prop="xb">
								<el-select v-model="formParty.xb" disabled>
									<el-option label="男" value="1"></el-option>
									<el-option label="女" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="密码" prop="mm" :class="lczt === '20' ? 'is-required' : ''">
								<el-input v-model="formParty.mm" type="password" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="单位名称" prop="dwmc">
								<el-input v-model="formParty.dwmc" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							 <el-form-item label="所属岗位" prop="ssgw">
								 <el-input v-model="formParty.ssgw" :disabled="disabled.yhzt"></el-input>
							 </el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="现居住地" prop="xjzd">
								<el-input v-model="formParty.xjzd" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="邮政编码" prop="yb">
								<el-input v-model="formParty.yb" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="QQ" prop="qq" required>
								<el-input v-model="formParty.qq" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="联系方式" prop="lxfs" class="is-required">
								<el-input v-model="formParty.lxfs" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="电子邮箱" prop="dzyx">
								<el-input v-model="formParty.dzyx" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="户口所在地派出所" prop="hkszdpcs" class="mulitfix">
								<el-input v-model="formParty.hkszdpcs" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="居住证号" prop="jzzh">
								<el-input v-model="formParty.jzzh" :disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="是否就业" prop="sfjy">
								<el-switch v-model="formParty.sfjy" on-text="是" on-value="1"
								off-text="否" off-value="0" :disabled="disabled.yhzt"></el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="党内职务" prop="dnzw">
								<select-code v-model="formParty.dnzw" code="gyrlzyw_dw_d_dnzw"
									:hasAll="false" :disabled="disabled.yhzt">
								</select-code>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="所属总支" prop="sszz" :show-message="!disabled.dzz">
								<party-org v-model="formParty.sszz" :disabled="disabled.dzz || disabled.yhzt"
								:qq.sync="formParty.zzqqq"></party-org>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="总支QQ群" prop="zzqqq">
								<el-input v-model="formParty.zzqqq" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="所属支部" prop="sszb" :show-message="!disabled.dzb">
								<party-org v-model="formParty.sszb" type="middle"
								:depend="formParty.sszz" :disabled="disabled.dzb || disabled.yhzt"
								:qq.sync="formParty.zbqqq" ></party-org>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="支部QQ群" prop="zbqqq">
								<el-input v-model="formParty.zbqqq" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<!--<el-col :span="6">
							<el-form-item label="党费缴纳基数" prop="dfjnjs" class="mulitfix">
								<el-input v-model="formParty.dfjnjs"
									:disabled="disabled.yhzt"></el-input>
							</el-form-item>
						</el-col>-->
						<el-col :span="6">
							<el-form-item label="党费缴纳截止日期" prop="dfjnjzrq" class="mulitfix">
								<el-date-picker v-model="formParty.dfjnjzrq" :editable="false" class="date_picker"
									:disabled="disabled.yhzt || formParty.dfjnjzrqzt === '1'"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="转入日期" prop="zrsj">
								<el-date-picker v-model="formParty.zrsj" :editable="false" class="date_picker"
									:picker-options="inOption" :disabled="disabled.yhzt"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="用户状态" prop="yhzt">
								<el-switch
									v-model="formParty.yhzt"
									:disabled="canUse"
									:on-color="color.on" on-value="10" on-text="正常"
									:off-color="color.off" off-value="20" off-text="转出">
								</el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="转出日期" prop="zcsj" :show-message="disabled.yhzt">
								<el-date-picker
									v-model="formParty.zcsj"
									:editable="false" class="date_picker"
									:disabled="canUse || !disabled.yhzt"
									:picker-options="outOption"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="是否挂起" prop="sfgq">
								<el-switch
									v-model="formParty.sfgq"
									:on-color="color.on" on-value="0" on-text="正常"
									:off-color="color.off" off-value="1" off-text="挂起">
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item v-show="this.$route.params.editSave !== false">
						<el-button type="primary" native-type="submit" :loading="loadingParty"
							@click.prevent="submitParty('formParty')">保存</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
		</div>
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { dateZero } from '@/common/js/utils';
import partyOrg from '@/common/vue/partyOrg';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';
// import md5 from '@/common/js/md5';
import { cardExchangeIsValid } from '@/common/js/checkCard';

export default {
	name: 'partyerDetail',
	components: { partyOrg, selectCode, breadCrumb },
	data() {
		// 校验电子邮箱 唯一性
		const checkEmailOnly = (rules, value, cb) => {
			$.get('/gyrcht/rsdldw/rsdldw/dzyxCx', {
				params: { dzyx: value, dyyh_id: this.dyyh_id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					cb();
				} else {
					cb(new Error('电子邮箱已存在！'));
				}
			}).catch(() => {
				cb();
			});
		};
		// 校验用户名 唯一性
		const checkUserOnly = (rules, value, cb) => {
			$.get('/gyrcht/rsdldw/rsdldw/yhmCx', {
				params: { yhm: value, dyyh_id: this.dyyh_id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					cb();
				} else {
					cb(new Error(res.returnData.message));
				}
			}).catch(() => {
				cb();
			});
		};
		// 校验手机号码 唯一性
		const checkPhoneOnly = (rules, value, cb) => {
			$.get('/gyrcht/rsdldw/rsdldw/sjhCx', {
				params: { sjh: value, dyyh_id: this.dyyh_id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					cb();
				} else {
					cb(new Error(res.returnData.message));
				}
			}).catch(() => {
				cb();
			});
		};
		return {
			// 密码占位符
			passwordPlaceholder: '00000a',
			tabOn: 'register',
			color: {
				on: colorOn,
				off: colorOff
			},
			labelWidth,
			disabledReg: false,
			showMessageReg: true,
			loadingGet: false,
			formReg: {
				czlx: '1',
				dyyh_id: '',
				sfsx: '1',
				sfzh: '',
				xb: '',
				zsxm: ''
			},
			rulesReg: {
				zsxm: [{ validator: validator('64, "full", "姓名", false') }],
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", false') }]
			},
			loadingReg: false,
			formParty: {
				dyyh_id: '',
				dyxq_id: '',
				sfxgmm: '',
				yhm: '',
				zsxm: '',
				sfzh: '',
				xb: '',
				mm: '',
				dwmc: '',
				ssgw: '',
				xjzd: '',
				yb: '',
				lxfs: '',
				qq: '',
				dzyx: '',
				hkszdpcs: '',
				jzzh: '',
				sfjy: '1',
				sszz: '',
				zzqqq: '',
				sszb: '',
				zbqqq: '',
				dnzw: '',
				dfjnjs: '',
				dfjnjzrq: '',
				zrsj: '',
				zcsj: '',
				dfjnjzrqzt: '',
				sfgq: '',
				yhzt: '10'
			},
			rulesParty: {
				yhm: [{ validator: validator('48, "username", "用户名", true', checkUserOnly), trigger: 'blur' }],
				mm: [{ validator: validator('48, "password", "密码", true') }],
				dwmc: [{ validator: validator('128, "full", "单位名称", true') }],
				ssgw: [{ validator: validator('32, "full", "所属岗位", true') }],
				xjzd: [{ validator: validator('128, "full", "现住地址", true') }],
				yb: [{ validator: validator('6, "yb", "邮政编码", true') }],
				dzyx: [{ validator: validator('48, "email", "电子邮箱", true', checkEmailOnly), trigger: 'blur' }],
				zsxm: [{ validator: validator('64, "full", "姓名", false') }],
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", false') }],
				lxfs: [{ validator: validator('11, "sjh", "联系方式", false', checkPhoneOnly), trigger: 'blur' }],
				qq: [{ validator: validator('16, "qq", "QQ", false') }],
				hkszdpcs: [{ validator: validator('128, "full", "户口所在地派出所", true') }],
				jzzh: [{ validator: validator('64, "full", "居住证号", true') }],
				dfjnjs: [{ validator: validator('10, "full", "党费缴纳基数", true') }],
				zcsj: [],
				dnzw: [{ required: true, message: '党内职务不能为空' }],
				sszz: [{ required: true, message: '所属总支不能为空' }],
				sszb: [{ required: true, message: '所属支部不能为空' }]
			},
			loadingParty: false,
			dyyh_id: '',
			dyxq_id: '',
			disabled: {
				dzz: true,
				dzb: true,
				yhzt: false
			},
			// 用户状态 是否可用
			canUse: true,
			// 是否有密码
			hasMM: '',
			// 父组件传入流程状态：10为 已登记，20为 已注册
			lczt: ''
		};
	},
	watch: {
		/* eslint-disable func-names */
		// 党内职务判断逻辑
		// 职务--不限--总支支部不可选
		'formParty.dnzw': function (val) {
			// 总支书记 总支委员
			if (val === '10' || val === '20') {
				this.disabled.dzz = false;
				this.disabled.dzb = true;
				this.rulesParty.sszb = [];
			} else {
				// 支部书记、普通党员、支部委员
				this.disabled.dzz = false;
				this.disabled.dzb = false;
				this.rulesParty.sszb = [{ required: true, message: '所属支部不能为空' }];
			}
		},
		// 用户状态为 正常 10的时候，转出日期不可编辑,转出日期禁用，不显示错误信息，日期清空
		// 用户状态为 转出 20的时候，转出日期必填
		'formParty.yhzt': function (val) {
			// 用户状态为 10
			if (val === '10') {
				this.disabled.yhzt = false;
				this.rulesParty.zcsj = [];
				this.formParty.zcsj = '';
			} else if (val === '20') {
				this.disabled.yhzt = true;
				this.rulesParty.zcsj = [{ required: true, message: '转出日期不能为空' }];
			}
		},
		// 身份证号15位自动转18位，以及获取性别
		'formReg.sfzh': function (val) {
			if (val.length === 15) {
				this.formReg.sfzh = cardExchangeIsValid(val);
			} else if (val.length === 18) {
				const flag = val.charAt(val.length - 2) % 2 === 0;
				this.formReg.xb = flag ? '2' : '1';
			}
		},
		'formParty.sfzh': function (val) {
			if (val.length === 15) {
				this.formParty.sfzh = cardExchangeIsValid(val);
			} else if (val.length === 18) {
				const flag = val.charAt(val.length - 2) % 2 === 0;
				this.formParty.xb = flag ? '2' : '1';
			}
		},
		// 是否有密码
		hasMM(val) {
			if (val === '1') {
				this.passwordPlaceholder = '00000a';
				this.formParty.mm = '00000a';
			} else if (val === '0') {
				this.passwordPlaceholder = '';
				this.formParty.mm = '';
			}
		}
	},
	computed: {
		// 开始日期
		inOption() {
			if (this.formParty.zcsj) {
				const out = new Date(this.formParty.zcsj);
				return {
					disabledDate(time) {
						return time.getTime() > out.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		},
		// 结束日期
		outOption() {
			if (this.formParty.zrsj) {
				const inDate = dateZero(this.formParty.zrsj);
				return {
					disabledDate(time) {
						return time.getTime() < inDate.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		}
	},
	methods: {
		// 获取内容
		getDataParty() {
			this.loadingGet = true;
			const params = this.$route.params;
			$.get('/gyrcht/rsdldw/rsdldw/dyxgCx', {
				params: {
					dyyh_id: params.dyyh_id,
					dyxq_id: params.dyxq_id
				}
			}).then((res) => {
				this.loadingGet = false;
				const data = res.returnData.dyxx;
				// 用户状态是否可编辑
				this.canUse = data.yhzt === '10' ? false : !+data.zcsfky;
				// 初始化赋值->登记信息
				this.formReg.zsxm = data.zsxm;
				this.formReg.sfzh = data.sfzh;
				this.formReg.sfsx = data.sfsx;
				// 流程状态（lczt）：10为 已登记，20为 已注册
				// 当为 已注册时，错误提示信息不出现，
				this.disabledReg = false;
				this.formParty.dfjnjzrqzt = data.dfjnjzrqzt;
				// 初始化赋值->党员信息
				Object.keys(this.formParty).forEach((item) => {
					if (item !== 'mm' && item !== 'sfjy') {
						this.formParty[item] = data[item];
					}
				});
				this.formParty.sfgq = data.sfgq === '1' ? '1' : '0';
				if (data.lczt === '10') {
					this.formParty.yhzt = '10';
					this.rulesParty.yhm = [{ validator: validator('48, "least", "用户名", true', this.checkUserOnly), trigger: 'blur' }];
					this.rulesParty.mm = [{ validator: validator('48, "password", "密码", true') }];
				} else if (data.lczt === '20') {
					this.tabOn = 'partyer';
					this.disabledReg = true;
					this.showMessageReg = false;
					this.rulesParty.yhm = [{ validator: validator('48, "least", "用户名", false', this.checkUserOnly), trigger: 'blur' }];
					this.rulesParty.mm = [{ validator: validator('48, "password", "密码", false') }];
				}
			}).catch(() => {
				this.loadingGet = false;
			});
		},
		// 校验用户名 唯一性
		checkUserOnly(rules, value, cb) {
			$.get('/gyrcht/rsdldw/rsdldw/yhmCx', {
				params: { yhm: value, dyyh_id: this.dyyh_id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					cb();
				} else {
					cb(new Error(res.returnData.message));
				}
			}).catch(() => {
				cb();
			});
		},
		// 修改登记信息
		postDataReg() {
			this.loadingReg = true;
			$.post('/gyrcht/rsdldw/rsdldw/dyxxtjBc', this.formReg).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功',
						showClose: true,
						onClose: () => {
							this.$router.go(-1);
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loadingReg = false;
				}
			}).catch(() => {
				this.loadingReg = false;
			});
		},
		// 修改党员信息
		putDataParty() {
			this.loadingParty = true;
			const data = Object.assign({}, this.formParty);
			// 密码是否修改
			if (data.mm === this.passwordPlaceholder) {
				data.sfxgmm = 0;
			} else {
				data.sfxgmm = 1;
				// if (data.mm !== '') {
				// 	data.mm = md5(data.mm);
				// }
			}
			$.put('/gyrcht/rsdldw/rsdldw/dyxgBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功',
						showClose: true,
						onClose: () => {
							this.$router.go(-1);
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loadingParty = false;
				}
			}).catch(() => {
				this.loadingParty = false;
			});
		},
		submitReg(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postDataReg();
				}
			});
		},
		submitParty(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putDataParty();
				}
			});
		}
	},
	created() {
		this.getDataParty();
		const params = this.$route.params;
		this.formReg.dyyh_id = params.dyyh_id;
		this.formParty.dyyh_id = params.dyyh_id;
		this.dyyh_id = params.dyyh_id;
		this.hasMM = params.hasMM;
		this.lczt = params.lczt;
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.dyyh_id && !to.params.dyxq_id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style>

</style>
