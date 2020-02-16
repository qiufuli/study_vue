<docs>
	## 大学生就业---见习生管理
	* @author SHJ
	* @date 2017-8-23 14:40:15
	* @desc 查询、编辑、批量派遣
</docs>
<template>
	<div>
		<!-- 查询条件 start  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名" prop="yhxm">
							<el-input v-model="form.yhxm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="sfzhm">
							<el-input v-model="form.sfzhm"
								@blur="form.sfzhm = form.sfzhm.toUpperCase()"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button :loading="loading" type="primary" native-type="submit"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item class="align_right">
							<el-button icon="check" size="small" type="primary" class="btn_square"
								@click="dispatch">批量派遣</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end  -->
		<!-- 查询结果 start  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100" @selection-change="checkRow">
					<el-table-column type="selection"
						fixed="left"></el-table-column>
					<el-table-column label="姓名" prop="yhxm"
						fixed="left"></el-table-column>
					<el-table-column label="身份证号码" prop="sfzhm" width="180"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="毕业院校" prop="xxmc" min-width="180"></el-table-column>
					<el-table-column label="毕业日期" prop="bysj" width="110"></el-table-column>
					<el-table-column label="学历" prop="xlmc"></el-table-column>
					<el-table-column label="专业" prop="zymc"></el-table-column>
					<el-table-column label="手机" prop="sjh" width="130"></el-table-column>
					<el-table-column label="地址" prop="dz" min-width="180"></el-table-column>
					<el-table-column label="可到职日期" prop="kdzrq" width="110"></el-table-column>
					<el-table-column label="是否参加过见习" prop="sfcjgjx" width="130">
						<template scope="thisRow">
							<span>{{ thisRow.row.sfcjgjx === "1"? "是" : "否" }}</span>
						</template>
					</el-table-column>
					<el-table-column label="见习状态" prop="jxztmc"></el-table-column>
					<el-table-column label="操作" prop="jxdw_id" width="90"
						fixed="right">
						<template scope="operation">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(operation.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="formRight.pageNum"></el-pagination>
				</div>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog 弹出对话框批量派遣 start -->
		<el-dialog size="tiny" title="派遣信息" :visible.sync="dialogDispatch"
			@close="cancel('formDispatch')">
			<el-form :model="formDispatch" :rules="rulesDispatch" label-width="110px"
				ref="formDispatch">
				<el-form-item label="见习状态" prop="jxzt" required>
					<el-select v-model="formDispatch.jxzt" class="width_100">
						<el-option value="20" label="见习中"></el-option>
						<el-option value="30" label="结束见习"></el-option>
						<el-option value="40" label="留用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="派遣日期" prop="pqrq">
					<el-date-picker v-model="formDispatch.pqrq" type="date"
						:editable="false" class="width_100"></el-date-picker>
				</el-form-item>
				<el-form-item label="见习岗位名称" prop="jxgwmc" required>
					<el-input v-model="formDispatch.jxgwmc"></el-input>
				</el-form-item>
				<el-form-item label="单位名称" prop="jxdwmc" required>
					<el-input v-model="formDispatch.jxdwmc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formDispatch')">取消</el-button>
				<el-button type="primary" @click="save('formDispatch')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框批量派遣 end -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { cardExchangeIsValid } from '@/common/js/checkCard';

export default {
	name: 'collegePeople',
	data() {
		return {
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				yhxm: '',
				sfzhm: '',
				pageNum: 1
			},
			// 提交使用的克隆数据
			formRight: {},
			// 验证规则
			rules: {
				yhxm: [{ validator: validator('14, "normal", "姓名", true') }],
				sfzhm: [{ validator: validator('18, "sfzhm", "身份证号", true') }]
			},
			// 查询结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 批量派遣
			// 弹窗可见状态
			dialogDispatch: false,
			// 待提交数据项
			formDispatch: {
				jxzt: '',
				pqrq: '',
				jxgwmc: '',
				jxdwmc: '',
				jxs_id: [],
				yh_id: []
			},
			// 验证规则
			rulesDispatch: {
				jxzt: [{ required: true, message: '见习状态不能为空' }],
				pqrq: [{ required: true, message: '派遣日期不能为空' }],
				jxgwmc: [{ validator: validator('32, "full", "见习岗位名称", false') }],
				jxdwmc: [{ validator: validator('128, "less", "见习单位名称", false') }]
			},
			// 选中记录
			multipleSelection: []
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
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/dxsjy/dxsjy/jxsCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.jxss;
				this.results.forEach((e) => {
					e.jxztmc = e.jxztmc ? e.jxztmc : '未见习';
				});
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		handleEdit(row) {
			const data = {
				grjl_id: row.grjl_id,
				grjbxx_id: row.grjbxx_id,
				yh_id: row.yh_id
			};
			this.$router.push({ name: 'collegePeopleDetail', params: data });
		},
		// ====================> 批量派遣
		// 见习生选择
		checkRow(val) {
			this.multipleSelection = val;
		},
		// 点击批量派遣
		dispatch() {
			if (this.multipleSelection.length !== 0) {
				this.dialogDispatch = true;
				this.multipleSelection.forEach((e) => {
					this.formDispatch.yh_id.push(e.yh_id);
					if (e.jxs_id !== '') {
						this.formDispatch.jxs_id.push(e.jxs_id);
					}
				});
			} else {
				this.$message.warning('请先选择见习生');
			}
		},
		// 点击取消
		cancel(formName) {
			setTimeout(() => {
				this.formDispatch.yh_id = [];
				this.formDispatch.jxs_id = [];
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogDispatch = false;
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData(formName);
				}
			});
		},
		// 保存派遣信息
		postData(formName) {
			$.post('/gyrcht/dxsjy/dxsjy/plpqBc', this.formDispatch)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
						this.formDispatch.yh_id = [];
						this.formDispatch.jxs_id = [];
						this.resetForm(formName);
						this.getData();
						this.dialogDispatch = false;
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {
					this.dialogDispatch = false;
				});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 页面重新激活
	activated() {
		this.getData();
	}
};
</script>

<style></style>
