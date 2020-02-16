<docs>
	##职业培训---意向统计
	* @author ChenXue
	* @date 2018年7月16日
	* @desc 查询 / 删除 / 导出 意向统计
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="姓名" prop="xm">
								<el-input type="text" v-model="form.xm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="性别" prop="xb">
							<el-select v-model="form.xb" class="width_100" clearable>
								<el-option label="全部" value=""></el-option>
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="电话号码" prop="dhhm">
								<el-input type="text" v-model="form.dhhm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="邮箱" prop="yx">
								<el-input type="text" v-model="form.yx"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="培训意向" prop="pxfxmc">
							<!-- <el-input type="text" v-model="form.pxfxmc"></el-input> -->
							<el-select v-model="form.pxyx_id" clearable>
								<el-option value="" label="全部"></el-option>
								<el-option v-for="(item, index) in pxyxList"
									:key="index" :label="item.pxfxmc" :value="item.pxyx_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
            <el-form-item label="提交时间" class="width_100">
              <date-ass
								:begin.sync="form.tjsjq" :end.sync="form.tjsjz"
								propBegin="tjsjq" propEnd="tjsjz"></date-ass>
            </el-form-item>
          </el-col>
					<el-col :span="6">
						<el-form-item label="来源" prop="ly">
								<select-code v-model="form.ly" code="gyrlzyw_qzzp_d_sjly"></select-code>
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
						<el-button :disabled="results.length === 0"
							class="btn_square" size="small" type="primary" icon="btn-download"
							@click="exportDoc()" :loading="loading">导出</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="培训意向" prop="pxfxmc"></el-table-column>
					<el-table-column label="性别" prop="xb"></el-table-column>
					<el-table-column label="身份类别" prop="sflxmc" width="100"></el-table-column>
					<el-table-column label="电话号码" prop="dhhm"></el-table-column>
					<el-table-column label="邮箱" prop="yx"></el-table-column>
					<el-table-column label="提交时间" prop="tjsj"></el-table-column>
					<el-table-column label="来源" prop="ly"></el-table-column>
					<el-table-column label="操作" width="90" prop="hyid">
						<template scope="scope">
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row.tj_id)"></el-button>
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
import { labelWidth } from '@/common/js/config';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import $ from '@/common/js/axios';

export default {
	name: 'intentionCount',
	data() {
		return {
			labelWidth,
			// ====================>查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				xm: '',
				xb: '',
				dhhm: '',
				yx: '',
				pxfxmc: '',
				pxyx_id: '',
				tjsjq: '',
				tjsjz: '',
				ly: '',
				pageNum: 1
			},
			pxyxList: [],
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
		// 获取培训意向下拉列表
		getPxyxData() {
			this.loading = true;
			$.get('/gyrcht/zypxgl/yhpxyx/yhpxyxmcCx', {}).then((res) => {
				this.pxyxList = res.returnData.yhpxyxmcCxlb;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
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
			this.form.pxyx_id = '';
		},
		// 培训方向 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zypxgl/yhpxyx/yhpxyxlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.yhpxyxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		//  =============================> 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/zypxgl/yhpxyx/yhpxyxdcCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		//  =============================> 删
		// 意向统计 删除按钮
		btnDelete(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delPxfx(id);
			}).catch(() => {});
		},
		// 意向统计 删除接口
		delPxfx(id) {
			this.loading = true;
			$.delete('/gyrcht/zypxgl/yhpxyx/yhpxyxSc', {
				params: {
					tj_id: id
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
		this.getPxyxData();
		Object.assign(this.formRight, this.form);
	},
	components: { tradeSelect, dateAss, selectCode }
};
</script>

<style></style>
