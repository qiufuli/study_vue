<docs>
	##业务办理----现场招聘签到
	* @author SHJ
	* @date 2017年8月30日
	* @desc 查询、签到
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="招聘日期" prop="zprq">
							<el-date-picker type="date" v-model="form.zprq" :editable="false"
								class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="展位号" prop="zphzwbh">
							<el-autocomplete v-model="form.zphzwbh"
							:fetch-suggestions="suggestionZw" :props="suggestionProp"
							class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input type="text" v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="签到状态" prop="qdzt">
							<el-select v-model="form.qdzt">
								<el-option value="" label="全部"></el-option>
								<el-option value="0" label="未签到"></el-option>
								<el-option value="1" label="已签到"></el-option>
							</el-select>
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
					<el-table-column label="序号" prop="xh"></el-table-column>
					<el-table-column label="展位号" prop="zphzwbh"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc" min-width="200"></el-table-column>
					<el-table-column label="签到状态" prop="qdzt" min-width="200">
						<template scope="state">
							<el-switch on-value="1" on-text="已签到" :on-color="colorOn"
							off-value="0" off-text="未签到" :off-color="colorOff"
							v-model="state.row.qdzt"
							:disabled="state.row.switchState"
							@change="switchState(state.row)"
							:width="72"></el-switch>
							<span v-show="state.row.qdzt === '1'">{{ state.row.qdsj }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:page-size="formRight.pageSize"
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
	name: 'bussCheckIn',
	data() {
		return {
			// 全局统一变量
			labelWidth,
			colorOn,
			colorOff,
			// 查询加载状态
			loading: false,
			// 双线绑定的查询表单
			form: {
				zprq: new Date(),
				dwmc: '',
				zphzwbh: '',
				qdzt: '',
				pageNum: 1,
				pageSize: 50
			},
			// 双线绑定的查询表单
			formRight: {},
			// 验证规则
			rules: {
				zprq: [{ required: true, message: '招聘日期不能为空' }],
				dwmc: [{ validator: validator('64, "less", "单位名称", true') }],
				zphzwbh: [{ validator: validator('8, "less", "展位号", true') }]
			},
			// 查询结果
			results: [],
			// 总数
			pageTotal: 0,
			suggestionProp: {
				value: 'zphzwbh',
				label: 'zphzwbh'
			}
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
			this.formRight.zphzwbh = this.formRight.zphzwbh.replace(/\+/g, '＋');
			$.get('/gyrcht/ywgl/Xczphqd/xczpqdCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.wtzplb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击变更签到状态
		switchState(row) {
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				row.qdsj = '';
				$.put('/gyrcht/ywgl/Xczphqd/qdztXg', {
					dwqd_id: row.dwqd_id,
					qdzt: row.qdzt
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						row.qdsj = res.returnData.qdsj;
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.switchState = false;
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// 获取招聘会占位列表详情
		// 单位输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		suggestionZw(query, cb) {
			// 先进行数据校验
			this.$refs.form.validateField('zphzwbh', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ywgl/Xczphqd/xczpzwhCx', {
							params: {
								zprq: this.form.zprq,
								zphzwbh: query.replace(/\+/g, '＋')
							}
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.xczwhlb);
							} else {
								cb([]);
							}
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getData();
	}
};
</script>
<style></style>
