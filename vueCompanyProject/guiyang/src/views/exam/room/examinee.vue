<docs>
	## 考试管理---考场管理---考生分配
	* @author SHJ
	* @date 2017年12月5日
	* @desc
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="考试名称" prop="ksmc" required>
							<el-autocomplete v-model="form.ksmc"
							:fetch-suggestions="getNameList" :props="selectValue"
							@select="selectExam" class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-button class="btn_text" type="text" :disabled="!searchExamId" @click="setRule">
						<span v-if="examNumber">准考证规则号（{{examNumber}}）</span>
						<span v-else>准考证号规则设置（未设置）</span>
					</el-button>
					<el-col :span="6">
						<el-form-item label="是否分配" prop="sffp">
							<el-select v-model="form.sffp">
								<el-option label="全部" value=""></el-option>
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="13" class="btns_right">
						<el-form-item>
							<!-- 导出 -->
							<el-button class="no_radius" size="small" type="primary" icon="btn-download" :disabled="!isAllot"
								@click="exportDoc">导出</el-button>
							<!-- 分配考生 -->
							<el-button class="no_radius" size="small" type="warning" :disabled="!isDisRxam"
								@click="allotment">{{isFpks === '1'? '已分配' : '分配考生'}}</el-button>
							<!-- 打印存根 -->
							<el-button class="no_radius" size="small" type="primary" icon="btn-print" :disabled="!isAllot"
							 @click="printStub">打印存根</el-button>
							<!-- 打印考场号 -->
							<el-button class="no_radius" size="small" type="primary" icon="btn-print" :disabled="!isAllot"
							 @click="printNumber">打印考场号</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<p class="exam_title" v-show="searchExamName">当前考试：{{searchExamName}}</p>
				<el-table :data="results" class="table_wrap width_100" stripe>
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="出生日期" prop="csrq"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column label="职位名称" prop="zwmc"></el-table-column>
					<el-table-column label="准考证号" prop="zkzh"></el-table-column>
					<el-table-column label="考点名称" prop="kdmc"></el-table-column>
					<el-table-column label="考场名称" prop="kcmc"></el-table-column>
					<el-table-column label="座位号" prop="zwh"></el-table-column>
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
		<!-- 查询结果 end -->
		<!-- 准考证规则 start -->
		<el-dialog title="准考证规则" size="tiny" :visible.sync="dialogRule"
			@close="resetFn('formRule', 'dialogRule')">
			<el-form :model="formRule" :rules="rulesRule" label-width="110px"
				ref="formRule">
				<el-form-item label="考试名称">{{searchExamName}}</el-form-item>
				<el-form-item label="准考证号规则" prop="zkzhgz" required>
					<el-input v-model="formRule.zkzhgz" placeholder="4-6位数字，不同考试可以相同"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formRule', 'dialogRule')">取消</el-button>
				<el-button type="primary" @click="saveRule('formRule')">保存</el-button>
			</div>
		</el-dialog>
		<!-- 准考证规则 end -->
		<!-- 打印考场号 start-->
		<el-dialog :visible.sync="posterVisible" size="full" :show-close="false" class="print_wrap">
			<!-- 打印样式开始 -->
			<div class="toolbar noprint">
				<div class="btn_text">
					<el-button type="primary" class="btn_square" size="small"
						@click.prevent="handlePrint">打印</el-button>
					<el-button class="btn_square" size="small" @click.prevent="handleBack">返回</el-button>
				</div>
			</div>
			<div class="poster_info clearfix" id="print">
				<div class="print_room" ref="printBox" v-for="(item, index) in examResults" :label="index" :key="index">
					<span class="exam_site">考点：{{ item.kdmc }}</span>
					<h3 v-if="index < 9">第{{`0${index + 1}`}}考场</h3>
					<h3 v-else>第{{ index + 1 }}考场</h3>
					<span class="exam_number">准考证号：{{ item.zkzhfwq }} ~ {{ item.zkzhfwz }} </span>
				</div>
			</div>
		</el-dialog>
		<!-- 打印考场号 end-->
	</div>
</template>

