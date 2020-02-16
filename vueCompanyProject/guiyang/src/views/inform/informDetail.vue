<docs>
	## 资讯管理---资讯维护--新增编辑
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div class="content" v-loading="loading">
			<el-form :model="form" :label-width="labelWidth" :rules="rules"
				ref="formInfo">
				<el-row>
					<el-col :span="6">
						<el-form-item label="标题" prop="bt" required>
							<el-input v-model="form.bt"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="父类型" prop="flxbh">
							<el-select class="width_100" v-model="form.flxbh"
								@change="changeFlx" clearable>
								<el-option class="control_list" v-for="(item, index) in flxList"
									:key="index"
									:label="item.flxmc"
									:value="item.flxbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="子类型" prop="zlx_id">
							<el-select class="width_100" v-model="form.zlx_id" clearable>
								<el-option class="control_list" v-for="(item, index) in zlxList"
									:key="index"
									:label="item.zlxmc"
									:value="item.zlx_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-tabs type="border-card" v-model="tabsName">
						<el-tab-pane label="Web" name="WebInfo">
							<el-row>
								<el-form-item label="web封面模板" prop="web_fmmblx">
									<el-radio-group v-model="form.web_fmmblx">
										<el-radio :label="20">模板一</el-radio>
										<el-radio :label="21">模板二</el-radio>
										<el-radio :label="22">模板三</el-radio>
										<el-radio :label="23">模板四</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item label="是否关闭评论" prop="web_sfgbpl" >
										<el-switch v-model="form.web_sfgbpl"
											on-value="1" on-text="是" :on-color="colorOn"
											off-value="0" off-text="否" :off-color="colorOff"></el-switch>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="form.web_fmmblx===21? 6 : 4" v-for="(item, index) in form.web_fmtp" :key="index">
									<el-form-item :label="index===0 ? '封面' : ''" prop="fmtplj">
										<upload-img :uploadPic="canUpload"
											:class="form.web_fmmblx===21? '' : 'square'"
											:downloadPic="canDownload"
											modeName="zxfmtp"
											:maxSize="500"
											:clientName.sync="item.fmtpkhdmc"
											:serverPath.sync="item.fmtplj"
											:serverName.sync="item.fmtpfwdmc"></upload-img>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="23">
									<el-form-item label="web资讯内容" prop="web_zxnr">
										<vueUEditor @ready="editor" :defaultValue="form.web_zxnr" ></vueUEditor>
									</el-form-item>
								</el-col>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="App" name="baseInfo">
							<el-row>
								<el-form-item label="app封面模板" prop="app_fmmblx">
									<el-radio-group v-model="form.app_fmmblx">
										<el-radio :label="10">模板一</el-radio>
										<el-radio :label="11">模板二</el-radio>
										<el-radio :label="12">模板三</el-radio>
										<el-radio :label="13">模板四</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item label="是否关闭评论" prop="app_sfgbpl" >
										<el-switch v-model="form.app_sfgbpl"
											on-value="1" on-text="是" :on-color="colorOn"
											off-value="0" off-text="否" :off-color="colorOff"></el-switch>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="form.app_fmmblx===11? 6 : 4" v-for="(item, index) in form.app_fmtp" :key="index">
									<el-form-item :label="index===0 ? '封面' : ''" prop="fmtplj">
										<upload-img :uploadPic="canUpload"
											:class="form.app_fmmblx===11? '' : 'square'"
											:downloadPic="canDownload"
											modeName="zxfmtp"
											:maxSize="500"
											:clientName.sync="item.fmtpkhdmc"
											:serverPath.sync="item.fmtplj"
											:serverName.sync="item.fmtpfwdmc"></upload-img>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="23">
									<el-form-item label="app资讯内容" prop="app_zxnr">
										<vueUEditor @ready="editorApp" :defaultValue="form.app_zxnr" ></vueUEditor>
									</el-form-item>
								</el-col>
							</el-row>
						</el-tab-pane>
					</el-tabs>
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
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import vueUEditor from '@/common/vue/vueUEditor';
import breadCrumb from '@/common/vue/breadCrumb';
import uploadImg from '@/common/vue/uploadImg';
import $ from '@/common/js/axios';
import { Base64 } from 'js-base64';

