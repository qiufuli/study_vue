<docs>
	##系统管理---热门职位
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
						<el-form-item label="职位名称" prop="zwmc">
							<el-input v-model="form.zwmc"></el-input>
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
					<el-table-column label="职位名称" prop="zwmc"></el-table-column>
					<el-table-column label="搜索次数" prop="sscs"></el-table-column>
					<el-table-column label="是否显示" prop="sfxs">
						<template scope="state">
							<el-switch on-value="1" on-text="是" :on-color="colorOn"
							off-value="0" off-text="否" :off-color="colorOff"
							:disabled="state.row.isShow" v-model="state.row.sfxs"
							@change="isShow(state.row)"></el-switch>
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
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'sysHotJob',
	data() {
		return {
			// 统一的label宽度
			labelWidth,
			// 统一的开关颜色
			colorOn,
			colorOff,
			// 查询加载状态
			loading: false,
			// 查询表单
			form: {
				zwmc: '',
				pageNum: 1
			},
			formRight: {},
			// 验证规则
			rules: {
				zwmc: [{ validator: validator('64, "full", "职位名称", true') }]
			},
			// 查询结果
			results: [],
			// 总条数
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
			$.get('/gyrcht/xtgl/xtgl/rmzwCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.rmzwlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 切换是否显示
		isShow(row) {
			this.$nextTick(() => {
				if (row.isShow === undefined) {
					this.$set(row, 'isShow', true);
				}
				row.isShow = true;
				$.put('/gyrcht/xtgl/xtgl/rmzwXg', {
					rmzw_id: row.rmzw_id,
					sfxs: row.sfxs
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.isShow = false;
							}
						});
					}
				}).catch(() => {
					row.isShow = false;
				});
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
