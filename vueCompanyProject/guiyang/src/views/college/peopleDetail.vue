<docs>
	## 大学生就业---见习生管理---编辑见习生信息
	* @author SHJ
	* @date 2017年8月15日
	* @desc 编辑
</docs>
<template>
	<!-- 编辑见习生信息 start -->
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<h3 class="title">编辑见习生信息</h3>
		<div class="content" v-loading="loading">
			<!-- 带出信息(不可编辑) start -->
			<el-row class="info">
				<el-col :span="3">姓名</el-col>
				<el-col :span="5">{{ result.yhxm }}</el-col>
				<el-col :span="3">性别</el-col>
				<el-col :span="5">
					<span v-if="result.xb === '1'">男</span>
					<span v-else-if="result.xb === '2'">女</span>
				</el-col>
				<el-col :span="3">户籍</el-col>
				<el-col :span="5">{{ result.hj }}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">现住地址</el-col>
				<el-col :span="5">{{ result.dz }}</el-col>
				<el-col :span="3">毕业院校</el-col>
				<el-col :span="5">{{ result.xxmc }}</el-col>
				<el-col :span="3">毕业日期</el-col>
				<el-col :span="5">{{ result.bysj }}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">所学专业</el-col>
				<el-col :span="5">{{ result.zymc }}</el-col>
				<el-col :span="3">学历</el-col>
				<el-col :span="5">{{ result.xlmc }}</el-col>
				<el-col :span="3">手机号</el-col>
				<el-col :span="5">{{ result.sjh }}</el-col>
			</el-row>
			<!-- 带出信息(不可编辑) end -->
			<!-- 手填信息 start -->
			<el-form :model="form" :rules="rules" ref="form" label-width="37.5%">
				<el-row>
					<el-col :span="8">
						<el-form-item label="欲从事见习职位名称" prop="ycsjxzwmc"
							required class="mulitfix">
							<el-input v-model="form.ycsjxzwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="可到职日期" prop="kdzrq" class="is-required">
							<el-date-picker type="month" v-model="form.kdzrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="见习状态" prop="jxzt" required>
							<select-code v-model="form.jxzt" :hasAll="false"
								code="gyrlzyw_dxs_d_jxzt"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="派遣日期" prop="pqrq" :show-message="form.jxzt !== '10'">
							<el-date-picker type="date" v-model="form.pqrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="见习岗位名称" prop="jxgwmc" :show-message="form.jxzt !== '10'">
							<el-input v-model="form.jxgwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位名称" prop="jxdwmc" :show-message="form.jxzt !== '10'">
							<el-input v-model="form.jxdwmc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="参加过见习" prop="sfcjgjx" required>
							<el-switch v-model="form.sfcjgjx"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="显示" prop="sfxs" required>
							<el-switch v-model="form.sfxs"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 手填信息 end -->
				<!-- 保存按钮 start -->
				<el-row>
					<el-col>
						<el-form-item label-width="12.5%">
							<el-button type="primary" native-type="submit"
								@click.prevent="save('form')"
								:loading="loadingSave">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 保存按钮 end -->
			</el-form>
		</div>
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'collegePeopleDetail',
	components: {
		selectCode,
		breadCrumb
	},
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			colorOn,
			colorOff,
			// 表单加载状态
			loading: false,
			// 数据(编辑/提交项)
			form: {
				yh_id: '',
				ycsjxzwmc: '',
				kdzrq: '',
				jxzt: '10',
				sfcjgjx: '',
				sfxs: '',
				pqrq: '',
				jxgwmc: '',
				jxdwmc: '',
				jxs_id: ''
			},
			// 验证规则
			rules: {
				ycsjxzwmc: [{ validator: validator('32, "full", "欲从事见习职位名称", false') }],
				pqrq: [{ required: false }],
				jxgwmc: [{ validator: validator('32, "full", "见习岗位名称", true') }],
				jxdwmc: [{ validator: validator('128, "less", "见习单位名称", true') }]
			},
			result: {},
			// 保存按钮 使用状态
			loadingSave: false
		};
	},
	watch: {
		// 验证动态变更
		/* eslint-disable func-names */
		'form.jxzt': function (val) {
			if (val === '20' || val === '30' || val === '40') {
				this.rules.pqrq = [{ required: true, message: '派遣日期不能为空' }];
				this.rules.jxgwmc = [{ required: true, message: '见习岗位名称不能为空' },
					{ validator: validator('32, "full", "见习岗位名称", false') }];
				this.rules.jxdwmc = [{ required: true, message: '见习单位名称不能为空' },
					{ validator: validator('32, "less", "见习单位名称", false') }];
			} else {
				this.rules.pqrq = [{ required: false }];
				this.rules.jxgwmc = [{ validator: validator('32, "full", "见习岗位名称", true') }];
				this.rules.jxdwmc = [{ validator: validator('128, "less", "见习单位名称", true') }];
			}
		}
	},
	methods: {
		// 查询
		getData() {
			this.loading = true;
			const data = {
				grjl_id: this.$route.params.grjl_id,
				grjbxx_id: this.$route.params.grjbxx_id,
				yh_id: this.$route.params.yh_id
			};
			$.get('/gyrcht/dxsjy/dxsjy/jxsbjCx', {
				params: data
			}).then((res) => {
				const info = res.returnData.jxs;
				this.result = info;
				Object.keys(this.form).forEach((item) => {
					if (item !== 'jxzt') {
						this.form[item] = info[item];
					}
				});
				if (!this.form.sfxs) {
					this.form.sfxs = '1';
				}
				if (!this.form.sfcjgjx) {
					this.form.sfcjgjx = '0';
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
				}
			});
		},
		// 执行保存(post)
		postData() {
			this.loadingSave = true;
			if (typeof this.form.kdzrq === 'object') {
				this.form.kdzrq = this.yyyyMM(this.form.kdzrq);
			}
			$.post('/gyrcht/dxsjy/dxsjy/jxsBc', this.form)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功',
							showClose: true,
							onClose: () => {
								this.$router.go(-1);
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
						this.loadingSave = false;
					}
				}).catch(() => {
					this.loadingSave = false;
				});
		},
		// 日期值格式化(年-月)(string)
		yyyyMM(date) {
			const year = date.getFullYear();
			let month = `${date.getMonth() + 1}`;
			month = month.length === 1 ? `0${month}` : `${month}`;
			return `${year}-${month}`;
		}
	},
	// 初始化带数据
	created() {
		this.getData();
	},
	// 导航到改组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (!to.params.grjl_id && !to.params.grjbxx_id && !to.params.yh_id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
