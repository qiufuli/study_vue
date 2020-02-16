<docs>
	## 组织关系证明 审核页面
	### @author lvlp
	### @date ###### Mon Jul 24 09:29:02 CST 2017
</docs>

<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div class="content" v-loading="loading">
			<el-row>
				<el-col :span="24">
					<h3 class="title">基本信息</h3>
				</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">姓名</el-col>
				<el-col :span="5">{{result.xm}}</el-col>
				<el-col :span="3">身份证号码</el-col>
				<el-col :span="5">{{result.sfzh}}</el-col>
				<el-col :span="3">性别</el-col>
				<el-col :span="5">{{ result.xb === '1' ? '男' : '女'}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">档案编号</el-col>
				<el-col :span="5">{{result.dabh}}</el-col>
				<el-col :span="3">审核日期</el-col>
				<el-col :span="5">{{result.shrq}}</el-col>
				<el-col :span="3">出生日期</el-col>
				<el-col :span="5">{{result.csrq}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">毕业时间</el-col>
				<el-col :span="5">{{result.byrq}}</el-col>
				<el-col :span="3">毕业院校</el-col>
				<el-col :span="5">{{result.byyx}}</el-col>
				<el-col :span="3">存档日期</el-col>
				<el-col :span="5">{{result.cdrq}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">邮箱</el-col>
				<el-col :span="5">{{result.dzyx}}</el-col>
			</el-row>
			<!-- <el-row class="info">
				<el-col :span="3">web身份证</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.websfz" :src="pic.websfz" alt="" class="images_img"
							@click="previewPic(pic.websfz)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>
			</el-row>
      <el-row class="info">
				<el-col :span="3">app身份证</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.appsfz" :src="pic.appsfz" alt="" class="images_img"
							@click="previewPic(pic.appsfz)">
						<p v-else class="empty_text">暂无图片</p>
					</div>
				</el-col>
			</el-row> -->
		</div>
		<div class="approval">
			<el-row>
				<el-col :span="24">
					<h3 class="title_approval">审批</h3>
				</el-col>
			</el-row>
			<el-form :model="form" ref="appForm" label-width="25%" :rules="rules">
				<el-row>
					<el-col :span="12">
						<el-form-item label="审批状态" required prop="shzt">
								<el-switch v-model="form.shzt" :width="90"
									on-value="10" on-text="审批通过" :on-color="color.on"
									off-value="20" off-text="审批拒绝" :off-color="color.off">
								</el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16" v-show="form.shzt == '20'">
						<el-form-item label="拒绝原因：" prop="jjyy" label-width="18.75%">
							<el-input type="textarea" v-model="form.jjyy" :autosize="{ minRows: 2}"></el-input>
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
		<!-- 调档函打印 dialog 开始 -->
		<prove-cert :visible.sync="dialogAcess" :kjzmId="kjzmId" @proveAndSend="proveAndSend" :isSend="true"></prove-cert>
		<!-- 调档函打印 dialog 结束 -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import proveCert from './components/proveCert';

export default {
	name: 'partyRelationDetail',
	components: {
		breadCrumb,
		selectCode,
		proveCert
	},
	data() {
		return {
			loading: false,
			submitLoading: false,
			dialogAcess: false,
			kjzmId: '',
			result: {},
			color: {
				on: '#13ce66',
				off: '#ff4949'
			},
			form: {
				kjzm_id: '',
				shzt: '10',
				jjyy: ''
			},
			// pic: {
			// 	websfz: '',
			// 	appsfz: ''
			// },
			rules: {
				shzt: [{ required: true, message: '审核状态不能为空' }],
				jjyy: [{ validator: validator('256, "bz", "拒绝原因", true') }]
			},
			// 图片查看
			dialogPicVisible: false,
			dialogPicUrl: ''
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.shzt': function (val) {
			switch (val) {
			case '10':
				this.form.jjyy = '';
				this.rules.jjyy = [{ validator: validator('256, "bz", "拒绝原因", true') }];
				break;
			case '20':
				this.rules.jjyy = [{ required: true, message: '拒绝原因不能为空' },
					{ validator: validator('256, "bz", "拒绝原因", false') }];
				break;
			default: break;
			}
		}
	},
	methods: {
		// 职位基本信息 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/sqshxqCx', {
				params: { kjzm_id: this.$route.params.id }
			}).then((res) => {
				this.loading = false;
				this.result = res.returnData.sqshxq;
				// this.result.zwms = replaceBlank(this.result.zwms);
				// this.pic.websfz = this.result.web_sfzzpsclj + this.result.web_sfzzpfwdmc;
				// this.pic.appsfz = this.result.app_sfzzpsclj + this.result.app_sfzzpfwdmc;
				if (this.result.shzt) {
					this.form.shzt = this.result.shzt;
				} else {
					this.form.shzt = '10';
				}
				this.form.jjyy = this.result.jjyy;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 预览图片
		// previewPic(url) {
		// 	if (url) {
		// 		this.dialogPicUrl = url;
		// 		setTimeout(() => {
		// 			this.dialogPicVisible = true;
		// 		}, 5);
		// 	}
		// },
		closePic() {
			this.dialogPicUrl = '';
			this.dialogPicVisible = false;
		},
		putData() {
			this.submitLoading = true;
			const data = this.form;
			data.kjzm_id = this.$route.params.id;
			data.dyyh_id = this.$route.params.yh_id;
			$.put('/gyrcht/rsdldw/rsdldw/sqzmshBc', data)
				.then((res) => {
					if (+res.returnData.executeResult === 1) {
						this.$message({
							type: 'success',
							message: '审核成功',
							showClose: true,
							onClose: () => {
								this.kjzmId = data.kjzm_id;
								if (+data.shzt === 10) {
									setTimeout(() => {
										this.dialogAcess = true;
									}, 1000);
								} else {
									this.$router.go(-1);
								}
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
					this.putData();
				}
			});
		},
		// 生成证明并发送邮件
		proveAndSend() {
			this.loading = true;
			$.post('/gyrcht/rsdldw/rsdldw/sczmbfsyjBc', {
				kjzm_id: this.kjzmId
			}).then((res) => {
				this.loading = false;
				if (res.returnData.executeResult === '1') {
					// this.$message.success('发送成功');
					this.$alert('操作成功', '生成证明并发送邮件', {
						confirmButtonText: '确定',
						callback: () => {
							this.$router.go(-1);
						}
						// callback: action => {
						// 	this.$message({
						// 		type: 'info',
						// 		message: `action: ${ action }`
						// 	});
						// }
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
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
/* .images_wrap {
	position: relative;
	display: block;
	width: 30%;
	height: 100%;
	border: 1px solid #bfc9d9;
	border-radius: 4px;
	cursor: pointer;
} */
/*.images_wrap.square {
	width: 100px;
}*/
/* .images_wrap .images_img {
	display: block;
	width: 100%;
	height: 200px;
} */
.el-loading-mask {
	background: transparent;
}
</style>
