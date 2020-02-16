<docs>
	## 审批管理---域名审批
	* @author SHJ
	* @date ###### 2017年8月11日
	* @desc 查询、审批
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="queryForm" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="域名地址" prop="ymdz">
							<el-input  v-model="form.ymdz"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input  v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="提交日期">
							<date-ass
								:begin.sync="form.tjrqq" :end.sync="form.tjrqz"
								propBegin="tjrqq" propEnd="tjrqz"></date-ass>
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
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="域名地址" prop="ymdz">
					</el-table-column>
					<el-table-column label="单位名称" prop="dwmc">
					</el-table-column>
					<el-table-column label="提交日期" prop="tjrq" min-width="110">
					</el-table-column>
					<el-table-column label="操作" width="90">
						<template scope="operate">
							<el-button
								:disabled="btns.ymsp === false"
								icon="btn-approval" title="审批" size="mini" type="primary"
								@click="approval(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:current-page.sync="formRight.pageNum"
					@current-change="getData" >
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- 审批操作弹窗 start -->
		<el-dialog title="审批详情" size="tiny" v-model="dialogApp"
			@close="closeApp('formApp')">
			<el-form ref="formApp" :model="formApp" :rules="formAppRules" :label-width="labelWidth">
				<el-form-item label="域名地址" prop="ymdz">
					<el-input  v-model="formApp.ymdz" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="审批状态" required prop="spzt">
					<el-select v-model="formApp.spzt" class="width_100">
						<el-option label="审批通过" value="30"></el-option>
						<el-option label="审批拒绝" value="40"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审批备注" prop="spbz">
					<el-input type="textarea" v-model="formApp.spbz" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="save('formApp')">提交</el-button>
			</div>
		</el-dialog>
		<!-- 审批操作弹窗 end -->
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';

export default {
	name: 'domain',
	components: { dateAss },
	data() {
		return {
			// 页面是否从首页来
			fromIndex: false,
			// 按钮权限
			btns: {},
			// 统一的label宽度
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				ymdz: '',
				dwmc: '',
				tjrqq: '',
				tjrqz: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ymdz: { validator: validator('128, "less", "域名地址", true') },
				dwmc: { validator: validator('64, "less", "单位名称", true') }
			},
			// 查询结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 审批详情
			// 弹窗状态
			dialogApp: false,
			// 待提交表单
			formApp: {
				ymdz: '',
				ejym_id: '',
				spzt: '30',
				spbz: ''
			},
			// 校验规则
			formAppRules: {
				spzt: [{ required: true, message: '审批状态不能为空' }],
				spbz: [{ validator: validator('256, "bz", "审批备注", true') }]
			}
		};
	},
	methods: {
		// ====================> 查询
		// 按钮
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
		// 接口(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/spgl/ejymsp/ejymlbCx', {
				params: this.formRight
			}).then((res) => {
				const data = res.returnData.ejymsplb;
				this.results = data;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
				if (this.fromIndex) {
					this.formApp.ymdz = data[0].ymdz;
					this.formApp.ejym_id = data[0].ejym_id;
					this.dialogApp = true;
					this.fromIndex = false;
				} else {
					this.formApp.ymdz = '';
					this.formApp.ejym_id = '';
					this.fromIndex = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// ====================> 审批
		// 按钮
		approval(thisRow) {
			// 带入选中行信息
			setTimeout(() => {
				this.formApp.ymdz = thisRow.ymdz;
				this.formApp.ejym_id = thisRow.ejym_id;
			}, 5);
			// 弹出审批详情
			this.dialogApp = true;
		},
		// 提交
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogApp = false;
					this.putData();
				}
			});
		},
		// 关闭
		closeApp(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogApp = false;
		},
		// 接口(put)
		putData() {
			this.loading = true;
			const data = {
				ejym_id: this.formApp.ejym_id,
				spzt: this.formApp.spzt,
				spbz: this.formApp.spbz
			};
			$.put('/gyrcht/spgl/ejymsp/ejymXg', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.resetForm('formApp');
						this.getData();
						this.$message.success('审批提交成功!');
					}
				}).catch(() => {
					this.loading = false;
				});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 页面重载
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	},
	// 在进入改路由之前
	beforeRouteEnter(to, from, next) {
		// 判断是否是从主页跳转过来
		if (to.params.domain) {
			next((vm) => {
				vm.form.ymdz = to.params.domain;
				vm.formRight.ymdz = to.params.domain;
				vm.fromIndex = true;
			});
		} else {
			next();
		}
	}
};
</script>

<style></style>
