<docs>
	## 业务办理---招聘会办理
	* @date ###### Thu Aug 24 10:43:30 CST 2017
	* @author jinglf000
	* @desc 业务办理，招聘会办理
	## 业务逻辑繁多 遗留问题
	* 现场招聘点数 充值 暂关闭， （v-if="false"）；待使用时删掉括号内内容即可；
</docs>
<template>
	<div>
		<!-- 职位查询 开始  -->
		<div class="detail_wrap">
			<el-form ref="queryForm" :label-width="labelWidth" :rules="rules" :model="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="dwmc">
							<el-autocomplete v-model="form.dwmc"
							:fetch-suggestions="suggestionCompany" :props="suggestionProp"
							class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="ID卡号" prop="idkh">
							<el-input v-model="form.idkh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="align_right" v-show="btns.zptjdw">
						<el-button type="primary" @click="addCompany" size="small"
						icon="plus" class="btn_square">添加单位</el-button>
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
					<el-col :span="12">
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 职位查询 结束  -->

		<!-- 企业信息 招聘会信息 开始 -->
		<div class="com_cruit">
			<el-row>
				<el-col :span="16" v-show="showCompany" class="company_info">
					<!-- 企业信息 开始-->
					<el-row  class="company_title">{{result.dwmc}}</el-row>
					<el-row>
						<span class="pad_right">现场招聘剩余<span class="warn_text">{{result.zphds}}</span>点</span>
						<span class="pad_right">简历剩余<span class="warn_text">{{result.jlds}}</span>点</span>
						<span class="pad_right">短信剩余条数<span class="warn_text">{{result.dxts}}</span>条</span>
					</el-row>
					<el-row>
						<el-col :span="12" class="align_left"><span class="label_text">年审日期：</span> {{result.nssj}}</el-col>
						<el-col :span="12" class="align_left"><span class="label_text">注册日期：</span> {{result.zcsj}}</el-col>
					</el-row>
					<!-- 企业信息 结束-->
					<!-- 操作按钮 开始 -->
					<el-row class="do_lists">
						<el-button class="no_radius"
							v-show="btns.zpdxcz || btns.zpdscz"
							type="warning" size="small" @click="btnCharge" :disabled="disabled.charge">充值</el-button>
						<el-button class="no_radius"
							v-show="btns.zpwtzp || btns.zpggyd"
							type="primary" size="small" @click="btnOrderAd">招聘办理</el-button>
						<el-button class="no_radius"
							v-show="btns.zpwszw || btns.zpxczw || btns.zpwtzw"
							type="primary" size="small" @click="btnJobList">职位查看</el-button>
						<el-button class="no_radius"
							v-show="btns.zpfsdx"
							type="primary" size="small" @click="btnSendMail">发送短信</el-button>
						<el-button class="no_radius"
							v-show="btns.zptzddy"
							type="primary" size="small" @click="btnAcess">入场通知单打印</el-button>
						<el-button class="no_radius"
							v-show="btns.zpddjl"
							type="primary" size="small" @click="btnOrderRecord">查看订单记录</el-button>
					</el-row>
					<!-- 操作按钮 结束 -->
				</el-col>
				<el-col :span="16"  v-show="!showCompany" class="color_grey">{{showCompanyText}}</el-col>
				<!-- 招聘会信息 开始 -->
				<el-col :span="8" v-loading="loadingList" v-show="showCompany">
					<el-row class="recruit_title">
						<el-col :span="16" class="">
							<span>招聘会信息</span>
						</el-col>
						<el-col :span="8" class="align_right">
							<span class="iconfont icon-refresh refresh" @click="refresh">刷新</span>
						</el-col>
					</el-row>
					<el-table :data="lists" stripe class="table_wrap" @cell-click="xianChangeBook">
						<el-table-column prop="zphrq" label="招聘日期"></el-table-column>
						<el-table-column prop="elsyzw" label="二楼（剩余展位）"
							class-name="color_anchor cur_pointer"></el-table-column>
					</el-table>
					<div class="pagination_wrap">
						<div class="pagination_wrap" v-show="lists.length > 0"  >
							<el-pagination
								layout="total,prev,pager,next,jumper"
								:total="pageTotal"
								@current-change="getDataList"
								:current-page.sync="formList.pageNum">
							</el-pagination>
					</div>
					</div>
				</el-col>
				<!-- 招聘会信息 结束 -->
			</el-row>
		</div>
		<!-- 企业信息 招聘会信息 结束 -->
		<!-- 弹出框 开始 -->
		<!-- 充值 开始 -->
		<el-dialog :visible.sync="dialogCharge"  size="tiny" class="dialogCharge">
			<!-- 短信充值 开始 -->
			<el-tabs v-model="chargeTab">
				<el-tab-pane label="短信充值" name="formMail" :disabled="btns.zpdxcz === false">
					<el-form :model="formMail" :rules="rulesMail" ref="formMail" :label-width="labelWidth">
						<el-form-item label="条数" prop="dxts" required>
							<el-input v-model="formMail.dxts"></el-input>
						</el-form-item>
						<p :style="{ 'paddingLeft': labelWidth , 'paddingBottom': '5px'}" >
								您将花费<span class="color_warn">{{costMail}}</span>元，1条={{price.mail}}元
						</p>
					</el-form>
				</el-tab-pane>
				<!-- 短信充值 结束 -->
				<!-- 点数充值 开始 -->
				<el-tab-pane label="点数充值" name="formPoint" :disabled="btns.zpdscz === false">
					<el-form :model="formPoint" ref="formPoint" :label-width="labelWidth"
					:rules="rulesPoint">
						<el-form-item label="充值类型" prop="czlx">
							<el-select v-model="formPoint.czlx" class="width_100">
								<el-option v-if="false" label="现场招聘点数" value="01"></el-option>
								<el-option label="简历点数" value="02"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="套餐" prop="tc_id" v-show="formPoint.czlx === '01'">
							<el-select v-model="formPoint.tc_id" class="width_100">
								<el-option v-for="(item , index) in price.pack" :key="index"
								:value="item.tc_id" :label="item.mc"></el-option>
								<el-option value="" label="其他"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="点数" prop="czds"
						ref="formPointCzds" :required="requiredCzds"
						v-show="formPoint.tc_id === '' || formPoint.czlx === '02'"
						>
							<el-input v-model="formPoint.czds"></el-input>
						</el-form-item>
						<p :style="{ paddingLeft: labelWidth, paddingBottom: '5px'}">
							剩余点数<span class="color_warn">{{formPoint.czlx === '01' ? result.zphds : result.jlds}}</span>，
							您将花费<span class="color_warn">{{chargePoint}}</span>元，
							<span v-show="formPoint.tc_id === '' || formPoint.czlx === '02'">
								1点{{formPoint.czlx === '01' ? price.recruit : price.resume}}元
							</span>
						</p>
					</el-form>
				</el-tab-pane>
				<!-- 点数充值 结束 -->
			</el-tabs>
			<div class="footer" slot="footer">
				<el-button @click="dialogChargeCancel(chargeTab)">取消</el-button>
				<el-button type="primary"
					:disabled="loadingCharge"
					@click="dialogChargeSubmit(chargeTab)">确定</el-button>
			</div>
		</el-dialog>
		<!-- 充值 结束 -->
		<!-- 发送短信 开始 -->
		<el-dialog :visible.sync="dialogSendMail" title="发送短信"  size="tiny"
		class="dialog" @close="dialogSendMailCancel('formSendMail')">
			<el-form :model="formSendMail" :rules="rulesSendMail" :label-width="labelWidth" ref="formSendMail">
				<el-form-item prop="jbrsjh" label="手机号" required>
					<el-input v-model="formSendMail.jbrsjh"></el-input>
				</el-form-item>
				<el-form-item prop="dxnr" label="短信内容" required>
					<el-input type="textarea" v-model="formSendMail.dxnr" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog_footer" slot="footer">
				<el-button @click="dialogSendMailCancel('formSendMail')">取消</el-button>
				<el-button type="primary"
					@click="dialogSendMailSubmit('formSendMail')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 发送短信 结束 -->
		<!-- 订单详情 开始-->
		<el-dialog :visible.sync="order.dialog" title="订单详情" size="big">
			<div v-loading="order.loading">
				<el-table :data="order.results" stripe class="table_wrap" >
					<el-table-column label="订单编号" prop="ddbh" min-width="110"></el-table-column>
					<el-table-column label="订单描述" prop="ddms" min-width="300"></el-table-column>
					<el-table-column label="办理时间" prop="ddsj" width="110"></el-table-column>
					<el-table-column label="订单类型" prop="ddlxmc"></el-table-column>
					<el-table-column label="订单渠道" prop="ddqdmc" width="110"></el-table-column>
					<el-table-column label="订单状态" prop="ddztmc"></el-table-column>
					<el-table-column label="支付方式" prop="zffsmc"></el-table-column>
					<el-table-column label="金额/点数" prop="zfje" min-width="90"></el-table-column>
					<el-table-column label="办理人" prop="cjr"></el-table-column>
					<el-table-column label="是否快递" prop="sfkd">
						<template scope="scope1">
							<span v-if="scope1.row.sfkd === '1'">是</span>
							<span v-else-if="scope1.row.sfkd === '0'">否</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="是否上传广告位" prop="sfscggw">
						<template scope="scope2">
							<span v-if="scope2.row.sfscggw === '1'">是</span>
							<span v-else-if="scope2.row.sfscggw === '0'">否</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="收银员" prop="xgr"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="order.results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="order.total"
						@current-change="getDataOrderRecord"
						:current-page.sync="order.form.pageNum"></el-pagination>
				</div>
			</div>
		</el-dialog>
		<!-- 订单详情 结束 -->
		<!-- 弹出框 結束 -->
		<!-- 入场通知单 打印 dialog 开始 -->
		<access-cert :visible.sync="dialogAcess" :companyId="companyId"></access-cert>
		<!-- 入场通知单 打印 dialog 结束 -->
		<orderAdWeituo :zpwtzp="btns.zpwtzp" :zpggyd="btns.zpggyd"
			:visible.sync="dialogAd" :companyId="companyId"></orderAdWeituo>
		<!-- 现场招聘展位预定 -->
		<exhibition :companyId="companyId" :zphId="zphId" :zphInfo="zphInfo"
			:visible.sync="dialogExh"></exhibition>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import orderAdWeituo from './components/orderAdWeituo';
