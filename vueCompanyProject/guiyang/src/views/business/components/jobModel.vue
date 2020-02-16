<docs>
		## 业务管理--- 委托现场招聘海报打印---职位发布---中的模板管理
		* @date ###### Fri Sep 1 15:03:06 CST 2017
		* @author jinglf000
		* @desc 职位的查询编辑发布
</docs>
<template>
	<div class="tabs_jobpublish">
		<!-- 职位查询 开始 -->
		<el-form :model="form" :rules="rules" :label-width="labelWidth"
			ref="queryForm">
			<el-row>
				<h3 class="title">职位模板</h3>
			</el-row>
			<el-row>
				<el-col :span="14">
					<el-form-item label="模板名称" prop="zwmc">
						<el-input v-model="form.zwmc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="10" class="btns_right">
					<el-button class="btn_square" type="primary" native-type="submit" :loading="loading"
						@click.prevent="submitForm('queryForm')">查询</el-button>
					<el-button class="btn_square" @click="resetForm('queryForm')">重置</el-button>
				</el-col>
			</el-row>
			<div class="btns_right">
				<el-button type="primary" class="btn_square small_btn" icon="plus"
					@click="$router.push({
						name: 'bussJobModelDetail' ,
						params: {
							coName: info.coName,
							isNew: true, id: '',
							companyId: info.companyId,
							yhId: info.yhId, jobId: '',
							zpType: info.type
						}
					})">新建</el-button>
				<el-button type="danger" class="btn_square small_btn" icon="delete"
					@click="delMulit">删除</el-button>
				<el-button type="primary" class="btn_square small_btn" icon="circle-check"
					@click="jobPublishMulit">发布</el-button>
				<el-button type="primary" class="btn_square small_btn" icon="circle-check"
					@click="jobPublishAll">全部发布</el-button>
			</div>
		</el-form>
		<!-- 职位查询 结束 -->
		<!-- 查询结果 开始 -->
		<div class="loading" v-loading="loading">
			<el-table :data="results" stripe class="table_wrap" ref="jobTable"
				@selection-change="jobtableSelect">
				<el-table-column type="selection"  width="55"> </el-table-column>
				<el-table-column label="模板名称" prop="zwmc"></el-table-column>
				<el-table-column label="创建时间" prop="cjsj" width="110"></el-table-column>
				<el-table-column label="操作" width="120">
					<template scope="ele">
						<el-button class="table_btn btn_succss iconfont icon-ok" size="tiny"
							type="text" title="发布" @click="jobPublish(ele.row)"></el-button>
						<el-button class="table_btn btn_primary iconfont icon-edit" size="tiny"
							type="text" title="编辑" @click="jobEdit(ele.row)"></el-button>
						<el-button class="table_btn btn_primary iconfont icon-copy" size="tiny"
							type="text" title="复制" @click="jobCopy(ele.row)"></el-button>
						<el-button class="table_btn btn_warn" icon="delete" size="tiny"
							type="text" title="删除" @click="jobDelete(ele.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="formTotal"
					:current-page.sync="formRight.pageNum"
					@current-change="getData"></el-pagination>
			</div>
		</div>
		<!-- 查询结果 结束 -->
		<!-- 职位发布 现场和委托-->
		<el-dialog :title="`发布职位（${info.type === '02'? '现场' : '委托'}）`"
			:visible.sync="dialogPublish" >
			<el-form :form="formPublish" :label-width="labelWidth">
				<el-form-item label="选择招聘会或展位" v-show="publishJobList.length > 0">
					<checkbox-group
						v-model="formPublish.zph_ids"
						:list="publishJobList"
						:option="checkboxGroupOption"></checkbox-group>
				</el-form-item>
				<p v-show="publishJobList.length === 0">请先预定招聘会展位；</p>
			</el-form>
			<div class="footer" slot="footer">
				<el-button @click="dialogPubCancel">取消</el-button>
				<el-button @click="dialogPubSubmit" type="primary"
					:disabled="publishJobList.length === 0 || formPublish.zph_ids.length === 0">确定</el-button>
			</div>
		</el-dialog>
		<!-- 职位发布 结束-->
	</div>
</template>
<script>
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import checkboxGroup from '@/common/vue/checkboxGroup';

