<docs>
	## 审批管理---职位审批
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
				<el-col :span="5">{{+result.xb === 1 ? '男' : '女'}}</el-col>
			</el-row>
			<el-row class="info" v-if="this.kjzmlx === '30'">
				<el-col :span="3">详细内容</el-col>
				<el-col :span="5">{{result.xxnr}}</el-col>
			</el-row>
			<!-- <el-row class="info">
				<el-col :span="3">身份证</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img v-if="pic.sfz" :src="pic.sfz" alt="" class="images_img"
							@click="previewPic(pic.sfz)">
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
					<el-col :span="16">
						<el-form-item label="拒绝原因：" prop="jjyy" v-show="form.shzt === '20'" label-width="18.75%">
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
		<!-- <el-dialog v-model="dialogPicVisible" size="tiny" @close="closePic">
			<img width="100%" :src="dialogPicUrl" alt="">
		</el-dialog> -->
		<!-- 证明打印 dialog 开始 -->
		<service-cert :visible.sync="dialogAcess" :kjzmId="kjzmId" @proveAndSend="proveAndSend" :isSend="true" :enterList="false"></service-cert>
		<!-- 证明打印 dialog 结束 -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import serviceCert from './components/serviceCert';

export default {
	name: 'danganServiceApproval',
	components: {
		breadCrumb,
		selectCode,
		serviceCert
	},
	data() {
		return {
			loading: false,
			submitLoading: false,
			dialogAcess: false,
			result: {},
			color: {
				on: '#13ce66',
				off: '#ff4949'
			},
			form: {
				kjzm_id: '',
				shzt: '10',
				jjyy: '',
				kjzmlx: ''
			},
			// pic: {
			// 	sfz: ''
			// },
			rules: {
				shzt: [{ required: true, message: '审核状态不能为空' }],
				jjyy: [{ validator: validator('256, "bz", "拒绝原因", true') }]
			}
			// 图片查看
			// dialogPicVisible: false,
			// dialogPicUrl: ''
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
			$.get('/gyrcht/kjzm/kjzm/sqshxqCx', {
				params: { kjzm_id: this.$route.params.id }
			}).then((res) => {
				this.loading = false;
				this.result = res.returnData.sqshxq;
				// this.form = res.returnData.sqshxq;
				this.form.kjzm_id = res.returnData.sqshxq.kjzm_id;
				this.form.jjyy = res.returnData.sqshxq.jjyy;
				this.form.shzt = res.returnData.sqshxq.shzt;
				// this.result.zwms = replaceBlank(this.result.zwms);
				// this.pic.sfz = this.result.sfzzpsclj + this.result.sfzzpfwdmc;
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
			data.kjzmlx = this.kjzmlx;
			data.kjzm_id = this.$route.params.id;
			data.dabh = this.$route.params.dabh;
			$.post('/gyrcht/kjzm/kjzm/sqshBc', data)
				.then((res) => {
					this.submitLoading = false;
					if (+res.returnData.executeResult === 1) {
						if (+this.form.shzt === 10) {
							if (+this.kjzmlx === 20) {
								this.$message({
									type: 'success',
									message: '审核成功'
									// showClose: true,
									// onClose: () => {
									// 	this.$router.go(-1);
									// }
								});
								setTimeout(() => {
									this.dialogAcess = true;
								}, 1000);
							} else if (+this.kjzmlx === 30) {
								this.$message({
									type: 'success',
									message: '审核成功',
									showClose: true,
									onClose: () => {
										// this.$router.go(-1);
										this.$router.push({
											name: 'danganServiceMeter',
											params: {
												id: data.kjzm_id,
												isNew: true,
												kjzmlx: data.kjzmlx
											}
										});
									}
								});
							}
						} else {
							this.$message({
								type: 'success',
								message: '审核成功',
								showClose: true,
								onClose: () => {
									this.$router.go(-1);
								}
							});
						}
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
			$.post('/gyrcht/kjzm/kjzm/zmscfsyjBc', {
				kjzm_id: this.kjzmId,
				kjzmlx: this.kjzmlx
			}).then((res) => {
				this.loading = false;
				if (res.returnData.executeResult === '1') {
					// this.$message.success('发送成功');
					this.$alert('操作成功', '生成证明并发送邮件', {
						confirmButtonText: '确定',
						callback: () => {
							this.$router.go(-1);
						}
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
		this.kjzmId = this.$route.params.id;
		this.kjzmlx = this.$route.params.kjzmlx;
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
.el-loading-mask {
	background: transparent;
}
</style>
