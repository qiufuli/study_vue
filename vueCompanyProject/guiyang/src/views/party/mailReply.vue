<docs>
	## 党员信箱---党员信箱回复
	* @date ###### Mon Aug 7 14:09:43 CST 2017
	* @author jinglf000
	* @desc 对党员的留言进行回复
	* @remarks  改页面的入口为，mailBox菜单，带过来的数据key为`params.row`，为查询接口的内容
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<!--留言内容 开始  -->
		<div class="content">
			<el-row>
				<el-col :span="24"><h3 class="title">留言内容</h3></el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">留言姓名</el-col>
				<el-col :span="21">{{content.lyxm}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">留言标题</el-col>
				<el-col :span="21">{{content.lybt}}</el-col>
			</el-row>
			<el-row class="info">
				<el-col :span="3">留言内容</el-col>
				<el-col :span="21">{{content.lynr}}</el-col>
			</el-row>
		</div>
		<!--留言内容 结束  -->
		<!--回复 开始  -->
		<div class="reply">
			<el-row>
				<el-col :span="24"><h3 class="title">回复</h3></el-col>
			</el-row>
			<el-form :model="form" ref="formReply" label-width="12.5%" v-loading="loading" :rules="rules">
				<el-form-item label="是否显示" prop="sfxs">
					<el-switch v-model="form.sfxs" on-text="是" :on-color="color.on" on-value="1"
					:off-color="color.off" off-text="否" off-value="0" :disabled="disabled"></el-switch>
				</el-form-item>
				<el-form-item label="回复内容" prop="hfnr" required>
					<el-input type="textarea" v-model="form.hfnr" :disabled="disabled" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.prevent="save('formReply')"
					native-type="submit" :disabled="disabled">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--回复 结束  -->
	</div>

</template>
<script>
import { colorOn, colorOff } from '@/common/js/config';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'partyMailReply',
	components: { breadCrumb },
	data() {
		return {
			color: {
				on: colorOn,
				off: colorOff
			},
			form: {
				sfxs: '1',
				hfnr: '',
				dyxx_id: ''
			},
			content: {
				hfnr: '',
				dyxx_id: '',
				sfxs: '',
				lybt: '',
				lynr: '',
				lyxm: '',
				hfzt: ''
			},
			disabled: false,
			rules: {
				hfnr: [{ required: true, message: '回复内容不能为空' }]
			},
			loading: false
		};
	},
	methods: {
		// 保存回复内容
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				}
			});
		},
		// 回复内容查询 接口
		getData() {
			$.get('/gyrcht/rsdldw/rsdldw/dyxxbjCx', {
				params: { dyxx_id: this.$route.params.id }
			}).then((res) => {
				this.content = res.returnData.dyxx;
				Object.keys(this.form).forEach((item) => {
					this.form[item] = res.returnData.dyxx[item];
				});
				if (this.content.hfzt === '1') {
					this.disabled = true;
				} else {
					this.disabled = false;
					this.form.sfxs = '1';
				}
			}).catch(() => {});
		},
		// 提交回复内容 接口
		putData() {
			this.loading = true;
			$.put('/gyrcht/rsdldw/rsdldw/hfBc', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '回复成功！',
						showClose: true,
						onClose: () => {
							this.$router.go(-1);
						}
					});
				} else {
					this.$message.error(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.getData();
	},
	activated() {
		if (this.id !== this.$route.params.id) {
			this.getData();
		}
	},
	// 在进入本页之前，判断是否有id，否则跳到首页
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

</style>
