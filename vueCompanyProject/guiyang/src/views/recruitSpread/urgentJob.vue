<docs>
	##求职招聘---急需岗位
	* @author ChenXue
	* @date 2018年7月12日
	* @desc 查询 / 标记 急需岗位
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
								<el-input type="text" v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职位名称" prop="zwmc">
								<el-input type="text" v-model="form.zwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="招聘类型" prop="zplx">
							<select-code v-model="form.zplx" code="gyrlzyw_qzzp_d_zplx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否急需" prop="sfjxu">
							<el-select v-model="form.sfjxu">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
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
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column label="职位名称" prop="zwmc"></el-table-column>
					<el-table-column label="招聘类型" prop="zplx"></el-table-column>
					<el-table-column label="是否急需" width="100" prop="sfjxu">
						<template scope="stateSfjxu">
							<el-switch v-model="stateSfjxu.row.sfjxu"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"
								@change="switchState(stateSfjxu.row)"></el-switch>
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
		<!-- 查询结果  end -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';

export default {
	name: 'urgentJob',
	data() {
		return {
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			// ====================>查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				dwmc: '',
				zwmc: '',
				zplx: '',
				sfjxu: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 有效转态字段
			formFalse: {
				dwzw_id: '',
				sfjxu: ''
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0
		};
	},
	methods: {
		// =============================> 查
		// 查询按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 重点企业 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/jxgw/jxgw/zwxxlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.jxgwlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		//  =============================> 是否急需
		// 是否急需 变更
		switchState(row) {
			this.formFalse.dwzw_id = row.dwzw_id;
			this.formFalse.sfjxu = row.sfjxu;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.post('/gyrcht/jxgw/jxgw/jxgwBj', this.formFalse).then((res) => {
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
						row.yxzt = row.yxzt === '1' ? '0' : '1';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		}
	},
	created() {
		this.getData();
		Object.assign(this.formRight, this.form);
	},
	components: { selectCode }
};
</script>

<style></style>
