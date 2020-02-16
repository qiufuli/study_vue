<docs>
	## 考试管理---考场管理---考点/考场设置
	* @author SHJ
	* @date 2017年12月5日
	* @desc
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="考试名称" prop="ksmc" required>
							<el-autocomplete v-model="form.ksmc"
							:fetch-suggestions="getNameList" :props="selectValue"
							@select="selectExam" class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-button class="btn_text" type="text" :disabled="!searchExamId"
						@click="dialogPeople = true;" :loading="loadingSite">考场人数维护
						<span v-if="ksAllrs">（{{ksAllrs}}人）</span>
						<span v-else>（未设置）</span>
					</el-button>
					<el-col :span="6">
						<el-form-item label="考点名称" prop="kdmc">
							<el-input v-model="form.kdmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loadingSite"
								@click.prevent="handleSearch('queryForm')">查询</el-button>
							<el-button @click="handleReset('queryForm');">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start -->
		<div class="detail_wrap" v-loading="loadingSite">
			<p class="exam_title" v-show="searchExamName">当前考试：{{searchExamName}}</p>
			<el-row>
				<!-- 考点start -->
				<el-col :span="12">
					<div class="po_r">
						<el-button class="btn_square btn_add" :disabled="!searchExamId"
							size="small" type="primary" icon="plus" title="添加考点"
							:loading="loadingSite" @click="addSite('formSite')"></el-button>
						<el-table :data="resSite" class="table_wrap width_100"
							highlight-current-row
							@current-change="changeSite">
							<el-table-column label="考点名称" prop="kdmc" class-name="cur_pointer">
								<template scope="siteName">
									<span>{{ `${siteName.row.kdbh}-${siteName.row.kdmc}` }}</span>
								</template>
							</el-table-column>
							<el-table-column label="考点地址" prop="kddz" class-name="cur_pointer"></el-table-column>
							<el-table-column label="" width="90">
								<template scope="operation">
									<el-button type="primary" icon="edit" size="mini" title="编辑考点"
										@click.stop="setSite(operation.row)"></el-button>
									<el-button type="danger" icon="delete" size="mini" title="删除考点"
										@click.stop="delSite(operation.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="pagination_wrap" v-show="resSite.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalSite"
							:current-page.sync="formRight.pageNum"
							@current-change="getSites"></el-pagination>
					</div>
				</el-col>
				<!-- 考点end -->

				<!-- 考场start -->
				<el-col :span="12">
					<div class="po_r">
						<el-button class="btn_square btn_add" :disabled="!siteId"
							size="small" type="primary" icon="plus" title="添加考场"
							:loading="loadingRoom" @click="addRoom('formRoom')"></el-button>
						<el-table :data="resRoom" class="table_wrap width_100">
							<el-table-column label="考场名称" prop="kcmc">
								<template scope="roomName">
									<span>{{ `${roomName.row.kcbh} ${roomName.row.kcmc}` }}</span>
								</template>
							</el-table-column>
							<el-table-column label="" width="90">
								<template scope="operation">
									<el-button type="primary" icon="edit" size="mini" title="编辑考场"
										@click="setRoom(operation.row)"></el-button>
									<el-button type="danger" icon="delete" size="mini" title="删除考场"
										@click="delRoom(operation.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="pagination_wrap" v-show="resRoom.length > 0">
						<el-pagination
							layout="total,prev,pager,next,jumper"
							:total="totalRoom"
							:current-page.sync="pageNumRoom"
							@current-change="getRooms"></el-pagination>
					</div>
				</el-col>
				<!-- 考场end -->
			</el-row>
		</div>

		<!-- 添加/编辑考点start -->
		<el-dialog title="考点信息" size="tiny" :visible.sync="dialogSite"
			@close="resetFn('formRoom', 'dialogSite')">
			<el-form :model="formSite" :rules="rulesSite" :label-width="labelWidth"
				ref="formSite">
				<el-form-item label="考点编号" prop="kdbh" required>
					<el-input v-model="formSite.kdbh"></el-input>
				</el-form-item>
				<el-form-item label="考点名称" prop="kdmc" required>
					<el-input v-model="formSite.kdmc"></el-input>
				</el-form-item>
				<el-form-item label="考点地址" prop="kddz" required>
					<el-input type="textarea" v-model="formSite.kddz" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button size="small" class="no_radius" @click="resetFn('formRoom', 'dialogSite')">取消</el-button>
				<el-button size="small" class="no_radius" type="primary" @click="saveSite('formSite')">保存</el-button>
				<el-button size="small" class="no_radius" type="primary" @click="saveAndAddSite('formSite')">保存并添加</el-button>
			</div>
		</el-dialog>
		<!-- 添加/编辑考点end -->

		<!-- 添加/编辑考场start -->
		<el-dialog title="考场信息" size="tiny" :visible.sync="dialogRoom"
			@close="resetFn('formRoom', 'dialogRoom')">
			<el-form :model="formRoom" :rules="rulesRoom" :label-width="labelWidth"
				ref="formRoom">
				<el-form-item label="考场编号" prop="kcbh" required>
					<el-input v-model="formRoom.kcbh"></el-input>
				</el-form-item>
				<el-form-item label="考场名称" prop="kcmc" required>
					<el-input v-model="formRoom.kcmc"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="bz">
					<el-input type="textarea" v-model="formRoom.bz" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button size="small" class="no_radius" @click="resetFn('formRoom', 'dialogRoom')">取消</el-button>
				<el-button size="small" class="no_radius" type="primary" @click="saveRoom('formRoom')">保存</el-button>
				<el-button size="small" class="no_radius" type="primary" @click="saveAndAddRoom('formRoom')">保存并添加</el-button>
			</div>
		</el-dialog>
		<!-- 添加/编辑考场end -->

		<!-- 考场人数维护start -->
		<el-dialog title="考场人数维护" size="tiny" :visible.sync="dialogPeople">
			<el-form :model="formPeople" :rules="rulesExam" :label-width="labelWidth"
				ref="formPeople" >
				<el-form-item label="考试名称">
					<el-input v-model="searchExamName" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="考场人数" prop="kcrs" required>
					<el-input v-model="formPeople.kcrs"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer" slot="footer">
				<el-button @click="resetFn('formPeople', 'dialogPeople')">取消</el-button>
				<el-button type="primary" @click="savePeople('formPeople')">保存</el-button>
			</div>
		</el-dialog>
		<!-- 考场人数维护 end -->
	</div>
