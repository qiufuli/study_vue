<docs>
	## 客户管理---单位客户管理，查询入口
	## @author jinglf000
	## @date ###### Thu Jul 27 10:05:21 CST 2017
	## 功能内容
		* 导出，发送短信，群发短信，生失效，是否自动审批，修改密码，查询编辑
</docs>

<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="queryForm" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="账号" prop="yhzh">
							<el-input v-model="form.yhzh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="经办人" prop="jbr">
							<el-input v-model="form.jbr"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="有效状态" prop="yxzt">
							<select-code v-model="form.yxzt" code="gyrlzyw_qzzp_d_yxzt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="自动审批职位" prop="sfzdspzw" class="mulitfix">
							<el-select v-model="form.sfzdspzw">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="注册日期">
							<date-ass :begin.sync="form.zcrqks" :end.sync="form.zcrqjs"
								propBegin="zcrqks" propEnd="zcrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="统一社会信用代码" prop="gsyyzzh" class="mulitfix">
							<el-input v-model="form.gsyyzzh"></el-input>
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
							<el-button v-show="btns.dwkhdc" :disabled="!+pageTotal"
								type="primary" icon="btn-download" size="small" class="btn_square"
								@click="exportDoc" :loading="loading">导出</el-button>
							<el-button v-show="btns.dwqfdx" :disabled="!+pageTotal"
								icon="message" type="warning" size="small" class="btn_square"
								@click="sendMailAll()" :loading="loading">群发短信</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table ref="queryResult" :data="results" class="table_wrap width_100" stripe
					@cell-click="checkDetail">
					<el-table-column label="单位名称" prop="dwmc" min-width="180"
						class-name="color_anchor cur_pointer">
						<template scope="comdata">
							<span v-if="comdata.row.dwmc !== ''">{{comdata.row.dwmc}}</span>
							<span v-else class="no_profect">{{ `请完善信息` }}</span>
						</template>
					</el-table-column>
					<el-table-column label="账号" prop="yhzh" min-width="110"></el-table-column>
					<el-table-column label="经办人" prop="jbr"></el-table-column>
					<el-table-column label="注册日期" prop="zcrq" min-width="110"></el-table-column>
					<el-table-column label="手机号" prop="sjh" min-width="130"></el-table-column>
					<el-table-column label="单位类型" prop="dwxzmc"></el-table-column>
					<el-table-column label="审批次数" prop="spcs"></el-table-column>
					<el-table-column label="有效状态" prop="yxzt" min-width="90">
						<template scope="state1">
							<el-switch v-model="state1.row.yxzt"
								on-value="01" on-text="生效" :on-color="color.on"
								off-value="02" off-text="失效" :off-color="color.off"
								:disabled="btns.dwyxzt === false || state1.row.switchState"
								@change="switchState(state1.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="自动审批职位" prop="sfzdspzw" min-width="90">
						<template scope="state2">
							<el-switch v-model="state2.row.sfzdspzw"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"
								:disabled="btns.dwspzw === false || state2.row.switchJob || state2.row.dwxx_id === ''"
								@change="switchJob(state2.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column
						label="操作" width="130" fixed="right">
						<template scope="scopeRowDo">
							<el-button :disabled="btns.dwxgmm === false"
								title="修改密码" type="warning" size="mini" icon="btn-password"
								@click="changePw(scopeRowDo.row)"></el-button>
							<el-button :disabled="btns.dwfsdx === false"
								title="发送短信" type="warning" size="mini" icon="message"
								@click="sendMail(scopeRowDo.row)"></el-button>
							<el-button :disabled="btns.dwxgmm === false || !scopeRowDo.row.sjh"
								title="解绑手机号" type="danger" size="mini" class="icon-jiebang iconfont"
								@click="outPhoneNum(scopeRowDo.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:current-page.sync="formRight.pageNum"
					@current-change="getData"></el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- 修改密码 start -->
		<el-dialog title="修改密码" :visible.sync="dialogPassword" size="tiny"
			@close="resetFn('formPassword', 'dialogPassword')">
			<el-form :model="formPassword" ref="formPassword" :label-width="labelWidth" :rules="rulesPassword">
				<el-form-item label="账号" prop="yhzh">
					<el-input v-model="formPassword.yhzh" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="密码" required prop="yhmm">
					<el-input v-model="formPassword.yhmm" placeholder="英文和数字的组合，最少为六位"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formPassword', 'dialogPassword')">取消</el-button>
				<el-button type="primary" @click="savePassword('formPassword')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改密码 end -->
		<!-- 发送短信 start -->
		<el-dialog :title="formMail.title" :visible.sync="dialogMail" size="tiny"
			@close="resetFn('formMail', 'dialogMail')">
			<el-form :model="formMail" ref="formMail" :label-width="labelWidth" :rules="rulesMail">
				<el-form-item label="人数" v-show="formMail.isAll">
					<el-input :value="pageTotal" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="短信内容" prop="fsnr" required>
					<el-input v-model="formMail.fsnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="resetFn('formMail', 'dialogMail')">取消</el-button>
				<el-button type="primary" @click="saveMail('formMail')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 发送短信 end -->
		<!-- 失效原因 start -->
		<el-dialog :visible.sync="dialogFalse" size="tiny"
			:show-close="false"
			:close-on-press-escape="false"
			:close-on-click-modal="false">
			<el-form :model="formFalse" ref="formFalse" :label-width="labelWidth" :rules="rulesFalse">
				<el-form-item label="失效原因" prop="sxyy">
					<el-input v-model="formFalse.sxyy" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button type="primary" @click="saveFlase('formFalse')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 失效原因 end -->
	</div>
