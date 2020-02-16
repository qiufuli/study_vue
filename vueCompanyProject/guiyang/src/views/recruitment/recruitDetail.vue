<docs>
	## 招聘会管理----招聘会信息
	@date ###### 2017年9月25日
	@author SHJ
	@desc 保存
	## 遗留问题
	* 举办场所、展位数要从系统参数中读取，暂写死，需修改
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div v-loading="loading">
			<el-form :model="form" :rules="rules" label-width="37.5%"
				ref="form">
				<el-row>
					<el-col :span="16">
						<el-form-item label="招聘会标题" prop="zphbt" label-width="18.75%" class="is-required">
							<el-input v-model="form.zphbt"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="招聘会介绍" prop="zphjs" label-width="12.5%" class="is-required">
							<vueUEditor @ready="editor" :defaultValue="form.zphjs"></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="招聘会日期" prop="zphrq">
							<el-date-picker v-model="form.zphrq" :editable="false"
								class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="主办单位" prop="zbdw" required>
							<el-input v-model="form.zbdw"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="展办城市" prop="zbcs" required>
							<el-input v-model="form.zbcs"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="举办场所" prop="jbcs" required label-width="18.75%">
							<el-input v-model="form.jbcs"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="展位数" prop="zws" required>
							<el-input v-model="form.zws"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系电话" prop="lxdh">
							<el-input v-model="form.lxdh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系人" prop="lxr">
							<el-input v-model="form.lxr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮箱" prop="dzyx">
							<el-input v-model="form.dzyx"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show="canSave !== false">
					<el-col :span="24">
						<el-form-item label="" label-width="12.5%">
							<el-button type="primary" @click="save('form')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import vueUEditor from '@/common/vue/vueUEditor';
import $ from '@/common/js/axios';
import { Base64 } from 'js-base64';

export default {

	name: 'recruitmentDetail',
	components: { vueUEditor, breadCrumb },
	data() {
		// const checkTitle = (rule, value, callback) => {
		// 	$.get('/gyrcht/zphgl/zphgl/zphbtCx', {
		// 		params: {
		// 			zph_id: this.form.zph_id,
		// 			zphbt: value,
		// 			czlx: this.form.czlx
		// 		}
		// 	}).then((res) => {
		// 		if (res.returnData.executeResult === '1') {
		// 			return callback();
		// 		}
		// 		return callback(new Error(res.returnData.message));
		// 	}).catch(() => { });
		// };
		return {
			loading: false,
			// 招聘会详情 form和校验规则
			dateOption: {
				disabledDate(time) {
					return time.getTime() < new Date().getTime();
				}
			},
			form: {
				zphbt: '',
				zphrq: '',
				zphjs: '',
				zbdw: '贵阳市人力资源市场',
				zbcs: '贵阳市',
				jbcs: '',
				zws: '',
				lxdh: '',
				lxr: '',
				dzyx: '',
				zph_id: '',
				czlx: ''
			},
			rules: {
				zphbt: [{ validator: validator('48, "full", "招聘会标题", false') }],
				zphrq: [{ required: true, message: '招聘会日期不能为空' }],
				zbdw: [{ validator: validator('16, "full", "主办单位", false') }],
				zbcs: [{ validator: validator('6, " full", "展办城市", false') }],
				jbcs: [{ validator: validator('40, "less", "举办场所", false') }],
				zws: [{ validator: validator('3, "number", "展位数", false') }],
				lxdh: [{ validator: validator('32, "lxdh", "联系电话",true') }],
				lxr: [{ validator: validator('32, "full", "联系人",true') }],
				dzyx: [{ validator: validator('32, "email", "邮箱",true') }]
			},
			// 富文本
			editorInstance: null,
			canSave: true
		};
	},
	methods: {
		// 查询现场招聘会详细信息。
		getData() {
			this.loading = true;
			$.get('/gyrcht/zphgl/zphgl/zphxxCx', {
				params: {
					zph_id: this.form.zph_id
				}
			}).then((res) => {
				Object.keys(this.form).forEach((item) => {
					if (item !== 'czlx') {
						this.form[item] = res.returnData.zphxx[item];
					}
				});
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 编辑或新建，现场招聘会详细信息保存
		putData() {
			this.loading = true;
			const postData = Object.assign({}, this.form);
			postData.zphjs = Base64.encode(this.editorInstance.getContent());
			// postData.zphjs = this.editorInstance.getContent();
			$.put('/gyrcht/zphgl/zphgl/zphxxXg', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: 'recruit' });
						}
					});
				} else {
					this.$message.error(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.editorInstance.hasContents()) {
						this.putData();
					} else {
						this.$message.warning('招聘会简介不能为空');
					}
				}
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		}
	},
	created() {
		if (this.$route.params.isNew) {
			this.form.czlx = '0';
			this.form.jbcs = this.$route.params.jbcs;
			this.form.zws = this.$route.params.zws;
		} else {
			this.form.czlx = '1';
			this.form.zph_id = this.$route.params.id;
			this.getData();
			this.canSave = this.$route.params.canSave;
		}
	},
	// 导航到该组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (to.params.id === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style></style>