</template>

<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'examRoom',
	data() {
		// 考点名称 唯一性查询
		const checkOnlySiteName = (rule, val, callback) => {
			const data = {
				kd_id: this.formSite.kd_id,
				ks_id: this.searchExamId,
				kdmc: this.formSite.kdmc,
				czlx: this.formSite.czlx
			};
			$.get('/gyrcht/ksgl/kcgl/bkkdmcWyCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		// 考点编号 唯一性查询
		const checkOnlySiteNum = (rule, val, callback) => {
			const data = {
				kd_id: this.formSite.kd_id,
				ks_id: this.searchExamId,
				kdbh: this.formSite.kdbh,
				czlx: this.formSite.czlx
			};
			$.get('/gyrcht/ksgl/kcgl/bkkdbhWyCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
					this.isSave = true;
				}
			}).catch(() => { });
		};
		// 考场名称 唯一性查询
		const checkOnlyRoomName = (rule, val, callback) => {
			const data = {
				kd_id: this.siteId,
				kc_id: this.formRoom.kc_id,
				ks_id: this.searchExamId,
				kcmc: this.formRoom.kcmc,
				czlx: this.formRoom.czlx
			};
			$.get('/gyrcht/ksgl/kcgl/bkkcmcWyCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		// 考场编号 唯一性查询
		const checkOnlyRoomNum = (rule, val, callback) => {
			const data = {
				kd_id: this.siteId,
				kc_id: this.formRoom.kc_id,
				ks_id: this.searchExamId,
				kcbh: this.formRoom.kcbh,
				czlx: this.formRoom.czlx
			};
			$.get('/gyrcht/ksgl/kcgl/bkkcbhWyCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
					this.isSaveRoom = true;
				}
			}).catch(() => { });
		};
		return {
			labelWidth,
			// 模糊匹配列表中选中的 考试ID、考试名称
			selectExamId: '',
			selectExamName: '',
			// 上次点击查询按钮 搜索结果中的 考试ID、考试名称
			searchExamId: '',
			searchExamName: '',
			searchExamKcrs: '',
			//  维护考场人数
			formPeople: {
				kcrs: '',
				ks_id: ''
			},
			// 校验规则
			rulesExam: {
				kcrs: [{ validator: validator('2, "num", "考场人数", false') }]
			},
			dialogPeople: false, // 考场人数维护 弹窗状态
			siteId: '', // 选中行的考点ID
			// ====================> 查询
			timeout: null,
			selectValue: {
				label: 'ksmc',
				value: 'ksmc'
			},
			// 双向绑定数据
			form: {
				ksmc: '',
				ks_id: '',
				kdmc: '',
				pageNum: 1
			},
			formRight: {}, // 克隆表单（用于提交）
			// 校验规则
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", false') }],
				kdmc: [{ validator: validator('64, "normal", "考点名称", true') }]
			},
			// ====================> 考点
			loadingSite: false, // 加载中
			totalSite: 0, // 总数
			resSite: [],
			dialogSite: false, // 弹窗状态
			// 考点的保存并添加多次点击
			isSave: true,
			// 考场的保存并添加多次点击
			isSaveRoom: true,
			// 弹窗表单
			formSite: {
				kdbh: '',
				kdmc: '',
				kddz: '',
				czlx: '0',
				ks_id: '',
				kd_id: ''
			},
			// 校验规则
			rulesSite: {
				kdbh: [{ validator: validator('2, "number", "考点编号", false', checkOnlySiteNum), trigger: 'blur' }],
				kdmc: [{ validator: validator('64, "normal", "考点名称", false', checkOnlySiteName), trigger: 'blur' }],
				kddz: [{ validator: validator('64, "less", "考试地址", false') }]
			},
			// ====================> 考场
			loadingRoom: false, // 加载中
			pageNumRoom: 1, // 分页数
			totalRoom: 0, // 总数
			resRoom: [],
			ksAllrs: '',
			dialogRoom: false, // 弹窗状态
			// 弹窗表单
			formRoom: {
				ks_id: '',
				kd_id: '',
				kc_id: '',
				kcbh: '',
				kcmc: '',
				bz: '',
				czlx: '0'
			},
			// 校验规则
			rulesRoom: {
				kcbh: [{ validator: validator('2, "number", "考场编号", false', checkOnlyRoomNum), trigger: 'blur' }],
				kcmc: [{ validator: validator('64, "normal", "考场名称", false', checkOnlyRoomName), trigger: 'blur' }],
				bz: [{ validator: validator('256, "less", "备注", true') }]
			}
		};
	},
	methods: {
		// ====================> 重置弹窗公用方法
		resetFn(formName, showState) {
			setTimeout(() => {
				if (this.$refs[formName]) {
					this.$refs[formName].resetFields();
				}
			}, 5);
			this[showState] = false;
		},
		// ====================> 点击查询按钮
		handleSearch(formName) {
			if (!this.selectExamId) {
				return this.$message.warning('请选择考试名称！');
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.searchExamName = this.selectExamName;
					this.searchExamId = this.selectExamId;
					this.form.ksmc = this.searchExamName;
					this.form.ks_id = this.searchExamId;
					this.siteId = '';
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getSites();
				}
			});
		},
		// ====================> 点击重置按钮
		handleReset(formName) {
			this.$refs[formName].resetFields();
		},
		// ====================> 考试列表
		// 查询
		getNameList(query, cb) {
			// 先进行数据校验
			this.$refs.queryForm.validateField('ksmc', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ksgl/common/bkksmclbCx', {
							params: { ksmc: query }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.kslb);
							} else {
								cb([]);
							}
							cb(res.returnData.kslb);
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		},
		// 选中
		selectExam(item) {
			this.selectExamName = item.ksmc;
			this.selectExamId = item.ks_id;
		},
		// ====================> 考场人数维护
		// 查询设置的考场人数
		getPeople() {
			this.loadingSite = true;
			$.get('/gyrcht/ksgl/common/bkksxxCx', {
				params: {
					ks_id: this.searchExamId
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.formPeople.kcrs = +res.returnData.ksxq.kcrs || 0;
					this.ksAllrs = +res.returnData.ksxq.kcrs || 0;
				}
				this.loadingSite = false;
			}).catch(() => {
				this.loadingSite = false;
			});
		},
		// 保存
		savePeople(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogPeople = false;
					this.putPeople();
				}
			});
		},
		// 设置考场人数
		putPeople() {
			this.formPeople.ks_id = this.searchExamId;
			$.put('/gyrcht/ksgl/kcgl/szkcrsBc', this.formPeople).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功！');
					this.pageNumRoom = 1;
					this.getRooms();
					this.getPeople();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {
			});
		},
		// ====================> 考点相关
		// 查询
		getSites() {
			this.loadingSite = true;
			this.resRoom = []; // 每次查询考点，清空考场
			this.form.ksmc = this.searchExamName;
			$.get('/gyrcht/ksgl/kcgl/bkkdlbCx', {
				params: this.formRight
			}).then((res) => {
				this.resSite = res.returnData.kdlb;
				this.totalSite = +res.rowsCount || 0;
				this.getPeople();
				this.loadingSite = false;
			}).catch(() => {
				this.loadingSite = false;
			});
		},
		// 删除考点
		delSite(row) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loadingSite = true;
				$.delete('/gyrcht/ksgl/kcgl/kdSc', {
					params: {
						ks_id: this.searchExamId,
						kd_id: row.kd_id
					}
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('考点删除成功！');
						this.getSites();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loadingSite = false;
				}).catch(() => {
					this.loadingSite = false;
				});
			}).catch(() => { });
		},
		// 增
		addSite(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
				this.formSite.czlx = '0';
				this.formSite.kd_id = '';
			}
			if (this.formPeople.kcrs === 0) {
				this.$message.warning('请先设置考场人数！');
			} else {
				this.dialogSite = true;
			}
		},
		// 编辑考点
		setSite(row) {
			setTimeout(() => {
				Object.keys(this.formSite).forEach((item) => {
					this.formSite[item] = row[item];
				});
				this.formSite.czlx = '1';
				this.formSite.kd_id = row.kd_id;
			}, 1);
			this.dialogSite = true;
		},
		// 保存
		saveSite(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogSite = false;
					this.postSite();
				}
			});
		},
		// 考点信息保存
		postSite() {
			this.loadingSite = true;
			this.formSite.ks_id = this.searchExamId;
			$.post('/gyrcht/ksgl/kcgl/xjbjkdBc', this.formSite)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('考点信息保存成功！');
						this.form.pageNum = 1;
						this.getSites();
					} else {
						this.$message.warning(res.returnData.message);
					}
					this.isSave = false;
					this.loadingSite = false;
				}).catch(() => {
					this.loadingSite = false;
				});
		},
		// 保存并添加
		saveAndAddSite(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid && this.isSave) {
					this.postSite();
					setTimeout(() => {
						this.$refs[formName].resetFields();
						this.formSite.czlx = '0';
					}, 5);
				}
			});
		},
		// 变更考点选中行
		changeSite(currentRow) {
			if (currentRow) {
				this.siteId = currentRow.kd_id;
				this.pageNumRoom = 1;
				this.getRooms();
			}
		},
		// ====================> 考场
		// 查询该考点下的考场
		getRooms() {
			this.loadingRoom = true;
			const data = {
				ks_id: this.searchExamId,
				kd_id: this.siteId,
				pageNum: this.pageNumRoom
			};
			$.get('/gyrcht/ksgl/kcgl/bkkclbCx', {
				params: data
			}).then((res) => {
				this.resRoom = res.returnData.kclb;
				this.totalRoom = +res.rowsCount || 0;
				this.loadingRoom = false;
			}).catch(() => {
				this.loadingRoom = false;
			});
		},
		// 增
		addRoom(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
				this.formRoom.czlx = '0';
				this.formRoom.kc_id = '';
			}
			this.dialogRoom = true;
		},
		// 删: siteIndex 考点索引，roomIndex 考场索引
		delRoom(row) {
			this.$confirm('确定要删除该考场么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loadingRoom = true;
				$.delete('/gyrcht/ksgl/kcgl/kcSc', {
					params: {
						ks_id: this.searchExamId,
						kd_id: this.siteId,
						kc_id: row.kc_id
					}
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('考场删除成功！');
						this.getRooms();
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loadingRoom = false;
				}).catch(() => {
					this.loadingRoom = false;
				});
			}).catch(() => { });
		},
		// 修改考场
		setRoom(row) {
			setTimeout(() => {
				this.formRoom.kc_id = row.kc_id;
				this.formRoom.kcbh = row.kcbh;
				this.formRoom.kcmc = row.kcmc;
				this.formRoom.bz = row.bz;
				this.formRoom.czlx = '1';
			}, 5);
			this.dialogRoom = true;
		},
		// 保存
		saveRoom(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.dialogRoom = false;
					this.postRoom();
				}
			});
		},
		// 考场信息保存
		postRoom() {
			this.formRoom.ks_id = this.searchExamId;
			this.formRoom.kd_id = this.siteId;
			$.post('/gyrcht/ksgl/kcgl/xjbjkcBc', this.formRoom).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('考场信息保存成功！');
					this.pageNumRoom = 1;
					this.getRooms();
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.isSaveRoom = false;
			}).catch(() => {});
		},
		// 保存并添加
		saveAndAddRoom(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid && this.isSaveRoom) {
					this.postRoom();
					setTimeout(() => {
						this.$refs[formName].resetFields();
						this.formRoom.czlx = '0';
					}, 5);
				}
			});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style scoped>
.btn_text {
	float: left;
	margin: 3px 0 0 20px;
}
.btn_square {
	padding: 7px 8px;
}
.btn_add {
	position: absolute;
	top: 5px;
	right: 35px;
	z-index: 1;
}
.table_wrap.width_100 {
	width: 99%;
}
</style>
