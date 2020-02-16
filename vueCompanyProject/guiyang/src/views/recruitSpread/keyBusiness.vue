<docs>
	##求职招聘---热门企业
	* @author ChenXue
	* @date 2018年7月11日
	* @desc 查询 / 添加 / 删除热门企业
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
						<el-form-item label="热门行业" prop="zdhy">
							<business-select v-model="form.zdhy_id"></business-select>
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
						<el-button class="btn_square"
							size="small"
							type="primary"
							icon="plus"
							@click="addKeyCompany('formType')">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="单位名称" prop="dwmc" width="250"></el-table-column>
					<el-table-column label="手机号" prop="sjh"></el-table-column>
					<el-table-column label="经济类型" prop="dwxz" width="100"></el-table-column>
					<el-table-column label="单位规模" prop="dwgm"></el-table-column>
					<el-table-column label="所属行业" prop="sshy"></el-table-column>
					<el-table-column label="热门行业" prop="zdhymc"></el-table-column>
					<el-table-column label="注册资金" prop="zczj"></el-table-column>
					<el-table-column label="创建日期" prop="cjsj"></el-table-column>
					<el-table-column label="操作" width="90" prop="hyid">
						<template scope="scope">
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row.zdqy_id)"></el-button>
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
		<!-- 添加 热门企业 开始 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.state" size="tiny" class="dialog">
			<el-form :model="formDialog" ref="formType" :rules="rulesDialog" :label-width="labelWidth">
				<el-form-item label="热门行业" prop="zdhy_id">
					<business-select v-model="formDialog.zdhy_id"></business-select>
				</el-form-item>
				<!-- <el-form-item prop="zdhy_id" label="热门企业">
					<el-input v-model="dialog.keyBus" readonly class="input_no_border"></el-input>
				</el-form-item> -->
				<el-form-item label="单位名称" prop="dwmc" required>
					<el-autocomplete v-model="formDialog.dwmc"
						:fetch-suggestions="suggestionCompany"
						:props="dwmcProp"
						class="width_100"
						@select="selectDwmc"></el-autocomplete>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogCancel('formType')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formType')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 添加 热门企业 结束 -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import businessSelect from '@/common/vue/multiSelect/businessSelect';
import $ from '@/common/js/axios';

export default {
	name: 'keyBusiness',
	data() {
		return {
			labelWidth,
			// ====================>查询
			// 加载状态
			loading: false,
			// 热门企业列表
			keyBusLists: [],
			// 双向绑定数据
			form: {
				dwmc: '',
				zdhy_id: '',
				// zdhy: '',
				pageNum: 1
			},
			// 添加热门企业 双向绑定数据
			formDialog: {
				dwmc: '',
				dwxx_id: '',
				zdhy_id: ''
			},
			rulesDialog: {
				dwmc: [{ validator: validator('64, "normal", "企业名称", false') }]
			},
			// 企业名称 添加 弹框
			dialog: {
				state: false,
				titile: '',
				keyBus: ''
			},
			// 克隆表单（用于提交）
			formRight: {},
			dwmcProp: {
				value: 'dwmc',
				label: 'dwmc'
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0
		};
	},
	methods: {
		// =============================> 查
		// 获取热门企业下拉列表 /gyrcht/zdhy/zdhy/zdhyCx
		getKeyBusLists() {
			$.get('/gyrcht/zdhy/zdhy/zdhyejldCx', {}).then((res) => {
				this.keyBusLists = res.returnData.zdhyejld;
			}).catch(() => {
			});
		},
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
			this.form.dwmc = '';
			this.form.zdhy_id = '';
		},
		// 重点企业 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zdhy/zdhy/zdhyqyCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.zdhyqylb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// =============================> 增
		// 热门企业 添加按钮
		addKeyCompany(formName) {
			// dialog对话框
			this.dialog.state = true;
			this.dialog.title = '添加热门企业';
			// 表单重置
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
		},
		// 弹框 保存接口
		postData() {
			// post 接口
			$.post('/gyrcht/zdhy/zdhy/zdhyBj', {
				dwxx_id: this.formDialog.dwxx_id,
				zdhy_id: this.formDialog.zdhy_id
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('热门企业添加成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 弹框 确定按钮
		dialogSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					this.dialog.state = false;
				}
			});
		},
		// 弹框 取消按钮
		dialogCancel(formName) {
			this.dialog.state = false;
			this.$refs[formName].resetFields();
		},
		// 单位输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		suggestionCompany(query, cb) {
			// 先进行数据校验
			this.$refs.formType.validateField('dwmc', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ywgl/zpbl/dwmclxCx', {
							params: { dwmc: query }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.dwmclb);
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
		// 弹框 选择单位名称 获取单位ID
		selectDwmc(item) {
			this.formDialog.dwxx_id = item.dwxx_id;
		},
		//  =============================> 删
		// 弹窗 删除按钮
		btnDelete(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delZdqy(id);
			}).catch(() => {});
		},
		// 弹窗 删除接口
		delZdqy(id) {
			this.loading = true;
			$.post('/gyrcht/zdhy/zdhy/zdhyqySc', {
				zdqy_id: id
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	watch: {
		/* eslint-disable func-names */
		'form.zdhy_id': function (val) {
			this.keyBusLists.forEach((upperItem) => {
				upperItem.children.forEach((childItem) => {
					if (childItem.id === val) {
						this.dialog.keyBus = childItem.name;
						this.formDialog.zdhy_id = val;
					}
				});
			});
		}
	},
	created() {
		this.getData();
		Object.assign(this.formRight, this.form);
	},
	mounted() {
		this.getKeyBusLists();
	},
	components: { businessSelect }
};
</script>

<style></style>
