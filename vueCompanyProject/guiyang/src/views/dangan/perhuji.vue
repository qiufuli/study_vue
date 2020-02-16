<docs>
	## 流动人员档案---个人户籍
	* @author SHJ
	* @date ###### 2017年8月11日
	* @desc 查询、导入、删除
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
						<el-upload action="/gyrcht/ldryda/ldryda/grhjdrBc"
							:show-file-list="false"
							:on-success="uploadSuccess"
							:before-upload="beforeUpload"
							class="inline_block">
							<el-button icon="upload" type="primary" size="small"
								class="btn_square">导入</el-button>
						</el-upload>
						<a href="static/files/grhjdrmb.xlsx" target="_blank">
							<el-button icon="btn-download" size="small" type="primary"
								class="btn_square margin_l_10">下载模板</el-button></a>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap width_100">
					<el-table-column label="编号" prop="bh"></el-table-column>
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="籍贯" prop="jg"></el-table-column>
					<el-table-column label="身份证编号" prop="sfzbh" min-width="180"></el-table-column>
					<el-table-column label="迁入信息" prop="qrxx" min-width="150"></el-table-column>
					<el-table-column label="迁出信息" prop="qcxx" min-width="150"></el-table-column>
					<el-table-column label="导入日期" prop="drrq" min-width="110"></el-table-column>
					<el-table-column label="修改日期" prop="xgrq" min-width="110"></el-table-column>
					<el-table-column fixed="right" label="操作" prop="grhj_id" width="90">
						<template scope="scope">
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row.grhj_id)"></el-button>
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
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';

export default {
	name: 'danganPerHuji',
	data() {
		return {
			labelWidth,
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				xm: '',
				pageNum: 1
			},
			// 提交使用的克隆数据
			formRight: {},
			// 校验规则
			rules: {
				xm: [{ validator: validator('32, "normal", "姓名", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0
		};
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
			$.get('/gyrcht/ldryda/ldryda/grhjCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.grhjs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 删除
		// 删除按钮
		handleDel(id) {
			this.$confirm('此操作将永久删除该条存档信息, 是否继续?', '提示', {
				type: 'warning'
			}).then(() => {
				this.delDate(id);
			}).catch(() => {
			});
		},
		// 执行删除(delete)
		delDate(id) {
			this.loading = true;
			$.delete('/gyrcht/ldryda/ldryda/grhjSc', {
				params: { grhj_id: id }
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
		// ====================> 导入
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
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>

<style></style>
