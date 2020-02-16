<docs>
	## 审批管理---职位审批，职位详情页面
	### @author jinglf000
	### @date ###### Mon Jul 24 09:29:02 CST 2017
</docs>

<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<p class="co_name">当前单位：{{coName}}</p>
		<div class="content" v-loading="loading">
			<el-row>
				<el-col :span="24">
					<h3 class="title">基本信息</h3>
				</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">职位名称</el-col>
				<el-col :span="5">{{result.zwmc}}</el-col>
				<el-col :span="3">工作性质</el-col>
				<el-col :span="5">{{result.gzxzmc}}</el-col>
				<el-col :span="3">是否双休</el-col>
				<el-col :span="5">{{+result.sfsx ? '是' : '否'}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">工作地点</el-col>
				<el-col :span="5">{{result.gzddqmc}}</el-col>
				<el-col :span="3">工作年限</el-col>
				<el-col :span="5">{{result.gznx? `${result.gznx}年` : ''}}</el-col>
				<el-col :span="3">职位类型</el-col>
				<el-col :span="5">{{result.zwlxmc}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">所需专业</el-col>
				<el-col :span="5">{{result.sxzymc}}</el-col>
				<el-col :span="3">转正月薪</el-col>
				<el-col :span="5">
					<span v-if="result.yxc && result.yxd">{{result.yxc}}-{{result.yxd}}元</span>
					<span v-else-if="!result.yxc && result.yxd">{{result.yxd}}元以下</span>
					<span v-else-if="result.yxc && !result.yxd">{{result.yxc}}元以上</span>
					<span v-else>不限</span>
				</el-col>
				<el-col :span="3">学历要求</el-col>
				<el-col :span="5">{{result.xlyqmc}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">年龄</el-col>
				<el-col :span="5">
					<span v-if="result.nlq && !result.nld">{{result.nlq}}岁以上</span>
					<span v-else-if="result.nlq && result.nld">{{result.nlq}}-{{result.nld}}岁</span>
				</el-col>
				<el-col :span="3">人数</el-col>
				<el-col :span="5">
					<span v-if="+result.nanrs && +result.nvrs">共{{result.zprs}}人，男性{{result.nanrs}}人，女性{{result.nvrs}}人</span>
					<span v-else-if="!+result.nanrs && +result.nvrs">女性{{result.nvrs}}人</span>
					<span v-else-if="result.zprs == -2">男性，人数不限</span>
					<span v-else-if="result.zprs == -3">女性，人数不限</span>
					<span v-else-if="+result.nanrs && !+result.nvrs">男性{{result.nanrs}}人</span>
					<span v-else-if="result.zprs > 0 && result.nanrs == 0 && result.nvrs == 0">不限男女，人数{{result.zprs}}人</span>
					<span v-else>不限男女，人数不限</span>
				</el-col>
				<el-col :span="3">是否提供住宿</el-col>
				<el-col :span="5">{{+result.sftgzs ? '是' : '否'}}</el-col>
			</el-row>
			<el-row class="info" v-if="result.bm">
				<el-col :span="3">部门</el-col>
				<el-col :span="5">{{result.bm}}</el-col>
				<el-col :span="3">联系人</el-col>
				<el-col :span="5">{{result.bmlxr}}</el-col>
				<el-col :span="3">联系方式</el-col>
				<el-col :span="5">{{result.bmlxfs}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">是否试用</el-col>
				<el-col :span="5">{{+result.sfsy ? '是' :'否'}}</el-col>
				<el-col :span="3" v-show="result.sfsy === '1'">试用期</el-col>
				<el-col :span="5" v-show="result.sfsy === '1'">{{result.syqmc}}</el-col>
				<el-col :span="3" v-show="result.sfsy === '1'">试用工资</el-col>
				<el-col :span="5" v-show="result.sfsy === '1'">{{result.syqgz}}元</el-col>
			</el-row>
			<el-row class="info" v-show="result.zplx === '01'">
				<el-col :span="3">职位有效期</el-col>
				<el-col :span="5">{{result.zwyxqmc}}</el-col>
			</el-row>
			<el-row class="info" v-if="result.fldy">
				<el-col :span="3">福利</el-col>
				<el-col :span="21">{{result.fldy}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">职位描述</el-col>
				<el-col :span="21" v-html="result.zwms"></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">职位要求</el-col>
				<el-col :span="21" v-html="result.zwyq"></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">工商营业执照</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.gsyyzz" :src="pic.gsyyzz" alt="" class="images_img"
							@click="previewPic(pic.gsyyzz)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="approval" v-show="canSave !== false">
			<el-row>
				<el-col :span="24">
					<h3 class="title_approval">审批</h3>
				</el-col>
			</el-row>
			<el-row class="info" v-if="result.spr">
				<el-col :span="3">上次审批人</el-col>
				<el-col :span="5" v-html="result.spr"></el-col>
				<el-col :span="3">上次审批时间</el-col>
				<el-col :span="5" v-html="result.sprq"></el-col>
			</el-row>
			<el-row class="info" v-if="result.spbz">
				<el-col :span="3">上次审批备注</el-col>
				<el-col :span="21" v-html="result.spbz"></el-col>
			</el-row>
			<el-form :model="form" ref="appForm" label-width="25%" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="审批状态" required prop="spzt">
								<el-switch v-model="form.spzt" :width="90"
									on-value="30" on-text="审批通过" :on-color="color.on"
									off-value="40" off-text="审批拒绝" :off-color="color.off">
								</el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="审批拒绝原因：" prop="spyy" v-show="form.spzt === '40'" label-width="18.75%">
							<select-code v-model="form.spyy" code="gyrlzyw_zw_d_zwjsyy" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="审批备注：" prop="spbz" v-show="form.spzt === '30' || form.spyy === '1'" label-width="18.75%">
							<el-input type="textarea" v-model="form.spbz" :autosize="{ minRows: 2}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item>
							<el-button :loading="submitLoading" type="primary" native-type="submit"
								@click.prevent="submitApproval('appForm')">提交</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
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
	name: 'jobDetail',
	components: {
		breadCrumb,
		selectCode
	},
	data() {
		return {
			loading: false,
			submitLoading: false,
			result: {},
			color: {
				on: '#13ce66',
				off: '#ff4949'
			},
			form: {
				dwzw_id: '',
				spzt: '30',
				spbz: '',
				spyy: '',
				pageNum: 1
			},
			pic: {
				gsyyzz: ''
			},
			rules: {
				spzt: [{ required: true, message: '审批状态不能为空' }],
				spbz: [{ validator: validator('256, "bz", "审批备注", true') }]
			},
			dwzw_id: this.$route.params.id,
			// 网上招聘 审批权限
			onLineApproval: false,
			// 现场招聘 审批权限
			scenceApproval: false,
			// 委托招聘 审批权限
			entrustApproval: false,
			canSave: false,
			// 图片查看
			dialogPicVisible: false,
			dialogPicUrl: '',
			// 是否有相同职位
			isAlert: '',
			alertMsg: '',
			// 单位名称
			coName: ''
		};
	},
	watch: {
		/* eslint-disable func-names */
		'result.zplx': function (val) {
			if (val) {
				switch (val) {
				case '01':
					this.alertMsg = '有相同的职位正在招聘，是否审批通过';
					this.canSave = this.onLineApproval;
					break;
				case '02':
					this.alertMsg = '同一场招聘会有相同的职位，是否审批通过';
					this.canSave = this.scenceApproval;
					break;
				case '03':
					this.alertMsg = '同一次委托招聘有相同的职位，是否审批通过';
					this.canSave = this.entrustApproval;
					break;
				default:
					this.alertMsg = '';
					this.canSave = false;
					break;
				}
			}
		},
		'form.spzt': function (val) {
			this.form.spbz = '';
			switch (val) {
			case '30':
				this.form.spyy = '';
				this.rules.spyy = [{ validator: validator('256, "bz", "审批备注", true') }];
				break;
			case '40':
				this.rules.spyy = [{ required: true, message: '审批备注不能为空' },
					{ validator: validator('256, "bz", "审批备注", false') }];
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
		// 职位基本信息 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/spgl/zwsp/zwxxxqCx', {
				params: { dwzw_id: this.$route.params.id, zplx: this.$route.params.zplx }
			}).then((res) => {
				this.loading = false;
				// Object.assign(this.retult, res.returnData);
				this.result = res.returnData.zwspxx;
				this.result.zwms = replaceBlank(this.result.zwms);
				this.result.zwyq = replaceBlank(this.result.zwyq);
				this.pic.gsyyzz = this.result.gsyyzzsclj + this.result.gsyyzzfwdmc;
				this.isAlert = this.result.zwmcjy;
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
		putData() {
			this.submitLoading = true;
			const data = this.form;
			data.dwzw_id = this.$route.params.id;
			data.zplx = this.$route.params.zplx;
			$.put('/gyrcht/spgl/zwsp/zwxxXg', data)
				.then((res) => {
					if (+res.returnData.executeResult === 1) {
						this.$message({
							type: 'success',
							message: '审批成功',
							showClose: true,
							onClose: () => {
								this.$router.go(-1);
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
						this.submitLoading = false;
					}
				}).catch(() => {
					this.submitLoading = false;
				});
		},
		submitApproval(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.isAlert && this.form.spzt === '30') {
						this.$confirm(this.alertMsg, '提示', {
							type: 'warning'
						}).then(() => {
							this.putData();
						}).catch(() => {});
					} else {
						this.putData();
					}
				}
			});
		}
	},
	created() {
		this.coName = this.$route.params.dwmc;
		this.onLineApproval = this.$route.params.onLineApproval;
		this.scenceApproval = this.$route.params.scenceApproval;
		this.entrustApproval = this.$route.params.entrustApproval;
		this.getData();
	},
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
</style>
