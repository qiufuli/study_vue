<docs>
		## 业务办理，现场招聘海报打印------职位录入
		* @date ###### Fri Sep 8 15:14:51 CST 2017
		* @author jinglf000
		* @desc 业务办理，现场招聘海报打印------职位录入和职位
</docs>
<template>
	<div class="tabs_jobpublish">
		<bread-crumb></bread-crumb>
		<p class="co_name">当前单位：{{coName}}</p>
		<div class="detail_wrap">
			<el-row :gutter="20">
				<el-col :span="12">
					<h3 class="title">职位查询</h3>
					<el-row>
						<!-- 职位查询 开始-->
						<el-row>
							<el-col :span="24">
								<el-form ref :model="formXianJob" :label-width="labelWidth">
									<el-form-item label="招聘会" prop="zph_id">
										<el-select v-model="formXianJob.zph_id" class="width_100"
											@change="changeRecruit">
											<el-option
												v-for="(item, index) in resultsXianList"
												:key="index"
												:label="`【${item.zphrq}${recruitState(item.zphzt)}】${item.zphbt}【${item.bczw}】`"
												:value="item.zph_id"></el-option>
										</el-select>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row class="btns_right">
							<el-button type="primary" class="btn_square" icon="btn-up"
								:disabled="disabledPx" @click="moveUp">上移</el-button>
							<el-button type="primary" class="btn_square" icon="btn-down"
								:disabled="disabledPx" @click="moveDown">下移</el-button>
							<el-button type="primary" class="btn_square" icon="btn-upup"
								:disabled="disabledPx" @click="moveUpUp">置顶</el-button>
							<el-button type="primary" class="btn_square" icon="btn-downdown"
								:disabled="disabledPx" @click="moveDownDown">置底</el-button>
							<el-button type="danger" class="btn_square small_btn" icon="delete"
								@click="delJob">删除</el-button>
							<el-button type="primary" class="btn_square" icon="btn-copy"
								:disabled="resultsXianJob.length === 0" @click="copyJob">职位复用</el-button>
							<el-button type="primary" class="btn_square" icon="btn-refresh"
								@click="refreshJob" :loading="loadingJob">刷新</el-button>
						</el-row>
						<!-- 职位查询 结束-->
						<!-- 职位列表 开始 -->
						<div class="loading" v-loading="loadingJob">
							<!-- 职位列表 -->
							<el-table :data="resultsXianJob" stripe class="table_wrap width_100" ref="jobTable"
								@cell-click="jobView"  @selection-change="jobDelSelect">
								<el-table-column type="selection" width="55"> </el-table-column>
								<el-table-column width="60">
									<template scope="radio">
										<el-radio v-model="formMoveJob.ydzw_id" :label="radio.row.dwzw_id">&nbsp;</el-radio>
									</template>
								</el-table-column>
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
									<template scope="operate">
										<el-button icon="delete" size="mini" title="删除"
										type="danger" @click="deleteJob(operate.row)"></el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="pagination_wrap" v-show="resultsXianJob.length > 0">
								<el-pagination
									layout="total,prev,pager,next,jumper"
									:total="pageTotalXianJob"
									:current-page.sync="formXianJob.pageNum"
									@current-change="getJobData"></el-pagination>
							</div>
						</div>
						<!-- 职位列表 结束 -->
					</el-row>
				</el-col>
				<el-col :span="12">
					<job-model v-if="modelInfo" :usable="usable" :message="message"
						:info="modelInfo"></job-model>
				</el-col>
			</el-row>
		</div>
		<!-- 职位复用开始 -->
		<el-dialog title="职位复用" :visible.sync="dialogCopy">
			<el-form :model="formCopy" :label-width="labelWidth" ref="formCopy">
				<el-form-item prop="dwzw_id" label="选择要复用的职位">
					<checkbox-group v-model="formCopy.dwzw_id" :list="jobList"
					:option="{label: 'zwmc', value: 'dwzw_id'}"></checkbox-group>
				</el-form-item>
				<el-form-item prop="zph_id" label="选择要复用到的招聘会">
					<checkbox-group v-model="formCopy.zph_id" :list="zphList"
						empty-text="暂无可用招聘会"
						:option="{label: 'zphrq,zphbt', value: 'zph_id'}" ></checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCopy = false">取消</el-button>
				<el-button type="primary" @click="saveCopyJob"
					:disabled="formCopy.zph_id.length === 0 || formCopy.dwzw_id.length === 0">确定</el-button>
			</div>
		</el-dialog>
		<!-- 职位复用结束 -->
	</div>
