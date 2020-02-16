<docs>
	##业务办理---收银办理
	* @author SHJ
	* @date 2017年8月30日
	* @desc 订单查询、订单查看、订单删除、现场缴费确认、退款、收件人确认功能
</docs>
<template>
	<div>
		<!-- 订单查询 start -->
		<div class="query_wrap">
			<el-form ref="queryForm" :label-width="labelWidth" :rules="rules" :model="form">
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单号" prop="ddbh">
							<el-input v-model="form.ddbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="	订单日期">
							<date-ass :begin.sync="form.ddsjq" :end.sync="form.ddsjz"
								propBegin="ddsjq" propEnd="ddsjz"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单渠道" prop="ddqd">
							<select-code v-model="form.ddqd" code="gyrlzyw_qzzp_d_ddqd"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="订单状态" prop="ddzt">
							<select-code v-model="form.ddzt" code="gyrlzyw_qzzp_d_ddzt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="支付方式" prop="zffs">
							<select-code v-model="form.zffs" code="gyrlzyw_qzzp_d_zffs"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="快递处理状态" prop="sfkd" label-width="110px">
							<el-select v-model="form.sfkd" class="width_100">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="已处理"></el-option>
								<el-option value="0" label="未处理"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="对方名称" prop="dfmc">
							<el-input v-model="form.dfmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="开票状态" prop="kpzt">
							<el-select v-model="form.kpzt" class="width_100">
								<el-option value="" label="全部"></el-option>
								<el-option value="03" label="无需开票"></el-option>
								<el-option value="02" label="未开票"></el-option>
								<el-option value="01" label="已开票"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
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
						<el-upload action="/gyrcht/ywgl/sygl/dzddrBc"
							:show-file-list="false"
							:on-success="uploadSuccess"
							:before-upload="beforeUpload"
							class="inline_block">
							<el-button icon="upload" type="primary" size="small" :loading="loading"
								class="btn_square">导入对账单</el-button>
						</el-upload>
						<el-upload action="/gyrcht/ywgl/sygl/tkddrBc"
							:show-file-list="false"
							:on-success="uploadSuccess"
							:before-upload="beforeUpload"
							class="inline_block">
							<el-button icon="upload" type="primary" size="small" :loading="loading"
								class="btn_square">导入退款账单</el-button>
						</el-upload>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 订单查询 end -->
		<!-- 订单列表 start -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100" stripe
					@expand="changeExpand" :row-key="getRowKey" :expand-row-keys="expandRowKeys">
					<el-table-column type="expand" prop="dd_id">
						<template scope="props">
							<div class="detail_wrap">
								<el-row class="info" v-show="props.row.ptdh">
									<el-col :span="3">平台单号: </el-col>
									<el-col :span="21">{{ props.row.ptdh }}</el-col>
								</el-row>
								<el-row class="info">
									<el-col :span="3">订单描述: </el-col>
									<el-col :span="21">{{ props.row.ddms }}</el-col>
								</el-row>
								<el-row class="info">
									<el-col :span="3">办理人: </el-col>
									<el-col :span="5">{{ props.row.cjr }}</el-col>
									<el-col :span="3">支付方式: </el-col>
									<el-col :span="5">{{ props.row.zffsmc}}</el-col>
									<el-col :span="3">支付时间: </el-col>
									<el-col :span="5">{{ props.row.zfsj }}</el-col>
									<el-col :span="3">订单类型: </el-col>
									<el-col :span="5">{{ props.row.ddlxmc }}</el-col>
									<el-col :span="3">订单渠道: </el-col>
									<el-col :span="5">{{ props.row.ddqdmc }}</el-col>
									<el-col :span="3">文稿类型: </el-col>
									<el-col :span="5">{{ props.row.wglxmc }}</el-col>
									<el-col :span="3">是否快递: </el-col>
									<el-col :span="5">
										<a class="isExpress" v-if="props.row.sfkd === '1'"
											@click="confirmInfo(props.row)">是</a>
										<span v-else>否</span>
									</el-col>
								</el-row>
								<!-- 是退款订单 -->
								<el-row class="info" v-show="props.row.ddzt === '40'">
									<el-col :span="3">退款金额: </el-col>
									<el-col :span="5">{{ `${props.row.tkje}${props.row.zffs === '40' ? '点' : '元'}` }}</el-col>
									<el-col :span="3">退款时间: </el-col>
									<el-col :span="5">{{ props.row.tksj }}</el-col>
								</el-row>
								<el-row class="info" v-show="props.row.ddzt === '40'">
									<el-col :span="3">订单备注: </el-col>
									<el-col :span="21">{{ props.row.ddbz }}</el-col>
								</el-row>
								<!-- 是快递 -->
								<el-row class="info" v-show="props.row.sfkd === '1'">
									<el-col :span="3">快递单号: </el-col>
									<el-col :span="5">
										<a :href="`https://www.kuaidi100.com/chaxun?com=shunfeng&nu=${ props.row.kddh }`"
											target="_blank">{{ props.row.kddh }}</a>
									</el-col>
									<el-col :span="3">收件人: </el-col>
									<el-col :span="5">{{ props.row.sjr }}</el-col>
									<el-col :span="3">联系方式: </el-col>
									<el-col :span="5">{{ props.row.sjrlxfs }}</el-col>
									<el-col :span="3">收件地址: </el-col>
									<el-col :span="13">{{ props.row.sjrdzmc + props.row.xxdz }}</el-col>
								</el-row>
								<!-- 需要开票 -->
								<el-row class="info" v-show="props.row.sfkp === '1'">
									<el-col :span="3">开票名称: </el-col>
									<el-col :span="5">{{ props.row.fptt }}</el-col>
									<el-col :span="3">纳税人识别号: </el-col>
									<el-col :span="5">{{ props.row.nsrsbh }}</el-col>
								</el-row>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="订单号" prop="ddbh" min-width="200"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc" min-width="200"></el-table-column>
					<el-table-column label="金额/点数" prop="zfje" min-width="130">
						<template scope="zfje">
							{{zfje.row.zffs==='40'?`${zfje.row.zfje} 点`:`${zfje.row.zfje} 元`}}
						</template>
					</el-table-column>
					<el-table-column label="对方名称" prop="dfmc"></el-table-column>
					<el-table-column width="110"
						label="订单状态" prop="ddzt">
						<template scope="stateDd">
							<span v-if="stateDd.row.ddly === '10' || stateDd.row.ddlx === '20'">
								{{stateDd.row.ddztmc}}
							</span>
							<el-switch v-else v-model="stateDd.row.ddzt" :width="72"
								on-value="10" on-text="已支付" :on-color="colorOn"
								off-value="20" off-text="未支付" :off-color="colorOff"
								:disabled="btns.syjfqr === false || stateDd.row.switchState"
								@change="switchState(stateDd.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column width="110"
						label="开票状态" prop="kpzt">
						<template scope="stateKp">
							<el-switch v-if="stateKp.row.sfkp === '1'" v-model="stateKp.row.kpzt" :width="72"
								on-value="01" on-text="已开票" :on-color="colorOn"
								off-value="02" off-text="未开票" :off-color="colorOff"
								:disabled="stateKp.row.switchStateKp || stateKp.row.ddzt ==='20'"
								@change="switchStateKp(stateKp.row)"></el-switch>
							<span v-else>无需开票</span>
						</template>
					</el-table-column>
					<el-table-column label="订单时间" prop="ddsj" width="110"></el-table-column>
					<el-table-column
						label="操作" prop="dd_id" width="100">
						<!-- btns.sytksq || btns.syscdd -->
						<template scope="operate">
							<el-button :disabled="btns.sytksq === false"
								title="退款" size="mini" type="warning" icon="btn-refund"
								@click="handleRefund(operate.row)"></el-button>
							<el-button :disabled="btns.syscdd === false"
								title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(operate.row)"></el-button>
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
					@current-change="getData">
				</el-pagination>
			</div>
		</div>
		<!-- 订单列表 end -->
		<!-- dialog 退款 start  -->
		<el-dialog size="tiny" title="退款申请" :visible.sync="dialogRefund"
			@close="resetFn('formRefund', 'dialogRefund')">
			<el-form :model="formRefund" :label-width="labelWidth" :rules="rulesRefund"
				ref="formRefund">
				<el-form-item label="原订单号" prop="yddh" required>
					<el-input v-model="formRefund.yddh" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item :label="refundUnitLabel" prop="tkje" required>
					<el-input v-model="formRefund.tkje" :disabled="tkjeDisabled">
						<template slot="append">{{ refundUnit }}</template>
					</el-input>
				</el-form-item>
				<el-form-item label="订单备注" prop="ddbz" required>
					<el-input type="textarea" v-model="formRefund.ddbz" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formRefund', 'dialogRefund')">取消</el-button>
				<el-button type="primary" @click="saveRefund('formRefund')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 退款 end  -->
		<!-- dialog 收件人确认 start  -->
		<el-dialog size="tiny" title="收件人确认" :visible.sync="dialogInbox"
			@close="resetFn('formInbox', 'dialogInbox')">
			<el-form :model="formInbox" :label-width="labelWidth" :rules="rulesInbox"
				ref="formInbox">
				<el-form-item label="收件人" prop="sjr" required>
					<el-input v-model="formInbox.sjr"></el-input>
				</el-form-item>
				<el-form-item label="收件地址" prop="sjrdz">
					<address-select xzqhjb="3" :changeOnSelect="false" v-model="formInbox.sjrdz"></address-select>
				</el-form-item>
				<el-form-item label="详细地址" prop="xxdz" required>
					<el-input v-model="formInbox.xxdz"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="sjrlxfs" required>
					<el-input v-model="formInbox.sjrlxfs"></el-input>
				</el-form-item>
				<el-form-item label="快递单号" prop="kddh" required>
					<el-input v-model="formInbox.kddh"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formInbox', 'dialogInbox')">取消</el-button>
				<el-button type="primary" @click="saveInbox('formInbox')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 收件人确认 end  -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import addressSelect from '@/common/vue/multiSelect/addressSelect';