export default {
	name: 'informDetail',
	components: { breadCrumb, vueUEditor, uploadImg },
	props: {
		canUpload: {
			type: Boolean,
			default: true
		},
		canDownload: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			labelWidth,
			colorOn,
			colorOff,
			loading: false,
			// 判断select组件触发change事件的标志
			changeFlxFlag: false,
			tabsName: 'WebInfo',
			// 双向绑定数据
			form: {
				zx_id: '',
				bt: '',
				flxbh: '',
				zlx_id: '',
				czlx: '',
				app_zxnr: '',
				web_zxnr: '',
				app_fmmblx: 10,
				web_fmmblx: 20,
				app_fmtp: [],
				web_fmtp: [],
				web_sfgbpl: '0',
				app_sfgbpl: '0',
				pageNum: 1
			},
			// 关键词相关
			inputVisible: false,
			inputValue: '',
			rules: {
				bt: [{ validator: validator('128, "titleLess", "问题名称", false') }],
				flxbh: [{ required: true, message: '请选择父类型' }]
			},
			// 富文本
			editorInstance: null,
			editorInstanceApp: null,
			flxList: [],
			zlxList: [],
			selectFlxbh: '',
			appFmmblx: '',
			webFmmblx: '',
			webFmtp: [],
			appFmtp: []
		};
	},
	methods: {
		// 编辑 资讯内容
		getData() {
			this.loading = true;
			$.get('/gyrcht/zxgl/xxzx/xxzxCx_byid', {
				params: {
					zx_id: this.$route.params.zx_id
				}
			}).then((res) => {
				const { zx } = res.returnData;
				Object.keys(this.form).forEach((item) => {
					if (item === 'web_fmmblx' || item === 'app_fmmblx') {
						this.form[item] = parseInt(zx[item], 10);
					} else if (item !==	'czlx' && item !== 'pageNum' && item !== 'web_fmmblx' && item !== 'app_fmmblx') {
						this.form[item] = zx[item];
					}
				});
				this.webFmmblx = this.form.web_fmmblx;
				this.appFmmblx = this.form.app_fmmblx;
				this.webFmtp = this.form.web_fmtp;
				this.appFmtp = this.form.app_fmtp;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 父子类型
		// 获取 父类型 下拉列表
		getFlxList() {
			$.get('/gyrcht/zxgl/xxzx/xxzxflxCx', {
				params: { czlx: '10' }
			}).then((res) => {
				this.flxList = res.returnData.flxlb;
			}).catch(() => {});
		},
		// 获取 子类型 下拉列表
		getZlxList() {
			$.get('/gyrcht/zxgl/xxzx/xxzxzlxCx', {
				params: {
					flxbh: this.selectFlxbh,
					czlx: '10'
				}
			}).then((res) => {
				this.zlxList = res.returnData.zlxlb;
			}).catch(() => {});
		},
		// 父类型 change 事件
		changeFlx(val) {
			this.selectFlxbh = val;
			this.zlxList = [];
			if (this.changeFlxFlag) {
				this.form.zlx_id = '';
			} else {
				this.changeFlxFlag = true;
			}
			if (val) {
				this.getZlxList();
			}
		},
		// 提交表单信息
		postData() {
			this.loading = true;
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			const postData = Object.assign({}, this.form);
			postData.web_zxnr = Base64.encode(this.editorInstance.getContent());
			postData.app_zxnr = Base64.encode(this.editorInstanceApp.getContent());
			$.post('/gyrcht/zxgl/xxzx/xxzxBc', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: 'informManage' });
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.editorInstance.hasContents() && this.editorInstanceApp.hasContents()) {
						this.postData();
					} else if (!this.editorInstance.hasContents()) {
						this.$message.warning('web资讯内容不能为空');
					} else if (!this.editorInstanceApp.hasContents()) {
						this.$message.warning('app资讯内容不能为空');
					}
				}
			});
		},
		// WEB富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		},
		// APP富文本编辑器
		editorApp(instance) {
			this.editorInstanceApp = instance;
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
		'form.web_fmmblx': function (val) {
			const codeWebNum = {
				20: 0,
				21: 1,
				22: 1,
				23: 3
			};
			if (this.$route.params.zx_id && this.webFmmblx === val) {
				this.form.web_fmtp = this.webFmtp;
			} else {
				this.form.web_fmtp = [];
				for (let i = 0; i < codeWebNum[val]; i++) {
					this.form.web_fmtp.push({
						fmtpkhdmc: '',
						fmtplj: '',
						fmtpfwdmc: ''
					});
				}
			}
		},
		'form.app_fmmblx': function (val) {
			const codeAppNum = {
				10: 0,
				11: 1,
				12: 1,
				13: 3
			};
			if (this.$route.params.zx_id && this.appFmmblx === val) {
				this.form.app_fmtp = this.appFmtp;
			} else {
				this.form.app_fmtp = [];
				for (let i = 0; i < codeAppNum[val]; i++) {
					this.form.app_fmtp.push({
						fmtpkhdmc: '',
						fmtplj: '',
						fmtpfwdmc: ''
					});
				}
			}
		}
	},
	created() {
		this.getFlxList();
		if (!this.isNew) {
			this.getData();
		}
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.zx_id === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style>
.el-tag {
	margin-right: 5px;
}
.el-tabs--border-card {
	margin-bottom: 15px;
}
</style>