</template>
<script>
// import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import checkboxGroup from '@/common/vue/checkboxGroup';
import breadCrumb from '@/common/vue/breadCrumb';
import jobModel from './components/jobModel';

export default {
	name: 'bussXianChangPublish',
	components: { jobModel, checkboxGroup, breadCrumb },
	data() {
		return {
			labelWidth,
			coName: '',
			companyId: '',
			yhId: '',
			zphrq: '', // 招聘会日期
			zphId: '', // 当前招聘会id
			modelInfo: {
				coName: '',
				companyId: '',
				zphId: '',
				yhId: '',
				type: '02'// 现场招聘会type为02
			},
			newsType: '', // 新闻类型：02为现场招聘，03为委托招聘
			// 现场招聘 =========================>
			// 现场招聘会列表
			loadingList: false,
			formXianList: {
				dwxx_id: '',
				zphrq: '',
				sczpjzzt: '',
				zphbs: '0', // 招聘会标识(1可用 0全部)
				pageNum: 1,
				pageSize: 5000
			},
			resultsXianList: [],
			selectedDelJobRows: [], // 被选中的行数组
			// 现场招聘会职位列表
			formXianJob: {
				zph_id: '',
				zplx: '02', // 招聘类型(01：网上02：现场03：委托)
				dwxx_id: '',
				spzt: '', // 审批状态(00：全部20:待审批40:审批拒绝 )空值为审批通过
				pageNum: 1
			},
			resultsXianJob: [],
			pageTotalXianJob: 0,
			loadingJob: false,
			// 职位复用
			dialogCopy: false,
			formCopy: {
				dwzw_id: [],
				zph_id: []
			},
			jobList: [],
			zphList: [],
			usable: '',
			message: '',
			// 职位排序 =========================>
			formMoveJob: {
				ydzw_id: '', // 需移动职位id(单选)
				ydlx: '', // 移动类型(up:上移, down:下移, top:置顶, bottom:置底)
				zph_id: '', // 招聘会id
				zwlx: '02', // 招聘类型
				dwxx_id: '', // 单位信息id
				spzt: '30' // 审批状态
			}
		};
	},
	computed: {
		disabledPx() {
			return (this.resultsXianJob.length === 0 || this.formMoveJob.ydzw_id === '');
		}
	},
	methods: {
		// 招聘会状态
		recruitState(val) {
			let text;
			switch (val) {
			case '1': text = '未开始'; break;
			case '2': text = '进行中'; break;
			default: text = '已结束';
			}
			return text;
		},
		// 查询招聘会是否可用
		getAvailability() {
			$.get('/gyrcht/ywgl/xczpdy/zphsfkyCx', {
				params: {
					dwxx_id: this.companyId,
					zph_id: this.formXianJob.zph_id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					// （zphsfky）招聘会是否可用：‘1’可用，‘0’不可用
					this.usable = res.returnData.zphsfky;
					// 错误信息
					this.message = +this.usable ? '' : res.returnData.message;
				}
			}).catch(() => {});
		},
		changeRecruit() {
			this.modelInfo.zphId = this.formXianJob.zph_id;
			this.getAvailability();
			this.getJobData();
		},
		// 现场招聘会对应的职位信息 ========================>
		// 现场招聘会列表查询（查询所有现场招聘会）
		getRecruitData(isAll = false) {
			this.formXianList.dwxx_id = this.companyId;
			this.formXianList.zphbs = isAll ? '1' : '0';
			const paramsData = {};
			Object.keys(this.formXianList).forEach((item) => {
				paramsData[item] = this.formXianList[item];
			});
			paramsData.zphrq = '';
			$.get('/gyrcht/ywgl/xczpdy/zphlbCx', {
				params: paramsData
			}).then((res) => {
				this.loadingList = false;
				const dataList = res.returnData.xczplb;
				if (isAll === true) {
					this.zphList = dataList;
				} else {
					this.resultsXianList = dataList;
					// 查询成功默认查询第一个招聘会的内容，并为第一赋选中状态
					if (dataList.length > 0) {
						this.getJobData();
					} else {
						this.resultsXianJob = [];
					}
				}
			}).catch(() => {
				this.loadingList = false;
			});
		},
		// 现场招聘会对应的职位查询（当前招聘会下的所有职位）,
		/**
		 * @param {String} zphId 招聘会id
		 * @param {Boolean} isAll true全部查询（必须为true才行）
		 */
		getJobData(isAll = false) {
			// 赋初始值
			this.formXianJob.dwxx_id = this.companyId;
			if (isAll === true) { // 设置的尽可能大，以便能过去到所有的职位
				this.formXianJob.pageSize = 5000;
			} else {
				this.loadingJob = true;
				this.formXianJob.pageSize = 10;
			}
			$.get('/gyrcht/ywgl/xczpdy/zwlbCx', {
				params: this.formXianJob
			}).then((res) => {
				if (isAll === true) {
					this.jobList = res.returnData.zwlb;
				} else {
					this.resultsXianJob = res.returnData.zwlb;
					this.pageTotalXianJob = +res.rowsCount;
				}
				this.loadingJob = false;
			}).catch(() => {
				this.loadingJob = false;
			});
		},
		// 职位复用
		copyJob() {
			this.dialogCopy = true;
			if (this.$refs.formCopy) {
				this.$refs.formCopy.resetFields();
			}
			this.getRecruitData(true);
			this.getJobData(true);
		},
		// 职位复用保存
		saveCopyJob() {
			this.dialogCopy = false;
			$.post('/gyrcht/ywgl/xczpdy/zwfyBc', this.formCopy).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('职位复用成功！');
					this.refreshJob();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 删除招聘会的职位，lrzt录入状态为1表示有职位录入（已经录入了人数），为0没有职位录入
		deleteJob(row) {
			const msg = `${row.lrzt === '1' ? '该职位已录入是否删除？' : '是否删除该职位？'}`;
			this.$confirm(msg, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				$.delete('/gyrcht/ywgl/xczpdy/zwSc', {
					params: { dwzw_id: row.dwzw_id }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.getJobData();
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
			}).catch(() => {});
		},
		// 查询职位是否已存在 弹出提示
		checkJobNameOnly() {
			const data = {
				dwxx_id: this.companyId,
				dwzw_id: this.formCopy.dwzw_id,
				zph_id: this.formCopy.zph_id,
				czlx: '02'
			};
			return $.get('/gyrcht/ywgl/wtzp/zwjyCx', { params: data });
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
						czlx: '02',
						czid: this.zphId
					}
				});
			}
		},
		// 刷新
		refreshJob() {
			this.formXianJob.pageNum = 1;
			this.getJobData();
		},
		// 职位排序相关 ========================>
		postFormMoveJob() {
			this.formMoveJob.zph_id = this.formXianJob.zph_id;
			$.post('/gyrcht/ywgl/xczpdy/zwpxXg', this.formMoveJob).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.formMoveJob.ydzw_id = '';
					this.getJobData();
					this.$message.success('职位移动成功！');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => { });
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
					this.getJobData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// table复选框选中
		jobDelSelect(rows) {
			this.selectedDelJobRows = rows;
		},
		// 上移
		moveUp() {
			this.formMoveJob.ydlx = 'up';
			this.postFormMoveJob();
		},
		// 下移
		moveDown() {
			this.formMoveJob.ydlx = 'down';
			this.postFormMoveJob();
		},
		// 置顶
		moveUpUp() {
			this.formMoveJob.ydlx = 'top';
			this.postFormMoveJob();
		},
		// 置底
		moveDownDown() {
			this.formMoveJob.ydlx = 'bottom';
			this.postFormMoveJob();
		}
	},
	created() {
		const data = this.$route.params;
				/* eslint-disable no-return-assign */
		['companyId', 'yhId', 'zphrq', 'zphId', 'coName'].forEach(item => (this[item] = data[item]));
		this.modelInfo = {
			coName: this.coName,
			companyId: this.companyId,
			zphId: this.zphId,
			yhId: this.yhId,
			type: '02' // 现场招聘会type为02
		};
		this.formXianList.dwxx_id = this.companyId;
		this.formXianJob.dwxx_id = this.companyId;
		this.formMoveJob.dwxx_id = this.companyId;
		this.formXianJob.zph_id = this.zphId;
		this.getAvailability();
		this.getRecruitData();
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
	.btns_right {
		margin-bottom: 22px;
	}
	span.el-tag {
		height: auto;
		white-space: normal;
		margin: 9px 0;
	}
</style>
