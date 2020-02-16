<docs>
	## 客户管理---单位客户管理，单位信息页，可编辑
</docs>

<template>
	<div class="detail_wrap">
		<div class="content" v-loading="loading">
			<el-form :model="form" ref="form" label-width="37.5%" :rules="rules">
				<el-row>
					<el-col :span="24">
						<div class="fail_reason clearfix" v-if="form.sxyy">
							<div class="label">失效原因：</div>
							<div class="cont" v-html="form.sxyy"></div>
						</div>
						<h3 class="title">基本信息</h3>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位名称" prop="dwmc" class="is-required">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经济类型" prop="dwxz">
							<select-code v-model="form.dwxz" code="gyrlzyw_qzzp_d_dwxz" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="注册资金" prop="zczj">
							<select-code v-model="form.zczj" code="gyrlzyw_qzzp_d_zczj" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="所在地区" prop="szdqq" label-width="18.75%">
							<address-select :changeOnSelect="false" v-model="form.szdqq" xzqhjb="3"></address-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="详细地址" prop="xxdz">
							<el-input v-model="form.xxdz"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="所属行业" prop="sshy" label-width="18.75%">
							<trade-select v-model="form.sshy"></trade-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="雇员人数" prop="dwgm">
							<select-code v-model="form.dwgm" code="gyrlzyw_qzzp_d_dwgm" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系电话" prop="lxfs">
							<el-input v-model="form.lxfs"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系地址" prop="lxdz" required>
							<el-input v-model="form.lxdz"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮政编码" prop="yzbm">
							<el-input v-model="form.yzbm"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系人" prop="lxr" required>
							<el-input v-model="form.lxr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系人手机号" prop="lxrsjh">
							<el-input v-model="form.lxrsjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="QQ号码" prop="qq">
							<el-input v-model="form.qq"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位网址" prop="dwwz">
							<el-input v-model="form.dwwz" placeholder="例如：http://baidu.com"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h3 class="title">证件信息</h3>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="年审到期时间" prop="nssj">
							<el-date-picker v-model="form.nssj" :editable="false" class="date_picker"
								:picker-options="pickerNow"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办人" prop="jbr" required>
							<el-input v-model="form.jbr"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办人手机号" prop="jbrsjh" required>
							<el-input v-model="form.jbrsjh"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="法人身份证正反两面" prop="jbrsfzsclj">
							<upload-img
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="jbrsfz"
								:maxSize="10240000"
								:clientName.sync="form.jbrsfzkhdmc"
								:serverPath.sync="form.jbrsfzsclj"
								:serverName.sync="form.jbrsfzfwdmc"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位logo" prop="dwlgsc">
							<upload-img class="square"
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="dwlogo"
								tipText="建议图片比例为1：1"
								:maxSize="50"
								:clientName.sync="form.dwlgkhdmc"
								:serverPath.sync="form.dwlgsc"
								:serverName.sync="form.dwlgfwdmc"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系人头像" prop="lxrtxsclj">
							<upload-img class="square"
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="lxrtouxiang"
								tipText="建议图片比例为1：1"
								:maxSize="50"
								:clientName.sync="form.lxrtxkhdmc"
								:serverPath.sync="form.lxrtxsclj"
								:serverName.sync="form.lxrtxfwdmc"></upload-img>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="组织机构代码" prop="zzjgdm">
							<el-input v-model="form.zzjgdm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="统一社会信用代码" prop="gsyyzzh" required>
							<el-input v-model="form.gsyyzzh"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="备注" prop="zzjgdmsclj">
							<upload-img
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="zzjgdm"
								:maxSize="10240000"
								:clientName.sync="form.zzjgdmkhdmc"
								:serverPath.sync="form.zzjgdmsclj"
								:serverName.sync="form.zzjgdmfwdmc"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工商营业执照" prop="gsyyzzsclj">
							<upload-img
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="gsyyzz"
								:maxSize="10240000"
								:clientName.sync="form.gsyyzzkhdmc"
								:serverPath.sync="form.gsyyzzsclj"
								:serverName.sync="form.gsyyzzfwdmc"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="现场招聘简章承诺书盖公章" prop="xczpjzcnssclj">
							<upload-img
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								:on-remove="handleRemove"
								modeName="xczpcns"
								:maxSize="10240000"
								:clientName.sync="form.xczpjzcnskhdmc"
								:serverPath.sync="form.xczpjzcnssclj"
								:serverName.sync="form.xczpjzcnsfwdmc">
							</upload-img>
							<a href="static/files/yrdwwszzfbxczpjzcns.docx" target="_blank">
								<el-button icon="document" size="small"
									class="btn_radius download_muban">下载模板</el-button></a>
							<span class="delete_btn"><el-button class="el-icon-delete btn_radius" type="danger" size="small"
							@click="handleRemove" :disabled="!form.xczpjzcnssclj">删除</el-button></span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="房屋租赁合同（仅供省外驻黔企业使用）" prop="fwzphtsclj">
							<upload-img
								modeName="fwzpht"
								:downloadPic="canDownload"
								:maxSize="10240000"
								:clientName.sync="form.fwzphtkhdmc"
								:serverPath.sync="form.fwzphtsclj"
								:serverName.sync="form.fwzphtfwdmc">
							</upload-img>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h3 class="title">单位简介</h3>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="单位简介" prop="dwjj" label-width="12.5%">
							<vueUEditor @ready="editor" :defaultValue="form.dwjj" ></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注" prop="bz" label-width="12.5%">
							<el-input v-model="form.bz" type="textarea" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<h3 class="title">审批信息</h3>
					</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">审批状态</el-col>
					<el-col :span="5">{{hasApp ? form.spztmc : '待审批'}}</el-col>
					<el-col :span="3" v-show="hasApp">审批日期</el-col>
					<el-col :span="5" v-show="hasApp">{{form.sprq}}</el-col>
				</el-row>
				<el-row class="info" v-show="hasApp && form.spbz">
					<el-col :span="3">审批备注</el-col>
					<el-col :span="21">{{form.spbz}}</el-col>
				</el-row>
				<el-row v-show="canSave !== false" style="margin-top:20px;">
					<el-col>
						<el-form-item label="" label-width="12.5%">
							<el-button :loading="loading" type="primary" native-type="submit"
								@click.prevent="submitForm('form')">提交</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import addressSelect from '@/common/vue/multiSelect/addressSelect';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import uploadImg from '@/common/vue/uploadImg';
