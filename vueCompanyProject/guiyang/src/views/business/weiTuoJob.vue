<docs>
		## 业务办理，委托招聘海报打印------职位录入和现场招聘职位查询
		* @date ###### Fri Sep 8 15:14:51 CST 2017
		* @author jinglf000
		* @desc 业务办理，委托招聘海报打印------职位录入和委托职位查询
</docs>
<template>
	<div class="tabs_jobpublish">
		<bread-crumb></bread-crumb>
		<p class="co_name">当前单位：{{coName}}</p>
		<div class="detail_wrap">
			<el-row :gutter="20">
				<el-col :span="12">
					<h3 class="title">职位查询</h3>
					<!-- 职位查询 开始-->
					<el-form ref="formJob"
						:model="formJob" :rules="rulesJob":label-width="labelWidth">
						<el-row>
							<el-col :span="16">
								<el-form-item label="职位名称" prop="zwmc">
									<el-input v-model="formJob.zwmc"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item>
								<el-button type="primary" native-type="submit" :loading="loadingJob"
									@click.prevent="submitFormJob('formJob')">查询</el-button>
								<el-button @click="cancelFormJob('formJob')">重置</el-button>
								<el-button type="danger" class="btn_square small_btn" icon="delete"
								@click="delJob">删除</el-button>
							</el-form-item>
						</el-row>
					</el-form>
					<!-- 职位查询 结束-->
					<!-- 职位列表 开始 -->
					<div class="loading" v-loading="loadingJob">
						<!-- 职位列表 -->
						<el-table :data="resultsJob" class="table_wrap width_100"
							@cell-click="jobView"  @selection-change="jobDelSelect">
							<el-table-column type="selection" width="55"> </el-table-column>
							<el-table-column label="职位名称" prop="zwmc"
								class-name="color_anchor cur_pointer">
								<template scope="jobItem">
									<el-popover trigger="hover" placement="top">
										<p>转正月薪：
											<span v-if="jobItem.row.xzdyq && jobItem.row.xzdyz">{{jobItem.row.xzdyq}}-{{jobItem.row.xzdyz}}</span>
											<span v-else-if="!jobItem.row.xzdyq && jobItem.row.xzdyz">{{jobItem.row.xzdyz}}以下</span>
											<span v-else-if="jobItem.row.xzdyq && !jobItem.row.xzdyz">{{jobItem.row.xzdyq}}以上</span>
											<span v-else>不限</span>
										</p>
										<p>学历要求：{{ jobItem.row.xlyqmc }}</p>
										<p>招聘人数：
											<span v-if="+jobItem.row.nanrs && +jobItem.row.nvrs"
												>{{`总${jobItem.row.zprs}人，男性${jobItem.row.nanrs}人，女性${jobItem.row.nvrs}人`}}</span>
											<span v-else-if="jobItem.row.zprs == -2">男性，人数不限</span>
											<span v-else-if="jobItem.row.zprs == -3">女性，人数不限</span>
											<span v-else-if="+jobItem.row.nanrs && !+jobItem.row.nvrs">男性，{{jobItem.row.nanrs}}人</span>
											<span v-else-if="!+jobItem.row.nanrs && +jobItem.row.nvrs">女性，{{jobItem.row.nvrs}}人</span>
											<span v-else-if="jobItem.row.zprs > 0 && jobItem.row.nanrs == 0 && jobItem.row.nvrs == 0">不限男女，人数{{jobItem.row.zprs}}人</span>
											<span v-else>不限男女，人数不限</span>
										</p>
										<p>工作地：{{ jobItem.row.gzdmc }}</p>
										<div slot="reference">
											<el-tag>{{ jobItem.row.zwmc }}</el-tag>
										</div>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="最后修改人" prop="czy" width="110"></el-table-column>
							<el-table-column label="更新时间" prop="czsj" width="110"></el-table-column>
							<el-table-column label="操作" width="70">
								<template scope="tem">
									<el-button icon="delete" size="mini" title="删除"
									type="danger" @click="deleteJob(tem.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="pagination_wrap" v-show="resultsJob.length > 0">
							<el-pagination
								layout="total,prev,pager,next,jumper"
								:total="pageTotalJob"
								:current-page.sync="formJob.pageNum"
								@current-change="getDataJob"></el-pagination>
						</div>
					</div>
					<!-- 职位列表 结束 -->
				</el-col>
				<el-col :span="12">
					<job-model :info="modelInfo" v-if="modelInfo"></job-model>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import checkboxGroup from '@/common/vue/checkboxGroup';
