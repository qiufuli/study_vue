<docs>
	## 大学生就业---见习生派遣管理---见习生派遣信息
	* @author SHJ
	* @date ###### 2017年8月15日
	* @desc 编辑
</docs>
<template>
	<!-- 编辑见习生派遣信息 start -->
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<h3 class="title">编辑见习生派遣信息</h3>
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
				<el-col :span="3">身份证号码</el-col>
				<el-col :span="5">{{ result.sfzhm }}</el-col>
				<el-col :span="3">出生日期</el-col>
				<el-col :span="5">{{ result.sr }}</el-col>
				<el-col :span="3">年龄</el-col>
				<el-col :span="5">{{ result.nl }}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">毕业院校</el-col>
				<el-col :span="5">{{ result.xxmc }}</el-col>
				<el-col :span="3">毕业日期</el-col>
				<el-col :span="5">{{ result.bysj }}</el-col>
				<el-col :span="3">所学专业</el-col>
				<el-col :span="5">{{ result.zymc }}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">学历</el-col>
				<el-col :span="5">{{ result.xlmc }}</el-col>
				<el-col :span="3">手机号</el-col>
				<el-col :span="5">{{ result.sjh }}</el-col>
			</el-row>
			<!-- 带出信息(不可编辑) end -->
			<el-form :model="form" ref="form" :rules="rules" label-width="37.5%">
				<!-- 手填表单 start -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位名称" prop="jxdwmc" required>
							<el-input v-model="form.jxdwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="见习岗位名称" prop="jxgwmc" required>
							<el-input v-model="form.jxgwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="派遣日期" prop="pqrq">
							<el-date-picker type="date" v-model="form.pqrq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="见习状态" prop="jxzt" required>
							<el-select v-model="form.jxzt" class="width_100">
								<el-option value="20" label="见习中"></el-option>
								<el-option value="30" label="结束见习"></el-option>
								<el-option value="40" label="留用"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否显示" prop="sfxs" required>
							<el-switch v-model="form.sfxs"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 手填表单 end -->
				<!-- 保存按钮 start -->
				<el-row>
					<el-col>
						<el-form-item label-width="12.5%">
							<el-button type="primary" native-type="submit" :loading="loadingSave"
								@click.prevent="save('form')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 保存按钮 end -->
			</el-form>
		</div>
	</div>
	<!-- 编辑见习生派遣信息 end -->
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'collegeManageDetail',
	components: {
		breadCrumb
	},
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// @ 统一的开关颜色
			colorOn,
			colorOff,
			// 页面加载状态
			loading: false,
			form: {
				jxdwmc: '',
				jxgwmc: '',
				pqrq: '',
				jxzt: '',
				sfxs: '0',
				jxs_id: ''
			},
			result: {},
			// 验证规则
			rules: {
				jxdwmc: [{ validator: validator('128, "less", "见习单位名称", false') }],
				jxgwmc: [{ validator: validator('32, "full", "见习岗位名称", false') }],
				pqrq: [{ required: true, message: '请选择派遣日期' }],
				jxzt: [{ required: true, message: '请选择见习状态' }]
			},
			// 保存执行状态
			loadingSave: false
		};
	},
	methods: {
		getData() {
			this.loading = true;
			$.get('/gyrcht/dxsjy/dxsjy/jxspqbjCx', {
				params: {
					jxs_id: this.$route.params.jxs_id,
					grjl_id: this.$route.params.grjl_id,
					grjbxx_id: this.$route.params.grjbxx_id
				}
			}).then((res) => {
				this.result = res.returnData.jxs;
				Object.keys(this.form).forEach((item) => {
					this.form[item] = this.result[item];
				});
				if (!this.form.sfxs) {
					this.form.sfxs = '0';
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// * 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.thisRouteName = this.$route.name;
					this.postData();
				}
			});
		},
		// * 执行保存(post)
		postData() {
			this.loadingSave = true;
			$.post('/gyrcht/dxsjy/dxsjy/jxspqBc', this.form)
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
		}
	},
	// 初始化带数据
	created() {
		this.getData();
	},
	// 导航到改组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (!to.params.jxs_id && !to.params.grjl_id && !to.params.grjbxx_id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style scoped>
.width_100 {
	width: 100%;
}
</style>

