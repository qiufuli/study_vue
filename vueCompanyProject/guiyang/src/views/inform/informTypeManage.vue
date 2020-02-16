<docs>
	## 资讯管理---类型管理
</docs>

<template>
	<div class="detail_wrap info_type">
		<el-row>
			<el-col :span="20">
				<!-- 父类型 start -->
				<el-col :span="12">
					<div class="po_r flxmc_add">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingParent" @click="addParent"></el-button>
						<!-- 父类型名称列表 start -->
						<el-table :data="resParent" class="exam_table table_wrap"
							highlight-current-row @row-click="changeParent">
							<el-table-column label="父类型名称" prop='flxmc' class-name="cur_pointer">
								<template scope="name">
									<span>{{name.row.flxmc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="是否启用" prop="sfqy">
								<template scope="stateSfqy">
									<el-switch v-model="stateSfqy.row.sfqy" v-if="stateSfqy.$index > 0"
										on-value="1" on-text="是" :on-color="color.on"
										off-value="0" off-text="否" :off-color="color.off"
										@change="switchState(stateSfqy.row)"></el-switch>
								</template>
							</el-table-column>
							<el-table-column label="" width="160">
								<template scope="operate">
									<el-button title="上移" type="primary" v-if="operate.$index > 1" size="mini" class="icon-up iconfont"
										@click.stop="moveParent(operate.row, 'up', '01')"></el-button>
									<el-button title="下移" type="primary" v-if="operate.$index > 0 && operate.$index < resParent.length-1" size="mini" class="icon-down iconfont"
										@click.stop="moveParent(operate.row, 'down', '01')"></el-button>
									<el-button title="编辑" type="primary" v-if="operate.$index > 0" size="mini" icon="edit"
										@click.stop="editParent(operate.row)"></el-button>
									<el-button title="删除" size="mini" v-if="operate.$index > 0" type="danger" icon="delete"
										@click.stop="delParent(operate.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 父类型名称列表 end -->
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
				<!-- 父类型 end -->
				<!-- 子类型 start -->
				<el-col :span="12">
					<div class="po_r">
						<el-button class="btn_square btn_add"
							size="small" type="primary" icon="plus" title="添加"
							:loading="loadingSubType" v-show="maybeLikeFlag" @click="addSubType()"></el-button>
						<!-- 子类型列表 start -->
						<el-table :data="resSubType" class="exam_table table_wrap"
							highlight-current-row>
							<el-table-column label="子类型名称" prop='zlxmc' class-name="cur_pointer">
								<template scope="name">
									<span>{{name.row.zlxmc}}</span>
								</template>
							</el-table-column>
							<el-table-column label="是否启用" prop="sfqy">
								<template scope="stateSfqySub">
									<el-switch v-model="stateSfqySub.row.sfqy"
										on-value="1" on-text="是" :on-color="color.on"
										off-value="0" off-text="否" :off-color="color.off"
										@change="switchStateSub(stateSfqySub.row)"></el-switch>
								</template>
							</el-table-column>
							<el-table-column label="" width="160">
								<template scope="operate">
									<el-button title="上移" type="primary" v-if="operate.$index > 0" size="mini" class="icon-up iconfont"
										@click.stop="moveParent(operate.row, 'up', '02')"></el-button>
									<el-button title="下移" type="primary" v-if="operate.$index < resSubType.length-1" size="mini" class="icon-down iconfont"
										@click.stop="moveParent(operate.row, 'down', '02')"></el-button>
									<el-button title="编辑" type="primary" size="mini" icon="edit"
										@click.stop="editSubType(operate.row)"></el-button>
									<el-button title="删除" size="mini" type="danger" icon="delete"
										@click.stop="delSubType(operate.row,operate.$index)"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 子类型列表 end -->
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
			<!-- 父类型 end -->
		</el-row>
    <!-- 弹窗 父类型 start -->
    <el-dialog title="父类型名称" :visible.sync="dialogParent" size="tiny"
			@close="resetFn('formInfoParent', 'dialogParent')">
      <el-form :model="formInfoParent" :label-width="labelWidthMax" :rules="rulesInfoParent"
				ref="formInfoParent">
				<el-form-item label="父类型名称" prop="flxmc" required>
					<el-input v-model="formInfoParent.flxmc"></el-input>
				</el-form-item>
				<el-form-item label="是否启用" prop="sfqy" >
					<el-switch v-model="formInfoParent.sfqy"
						on-value="1" on-text="是" :on-color="color.on"
						off-value="0" off-text="否" :off-color="color.off"></el-switch>
				</el-form-item>
				<!-- <el-form-item label="序号" prop="xh" required>
					<el-input v-model="formInfoParent.xh"></el-input>
				</el-form-item> -->
				<el-form-item label="备注" prop="bz">
					<el-input type="textarea" v-model="formInfoParent.bz"></el-input>
				</el-form-item>
			</el-form>
			<div class=" footer" slot="footer">
				<el-button class="no_radius" size="small"
					@click="resetFn('formInfoParent', 'dialogParent')">取消</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveInfoParent('formInfoParent')">保存</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveAddParent('formInfoParent')">保存并添加</el-button>
			</div>
    </el-dialog>
    <!-- 弹窗 父类型 end -->

		<!-- 弹窗 子类型 start -->
		<el-dialog title="子类型名称" :visible.sync="dialogSubType" size="tiny"
			@close="resetFn('formInfoSubType', 'dialogSubType')">
			<el-form :model="formInfoSubType" :label-width="labelWidthMax" :rules="rulesInfoSub"
				ref="formInfoSubType">
				<el-form-item label="子类型名称" prop="zlxmc" required>
					<el-input v-model="formInfoSubType.zlxmc"></el-input>
				</el-form-item>
				<el-form-item label="是否启用" prop="sfqy" >
					<el-switch v-model="formInfoSubType.sfqy"
						on-value="1" on-text="是" :on-color="color.on"
						off-value="0" off-text="否" :off-color="color.off"></el-switch>
				</el-form-item>
			</el-form>
			<div class="btns_right">
				<el-button class="btn_square" @click="resetFn('formInfoSubType', 'dialogSubType')">取消</el-button>
				<el-button class="btn_square" type="primary" @click="saveSubType('formInfoSubType')">保存</el-button>
				<el-button class="btn_square" type="primary" @click="saveAddSubType('formInfoSubType')">保存并添加</el-button>
			</div>
		</el-dialog>
		<!-- 弹窗 子类型 end -->
	</div>
</template>

<script>
	import { labelWidthMax, colorOn, colorOff } from '@/common/js/config';
	import $ from '@/common/js/axios';

	export default {
		name: 'informTypeManage',
		data() {
			return {
				labelWidthMax,
				color: {
					on: colorOn,
					off: colorOff
				},
				// 查询加载状态
				loadingParent: false,
				loadingSubType: false,
				// 添加子类型按钮是否显示标志
				maybeLikeFlag: true,
				// 查询 父类型
				formParent: {
					czlx: '0',
					pageNum: 1
				},
				// 查询结果（total：总条数）（表格数据）
				totalParent: 0,
				resParent: [],
				totalSubType: 0,
				resSubType: [],
				// 父类型及子类型（弹窗） ====================>
				// 弹窗可见状态
				dialogParent: false,
				dialogSubType: false,
				// 弹窗表单
				// 添加 父类型
				formInfoParent: {
					flx_id: '',
					flxmc: '',
					// xh: '',
					sfqy: '',
					czlx: '',
					bz: ''
				},
				// 有效转态字段
				formFalse: {
					flx_id: '',
					sfqy: ''
				},
				formFalseSub: {
					zlx_id: '',
					sfqy: ''
				},
				// 添加 子类型
				formInfoSubType: {
					flx_id: '',
					flxbh: '',
					zlx_id: '',
					zlxmc: '',
					czlx: '',
					sfqy: ''
				},
				// 查询 父类型所有子类型
				formSearchSubType: {
					flxbh: '',
					czlx: '0',
					pageNum: 1
				},
				// 弹窗表单校验
				rulesInfoParent: {
					flxmc: [{ required: true, message: '父类型名称不能为空' }]
					// xh: [{ required: true, message: '序号不能为空' }]
				},
				rulesInfoSub: {
					zlxmc: [{ required: true, message: '子类型名称不能为空' }]
				},
				// 父类型 id
				flxIds: '',
				// 父类型问题编号
				flxbh: ''
			};
		},
		methods: {
			// 选中父类型 changes 事件
			changeParent(val) {
				this.flxbh = val.flxbh;
				this.flxIds = val.flx_id;
				if (val.xh === '1') {
					this.getSubType(val.xh);
					return false;
				}
				this.getSubType();
			},
			// 获取父类型名称列表
			getParentType() {
				this.loadingParent = true;
				$.get('/gyrcht/zxgl/xxzx/xxzxflxCx', {
					params: this.formParent
				}).then((res) => {
					this.resParent = res.returnData.flxlb;
					this.totalParent = +res.rowsCount || 0;
					// if (res.returnData.fpdws.length === 0) {
					// 	this.flxIds = '';
					// }
					this.loadingParent = false;
					this.resSubType = [];
				}).catch(() => {
					this.loadingParent = false;
				});
			},
			// 是否启用 变更
			switchState(row) {
				this.formFalse.flx_id = row.flx_id;
				this.formFalse.sfqy = row.sfqy;
				this.$nextTick(() => {
					if (row.switchState === undefined) {
						this.$set(row, 'switchState', true);
					}
					row.switchState = true;
					$.put('/gyrcht/zxgl/xxzx/xxzxflxQy', this.formFalse).then((res) => {
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
							row.yxzt = row.yxzt === '10' ? '20' : '10';
							row.switchState = false;
						}
					}).catch(() => {
						row.switchState = false;
					});
				});
			},
			// 是否启用 子类型 变更
			switchStateSub(row) {
				this.formFalseSub.zlx_id = row.zlx_id;
				this.formFalseSub.sfqy = row.sfqy;
				this.$nextTick(() => {
					if (row.switchState === undefined) {
						this.$set(row, 'switchState', true);
					}
					row.switchState = true;
					$.put('/gyrcht/zxgl/xxzx/xxzxzlxQy', this.formFalseSub).then((res) => {
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
							row.yxzt = row.yxzt === '10' ? '20' : '10';
							row.switchState = false;
						}
					}).catch(() => {
						row.switchState = false;
					});
				});
			},
			// 添加 父类型
			addParent() {
				this.dialogParent = true;
				this.formInfoParent.czlx = '0';
			},
			// 添加 父类型名称
			addksCom() {
				$.post('/gyrcht/zxgl/xxzx/xxzxflxBc',
				this.formInfoParent).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('父类型添加成功！');
						this.getParentType();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loadingParent = false;
				}).catch(() => {
					this.loadingParent = false;
				});
			},
			// 保存 父类型信息
			saveInfoParent(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.addksCom();
						this.dialogParent = false;
					}
				});
			},
			// 保存并添加 父类型信息
			saveAddParent(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.addksCom();
						setTimeout(() => {
							this.$refs[formName].resetFields();
							this.formInfoParent.czlx = '0';
							this.formInfoParent.flx_id = '';
						}, 5);
					}
				});
			},
			// 添加 子类型
			addSubType() {
				if (!this.flxIds) {
					this.$message.warning('请选择父类型后再添加子类型！');
				} else {
					this.dialogSubType = true;
					this.formInfoSubType.czlx = '0';
					this.formInfoSubType.zlx_id = '';
				}
			},
			// 默认查询该父类型下的所有子类型
			getSubType(param) {
				if (param === '1') {
					this.resSubType = [];
					this.totalSubType = 0;
					this.maybeLikeFlag = false;
					return false;
				}
				this.maybeLikeFlag = true;
				this.formSearchSubType.flxbh = this.flxbh;
				this.loadingSubType = true;
				$.get('/gyrcht/zxgl/xxzx/xxzxzlxCx', {
					params: this.formSearchSubType
				}).then((res) => {
					this.resSubType = res.returnData.zlxlb;
					this.totalSubType = +res.rowsCount || 0;
					this.loadingSubType = false;
				}).catch(() => {
					this.loadingSubType = false;
				});
			},
			// 子类型添加 接口
			addSubTypeInfo() {
				this.formInfoSubType.flx_id = this.flxIds;
				this.formInfoSubType.flxbh = this.flxbh;
				$.post('/gyrcht/zxgl/xxzx/xxzxzlxBc',
				this.formInfoSubType).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('子类型添加成功！');
						this.getSubType();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loadingSubType = false;
				}).catch(() => {
					this.loadingSubType = false;
				});
			},
			// 保存子类型信息
			saveSubType(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.formInfoSubType.flx_id = this.flxIds;
						this.addSubTypeInfo();
						this.dialogSubType = false;
					}
				});
			},
			// 报存并添加子类型信息
			saveAddSubType(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.addSubTypeInfo();
						setTimeout(() => {
							this.$refs[formName].resetFields();
							this.formInfoSubType.czlx = '0';
							this.formInfoSubType.zlx_id = '';
							// this.formInfoSubType.lxjb = '02';
						}, 5);
					}
				});
			},
			// 删除 父类型 ====================>
			delParent(row) {
				this.$confirm('确定要删除该父类型名称么？', '提示', {
					type: 'warning'
				}).then(() => {
					$.delete('/gyrcht/zxgl/xxzx/xxzxflxSc', {
						params: {
							flx_id: row.flx_id,
							flxbh: row.flxbh
						}
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.getParentType();
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 删除相应父类型下的子类型
			delSubType(row, i) {
				this.$confirm('确定要删除该子类型么？', '提示', {
					type: 'warning'
				}).then(() => {
					$.delete('/gyrcht/zxgl/xxzx/xxzxzlxSc', {
						params: {
							zlx_id: row.zlx_id,
							zlxwtbh: row.zlxwtbh
						}
					}).then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message.success('删除成功！');
							this.resSubType.splice(i, 1);
						} else {
							this.$message.error(res.returnData.message);
						}
					}).catch(() => {});
				}).catch(() => {});
			},
			// 修改 ====================>
			// 编辑 父类型
			editParent(row) {
				this.dialogParent = true;
				setTimeout(() => {
					Object.keys(this.formInfoParent).forEach((item) => {
						this.formInfoParent[item] = row[item];
						this.formInfoParent.czlx = '1';
					});
				}, 1);
			},
			// 编辑 子类型
			editSubType(row) {
				this.dialogSubType = true;
				setTimeout(() => {
					Object.keys(this.formInfoSubType).forEach((item) => {
						this.formInfoSubType[item] = row[item];
					});
					this.formInfoSubType.czlx = '1';
					// this.formInfoSubType.lxjb = '02';
				}, 1);
			},
			// 上移 下移 操作
			moveParent(row, type, jb) {
				let moveData;
				if (jb === '01') {
					moveData = {
						czlx: type,
						zxlx_id: row.flx_id,
						xh: row.xh,
						lxjb: jb
					};
				} else if (jb === '02') {
					moveData = {
						czlx: type,
						zxlx_id: row.zlx_id,
						xh: row.xh,
						lxjb: jb
					};
				}
				$.put('/gyrcht/zxgl/xxzx/xxzxlxPx', moveData).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '移动成功'
						});
						if (jb === '01') {
							this.getParentType();
						} else if (jb === '02') {
							this.getSubType();
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

