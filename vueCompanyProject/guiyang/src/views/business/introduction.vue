<docs>
		## 现场招聘会海报打印，简介录入
		* @date ###### Thu Aug 31 17:51:48 CST 2017
		* @author jinglf000
		* @desc 现场招聘会简介，查询录入页面
</docs>
<template>
		<div>
			<bread-crumb></bread-crumb>
			<p class="co_name">当前单位：{{coName}}</p>
			<div class="detail_wrap" v-loading="loading">
				<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="form">
					<el-row>
						<el-col :span="8">
							<el-form-item label="联系人" prop="lxr">
								<el-input v-model="form.lxr"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="联系电话" prop="lxfs">
								<el-input v-model="form.lxfs"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="联系地址" prop="lxdz">
								<el-input v-model="form.lxdz"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item label="网上版简介" prop="dwjj">
							<vueUEditor @ready="editorWeb" :defaultValue="form.dwjj"></vueUEditor>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="打印版本简介" prop="dybjj">
							<el-input v-model="form.dybjj" type="textarea" :autosize="{ minRows: 4 }"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item label="备注" prop="bz">
							<el-input v-model="form.bz" type="textarea" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item >
							<el-button type="primary" @click="saveForm('form')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import vueUEditor from '@/common/vue/vueUEditor';
import breadCrumb from '@/common/vue/breadCrumb';
import { Base64 } from 'js-base64';

export default {
	name: 'bussIntroductionX',
	components: { vueUEditor, breadCrumb },
	data() {
		return {
			coName: '',
			// 父组件
			parentName: '',
			// 全局变量
			labelWidth,
			// 单位id
			companyId: '',
			// 加载状态
			loading: false,
			// 表单
			form: {
				dwxx_id: '',
				lxr: '',
				lxfs: '',
				lxdz: '',
				dwjj: '',
				dybjj: '',
				bz: ''
			},
			// 校验
			rules: {
				lxr: [{ validator: validator('64, "full", "联系人", true') }],
				lxfs: [{ validator: validator('32, "lxfs ", "联系电话", true') }],
				lxdz: [{ validator: validator('256, " full ", "联系地址", true') }],
				bz: [{ validator: validator('512, "less", "备注", true') }]
			},
			// 富文本
			editorInstance: null
		};
	},
	methods: {
		// 查询信息接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/xczpdy/jjlrCx', {
				params: { dwxx_id: this.companyId, zphbs: '0' }
			}).then((res) => {
				this.loading = false;
				Object.keys(this.form).forEach((item) => {
					this.form[item] = res.returnData.jjxx[item];
				});
			}).catch(() => {
				this.loading = false;
			});
		},
		// 信息保存接口
		putData() {
			this.form.zphbs = '0';
			this.loading = true;
			const postData = Object.assign({}, this.form);
			postData.dwjj = Base64.encode(this.editorInstance.getContent());
			// postData.dwjj = this.editorInstance.getContent();
			$.put('/gyrcht/ywgl/xczpdy/jjlrBc', postData).then((res) => {
				const data = res.returnData;
				if (data.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功！',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: this.parentName });
						}
					});
				} else {
					this.$message.error(data.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存按钮 handle
		saveForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				}
			});
		},
		// 网上版简介 富文本
		editorWeb(instance) {
			this.editorInstance = instance;
		}
	},
	created() {
		const data = this.$route.params;
		this.coName = data.coName;
		this.companyId = data.id;
		this.parentName = data.parentName;
		this.getData();
	},
	// 判断是否有id
	beforeRouteEnter(to, from, next) {
		if (!to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style>

</style>
