<docs>
	## 应答机器人 --- 问题维护
	* @author ChenXue
	* @date 2018年7月12日
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="问题名称" prop="wtmc">
								<el-input type="text" v-model="form.wtmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="父类型" prop="flxwtbh">
							<!-- <el-input type="text" v-model="form.flxwtbh"></el-input> -->
							<el-select class="width_100" v-model="form.flxwtbh"
								@change="changeFlx" clearable>
								<el-option class="control_list" v-for="(item, index) in flxList"
									:key="index"
									:label="item.flxmc"
									:value="item.flxwtbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="子类型" prop="zlxwtbh">
							<!-- <el-input type="text" v-model="form.zlxwtbh"></el-input> -->
							<el-select class="width_100" v-model="form.zlxwtbh" @change="changeZlx" clearable>
								<el-option class="control_list" v-for="(item, index) in zlxList"
									:key="index"
									:label="item.zlxmc"
									:value="item.zlxwtbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="有效状态" prop="yxzt">
							<select-code v-model="form.yxzt" code="gyrlzyw_jqr_d_fbzt"></select-code>
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
					<el-table-column label="问题名称" prop="wtmc"></el-table-column>
					<el-table-column label="关键词" prop="gjc"></el-table-column>
					<el-table-column label="所属类型" prop="sslx">
						<template scope="sslx">
							<span>{{`${sslx.row.flxmc}--${sslx.row.zlxmc}`}}</span>
						</template>
					</el-table-column>
					<el-table-column label="有效状态" prop="yxzt">
						<template scope="stateYxzt">
							<el-switch v-model="stateYxzt.row.yxzt"
								on-value="10" on-text="是" :on-color="color.on"
								off-value="20" off-text="否" :off-color="color.off"
								@change="switchState(stateYxzt.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="90" prop="hyid">
						<template scope="scope">
							<el-button title="编辑" type="primary" size="mini" icon="edit"
								@click="btnEdit(scope.row.wt_id)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row.wt_id)"></el-button>
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
import $ from '@/common/js/axios';

export default {
	name: 'questionManage',
	components: { selectCode },
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
				wtmc: '',
				zlxwtbh: '',
				flxwtbh: '',
				yxzt: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 有效转态字段
			formFalse: {
				wt_id: '',
				yxzt: ''
			},
			// 结果
			results: [],
			flxList: [],
			zlxList: [],
			selectFlxbh: '',
			selectZlxbh: '',
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
			$.get('/gyrcht/jqrwh/jqr/wtFlxCx', {}).then((res) => {
				this.flxList = res.returnData.flxlb;
			}).catch(() => {});
		},
		// 获取 子类型 下拉列表
		getZlxList() {
			$.get('/gyrcht/jqrwh/jqr/wtZlxCx', {
				params: { flxwtbh: this.selectFlxbh }
			}).then((res) => {
				this.zlxList = res.returnData.zlxlb;
			}).catch(() => {});
		},
		// 父类型 change 事件
		changeFlx(val) {
			this.selectFlxbh = val;
			this.zlxList = [];
			this.form.zlxwtbh = '';
			if (val) {
				this.getZlxList();
			}
		},
		// 子类型 change 事件
		changeZlx() {},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 问题列表 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/jqrwh/jqr/wtCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.wtlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 有效状态
		// 是否急需 变更
		switchState(row) {
			this.formFalse.wt_id = row.wt_id;
			this.formFalse.yxzt = row.yxzt;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/jqrwh/jqr/wtFb', this.formFalse).then((res) => {
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
						row.yxzt = row.yxzt === '10' ? '20' : '10';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// =======================> 增
		addQuestion() {
			this.$router.push({
				name: 'questionDetail',
				params: {
					wt_id: '',
					isNew: true
				}
			});
		},
		// 编辑 按钮
		btnEdit(id) {
			this.$router.push({
				name: 'questionDetail',
				params: {
					wt_id: id,
					isNew: false
				}
			});
		},
		//  =============================> 删
		// 问题 删除按钮
		btnDelete(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delQuestion(id);
			}).catch(() => {});
		},
		delQuestion(id) {
			this.loading = true;
			$.delete('/gyrcht/jqrwh/jqr/wtSc', {
				params: {
					wt_id: id
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
