<docs>
	## 招聘推广----热门行业
	@date ###### Mon Jul 9 17:42:45 CST 2018
	@author cx
	@desc 热门行业库的查询、新增和删除操作
</docs>

<template>
	<div class="detail_wrap">
		<el-row>
			<el-col :span="20">
				<!-- 上级行业 start -->
				<el-col :span="12">
					<div class="po_r flxmc_add">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingParent" @click="addZdhy('formType','sjhy')"></el-button>
						<!-- 上级行业名称列表 start -->
						<el-table :data="resParent" class="exam_table table_wrap"
							highlight-current-row @row-click="clickParent">
							<el-table-column label="上级行业名称" prop='zdhymc' class-name="cur_pointer">
								<template scope="name">
									<span>{{name.row.zdhymc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="创建人" prop="cjr"></el-table-column>
							<el-table-column label="是否展示" prop="sfzs" min-width="130">
								<template scope="showState">
									<el-switch v-model="showState.row.sfzs" :width="72"
										on-value="1" on-text="是" :on-color="colorOn"
										off-value="0" off-text="否" :off-color="colorOff"
										@change="switchState(showState.row)"></el-switch>
								</template>
							</el-table-column>
							<!-- <el-table-column label="备注" prop="bz"></el-table-column> -->
							<el-table-column label="" width="90">
								<template scope="operate">
									<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delParent(operate.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 上级行业名称列表 end -->
					</div>
					<!-- 分页 start -->
					<div class="pagination_wrap" v-show="resParent.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalParent"
							:current-page.sync="formParent.pageNum"
							@current-change="getParentType"></el-pagination>
					</div>
					<!-- 分页 end -->
				</el-col>
				<!-- 上级行业 end -->
				<!-- 子行业 start -->
				<el-col :span="12">
					<div class="po_r">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingSubType" @click="addZdhy('formType','zhy')"></el-button>
						<!-- 职位列表 start -->
						<el-table :data="resSubType" class="exam_table table_wrap"
							highlight-current-row>
							<el-table-column label="子行业名称" prop='zdhymc' class-name="cur_pointer">
								<template scope="name">
									<span>{{name.row.zdhymc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="创建人" prop="cjr"></el-table-column>
							<el-table-column label="备注" prop="bz"></el-table-column>
							<el-table-column label="" width="90">
								<template scope="operate">
									<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delSubType(operate.row,operate.$index)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 职位列表 end -->
					</div>
					<!-- 分页 start -->
					<div class="pagination_wrap" v-show="resSubType.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalSubType"
							:current-page.sync="formSearchSubType.pageNum"
							@current-change="getSubType"></el-pagination>
					</div>
					<!-- 分页 end -->
				</el-col>
			</el-col>
			<!-- 上级行业 end -->
		</el-row>
		<!-- 添加 热门行业 开始 -->
		<el-dialog :title="dialog.title" :visible.sync="dialog.state" size="tiny" class="dialog">
			<el-form :model="form" ref="formType" :label-width="labelWidth" :rules="rules">
				<el-form-item prop="zdhymc" required label="行业名称">
					<el-input v-model="form.zdhymc"></el-input>
				</el-form-item>
				<!-- <el-form-item prop="zdhy_id" label="上级">
					<el-input v-model="dialog.upper" readonly class="input_no_border"></el-input>
				</el-form-item> -->
				<el-form-item label="备注" prop="bz">
					<el-input type="textarea" v-model="form.bz" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogCancel('formType')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formType')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 添加 热门行业 结束 -->
	</div>
</template>

<script>
	import { labelWidth, colorOn, colorOff } from '@/common/js/config';
	import $ from '@/common/js/axios';
	import { validator } from '@/common/js/valid';


	export default {
		name: 'typeManage',
		data() {
			return {
				labelWidth,
				colorOn,
				colorOff,
				// 查询加载状态
				loadingParent: false,
				loadingSubType: false,
				// 查询 上级行业
				formParent: {
					zdhy_id: '',
					pageNum: 1
				},
				// 查询结果（total：总条数）（表格数据）
				totalParent: 0,
				resParent: [],
				totalSubType: 0,
				resSubType: [],
				// 弹窗表单
				// // 添加 上级行业
				// formInfoParent: {
				// 	zdhy_id: '',
				// 	bz: ''
				// },
				// // 添加 子行业
				// formInfoSubType: {
				// 	zdhy_id: '',
				// 	zlx_id: '',
				// 	zdhymc: ''
				// },
				form: {
					zdhy_id: '',
					zdhymc: '',
					bz: ''
				},
				dialog: {
					title: '',
					state: false,
					type: ''
				},
				// 查询 父类型所有子行业
				formSearchSubType: {
					zdhy_id: '',
					pageNum: 1
				},
				// 弹窗表单校验
				rules: {
					zdhymc: [{ validator: validator('12, "normal", "行业名称",false') }]
				},
				// 上级行业 id
				zdhyIds: ''
			};
		},
		methods: {
			// 选中父类型 changes 事件
			clickParent(val) {
				this.zdhyIds = val.zdhy_id;
				this.getSubType();
			},
			// 获取上级行业名称列表
			getParentType() {
				this.loading = true;
				$.get('/gyrcht/zdhy/zdhy/zdhyCx', {
					params: this.formParent
				}).then((res) => {
					this.resParent = res.returnData.zdhylb;
					this.totalParent = +res.rowsCount || 0;
					this.loading = false;
					this.resSubType = [];
				}).catch(() => {
					this.loading = false;
				});
			},
			// 是否展示状态变更
			switchState(row) {
				this.$nextTick(() => {
					if (row.switchState === undefined) {
						this.$set(row, 'switchState', true);
					}
					row.switchState = true;
					$.post('/gyrcht/zdhy/zdhy/zdhyzsBc', {
						zdhy_id: row.zdhy_id,
						sfzs: row.sfzs
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '状态变更成功',
								showClose: true,
								onClose: () => {
									this.getData();
									row.switchState = false;
								}
							});
						} else {
							this.getData();
							this.$message.error(res.returnData.message);
							row.switchState = false;
						}
					}).catch(() => {
						this.getData();
						row.switchState = false;
					});
				});
			},
			// 默认查询该父类型下的所有子行业
			getSubType() {
				this.formSearchSubType.zdhy_id = this.zdhyIds;
				this.loading = true;
				$.get('/gyrcht/zdhy/zdhy/zdhyCx', {
					params: this.formSearchSubType
				}).then((res) => {
					this.resSubType = res.returnData.zdhylb;
					this.totalSubType = +res.rowsCount || 0;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			},
			// 添加热门行业
			addZdhy(formName, type) {
				// dialog对话框
				this.dialog.title = '添加热门行业';
				// 表单重置
				if (this.$refs[formName]) {
					this.$refs[formName].resetFields();
				}
				if (type === 'sjhy') {
					this.dialog.state = true;
					this.dialog.type = 'sjhy';
					// this.form.zdhy_id = '';
				} else if (type === 'zhy') {
					if (!this.zdhyIds) {
						this.$message.warning('请选择父类型后再添加子行业！');
					} else {
						this.dialog.state = true;
						this.dialog.type = 'zhy';
						this.form.zdhy_id = this.zdhyIds;
					}
				}
			},
			// dialog 确认按钮
			dialogSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.postData();
						this.dialog.state = false;
					}
				});
			},
			postData() {
				if (this.dialog.type === 'sjhy') {
					this.form = {
						bz: this.form.bz,
						zdhymc: this.form.zdhymc
					};
				}
				$.post('/gyrcht/zdhy/zdhy/zdhyBc', this.form).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('热门行业添加成功！');
						if (this.dialog.type === 'zhy') {
							this.getSubType();
						} else {
							this.getParentType();
						}
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
			},
			// 删除 父类型 ====================>
			delParent(row) {
				this.$confirm('确定要删除该上级行业名称么？', '提示', {
					type: 'warning'
				}).then(() => {
					this.delZdhy(row.zdhy_id);
				}).catch(() => {});
			},
			// 删除相应父类型下的子行业
			delSubType(row, index) {
				this.$confirm('确定要删除该子行业么？', '提示', {
					type: 'warning'
				}).then(() => {
					this.delZdhy(row.zdhy_id, index);
				}).catch(() => {});
			},
			// 删除热门行业 接口
			delZdhy(id, i) {
				$.post('/gyrcht/zdhy/zdhy/zdhySc', {
					zdhy_id: id
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						if (i === undefined) {
							this.getParentType();
						} else {
							this.resSubType.splice(i, 1);
						}
					} else {
						this.$message.error(res.returnData.message);
					}
				}).catch(() => {});
			},
			// 弹窗操作
			// 关闭
			resetFn(formName, showState) {
				setTimeout(() => {
					if (this.$refs[formName]) {
						this.$refs[formName].resetFields();
					}
				}, 5);
				this[showState] = false;
			},
			// dialog 取消按钮
			dialogCancel(formName) {
				this.dialog.state = false;
				this.$refs[formName].resetFields();
			}
		},
		created() {
			this.getParentType();
		}
	};
</script>

<style lang="less" scoped>
.btn_square {
	padding: 7px 8px;
}
.btn_add {
	position: absolute;
	top: 5px;
	right: 20px;
	z-index: 1;
}
.appendWrap {
	padding-right: 40px;
	box-sizing: border-box;
}
.appendText {
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: rgb(72, 85, 106);
	line-height: 1;
	padding: 11px 0 8px 12px;
	box-sizing: border-box;
}
.sub_checkbox {
	margin: 0 0 10px 20px;
	max-width: 220px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
}
.sub_delbtn {
	margin-right: 20px;
	float: right;
}
.po_r{
	margin-top: 26px;
}
.po_mar{
	margin: 0;
}
.flxmc_add{
	margin-top: 25px;
}
.query_wrap{
	margin-left: 10px;
}
.company_info{
	color: #818a96;
	font-size: 16px;
	margin-top: 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.km_footer{
	text-align: right;
}
.km_item{
	margin-top: 20px;
}
.examKssj{
	display: block;
}
</style>
