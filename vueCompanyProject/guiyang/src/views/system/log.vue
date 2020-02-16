<docs>
	##系统管理---操作日志
	* @author SHJ
	* @date 2017年8月19日
	* @desc 查询
</docs>

<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="操作内容" prop="cznr">
							<el-input type="text" v-model="form.cznr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作人" prop="czy">
							<el-input type="text" v-model="form.czy"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="操作时间">
							<date-ass :begin.sync="form.czsjq" :end.sync="form.czsjz"
							propBegin="czsjq" propEnd="czsjz"></date-ass>
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
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="操作内容" prop="cznr"></el-table-column>
					<el-table-column label="操作人" prop="czy"></el-table-column>
					<el-table-column label="操作时间" prop="czsj"></el-table-column>
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
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import $ from '@/common/js/axios';

export default {
	name: 'sysLog',
	components: { dateAss },
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// ## 查询
			// * 加载状态
			loading: false,
			// * 数据
			form: {
				cznr: '',
				czy: '',
				czsjq: '',
				czsjz: '',
				pageNum: 1
			},
			formRight: {},
			// * 验证规则
			rules: {
				cznr: [{ validator: validator('14, " full", "操作内容", true') }],
				czy: [{ validator: validator('14, " full", "操作人", true') }]
			},
			// * 查询结果
			results: [],
			// * 总条数
			pageTotal: 0
		};
	},
	methods: {
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
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/czrzCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.rzlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getData();
	}
};
</script>
<style>

</style>
