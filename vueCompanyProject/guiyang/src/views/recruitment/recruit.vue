<docs>
	## 招聘会管理----招聘会管理
	@date ###### Mon Aug 14 15:38:45 CST 2017
	@author jinglf000
	@desc 招聘会管理，完成招聘会的发布，编辑，新建，发送短信
</docs>
<template>
	<div>
		<!-- 查询开始 -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" ref="queryForm" :label-width="labelWidth">
				<el-row>
					<el-col :span="12">
						<el-form-item label="招聘会标题" prop="zphbt">
							<el-input v-model="form.zphbt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发布状态" prop="fbzt">
							<el-select v-model="form.fbzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="未发布" value="0"></el-option>
								<el-option label="已发布" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="招聘会状态" prop="zphzt">
							<el-select v-model="form.zphzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="待进行" value="1"></el-option>
								<el-option label="进行中" value="2"></el-option>
								<el-option label="已结束" value="3"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="发布日期">
							<dateAss :begin.sync="form.fbrqq" :end.sync="form.fbrqz"
							propBegin="fbrqq" propEnd="fbrqz"></dateAss>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="招聘日期">
							<dateAss :begin.sync="form.zprqq" :end.sync="form.zprqz"
							propBegin="zprqq" propEnd="zprqz"></dateAss>
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
					<el-col v-show="btns.zphtj"
						:span="12" class="align_right">
						<el-button size="small" icon="plus" type="primary" class="btn_square"
							@click="add()" :loading="loading">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询结束 -->
		<!-- 查询结果开始 -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100" stripe
					@cell-click="handleCheck">
					<el-table-column label="招聘会标题" prop="zphbt" min-width="200"
						class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="发布状态" prop="fbzt" min-width="130">
						<template scope="postedState">
							<el-switch v-model="postedState.row.fbzt" :width="72"
								on-value="1" on-text="已发布" :on-color="colorOn"
								off-value="0" off-text="未发布" :off-color="colorOff"
								:disabled="btns.zphfb === false || postedState.row.switchState"
								@change="switchState(postedState.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="发布日期" prop="fbrq" min-width="110"></el-table-column>
					<el-table-column label="招聘日期" prop="zprq" min-width="110"></el-table-column>
					<el-table-column label="招聘会状态	" prop="zphzt" min-width="110">
						<template scope="state">{{recruitState(state.row.zphzt)}}</template>
					</el-table-column>
					<el-table-column label="操作" min-width="150">
						<template scope="operate">
							<el-button
								:disabled="btns.zphck === false"
								title="查看预定" size="mini" icon="search" type="primary"
								@click="bookList(operate.row)"></el-button>
							<el-button
								:disabled="btns.zphqf === false"
								title="群发短信" size="mini" icon="message" type="warning"
								@click="mailAll(operate.row)"></el-button>
							<el-button
								:disabled="btns.zphsc === false"
								title="删除" size="mini" icon="delete" type="danger"
								@click="delRecruit(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="formRight.pageNum"></el-pagination>
				</div>
			</div>
		</div>
		<!-- 查询结果结束 -->
		<!-- 发送短信 开始 -->
		<el-dialog title="群发短信" :visible.sync="visibleMail" size="tiny"
			@close="diaMailCancel('formMail')">
			<el-form :model="formMail" :rules="rulesMail" :label-width="labelWidth"
				ref="formMail">
				<el-form-item label="发送单位数">
					<el-input v-model="formMail.num" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="短信内容" prop="dxnr" required>
					<el-input v-model="formMail.dxnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div class="footer" slot="footer">
				<el-button @click="diaMailCancel('formMail')">取消</el-button>
				<el-button type="primary" @click="diaMailSubmit('formMail')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 发送短信 结束 -->
		<!-- 查看预定 开始 -->
		<el-dialog :visible.sync="visibleBook" title="占位预定列表">
			<div class="loading" v-loading="loadingBook">
				<el-table :data="resultBooks" stripe  class="width_100 table_wrap">
					<el-table-column label="职位类别" prop="zwmc" min-width="180"></el-table-column>
					<el-table-column label="职位数量" prop="zwsl"></el-table-column>
					<el-table-column label="需求人数" prop="xqrs"></el-table-column>
					<el-table-column label="投递人数" prop="tdrs">
						<template scope="tdrs">
							<span>{{ tdrs.row.tdrs ? tdrs.row.tdrs : '0' }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultBooks.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageBookTotal"
						@current-change="getDataBooks"
						:current-page.sync="formBook.pageNum"></el-pagination>
				</div>
			</div>
		</el-dialog>
		<!-- 查看预定 结束 -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'recruitment',
	components: { dateAss },
	data() {
		return {
			labelWidth,
			colorOn,
			colorOff,
			// 查询招聘会列表 相关数据
			form: {
				fbrqq: '',
				fbrqz: '',
				zprqq: '',
				zprqz: '',
				zphbt: '',
				fbzt: '',
				zphzt: '',
				pageNum: 1
			},
			formRight: {},
			rules: {
				zphbt: [{ validator: validator('48, "full", "招聘会标题",true') }]
			},
			loading: false,
			results: [],
			pageTotal: 0,
			// 发送短信
			visibleMail: false,
			formMail: {
				num: 0,
				dxnr: '',
				zph_id: ''
			},
			rulesMail: {
				dxnr: [{ validator: validator('256, "bz", "短信内容",false') }]
			},
			// 现场招聘内容
			resultBooks: [],
			visibleBook: false,
			formBook: {
				zph_id: '',
				pageNum: 1
			},
			loadingBook: false,
			pageBookTotal: 0,
			// 按钮权限
			btns: {},
			jbcs: '',
			zws: ''
		};
	},
	methods: {
		// 招聘会状态
		recruitState(val) {
			let con;
			switch (val) {
			case '1' : con = '待进行'; break;
			case '2' : con = '进行中'; break;
			default : con = '已结束';
			}
			return con;
		},
		/* ********* 接口请求 ******* */
		// 查询招聘会 接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zphgl/zphgl/zphlbCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.zphlb;
				this.jbcs = res.returnData.gswz;
				this.zws = res.returnData.zws;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 删除招聘会记录
		delData(id) {
			$.delete('/gyrcht/zphgl/zphgl/zphxxSc', {
				params: { zph_id: id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 获取群发短信人数
		getDataMailNums(id) {
			$.get('/gyrcht/zphgl/zphgl/dwslCx', { params: { zph_id: id } }).then((res) => {
				this.formMail.num = res.returnData.dwsl;
			}).catch(() => {});
		},
		// 发送短信 接口
		postData() {
			$.post('/gyrcht/zphgl/zphgl/dxqfBc', { zph_id: this.formMail.zph_id, dxnr: this.formMail.dxnr })
			.then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功！');
				} else {
					this.$message.error(res.returnData.message);
				}
			});
		},
		// 查看招聘会 预定人数
		getDataBooks() {
			this.loadingBook = true;
			$.get('/gyrcht/zphgl/zphgl/ydxqCx', {
				params: this.formBook
			}).then((res) => {
				this.loadingBook = false;
				this.resultBooks = res.returnData.ydxqlb;
				this.pageBookTotal = +res.rowsCount;
			}).catch(() => {
				this.loadingBook = false;
			});
		},
		/* ************ 查询招聘会列表  *************** */
		// 查询 提交表单
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 查询表单 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 发布会 发布状态变更
		switchState(row) {
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/zphgl/zphgl/fbztXg', {
					zph_id: row.zph_id,
					fbzt: row.fbzt
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								this.getData();
								row.switchState = false;
							}
						});
					} else {
						this.getData();
						this.$message.error(res.returnData.message);
						row.switchState = false;
					}
				}).catch(() => {
					this.getData();
					row.switchState = false;
				});
			});
		},
		/* ******** 招聘会新建、查看、删除  ************ */
		// 添加招聘会
		add() {
			this.$router.push({
				name: 'recruitmentDetail',
				params: {
					id: '',
					isNew: true,
					jbcs: this.jbcs,
					zws: this.zws
				}
			});
		},
		// 查看招聘会详情
		handleCheck(row, column) {
			if (column.property === 'zphbt') {
				this.$router.push({
					name: 'recruitmentDetail',
					params: {
						id: row.zph_id,
						isNew: false,
						canSave: this.btns.zphbj
					}
				});
			}
		},
		// 删除招聘会
		delRecruit(row) {
			this.$confirm('该操作将会删除本条招聘会，是否继续？', '确定', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData(row.zph_id);
			}).catch(() => { });
		},
		/* *********** 群发短信 *********** */
		// 群发短信
		mailAll(row) {
			this.visibleMail = true;
			this.getDataMailNums(row.zph_id);
			this.formMail.zph_id = row.zph_id;
		},
		// dialog mail 取消
		diaMailCancel(formName) {
			this.visibleMail = false;
			this.$refs[formName].resetFields();
		},
		// dialog mail 确定
		diaMailSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('该操作将会群发短信，是否继续？', '确定', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.postData();
						setTimeout(() => {
							this.visibleMail = false;
						}, 5);
					}).catch(() => {});
				}
			});
		},
		/* ************* 招聘会预定详情 ************** */
		// 查看招聘会 预定数
		bookList(row) {
			this.formBook.zph_id = row.zph_id;
			this.formBook.pageNum = 1;
			this.getDataBooks();
			this.visibleBook = true;
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
