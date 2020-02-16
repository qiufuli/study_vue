<docs>
	##系统管理---系统参数
	* @author SHJ
	* @date 2017年8月26日
	* @desc 查询
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="参数名称" prop="csmc">
							<el-input v-model="form.csmc"></el-input>
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
					<el-table-column label="参数名称" prop="csmc"></el-table-column>
					<el-table-column label="参数代码" prop="csdm"></el-table-column>
					<el-table-column label="参数类型" prop="cslxmc"></el-table-column>
					<el-table-column label="参数值" prop="csz">
						<template scope="cszVal">
							<span>{{ cszVal.row.cslx === '20' ? cszVal.row.csz === '1' ? '是' : '否' : cszVal.row.csz }}</span>
						</template>
					</el-table-column>
					<el-table-column label="参数描述" prop="csms" min-width="200"></el-table-column>
					<el-table-column label="创建时间" prop="cjrq" width="110"></el-table-column>
					<el-table-column label="修改时间" prop="xgrq" width="110"></el-table-column>
					<el-table-column label="操作" prop="xtcs_id" width="90">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
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
		<!-- dialog 编辑 start -->
		<el-dialog title="系统参数信息" :visible.sync="dialogFormInfo" size="tiny"
			@close="cancel('formInfo')">
			<el-form :model="formInfo" ref="formInfo" :rules="rulesFormInfo" :label-width="labelWidth">
				<el-form-item label="参数名称" prop="csmc" required>
					<el-input v-model="formInfo.csmc"></el-input>
				</el-form-item>
				<el-form-item label="参数值" prop="csz" required>
					<el-switch v-if="formInfo.cslx === '20'"
						v-model="formInfo.csz"
						:on-color="colorOn" on-text="是" on-value="1"
						:off-color="colorOff" off-text="否" off-value="0"></el-switch>
					<el-input v-else
						v-model="formInfo.csz"></el-input>
				</el-form-item>
				<el-form-item label="参数描述" prop="csms" required>
					<el-input type="textarea" v-model="formInfo.csms" :autosize="{ minRows: 4}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click.native="save('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 编辑 end -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'sysSalaryLow',
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// 开关颜色
			colorOn,
			colorOff,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				csmc: '',
				pageNum: 1
			},
			// 提交使用的克隆表单
			formRight: {},
			// 校验规则
			rules: {
				csmc: [{ validator: validator('48, " full", "参数名称", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 编辑
			// 显示状态
			dialogFormInfo: false,
			// 表单
			formInfo: {
				xtcs_id: '',
				cslx: '',
				csmc: '',
				csz: '',
				csms: ''
			},
			// 验证
			rulesFormInfo: {
				csmc: [{ validator: validator('48, "full", "参数名称", false') }],
				csz: [{ trigger: 'change' }],
				csms: [{ validator: validator('128, "less", "参数描述", false') }]
			}
		};
	},
	watch: {
		/* eslint-disable func-names */
		'formInfo.cslx': function (val) {
			switch (val) {
			case '10':
				this.rulesFormInfo.csz = [{ validator: validator('16, "posdouble", "参数值", false') }];
				break;
			case '20':
				this.rulesFormInfo.csz = [{ required: true, message: '参数值不能为空' }];
				break;
			case '30':
				this.rulesFormInfo.csz = [{ validator: validator('64, "less", "参数值", false') }];
				break;
			default:
				this.rulesFormInfo.csz = [{ trigger: 'change' }];
				break;
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
			this.$refs[formName].resetFields();
		},
		// 请求(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/cslbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.xtcslb;
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
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getData();
	}
};
</script>

<style></style>
