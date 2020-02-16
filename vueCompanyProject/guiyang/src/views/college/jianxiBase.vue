<docs>
	## 大学生就业---见习基地(单位)管理
	* @author SHJ
	* @date 2017-8-23
	* @desc 查询、添加、编辑、删除
</docs>
<template>
	<div>
		<!-- 查询表单 start  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="见习基地(单位)名称" prop="jxdwmc" class="mulitfix">
							<el-input v-model="form.jxdwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="基地类型" prop="jdlx">
							<select-code v-model="form.jdlx" code="gyrlzyw_dxs_d_jdlx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位性质" prop="dwxz">
							<select-code v-model="form.dwxz" code="gyrlzyw_qzzp_d_dwxz"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="行业分类" prop="hylb">
							<trade-select :changeOnSelect="false" v-model="form.hylb"></trade-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="创建日期">
							<date-ass :begin.sync="form.cjsjks" :end.sync="form.cjsjjs"
								propBegin="cjsjks" propEnd="cjsjjs"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位状态" prop="dwzt">
							<select-code v-model="form.dwzt" code="gyrlzyw_dxs_d_dwzt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item align="right">
							<el-button icon="plus" size="small" type="primary" class="btn_square"
								@click="handleAdd">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end  -->
		<!-- 查询结果 start  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="width_100 table_wrap" stripe>
					<el-table-column label="见习基地(单位)名称" prop="jxdwmc" min-width="180"></el-table-column>
					<el-table-column label="地址" prop="dz" min-width="180"></el-table-column>
					<el-table-column label="基地类型" prop="jdlxmc" min-width="180"></el-table-column>
					<el-table-column label="单位性质" prop="dwxzmc"></el-table-column>
					<el-table-column label="行业分类" prop="hylbmc" min-width="180"></el-table-column>
					<el-table-column label="创建日期" prop="cjsj" min-width="110"></el-table-column>
					<el-table-column label="单位状态" prop="dwztmc"></el-table-column>
					<el-table-column label="操作" prop="jxdw_id" width="130"
						fixed="right">
						<template scope="operation">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(operation.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(operation.row.jxdw_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
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
		</div>
		<!-- 查询结果 end -->
	</div>
</template>
<script>
// , colorOn, colorOff
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import $ from '@/common/js/axios';

export default {
	name: 'collegeBase',
	components: {
		dateAss,
		selectCode,
		tradeSelect
	},
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// ## 查询
			// * 加载状态
			loading: false,
			// * 数据
			form: {
				jxdwmc: '',
				jdlx: '',
				dwxz: '',
				hylb: '',
				dwzt: '',
				cjsjks: '',
				cjsjjs: '',
				pageNum: 1
			},
			formRight: {},
			// 校验规则
			rules: {
				jxdwmc: { validator: validator('128, "full", "见习基地(单位)名称", true') }
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
		// 点击查询
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
			$.get('/gyrcht/dxsjy/dxsjy/jxjdCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.jxjds;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击添加按钮
		handleAdd() {
			this.$router.push({
				name: 'collegeBaseDetail',
				params: { id: '', isNew: true }
			});
		},
		// 点击编辑按钮
		handleEdit(row) {
			this.$router.push({
				name: 'collegeBaseDetail',
				params: { id: row.jxdw_id, isNew: false }
			});
		},
		// 点击删除按钮
		handleDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delDate(id);
			}).catch(() => {});
		},
		// 执行删除(delete)
		delDate(id) {
			this.loading = true;
			$.delete('/gyrcht/dxsjy/dxsjy/jxjdSc', {
				params: { jxdw_id: id }
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
