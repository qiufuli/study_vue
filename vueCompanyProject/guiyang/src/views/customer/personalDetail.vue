<docs>
	## 客户管理---单位客户管理，个人客户详情页
	## 功能包括：查询个人信息和修改个人信息
	## @author jinglf000
	## @date ###### Wed Jul 26 13:45:45 CST 2017
</docs>

<template>
<div class="detail_wrap">
	<bread-crumb></bread-crumb>
	<div v-loading="loadingGet">
		<div class="profile">
			<el-row>
				<el-col :span="24"><h3 class="title">基本资料</h3></el-col>
			</el-row>
			<el-row>
				<el-col class="info">
					<el-col :span="3">账号：</el-col>
					<el-col :span="5">{{result.yhzh}}</el-col>
					<el-col :span="3">注册日期：</el-col>
					<el-col :span="5">{{result.zcrq}}</el-col>
				</el-col>
			</el-row>
			<!--修改客户信息 开始  -->
			<el-form :model="form" ref="formProfile" :rules="rules" label-width="37.5%">
				<el-row>
					<el-col :span="8">
						<el-form-item prop="yhxm" required label="用户姓名：">
							<el-input v-model="form.yhxm" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="sjh" required  label="手机号：">
							<el-input v-model="form.sjh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="yx" required label="邮箱：">
							<el-input v-model="form.yx"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show="canSave !== false">
					<el-col :span="8">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loadingPut"
								@click.prevent="submitSave('formProfile')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!--修改客户信息 结束  -->
		</div>
		<!--个人简历和记录  -->
		<div>
			<el-tabs @tab-click="tabsSwitch" v-model="tabOn">
				<el-tab-pane label="个人简历" name="resumes">
					<el-table ref="resultResumes" :data="resumeLists" stripe
						class="table_wrap width_100" @cell-click="checkResume">
						<el-table-column label="简历名称" prop="jlmc"
							class-name="color_anchor cur_pointer"></el-table-column>
						<el-table-column label="姓名" prop="yhxm"></el-table-column>
						<el-table-column label="年龄（岁）" prop="nl"></el-table-column>
						<el-table-column label="工作经验（年）" prop="gznx"></el-table-column>
						<el-table-column label="期望薪资（元）" prop="qwxz">
							<template scope="salary">
								<span v-if="salary.row.yxc && salary.row.yxd">{{salary.row.yxc}}-{{salary.row.yxd}}</span>
								<span v-else-if="!salary.row.yxc && salary.row.yxd">{{salary.row.yxd}}以下</span>
								<span v-else-if="salary.row.yxc && !salary.row.yxd">{{salary.row.yxc}}以上</span>
								<span v-else>不限</span>
							</template>
						</el-table-column>
						<el-table-column label="工作性质" prop="gzxzmc"></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="沟通记录" name="records">
					<el-table ref="resultRecords" :data="recordsList" stripe class="table_wrap width_100">
						<el-table-column label="内容" prop="fsnr" min-width="200"></el-table-column>
						<el-table-column label="发送时间" prop="fssj" min-width="110"></el-table-column>
						<el-table-column prop="fszt" label="发送状态">
							<template scope="postCode">
								<span v-if="postCode.row.fszt === '1'">成功</span>
								<span v-else>失败</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="pagination_wrap" v-show="recordsList.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="pageTotalRecord"
							:current-page.sync="formRecords.pageNum"
							@current-change="getData"></el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</div>
</template>
<script>

import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';

export default {
	name: 'cusPersonalDetail',
	components: { breadCrumb },
	data() {
		return {
			// 组件传入id
			id: this.$route.params.id,
			loadingGet: false,
			loadingPut: false,
			loadingGetRecords: false,
			tabOn: 'resumes',
			resumeLists: [],
			recordsList: [],
			result: {},
			form: {
				yh_id: '',
				yhxm: '',
				sjh: '',
				czlx: '1',
				czbs: '0',
				yx: ''
			},
			formRecords: {
				yh_id: '',
				pageNum: 1
			},
			rules: {
				yhxm: [{ validator: validator('64, "full", "姓名", false') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", false') }],
				yx: [{ validator: validator('48, "email", "邮箱", false') }]
			},
			pageTotalRecord: 0,
			// 按钮权限
			canSave: false
		};
	},
	methods: {
		// 查询个人信息 接口
		getData() {
			this.loadingGet = true;
			// 获取个人信息
			$.get('/gyrcht/khgl/grkh/grkhxqCx', {
				params: { yh_id: this.id }
			}).then((res) => {
				const data = res.returnData;
				// 给form赋值
				Object.keys(this.form).forEach((item) => {
					if (item !== 'czlx' && item !== 'czbs') {
						this.form[item] = data.grkhxq[item];
					}
				});
				// 账号/注册日期
				this.result.yhzh = data.grkhxq.yhzh;
				this.result.zcrq = data.grkhxq.zcrq;
				// 个人简历列表
				this.resumeLists = data.grjllb;
				this.loadingGet = false;
			}).catch(() => {
				this.loadingGet = false;
			});
		},
		// 修改个人信息 接口
		putData() {
			this.loadingPut = true;
			// 修改个人信息
			$.put('/gyrcht/ywgl/zpbl/yhxxXg', this.form).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('修改成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loadingPut = false;
			}).catch(() => {
				this.loadingPut = false;
			});
		},
		// 获取沟通记录 接口
		getDataRecords() {
			this.loadingGetRecords = true;
			// 查询时为表单赋值用户id
			this.formRecords.yh_id = this.id;
			$.get('/gyrcht/khgl/grkh/gtjlCx', {
				params: this.formRecords
			}).then((res) => {
				this.recordsList = res.returnData.gtjllb;
				this.pageTotalRecord = +res.rowsCount || 0;
				this.loadingGetRecords = false;
			}).catch(() => {
				this.loadingGetRecords = false;
				// 请求失败清空id
				this.formRecords.yh_id = '';
			});
		},
		// 提交个人信息修改
		submitSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('此操作将会修改客户的基本资料，是否继续？', '确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.putData();
					}).catch(() => {});
				}
			});
		},
		// tabs 切换
		tabsSwitch(tab) {
			// 根据id判断是否查询过
			if (tab.name === 'records' && this.formRecords.yh_id !== this.id) {
				this.getDataRecords();
			}
		},
		checkResume(row, column) {
			if (column.property === 'jlmc') {
				this.$router.push({
					name: 'cusPerResume',
					params: {
						id: row.grjl_id,
						name: row.jlmc
					}
				});
			}
		}
	},
	// 载入页面
	created() {
		this.canSave = this.$route.params.canSave;
		this.getData();
	},
	// 刷新回到首页
	beforeRouteEnter(to, form, next) {
		if (!to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style></style>
