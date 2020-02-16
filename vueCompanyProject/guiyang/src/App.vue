<template>
	<div id="app" class="index_warp w">
		<!-- 头部 logo 开始-->
		<div class="header">
			<div class="logo"></div>
			<div class="system_name"></div>
			<div class="user">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="dropdown_btn">{{ userName }}<i class="el-icon-caret-bottom el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="logout">退出</el-dropdown-item>
						<el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<!-- 头部 logo 结束-->
		<!-- 主体区域 开始-->
		<div class="content" :style="{'height': height+ 'px'}" >
			<el-tooltip :content="layer.text" placement="right">
				<div :class="layer.class" @click="switchLayer" class="layer_normal">
				</div>
			</el-tooltip>
			<!-- 一二级菜单 -->
			<div class="left" :style="{ width: layer.width + 'px'}">
				<ul class="menu_list">
					<menu-list v-for="(item, index) in menuList" :menu="item" :key="index"></menu-list>
				</ul>
			</div>
			<!-- 内容区域 -->
			<div class="right bg_gray" :style="{ marginLeft: layer.marLeft + 'px'}">
				<!-- tab 栏 开始 -->
				<div class="tabs_warp">
					<tab-switch v-for="(item, index) in tabList" :tablink="item" :key="index"></tab-switch>
				</div>
				<!-- tab 栏 结束 -->
				<!-- 实际内容区域 开始-->
				<div class="tabs_content">
					<keep-alive :include="tabIncludes">
						<router-view ></router-view>
					</keep-alive>
				</div>
				<!-- 实际内容区域 结束-->
			</div>
		</div>
		<!-- 主体区域 结束-->
		<!-- 修改密码弹窗 start -->
		<el-dialog title="修改密码" :visible.sync="visiblePwd" size="tiny"
			@close="pwdCancel('formPwd')">
			<el-form :model="formPwd" :label-width="labelWidth" :rules="rules"
				ref="formPwd">
				<el-form-item label="新密码" prop="yhxmm" required>
					<el-input v-model="formPwd.yhxmm"></el-input>
				</el-form-item>
			</el-form>
			<div class="footer" slot="footer">
				<el-button @click="pwdCancel('formPwd')">取消</el-button>
				<el-button type="primary" @click="pwdSubmitBtn('formPwd')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改密码弹窗 end -->
	</div>
</template>

<script>
import menuList from '@/common/vue/menuList';
import menuJson from '@/common/menu.json';   // 正式上线注释掉
import tabSwitch from '@/common/vue/tabSwitch';
import { RESTYPE, labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';

export default {
	// 引用的组件
	components: { menuList, tabSwitch },
	name: 'app',
	data() {
		return {
			labelWidth,
			height: window.innerHeight - 62,
			menuList: [],
			// true为 open，false为close
			layer: {
				state: '',
				class: '',
				text: '',
				width: 210,
				marLeft: 210
			},
			// 操作员名称
			userName: '管理员',
			// 修改密码弹窗
			visiblePwd: false,
			formPwd: {
				yhxmm: ''
			},
			rules: {
				yhxmm: [{ required: true, message: '请输入新密码' }]
				// yhmm: [{ validator: validator('48, "password", "用户密码", false') }]
			}
		};
	},
	computed: {
		tabList() {
			return this.$store.state.tabs;
		},
		tabIncludes() {
			return this.$store.getters.tabIncludes;
		}
	},
	watch: {
		/* eslint-disable func-names */
		'layer.state': function () {
			const layer = this.layer;
			// layer.state为 true 当前状态为展开状态
			if (layer.state) {
				layer.class = 'layer_open';
				layer.text = '折叠';
				layer.width = 210;
				layer.marLeft = 210;
				sessionStorage.setItem('layerState', '1');
			} else {
				layer.class = 'layer_close';
				layer.text = '展开';
				layer.width = 0;
				layer.marLeft = 20;
				sessionStorage.setItem('layerState', '0');
			}
		}
	},
	methods: {
		resizeHeight() {
			this.height = window.innerHeight - 62;
		},
		switchLayer() {
			const layer = this.layer;
			layer.state = !layer.state;
		},
		// 登陆用户下拉选项
		/* eslint-disable indent */
		handleCommand(command) {
			switch (command) {
				case 'logout':
					this.$confirm('确定要退出么？', '提示', {
						type: 'warning'
					}).then(() => {
						$.get('/tyzx/logout/htLogout').then((res) => {
							if (res.returnData.executeResult === '1') {
								window.location.href = './login.html';
							}
						}).catch(() => {});
					}).catch(() => {});
					break;
				case 'changePwd':
					// this.$confirm('确定要修改密码吗？', '提示', {
					// 	type: 'warning'
					// }).then(() => {
					this.visiblePwd = true;
					// });
					break;
				default:
					break;
			}
		},
		getDataMenuTree() {
			$.get('/login/admin/getMenuTreeJson', {
				params: { restype: RESTYPE }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.menuList = res.returnData.menuList[0].children;  // 正式上线放开
					const userName = res.returnData.userName;
					if (userName) {
						this.userName = userName;
					}
				}
			}).catch(() => {});
		},
		pwdCancel(formName) {
			this.visiblePwd = false;
			this.$refs[formName].resetFields();
		},
		// 修改密码 确定按钮
		pwdSubmitBtn(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('确定要修改密码吗？', '提示', {
						type: 'warning'
					}).then(() => {
						this.pwdSubmit();
					}).catch(() => {});
				}
			});
		},
		// 提交新密码 接口
		pwdSubmit() {
			$.put('/login/admin/htdlmmXg', this.formPwd).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('修改成功');
					this.visiblePwd = false;
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		// 异步根据不同的用户权限，获取左侧菜单树
		const vm = this;
		vm.menuList = menuJson; // 正式上线注释掉
		// 用户的展开状态
		const sessionLayerState = sessionStorage.getItem('layerState');
		// this.getDataMenuTree();
		if (!sessionLayerState) {
			this.layer.state = true;
		} else {
			this.layer.state = !!+sessionLayerState;
		}
	},
	mounted() {
		window.addEventListener('resize', this.resizeHeight);
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeHeight);
	}
};
</script>

