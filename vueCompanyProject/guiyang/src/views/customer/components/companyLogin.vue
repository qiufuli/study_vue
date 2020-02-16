<docs>
	## 单位客户登录信息
</docs>

<template>
	<div class="detail_wrap">
		<el-form ref="formLogin" :model="form" :rules="rulesLogin"
			:label-width="labelWidth" v-loading="loading">
			<el-row>
				<el-col :span="8">
					<el-form-item label="用户名" :required="isNew" prop="yhzh">
						<el-input v-model="form.yhzh" :readonly="!isNew"
							:class="!isNew ? 'input_no_border' : ''"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="邮箱" prop="yx">
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
						<el-input v-model="form.yhmm"
							:type="+isNew ? 'text' : 'password'"></el-input>
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
	</div>
</template>

<script>
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';

// 用户密码默认值
const pwHolder = 'gyrc01';
export default {
	name: 'coLoginInfo',
	props: {
		isNew: {
			type: Boolean,
			default: false
		},
		yhid: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			labelWidth,
			loading: false,
			// =============> 登录信息相关
			form: {
				yh_id: '',
				yhzh: '',
				yhmm: pwHolder,
				yx: '',
				sjh: '',
				czlx: '',
				czbs: '1',
				sfxgmm: ''
			},
			rulesLogin: {
				yhzh: [{ validator: validator('48, "username", "用户账号", false') }],
				yhmm: [{ validator: validator('48, "password", "用户密码", false') }],
				yx: [{ validator: validator('48, "email", "邮箱", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", false') }]
			}
		};
	},
	methods: {
		// 查询登录信息
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/zpbl/yhxxCx', {
				params: { yh_id: this.yhid }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					// 赋值
					Object.keys(this.form).forEach((item) => {
						if (item !== 'czbs' && item !== 'czlx') {
							this.form[item] = res.returnData.yhxx[item];
						}
					});
					this.form.yhmm = pwHolder;
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存登录信息 接口
		putData() {
			this.loading = true;
			// 判断密码是否修改
			this.form.sfxgmm = this.form.yhmm === pwHolder ? '0' : '1';
			$.put('/gyrcht/ywgl/zpbl/yhxxXg', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('登录信息保存成功！');
					if (this.isNew) {
						this.yhid = res.returnData.yh_id;
					}
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loading = false;
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
	created() {
		if (this.isNew) {
			this.form.czlx = '0'; // 添加
			this.rulesLogin.yhzh = [{ validator: validator('48, "username", "用户账号", false') }];
		} else {
			this.form.czlx = '1'; // 编辑
			this.rulesLogin.yhzh = [];
			this.getData();
		}
	}
};
</script>

<style></style>
