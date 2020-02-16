<docs>
	##人事代理党委---党员缴费记录查询
	* @date ###### 20180718
	* @author luxy
	* @desc 党员缴费 查询
</docs>
<template>
	<div>
		<!--查询表单 开始  -->
		<div class="query_wrap" v-show="flag === 'all'">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="真实姓名" prop="zsxm">
							<el-input v-model="form.zsxm"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="缴费日期">
							<date-ass :begin.sync="form.jfsjq" :end.sync="form.jfsjz"
							propBegin="jfsjq" propEnd="jfsjz" ></date-ass>
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
						<el-button type="primary" icon="btn-download"
							class="btn_square" :loading="loading"
							@click="exportDoc">导出</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="姓名" prop="zsxm"></el-table-column>
					<el-table-column label="缴纳开始年月" prop="dfjfksny"></el-table-column>
					<el-table-column label="缴纳结束年月" prop="dfjfjsny"></el-table-column>
					<el-table-column label="缴纳基数" prop="dfjnjs"></el-table-column>
					<el-table-column label="缴费月数" prop="jfys"></el-table-column>
					<el-table-column label="缴费金额" prop="jfje"></el-table-column>
					<el-table-column label="缴费方式" prop="zffs"></el-table-column>
					<el-table-column label="缴费时间" prop="jfsj"></el-table-column>
					<el-table-column label="缴费状态" prop="jfzt">
						<template scope="stateKp">
							<el-switch v-model="stateKp.row.jfzt"
								:width="72"
								on-value="10" on-text="已缴费" :on-color="color.on"
								off-value="20" off-text="未缴费" :off-color="color.off"
								:disabled="stateKp.row.switchState"
								@change="switchState(stateKp.row)"></el-switch>
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

export default {
	name: 'partyPayment',
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
				zsxm: '',
				jfsjq: '',
				jfsjz: '',
				pageNum: 1
			},
			// 有效转态字段
			formFalse: {
				dfjf_id: '',
				dfjfjsny: '',
				dyyh_id: '',
				jfzt: ''
			},
			results: [],
			dialog: false,
			pageTotal: 0,
			flag: ''
		};
	},
	methods: {
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询按钮handle
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					this.getJfjlData();
				}
			});
		},
		// 查询到期列表 接口
		getJfjlData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/dydfjnjlCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dfjnjls;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询接口
		getData() {
			this.loading = true;
			const url = this.flag === 'all' ? '/gyrcht/rsdldw/rsdldw/dydfjnjlCx' : '/gyrcht/rsdldw/rsdldw/dydfjnxqCx';
			$.get(url, {
				params: this.flag === 'all' ? this.form : { dyyh_id: this.$route.query.id }
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dfjnjls;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 分页 查询
		pageChange(val) {
			this.flag = 'all';
			this.form.pageNum = val;
			this.getData();
		},
		// 改变活动的发布状态
		switchState(row) {
			this.formFalse.dfjf_id = row.dfjf_id;
			this.formFalse.dfjfjsny = row.dfjfjsny;
			this.formFalse.dyyh_id = row.dyyh_id;
			this.formFalse.jfzt = row.jfzt;
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/rsdldw/rsdldw/dydfjnBc', this.formFalse).then((res) => {
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
						row.jfzt = row.jfzt === '10' ? '20' : '10';
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		exportDoc() {
			// 	form: {
			// 	zsxm: '',
			// 	jfsjq: '',
			// 	jfsjz: '',
			// 	pageNum: 1
			// },
			const { zsxm, jfsjq, jfsjz } = this.form;
			const url = `gyrcht/rsdldw/rsdldw/dydfjnjlDc?zsxm=${zsxm}&jfsjq=${jfsjq}&jfsjz=${jfsjz}`;
			window.open(url);
		}
	},
	watch: {
		'$route'(to) {
			if (to.query.flag === 'single') {
				this.flag = 'single';
				this.getData();
			} else {
				this.flag = 'all';
				this.getData();
			}
		}
	},
	created() {
		this.flag = this.$route.query.flag;
		this.getData();
	}
};
</script>
<style scope>

</style>