<style>
	/* 切换layer 左侧菜单*/
	.layer_normal:before {
		content: '\e608';
		font-family: 'iconfont';
		color: #fff;
		font-size: 18px;
		font-weight: lighter;
		position: absolute;
		padding: 2px;
		top: 0;
		transition: background ease .2s;
		border-radius: 4px;
	}
	.layer_normal:hover:before {
		background: #fff;
		color: #2e8ae6;
		/* color: red; */
	}
	.layer_normal {
		position: absolute;
		z-index: 50;
		top: 10px;
		cursor: pointer;
		width: 20px;
		height: 20px;
	}
	.layer_open {
		left: 160px;
		padding-left: 10px;
	}
	.layer_close {
		left: 0;
		transform: rotate(-180deg);
		height: 100%;
		top: 0;
	}
	.layer_close:before {
		top: calc(50% - 10px);
	}
	/* 主体 */
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.index_warp{
		background: #52c9e6 url(~@m1/index/index_bg.jpg) repeat-x left top;
	}
	/* 头部 */
	.header{
		width: 100%;
		height: 62px;
	}
	.logo{
		display: inline-block;
		width: 100px;
		height: 100%;
		background: url(~@m1/common/logo.png) no-repeat right center;
	}
	.system_name{
		display: inline-block;
		width: 350px;
		height: 100%;
		background: url(~@m1/common/system_name.png) no-repeat left center;
	}
	.user {
		float: right;
		height: 42px;
		line-height: 42px;
		margin-right: 20px;
		padding: 10px 0;
		/* padding-left: 50px; */
		/* background: url(~@m1/common/user_pic.png) no-repeat left center; */
	}
	.user .dropdown_btn{
		color: #fff;
		cursor: pointer;
	}
	/* 主体内容 */
	.content{
		width: 100%;
		position: relative;
	}
	.left{
		position: absolute;
		left: 0;
		top: 0;
		width: 210px;
		height: 100%;
		overflow: auto;
		background: url(~@m1/index/menu_bg.png) no-repeat left bottom;
		/* background-color: */
	}
	.right{
		height: 100%;
		overflow: auto;
		margin-left: 210px;
		border-top-left-radius:5px;
		background-color: #f2f3f5;
		position: relative;
	}
	/* 一级菜单 */
	.menu_list{
		width: 100%;
		margin-top: 30px;
	}
	.menu_list li{
		width: 100%;
		position: relative;
	}
	.menu_list li i{
		position: absolute;
		left:20px ;
		top: 13px;
		font-size: 16px;
		color: #fff;
	}
	.menu_list .link {
		transition: all  ease .3s;
		cursor: pointer;
	}
	/* link 选中状态*/
	/* meun 链接*/
	.menu_list .router-link-active,
	.menu_list .link:hover{
		font-weight: 600;
		background: #2176c5;
	}
	.menu_list li .link{
		display: inline-block;
		width: 100%;
		box-sizing: border-box;
		padding: 10px 0 10px 45px;
		color: #ffffff;
		font-size: 16px;
	}
	.menu_list .level_2{
		/* display: none; */
		width: 100%;
	}
	/* 二级菜单 */
	.menu_list .level_2 > li > .link,
	.menu_list .level_2 > li > li > .link {
		display: block;
		padding: 10px 0 10px 46px;
		color: #ffffff;
		font-size: 14px;
	}
	/* 三级菜单 */
	.menu_list .level_2 .level_2 > li > .link {
		display: block;
		padding: 10px 0 10px 56px;
		color: #ffffff;
		font-size: 14px;
	}
	/* .menu_list .level_2 > li > a:hover
	{
		font-weight: 600;
		background: #2176c5;
	} */

	/* tabs 栏 */
	.right .tabs_warp{
		/* width: 100%; */
		padding-top: 5px;
		padding-left: 10px;
		border-bottom: 2px solid #46a3ff;
		border-top-left-radius:10px;
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		z-index: 1000;
		background: rgba(255, 255, 255, .9);
		 box-shadow: 0 1px 6px rgba(29, 78, 128, .3);
	}
	/* tabs_content tabs的内容区域包裹 */
	.right .tabs_content{
		margin-top: 40px;
		padding: 10px 10px;
	}
	/* 路由动画 */
	/* 登录视图 */
	#login{
		background-color: #fff;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
</style>
