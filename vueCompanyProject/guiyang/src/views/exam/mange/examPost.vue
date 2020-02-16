<docs>
	## 考试管理---考试管理---考试发布
	## 查询考试、添加/编辑考试、删除考试、分配单位等功能
	* 单位名称：必须唯一。用户名：必须唯一，字符
	* 考试状态 10考试发布、20考试报名、30考试审核、40考试缴费、50打印准考证、60查询成绩
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="考试名称" prop="ksmc">
							<el-autocomplete v-model="form.ksmc"
							:fetch-suggestions="suggestionCompany" :props="suggestionProp"
							class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="考试日期" class="width_100">
							<date-ass :begin.sync="form.kmkssj" :end.sync="form.kmjssj"
								propBegin="kmkssj" propEnd="kmjssj"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="考试状态" prop="kszt">
							<select-code v-model="form.kszt" code="gyrlzyw_bkxt_d_kszt"></select-code>
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
            <el-col :span="12" align="right">
							<el-button size="small" type="primary" icon="plus" :loading="loading"
								@click="handleAdd()" class="btn_square margin_l_10">添加考试</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="width_100 table_wrap" stripe border
					@cell-click="handleEdit">
					<el-table-column label="考试名称" prop="ksmc"
						class-name="color_anchor cur_pointer" width="250"></el-table-column>
					<el-table-column label="考试类型" prop="kslx" width="150">
						<template scope="codeKslx">
							<span>{{codeKslx.row.kslx === '10' ? '需分考场的考试' : '只需报名的考试'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="报考时间" prop="">
						<el-table-column label="报名时间" prop="">
							<el-table-column label="开始时间" prop="bmkssj" width="110"></el-table-column>
							<el-table-column label="结束时间" prop="bmjssj" width="110"></el-table-column>
						</el-table-column>
						<el-table-column label="审核结束时间" prop="shjssj" width="110"></el-table-column>
						<el-table-column label="是否缴费" prop="sfjf" width="110">
							<template scope="state2">
								<span>{{ state2.row.kslx === '20' ? '' : (state2.row.sfjf === '1' ? '是' : '否') }}</span>
								<span class="apporal_info" v-show="state2.row.sfjf === '1'">{{ state2.row.jfjssj }}</span>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="打印准考证时间" prop="">
						<el-table-column label="开始时间" prop="dyzkzkssj" width="110"></el-table-column>
						<el-table-column label="结束时间" prop="dyzkzjssj" width="110"></el-table-column>
					</el-table-column>
					<el-table-column label="查询成绩" prop="">
						<el-table-column label="开始时间" prop="cxcjkssj" width="110"></el-table-column>
					</el-table-column>
					<el-table-column label="发布状态" prop="yxzt">
						<template scope="stateKp">
							<el-switch v-model="stateKp.row.yxzt"
								on-value="01" on-text="发布" :on-color="color.on"
								off-value="02" off-text="停用" :off-color="color.off"
								:disabled="stateKp.row.switchState"
								@change="switchState(stateKp.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="140">
						<template scope="operate">
							<el-button type="primary" size="mini" title="考试设置" icon="setting"
								@click="allotmentCompany(operate.row)"></el-button>
							<el-button type="primary" size="mini" title="打印预览" icon="btn-print"
							@click="printExam(operate.row)"></el-button>
							<el-button type="danger" size="mini" title="删除" icon="delete"
								@click="handleDel(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import $ from '@/common/js/axios';

export default {
	name: 'examPost',
	components: { dateAss, selectCode },
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			// ====================> 查询
			// 加载状态
			loading: false,
			// 表单
			form: {
				ksmc: '',
				kmkssj: '',
				kmjssj: '',
				kszt: '',
				pageNum: 1
			},
			// 校验通过的克隆表单
			formRight: {},
			// 检验规则
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", true') }]
			},
			// 模糊查询考试
			suggestionProp: {
				value: 'ksmc',
				label: 'ksmc'
			},
			// 有效转态字段
			formFalse: {
				ks_id: '',
				yxzt: '',
				kslx: ''
			},
			// 返回值
			results: [],
			// 总条数
			pageTotal: 0
		};
	},
	methods: {
		// ====================> 查询
		// 提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/fbks/ksxxCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.ksxxs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 考试名称输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		suggestionCompany(query, cb) {
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
							params: { ksmc: query, czlx: '1' }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.kslb);
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
		// 点击分配单位
		allotmentCompany(row) {
			this.$router.push({
				name: 'examSet',
				params: {
					id: row.ks_id,
					ksmc: row.ksmc,
					kslx: row.kslx
				}
			});
		},
		// 改变考试有效状态
		switchState(row) {
			this.formFalse.ks_id = row.ks_id;
			this.formFalse.yxzt = row.yxzt;
			this.formFalse.kslx = row.kslx;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/ksgl/fbks/ksztXg', this.formFalse).then((res) => {
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
						row.yxzt = row.yxzt === '01' ? '02' : '01';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// ====================> 考试
		// 新建考试跳转
		handleAdd() {
			this.$router.push({ name: 'examDetail', params: { isNew: true, czlx: 0 } });
		},
		// 打印预览
		printExam(row) {
			const url = `/gyrcht/ksgl/fbks/ksxxDc?${'ks_id'}=${row.ks_id}`;
			window.open(url);
		},
		// 删除考试 警告提醒
		handleDel(row) {
			this.$confirm('考试一旦删除将无法恢复,是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				$.delete('/gyrcht/ksgl/fbks/ksxxSc', {
					params: { ks_id: row.ks_id }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.getData();
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
			}).catch(() => {});
		},
		// 更改考试信息跳转
		handleEdit(row, column) {
			if (column.property === 'ksmc') {
				this.$router.push({ name: 'examDetail', params: { isNew: false, id: row.ks_id, czlx: 1 } });
			}
		}
	},
	// 克隆表单
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
	.apporal_info{
		display: block;
	}
</style>
