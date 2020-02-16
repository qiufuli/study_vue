<docs>
	## 大学生就业---见习生派遣管理
	* @author SHJ
	* @date ###### 2017年8月11日
	* @desc 查询、编辑、取消派遣
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
					<el-col :span="6">
						<el-form-item label="单位名称" prop="jxdwmc">
							<el-input v-model="form.jxdwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="派遣日期">
							<date-ass
								propBegin="pqrqks" :begin.sync="form.pqrqks"
								propEnd="pqrqjs" :end.sync="form.pqrqjs"></date-ass>
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
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end  -->
		<!-- c查询结果 start  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100">
					<el-table-column label="单位名称" prop="jxdwmc" min-width="180"></el-table-column>
					<el-table-column label="姓名" prop="yhxm"></el-table-column>
					<el-table-column label="身份证号码" prop="sfzhm" min-width="180"></el-table-column>
					<el-table-column label="性别" prop="xb" min-width="60">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="年龄" prop="nl" min-width="60"></el-table-column>
					<el-table-column label="出生日期" prop="sr" min-width="110"></el-table-column>
					<el-table-column label="毕业院校" prop="xxmc" min-width="180"></el-table-column>
					<el-table-column label="毕业日期" prop="bysj" width="110"></el-table-column>
					<el-table-column label="学历" prop="xlmc"></el-table-column>
					<el-table-column label="专业" prop="zymc" min-width="110"></el-table-column>
					<el-table-column label="见习岗位名称" prop="jxgwmc" min-width="110"></el-table-column>
					<el-table-column label="手机" prop="sjh" min-width="130"></el-table-column>
					<el-table-column label="派遣日期" prop="pqrq" min-width="110"></el-table-column>
					<el-table-column label="见习状态" prop="jxztmc"></el-table-column>
					<el-table-column fixed="right" label="操作" prop="jxdw_id" width="130">
						<template scope="operation">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(operation.row)"></el-button>
							<el-button title="取消派遣" size="mini" type="danger" icon="close"
								@click="cancelDispatch(operation.row)"></el-button>
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
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import $ from '@/common/js/axios';

export default {
	name: 'collegeManage',
	components: {
		dateAss
	},
	data() {
		return {
			labelWidth,
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				yhxm: '',
				jxdwmc: '',
				pqrqks: '',
				pqrqjs: '',
				pageNum: 1
			},
			// 提交使用的克隆数据
			formRight: {},
			// 校验规则
			rules: {
				yhxm: [{ validator: validator('64, "normal", "用户姓名", true') }],
				jxdwmc: [{ validator: validator('128, "less", "见习单位名称", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0
		};
	},
	methods: {
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
			$.get('/gyrcht/dxsjy/dxsjy/jxspqCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.jxss;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 编辑
		handleEdit(row) {
			const data = {
				jxs_id: row.jxs_id,
				grjl_id: row.grjl_id,
				grjbxx_id: row.grjbxx_id
			};
			this.$router.push({ name: 'collegeManageDetail', params: data });
		},
		// 取消派遣
		cancelDispatch(row) {
			const data = {
				jxs_id: row.jxs_id
			};
			$.post('/gyrcht/dxsjy/dxsjy/qxpqBc', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('取消派遣成功');
						this.getData();
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => { });
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