</template>
<script>

import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'cusCompany',
	components: { dateAss, selectCode },
	data() {
		return {
			// 按钮权限
			btns: {},
			// 全局统一变量
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				dwmc: '',
				yhzh: '',
				sjh: '',
				jbr: '',
				yxzt: '',
				sfzdspzw: '',
				zcrqks: '',
				zcrqjs: '',
				gsyyzzh: '',
				pageName: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				dwmc: [{ validator: validator('128, "less", "单位名称", true') }],
				yhzh: [{ validator: validator('48, "full", "账号", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }],
				jbr: [{ validator: validator('64, "full", "经办人", true') }],
				gsyyzzh: [{ validator: validator('18, "zzjgdm", "统一社会信用代码", true') }]
			},
			// 查询结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 修改密码
			dialogPassword: false,
			formPassword: {
				yh_id: '',
				yhzh: '',
				yhmm: ''
			},
			rulesPassword: {
				yhmm: [{ validator: validator('48, "password", "用户密码", false') }]
			},
			// ====================> 短信
			dialogMail: false,
			formMail: {
				title: '',
				yhlb: [],
				fsnr: '',
				isAll: false
			},
			rulesMail: {
				fsnr: [{ validator: validator('256, "bz", "发送内容", false') }]
			},
			// ====================> 失效原因
			dialogFalse: false,
			switchRow: '',
			formFalse: {
				dwxx_id: '',
				yxzt: '',
				sxyy: ''
			},
			rulesFalse: {
				sxyy: [{ validator: validator('256, "less ", "失效原因", true') }]
			}
		};
	},
	methods: {
		// 弹出框重置
		resetFn(formName, showLevel) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this[showLevel] = false;
		},
		// ====================> 查询
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
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 接口（get）
		getData() {
			this.loading = true;
			$.get('/gyrcht/khgl/dwkh/dwkhxxCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.dwkhlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 查看详情
		checkDetail(row, column) {
			if (column.property === 'dwmc') {
				this.$router.push({
					name: 'cusCompanyDetail',
					params: {
						dwxxId: row.dwxx_id,
						yhid: row.yh_id,
						btns: this.btns
					}
				});
			}
		},
		// ====================> 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.form).forEach((item) => {
				urlQuery.push(`${item}=${this.form[item]}`);
			});
			const url = `/gyrcht/khgl/dwkh/dwkhdcCx?${urlQuery.join('&')}`;
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
			const data = {
				yh_id: this.formPassword.yh_id,
				yhmm: this.formPassword.yhmm
			};
			$.put('/gyrcht/khgl/dwkh/mmXg', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('密码修改成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 确定修改
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
		// ====================> 解绑手机号
		outPhoneNum(row) {
			this.$confirm('此操作将会解绑手机号，是否继续？', '确认', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.beSureOut(row);
				this.getData();
			}).catch(() => {});
			// this.beSureOut(row);
		},
		// 确定解绑
		beSureOut(row) {
			$.put('/gyrcht/khgl/dwkh/dwsjhSave', { dwxx_id: row.dwxx_id }).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('解绑成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// ====================> 发送短信：isAll 是否群发，title 标题，yh_idlb 单发时数据
		// 单发按钮
		sendMail(row) {
			setTimeout(() => {
				this.formMail.title = '发送短信';
				this.formMail.isAll = false;
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
			const data = {
				yh_idlb: this.formMail.yh_idlb,
				fsnr: this.formMail.fsnr
			};
			$.post('/gyrcht/khgl/dwkh/fsdxBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 群发接口（post）
		postDataMailAll() {
			const data = this.formRight;
			data.fsnr = this.formMail.fsnr;
			$.post('/gyrcht/khgl/dwkh/qsdxBc', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('短信群发成功');
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
		},
		// 确定发送
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
					}).catch(() => {});
				}
			});
		},
		// ====================> 是否生效
		// 开关
		switchState(row) {
			this.switchRow = row;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				this.formFalse.dwxx_id = row.dwxx_id;
				this.formFalse.yxzt = row.yxzt;
				if (row.yxzt === '02') {
					this.dialogFalse = true;
				} else {
					this.formFalse.sxyy = '';
					this.putState(row);
				}
			});
		},
		// 确定失效
		saveFlase(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putState(this.switchRow);
					setTimeout(() => {
						this.dialogFalse = false;
					}, 5);
				}
			});
		},
		// 接口（put）
		putState(row) {
			$.put('/gyrcht/khgl/dwkh/sxspXg', this.formFalse).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '状态变更成功',
						showClose: true,
						onClose: () => {
							row.switchState = false;
						}
					});
				} else {
					this.$message.error(res.returnData.message);
					row.switchState = false;
				}
			}).catch(() => {
				row.switchState = false;
			});
		},
		// ====================> 是否自动审批
		switchJob(row) {
			this.$nextTick(() => {
				if (row.switchJob === undefined) {
					this.$set(row, 'switchJob', true);
				}
				row.switchJob = true;
				$.put('/gyrcht/khgl/dwkh/zdspzwXg', {
					dwxx_id: row.dwxx_id,
					sfzdspzw: row.sfzdspzw
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.switchJob = false;
							}
						});
					}
				}).catch(() => {
					row.switchJob = false;
				});
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
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

<style scoped>
.no_profect{
	color:#ff791f;
}
</style>
