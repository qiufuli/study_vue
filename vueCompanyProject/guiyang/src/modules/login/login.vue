<doc>
	## 登录页面
	* md5 密码加密
</doc>
<template>
	<div class="login_wrap">
		<div class="login_container">
			<div class="login_title"></div>
			<el-form ref="form" :model="form" :rules="rules" class="login_form">
				<el-form-item prop="yhzh" class="username">
					<el-input v-model="form.yhzh" type="text" ref="yhzh"></el-input>
				</el-form-item>
				<el-form-item prop="yhmm" class="password">
					<el-input v-model="form.yhmm" type="password" ref="yhmm"></el-input>
				</el-form-item>
				<!-- <el-form-item class="pw_server">
					<el-checkbox v-model="checked" checked class="float_l">记住密码</el-checkbox>
					<a href="javascript:void(0);" class="float_r">忘记密码？</a>
				</el-form-item> -->
				<el-button type="primary" native-type="submit" :loading="logining" class="login_btn"
					@click.prevent="submitFrom" >登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
// import { validator } from '@/common/js/valid';
import md5 from '@/common/js/md5';
import $ from '@/common/js/axios';

export default {
	name: 'login',
	data() {
		return {
			// 防止重复点击 登录
			logining: false,
			// 勾选记住密码
			checked: false,
			// 登录表单信息
			form: {
				yhzh: '',
				yhmm: ''
			},
			// 非空验证
			rules: {
				yhzh: [{ required: true, message: '请输入账号' }],
				yhmm: [{ required: true, message: '请输入密码' }]
			}
		};
	},
	methods: {
		// 提交表单
		submitFrom() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.getData();
				}
			});
		},
		getData() {
			const data = {
				yhzh: this.form.yhzh,
				yhmm: md5(this.form.yhmm)
			};
			return $.get('/login/admin/admindlCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					window.location.href = './index.html';
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => { });
		}
	}
};
</script>

<style lang="less" scoped>
// 页面容器+背景
.login_wrap {
	position: relative;
	width: 100%;
	height: 100%;
	min-width: 1080px;
	min-height: 540px;
	background: url('~@m1/login_bg.jpg') no-repeat center / cover;
}
// 内容
.login_container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 1080px;
	height: 540px;
	margin: auto;
	font: 400 16px/1.5 "Microsoft Yahei"; // 统一字体
	// logo
	.login_title {
		width: 100%;
		height: 60px;
		margin-bottom: 75px;
		background: url('~@m1/login_t.png') no-repeat center / contain;
	}
	// 表单
	.login_form {
		box-sizing: border-box;
		width: 480px;
		border-radius: 5px;
		margin: 0 auto;
		padding: 45px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 5px 6px rgba(51, 153, 255, .3);
		// 按钮
		.login_btn {
			font-size: 22px;
			width: 100%;
			height: 50px;
			border-radius: 5px;
			letter-spacing: 10px;
		}
	}
}
</style>
