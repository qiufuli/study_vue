<docs>
	##人才库---绿卡查询
	* @author luxy
	* @date 2018-09-11
	* @desc 查询
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名" prop="yhxm">
							<el-input v-model="form.yhxm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证号" prop="sfzhm">
							<el-input v-model="form.sfzhm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="绿卡编号" prop="lkbh">
							<el-input v-model="form.lkbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="绿卡状态" prop="lkzt">
							<select-code v-model="form.lkzt" code="gyrlzyw_rck_d_lkzt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核批次" prop="shpc">
							<select-code v-model="form.shpc" code="gyrlzyw_rck_d_shpc"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('form')">查询</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item align="right">
							<el-button icon="plus" size="small" type="primary" class="btn_square"
								@click="handleAdd('formInfo')">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="姓名"  prop="yhxm"></el-table-column>
					<el-table-column label="身份证号" prop="sfzhm"></el-table-column>
					<el-table-column label="绿卡编号" prop="lkbh"></el-table-column>
					<el-table-column label="绿卡状态" prop="lkztmc"></el-table-column>
					<el-table-column label="审核批次" prop="shpcmc"></el-table-column>
					<el-table-column label="人才类别" prop="rclbmc"></el-table-column>
					<el-table-column label="专家类别" prop="zjlbmc"></el-table-column>
					<el-table-column label="创建日期" prop="cjrq"></el-table-column>
					<el-table-column label="操作" prop="wdkh_id">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
							<!-- <el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row.wdkh_id)"></el-button> -->
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
import { labelWidth } from '@/common/js/config';
// import { validator } from '@/common/js/valid';
import uploadImg from '@/common/vue/uploadImg';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';

export default {
	name: 'greenCard',
	components: { uploadImg, selectCode },
	data() {
		return {
			// 统一的label宽度
			labelWidth,
			// 查询加载状态
			loading: false,
			// 查询表单
			form: {
				yhxm: '',
				sfzhm: '',
				lkzt: '',
				lkbh: '',
				shpc: '',
				pageNum: 1
			},
			// 克隆表单 用于提交
			formRight: {},
			// 查询表单 验证规则
			// rules: {
			// 	yhxm: [{ validator: validator('128, "normal", "客户名称", true') }]
			// },
			// 查询结果
			results: [],
			// 查询结果 总条数
			pageTotal: 0,
			// 添加/编辑弹窗标题
			dialogTitle: '',
			// 是否可见
			dialogVisible: false,
			// 弹窗表单
			formInfo: {
				yhxm: '',
				sfzhm: '',
				sbdw: '',
				cjrq: '',
				lkzt: '',
				lkbh: '',
				zjlb: '',
				rclb: '',
				shpc: ''
			}
		};
	},
	methods: {
		// 点击查询
		submitForm() {
			this.form.pageNum = 1;
			Object.assign(this.formRight, this.form);
			this.getData();
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/rcxxgl/rcxx/rcxxlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.rcxxlist;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击添加
		// 新建考试跳转
		handleAdd() {
			this.$router.push({ name: 'talePoDetail', params: { isNew: true } });
		},
		// 点击编辑
		handleEdit(row) {
			this.$router.push({ name: 'talePoDetail', params: { isNew: false, id: row.grjbxx_id } });
		}
		// 点击取消
		// cancel(formName) {
		// 	setTimeout(() => {
		// 		this.$refs[formName].resetFields();
		// 	}, 5);
		// 	this.dialogVisible = false;
		// },
		// 点击保存
		// save(formName) {
		// 	this.$refs[formName].validate((valid) => {
		// 		if (valid) {
		// 			this.postData();
		// 			setTimeout(() => {
		// 				this.dialogVisible = false;
		// 			}, 5);
		// 		}
		// 	});
		// },
		// 执行保存(post)
		// postData() {
		// 	this.loading = true;
		// 	$.post('/gyrcht/rcpq/rcpq/wdkhxjbjBc', this.formInfo)
		// 		.then((res) => {
		// 			if (res.returnData.executeResult === '1') {
		// 				this.$message.success('保存成功');
		// 				this.getData();
		// 			} else {
		// 				this.$message.error(res.returnData.message);
		// 				this.loading = false;
		// 			}
		// 		}).catch(() => {
		// 			this.loading = false;
		// 		});
		// },
		// 点击删除
		// handleDel(id) {
		// 	this.$confirm('确定要删除么？', '提示', {
		// 		type: 'warning'
		// 	}).then(() => {
		// 		this.loading = true;
		// 		this.delData(id);
		// 	}).catch(() => {
		// 	});
		// },
		// 执行删除(put)
		// delData(id) {
		// 	$.put('/gyrcht/rcpq/rcpq/wdkhscBc', {
		// 		wdkh_id: id
		// 	}).then((res) => {
		// 		if (res.returnData.executeResult === '1') {
		// 			this.$message.success('删除成功!');
		// 			this.getData();
		// 		} else {
		// 			this.$message.error(res.returnData.message);
		// 		}
		// 		this.loading = false;
		// 	}).catch(() => {
		// 		this.loading = false;
		// 	});
		// }
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>
<style scoped>
.picSize {
	width: 100px;
	height: 35px;
	margin: 5px 0;
}
</style>