<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'examinee',
	data() {
		return {
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			timeout: null,
			// 模糊匹配查询考试
			selectValue: {
				label: 'ksmc',
				value: 'ksmc'
			},
			// 模糊匹配列表中选中的 考试ID、考试名称
			selectExamId: '',
			selectExamName: '',
			// 上次点击查询按钮 搜索结果中的 考试ID、考试名称
			searchExamId: '',
			searchExamName: '',
			// 双向绑定数据
			form: {
				ksmc: '',
				ks_id: '',
				sffp: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", false') }]
			},
			// 结果
			// results: [],
			// 总数
			// pageTotal: 0,
			// ====================> 准考证号规则
			dialogRule: false,
			posterVisible: false, // 打印考场号
			// 设置准考证证号
			formRule: {
				ks_id: '',
				zkzhgz: ''
			},
			examNumber: '',
			// isFpks: '', // 是否分配考试
			examResults: [],
			// 是否分配考生
			// isAllot: false,
			// 是否设置准考证
			// isDisRxam: false,
			// 校验规则 准考证号规则
			rulesRule: {
				zkzhgz: [{ validator: validator('6, "zkzhgz", "准考证号规则", false') }]
			}
			// isFpks: ''
		};
	},
	computed: {
		infoResult() {
			return this.$store.state.infoResult;
		},
		results() {
			return this.infoResult.returnData ? this.infoResult.returnData.ksxxlb : [];
		},
		pageTotal() {
			return this.infoResult.rowsCount || 0;
		},
		isAllot() {
			return this.$store.state.isAllot;
		},
		isDisRxam() {
			return this.$store.state.isDisRxam;
		},
		isFpks() {
			return this.$store.state.isFpks;
		}
	},
	methods: {
		// ====================> 弹窗关闭
		resetFn(formName, showState) {
			setTimeout(() => {
				if (this.$refs[formName]) {
					this.$refs[formName].resetFields();
				}
			}, 5);
			this[showState] = false;
		},
		// ====================> 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// ====================> 考试列表
		// 查询
		getNameList(query, cb) {
			// 先进行数据校验
			this.$refs.queryForm.validateField('ksmc', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ksgl/common/bkksmclbCx', {
							params: { ksmc: query }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.kslb);
							} else {
								cb([]);
							}
							cb(res.returnData.kslb);
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		},
		// 选中
		selectExam(item) {
			this.selectExamName = item.ksmc;
			this.selectExamId = item.ks_id;
		},
		// ====================> 点击查询按钮
		submitForm(formName) {
			if (!this.selectExamId) {
				return this.$message.warning('请选择考试名称！');
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.searchExamId = this.selectExamId;
					this.searchExamName = this.selectExamName;
					this.form.ks_id = this.searchExamId;
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 查询考生信息
		getData() {
			$.get('/gyrcht/ksgl/ksfp/fpksCx', {
				params: this.formRight
			}).then((res) => {
				this.$store.state.infoResult = res;
				this.infoResult = res;
				this.results = res.returnData.ksxxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.getRule();
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 准考证规则设置
		// 查询准考证号
		getRule() {
			$.get('/gyrcht/ksgl/common/bkksxxCx', {
				params: {
					ks_id: this.searchExamId
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$store.state.isFpks = res.returnData.ksxq.sffpks;
					if (res.returnData.ksxq.sffpks === '1') {
						this.$store.state.isAllot = true;
					} else {
						this.$store.state.isAllot = false;
					}
					if (res.returnData.ksxq.zkzhgz) {
						this.$store.state.isDisRxam = true;
					} else {
						this.$store.state.isDisRxam = false;
					}
					this.formRule.zkzhgz = res.returnData.ksxq.zkzhgz || '';
					this.examNumber = res.returnData.ksxq.zkzhgz || '';
				}
				this.loading = false;
			}).catch(() => {
				this.isDisRxam = false;
				this.isAllot = false;
				this.loading = false;
			});
		},
		// 编辑
		setRule() {
			this.dialogRule = true;
		},
		// 点击保存
		saveRule(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogRule = false;
					this.putRule();
				}
			});
		},
		// 保存接口
		putRule() {
			this.formRule.ks_id = this.searchExamId;
			$.put('/gyrcht/ksgl/ksfp/zkzhgzBc', this.formRule).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('准考证规则号设置成功！');
					this.getRule();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 分配考生
		allotment() {
			$.post('/gyrcht/ksgl/ksfp/yfpksBc', {
				ks_id: this.searchExamId
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$router.push({ name: 'examineeDetail',
						params: {
							id: this.searchExamId,
							ksmc: this.searchExamName,
							kmsj: res.returnData.kmsj
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loadingSite = false;
			}).catch(() => {
				this.loadingSite = false;
			});
		},
		// 导出
		exportDoc() {
			const url = `/gyrcht/ksgl/ksfp/ksfpksxxdcCx?ks_id=${this.searchExamId}&sffp=${this.form.sffp}`;
			window.open(url);
		},
		// 打印存根
		printStub() {
			const url = `/gyrcht/ksgl/ksfp/dycgCx?ks_id=${this.searchExamId}`;
			window.open(url);
		},
		getPosterInfo() {
			$.get('/gyrcht/ksgl/ksfp/dykchCx', {
				params: {
					ks_id: this.searchExamId,
					sffp: this.form.sffp
				}
			}).then((res) => {
				this.paperHeight = 3500;
				this.paperWidth = 2200;
				if (res.returnData.executeResult === '1') {
					this.examResults = res.returnData.kchlb;
				}
				this.loadingSite = false;
			}).catch(() => {
				this.loadingSite = false;
			});
		},
		// 打印考场号
		printNumber() {
			const url = `/gyrcht/ksgl/ksfp/dykchCx?${'ks_id'}=${this.searchExamId}`;
			window.open(url);
		},
		// dialog点击返回
		handleBack() {
			this.posterVisible = false;
		},
		// dialog点击打印
		handlePrint() {
			const subOutputRankPrint = document.getElementById('print');
			const newContent = subOutputRankPrint.innerHTML;
			const oldContent = document.body.innerHTML;
			document.body.innerHTML = newContent;
			window.print();
			window.location.reload();
			document.body.innerHTML = oldContent;
			return false;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style lang="less" scoped>
// 顶部工具栏
.toolbar {
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select: none;
	position: fixed;
	top: 0;
	right: 20px;
	width: 100%;
	z-index: 6;
	border-bottom: 1px solid #dfdfdf;
	border-right: 1px solid #dfdfdf;
	background: #fafafa;
	font-size: 16px;
	box-sizing: border-box;
}
.btn_text {
	margin: 3px 0 0 20px;
}
.poster_info {
	margin-top: 40px;
	width: 100%;
	box-sizing: border-box;
	padding: 0 20px 30px;
	word-wrap: break-word;
	color: #000;
	overflow: hidden;
}
.print_room {
		color: #000;
		height: 588px;
		margin: 0 auto;
		overflow: hidden;
	h3{
		font-size: 150px;
		line-height: 420px;
		width: 100%;
		text-align: center;
		letter-spacing:20px;
	}
	.exam_number {
		text-align: center;
		font-size: 45px;
		display: block;
	}
	.exam_site {
		font-size: 20px;
		padding: 20px;
		display: block;
		box-sizing: border-box;
	}
}

</style>