import accessCert from './components/accessCert';
import exhibition from './components/exhibition';

function costCount(num, price) {
	let cost;
	if (isNaN(+num)) {
		cost = 'xxx';
	} else {
		cost = (+num) * price * 100;
		const reg = /^(\d*(.\d{1,2})?)/g;
		cost = Math.round(cost) / 100;
		cost = reg.exec(cost.toString())[0];
	}
	return cost;
}

export default {
	name: 'busReruit',
	components: { orderAdWeituo, accessCert, exhibition },
	data() {
		return {
			timeout: null,
			labelWidth,
			companyId: '',
			// 现场招聘打印
			zphId: '',
			zphInfo: null,
			dialogExh: false,
			yhid: '',
			loading: false,
			disabled: {
				charge: true
			},
			dialogAcess: false, // dialog 入场通知单 打印
			dialogAd: false, // dialog 招聘办理，（委托招聘办理和广告位办理）
			// ========================> 企业查询
			rules: {
				dwmc: [{ validator: validator('128, " less", "单位名称", true') }],
				idkh: [{ validator: validator('8, " full", " ID卡号", true') }]
			},
			form: {
				dwmc: '',
				idkh: ''
			},
			result: {
				dwmc: '',
				dwxx_id: '',
				zphds: '',
				jlds: '',
				dxts: '',
				nssj: '',
				zcsj: ''
			},
			suggestionProp: {
				value: 'dwmc',
				label: 'dwmc'
			},
			showCompany: false,
			showCompanyText: '请输入单位名称或ID卡号',
			// =====================> 现场招聘会列表
			lists: [],
			formList: {
				pageNum: 1
			},
			pageTotal: 0,
			loadingList: false,
			// =====================> 充值
			chargeTab: 'formMail',
			// 短信充值
			loadingCharge: false,
			dialogCharge: false,
			formMail: {
				dwxx_id: '',
				dxts: ''
			},
			rulesMail: {
				dxts: [{ validator: validator('8, "number", "短信条数", false') }]
			},
			// 点数充值
			price: {
				mail: 0.1,
				resume: 1,
				pack: [],
				recruit: 300
			},
			formPoint: {
				dwxx_id: '',
				tc_id: '',
				czlx: '02',
				czds: ''
			},
			rulesPoint: {
				czds: [{ validator: validator('8, "num", "充值点数", false') }]
			},
			rulesPointCzds: [{ validator: validator('8, "num", "充值点数", false') }],
			requiredCzds: true,
			// =============> 发送短信
			dialogSendMail: false,
			formSendMail: {
				dxnr: '',
				dwxx_id: '',
				jbrsjh: ''
			},
			rulesSendMail: {
				dxnr: [{ validator: validator('256, " bz", "短信内容", false') }],
				jbrsjh: [{ validator: validator('11, " sjh ", "手机号", false') }]
			},
			// ==============> 单位订单记录
			order: {
				dialog: false,
				form: {
					dwxx_id: '',
					pageNum: 1
				},
				results: [],
				total: 0,
				loading: false
			},
			// 按钮权限
			btns: {}
		};
	},
	watch: {
		// 监控czlx 的变化动态提供，校验规则和充值校验规则
		/* eslint-disable func-names */
		'formPoint.czlx': function (val) {
			if (val === '02' || (val === '01' && this.formPoint.tc_id === '')) {
				this.chargeNumRequire();
			} else {
				this.chargeNumNotRequire();
			}
		},
		// 监控套餐id的变化（tc_id） 的变化动态提供，校验规则和充值校验规则
		'formPoint.tc_id': function (val) {
			if (val === '' && this.formPoint.czlx === '01') {
				this.chargeNumRequire();
			} else {
				this.chargeNumNotRequire();
			}
		},
		// 权限管理，改变充值tab栏默认选项
		'btns.zpdxcz': function (val) {
			if (val) {
				this.chargeTab = 'formMail';
			} else {
				this.chargeTab = 'formPoint';
			}
		}
	},
	computed: {
		// 点数花费
		costMail() {
			const num = this.formMail.dxts;
			return costCount(num, this.price.mail);
		},
		// 点数充值内容提示
		chargePoint() {
			const form = this.formPoint;
			let cost;
			// 现场招聘点数
			if (form.czlx === '01') {
				if (form.tc_id === '') {
					cost = costCount(form.czds, this.price.recruit);
				} else {
					// 套餐金额
					const money = this.price.pack.find(item => item.tc_id === form.tc_id).je;
					cost = costCount(money, 0.01);
				}
			} else {
				cost = costCount(form.czds, this.price.resume);
			}
			return cost;
		}
	},
	methods: {
		// 充值点数需要校验
		chargeNumRequire() {
			this.requiredCzds = true;
			// this.formPoint.czds = '';
			this.rulesPoint.czds = this.rulesPointCzds;
			if (this.$refs.formPointCzds) {
				this.$refs.formPointCzds.resetField();
			}
		},
		// 充值点数不需要校验
		chargeNumNotRequire() {
			this.requiredCzds = false;
			this.rulesPoint.czds = [];
		},
		// =================> 企业业务操作入口
		// 获取企业详情 接口
		getData() {
			this.loading = true;
			if (this.form.dwmc !== '' || this.form.idkh !== '') {
				$.get('/gyrcht/ywgl/zpbl/dwxxCx', {
					params: this.form
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.result = res.returnData.dwxx;
						this.companyId = res.returnData.dwxx.dwxx_id;
						this.yhid = res.returnData.dwxx.yh_id;
						this.showCompany = true;
						this.getDataList();
						// 单位已失效
						if (this.result.dwyxbs !== '01') {
							this.showCompany = false;
							this.showCompanyText = '单位账户已经失效';
						} else if (this.result.nsyxbs !== '01') {
							this.showCompany = false;
							this.showCompanyText = '单位认证失败或年审已过期';
						}
					} else {
						this.showCompany = false;
						this.showCompanyText = '暂无企业信息';
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}
		},
		// 获取招聘会占位列表详情
		// 单位输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		suggestionCompany(query, cb) {
			// 先进行数据校验
			this.$refs.queryForm.validateField('dwmc', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ywgl/zpbl/dwmclxCx', {
							params: { dwmc: query }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.dwmclb);
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
		// 现场招聘剩余列表
		getDataList() {
			this.lodingList = true;
			$.get('/gyrcht/ywgl/zpbl/zwsylbCx', {
				params: this.formList
			}).then((res) => {
				this.lodingList = false;
				this.lists = res.returnData.zwsylb;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.lodingList = false;
			});
		},
		// 单位 查询表单,dwmc和idkh不能同时为空
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.form.dwmc === '' && this.form.idkh === '') {
						this.$message.warning('单位名称和ID卡号不能同时为空！');
					} else {
						this.getData();
					}
				}
			});
		},
		// 单位 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 刷新招聘会列表
		refresh() {
			this.formList.pageNum = 1;
			this.getDataList();
		},
		// 添加单位，不带id
		addCompany() {
			this.$router.push({ name: 'addCompany', params: { id: '', isNew: '1', yhid: '' } });
		},
		/* ======================> 发送短信相关 */
		// 点击 发送短信按钮
		btnSendMail() {
			this.dialogSendMail = true;
			this.formSendMail.dwxx_id = this.result.dwxx_id;
			this.formSendMail.jbrsjh = this.result.jbrsjh;
		},
		// 发送短信对话框，取消按钮
		dialogSendMailCancel(formName) {
			this.dialogSendMail = false;
			this.$refs[formName].resetFields();
		},
		// 发送短信对话框，确认按钮，直接发送不进行进一步确认
		dialogSendMailSubmit(formName) {
			// const thisUpper = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postDataSendMail();
					setTimeout(() => {
						this.dialogSendMailCancel(formName);
					}, 2);
				}
			});
		},
		// 短信发送接口
		postDataSendMail() {
			$.post('/gyrcht/ywgl/zpbl/fsdxBc', this.formSendMail).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功');
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// =====================> 订单详情
		// 点击按钮
		btnOrderRecord() {
			this.order.dialog = true;
			this.getDataOrderRecord();
			this.order.form.dwxx_id = this.companyId;
		},
		// 查询接口Y
		getDataOrderRecord() {
			this.order.loading = true;
			$.get('/gyrcht/ywgl/zpbl/ddjlCx', {
				params: this.order.form
			}).then((res) => {
				this.order.loading = false;
				this.order.results = res.returnData.ddjllb;
				this.order.total = +res.rowsCount;
			}).catch(() => {
				this.order.loading = false;
			});
		},
		// ==========================> 充值
		// 获取单价
		getDataPrice() {
			$.get('/gyrcht/ywgl/zpbl/tccsCx', {
				params: { tclx: '10' }
			}).then((res) => {
				const data = res.returnData;
				this.disabled.charge = false;
				if (data.executeResult === '1') {
					this.price = {
						mail: +data.dxjg,
						recruit: +data.zpdsdj,
						resume: +data.jldsdj,
						pack: data.tccslb
					};
				}
			}).catch(() => {});
		},
		// 充值按钮
		btnCharge() {
			// 重置短信充值表单
			if (this.$refs.formMail) {
				this.$refs.formMail.resetFields();
			}
			this.formMail.dwxx_id = this.companyId;
			this.formMail.yh_id = this.yhid;
			// 重置点数充值表单
			if (this.$refs.formPoint) {
				this.$refs.formPoint.resetFields();
			}
			this.formPoint.dwxx_id = this.companyId;
			this.formPoint.yh_id = this.yhid;
			this.dialogCharge = true;
		},
		// 短信充值接口
		postDataChargeMail() {
			this.loadingCharge = true;
			$.post('/gyrcht/ywgl/zpbl/dxczBc', this.formMail).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信订单提交成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loadingCharge = false;
			}).catch(() => {
				this.loadingCharge = false;
			});
		},
		// 点数充值接口
		postDataChargePoint() {
			this.loadingCharge = true;
			$.post('/gyrcht/ywgl/zpbl/dsczBc', this.formPoint).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('点数订单提交成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loadingCharge = false;
			}).catch(() => {
				this.loadingCharge = false;
			});
		},
		// dialog充值 确认按钮
		dialogChargeSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (formName === 'formMail') {
						this.postDataChargeMail();
					} else {
						this.postDataChargePoint();
					}
					setTimeout(() => {
						this.dialogCharge = false;
					}, 5);
				}
			});
		},
		// dialog充值 取消按钮
		dialogChargeCancel(formName) {
			this.dialogCharge = false;
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
		},
		// =========================> 职位查看
		btnJobList() {
			this.$router.push({
				name: 'bussJobList',
				params: {
					companyId: this.companyId,
					zpwszw: this.btns.zpwszw, // 是否可以查询 网上招聘职位
					zpxczw: this.btns.zpxczw,	// 是否可以查询 现场招聘职位
					zpwtzw: this.btns.zpwtzw // 是否可以查询 委托招聘职位
				}
			});
		},
		// ========================> 入场通知单打印
		btnAcess() {
			this.dialogAcess = true;
		},
		// =======================> 招聘办理（委托办理和广告位预定）
		btnOrderAd() {
			this.dialogAd = true;
		},
		// =====================> 现场展位预定
		xianChangeBook(row, column) {
			if (column.property === 'elsyzw' && this.btns.zpxcbl === true) {
				if (this.companyId === '') {
					return this.$message.warning('请先选择要预定的单位');
				}
				this.zphId = row.zph_id;
				this.zphInfo = {
					date: row.zphrq,
					title: row.zphbt
				};
				this.dialogExh = true;
			}
		}
	},
	created() {
		this.getDataPrice();
	},
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.refresh();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>
<style scoped>
	.color_grey{
		line-height: 2.5;
	}
	.detail_wrap{
		padding-bottom: 0;
	}
	.pad_right{
		padding-right: 10px;
	}
	.com_cruit{
		padding: 10px;
		background-color: #fff;
		margin-top: 10px;
	}
	.align_left {
		padding-right: 10px;
	}
	/* 企业信息 */
	.company_info {
		line-height: 2;
		color: #222;
	}
	/* 企业名称 */
	.company_title{
		font-size: 20px;
		/* font-weight: bold; */
	}
	/* 着重文字 */
	.warn_text {
		font-size: 16px;
		font-weight: bold;
		padding: 0 4px;
	}
	.recruit_title{
		line-height: 2.5;
		font-size: 16px;
	}
	.refresh{
		padding: 10px;
		cursor: pointer;
	}
	.refresh:hover{
		color: #3399ff;
	}
	.do_lists{
		margin: 5px 0;
	}
	.do_lists .el-button{
		margin: 15px 20px;
		border-radius: 0;
	}

</style>