export default {
	name: 'bussJobModel',
	components: { checkboxGroup },
	props: {
		usable: {
			type: String,
			default: '1'
		},
		message: {
			type: String,
			default: ''
		},
		info: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			labelWidth,
			publishJobList: [], // 发布职位时，的现场招聘或委托招聘列表
			selectedRows: [], // 被选中的行数组
			isIndeterminate: false, // 发布职位全选
			// =========================> 职位模板查询
			// 双向表单
			form: {
				dwxx_id: '',
				zwmc: '',
				pageNum: 1
			},
			// 查询成功表单
			formRight: {},
			// 校验规则
			rules: {
				zwmc: [{ validator: validator('64, "full", "模板名称",true') }]
			},
			results: [],
			loading: false,
			formTotal: 0,
			// =========================> 职位发布
			dialogPublish: false,
			formPublish: {
				dwxx_id: '',
				dwzwmb_ids: [],
				zplx: '',
				zph_ids: [],
				isAll: '0'
			}
		};
	},
	watch: {
		/* eslint-disable func-names */
		'info.companyId': function () {
			this.getData();
		}
	},
	computed: {
		// 现场招聘会占位，委托招聘会占位
		checkboxGroupOption() {
			let option = null;
			switch (this.info.type) { // 02现场, 获取现场招聘列表
			case '02': option = { label: 'zphrq,zphbt', value: 'zph_id' };
				break; // 03委托，获取委托招聘列表
			case '03': option = { label: 'zphzwbh,zwydsj,,,zwjsrq', value: 'wtzwyd_id' };
				break;
			default: break;
			}
			return option;
		}
	},
	methods: {
		// =======================> 职位查询
		// 查询按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 表单重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 接口（get）
		getData() {
			this.formRight.dwxx_id = this.info.companyId;
			this.loading = true;
			$.get('/gyrcht/ywgl/xczpdy/zwmblbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.zwmblb;
				this.formTotal = +res.rowsCount;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// table复选框选中
		jobtableSelect(rows) {
			this.selectedRows = rows;
		},
		// ========================> 对查询的职位，发布、编辑、删除、复制
		// -------职位复制
		jobCopy(row) {
			$.put('/gyrcht/ywgl/xczpdy/zwmbfzBc', {
				dwzwcg_id: row.dwzwmb_id, dwxx_id: this.info.companyId }).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('复制成功！');
						this.getData();
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
		},
		// -------职位模板删除接口，待删除的职位id数组
		delData(arr) {
			$.put('/gyrcht/ywgl/xczpdy/zwmbSc', { dwzwmb_ids: arr }).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// -------职位删除（单条删除）
		jobDelete(row) {
			this.$confirm(`此操作将会删除“${row.zwmc}”职位模板，是否继续？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData([row.dwzwmb_id]);
			}).catch(() => {});
		},
		// 职位模板删除，批量
		delMulit() {
			// 判断
			if (this.selectedRows.length === 0) {
				this.$message.warning('请先勾选要删除的职位模板');
			} else {
				let msg = '';
				const rows = [];
				// 提示文字拼装
				this.selectedRows.forEach((item) => {
					rows.push(item.dwzwmb_id);
					msg += `${item.zwmc}，`;
				});
				msg = msg.substr(0, msg.length - 1);
				// 进一步确认
				this.$confirm(`此操作将会删除${msg}的职位模板，是否继续`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delData(rows);
				}).catch(() => {});
			}
		},
		// 职位编辑
		jobEdit(row) {
			this.$router.push({
				name: 'bussJobModelDetail',
				params: {
					coName: this.info.coName,
					zpType: this.info.type,
					isNew: false,
					jobId: row.dwzwmb_id,
					yhId: this.info.yhId,
					companyId: this.info.companyId
				}
			});
		},
		// 职位发布---> 选择招聘会--->发布职位
		// 获取现场招聘会，可用招聘会列表
		// getDataXianChangList() {
		// 	$.get('/gyrcht/ywgl/xczpdy/zphlbCx', {
		// 		params: {
		// 			dwxx_id: this.info.companyId,
		// 			sczpjzzt: '', // 提交简章状态
		// 			zphbs: '1', // 招聘会标识(1:可用 0:全部)
		// 			pageSize: 5000 // 把所有的可用的招聘会都查询出来(设置的足够大)
		// 		}
		// 	}).then((res) => {
		// 		this.publishJobList = res.returnData.xczplb;
		// 	}).catch(() => {});
		// },
		// 获取委托招聘会，可以占位列表
		getDataWeiTuoList() {
			$.get('/gyrcht/ywgl/wtzp/wtzwlbCx', {
				params: {
					dwxx_id: this.info.companyId,
					wtzwbs: '1', // 委托展位标识(0:可用1:全部)
					sczpjzzt: '', // (1：已提交 0：未提交)全部
					pageSize: 5000 // 把所有的可用的委托招聘会都查询出来(设置的足够大)，不要分页
				}
			}).then((res) => {
				this.publishJobList = res.returnData.wtzplb;
			}).catch(() => {});
		},
		// 职位发布（发布当前职位模板）
		// 现场直接发布 委托唤出dialog
		jobPublish(row) {
			this.formPublish.isAll = '0'; // 全部发布标识
			this.formPublish.dwzwmb_ids = [row.dwzwmb_id]; // 当前职位
			this.resetCheckoutGroup(); // 重置多选
			if (this.info.type === '02') {
				if (+this.usable) {
					this.formPublish.zph_ids = [this.info.zphId];
					this.dialogPubSubmit();
				} else {
					this.message = this.message ? this.message : '招聘会不可用';
					this.$message.warning(this.message);
				}
			} else {
				this.dialogPublish = true;
			}
		},
		// 职位批量发布（发布选中的职位模板）
		jobPublishMulit() {
			if (this.info.type === '02') {
				if (+this.usable) {
					if (this.selectedRows.length === 0) {
						this.$message.warning('请先勾选发布的职位');
					} else {
						this.formPublish.isAll = '0'; // 全部发布标识
						this.formPublish.dwzwmb_ids =	this.selectedRows.map(item => item.dwzwmb_id);
						this.resetCheckoutGroup(); // 重置多选
						this.formPublish.zph_ids = [this.info.zphId];
						this.dialogPubSubmit();
					}
				} else {
					this.$message.warning(this.message);
				}
			} else {
				if (this.selectedRows.length === 0) {
					this.$message.warning('请先勾选发布的职位');
				} else {
					this.formPublish.isAll = '0'; // 全部发布标识
					this.formPublish.dwzwmb_ids =	this.selectedRows.map(item => item.dwzwmb_id);
					this.resetCheckoutGroup(); // 重置多选
				}
				this.dialogPublish = true;
			}
		},
		// 职位全部发布（发布所有的职位模板）
		jobPublishAll() {
			this.formPublish.isAll = '1'; // 全部发布标识
			this.formPublish.dwzwmb_ids = ['']; // 因为后台校验 所以传入一个无用空值
			this.resetCheckoutGroup(); // 重置多选
			if (this.info.type === '02') {
				if (+this.usable) {
					this.formPublish.zph_ids = [this.info.zphId];
					this.dialogPubSubmit();
				} else {
					this.$message.warning(this.message);
				}
			} else {
				this.dialogPublish = true;
			}
		},
		// 发布职位是重置招聘会类别复选面板
		resetCheckoutGroup() {
			this.formPublish.zph_ids = [];
			this.checkAll = false;
			this.isIndeterminate = false;
		},
		// dialog 发布取消按钮
		dialogPubCancel() {
			this.dialogPublish = false;
		},
		// dialog 发布提交按钮
		dialogPubSubmit() {
			this.checkJobNameOnly().then((res) => {
				if (res.returnData.executeResult === '1') {
					this.putData();
					this.dialogPublish = false;
				} else {
					this.$confirm(res.returnData.message, '提示', {
						type: 'warning'
					}).then(() => {
						this.putData();
						this.dialogPublish = false;
					}).catch(() => {});
				}
			}).catch(() => {});
		},
		// 职位模板 接口
		putData() {
			$.put('/gyrcht/ywgl/xczpdy/zwmbfbBc', this.formPublish).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('职位发布成功');
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 查询职位是否已存在 弹出提示
		checkJobNameOnly() {
			const data = {
				dwxx_id: this.info.companyId,
				dwzw_id: this.formPublish.dwzwmb_ids.join(','),
				zph_id: this.formPublish.zph_ids.join(','),
				czlx: this.formPublish.zplx
			};
			return $.post('/gyrcht/ywgl/wtzp/zwjyCx', data);
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.formPublish.dwxx_id = this.info.companyId;
		this.getData();
		switch (this.info.type) { // 02现场, 获取现场招聘列表
		case '02':
			this.formPublish.zplx = '02';
			break;
		case '03': this.getDataWeiTuoList(); // 03委托，获取委托招聘列表
			this.formPublish.zplx = '03';
			break;
		default: break;
		}
	}
};
</script>
<style scoped>
	.btns_right {
		margin-top: 3px;
		margin-bottom: 22px;
	}
	/* 表格操作按钮 按钮样式*/
	.table_btn {
		font-size: 16px;
		color: #666;
	}
	.table_btn + .table_btn {
		margin-left: 0;
	}
	.table_btn:before {
		padding-right: 5px;
	}
	.btn_succss:hover{
		color: #33cf87;
	}
	.btn_primary:hover {
		color:  #0eacff;
	}
	.btn_warn:hover{
		color: #f0565c;
	}
	.small_btn {
		padding: 7px 10px;
	}
</style>
