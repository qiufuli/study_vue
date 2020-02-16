<docs>
	##人事代理党委---党组织维护
	* @date ###### Mon Aug 7 16:47:23 CST 2017
	* @author jinglf000
	* @desc 维护党组织，维护大类和小类
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="zzid" label="所属总支">
							<party-org v-model="form.zzid"></party-org>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="zbid" label="所属支部">
							<party-org v-model="form.zbid" :depend="form.zzid" type="middle"></party-org>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item>
							<el-button native-type="submit" type="primary" :loading="loading"
								@click.prevent="submit()">查询</el-button>
							<el-button @click="reset('queryForm')" >重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<!-- <el-table-column label="序号" prop="xh"></el-table-column> -->
					<el-table-column label="党组织名称" min-width="200">
						<template scope="scope">
							<span>{{organizate(scope.row.sszz, scope.row.sszb)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="QQ群号" prop="qq"></el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="operate">
							<el-button title="编辑" type="primary" size="mini" icon="edit"
								@click="edit(operate.row, 'formOrg')"></el-button>
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
		<!-- 查询结果 结束  -->
		<el-dialog :title="dialogOrgTitle" :visible.sync="dialog" size="tiny" class="dialog"
			@close="dialog === false">
			<div v-loading="loadingDialog">
				<el-row class="info">
					<el-col :span="6" class="align_right">总支名称</el-col>
					<el-col :span="18">{{party.dzzxx.dzzmc}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="6" class="align_right">支部名称</el-col>
					<el-col :span="18">
						<span v-for="(item, index) in party.dzbs" :key="index" > {{item.dzbmc}} </span>
					</el-col>
				</el-row>
				<!-- 组织表单提交的默认事件  -->
				<el-form :model="formOrg" :rules="rulesOrg" label-width="25%" ref="formOrg"
					@submit.prevent="dialogSubmit('formOrg')">
					<el-row>
						<el-col>
							<el-form-item prop="sj" label="书记">
								<el-input v-model="formOrg.sj"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							<el-form-item prop="qq" label="QQ群号" required>
								<el-input v-model="formOrg.qq"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="footer" slot="footer">
				<el-button @click="dialogCancel('formOrg')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formOrg')">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import partyOrg from '@/common/vue/partyOrg';
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';

export default {
	name: 'partyOrgnaize',
	components: { partyOrg },
	data() {
		return {
			labelWidth,
			loading: false,
			form: {
				zzid: '',
				zbid: '',
				pageNum: 1
			},
			results: [],
			dialog: false,
			formOrg: {
				dzzid: '',
				qq: '',
				sj: '',
				lx: ''
			},
			pageTotal: 0,
			party: {
				dzzxx: {
					dzzmc: '',
					dzzid: '',
					dzzqq: ''
				},
				dzbs: []
			},
			loadingDialog: false,
			rulesOrg: {
				qq: [{ validator: validator('16, "qq", "QQ", false') }],
				sj: [{ validator: validator('64, "full", "书记", true') }]
			},
			dialogOrgTitle: ''
		};
	},
	methods: {
		// 显示 党总部+党支部
		organizate(sszz, sszb) {
			let val;
			if (sszb === '') {
				val = sszz;
			} else {
				val = `${sszz}(${sszb})`;
			}
			return val;
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/dzzCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dzzs;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询提交表单
		submit() {
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
		// 查询党组织详情
		getDataOrg(id, lx) {
			this.loadingDialog = true;
			$.get('/gyrcht/rsdldw/rsdldw/dzzxgCx', {
				params: { dzzid: id, lx	}
			}).then((res) => {
				this.loadingDialog = false;
				// 党总支 信息
				Object.keys(this.party.dzzxx).forEach((item) => {
					this.party.dzzxx[item] = res.returnData.dzzxx[item];
				});
				// 党分支 信息
				this.party.dzbs = res.returnData.dzbs;
			}).catch(() => {
				this.loadingDialog = false;
			});
		},
		// 编辑 党组织
		// 支部id 存在的话，lx为支部id
		edit(row, formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			let lx = '0';
			let id = row.zzid;
			this.dialog = true;
			if (row.zbid) {
				lx = '1';
				id = row.zbid;
			}
			setTimeout(() => {
				this.formOrg.qq = row.qq;
			}, 2);
			this.formOrg.lx = lx;
			this.formOrg.dzzid = id;
			this.formOrg.sj = row.sj;
			if (lx === '1') {
				this.dialogOrgTitle = '修改党支部QQ群号';
			} else {
				this.dialogOrgTitle = '修改党总部QQ群号';
			}
			this.getDataOrg(id, lx);
		},
		// 提交 党组织编辑
		putData() {
			$.put('/gyrcht/rsdldw/rsdldw/dzzBc', this.formOrg).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('修改成功');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 弹出框 修改 党组织qq 提交
		dialogSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
					this.dialog = false;
				}
			});
		},
		// 弹出框 修改 党组织qq 取消
		dialogCancel(formName) {
			this.$refs[formName].resetFields();
			this.dialog = false;
		}
	},
	created() {
		this.getData();
	}
};
</script>
<style scope>
	.dialog .align_right{
		padding-right: 12px;
		color: #48556a;
	}
	.dialog .info {
		margin-bottom: 22px;
	}
</style>
