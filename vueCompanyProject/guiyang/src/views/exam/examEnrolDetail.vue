<docs>
	## 考试管理---考试管理--报名管理
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div class="content" v-loading="loading">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="formInfo">
				<h3 class="title">报名信息</h3>
				<el-row>
					<el-col>
						<el-form-item label="考试名称" prop="ksmc">{{form.ksmc}}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="手机号" prop="sjh" required>
							<el-input @blur="getBkjbxx" v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwyh_id" required>
							<el-select class="width_100" v-model="form.dwyh_id" @change="changeDwmc" clearable>
								<el-option class="control_list" v-for="(item, index) in dwmcList"
									:key="index"
									:label="item.dwmc"
									:value="item.dwyh_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职位名称" prop="zw_id" required>
							<el-select class="width_100" v-model="form.zw_id" clearable>
								<el-option class="control_list" v-for="(item, index) in zwmcList"
									:key="index"
									:label="item.zwmc"
									:value="item.zw_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="姓名" prop="xm" required>
							<el-input v-model="form.xm" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="身份证号" prop="sfzhm" required>
							<el-input v-model="form.sfzhm"
								@blur="form.sfzhm = form.sfzhm.toUpperCase()" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="民族" prop="mz" required>
							<select-code v-model="form.mz" code="gyrlzyw_qzzp_d_mz" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="性别" prop="xb" required>
							<el-select v-model="form.xb" class="width_100" disabled>
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="出生日期" prop="csrq" class="mulitfix" required>
							<el-input v-model="form.csrq" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="户籍所在地" prop="hjq" class="mulitfix" required>
							<address-select :changeOnSelect="false" v-model="form.hjq" xzqhjb="3"></address-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="政治面貌" prop="zzmm" required>
							<select-code v-model="form.zzmm" code="gyrlzyw_qzzp_d_zzmm" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学历" prop="xl" required>
							<select-code v-model="form.xl" code="gyrlzyw_bkxt_d_bkxl" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学位" prop="xw" required>
							<select-code v-model="form.xw" code="gyrlzyw_bkxt_d_xw" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="毕业时间" prop="bysj" class="is-required">
							<el-date-picker v-model="form.bysj"
								class="width_100" :editable="false"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="title">报名字段</h3>
				<el-row>
					<el-col :span="8" v-for="(item, index) in words" :key="index" class="words_content">
						<el-form-item v-if="item.zdpymc==='syd'" :label="item.zdmc" :prop="item.zdpymc" required>
							<address-select :changeOnSelect="false" v-model="form[item.zdpymc]" xzqhjb="3"></address-select>
						</el-form-item>
						<el-form-item v-else-if="item.zdpymc==='zyjszc'" :label="item.zdmc" :prop="item.zdpymc" required>
							<select-code v-model="form[item.zdpymc]" code="gyrlzyw_qzzp_d_zc" :hasAll="false"></select-code>
						</el-form-item>
						<el-form-item v-else-if="item.zdpymc==='sxzymc'" :label="item.zdmc" :prop="item.zdpymc" required>
							<major-select v-model="form[item.zdpymc]"></major-select>
						</el-form-item>
						<el-form-item v-else-if="item.zdpymc==='dwsftybk'||item.zdpymc==='sfmzbkgwyqdtj'||item.zdpymc==='sfqrz'"
						:label="item.zdmc" :prop="item.zdpymc" required>
							<el-select v-model="form[item.zdpymc]" class="width_100">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-else-if="item.sfyxxg==='0' && item.zdpymc!=='qtxsmdwt'&&item.zdpymc!=='gzjl'" :label="item.zdmc" :prop="item.zdpymc" required>
							<el-input v-model="form[item.zdpymc]"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8"  v-for="(item, index) in words" :key="index" class="words_content">
						<el-form-item v-if="item.sfyxxg==='1' && item.zdlx==='40'" :label="item.zdmc" :prop="item.zdpymc" 
						:rules="[{ required: true, message: item.zdmc+'不能为空', trigger: 'blur' }]">
							<el-select v-model="form[item.zdpymc]" class="width_100">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-else-if="item.sfyxxg==='1' && item.zdlx==='30'" :label="item.zdmc" :prop="item.zdpymc"
						:rules="[{ required: true, message: item.zdmc+'不能为空', trigger: 'blur'},
							{ max: 64, message: item.zdmc+'最大长度为64位'}]">
							<el-input v-model="form[item.zdpymc]"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24"  v-for="(item, index) in words" :key="index">
						<el-form-item v-if="item.sfyxxg==='1'&& item.zdlx==='20'" :label="item.zdmc" :prop="item.zdpymc" 
						:rules="[{ required: true, message: item.zdmc+'不能为空',  trigger: 'blur'},
						{ max: 256, message: item.zdmc+'最大长度为256位'}]">
							<el-input type="textarea" v-model="form[item.zdpymc]"></el-input>
						</el-form-item>
						<el-form-item v-else-if="item.sfyxxg==='0'&& item.zdlx==='20'" :label="item.zdmc" :prop="item.zdpymc" required>
							<el-input type="textarea" v-model="form[item.zdpymc]"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="title">附加信息</h3>
				<el-row>
					<el-col :span="6">
						<el-form-item label="身份证" prop="sfzlj" :class="{ 'is-required': isRequireSfz }">
							<upload-img :uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="ksfjxxsfz"
								:maxSize="500"
								:clientName.sync="form.sfzkhd"
								:serverPath.sync="form.sfzlj"
								:serverName.sync="form.sfzfwd"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="学位证" prop="xwzlj" :class="{ 'is-required': isRequireXwz }">
							<upload-img :uploadPic="canUpload"
									:downloadPic="canDownload"
									modeName="ksfjxxxwz"
									:maxSize="500"
									:clientName.sync="form.xwzkhd"
									:serverPath.sync="form.xwzlj"
									:serverName.sync="form.xwzfwd"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="毕业证或就业推荐表" prop="byzlj" :class="{ 'is-required': isRequireByz }">
							<upload-img :uploadPic="canUpload"
									:downloadPic="canDownload"
									modeName="ksbyzjytjb"
									:maxSize="500"
									:clientName.sync="form.byzkhd"
									:serverPath.sync="form.byzlj"
									:serverName.sync="form.byzfwd"></upload-img>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="照片" prop="txlj" required>
							<upload-img class="square h150"
								:uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="kszp"
								tipText="建议图片比例为1：1.5"
								:maxSize="50"
								:clientName.sync="form.txkhd"
								:serverPath.sync="form.txlj"
								:serverName.sync="form.txfwd"></upload-img>
						</el-form-item>
					</el-col>
				</el-row>
				<h3 class="title">状态信息</h3>
				<el-row>
					<el-col :span="6">
						<el-form-item label="审核状态" required prop="spzt">
							<select-code v-model="form.spzt" v-if="spztDisable" code="gyrlzyw_bkxt_d_bkspzt" :hasAll="false" disabled></select-code>
							<select-code v-model="form.spzt" v-else code="gyrlzyw_bkxt_d_bkspzt" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6"  v-if="ksxx.sfjf=='1'">
						<el-form-item label="缴费状态" prop="jfzt">
							<!-- 由于已退款选项禁用，所以没有使用封装的select-code -->
							<el-select v-if="jfztDisable" v-model="form.jfzt" class="width_100">
								<el-option label="已缴费" value="10"></el-option>
								<el-option label="未缴费" value="20"></el-option>
								<el-option label="已退款" value="30" disabled></el-option>
							</el-select>
							<el-select v-else v-model="form.jfzt" class="width_100" disabled>
								<el-option label="已缴费" value="10"></el-option>
								<el-option label="未缴费" value="20"></el-option>
								<el-option label="已退款" value="30" disabled></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="退回原因" prop="thyy" v-if="form.spzt=='40'">
							<select-code v-model="form.thyy" code="gyrlzyw_bkxt_d_thyy" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="18">
						<el-form-item label="备注" prop="spbz" v-if="form.spzt=='40'&&form.thyy=='50'" required>
							<el-input type="textarea" v-model="form.spbz"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 根据是否为编辑页面选择显示 -->
				<el-row v-if="form.czlx==='1'">
					<el-col :span="6">
						<el-form-item label="报名时间" prop="bmsj" class="mulitfix">
							<el-input v-model="form.bmsj" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="审核时间" prop="sprq" class="mulitfix">
							<el-input v-model="form.sprq" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-if="ksxx.sfjf=='1'">
						<el-form-item label="缴费时间" prop="jfrq" class="mulitfix">
							<el-input v-model="form.jfrq" disabled></el-input>
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
import addressSelect from '@/common/vue/multiSelect/addressSelect';
import breadCrumb from '@/common/vue/breadCrumb';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import uploadImg from '@/common/vue/uploadImg';
import majorSelect from '@/common/vue/multiSelect/majorSelect';
import $ from '@/common/js/axios';
// import { cardExchangeIsValid } from '@/common/js/checkCard';