import vueUEditor from '@/common/vue/vueUEditor';
import { replaceBlank } from '@/common/js/utils';
import { Base64 } from 'js-base64';

export default {
	name: 'companyInfo',
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
		selectCode,
		addressSelect,
		tradeSelect,
		vueUEditor,
		uploadImg
	},
	computed: {
		hasApp() {
			const spzt = this.form.spzt;
			return spzt === '30' || spzt === '40';
		}
	},
	data() {
		// 单位名称 唯一性查询
		const checkOnly = (rule, val, cb) => {
			const data = {
				dwmc: this.form.dwmc,
				dwxx_id: this.form.dwxx_id,
				czlx: this.form.czlx
			};
			$.get('/gyrcht/khgl/dwkh/dwmcCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					cb(new Error(res.returnData.message));
				} else {
					cb();
				}
			}).catch(() => { });
		};
		return {
			pickerNow: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			// 当前页面名称
			routerName: '',
			// 单位信息id
			loading: false,
			form: {
				dwxx_id: '',
				yh_id: '',
				dwmc: '',
				dwxz: '',
				zczj: '',
				szdqq: '',
				dwgm: '',
				sshy: '',
				lxdz: '',
				yzbm: '',
				lxfs: '',
				lxr: '',
				lxrsjh: '',
				qq: '',
				dwwz: '',
				dwjj: '',
				bz: '',
				jbr: '',
				nssj: '',
				jbrsjh: '',
				// 法人身份证
				jbrsfzkhdmc: '',
				jbrsfzsclj: '',
				jbrsfzfwdmc: '',
				// 单位logo
				dwlgkhdmc: '',
				dwlgsc: '',
				dwlgfwdmc: '',
				// 联系人头像
				lxrtxkhdmc: '',
				lxrtxsclj: '',
				lxrtxfwdmc: '',
				// 组织机构代码
				zzjgdm: '',
				zzjgdmkhdmc: '',
				zzjgdmsclj: '',
				zzjgdmfwdmc: '',
				// 工商营业执照
				gsyyzzh: '',
				gsyyzzkhdmc: '',
				gsyyzzsclj: '',
				gsyyzzfwdmc: '',
				// 现场招聘简章承诺书
				xczpjzcnssclj: '',
				xczpjzcnskhdmc: '',
				xczpjzcnsfwdmc: '',
				// 房屋租赁合同
				fwzphtsclj: '',
				fwzphtkhdmc: '',
				fwzphtfwdmc: '',
				xxdz: '',
				spzt: '',
				spztmc: '',
				spsj: '',
				spbz: '',
				czlx: '1'
			},
			rules: {
				dwmc: [{ validator: validator('128, "full", "单位名称", false', checkOnly), trigger: 'blur' }],
				dwxz: [{ required: true, message: '经济类型不能为空' }],
				sshy: [{ required: true, message: '所属行业不能为空' }],
				lxfs: [{ validator: validator('32, "lxfs", "联系电话", true') }],
				lxdz: [{ validator: validator('256, "least", "联系地址", false') }],
				yzbm: [{ validator: validator('6, "yb", "邮政编码", true') }],
				lxr: [{ validator: validator('64, "full", "联系人", false') }],
				lxrsjh: [{ validator: validator('11, "sjh", "联系人手机号", true') }],
				qq: [{ validator: validator('16, "qq", "qq号码", true') }],
				dwwz: [{ validator: validator('128, "url", "单位网址", true') }],
				jbr: [{ validator: validator('64, "full", "经办人", false') }],
				jbrsjh: [{ validator: validator('11, "sjh", "经办人手机号", false') }],
				nssj: [{ required: true, message: '年审到期时间不能为空' }],
				zzjgdm: [{ validator: validator('18, "zzjgdm", "组织机构代码", true') }],
				gsyyzzh: [{ validator: validator('18, "zzjgdm", "统一社会信用代码", false') }],
				xxdz: [{ validator: validator('128, "least", "详细地址", true') }],
				bz: [{ validator: validator('512, "less", "备注", true') }],
				jbrsfzsclj: [{ required: true, message: '请上传法人身份证' }],
				gsyyzzsclj: [{ required: true, message: '请上传工商营业执照' }]
			},
			// 富文本
			editorInstance: null
		};
	},
	methods: {
		// 点击提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				} else {
					this.$message.warning('有未符合要求的录入项，请检查后再次提交');
				}
			});
		},
		// 查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/khgl/dwkh/dwkhxqCx', {
				params: { dwxx_id: this.dwxxId }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					const dwxx = res.returnData.dwxx;
					Object.keys(dwxx).forEach((item) => {
						if (item !== 'yh_id' && item !== 'czlx' && item !== 'dwxx_id') {
							this.form[item] = dwxx[item];
						}
					});
					this.form.sxyy = replaceBlank(this.form.sxyy); // 失效原因
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
		// 提交(put)
		putData() {
			this.loading = true;
			const postData = Object.assign({}, this.form);
			postData.dwjj = Base64.encode(this.editorInstance.getContent());
			$.put('/gyrcht/khgl/dwkh/dwkhxxXg', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('修改成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 删除现场招聘简章承诺书盖公章图片
		handleRemove() {
			const data = {
				dwxx_id: this.form.dwxx_id,
				tplj: this.form.xczpjzcnssclj,
				tpfwdmc: this.form.xczpjzcnsfwdmc
			};
			$.put('/gyrcht/khgl/dwkh/dwtpSc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.form.xczpjzcnssclj = '';
					this.form.xczpjzcnsfwdmc = '';
					this.form.xczpjzcnskhdmc = '';
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	// 打开页面
	created() {
		this.form.dwxx_id = this.dwxxId;
		if (this.dwxxId) {
			this.getData();
			this.form.czlx = '1';
		} else {
			this.form.czlx = '0';
			this.form.spzt = '30';
			this.form.yh_id = this.$route.params.yhid;
		}
	}
};
</script>
<style scoped lang="less">
.download_muban {
	position: absolute;
	top: 0;
	left: 0;
}
.fail_reason {
	div {
		float: left;
		font-size: 16px;
	}
	.label {
		width: 90px;
		color: #48556A;
	}
	.cont {
		color: #ff4949;
	}
}
.delete_btn {
		position: absolute;
    right: 0;
    bottom: 0;
	}
</style>
