<docs>
	## 人事代理党委---思想汇报
	* @date ###### Fri Aug 4 10:19:13 CST 2017
	* @author jinglf000
	* @desc 思想汇报查询、新增、修改、删除
</docs>
<template>
	<div>
		<!-- 查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" label-width="110px" ref="queryForm" >
				<el-row>
					<el-col :span="12">
						<el-form-item label="创建日期">
							<date-ass
								propBegin="cjrqks" :begin.sync="form.cjrqks"
								:end.sync="form.cjrqjs" propEnd="cjrqjs"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="修改日期">
							<date-ass
								propBegin="xgrqks" :begin.sync="form.xgrqks"
								propEnd="xgrqjs" :end.sync="form.xgrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="思想汇报标题" prop="bt">
							<el-input v-model="form.bt" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="类型" prop="sxhblxid">
							<select-code v-model="form.sxhblxid"
								code="gyrlzyw_dw_d_sxhblx"
								:refresh="refresh">
							</select-code>
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
					<el-col :span="12" class="align_right">
						<el-form-item>
							<el-button type="primary" size="small" class="btn_square" icon="plus"
								@click="add" :loading="loading">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询 结束  -->
		<!-- 结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="思想汇报标题" prop="bt" min-width="200" ></el-table-column>
					<el-table-column label="审批状态" prop="spztmc"></el-table-column>
					<el-table-column label="是否显示" prop="sfxs">
						<template scope="state">
							<el-switch v-model="state.row.sfxs"
								on-value="1" on-text="是" :on-color="colorOn"
								off-value="0" off-text="否" :off-color="colorOff"
								:disabled="state.row.isShow"
								@change="isShow(state.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="cjrq" width="110"></el-table-column>
					<el-table-column label="修改时间" prop="xgrq" width="110"></el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="operate">
							<el-button
								title="编辑/查看" size="mini" type="primary" icon="edit"
								@click="edit(operate.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="del(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="formRight.pageNum"></el-pagination>
				</div>
			</div>
		</div>
		<!-- 结果 结束  -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'partyThouReport',
	components: { dateAss, selectCode },
	data() {
		return {
			colorOn,
			colorOff,
			labelWidth,
			form: {
				cjrqks: '',
				cjrqjs: '',
				xgrqks: '',
				xgrqjs: '',
				bt: '',
				sxhblxid: '',
				pageNum: 1
			},
			formRight: {},
			rules: {
				bt: [{ validator: validator('160,"full","思想汇报标题",true') }]
			},
			loading: false,
			results: [],
			pageTotal: 0,
			// 是否可以修改
			canSave: true,
			refresh: 0
		};
	},
	methods: {
		// 表单重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 执行查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/sxhbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.sxhbs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 添加
		add() {
			this.canSave = true;
			this.$router.push({
				name: 'reportDetail',
				params: {
					canSave: this.canSave,
					isNew: true
				}
			});
		},
		// 编辑
		edit(row) {
			if (row.spzt === '30' || row.spzt === '40') {
				this.canSave = false;
			} else {
				this.canSave = true;
			}
			const detailInfo = {
				bt: row.bt,
				sfxs: row.sfxs,
				sxhblxid: row.sxhblxid,
				sxhb_id: row.sxhb_id
			};
			this.$router.push({
				name: 'reportDetail',
				params: {
					canSave: this.canSave,
					isNew: false,
					info: detailInfo
				}
			});
		},
		// 删除 思想汇报
		del(row) {
			this.$confirm('此操作将会删除思想汇报，是否继续？', '确认', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delDate(row.sxhb_id);
			}).catch(() => {});
		},
		// 执行删除
		delDate(id) {
			$.delete('/gyrcht/rsdldw/rsdldw/sxhbSc', {
				params: {
					sxhb_id: id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 查询结果中 切换是否显示
		isShow(row) {
			this.$nextTick(() => {
				if (row.isShow === undefined) {
					this.$set(row, 'isShow', true);
				}
				row.isShow = true;
				$.put('/gyrcht/rsdldw/rsdldw/sfxsxgBc', {
					sxhb_id: row.sxhb_id,
					sfxs: row.sfxs
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true,
							onClose: () => {
								row.isShow = false;
							}
						});
					}
				}).catch(() => {
					row.isShow = false;
				});
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
		this.refresh++;
	}
};
</script>

<style></style>
