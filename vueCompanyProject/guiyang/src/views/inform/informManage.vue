<docs>
	##求职招聘---急需岗位
	* @author ChenXue
	* @date 2018年7月12日
	* @desc 查询 / 标记 急需岗位
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="标题" prop="bt">
								<el-input type="text" v-model="form.bt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="父类型" prop="flxbh">
							<el-select class="width_100" v-model="form.flxbh"
								@change="changeFlx" clearable>
								<el-option class="control_list" v-for="(item, index) in flxList"
									:key="index"
									:label="item.flxmc"
									:value="item.flxbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="子类型" prop="zlx_id">
							<el-select class="width_100" v-model="form.zlx_id" clearable>
								<el-option class="control_list" v-for="(item, index) in zlxList"
									:key="index"
									:label="item.zlxmc"
									:value="item.zlx_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="Web发布状态" prop="web_sffb">
							<!-- <select-code v-model="form.web_sffb" code="gyrlzyw_jqr_d_fbzt"></select-code> -->
							<el-select class="width_100" v-model="form.web_sffb">
								<el-option value="" label="全部"></el-option>
								<el-option value="0" label="未发布"></el-option>
								<el-option value="1" label="已发布"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="App发布状态" prop="app_sffb">
							<!-- <select-code v-model="form.app_sffb" code="gyrlzyw_jqr_d_fbzt"></select-code> -->
							<el-select class="width_100" v-model="form.app_sffb">
								<el-option value="" label="全部"></el-option>
								<el-option value="0" label="未发布"></el-option>
								<el-option value="1" label="已发布"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
            <el-form-item label="创建时间" class="width_100">
              <date-ass
								:begin.sync="form.cjsjq" :end.sync="form.cjsjz"
								propBegin="cjsjq" propEnd="cjsjz"></date-ass>
            </el-form-item>
          </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="btns_right">
						<el-button class="btn_square"
							size="small"
							type="primary"
							icon="plus"
							@click="addQuestion">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column width="40" type="expand">
						<template scope="expandInfo">
							<el-row class="align_left">
								<!-- <el-col :span="8">Web是否关闭评论：{{expandInfo.row.web_sfgbpl}}</el-col>
								<el-col :span="8">App是否关闭评论：{{expandInfo.row.app_sfgbpl}}</el-col> -->
								<el-col :span="8">Web是否关闭评论：
									<el-switch v-model="expandInfo.row.web_sfgbpl"
										on-value="1" on-text="是" :on-color="color.on"
										off-value="0" off-text="否" :off-color="color.off"
										@change="switchCommentState(expandInfo.row, 'WEB')"></el-switch>
								</el-col>
								<el-col :span="8">App是否关闭评论：
									<el-switch v-model="expandInfo.row.app_sfgbpl"
										on-value="1" on-text="是" :on-color="color.on"
										off-value="0" off-text="否" :off-color="color.off"
										@change="switchCommentState(expandInfo.row, 'APP')"></el-switch>
								</el-col>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column label="标题" prop="bt"></el-table-column>
					<el-table-column label="所属类型" prop="sslx"></el-table-column>
					<el-table-column label="创建时间" prop="cjsj"></el-table-column>
					<el-table-column label="App发布状态" prop="app_sffb">
						<template scope="stateApp">
							<el-switch v-model="stateApp.row.app_sffb"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"
								@change="switchState(stateApp.row, 'APP')"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="Web发布状态" prop="web_sffb">
						<template scope="stateWeb">
							<el-switch v-model="stateWeb.row.web_sffb"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"
								@change="switchState(stateWeb.row, 'WEB')"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="130" prop="hyid">
						<template scope="scope">
							<el-button title="编辑" type="primary" size="mini" icon="edit"
								@click="btnEdit(scope.row.zx_id)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row.zx_id)"></el-button>
							<el-button title="评论" type="primary" size="mini" class="icon-self_description iconfont"
								@click="btnComment(scope.row.zx_id)"></el-button>
							<!-- <el-button :disabled="false"
								title="开证明" size="mini" type="primary" class="icon-intro iconfont"
								@click="openProof(operate.row)"></el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果  end -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import selectCode from '@/common/vue/selectCode';
import dateAss from '@/common/vue/dateAss';
import $ from '@/common/js/axios';