export default {
	name: 'busCashier',
	components: {
		dateAss,
		selectCode,
		addressSelect
	},
	data() {
		const checkMax = (rule, val, callback) => {
			if (this.maxPrice - val < 0) {
				callback(new Error(`最大退款金额/点数为${this.maxPrice}`));
			} else {
				callback();
			}
		};
		return {
			// 按钮权限
			btns: {},
			// 全局统一变量
			labelWidth,
			colorOn,
			colorOff,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				ddbh: '',
				ddsjq: '',
				ddsjz: '',
				dwmc: '',
				ddlx: '',
				ddqd: '',
				ddzt: '',
				zffs: '',
				kdclzt: '',
				sfkd: '',
				sfscggw: '',
				dfmc: '',
				kpzt: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ddbh: [{ validator: validator('22, " full", "订单号", true') }],
				dwmc: [{ validator: validator('64, "less", "单位名称", true') }],
				dfmc: [{ validator: validator('64, "less", "对方名称", true') }]
			},
			// ====================> 订单列表
			results: [],
			// 订单列表 每行key值
			getRowKey(row) {
				return row.dd_id;
			},
			// 订单列表 已展开行key值合集
			expandRowKeys: [],
			// 订单总数
			pageTotal: 0,
			// ====================> 退款
			// 弹窗状态
			dialogRefund: false,
			// 退款金额禁用状态
			tkjeDisabled: false,
			// 最大金额
			maxPrice: '',
			// 待提交表单
			formRefund: {
				yddh: '',
				tkje: '',
				ddbz: ''
			},
			// 退款金额/点数 label
			refundUnitLabel: '',
			// 退款金额/点数 单位
			refundUnit: '',
			// 校验规则
			rulesRefund: {
				yddh: [{ validator: validator('22, "normal", "原订单编号", false') }],
				tkje: [{ validator: validator('64, "posdouble", "退款金额/点数", false', checkMax) }],
				ddbz: [{ validator: validator('64, "normal", "订单备注", false') }]
			},
			// ====================> 收件人确认
			// 弹窗状态
			dialogInbox: false,
			// 待提交表单
			formInbox: {
				dd_id: '',
				dwxx_id: '',
				sjr: '',
				sjrdz: '',
				xxdz: '',
				sjrlxfs: '',
				kddh: ''
			},
			// 校验规则
			rulesInbox: {
				sjr: [{ validator: validator('12, "full", "收件人", false') }],
				sjrdz: [{ required: true, message: '收件地址不能为空' }],
				xxdz: [{ validator: validator('128, "full", "收件人", false') }],
				sjrlxfs: [{ required: true, message: '联系方式不能为空' }],
				kddh: [{ validator: validator('16, "full", "快递单号", false') }]
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
		// 请求(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/sygl/ddxxCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.zwsylb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询结果列表 手风琴效果
		changeExpand(row, expanded) {
			if (expanded) {
				this.$set(this.expandRowKeys, 0, row.dd_id);
			}
		},
		// ====================> 支付方式变更
		switchState(row) {
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/ywgl/sygl/xcjfqrXg', {
					dd_id: row.dd_id,
					ddzt: row.ddzt
				}).then((res) => {
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
						row.ddzt = row.ddzt === '10' ? '20' : '10';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// ====================> 开票状态变更

		switchStateKp(row) {
			this.$nextTick(() => {
				if (row.switchStateKp === undefined) {
					this.$set(row, 'switchStateKp', true);
				}
				row.switchStateKp = true;
				$.put('/gyrcht/ywgl/sygl/kpztXg', {
					dd_id: row.dd_id,
					kpzt: row.kpzt
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.switchStateKp = false;
							}
						});
					} else {
						this.$message.error(res.returnData.message);
						row.kpzt = row.kpzt === '01' ? '02' : '01';
						row.switchStateKp = false;
					}
				}).catch(() => {
					row.switchStateKp = false;
				});
			});
		},
		// ====================> 删除
		handleDel(row) {
			// 已支付且为正常订单不能删除
			if (row.ddzt === '10' && row.ddlx === '10') {
				this.$message.warning('已支付订单不能删除!');
			} else {
				// 可删除 二次确认
				this.$confirm('确定要删除么？', '提示', {
					type: 'warning'
				}).then(() => {
					this.loading = true;
					this.delData(row);
				}).catch(() => {
				});
			}
		},
		// 请求（delete）
		delData(row) {
			$.delete('/gyrcht/ywgl/sygl/ddxxSc', {
				params: {
					dd_id: row.dd_id,
					pageNum: this.form.pageNum
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 退款
		handleRefund(row) {
			if (row.ddzt === '20') {
				this.$message.warning('未支付订单不能退款');
			} else if (row.ddlx === '20') {
				this.$message.warning('已完成退款订单，不能退款');
			} else {
				setTimeout(() => {
					const ddqd = row.ddqd;
					this.formRefund.yddh = row.ddbh;
					this.formRefund.tkje = row.zfje;
					this.maxPrice = row.zfje;
					if (ddqd === '40' || ddqd === '50' || ddqd === '60') {
						this.tkjeDisabled = true;
					} else {
						this.tkjeDisabled = false;
					}
					if (row.zffs === '40') {
						this.refundUnitLabel = '退款点数';
						this.refundUnit = '点';
					} else {
						this.refundUnitLabel = '退款金额';
						this.refundUnit = '元';
					}
				}, 5);
				this.dialogRefund = true;
			}
		},
		// 点击保存
		saveRefund(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					this.putDataRefund();
					setTimeout(() => {
						this.dialogRefund = false;
					}, 5);
				}
			});
		},
		// 退款接口(put)
		putDataRefund() {
			$.put('/gyrcht/ywgl/sygl/ddtkBc', this.formRefund)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('退款成功');
						this.getData();
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				})
				.catch(() => {
					this.loading = false;
				});
		},
		// ====================> 是否快递为是, 点击是，弹出收件人确认对话框
		confirmInfo(row) {
			setTimeout(() => {
				Object.keys(this.formInbox).forEach((item) => {
					this.formInbox[item] = row[item];
				});
			}, 5);
			this.dialogInbox = true;
		},
		// 点击保存
		saveInbox(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postDataInbox();
					setTimeout(() => {
						this.dialogInbox = false;
					}, 5);
				}
			});
		},
		// 保存接口（post）
		postDataInbox() {
			this.loading = true;
			$.post('/gyrcht/ywgl/sygl/sjrqrBc', this.formInbox)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('收件人已确认');
						this.getData();
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		},
		// ## 导入支付宝退款账单
		// * 限制上传文件格式和大小
		beforeUpload(file) {
			const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				|| file.type === 'application/vnd.ms-excel';
			// const isLt1M = file.size / 1024 / 1024 < 1;
			if (!isExcel) {
				this.$message.error('请下载并使用模板!');
			}
			//  else if (!isLt1M) {
			// 	this.$message.error('上传文件应小于1MB');
			// }
			return isExcel;
		},
		// * 上传成功回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				this.$message.success('导入成功');
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
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
/* 展开行样式 套用详情页信息样式 */
.detail_wrap {
	padding: 0;
}
.detail_wrap .info {
	text-align: left;
	margin-bottom: 2px;
}
.detail_wrap .info .el-col-3 {
	text-align: right;
}
/* 是否快递为是 */
.isExpress {
	color: blue;
	cursor: pointer;
}
.btns_right .inline_block {
	margin-left: 10px;
}
</style>
