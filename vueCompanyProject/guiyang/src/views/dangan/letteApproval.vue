<docs>
	## 审批管理---职位审批，职位详情页面
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
				<el-col :span="3">身份证号</el-col>
				<el-col :span="5">{{result.sfzh}}</el-col>
				<el-col :span="3">性别</el-col>
				<el-col :span="5">{{+result.xb === 1 ? '男' : '女'}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">户籍所在地</el-col>
				<el-col :span="5">{{result.hjszd}}</el-col>
				<el-col :span="3">单位类型</el-col>
				<el-col :span="5">{{result.dwlx}}</el-col>
				<el-col :span="3">工作所在地</el-col>
				<el-col :span="5">{{result.gzszd}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">档案所在地</el-col>
				<el-col :span="5">{{result.daszd}}</el-col>
				<el-col :span="3">单位名称</el-col>
				<el-col :span="5">{{result.sfbdsy}}</el-col>
				<el-col :span="3">机构名称</el-col>
				<el-col :span="5">{{result.dacfjgmc}}</el-col>
			</el-row>
			<el-row class="info" v-if="pic.sfz">
				<el-col :span="3">身份证</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img :src="pic.sfz" alt="" class="images_img"
							@click="previewPic(pic.sfz)">
						<!-- <p v-else class="empty_text">暂无图片</p> -->
					</div>
				</el-col>
			</el-row>
			<el-row class="info" v-if="pic.hkbzz">
				<el-col :span="3">户口本</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img :src="pic.hkbzz" alt="" class="images_img"
							@click="previewPic(pic.hkbzz)">
						<!-- <p v-else class="empty_text">暂无图片</p> -->
					</div>
				</el-col>
			</el-row>
			<el-row class="info" v-if="pic.ygydwjczz">
				<el-col :span="3">原国有单位解除劳动关系证明</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img :src="pic.ygydwjczz" alt="" class="images_img"
							@click="previewPic(pic.ygydwjczz)">
						<!-- <p v-else class="empty_text">暂无图片</p> -->
					</div>
				</el-col>
			</el-row>
			<el-row class="info" v-if="pic.xgzdwgzz">
				<el-col :span="3">现工作单位工作证明</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img :src="pic.xgzdwgzz" alt="" class="images_img"
							@click="previewPic(pic.xgzdwgzz)">
						<!-- <p v-else class="empty_text">暂无图片</p> -->
					</div>
				</el-col>
			</el-row>
			<el-row class="info" v-if="pic.sjqmzz">
				<el-col :span="3">手写签名</el-col>
				<el-col :span="19">
					<div class="images_wrap">
						<img :src="pic.sjqmzz" alt="" class="images_img"
							@click="previewPic(pic.sjqmzz)">
						<!-- <p v-else class="empty_text">暂无图片</p> -->
					</div>
				</el-col>
			</el-row>
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

export default {
	name: 'danganLetteApproval',
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
				kjddh_id: '',
				shzt: '10',
				jjyy: ''
			},
			pic: {
				sfz: '',
				hkbzz: '',
				ygydwjczz: '',
				xgzdwgzz: '',
				sjqmzz: ''
			},
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
			$.get('/gyrcht/ldryda/ldryda/ddhxqCx', {
				params: { kjddh_id: this.$route.params.id }
			}).then((res) => {
				this.loading = false;
				this.result = res.returnData.ddhxq;
				this.form = res.returnData.ddhxq;
				// this.result.zwms = replaceBlank(this.result.zwms);
				this.pic.sfz = this.result.sfzsclj + this.result.sfzfwdmc;
				this.pic.hkbzz = this.result.hkbsclj + this.result.hkbfwdmc;
				this.pic.ygydwjczz = this.result.ygydwjcldgxzmsclj + this.result.ygydwjcldgxzmfwdmc;
				this.pic.xgzdwgzz = this.result.xgzdwgzzmsclj + this.result.xgzdwgzzmfwdmc;
				this.pic.sjqmzz = this.result.sjqmsclj + this.result.sjqmfwdmc;
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
			data.kjddh_id = this.$route.params.id;
			$.post('/gyrcht/ldryda/ldryda/ddhshBc', data)
				.then((res) => {
					if (+res.returnData.executeResult === 1) {
						this.$message({
							type: 'success',
							message: '审核成功',
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
					this.putData();
				}
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
.images_wrap {
	position: relative;
	display: block;
	/* width: 100%;
	height: 100%; */
	width: 40%;
	height: 250px;
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
	height: 100%;
}
</style>
