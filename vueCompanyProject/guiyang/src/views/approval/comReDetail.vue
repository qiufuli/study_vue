<docs>
	## 审批管理---单位复审审，单位详情页面
	## 未完成部分
		* 企业详情中的图片预览查看，下载；未完成
	## @author jinglf000
	## @date ###### Wed Jul 26 13:44:30 CST 2017
	## 备注
	*	需要在路由上拼接参数 id（dwxxrz_id）单位id才能进入该页面
</docs>

<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>

		<!-- 单位信息 开始 -->
		<div class="content" v-loading="loading">
			<el-row>
				<el-col :span="24"><h3 class="title">单位资质认证信息</h3></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">单位名称</el-col>
				<el-col :span="5">{{result.dwmc}}</el-col>
				<!--<el-col :span="3">经济类型</el-col>
				<el-col :span="5">{{result.dwxzmc}}</el-col>
				<el-col :span="3">注册资金</el-col>
				<el-col :span="5">{{result.zczjmc}}</el-col>-->
			<!--</el-row>-->
			<!--<el-row class="info">
				<el-col :span="3">所在地区</el-col>
				<el-col :span="5">{{result.szdqqmc}}</el-col>
				<el-col :span="3">详细地址</el-col>
				<el-col :span="5">{{result.xxdz}}</el-col>
				<el-col :span="3">雇员人数</el-col>
				<el-col :span="5">{{result.dwgmmc}}</el-col>
			</el-row>-->
			<!--<el-row class="info">
				<el-col :span="3">所属行业</el-col>
				<el-col :span="5">{{result.sshymc}}</el-col>
				<el-col :span="3">联系地址</el-col>
				<el-col :span="5">{{result.lxdz}}</el-col>
				<el-col :span="3">邮政编码</el-col>
				<el-col :span="5">{{result.yzbm}}</el-col>
			</el-row>-->
			<!--<el-row class="info">
				<el-col :span="3">联系人</el-col>
				<el-col :span="5">{{result.lxr}}</el-col>
				<el-col :span="3">手机号码</el-col>
				<el-col :span="5">{{result.sjh}}</el-col>
				<el-col :span="3">联系电话</el-col>
				<el-col :span="5">{{result.lxdh}}</el-col>
			</el-row>-->
			<!--<el-row class="info">
				<el-col :span="3">QQ号码</el-col>
				<el-col :span="5">{{result.qq}}</el-col>
				<el-col :span="3">单位网址</el-col>
				<el-col :span="13" class="break_word">{{result.gswz}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="24"><h3 class="title">单位简介</h3></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">单位简介</el-col>
				<el-col :span="21" v-html="result.dwjj" class="company_jj"></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">备注</el-col>
				<el-col :span="21" v-html="result.bz"></el-col>
			</el-row>-->
			<!--<el-row>
				<el-col :span="24"><h3 class="title">证件信息</h3></el-col>
			</el-row>-->
			<!--<el-row class="info">-->
				<el-col :span="3">年审到期时间</el-col>
				<el-col :span="5">{{result.nssj}}</el-col>
				<!--<el-col :span="3">经办人</el-col>
				<el-col :span="5">{{result.jbr}}</el-col>
				<el-col :span="3">经办人手机号</el-col>
				<el-col :span="5">{{result.jbrsjh}}</el-col>-->
			<!--</el-row>-->
			<!--<el-row class="info">-->

				<!--<el-col :span="3">单位LOGO</el-col>
				<el-col :span="5">
					<div class="images_wrap square">
						<img v-if="pic.logo" :src="pic.logo" alt="" class="images_img"
							@click="previewPic(pic.logo)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>-->
				<!--<el-col :span="3">联系人头像</el-col>
				<el-col :span="5">
					<div class="images_wrap square">
						<img v-if="pic.head" :src="pic.head" alt="" class="images_img"
							@click="previewPic(pic.head)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>-->
			<!--</el-row>-->
			<!--<el-row class="info">-->
				<el-col :span="3">组织机构代码</el-col>
				<el-col :span="5" class="images_num">{{result.zzjgdm}}</el-col>
				<el-col :span="3">统一社会信用代码</el-col>
				<el-col :span="5" class="images_num">{{result.gsyyzz}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">工商营业执照</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.gsyyzz" :src="pic.gsyyzz" alt="" class="images_img"
							@click="previewPic(pic.gsyyzz)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
					<p class="images_btns">
						<a class="download" :href="pic.gsyyzz" :download="result.gsyyzzfwdmc"><el-button
							class="btn_radius" size="small" icon="btn-download">下载</el-button></a>
					</p>
				</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">备注</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.zzjgdm" :src="pic.zzjgdm" alt="" class="images_img"
							@click="previewPic(pic.zzjgdm)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
					<p class="images_btns">
						<a class="download" :href="pic.zzjgdm" :download="result.zzjgdmfwdmc"><el-button
							class="btn_radius" size="small" icon="btn-download">下载</el-button></a>
					</p>
				</el-col>
			</el-row>
			<el-row class="info">
				<!--</el-col>-->
				<el-col :span="3">现场招聘简章承诺书盖公章后上传</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.xczpcns" :src="pic.xczpcns" alt="" class="images_img"
							@click="previewPic(pic.xczpcns)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
					<p class="images_btns">
						<a class="download" :href="pic.xczpcns" :download="result.xczpjzcnsfwdmc"><el-button
							class="btn_radius" size="small" icon="btn-download">下载</el-button></a>
					</p>
				</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">法人身份证正反两面</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.idCard" :src="pic.idCard" alt="" class="images_img"
							@click="previewPic(pic.idCard)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">房屋租赁合同（仅供省外驻黔企业使用）</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.fwzpht" :src="pic.fwzpht" alt="" class="images_img"
							@click="previewPic(pic.fwzpht)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
					<p class="images_btns">
						<a class="download" :href="pic.fwzpht" :download="result.fwzphtfwdmc"><el-button
							class="btn_radius" size="small" icon="btn-download">下载</el-button></a>
					</p>
				</el-col>
			</el-row>
		</div>
		<!-- 单位信息 开始 -->
		<!-- 审批录入 开始  -->
		<div class="arrproval" v-show="canSave !== false">
			<el-row>
				<el-col :span="24"><h3 class="title_approval">复审</h3></el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<p v-show="showNewCo" class="new_company">新注册单位</p>
				</el-col>
			</el-row>
			<el-row class="info" v-if="result.spr">
				<el-col :span="3">上次审批人</el-col>
				<el-col :span="5" v-html="result.spr"></el-col>
				<el-col :span="3">上次审批时间</el-col>
				<el-col :span="5" v-html="result.sprq"></el-col>
				<el-col :span="3">上次审批状态</el-col>
				<el-col :span="5" v-html="result.scspzt === '30' ? '审批通过' : '审批拒绝'"></el-col>
			</el-row>
			<el-row class="info" v-if="result.spbz">
				<el-col :span="3">上次审批备注</el-col>
				<el-col :span="21" v-html="result.spbz"></el-col>
			</el-row>
			<el-form :model="form" ref="appForm" :rules="rules">
				<el-row>
					<el-col :span="8">
						<el-form-item label="审批状态" required prop="spzt" label-width="37.5%">
								<el-switch v-model="form.spzt" :width="90"
									on-value="30" on-text="审批通过" :on-color="color.on"
									off-value="40" off-text="审批拒绝" :off-color="color.off">
								</el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="8" v-show="form.spzt === '30'">
						<el-form-item label="下次年审时间" prop="nssj"
							label-width="37.5%" class="is-required">
							<el-col :span="15" v-html="form.nssj"></el-col>
							<!--<el-date-picker v-model="form.nssj" disabled="true"
								:editable="false" class="date_picker"
								:picker-options="pickerNow"></el-date-picker>-->
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="审批拒绝原因" prop="spyy" label-width="18.75%" v-show="form.spzt === '40'">
							<select-code v-model="form.spyy" code="gyrlzyw_dw_d_dwjsyy" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="审批备注" prop="spbz" label-width="18.75%" v-show="form.spzt === '30' || form.spyy === '1'">
							<el-input type="textarea" v-model="form.spbz" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">
						<el-form-item label="验证码" prop="fsyzm" label-width="60%">
							<el-input type="text" v-model="form.fsyzm" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item  label-width="10.75%">
							<img :src="pic.change" alt="" class="change_img"
							@click="changPic()"> 点击图片换验证码 区分大小写
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item laebl="" label-width="12.5%">
							<el-button type="primary" native-type="submit" :loading='submitLoading'
								@click.prevent="submitApproval('appForm')">提交</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 审批录入 结束  -->
		<!-- dialog 预览图片 -->
		<el-dialog v-model="dialogPicVisible" size="tiny" @close="closePic">
			<img width="100%" :src="dialogPicUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import { replaceBlank } from '@/common/js/utils';

export default {
	name: 'companyReDetail',
	components: {
		breadCrumb,
		selectCode
	},
	data() {
		return {
			pickerNow: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			dwxxrz_id: this.$route.params.id,
			result: {},
			color: {
				on: '#13ce66',
				off: '#ff4949'
			},
			pic: {
				idCard: '',
				gsyyzz: '',
				zzjgdm: '',
				logo: '',
				head: '',
				xczpcns: '',
				fwzpht: '',
				change: '/common/yzmsc/yzm/yzmSc'
			},
			form: {
				dwxx_id: '',
				spzt: '30',
				spbz: '',
				nssj: '',
				spyy: '',
				fsyzm: '',
				pageNum: 1
			},
			rules: {
				spzt: [{ required: true, message: '审批状态不能为空' }],
				spbz: [{ validator: validator('256, "bz", "审批备注", true') }],
				fsyzm: [{ validator: validator('256, "bz", "验证码", false') }]
				// nssj: [{ required: true, message: '下次年审时间不能为空' }]
			},
			loading: false,
			submitLoading: false,
			dialogPicVisible: false,
			dialogPicUrl: '',
			// 按钮权限
			canSave: true,
			showNewCo: false
		};
	},
	computed: {
		routerName() {
			return this.$route.name;
		}
	},
	watch: {
		/* eslint-disable func-names */
		'form.spzt': function (val) {
			this.form.spbz = '';
			switch (val) {
			case '30':
				this.form.spyy = '';
				// this.rules.nssj = [{ required: true, message: '下次年审时间不能为空' }];
				this.rules.spyy = [{ validator: validator('256, "bz", "审批拒绝原因", true') }];
				break;
			case '40':
				this.rules.nssj = [];
				this.rules.spyy = [{ required: true, message: '审批拒绝原因不能为空' },
				{ validator: validator('256, "bz", "审批拒绝原因", false') }];
				break;
			default: break;
			}
		},
		'form.spyy': function (val) {
			if (val === '1') {
				this.rules.spbz = [{ required: true, message: '审批备注不能为空' },
				{ validator: validator('256, "bz", "审批备注", false') }];
			} else {
				this.rules.spbz = [];
			}
		}
	},
	methods: {
		// 查询 企业信息接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/spgl/dwsp/dwxxxxCx', {
				params: { dwxxrz_id: this.$route.params.id }
			}).then((res) => {
				const data = res.returnData.dwspxx;
				data.dwjj = data.dwjj.split('\n').join('<br>');
				data.bz = replaceBlank(data.bz);
				this.result = data;
				this.pic.gsyyzz = data.gsyyzzsclj + data.gsyyzzfwdmc;
				this.pic.zzjgdm = data.zzjgdmsclj + data.zzjgdmfwdmc;
				this.pic.idCard = data.jbrsfzsclj + data.jbrsfzfwdmc;
				this.pic.logo = data.dwlgsc + data.dwlgfwdmc;
				this.pic.head = data.lxrtxsclj + data.lxrtxfwdmc;
				this.pic.xczpcns = data.xczpjzcnssclj + data.xczpjzcnsfwdmc;
				this.pic.fwzpht = data.fwzphtsclj + data.fwzphtfwdmc;
				this.form.nssj = data.xcnssj;
				this.loading = false;
				if (!this.result.spr) {
					this.showNewCo = true;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 预览图片
		previewPic(url) {
			if (url) {
				this.dialogPicUrl = url;
				setTimeout(() => {
					this.dialogPicVisible = true;
				}, 5);
			}
		},
		closePic() {
			this.dialogPicUrl = '';
			this.dialogPicVisible = false;
		},
		// 提交 企业审批信息
		putData() {
			this.submitLoading = true;
			const data = this.form;
			data.dwxxrz_id = this.$route.params.id;
			data.splx = '02';
			$.put('/gyrcht/spgl/dwsp/dwxxXg', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '审批成功',
							showClose: true,
							onClose: () => {
								this.$router.go(-1);
							}
						});
					} else {
						this.changPic();
						this.$message.warning(res.returnData.message);
						this.submitLoading = false;
					}
				}).catch(() => {
					this.changPic();
					this.submitLoading = false;
				});
		},
		// 表单提交 确定
		submitApproval(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				}
			});
		},
		changPic() {
			// this.loading = true;
			this.pic.change = `/common/yzmsc/yzm/yzmSc?${Math.random()}`;
		}
	},
	created() {
		this.canSave = this.$route.params.canSave;
		this.getData();
		this.changPic();
	},
	// 导航到该组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (!to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style scoped>
.images_num {
	padding-right: 30px;
	margin-bottom: 5px;
}
.images_wrap {
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	border: 1px solid #bfc9d9;
	border-radius: 4px;
	cursor: pointer;
}
/*.images_wrap.square {
	width: 100px;
}*/
.images_wrap .images_img {
	display: block;
	width: 100%;
	/*height: 100%;*/
}
.images_btns{
	text-align: right;
	margin-top: 5px;
	margin-right: 20%;
}
.empty_text {
	margin: 0;
	border: 0;
	display: block;
	width: 100%;
	height: 100%;
	font-size: 21px;
	line-height: 100px;
	text-align: center;
	color: #bfc9d9;
}
.company_jj img {
	max-width: 100%;
}
.new_company {
	float: left;
	font-size: 16px;
	margin: -10px 0 10px 86px;
	background-color: rgba(64,158,255,.1);
	padding: 3px 10px;
	font-size: 16px;
	color: #409eff;
	border-radius: 4px;
	box-sizing: border-box;
	border: 1px solid rgba(64,158,255,.2);
}
.change_img{
	width: 90px;
}
</style>
