<docs>
	## 客户管理---个人客户管理，查询入口
	* @author jinglf000
	* @date ###### Mon Jul 24 09:32:43 CST 2017
  * @desc 个人客户管理，查询入口
	## 优化
		* 通过判断，确定群发短信之前查询条件有没有发生改变，没发生改变，不查询接口---缺点：逻辑复杂一些
</docs>

<template>
	<div >
		<!-- 查询条件开始 -->
		<div class="query_wrap">
			<el-form :model="form" ref="queryForm" :label-width="labelWidth" :rules="rules">
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名" prop="yhxm">
							<el-input v-model="form.yhxm" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="账号" prop="yhzh">
							<el-input v-model="form.yhzh" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input v-model="form.sjh" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮箱" prop="yx">
							<el-input v-model="form.yx" ></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="注册日期">
							<date-ass :begin.sync="form.zcrqks" :end.sync="form.zcrqjs"
							propBegin="zcrqks" propEnd="zcrqjs" ></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证号" prop="sfzhm">
							<el-input v-model="form.sfzhm"
								@blur="form.sfzhm = form.sfzhm.toUpperCase()"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="btns_right">
						<el-form-item>
							<el-button v-show="btns.grkhdc" :disabled="!+pageTotal"
								type="primary" icon="btn-download" size="small" class="btn_square"
								@click="exportDoc()" :loading="loading">导出</el-button>
							<el-button v-show="btns.grqfdx" :disabled="!+pageTotal"
								icon="message" type="warning" size="small" class="btn_square"
								@click="sendMailAll()" :loading="loading">群发短信</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件结束 -->
		<!-- 查询结果开始 -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table ref="queryResult" :data="results" class="table_wrap width_100">
					<el-table-column label="姓名" prop="yhxm"></el-table-column>
					<el-table-column label="账号" prop="yhzh" min-width="130"></el-table-column>
					<el-table-column label="手机号" prop="sjh" min-width="130"></el-table-column>
					<el-table-column label="邮箱" prop="yx" min-width="180"></el-table-column>
					<el-table-column label="身份证号" prop="sfzhm" min-width="180">
						<template scope="idCard">{{ idCard.row.sfzhm.toUpperCase() }}</template>
					</el-table-column>
					<el-table-column label="注册日期" prop="zcrq" min-width="110"></el-table-column>
					<el-table-column label="操作" fixed="right" width="130">
						<template scope="operate">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(operate.row)"></el-button>
							<el-button
								:disabled="btns.grxgmm === false"
								title="修改密码" type="warning" size="mini" icon="btn-password"
								@click="changePw(operate.row)"></el-button>
							<el-button
								:disabled="btns.grfsdx === false"
								title="发送短信" type="warning" size="mini" icon="message"
								@click="sendMail(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:current-page.sync="formRight.pageNum"
					@current-change="getData"></el-pagination>
			</div>
		</div>
		<!-- 查询结果结束 -->
		<!-- 修改密码 start-->
		<el-dialog title="修改密码" :visible.sync="dialogPassword" size="tiny"
			@close="resetFn('formChangePassword', 'dialogPassword')">
			<el-form :model="formPassword" :label-width="labelWidth"
				ref="formChangePassword" :rules="rulesPassword">
				<el-form-item label="账号" prop="yhzh">
					<el-input v-model="formPassword.yhzh" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="密码" required prop="yhmm">
					<el-input v-model="formPassword.yhmm" placeholder="英文和数字的组合，最少为六位" ></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formChangePassword', 'dialogPassword')">取消</el-button>
				<el-button type="primary" @click="savePassword('formChangePassword')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改密码 end-->
		<!-- 发送短信 start-->
		<el-dialog :title="formMail.title" :visible.sync="dialogMail" size="tiny"
			@close="resetFn('formMail', 'dialogMail')">
			<el-form :model="formMail" :label-width="labelWidth" ref="formMail" :rules="rulesMail">
				<el-form-item label="发送人数" v-show="formMail.isAll">
					<el-input :value="pageTotal" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="短信内容" required prop="fsnr">
					<el-input v-model="formMail.fsnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formMail', 'dialogMail')">取消</el-button>
				<el-button type="primary" @click="saveMail('formMail')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 发送短信 end-->
	</div>
</template>
<script>

import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';
import { cardExchangeIsValid } from '@/common/js/checkCard';

