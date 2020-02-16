<docs>
	## 流动人员档案---个人户籍，查询页面
	* @author SHJ
	* @date ###### 2017年8月11日
	* @desc 查询、增加、编辑、删除、导入、档案断号查询、短信(单发、群发)
	## 遗留问题
	* 扫描存档证明二维码
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="queryForm" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名" prop="xm">
							<el-input type="text" v-model="form.xm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh">
							<el-input type="text" v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="档案转入日期" label-width="120px">
							<date-ass
								propBegin="dazrrqq" :end.sync="form.dazrrqz"
								:begin.sync="form.dazrrqq" propEnd="dazrrqz"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="档案编号">
							<el-col :span="11">
								<el-form-item prop="dabhks">
									<el-input v-model="form.dabhks" placeholder="开始"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item prop="dabhjs">
									<el-input v-model="form.dabhjs" placeholder="结束"></el-input>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col v-show="btns.grdatj || btns.grdad || btns.grdaqf || btns.grdadr"
						:span="14" class="btns_right">
						<el-form-item label-width="0">
							<el-button
								v-show="btns.grdatj"
								icon="plus" size="small" type="primary"
								class="no_radius"
								@click="handleAdd('formInfo')">增加</el-button>
							<el-button
								v-show="btns.grdadh"
								icon="search" size="small" type="primary"
								class="no_radius" :loading="loadingBrokenNum"
								@click="handleBroken()">档案断号</el-button>
							<el-button
								v-show="btns.grdaqf"
								icon="message" size="small" type="warning"
								class="no_radius"
								@click="massMsg()">群发短信</el-button>
							<el-upload
								v-show="btns.grdadr"
								action="/gyrcht/ldryda/ldryda/grdadrBc"
								:show-file-list="false"
								:on-success="uploadSuccess"
								:before-upload="beforeUpload"
								class="inline_block margin_l_10">
								<el-button icon="upload" type="primary" size="small"
									class="no_radius">导入</el-button>
							</el-upload>
							<a
								v-show="btns.grdadr"
								href="static/files/grdadrmb.xlsx" target="_blank">
								<el-button icon="btn-download" size="small" type="primary"
									class="no_radius margin_l_10">下载模板</el-button></a>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100">
					<el-table-column label="档案编号" prop="dabh"></el-table-column>
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="手机号" prop="sjh" min-width="130"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证" prop="sfzhm"></el-table-column>
					<el-table-column label="学历" prop="xl"></el-table-column>
					<el-table-column label="毕业院校" prop="byyx"></el-table-column>
					<el-table-column label="所学专业" prop="sxzy"></el-table-column>
					<el-table-column label="毕业日期" prop="byrq" min-width="110"></el-table-column>
					<el-table-column label="转入单位" prop="zrdw"></el-table-column>
					<el-table-column label="档案转入日期" prop="dazrrq" min-width="110"></el-table-column>
					<el-table-column fixed="right" label="操作" prop="grda_id" width="160">
						<template scope="scope">
							<el-button
								title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
							<el-button
								:disabled="btns.grdafs === false"
								title="发送短信" size="mini" type="warning" icon="message"
								@click="sendMsg(scope.row)"></el-button>
							<el-button
								:disabled="btns.grdasc === false"
								title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row.grda_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog 弹出对话框 增加/编辑 start -->
		<el-dialog title="个人档案信息" :visible.sync="dialogEdit"
			@close="cancelEdit('formInfo')">
			<el-form :model="formInfo" :rules="rulesFormInfo" label-width="110px"
				ref="formInfo">
				<el-row>
					<el-col :span="12">
						<el-form-item label="档案编号" prop="dabh" class="is-required">
							<el-input v-model="formInfo.dabh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="档案转出单位" prop="dazcdw">
							<el-input v-model="formInfo.dazcdw"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="档案转入日期" prop="dazrrq">
							<el-date-picker type="date" v-model="formInfo.dazrrq"
								:editable="false" class="width_100"
								:picker-options="beginOption"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="档案转出日期" prop="dazcrq">
							<el-date-picker type="date" v-model="formInfo.dazcrq"
								:editable="false" class="width_100"
								:picker-options="endOption"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="集体存档单位" prop="jtcddw">
							<el-input v-model="formInfo.jtcddw"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="集体存档日期" prop="jtcdrq">
							<el-date-picker type="date" v-model="formInfo.jtcdrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="集体户编号" prop="jthbh">
							<el-input v-model="formInfo.jthbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="欠费起始日期" prop="qfqsrq">
							<el-date-picker type="date" v-model="formInfo.qfqsrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" prop="xm">
							<el-input v-model="formInfo.xm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="xb">
							<el-radio-group v-model="formInfo.xb">
								<el-radio label="1">男</el-radio>
								<el-radio label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="sfzhm">
							<el-input v-model="formInfo.sfzhm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="转入单位" prop="zrdw">
							<el-input v-model="formInfo.zrdw"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="毕业院校" prop="byyx">
							<el-input v-model="formInfo.byyx"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="毕业时间" prop="byrq">
							<el-date-picker type="date" v-model="formInfo.byrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="所学专业" prop="sxzy">
							<el-input v-model="formInfo.sxzy"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="sjh">
							<el-input v-model="formInfo.sjh"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="学历" prop="xl">
							<select-code v-model="formInfo.xl" code="gyrlzyw_qzzp_d_xl"></select-code>
							<!-- <el-input v-model="formInfo.xl"></el-input> -->
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="邮箱" prop="yx">
							<el-input v-model="formInfo.yx"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer">
				<el-button @click="cancelEdit('formInfo')">取消</el-button>
				<el-button :disabled="btns.grdabj === false"
					type="primary" @click="submitEdit('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框 增加/编辑 end -->
		<!-- dialog 弹出对话框 发送短信 start-->
		<el-dialog size="tiny" :title="formMsg.title"
			:visible.sync="dialogMsg" @close="dialogMsgCancel('formMsg')">
			<el-form :model="formMsg" :label-width="labelWidth" ref="formMsg" :rules="rulesMail">
				<el-form-item label="发送人数" v-show="formMsg.isAll">
					<el-input :value="formMsg.length" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="短信内容" prop="fsnr" required>
					<el-input v-model="formMsg.fsnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogMsgCancel('formMsg')">取消</el-button>
				<el-button type="primary" @click="dialogMsgSubmit('formMsg')"
					:disabled="formMsg.isAll && formMsg.length === ''">发送</el-button>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框 发送短信 end-->
		<!-- dialog 弹出对话框 断号查询 start -->
		<el-dialog size="tiny" title="档案断号信息" :visible.sync="dialogBrokenNum">
			<el-table :data="brokenNum" stripe class="width_100">
				<el-table-column label="档案编号" align="center" prop="dabh"></el-table-column>
			</el-table>
			<div class="pagination_wrap" v-show="brokenNum.length > 0">
				<el-pagination layout="total,prev,pager,next,jumper"
					:total="pageTotalBroken"
					@current-change="getDataBrokenNum"
					:current-page.sync="pageNumBroken">
				</el-pagination>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框 断号查询 end -->
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import dateAss from '@/common/vue/dateAss';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import { getBtnsRight } from '@/common/js/utils';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'danganPerson',
	components: { dateAss, selectCode },
	data() {
		// 档案编号唯一性验证
		const checkOnly = (rule, val, callback) => {
			// 接口
			$.get('/gyrcht/ldryda/ldryda/dabhCx', {
				params: {
					grda_id: this.formInfo.grda_id,
					czlx: this.formInfo.czlx,
					dabh: val
				}
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			// 按钮权限
			btns: {},
			// 全局统一变量
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定的数据
			form: {
				xm: '',
				sjh: '',
				dazrrqq: '',
				dazrrqz: '',
				dabhks: '',
				dabhjs: '',
				pageNum: 1
			},
			// 提交表单使用的克隆数据
			formRight: {},
			// 校验规则
			rules: {
				xm: [{ validator: validator('32, "normal", "姓名", true') }],
				sjh: [{ validator: validator('11, "sjh ", "手机号", true') }],
				dabhks: [{ validator: validator('6, "normal", "档案编号开始", true') }],
				dabhjs: [{ validator: validator('6, "normal", "档案编号结束", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 新增/编辑
			// 对话框可见状态
			dialogEdit: false,
			// 数据
			formInfo: {
				dabh: '',
				grda_id: '',
				xm: '',
				xb: '',
				byyx: '',
				sxzy: '',
				yx: '',
				sjh: '',
				byrq: '',
				dazrrq: '',
				jthbh: '',
				dazcdw: '',
				dazcrq: '',
				qfqsrq: '',
				jtcddw: '',
				jtcdrq: '',
				sfzhm: '',
				zrdw: '',
				xl: '',
				pageNum: '',
				pageSize: '',
				czlx: ''
			},
			// 校验规则
			rulesFormInfo: {
				dabh: [{ validator: validator('6, "number", "档案编号",false', checkOnly), trigger: 'blur' }],
				xm: [{ validator: validator('32, "full", "姓名",true') }],
				byyx: [{ validator: validator('32, "full", "毕业院校",true') }],
				sxzy: [{ validator: validator('32, "full", "所学专业",true') }],
				yx: [{ validator: validator('48, "email", "邮箱",true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号码",true') }],
				jthbh: [{ validator: validator('4, "number", "集体户编号",true') }],
				dazcdw: [{ validator: validator('32, "full", "档案转出单位",true') }],
				jtcddw: [{ validator: validator('64, "full", "集体存档单位",true') }]
			},
			// ====================> 短信
			// 对话框可见状态
			dialogMsg: false,
			// 数据
			formMsg: {
				isAll: false,
				title: '',
				yh_idlb: [],
				fsnr: '',
				length: ''
			},
			// 校验规则
			rulesMail: {
				fsnr: [{ validator: validator('256, "bz ", "发送内容", false') }]
			},
			// ====================> 断号查询
			// 弹出框可见状态
			dialogBrokenNum: false,
			// 查询状态
			loadingBrokenNum: false,
			// 断号数据
			brokenNum: [],
			pageNumBroken: 1,
			pageTotalBroken: 0
		};
	},
	computed: {
		beginOption() {
			const end = this.formInfo.dazcrq;
			return {
				disabledDate(time) {
					return time.getTime() > new Date(end).getTime();
				}
			};
		},
		endOption() {
			const begin = this.formInfo.dazrrq;
			return {
				disabledDate(time) {
					return time.getTime() < new Date(begin).getTime();
				}
			};
		}
	},
	methods: {
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
			$.get('/gyrcht/ldryda/ldryda/grdaCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.grdas;
				this.pageTotal = +res.rowsCount || 0;
				// 群发短信人数 = 当前请求数据总条数
				this.formMsg.length = this.pageTotal;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 增加/编辑 功能
		// 点击增加
		handleAdd(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.formInfo.grda_id = '';
			this.formInfo.czlx = '0';
			this.dialogEdit = true;
		},
		// 点击编辑
		handleEdit(row) {
			this.dialogEdit = true;
			// 延迟赋值，保证重置表单功能的实现
			setTimeout(() => {
				Object.keys(this.formInfo).forEach((item) => {
					this.formInfo[item] = row[item];
				});
				this.formInfo.czlx = '1';
			}, 1);
		},
		// 弹窗中点击取消
		cancelEdit() {
			this.dialogEdit = false;
			this.$refs.formInfo.resetFields();
		},
		// 弹窗中点击保存
		submitEdit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					this.postData();
					setTimeout(() => {
						this.dialogEdit = false;
					}, 5);
				}
			});
		},
		// 执行保存
		postData() {
			$.post('/gyrcht/ldryda/ldryda/grdaBc', this.formInfo)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功'
						});
						this.getData();
					} else {
						this.$message({
							type: 'warning',
							message: res.returnData.message
						});
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
		},
		// ## 删除功能
		// 点击删除
		handleDel(id) {
			this.$confirm('此操作将永久删除该条存档, 是否继续?', '删除个人档案信息', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.delDate(id);
			}).catch(() => {
			});
		},
		// 执行删除
		delDate(id) {
			$.delete('/gyrcht/ldryda/ldryda/grdaSc', {
				params: { grda_id: id }
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
		// ## 导入
		// 限制上传文件格式和大小
		beforeUpload(file) {
			const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				|| file.type === 'application/vnd.ms-excel';
			const isLt1M = file.size / 1024 / 1024 < 1;
			if (!isExcel) {
				this.$message.error('请下载并使用模板!');
			} else if (!isLt1M) {
				this.$message.error('上传文件应小于1MB');
			}
			return isExcel && isLt1M;
		},
		// 上传成功回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				this.$message.success('导入成功');
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		},
		// ## 档案断号功能
		// 点击档案断号
		handleBroken() {
			this.loadingBrokenNum = true;
			this.getDataBrokenNum();
		},
		// 获取断号信息
		getDataBrokenNum() {
			$.get('/gyrcht/ldryda/ldryda/dadhCx', {
				params: {
					pageNum: this.pageNumBroken
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.brokenNum = res.returnData.dh;
					this.pageTotalBroken = +res.rowsCount || 0;
				}
				this.loadingBrokenNum = false;
				this.dialogBrokenNum = true;
			}).catch(() => {
				this.loadingBrokenNum = false;
				this.dialogBrokenNum = true;
			});
		},
		// ====================> 短信功能
		// 短信弹窗中 点击发送
		dialogMsgSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 二次确认
					this.$confirm('确定发送短信？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (this.formMsg.isAll) {
							this.postDataMsgAll();
						} else {
							this.postDataMsg();
						}
						this.resetForm(formName);
						this.dialogMsg = false;
					}).catch(() => {
						this.formMsg.yhlb = [];
					});
				}
			});
		},
		// 短信弹窗中 点击取消
		dialogMsgCancel(formName) {
			this.resetForm(formName);
			this.dialogMsg = false;
		},
		// ====================> 单发
		// 点击按钮
		sendMsg(row) {
			this.formMsg.isAll = false;
			this.formMsg.title = '发送短信';
			this.formMsg.yhlb = [row.sjh];
			this.dialogMsg = true;
		},
		// 执行发送(post)
		postDataMsg() {
			const data = {
				sjhm: this.formMsg.yhlb,
				fsnr: this.formMsg.fsnr
			};
			$.post('/gyrcht/ldryda/ldryda/fsdxBc', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('短信发送成功');
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
		},
		// ====================> 群发
		// 点击按钮
		massMsg() {
			this.formMsg.isAll = true;
			this.formMsg.title = '群发短信';
			this.dialogMsg = true;
		},
		// 执行群发(post)
		postDataMsgAll() {
			const data = this.formRight;
			data.fsnr = this.formMsg.fsnr;
			$.post('/gyrcht/ldryda/ldryda/qfdxBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信群发成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
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

<style></style>
