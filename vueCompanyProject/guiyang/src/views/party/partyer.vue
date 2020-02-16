<docs>
	## 人事代理党委---党员信息
	* @date ###### Fri Aug 4 10:19:49 CST 2017
	* @author jinglf000
	* @desc 党员信息查询、导出、发送短信、编辑党员详情、添加党员登记信息
</docs>
<template>
	<div >
		<!--查询表单 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="转入日期">
							<date-ass :begin.sync="form.zrsjks" :end.sync="form.zrsjjs"
							propBegin="zrsjks" propEnd="zrsjjs" ></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="转出日期">
							<date-ass :begin.sync="form.zcsjks" :end.sync="form.zcsjjs"
							propBegin="zcsjks" propEnd="zcsjjs" ></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="真实姓名" prop="zsxm">
							<el-input v-model="form.zsxm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证号" prop="sfzh">
							<el-input v-model="form.sfzh"
								@blur="form.sfzh = form.sfzh.toUpperCase()"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户状态" prop="yhzt">
							<select-code v-model="form.yhzt" code="gyrlzyw_dw_d_yhzt"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="流程状态" prop="lczt">
							<select-code v-model="form.lczt" code="gyrlzyw_dw_d_lczt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属总支" prop="sszz">
							<party-org v-model="form.sszz"></party-org>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="所属支部" prop="sszb">
							<party-org v-model="form.sszb" type="middle" :depend="form.sszz"></party-org>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="18" class="btns_right">
						<el-button type="primary" size="small" class="btn_square"
							@click="dfjlCheck" :loading="loading">党费记录查询</el-button>
						<el-button type="primary" size="small" class="btn_square" icon="my-list"
							@click="btnRadix" :loading="loading">党费缴纳基数</el-button>
						<el-button
							v-show="btns.dytj"
							type="primary" size="small" class="btn_square" icon="plus"
							@click="add" :loading="loading">添加</el-button>
						<el-button
							v-show="btns.dyqfdx"
							:disabled="!+pageTotal"
							type="warning" size="small" class="btn_square" icon="message"
							@click="mailAll" :loading="loading">群发短信</el-button>
						<el-button
							v-show="btns.dydc"
							:disabled="!+pageTotal"
							type="primary" icon="btn-download" size="small"
							class="btn_square" :loading="loading"
							@click="exportDoc">导出</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询表单 结束  -->
		<!--查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="真实姓名" prop="zsxm"></el-table-column>
					<el-table-column label="身份证号码" prop="sfzh" width="120"></el-table-column>
					<el-table-column label="手机号" prop="sjh" width="130"></el-table-column>
					<el-table-column label="所属总支" prop="sszzmc"></el-table-column>
					<el-table-column label="所属支部" prop="sszbmc"></el-table-column>
					<el-table-column label="职位" prop="ssgw"></el-table-column>
					<el-table-column label="用户状态" prop="yhztmc"></el-table-column>
					<el-table-column label="流程状态" prop="lcztmc"></el-table-column>
					<el-table-column label="转入日期" prop="zrsj" width="110"></el-table-column>
					<el-table-column label="转出日期" prop="zcsj" width="110"></el-table-column>
					<el-table-column label="QQ" prop="qq"></el-table-column>
					<el-table-column label="党费缴纳截止日期" prop="dfjnjzrq" width="110"></el-table-column>
					<el-table-column label="思想汇报篇数" prop="sxhbps"></el-table-column>
					<el-table-column label="操作" fixed="right" width="180">
						<template scope="scope">
							<el-button size="mini" title="缴费" type="primary" class="icon-expect_work iconfont pay"
								@click="payment(scope.row)"></el-button>
							<el-button size="mini" title="编辑" type="primary" icon="edit"
								@click="edit(scope.row)"></el-button>
							<el-button
								:disabled="btns.dyfsdx === false"
								size="mini" title="发送短信" type="warning" icon="message"
								@click="listBtnsMail(scope.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0"  >
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="pageTotal"
							@current-change="getData"
							:current-page.sync="formRight.pageNum">
						</el-pagination>
				</div>
			</div>
		</div>
		<!--查询结果 结束  -->
		<!--添加党员对话框 开始  -->
		<el-dialog title="添加党员信息" :visible.sync="dialogAdd" size="tiny"
			@close="resetFn('formAdd', 'dialogAdd')">
			<el-form :model="formAdd" :rules="rulesAdd" :label-width="labelWidth"
				ref="formAdd">
				<el-form-item label="真实姓名" required prop="zsxm">
					<el-input v-model="formAdd.zsxm"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" required prop="sfzh">
					<el-input v-model="formAdd.sfzh"
						@blur="formAdd.sfzh = formAdd.sfzh.toUpperCase()"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="xb" class="is-required">
					<el-select v-model="formAdd.xb" disabled>
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否生效" required prop="sfsx">
					<el-switch v-model="formAdd.sfsx" :on-color="color.on" :off-color="color.off"
					on-value="1" off-value="0" on-text="是" off-text="否" :disabled="loadingAdd"></el-switch>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formAdd', 'dialogAdd')">取消</el-button>
				<el-button type="primary" @click="dialogAddSubmit('formAdd')">确定</el-button>
			</div>
		</el-dialog>
		<!--添加党员对话框 结束  -->
		<!--发送短信对话框 开始  -->
		<el-dialog :title="formMail.title" :visible.sync="dialogMail" size="tiny"
			@close="resetFn('formMail', 'dialogMail')">
			<el-form :model="formMail" :rules="rulesMail" :label-width="labelWidth" ref="formMail">
				<el-form-item label="发送人数" prop="length" v-show="formMail.isAll">
					<el-input :value="pageTotal" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="短信内容" prop="fsnr" required>
						<el-input v-model="formMail.fsnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
					<el-button @click="resetFn('formMail', 'dialogMail')">取消</el-button>
					<el-button type="primary"  @click="dialogMailSubmit('formMail')">确定</el-button>
			</div>
		</el-dialog>
		<!--发送短信对话框 结束  -->
				<!-- 缴费基数列表 dialog 开始 -->
		<el-dialog :visible.sync="dialogRadix" title="党费缴纳基数列表查询"
			@close="resetFn('formExpire', 'dialogExpire')">
			<!--查询 开始 -->
			<el-row>
				<el-col>
					<div class="add_btn">
						<el-button class="btn_square" size="small" type="primary"
						icon="plus" title="党费缴纳基数新增" :loading="loadingExpire"
						@click="addSite('formExpire')"></el-button>
					</div>
				</el-col>
			</el-row>
			<!--查询 结束 -->
			<!-- 结果 开始 -->
			<div class="loading" v-loading="loadingExpire">
				<el-table :data="resultsExpire" stripe class="table_wrap">
					<el-table-column label="党费基数年份" prop="dfjsnf" min-width="180"></el-table-column>
					<el-table-column label="党费缴纳基数" prop="dfjnjs"></el-table-column>
					<el-table-column label="操作" width="140">
						<template scope="operate">
							<el-button title="编辑" type="primary" size="mini" icon="edit"
										@click.stop="editExpire(operate.row)"></el-button>
							<!--<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delExpire(operate.row,operate.$index)"></el-button>-->
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsExpire.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="formExpireTotal"
						:current-page.sync="formExpire.pageNum"
						@current-change="getDataExpire"></el-pagination>
				</div>
			</div>
			<!-- 结果 结束 -->
		</el-dialog>
		<!-- 缴费基数列表 dialog 结束 -->
		<!-- 缴费基数添加 dialog 开始 -->
		<el-dialog title="添加党员信息" :visible.sync="dialogDues" size="tiny"
			@close="resetFn('formPotency', 'dialogDues')">
			<el-form :model="formPotency" :rules="rulesExpire" label-width="120px"
				ref="formPotency">
				<el-form-item  label="党费基数年份" class="is-required">
					<el-date-picker v-model="timeRange"
					:editable="false" type="year" placeholder="选择年" class="width_100" @change="changeTimeRange">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="dfjnjs" label="党费缴纳基数" class="is-required">
					<el-input v-model="formPotency.dfjnjs"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formPotency', 'dialogDues')">取消</el-button>
				<el-button type="primary" @click="savePotency('formPotency')">确定</el-button>
			</div>
		</el-dialog>
	<!-- 缴费基数添加 dialog 结束 -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import { getBtnsRight } from '@/common/js/utils';
