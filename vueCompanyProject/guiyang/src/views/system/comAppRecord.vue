<docs>
	##系统管理---单位审核记录
	* @author LXY
	* @date 2018年5月25日
	* @desc 查询
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="审批日期">
							<date-ass :begin.sync="form.sprqq" :end.sync="form.sprqz"
							propBegin="sprqq" propEnd="sprqz"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审批人" prop="sprmc">
							<el-autocomplete v-model="form.sprmc"
							:fetch-suggestions="suggestionCompany" :props="suggestionProp" @select="getSuggestId"
							class="width_100"></el-autocomplete>
							<!--<el-input v-model="form.sprmc"></el-input>-->
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审批状态" prop="spzt">
							<el-select v-model="form.spzt">
								<el-option value="" label="全部"></el-option>
								<el-option value="30" label="审批通过"></el-option>
								<el-option value="40" label="审批拒绝"></el-option>
							</el-select>
							<!--<select-code v-model="form.spzt" code="gyrlzyw_qzzp_d_spzt" :hasAll="true"></select-code>-->
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
					<el-table-column label="序号" prop="xh" width="60"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column label="审批日期" prop="sprq"></el-table-column>
					<el-table-column label="审批人" prop="sprXm"></el-table-column>
					<el-table-column label="审批状态" prop="spzt"></el-table-column>
					<el-table-column label="审批备注">
						<template scope="state">
							<span v-if="state.row.spztbz === '30'">{{state.row.spbz}}</span>
							<span v-else>{{state.row.spyy === '1'? `${state.row.spbz}` : `${state.row.spyymc}`}}</span>
						</template>
					</el-table-column>
					<!--<el-table-column label="审批类型" prop="splx"></el-table-column>-->
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
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'sysComAppRecord',
	components: { dateAss, selectCode },
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 编辑
			// 显示状态
			dialogFormInfo: false,
			// 表单
			form: {
				dwmc: '',
				sprqq: '',
				sprqz: '',
				spzt: '',
				sprmc: '',
				sprXm: '',
				sprId: '',
				pageNum: 1
			},
			suggestionProp: {
				value: 'sprXm',
				label: 'sprXm'
			},
			// 验证
			rules: {
				dwmc: [{ validator: validator('48, "bz", "参数名称", true') }],
				sprmc: [{ validator: validator('48, "bz", "参数描述", true') }]
			},
			// 克隆表单（用于提交）
			formRight: {}
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.sprmc': function (val) {
			if (!val) {
				this.form.sprId = '';
			}
		}
	},
	methods: {
		// ====================> 查询
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
		// 重置表单
		resetForm(formName) {
			this.form.sprId = '';
			this.$refs[formName].resetFields();
		},
		// 请求(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/getDwspmx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.spmxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 编辑
		// 按钮
		handleEdit(row) {
			setTimeout(() => {
				Object.keys(this.formInfo).forEach((item) => {
					this.formInfo[item] = row[item];
				});
				this.formInfo_cslx = row.cslx;
			}, 1);
			this.dialogFormInfo = true;
		},
		// 关闭重置弹窗
		cancel(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.dialogFormInfo = false;
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
					setTimeout(() => {
						this.dialogFormInfo = false;
					}, 5);
				}
			});
		},
		// 接口（put）
		putData() {
			if (this.formInfo.cslx === '10') {
				this.formInfo.csz = +this.formInfo.csz;
			}
			$.put('/gyrcht/xtgl/xtgl/xtcsXg', this.formInfo)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
						this.submitForm('form');
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
		},
		// 输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		suggestionCompany(query, cb) {
			// 先进行数据校验
			this.$refs.form.validateField('sprmc', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/xtgl/xtgl/sprxxCx', {
							params: { sprmc: query }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.Sprlist);
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
		getSuggestId(item) {
			this.form.sprId = item.sprId;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getData();
	}
};
</script>

<style></style>