import breadCrumb from '@/common/vue/breadCrumb';
import jobModel from './components/jobModel';

export default {
	name: 'bussWeituoPublish',
	components: { jobModel, checkboxGroup, breadCrumb },
	data() {
		return {
			labelWidth,
			tabName: 'weituo',
			coName: '',
			companyId: '',
			zphId: '',
			modelInfo: {
				coName: this.$route.params.coName,
				companyId: this.$route.params.companyId,
				yhId: this.$route.params.yhId,
				type: '03' // 托招聘会type为03
			},
			selectedRows: [], // table复选框被选中的行数组
			selectedDelJobRows: [], // 被选中的行数组
			newsType: '',  // 新闻类型：02为现场招聘，03为委托招聘
			// ==================================> 委托招聘列表
			// 委托招聘职位列表
			formJob: {
				zwmc: '', // 职位名称
				zph_id: '',
				zplx: '03', // 招聘类型(01：网上02：现场03：委托)
				dwxx_id: '',
				spzt: '', // 审批状态(00：全部20:待审批40:审批拒绝 )空值为审批通过
				pageNum: 1
			},
			rulesJob: {
				zwmc: [{ validator: validator('64, "full ", "职位名称", true') }]
			},
			resultsJob: [],
			pageTotalJob: 0,
			loadingJob: false
		};
	},
	watch: {
		zphId() {
			this.getDataJob();
		}
	},
	methods: {
		// 招聘会状态
		zhaoPinState(val) {
			let text;
			switch (val) {
			case '1': text = '未开始'; break;
			case '2': text = '进行中'; break;
			default: text = '已结束';
			}
			return text;
		},
		// ========================> 委托招聘会对应的职位信息
		// 表单提交查询
		submitFormJob(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.getDataJob();
				}
			});
		},
		// 表单重置
		cancelFormJob(formName) {
			this.$refs[formName].resetFields();
		},
		// 获取委托展位对应的职位信息
		getDataJob() {
			this.formJob.zph_id = this.zphId;
			this.formJob.dwxx_id = this.companyId;
			this.loadingJob = true;
			$.get('/gyrcht/ywgl/xczpdy/zwlbCx', {
				params: this.formJob
			}).then((res) => {
				this.loadingJob = false;
				this.resultsJob = res.returnData.zwlb;
				this.pageTotalJob = +res.rowsCount;
			}).catch(() => {
				this.loadingJob = false;
			});
		},
		// 删除招聘会的职位
		deleteJob(row) {
			this.$confirm('该操作将会删除本次招聘会职位，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				$.delete('/gyrcht/ywgl/xczpdy/zwSc', {
					params: { dwzw_id: row.dwzw_id }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.getDataJob();
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
			}).catch(() => {});
		},
		// 职位删除，批量
		delJob() {
			// 判断
			if (this.selectedDelJobRows.length === 0) {
				this.$message.warning('请先勾选要删除的职位模板');
			} else {
				let msg = '';
				let rows = '';
				// 提示文字拼装
				this.selectedDelJobRows.forEach((item) => {
					rows += `${item.dwzw_id}，`;
					// .push(item.dwzw_id);
					msg += `${item.zwmc}，`;
				});
				msg = msg.substr(0, msg.length - 1);
				// 进一步确认
				this.$confirm(`此操作将会删除${msg}的职位，是否继续`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delJobData(rows);
				}).catch(() => {});
			}
		},
		// -------职位删除接口，待删除的职位id数组
		delJobData(arr) {
			$.delete('/gyrcht/ywgl/xczpdy/zwSc', {
				params: { dwzw_id: arr }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getDataJob();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// table复选框选中
		jobDelSelect(rows) {
			this.selectedDelJobRows = rows;
		},
		// 职位查看
		jobView(row, column) {
			if (column.property === 'zwmc') {
				this.$router.push({
					name: 'bussJobPubDetail',
					params: {
						coName: this.coName,
						dwzwId: row.dwzw_id,
						companyId: this.companyId,
						czlx: '03',
						czid: this.zphId
					}
				});
			}
		}
	},
	created() {
		const params = this.$route.params;
    // 企业身份中的企业id，和发布类型
		this.coName = params.coName;
		this.companyId = params.companyId;
		this.yhId = params.yhId;
		this.zphId = params.zphId;
		this.modelInfo = {
			coName: this.coName,
			companyId: this.companyId,
			yhId: this.yhId,
			type: '03'// 委托招聘会type为03
		};
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.companyId) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};

</script>

<style scoped>
	span.el-tag {
		height: auto;
		white-space: normal;
		margin: 9px 0;
	}
</style>