export default {
	name: 'examEnrolDetail',
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
	components: { breadCrumb, dateAss, selectCode, uploadImg, addressSelect, majorSelect },
	data() {
		// 手机号 唯一性查询
		const checkOnlyPhoneNum = (rule, val, callback) => {
			const data = {
				ks_id: this.form.ks_id,
				sjh: this.form.sjh,
				czlx: this.form.czlx
			};
			$.get('/gyrcht/ksgl/bmgl/bmkssjhCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					// callback(new Error(res.returnData.message));
					this.$message.warning(res.returnData.message);
					callback();
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			labelWidth,
			loading: false,
			// 判断select组件触发change事件的标志
			changeDwFlag: false,
			// 双向绑定数据
			form: {
				ks_id: '',
				bk_id: '',
				// 分配单位id
				fpdw_id: '',
				ksmc: '',
				sjh: '',
				dwmc: '',
				zwmc: '',
				xm: '',
				sfzhm: '',
				xb: '',
				mz: '',
				csrq: '',
				zzmm: '',
				hjq: '',
				xl: '',
				xw: '',
				bysj: '',
				spzt: '',
				thyy: '10',
				spbz: '',
				jfzt: '20',
				// 报名字段
				sxzymc: '',
				syd: '',
				lxdh1: '',
				lxdh2: '',
				zyjszc: '',
				xgzdw: '',
				jcfwxmmc: '',
				dwsftybk: '',
				sfmzbkgwyqdtj: '',
				xggzjlnx: '',
				qtxsmdwt: '',
				gzjl: '',
				sfqrz: '',
				zdyzdwb1: '',
				zdyzdwb2: '',
				zdyzdwb3: '',
				zdyzdwb4: '',
				zdyzdwb5: '',
				zdyzdwb6: '',
				zdyzdwb7: '',
				zdyzdwb8: '',
				zdyzdwb9: '',
				zdyzdwb10: '',
				zdyzdsr1: '',
				zdyzdsr2: '',
				zdyzdsr3: '',
				zdyzdsr4: '',
				zdyzdsr5: '',
				zdyzdsr6: '',
				zdyzdsr7: '',
				zdyzdsr8: '',
				zdyzdsr9: '',
				zdyzdsr10: '',
				zdyzddx1: '',
				zdyzddx2: '',
				zdyzddx3: '',
				zdyzddx4: '',
				zdyzddx5: '',
				zdyzddx6: '',
				zdyzddx7: '',
				zdyzddx8: '',
				zdyzddx9: '',
				zdyzddx10: '',
				czlx: '',
				dwyh_id: '',
				zw_id: '',
				// 考试照片
				txkhd: '',
				txlj: '',
				txfwd: '',
				// 身份证
				sfzkhd: '',
				sfzlj: '',
				sfzfwd: '',
				// 学位证
				xwzkhd: '',
				xwzlj: '',
				xwzfwd: '',
				// 毕业证或就业推荐表
				byzkhd: '',
				byzlj: '',
				byzfwd: '',
				// 是否后台添加
				sfhttj: '',
				// 是否分配
				sffp: '',
				bmxh: '',
				bmsj: '',
				jfrq: '',
				sprq: ''
			},
			// 是否可以修改缴费状态
			sfkyxgjfzt: '',
			// 是否可以编辑报名考试信息
			sfkybjbmksxx: '',
			// 单位名称列表
			dwmcList: [],
			// 职位名称列表
			zwmcList: [],
			// 验证
			rules: {
				sjh: [{ validator: validator('11, "sjh", "手机号", false', checkOnlyPhoneNum), trigger: 'blur' }],
				dwyh_id: [{ validator: validator('20, "normal", "单位名称", false') }],
				zw_id: [{ validator: validator('20, "normal", "职位名称", false') }],
				xm: [{ validator: validator('32, "normal", "姓名", false') }],
				sfzhm: [{ required: true, message: '身份证号不能为空' }],
				xb: [{ required: true, message: '性别不能为空' }],
				hjq: [{ required: true, message: '户籍所在地不能为空' }],
				// xb: [{ validator: validator('1, "normal", "性别", true') }],
				mz: [{ validator: validator('2, "full", "民族", false') }],
				csrq: [{ required: true, message: '出生日期不能为空' }],
				zzmm: [{ validator: validator('2, "full", "政治面貌", false') }],
				xl: [{ validator: validator('32, "full", "学历", false') }],
				xw: [{ validator: validator('2, "full", "学位", false') }],
				bysj: [{ required: true, message: '毕业时间不能为空' }],
				txlj: [{ required: true, message: '照片不能为空' }],
				spzt: [{ validator: validator('2, "normal", "审核状态", false') }],
				jfzt: [{ validator: validator('2, "normal", "缴费状态", true') }],
				thyy: [{ validator: validator('2, "normal", "退回原因", true') }],
				spbz: [{ validator: validator('256, "normal", "备注", false') }],
				// 报名字段
				sxzymc: [{ validator: validator('7, "normal", "所学专业名称 ", false') }],
				syd: [{ validator: validator('12, "normal", "生源地", false') }],
				lxdh1: [{ validator: validator('32, "lxdh", "联系电话1", false') }],
				lxdh2: [{ validator: validator('32, "lxdh", "联系电话2", false') }],
				zyjszc: [{ validator: validator('48, "normal", "专业技术职称", false') }],
				xgzdw: [{ validator: validator('128, "normal", "现工作单位", false') }],
				jcfwxmmc: [{ validator: validator('48, "normal", "基层服务项目名称", false') }],
				dwsftybk: [{ validator: validator('1, "normal", "单位是否同意报考", false') }],
				sfmzbkgwyqdtj: [{ validator: validator('1, "normal", "是否满足报考岗位要求的条件", false') }],
				xggzjlnx: [{ validator: validator('2, "number", "相关工作经历年限", false') }],
				qtxsmdwt: [{ validator: validator('256, "less", "其它需说明的问题", false') }],
				gzjl: [{ validator: validator('256, "less", "工作经历", false') }],
				sfqrz: [{ validator: validator('1, "normal", "是否全日制", false') }]
			},
			// 报名字段
			words: [],
			// 考试详细信息
			ksxx: {
				// 是否上传身份证、学位证、毕业证或就业推荐表
				sfscsfz: '',
				sfscxwz: '',
				sfscbyzhjytjb: ''
			},
			// 用于判断上传文件那些字段的必填样式展示
			isRequireSfz: false,
			isRequireXwz: false,
			isRequireByz: false
		};
	},
	methods: {
		// 编辑考试报名信息查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/bmgl/bjksbmxxCx', {
				params: {
					ks_id: this.form.ks_id,
					bk_id: this.form.bk_id
				}
			}).then((res) => {
				const { ksbmxx } = res.returnData;
				Object.keys(this.form).forEach((item) => {
					if (item !== 'ksmc' && item !==	'bk_id' && item !==	'czlx') {
						this.form[item] = ksbmxx[item];
					}
				});
				this.sfkyxgjfzt = ksbmxx.sfkyxgjfzt;
				this.sfkybjbmksxx = ksbmxx.sfkybjbmksxx;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 根据手机号获取基本信息
		getBkjbxx() {
			const data = {
				ks_id: this.form.ks_id,
				sjh: this.form.sjh,
				czlx: this.form.czlx
			};
			$.get('/gyrcht/ksgl/bmgl/bmkssjhCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					const { jbxx } = res.returnData;
					Object.keys(jbxx).forEach((key) => {
						this.form[key] = jbxx[key];
					});
				}
			}).catch(() => { });
		},
		// 提交表单信息
		postData() {
			this.loading = true;
			const bmzdArr = [];
			this.words.forEach((item) => {
				bmzdArr.push({ bmzd_id: item.bmzd_id, bmzdnr: item.zdmc });
			});
			this.form.bmzd = bmzdArr;
			if (this.form.spzt !== '40') {
				this.form.thyy = '';
			}
			if (this.ksxx.sfjf !== '1') {
				this.form.jfzt = '';
			}
			$.post('/gyrcht/ksgl/bmgl/xjbjbmksBc', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功！');
					this.$router.go(-1);
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.sfkybjbmksxx === '1') {
						this.$message.warning('已分配考生不允许修改');
					} else {
						this.postData();
					}
				}
			});
		},
		// 获取单位名称列表
		getDwmcList(id) {
			$.get('/gyrcht/ksgl/common/bkdwmclbCx', {
				params: { ks_id: id }
			}).then((res) => {
				this.dwmcList = res.returnData.dwlb;
			}).catch(() => {});
		},
		// 改变单位名称选项
		changeDwmc(val) {
			this.dwmcList.forEach((item) => {
				if (item.dwyh_id === val) {
					this.form.fpdw_id = item.fpdw_id;
				}
			});
			this.zwmcList = [];
			if (this.changeDwFlag) {
				this.form.zw_id = '';
			} else {
				this.changeDwFlag = true;
			}
			// 获取职位列表
			$.get('/gyrcht/ksgl/common/bkzwmclbCx', {
				params: { ks_id: this.form.ks_id, dwyh_id: val }
			}).then((res) => {
				this.zwmcList = res.returnData.zwlb;
			}).catch(() => {});
		},
		// 报名字段查询
		getWords() {
			$.get('/gyrcht/ksgl/bmgl/bmzdCx', {
				params: {
					ks_id: this.$route.params.ks_id
				}
			}).then((res) => {
				this.words = res.returnData.bmzds;
			}).catch(() => {});
		}
	},
	computed: {
		// 判断缴费状态是否禁用
		jfztDisable() {
			const result = ((this.form.czlx === '0' && this.ksxx.sfjf === '1') ||
				(this.ksxx.sfjf === '1' && this.sfkyxgjfzt === '0')) && this.form.spzt === '30';
			return result;
		},
		// 判断审核状态是否禁用
		spztDisable() {
			const result = (this.ksxx.sfjf === '1' && this.sfkyxgjfzt === '1');
			return result;
		}
	},
	watch: {
		/* eslint-disable func-names */
		'ksxx.sfscsfz': function (val) {
			switch (val) {
			case '1':
				this.rules.sfzlj = [{ required: true, message: '请上传身份证' }];
				this.isRequireSfz = true;
				break;
			default: break;
			}
		},
		'ksxx.sfscxwz': function (val) {
			switch (val) {
			case '1':
				this.rules.xwzlj = [{ required: true, message: '请上传学位证' }];
				this.isRequireXwz = true;
				break;
			default: break;
			}
		},
		'ksxx.sfscbyzhjytjb': function (val) {
			switch (val) {
			case '1':
				this.rules.byzlj = [{ required: true, message: '请上传毕业证或就业推荐表' }];
				this.isRequireByz = true;
				break;
			default: break;
			}
		},
		'form.spzt': function (val) {
			if (val === '20' || val === '40') {
				this.form.jfzt = '20';
			}
			if (val === '40' && this.form.thyy === '') {
				this.form.thyy = '10';
			}
		}
	},
	created() {
		const params = this.$route.params;
		this.form.ks_id = params.ks_id;
		this.form.ksmc = params.ksmc;
		this.getWords();
		this.ksxx = params.ksxx;
		if (params.bk_id) {
			this.form.bk_id = params.bk_id;
			this.form.czlx = '1';
			this.getData();
		} else {
			this.form.czlx = '0';
		}
	},
	mounted() {
		this.getDwmcList(this.form.ks_id);
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.ks_id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