import partyOrg from '@/common/vue/partyOrg';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import { cardExchangeIsValid } from '@/common/js/checkCard';

export default {
	name: 'partyer',
	components: { dateAss, partyOrg, selectCode },
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
			loading: false,
			loadingExpire: false,
			dialogDues: false,
			// 双向绑定数据
			form: {
				zrsjks: '',
				zrsjjs: '',
				zcsjks: '',
				zcsjjs: '',
				zsxm: '',
				sfzh: '',
				sjh: '',
				yhzt: '',
				lczt: '',
				sszz: '',
				sszb: '',
				pageNum: 1
			},
			// 克隆表单（提交使用）
			formRight: {},
			// 党费缴纳基数添加
			formPotency: {
				dfjsnf: '',
				dfjnjs: '',
				czlx: '',
				dfjnjs_id: ''
			},
			timeRange: '',
			// 党费缴纳基数查询
			formExpire: {
				pageNum: 1
			},
			// 校验规则
			rulesExpire: {
				dfjsnf: [{ validator: validator('4, "number", "党费基数年份", false', this.checkJfCode), trigger: 'blur' }],
				dfjnjs: [{ validator: validator('10, "number", "党费缴纳基数", false') }]
			},
			rules: {
				zsxm: [{ validator: validator('64, "full", "真实姓名", true') }],
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }]
			},
			// 结果
			results: [],
			resultsExpire: [],
			// 总数
			pageTotal: 0,
			formExpireTotal: 0,
			// ====================> 添加
			loadingAdd: false,
			dialogRadix: false,
			dialogAdd: false,
			formAdd: {
				zsxm: '',
				sfzh: '',
				xb: '',
				sfsx: '1',
				czlx: '0'
			},
			rulesAdd: {
				zsxm: [{ validator: validator('64, "full", "真实姓名", false') }],
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", false') }]
			},
			// ====================> 发送短信
			dialogMail: false,
			formMail: {
				title: '',
				sjhm: [],
				fsnr: '',
				isAll: false,
				length: ''
			},
			rulesMail: {
				fsnr: [{ validator: validator('256, "bz ", "发送内容", false') }]
			}
		};
	},
	watch: {
		// 查询的表单 身份证号15位自动转18位
		/* eslint-disable func-names */
		'form.sfzh': function (val) {
			if (val.length === 15) {
				this.form.sfzh = cardExchangeIsValid(val);
			}
		},
		// 添加的表单 身份证号15位自动转18位，以及获取性别
		'formAdd.sfzh': function (val) {
			if (val.length === 15) {
				this.formAdd.sfzh = cardExchangeIsValid(val);
			} else if (val.length === 18) {
				const flag = val.charAt(val.length - 2) % 2 === 0;
				this.formAdd.xb = flag ? '2' : '1';
			}
		}
	},
	computed: {
		sszz() {
			return this.form.sszz;
		}
	},
	methods: {
		// 缴费基数年份
		changeTimeRange(val) {
			if (val) {
				this.formPotency.dfjsnf = val;
			}
		},
		// 弹窗关闭重置
		resetFn(formName, showLevel) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this[showLevel] = false;
		},
		upperIdCard(val) {
			this.form.sfzh = val.toUpperCase();
		},
		// 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/rsdldw/rsdldw/dyxxdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		showParty(a, b) {
			return a + (b === '' ? '' : `(${b})`);
		},
		// ====================> 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/dyxxCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dyxxs;
				this.pageTotal = +res.rowsCount || 0;
			}).catch(() => {
				this.loading = false;
			});
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
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// ====================> 添加党员信息
		// 按钮
		add() {
			this.dialogAdd = true;
			if (this.$refs.formAdd) {
				this.$refs.formAdd.resetFields();
			}
		},
		// 提交接口
		postDataAdd(formName) {
			this.loadingAdd = true;
			$.post('/gyrcht/rsdldw/rsdldw/dyxxtjBc', this.formAdd).then((res) => {
				this.loadingAdd = false;
				this.$refs[formName].resetFields();
				if (res.returnData.executeResult === '1') {
					this.$message.success('党员信息添加成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {
				this.loadingAdd = false;
			});
		},
		// 提交
		dialogAddSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postDataAdd(formName);
					this.dialogAdd = false;
				}
			});
		},
		/*
		 * 发送短信业务块，包含单个发送短信、群发短信、各自的接口、
		 * 对话框cancel、submit处理
		 */
		// 群发短信 按钮handle
		mailAll() {
			this.formMail.isAll = true;
			this.dialogMail = true;
			this.formMail.title = '群发短信';
		},
		// 单个发送短信 按钮handle
		listBtnsMail(row) {
			this.dialogMail = true;
			this.formMail.title = '发送短信';
			this.formMail.isAll = false;
			this.formMail.sjhm = [row.sjh];
		},
		// 发送短信 接口
		postDataMail() {
			const data = this.formMail;
			$.post('/gyrcht/rsdldw/rsdldw/fsdxBc', {
				sjhm: data.sjhm,
				fsnr: data.fsnr
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => { });
		},
		// 群发短信 接口
		postDataMailAll() {
			const data = this.formRight;
			data.fsnr = this.formMail.fsnr;
			$.post('/gyrcht/rsdldw/rsdldw/qfdxBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信群发成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => { });
		},
		dialogMailSubmit(formName) {
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
						// this.resetFn(formName, 'dialogMail');
					});
				}
			});
		},
		// ====================> 编辑
		edit(row) {
			this.$router.push({
				name: 'partyPartyerDetail',
				params: {
					dyyh_id: row.dyyh_id,
					dyxq_id: row.dyxq_id,
					hasMM: row.mm,
					lczt: row.lczt,
					loginSave: this.btns.dydjbc,
					editSave: this.btns.dyxxbc
				}
			});
		},
		handleDel(row) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				$.delete('/gyrcht/rsdldw/rsdldw/dyxxSc', {
					params: {
						dyyh_id: row.dyyh_id
					}
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.getData();
					} else {
						this.$message.warning(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// =======================> 到期列表查询
		// 到期列表 按钮
		btnRadix() {
			this.dialogRadix = true;
			this.getDataExpire();
		},
		// 查询按钮handle
		submitFormExpire(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.formExpire.pageNum = 1;
					this.getDataExpire();
				}
			});
		},
		// 查询到期列表 接口
		getDataExpire() {
			this.loadingExpire = true;
			$.get('/gyrcht/rsdldw/rsdldw/dydfjnjsCx', {
				params: this.formExpire
			}).then((res) => {
				this.loadingExpire = false;
				this.resultsExpire = res.returnData.dfjnjss;
				this.formExpireTotal = +res.rowsCount;
			}).catch(() => {
				this.loadingExpire = false;
			});
		},
		// 添加党费缴纳基数 按钮
		addSite() {
			this.dialogDues = true;
			this.formPotency.czlx = '0';
			this.timeRange = '';
			this.formPotency.dfjnjs_id = '';
		},
		// 党费记录查询
		dfjlCheck(row) {
			this.$router.push({
				name: 'partyPayment',
				query: {
					id: row.dyyh_id,
					ksmc: row.zsxm,
					flag: 'all'
				}
			});
		},
		// 党员缴费
		payment(row) {
			this.$router.push({
				name: 'partyPayment',
				query: {
					id: row.dyyh_id,
					ksmc: row.zsxm,
					flag: 'single'
				}
			});
		},
		// 保存确认 按钮
		savePotency(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.timeRange) {
						// 单位编号唯一性
						const data = {
							dfjnjs_id: this.formPotency.dfjnjs_id,
							czlx: this.formPotency.czlx,
							dfjsnf: this.formPotency.dfjsnf
						};
						$.get('/gyrcht/rsdldw/rsdldw/dydfjnjsnfjyCx', {
							params: data
						}).then((res) => {
							if (res.returnData.executeResult === '0') {
								this.$message.warning(res.returnData.message);
							} else {
								this.addPotency();
							}
						}).catch(() => { });
					} else {
						this.$message.warning('请选择党费基数年份！');
					}
				}
			});
		},
		// 党费缴纳基数保存 接口
		addPotency() {
			$.post('/gyrcht/rsdldw/rsdldw/dydfjnjsBc', this.formPotency)
			.then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功');
					this.getDataExpire();
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.dialogDues = false;
			}).catch(() => {
				this.dialogDues = false;
			});
		},
		// 编辑党费缴纳基数 按钮
		editExpire(row) {
			this.dialogDues = true;
			setTimeout(() => {
				Object.keys(this.formPotency).forEach((item) => {
					this.formPotency[item] = row[item];
					this.formPotency.czlx = '1';
					this.timeRange = row.dfjsnf;
					this.formPotency.dfjnjs_id = row.dfjnjs_id;
				});
			}, 1);
		}
		// // 删除党费缴纳基数 按钮
		// delExpire(row, i) {
		// 	this.$confirm('确定要删除该单位么？', '提示', {
		// 		type: 'warning'
		// 	}).then(() => {
		// 		$.post('/gyrcht/rsdldw/rsdldw/dydfjnjsSc', {
		// 			dfjnjs_id: row.dfjnjs_id
		// 		}).then((res) => {
		// 			if (res.returnData.executeResult === '1') {
		// 				this.$message.success('删除成功！');
		// 				this.resultsExpire.splice(i, 1);
		// 			} else {
		// 				this.$message.error(res.returnData.message);
		// 			}
		// 		}).catch(() => {});
		// 	}).catch(() => {});
		// }
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
	.add_btn{
		padding: 10px 0;
		float: right;
	}
	.pay{
		font-size: 14px;
		padding:3px;
	}
</style>
