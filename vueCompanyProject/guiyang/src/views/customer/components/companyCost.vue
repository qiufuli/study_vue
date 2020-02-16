<docs>
	## 客户管理---单位客户管理，消费记录
</docs>

<template>
	<!-- 消费记录开始 -->
	<div class="detail_wrap">
		<el-row class="info">
			<el-col :span="24"><h3 class="title">账户余额</h3></el-col>
		</el-row>
		<el-row class="detail_info">
			<el-col :span="3" class="label">简历点数</el-col>
			<el-col :span="3">{{result.zhye.jlds||'0'}}</el-col>
			<el-col :span="3" class="label">现场招聘点数</el-col>
			<el-col :span="3">{{result.zhye.zphds||'0'}}</el-col>
			<el-col :span="3" class="label">短信条数</el-col>
			<el-col :span="3">{{result.zhye.dxts||'0'}}</el-col>
			<el-col :span="3" class="label">开户日期</el-col>
			<el-col :span="3">{{result.zhye.khrq}}</el-col>
		</el-row>
		<el-row class="info title_btns">
			<el-col :span="12"><h3 class="title">账户变更记录</h3></el-col>
			<el-col v-show="canChange !== false"
				:span="12" class="btns_right">
				<el-button icon="setting" type="primary" class="btn_square"
					:loading="loading"
					@click="handleChange">账户调整</el-button></el-col>
		</el-row>
		<!-- 账户变更记录 开始  -->
		<div class="result_wrap" v-loading="loading">
			<el-table :data="result.zhbglb" class="table_wrap width_100" stripe>
				<el-table-column label="变更编号" prop="zhmxbh" min-width="210"></el-table-column>
				<el-table-column label="账户类型" prop="zhlxmc"></el-table-column>
				<el-table-column label="变更类型" prop="bglxmc"></el-table-column>
				<el-table-column label="变更值" prop="bgz"></el-table-column>
				<el-table-column label="变更前点数" prop="bgqz" min-width="110"></el-table-column>
				<el-table-column label="变更后点数" prop="bghz" min-width="110"></el-table-column>
				<el-table-column label="变更时间" prop="cjrq" min-width="110"></el-table-column>
				<el-table-column label="变更原因" prop="bgyy" min-width="130"></el-table-column>
				<el-table-column label="变更人" prop="bgr"></el-table-column>
				<el-table-column label="备注" prop="bz" min-width="200"></el-table-column>
			</el-table>
			<div class="pagination_wrap" v-show="result.zhbglb.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:current-page.sync="form.pageNum"
					@current-change="getData">
				 </el-pagination>
			</div>
		</div>
		<!-- 账户变更记录 结束  -->
		<!-- dialog 开始，账户调整开始  -->
		<el-dialog title="账户调整" :visible.sync="dialog"
			@close="dialogCancel('dialogForm')">
			<span slot="title">
				<span class="dialog_title">账户调整</span>
				<small class="required">变更值、点数为不超过8位的正整数</small>
			</span>
			<el-form :model="form" ref="dialogForm" label-width="45%" :rules="rules">
				<el-row>
					<el-col :span="8">
						<el-form-item prop="zhlx" label="账户类型" required>
							<select-code v-model="form.zhlx"
								code="gyrlzyw_qzzp_d_zhlx" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="bglx" label="变更类型" required>
							<el-select v-model="form.bglx" :disabled="!form.zhlx">
								<el-option label="增加" value="10"></el-option>
								<el-option label="减少" value="20"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="bgz" label="变更值" class="is-required">
							<el-input v-model="form.bgz" :disabled="disabledForm"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item prop="bgqz" label="变更前点数">
							<el-input v-model="form.bgqz" readonly class="input_no_border"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="bghz" label="变更后点数">
							<el-input v-model="form.bghz" readonly class="input_no_border"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="bgyy" label="变更原因">
							<span>{{ form.bgyy }}</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item prop="bz" label="备注" label-width="15%">
							<el-input v-model="form.bz" type="textarea" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="dialogCancel('dialogForm')">取消</el-button>
				<el-button type="primary" native-type="submit"
					:disabled="!form.bgz || !form.bglx || !form.zhlx"
					@click.prevent="dialogSubmit('dialogForm')">确定</el-button>
			</div>
		</el-dialog>
		<!-- dialog 开始，账户调整结束  -->
	</div>
	<!-- 消费记录结束 -->
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'companyCost',
	components: { selectCode },
	props: {
		dwxxId: {
			type: String
		},
		yhid: {
			type: String
		},
		canChange: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			result: {
				zhye: {
					jlds: '',
					zphds: '',
					dxts: '',
					khrq: ''
				},
				// 账户变更列表
				zhbglb: []
			},
			pageTotal: 0,
			loading: false,
			disabledForm: true,
			rules: {
				zhlx: [{ required: true, message: '账户类型不能为空' }],
				bglx: [{ required: true, message: '变更类型不能为空' }],
				bgz: [],
				bz: [{ validator: validator('128, "full", "备注", true') }]
			},
			form: {
				zhlx: '',
				bglx: '',
				bgz: '',
				bgqz: '',
				bghz: '',
				bgyy: '',
				bz: '',
				yh_id: '',
				dwxx_id: '',
				pageNum: 1
			},
			dialog: false
		};
	},
	watch: {
		dwxxId() {
			this.getData();
		},
		/* eslint-disable func-names */
		// 账户类型为简历（10） ---> 变更前点数 显示简历点数
		// 账户类型为现场招聘（20） ---> 变更前点数 显示现场招聘点数
		'form.zhlx': function (val) {
			switch (val) {
			case '10' : this.form.bgqz = this.result.zhye.jlds || 0; break;
			case '20' : this.form.bgqz = this.result.zhye.zphds || 0; break;
			case '30' : this.form.bgqz = this.result.zhye.dxts || 0; break;
			default: this.disabledForm = true;
			}
		},
		// 类型发生变化
		'form.bglx': function (val) {
			this.form.bgz = '';
			// const maxValue = this.form.bgqz;
			const checkNum = (rule, value, cb) => {
				// if (+value > +maxValue) {
				// 	return cb(new Error('变更值大于当前点数'));
				// }
				cb();
			};
			switch (val) {
			case '10' :
				this.rules.bgz = [{ validator: validator('8, "num", "变更值", false') }];
				this.form.bgyy = '手动增加';
				this.disabledForm = false;
				break;
			case '20' :
				this.rules.bgz = [{ validator: validator('8, "num", "变更值", false', checkNum) }];
				this.form.bgyy = '手动减少';
				this.disabledForm = false;
				break;
			default:
				this.rules.bgz = [];
				this.disabledForm = true;
			}
		},
		// 变更后点数变化，根据变更值和变更类型
		'form.bgz': function (val) {
			let resultValue;
			this.$refs.dialogForm.validateField('bgz', (msg) => {
				if (msg === '') {
					/* eslint-disable no-lonely-if */
					if (this.form.bglx === '10') { // 增加
						resultValue = parseInt(val, 10) + parseInt(this.form.bgqz, 10);
					} else if (this.form.bglx === '20') { // 减少
						resultValue = parseInt(this.form.bgqz, 10) - parseInt(val, 10);
					} else {
						resultValue = '';
					}
				} else {
					resultValue = '';
				}
			});
			this.form.bghz = resultValue;
		}
	},
	methods: {
		// 获取数据 分页查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/khgl/dwkh/dwczjlCx', {
				params: {
					dwxx_id: this.dwxxId,
					pageNum: this.form.pageNum
				}
			}).then((res) => {
				this.result = res.returnData;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 提交更改
		putData() {
			this.form.dwxx_id = this.dwxxId;
			this.form.yh_id = this.yhid;
			$.put('/gyrcht/khgl/dwkh/zhxxXg', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('账户调整成功');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {
			});
		},
		// 对话框 触发按钮
		handleChange() {
			this.dialog = true;
			if (this.$refs.dialogForm) {
				this.$refs.dialogForm.resetFields();
			}
		},
		// 对话框取消
		dialogCancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialog = false;
		},
		// 对话框确定
		dialogSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
					setTimeout(() => {
						this.dialog = false;
					}, 5);
				}
			});
		}
	},
	created() {
		this.getData();
	}
};
</script>
<style scoped>
	.detail_info .label{
		text-align: right;
		padding-right: 10px;
		color: #818a96;
	}
	.detail_wrap .title_btns{
		margin-top: 20px;
	}
	.detail_wrap .title_btns .btns{
		text-align: right;
	}
	.dialog_title{
		font-size: 16px;
		font-weight: bold;
		padding-right: 20px;
	}
</style>
