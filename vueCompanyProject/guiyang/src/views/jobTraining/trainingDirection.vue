<docs>
	##职业培训---培训方向
	* @author ChenXue
	* @date 2018年7月16日
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="培训方向名称" prop="pxfxmc">
								<el-input type="text" v-model="form.pxfxmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
            <el-form-item label="创建时间" class="width_100">
              <date-ass
								:begin.sync="form.cjsjq" :end.sync="form.cjsjz"
								propBegin="cjsjq" propEnd="cjsjz"></date-ass>
            </el-form-item>
          </el-col>
					<el-col :span="6">
						<el-form-item label="网站发布状态" prop="fb_wz">
							<select-code v-model="form.fb_wz" code="gyrlzyw_px_d_fbzt"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="app发布状态" prop="fb_app">
							<select-code v-model="form.fb_app" code="gyrlzyw_px_d_fbzt"></select-code>
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
							@click="addTrainDirec">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="序号" width="100" prop="xh"></el-table-column>
					<el-table-column label="培训方向名称" prop="pxfxmc" width="250"></el-table-column>
					<el-table-column label="宣传词" width="450" prop="xcc"></el-table-column>
					<el-table-column label="创建时间" prop="cjsj"></el-table-column>
					<el-table-column label="网站发布状态" prop="fb_wz">
						<template scope="stateWz">
							<el-switch v-model="stateWz.row.fb_wz"
								on-value="10" on-text="是" :on-color="color.on"
								off-value="20" off-text="否" :off-color="color.off"
								@change="switchState(stateWz.row, 'WZ')"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="app发布状态" prop="fb_app">
						<template scope="stateApp">
							<el-switch v-model="stateApp.row.fb_app"
								on-value="10" on-text="是" :on-color="color.on"
								off-value="20" off-text="否" :off-color="color.off"
								@change="switchState(stateApp.row, 'APP')"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100" prop="hyid">
						<template scope="scope">
							<el-button type="primary" icon="edit" size="mini"
								title="编辑" @click="handleEdit(scope.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row.pxfx_id)"></el-button>
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
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import $ from '@/common/js/axios';

export default {
	name: 'trainingDirection',
	data() {
		return {
			labelWidth,
			// ====================>查询
			color: {
				on: colorOn,
				off: colorOff
			},
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				pxfxmc: '',
				cjsjq: '',
				cjsjz: '',
				fb_wz: '',
				fb_app: '',
				pageNum: 1
			},
			// 有效转态字段
			formFalse: {
				fb_wz: '',
				fb_app: '',
				pxfx_id: ''
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 结果
			results: [],
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
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 培训方向 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zypxgl/zypx/pxfxlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.pxfxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		//  =============================> 增
		// 添加
		addTrainDirec() {
			this.$router.push({ name: 'trainingDirectionDetail', params: { isNew: true, czlx: 0 } });
		},
		// 编辑
		handleEdit(row) {
			this.$router.push({
				name: 'trainingDirectionDetail',
				params: {
					pxfx_id: row.pxfx_id,
					isNew: false,
					czlx: 1
				}
			});
		},
		//  =============================> 变更状态
		switchState(row, type) {
			if (type === 'WZ') {
				this.formFalse.fb_wz = row.fb_wz;
				this.formFalse.fb_app = '';
			} else if (type === 'APP') {
				this.formFalse.fb_app = row.fb_app;
				this.formFalse.fb_wz = '';
			}
			this.formFalse.pxfx_id = row.pxfx_id;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.post('/gyrcht/zypxgl/zypx/pxfxfbXg', this.formFalse).then((res) => {
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
						if (type === 'WZ') {
							row.fb_wz = row.fb_wz === '10' ? '20' : '10';
						} else if (type === 'APP') {
							row.fb_app = row.fb_app === '10' ? '20' : '10';
						}
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		//  =============================> 删
		// 培训方向 删除按钮
		btnDelete(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delPxfx(id);
			}).catch(() => {});
		},
		// 培训方向 删除接口
		delPxfx(id) {
			this.loading = true;
			$.put('/gyrcht/zypxgl/zypx/pxfxSc', {
				pxfx_id: id
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
		Object.assign(this.formRight, this.form);
	},
	components: { tradeSelect, dateAss, selectCode },
	// 页面重新激活
	activated() {
		this.getData();
	}
};
</script>

<style></style>