export default {
	name: 'informManage',
	components: { selectCode, dateAss },
	data() {
		return {
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			// ====================>查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				flxbh: '',
				zlx_id: '',
				bt: '',
				cjsjq: '',
				cjsjz: '',
				web_sffb: '',
				app_sffb: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 有效转态字段
			formFalse: {
				zx_id: '',
				web_sffb: '',
				app_sffb: ''
			},
			// 评论
			formCommentFalse: {
				zx_id: '',
				czlx: '',
				web_sfgbpl: '',
				app_sfgbpl: ''
			},
			// 结果
			results: [],
			flxList: [],
			zlxList: [],
			selectFlxbh: '',
			// 总数
			pageTotal: 0
		};
	},
	methods: {
		// =============================> 查
		// 查询按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 获取 父类型 下拉列表
		getFlxList() {
			$.get('/gyrcht/zxgl/xxzx/xxzxflxCx', {
				params: { czlx: '10' }
			}).then((res) => {
				this.flxList = res.returnData.flxlb;
			}).catch(() => {});
		},
		// 获取 子类型 下拉列表
		getZlxList() {
			$.get('/gyrcht/zxgl/xxzx/xxzxzlxCx', {
				params: {
					flxbh: this.selectFlxbh,
					czlx: '10'
				}
			}).then((res) => {
				this.zlxList = res.returnData.zlxlb;
			}).catch(() => {});
		},
		// 父类型 change 事件
		changeFlx(val) {
			this.selectFlxbh = val;
			this.zlxList = [];
			this.form.zlx_id = '';
			if (val) {
				this.getZlxList();
			}
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 问题列表 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zxgl/xxzx/xxzxlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.zxlbs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 发布状态 变更
		switchState(row, type) {
			if (type === 'WEB') {
				this.formFalse.web_sffb = row.web_sffb;
				this.formFalse.app_sffb = '';
			} else if (type === 'APP') {
				this.formFalse.app_sffb = row.app_sffb;
				this.formFalse.web_sffb = '';
			}
			this.formFalse.zx_id = row.zx_id;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.post('/gyrcht/zxgl/xxzx/xxzxFb', this.formFalse).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.switchState = false;
							}
						});
					} else {
						this.$message.error(res.returnData.message);
						if (type === 'WEB') {
							row.web_sffb = row.web_sffb === '1' ? '0' : '1';
						} else if (type === 'APP') {
							row.app_sffb = row.app_sffb === '1' ? '0' : '1';
						}
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// 评论状态 变更
		switchCommentState(row, type) {
			this.formCommentFalse.zx_id = row.zx_id;
			if (type === 'WEB') {
				this.formCommentFalse.web_sfgbpl = row.web_sfgbpl;
				this.formCommentFalse.app_sfgbpl = '';
				this.formCommentFalse.czlx = '10';
			} else if (type === 'APP') {
				this.formCommentFalse.app_sfgbpl = row.app_sfgbpl;
				this.formCommentFalse.web_sfgbpl = '';
				this.formCommentFalse.czlx = '20';
			}
			this.$nextTick(() => {
				if (row.switchCommentState === undefined) {
					this.$set(row, 'switchCommentState', true);
				}
				row.switchCommentState = true;
				$.post('/gyrcht/zxgl/xxzx/xxzxgbPl', this.formCommentFalse).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.switchCommentState = false;
							}
						});
					} else {
						this.$message.error(res.returnData.message);
						if (type === 'WEB') {
							row.web_sfgbpl = row.web_sfgbpl === '1' ? '0' : '1';
						} else if (type === 'APP') {
							row.app_sfgbpl = row.app_sfgbpl === '1' ? '0' : '1';
						}
						row.switchCommentState = false;
					}
				}).catch(() => {
					row.switchCommentState = false;
				});
			});
		},
		// =======================> 增
		addQuestion() {
			this.$router.push({
				name: 'informDetail',
				params: {
					zx_id: '',
					isNew: true
				}
			});
		},
		// 编辑 按钮
		btnEdit(id) {
			this.$router.push({
				name: 'informDetail',
				params: {
					zx_id: id,
					isNew: false
				}
			});
		},
		// 评论 按钮
		btnComment(id) {
			this.$router.push({
				name: 'commentDetail',
				params: {
					zx_id: id
				}
			});
		},
		//  =============================> 删
		// 问题 删除按钮
		btnDelete(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delInform(id);
			}).catch(() => {});
		},
		delInform(id) {
			this.loading = true;
			$.delete('/gyrcht/zxgl/xxzx/xxzxSc', {
				params: {
					zx_id: id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
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
		this.getData();
		this.getFlxList();
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>

<style></style>
