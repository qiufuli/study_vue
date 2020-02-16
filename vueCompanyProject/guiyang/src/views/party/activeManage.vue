<docs>
	##人事代理党委---党组织维护
	* @date ###### Mon Aug 7 16:47:23 CST 2018
	* @author lvlp
	* @desc 党员活动中心 查询
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="活动标题" prop="hdbt">
							<el-input v-model="form.hdbt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="举办日期">
							<date-ass
								:begin.sync="form.jbrqq" :end.sync="form.jbrqz"
								propBegin="jbrqq" propEnd="jbrqz"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="是否结束" prop="sfjs">
							<el-select v-model="form.sfjs">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="web发布" prop="web_sffb">
							<el-select v-model="form.web_sffb">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="app发布" prop="app_sffb">
							<el-select v-model="form.app_sffb">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="是"></el-option>
								<el-option value="0" label="否"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button native-type="submit" type="primary" :loading="loading"
								@click.prevent="submit()">查询</el-button>
							<el-button @click="reset('queryForm')" >重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="align_right">
						<el-form-item>
							<el-button type="primary" size="small" class="btn_square" icon="plus"
								@click="add" :loading="loading">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100" stripe border
				@cell-click="checkDetail">
					<el-table-column label="活动标题" prop="hdbt" min-width="180"
					class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="举办时间" prop="jbrq"></el-table-column>
					<el-table-column label="举办地点" prop="jbdd"></el-table-column>
					<el-table-column label="发布时间" prop="" width="200">
						<el-table-column label="web" prop="web_fbsj"></el-table-column>
						<el-table-column label="app" prop="app_fbsj"></el-table-column>
					</el-table-column>
					<el-table-column label="活动主题" prop="hdzt"></el-table-column>
					<el-table-column label="已报名人数" prop="ybmrs" width="90"></el-table-column>
					<el-table-column label="报名总数" prop="bmzrs" width="90"></el-table-column>
					<el-table-column label="发布状态" prop="">
						<el-table-column label="web" prop="web_sffb">
							<template scope="stateKp">
								<el-switch v-model="stateKp.row.web_sffb"
									on-value="1" on-text="发布" :on-color="color.on"
									off-value="0" off-text="停用" :off-color="color.off"
									@change="switchStateWeb(stateKp.row)"></el-switch>
							</template>
						</el-table-column>
						<el-table-column label="app" prop="app_sffb">
							<template scope="stateKp">
								<el-switch v-model="stateKp.row.app_sffb"
									on-value="1" on-text="发布" :on-color="color.on"
									off-value="0" off-text="停用" :off-color="color.off"
									@change="switchStateApp(stateKp.row)"></el-switch>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="operate">
							<el-button title="编辑" type="primary" size="mini" icon="edit"
								@click="handleEdit(operate.row)"></el-button>
							<el-button :disabled="false"
							title="删除" size="mini" type="danger" icon="delete"
							@click="handleDel(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="form.pageNum"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import $ from '@/common/js/axios';
import dateAss from '@/common/vue/dateAss';
import { getBtnsRight } from '@/common/js/utils';

export default {
	name: 'activeManage',
	components: { dateAss },
	data() {
		return {
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			loading: false,
			form: {
				hdbt: '',
				jbrqq: '',
				jbrqz: '',
				// fbsjq: '',
				// fbsjz: '',
				web_sffb: '',
				app_sffb: '',
				sfjs: '',
				pageNum: 1
			},
			// 有效转态字段
			formFalse: {
				dzzhd_id: '',
				web_sffb: '',
				app_sffb: ''
			},
			results: [],
			dialog: false,
			pageTotal: 0
		};
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/dzzhdCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dzzhds;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询提交表单
		submit() {
			this.form.pageNum = 1;
			// Object.assign(this.formRight, this.form);
			this.getData();
		},
		// 查询重置表单
		reset(formName) {
			this.$refs[formName].resetFields();
		},
		// 分页 查询
		pageChange(val) {
			this.form.pageNum = val;
			this.getData();
		},
		// 添加
		add() {
			this.$router.push({
				name: 'partyActiveDetail',
				params: {
					isNew: true,
					dzzhd_id: ''
				}
			});
		},
		// ====================> 编辑：id（活动id）
		handleEdit(row) {
			this.$router.push({
				name: 'partyActiveDetail',
				params: {
					id: row.dzzhd_id,
					isNew: false
				}
			});
		},
		// 删除活动: id (活动id)
		handleDel(row) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				$.delete('/gyrcht/rsdldw/rsdldw/dzzhdSc', {
					params: {
						dzzhd_id: row.dzzhd_id
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
			}).catch(() => {
			});
		},
		// 改变活动的发布状态
		switchStateWeb(row) {
			this.formFalse.dzzhd_id = row.dzzhd_id;
			this.formFalse.web_sffb = row.web_sffb;
			this.formFalse.app_sffb = '';
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/rsdldw/rsdldw/dzzhdfbBc', this.formFalse).then((res) => {
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
						row.web_sffb = row.web_sffb === '1' ? '0' : '1';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		switchStateApp(row) {
			this.formFalse.dzzhd_id = row.dzzhd_id;
			this.formFalse.app_sffb = row.app_sffb;
			this.formFalse.web_sffb = '';
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/rsdldw/rsdldw/dzzhdfbBc', this.formFalse).then((res) => {
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
						row.app_sffb = row.app_sffb === '1' ? '0' : '1';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// ====================> 查看详情
		checkDetail(row, column) {
			if (column.property === 'hdbt') {
				this.$router.push({
					name: 'partyActiveEntry',
					params: {
						id: row.dzzhd_id
					}
				});
			}
		}
	},
	// 重载路由
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>
<style scope>

</style>
