<docs>
	## 职业培训---培训方向--新增编辑
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div class="content" v-loading="loading">
			<el-form :model="form" :label-width="labelWidth" :rules="rules"
				ref="formInfo">
				<el-row>
					<el-col :span="6">
						<el-form-item label="培训方向名称" prop="pxfxmc" required>
							<el-input v-model="form.pxfxmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="宣传词" prop="xcc" required>
							<el-input v-model="form.xcc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="网站宣传图" prop="xctlj">
							<upload-img :uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="zypx"
								:maxSize="500"
								:clientName.sync="form.xctkhdmc"
								:serverPath.sync="form.xctlj"
								:serverName.sync="form.xctfwdmc"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="APP宣传图" prop="xctlj_app">
							<upload-img :uploadPic="canUpload"
									:downloadPic="canDownload"
									modeName="zypx"
									:maxSize="500"
									:clientName.sync="form.xctkhdmc_app"
									:serverPath.sync="form.xctlj_app"
									:serverName.sync="form.xctfwdmc_app"></upload-img>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<!-- <el-col :span="18">
						<el-form-item label="网站培训介绍" prop="pxfxjs" required>
							<el-input type="textarea" v-model="form.pxfxjs"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="23">
						<el-form-item label="网站培训介绍" prop="pxfxjs">
							<vueUEditor @ready="editor" :defaultValue="form.pxfxjs" ></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<!-- <el-col :span="18">
						<el-form-item label="APP培训介绍" prop="pxfxjs_app" required>
							<el-input type="textarea" v-model="form.pxfxjs_app"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="23">
						<el-form-item label="APP培训介绍" prop="pxfxjs_app">
							<vueUEditor @ready="editorApp" :defaultValue="form.pxfxjs_app" ></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item>
							<el-button type="primary" @click="save('formInfo')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import vueUEditor from '@/common/vue/vueUEditor';
import addressSelect from '@/common/vue/multiSelect/addressSelect';
import breadCrumb from '@/common/vue/breadCrumb';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import uploadImg from '@/common/vue/uploadImg';
import majorSelect from '@/common/vue/multiSelect/majorSelect';
import { Base64 } from 'js-base64';
import $ from '@/common/js/axios';

export default {
	name: 'trainingDirectionDetail',
	props: {
		dwxxId: {
			type: String
		},
		yhid: {
			type: String,
			default: ''
		},
		canSave: {
			type: Boolean,
			default: true
		},
		canUpload: {
			type: Boolean,
			default: true
		},
		canDownload: {
			type: Boolean,
			default: true
		}
	},
	components: {
		breadCrumb, dateAss, selectCode, uploadImg, addressSelect, majorSelect, vueUEditor
	},
	data() {
		return {
			labelWidth,
			loading: false,
			// 判断select组件触发change事件的标志
			changeDwFlag: false,
			// 双向绑定数据
			form: {
				pxfx_id: '',
				pxfxmc: '',
				xcc: '',
				xctlj: '',
				xctfwdmc: '',
				xctkhdmc: '',
				xctlj_app: '',
				xctfwdmc_app: '',
				xctkhdmc_app: '',
				pxfxjs: '',
				pxfxjs_app: ''
			},
			rules: {
				pxfxmc: [{ validator: validator('32, "normal", "培训方向名称名称", false') }],
				xcc: [{ validator: validator('64, "normal", "宣传词", false') }]
			},
			// 富文本
			editorInstance: null,
			editorInstanceApp: null
		};
	},
	methods: {
		// 编辑考试报名信息查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/zypxgl/zypx/pxfxidCx', {
				params: {
					pxfx_id: this.$route.params.pxfx_id
				}
			}).then((res) => {
				const { pxfxidlb } = res.returnData;
				Object.keys(this.form).forEach((item) => {
					if (item !== 'ksmc' && item !==	'bk_id' && item !==	'czlx') {
						this.form[item] = pxfxidlb[item];
					}
				});
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 提交表单信息
		postData() {
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			this.loading = true;
			const postData = Object.assign({}, this.form);
			postData.pxfxjs = Base64.encode(this.editorInstance.getContent());
			postData.pxfxjs_app = Base64.encode(this.editorInstanceApp.getContent());
			$.post('/gyrcht/zypxgl/zypx/pxfxxjbjBc', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功！');
					this.$router.go(-1);
					// this.$router.push({ name: 'trainingDirection' });
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		},
		// 富文本编辑器
		editorApp(instance) {
			this.editorInstanceApp = instance;
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// if (this.sfkybjbmksxx === '1') {
					// 	this.$message.warning('已分配考生不允许修改');
					// } else {
					this.postData();
					// }
				}
			});
		}
	},
	computed: {
		// 判断新建还是编辑
		isNew() {
			return this.$route.params.isNew;
		}
	},
	watch: {
		/* eslint-disable func-names */
	},
	created() {
		if (!this.isNew) {
			this.getData();
		}
	},
	// ,
	beforeRouteEnter(to, from, next) {
		if (to.params.isNew === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
