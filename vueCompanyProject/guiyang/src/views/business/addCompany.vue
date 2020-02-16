<docs>
		## 企业详情 修改或新增
		* @date ###### Tue Aug 29 13:44:20 CST 2017
		* @author jinglf000
		* @desc 业务办理中，点击新增-->新增企业（包括登录信息和基本信息）
</docs>
<template>
		<div>
			<bread-crumb></bread-crumb>
			<el-tabs v-model="tabName" type="border-card">
				<el-tab-pane label="登录信息" name="login" :disabled="disabled.login">
					<el-form :model="form" :label-width="labelWidth"
					:rules="rulesLogin" class="login_info" ref="formLogin" v-loading="loading">
						<el-row>
							<el-col :span="8">
								<el-form-item label="用户名" :required="!disabled.yhzh" prop="yhzh">
									<el-input v-model="form.yhzh" :readonly="disabled.yhzh"
										:class="disabled.yhzh ? 'input_no_border' : ''"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="邮箱" required prop="yx">
									<el-input v-model="form.yx"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="手机号" required prop="sjh">
									<el-input v-model="form.sjh"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="登录密码" required prop="yhmm">
									<el-input v-model="form.yhmm" :type="+isNew ? 'text' : 'password'"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button type="primary" native-type="submit"
									@click.prevent="saveLogin('formLogin')">保存</el-button>
							</el-form-item>
						</el-row>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="基本信息" name="base" :disabled="disabled.base">
					<company-base-info :isNew="!!+$route.params.isNew"
						:isReset="isReset" :yhid="yhid"></company-base-info>
				</el-tab-pane>
			</el-tabs>
		</div>
</template>
<script>
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import companyBaseInfo from '@/common/buss/companyBaseInfo';
import breadCrumb from '@/common/vue/breadCrumb';
// import md5 from '@/common/js/md5';

// 用户密码默认值
const passwordPlaceholder = 'gyrc01';
export default {
	name: 'addCompany',
	components: { companyBaseInfo, breadCrumb },
	data() {
		return {
			labelWidth,
			tabName: 'login',
			isNew: '',
			id: '',
			yhid: '',
			isReset: false,
			disabled: {
				login: false,
				base: false,
				yhzh: false
			},
			loading: false,
			// =============> 登录信息相关
			form: {
				yh_id: '',
				yhzh: '',
				yx: '',
				sjh: '',
				yhmm: passwordPlaceholder,
				czlx: '',
				czbs: '1',
				sfxgmm: ''
			},
			rulesLogin: {
				yhzh: [{ validator: validator('48, "username", "用户账号", false') }],
				yhmm: [{ validator: validator('48, "password", "用户密码", false') }],
				yx: [{ validator: validator('48, "email", "邮箱", false') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", false') }]
			}
		};
	},
	methods: {
		// 查询登录信息
		getDataLogin() {
			$.get('/gyrcht/ywgl/zpbl/yhxxCx', {
				params: { yh_id: this.yhid }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					Object.keys(this.form).forEach((item) => {
						this.form[item] = res.returnData.yhxx[item];
					});
					this.form.yhmm = passwordPlaceholder;
					this.disabled.yhzh = true;
				}
			}).catch(() => { });
		},
		// 保存登录信息 接口
		putData() {
			this.loading = true;
			const params = this.$route.params;
			// 判断是新增还是编辑
			if (params.isNew === '0') {
				this.form.czlx = '1';
			} else {
				this.form.czlx = '0';
			}
			// 判断密码是否修改
			if (this.form.yhmm === passwordPlaceholder) {
				this.form.sfxgmm = '0';
			} else {
				this.form.sfxgmm = '1';
			}
			const data = Object.assign({}, this.form);
			data.czbs = '1';
			$.put('/gyrcht/ywgl/zpbl/yhxxXg', data).then((res) => {
				this.loading = false;
				if (res.returnData.executeResult === '1') {
					this.$message.success('登录信息保存成功！');
					if (this.isNew === '1') {
						this.tabName = 'base';
						this.disabled = {
							login: true,
							base: false,
							yhzh: true
						};
						this.yhid = res.returnData.yh_id;
					}
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存登录信息
		saveLogin(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				}
			});
		}
	},
	// 判断路由
	beforeRouteEnter(to, from, next) {
		const params = to.params;
		if ((params.isNew === '0' && params.id) || (params.isNew === '1')) {
			next();
		} else {
			next({ name: 'index' });
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.yhid = this.$route.params.yhid;
		this.isNew = this.$route.params.isNew;
		// 编辑
		if (this.$route.params.isNew === '0') {
			this.getDataLogin();
		}
	},
	watch: {
		// 监控 isNew值的变化
		isNew(val) {
			// --------> 值为1 为新增
			if (val === '1') {
				this.disabled = {
					login: false,
					base: true,
					yhzh: false
				};
				this.tabName = 'login';
				this.rulesLogin.yhzh = [{ validator: validator('48, "username", "用户账号", false') }];
			// --------> 值为0 为编辑
			} else {
				this.disabled = {
					login: false,
					base: false,
					yhzh: true
				};
				this.rulesLogin.yhzh = [];
			}
		}
	},
	activated() {
		const params = this.$route.params;
		// 原来的值和以后的值判断
		if (this.isNew === '0' && params.isNew === '0') {
			if (params.id !== this.id && params.yhid !== this.yhid) {
				this.getDataLogin();
			}
		} else if (this.isNew === '1' && params.isNew === '0') {
			this.getDataLogin();
		} else if (this.isNew === '0' && params.isNew === '1') {
			this.$refs.formLogin.resetFields();
			this.isReset = true;
		} else {
			this.isReset = false;
		}
		// 新值覆盖老值
		this.isNew = params.isNew;
	}
};
</script>
<style scoped>
	.login_info{
		background-color: #fff;
		padding-top: 10px;
	}
</style>