export default {
	name: 'cusPersonal',
	components: { dateAss },
	data() {
		return {
			// 按钮权限
			btns: {},
			// 全局统一变量
			labelWidth,
			// ====================> 查询
			loading: false,
			// 双向绑定数据
			form: {
				yhxm: '',
				yhzh: '',
				sjh: '',
				yx: '',
				zcrqks: '',
				zcrqjs: '',
				sfzhm: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				yhxm: [{ validator: validator('64, "full", "姓名", true') }],
				yhzh: [{ validator: validator('48, "username", "账号", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }],
				yx: [{ validator: validator('48, "email", "邮箱", true') }],
				sfzhm: [{ validator: validator('18, "sfzhm", "身份证号", true') }]
			},
			// 查询结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 修改密码部分
			// 弹窗状态
			dialogPassword: false,
			// 双向表单
			formPassword: {
				yhzh: '',
				yh_id: '',
				yhmm: ''
			},
			// 校验规则
			rulesPassword: {
				yhmm: [{ validator: validator('48, "password", "用户密码", false') }]
			},
			// ====================> 发送短信部分
			// 弹窗状态
			dialogMail: false,
			// 双向表单
			formMail: {
				yh_idlb: [],
				fsnr: '',
				length: '',
				isAll: false,
				title: ''
			},
			// 校验规则
			rulesMail: {
				fsnr: [{ validator: validator('256, "bz", "发送内容", false') }]
			}
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.sfzhm': function (val) {
			if (val.length === 15) {
				this.form.sfzhm = cardExchangeIsValid(val);
			}
		}
	},
	methods: {
		// ====================> 弹出框重置
		resetFn(formName, showLevel) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this[showLevel] = false;
		},
		// ====================> 查询
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 请求（get）
		getData() {
			this.loading = true;
			$.get('/gyrcht/khgl/grkh/grkhlbCx', {
				params: this.formRight
			}).then((req) => {
				this.loading = false;
				this.results = req.returnData.grkhlb;
				this.pageTotal = +req.rowsCount || 0;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 编辑：id（用户id）, canSave（是否可以保存）
		handleEdit(row) {
			this.$router.push({
				name: 'cusPersonalDetail',
				params: {
					id: row.yh_id,
					canSave: this.btns.grkhbc
				}
			});
		},
		// ====================> 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.form).forEach((item) => {
				urlQuery.push(`${item}=${this.form[item]}`);
			});
			const url = `/gyrcht/khgl/grkh/grkhlbdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		// ====================> 修改密码
		// 修改密码按钮
		changePw(row) {
			setTimeout(() => {
				this.formPassword.yhzh = row.yhzh;
				this.formPassword.yh_id = row.yh_id;
			}, 5);
			this.dialogPassword = true;
		},
		// 接口（put）
		putDataPassword() {
			const data = this.formPassword;
			/*eslint-disable */
			$.put('/gyrcht/khgl/grkh/mmXg', {
				yh_id: data.yh_id,
				yhmm: data.yhmm
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success(res.returnData.message);
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => { });
		},
		// 密码修改 dialog--确认按钮，先校验表单---弹出确认框
		savePassword(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('此操作将会修改客户密码，是否继续？', '确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.putDataPassword();
						this.resetFn(formName, 'dialogPassword');
					}).catch(() => {});
				}
			});
		},
		// ====================> 发送短信：isAll 是否群发，title 标题
		// 单发按钮
		sendMail(row) {
			setTimeout(() => {
				this.formMail.isAll = false;
				this.formMail.title = '发送短信';
				this.formMail.yh_idlb = [{ yh_id: row.yh_id, sjh: row.sjh }];
			}, 5);
			this.dialogMail = true;
		},
		// 群发按钮
		sendMailAll() {
			setTimeout(() => {
				this.formMail.isAll = true;
				this.formMail.title = '群发短信';
			}, 5);
			this.dialogMail = true;
		},
		// 单发接口（post）
		postDataMail() {
			const data = this.formMail;
			$.post('/gyrcht/khgl/grkh/fsdxBc', {
				yh_idlb: data.yh_idlb,
				fsnr: data.fsnr
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {
			});
		},
		// 群发接口（post）
		postDataMailAll() {
			const data = this.formRight;
			data.fsnr = this.formMail.fsnr;
			$.post('/gyrcht/khgl/grkh/qfdxBc', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('短信群发成功');
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
		},
		// 确认按钮
		saveMail(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('确定发送短信？', '确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (this.formMail.isAll) {
							this.postDataMailAll();
						} else {
							this.postDataMail();
						}
						this.resetFn(formName, 'dialogMail');
					}).catch(() => {
						this.formMail.yh_idlb = [];
					});
				}
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 路由重载
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>

<style></style>
