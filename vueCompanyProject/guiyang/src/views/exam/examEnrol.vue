<docs>
	##考试管理---考试管理--报名管理
	* @author LLP
	* @date 2017年12月04日
	* @desc 查询/添加 导出 删除
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="form">
				<el-row>
					<el-col :span="6">
						<el-form-item label="考试名称" prop="ksmc" required>
							<el-autocomplete v-model="form.ksmc"
							:fetch-suggestions="getExamNameList" :props="selectValue"
							@select="selectExam" class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwyh_id">
							<el-select v-model="form.dwyh_id" class="width_100" no-data-text="无数据" @change="changeCo" clearable>
								<el-option class="control_list" v-for="(item, index) in resCos" :key="index" :label="item.dwmc" :value="item.dwyh_id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职位名称" prop="zw_id">
							<el-select v-model="form.zw_id" class="width_100" no-data-text="无数据" clearable>
								<el-option class="control_list" v-for="(item, index) in resJobs" :key="index" :label="item.zwmc" :value="item.zw_id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
          <el-col :span="6">
						<el-form-item label="报名序号" prop="bmxh">
							<el-input type="text" v-model="form.bmxh"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :span="6" >
            <el-form-item label="姓名" prop="xm">
							<el-autocomplete v-model="form.xm"
							:fetch-suggestions="getNameList" :props="xmValue" class="width_100"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="身份证号" prop="sfzhm">
              <el-input type="text" v-model="form.sfzhm"
								@blur="form.sfzhm = form.sfzhm.toUpperCase()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="报名时间" class="width_100">
              <date-ass
								:begin.sync="form.bmkssj" :end.sync="form.bmjssj"
								propBegin="bmkssj" propEnd="bmjssj"></date-ass>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" v-if="this.ksxx.sfjf==='1'">
            <el-form-item label="缴费状态" prop="jfzt">
							<select-code v-model="form.jfzt" code="gyrlzyw_bkxt_d_bkjfzt"></select-code>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="this.ksxx.sfjf==='1'">
						<el-form-item label="是否退款" prop="sftk">
							<el-select v-model="form.sftk" class="width_100" clearable>
								<el-option label="全部" value=""></el-option>
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="审核状态" prop="spzt">
							<select-code v-model="form.spzt" code="gyrlzyw_bkxt_d_bkspzt"></select-code>
            </el-form-item>
          </el-col>
        </el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('form')">查询</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>
            <el-col :span="12" class="btns_right">
						<el-button :disabled="results.length === 0"
							class="btn_square" size="small" type="primary" icon="btn-download"
							@click="exportDoc()" :loading="loading">导出</el-button>
						<el-button :disabled="!form.ks_id"
							class="btn_square" size="small" type="primary" icon="plus"
							@click="addPeoples()" :loading="loading">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap" @cell-click="handleEdit">
					<el-table-column width="40" type="expand">
						<template scope="expendInfo">
							<el-row class="align_left">
								<el-col :span="8">考试名称：{{expendInfo.row.ksmc}}</el-col>
								<el-col :span="8">单位名称：{{expendInfo.row.dwmc}}</el-col>
								<el-col :span="8">职位名称：{{expendInfo.row.zwmc}}</el-col>
							</el-row>
							<el-row class="align_left">
								<el-col :span="8">出生日期：{{expendInfo.row.csrq}}</el-col>
								<el-col :span="8" v-if="expendInfo.row.sfjf==='1'">支付时间：{{expendInfo.row.jfrq}}</el-col>
								<el-col :span="8" v-if="expendInfo.row.sfjf==='1'">缴费金额：{{expendInfo.row.jfje}}</el-col>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column label="报名序号" prop="bmxh"
						class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="sex">
							<span v-if="sex.row.xb === '1'">男</span>
							<span v-else-if="sex.row.xb === '2'">女</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证号" prop="sfzhm" min-width="150"></el-table-column>
					<el-table-column label="报名时间" prop="bmsj"></el-table-column>
					<el-table-column label="审核状态" prop="spztz"></el-table-column>
					<el-table-column label="缴费状态" prop="jfztz" v-if="this.ksxx.sfjf==='1'"></el-table-column>
					<el-table-column v-if="this.ksxx.sfjf==='1'" label="是否退款" prop="sftk">
						<template scope="stateSftk">
							<el-switch v-model="stateSftk.row.sftk"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"
								@change="switchState(stateSftk.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="90">
						<template scope="operate">
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(operate.row.bk_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:current-page.sync="formRight.pageNum"
					:total="pageTotal"
					@current-change="getData">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';

export default {
	name: 'examEnrol',
	components: {
		dateAss,
		selectCode
	},
	data() {
		return {
			labelWidth,
			color: {
				colorOn,
				colorOff
			},
			// ====================> 查询
			timeout: null,
			selectValue: {
				label: 'ksmc',
				value: 'ksmc'
			},
			xmValue: {
				label: 'xm',
				value: 'xm'
			},
			// 模糊匹配列表中选中的 考试ID、考试名称
			selectExamId: '',
			selectExamName: '',
			// 上次点击查询按钮 搜索结果中的 考试ID、考试名称
			searchExamId: '',
			searchExamName: '',
			resCos: [], // 单位列表
			resJobs: [], // 职位列表
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				ksmc: '',
				ks_id: '',
				dwyh_id: '',
				zw_id: '',
				bmxh: '',
				xm: '',
				sfzhm: '',
				bmsjks: '',
				bmsjjs: '',
				jfzt: '',
				sftk: '',
				spzt: '',
				sfjf: '',
				sffp: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", false') }],
				bmxh: [{ validator: validator('8, "full", "报名序号", true') }],
				xm: [{ validator: validator('32, "normal", "姓名", true') }],
				sfzhm: [{ validator: validator('18, "full", "身份证号", true') }],
				bmsjks: [{ validator: validator('14, "full", "报名时间开始", true') }],
				bmsjjs: [{ validator: validator('14, "full", "报名时间结束", true') }],
				jfzt: [{ validator: validator('2, "full", "缴费状态", true') }],
				sftk: [{ validator: validator('1, "full", "是否退款", true') }],
				spzt: [{ validator: validator('8, "full", "审核状态", true') }]
			},
			results: [], // 考生列表
			pageTotal: 0, // 总数
			ksxx: {    // 考试详细信息
				sfjf: ''
			}
		};
	},
	methods: {
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.form.ks_id = '';
			this.form.dwyh_id = '';
			this.form.zw_id = '';
			this.resCos = [];
			this.resJobs = [];
		},
		// ====================> 查询
		// 考试列表查询
		getExamNameList(query, cb) {
			// 先进行数据校验
			this.$refs.form.validateField('ksmc', (errorMsg) => {
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
							params: {
								ksmc: query,
								czlx: '1'
							}
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.kslb);
							} else {
								cb([]);
							}
							// cb(res.returnData.kslb);
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		},
		// 姓名列表模糊查询
		getNameList(query, cb) {
			// 先进行数据校验
			this.$refs.form.validateField('xm', (errorMsg) => {
				// 数据为空不进行联想
				if (query === '') {
					return cb([]);
				}
				// 验证成功之后进行联想
				if (!errorMsg) {
					// 延迟 200ms 提交接口
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/ksgl/bmgl/bmkslbCx', {
							params: { xm: query, ks_id: this.selectExamId }
						}).then((res) => {
							if (res.returnData.executeResult === '1') {
								cb(res.returnData.bmksxxlb);
							} else {
								cb([]);
							}
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		},
		// 考试列表选中
		selectExam(item) {
			this.selectExamId = item.ks_id;
			this.selectExamName = item.ksmc;
			this.form.dwyh_id = '';
			this.form.zw_id = '';
			this.form.xm = '';
			this.resCos = [];
			this.resJobs = [];
			this.getCos();
		},
		// 单位列表查询
		getCos() {
			$.get('/gyrcht/ksgl/common/bkdwmclbCx', {
				params: {
					ks_id: this.selectExamId
				}
			}).then((res) => {
				this.resCos = res.returnData.dwlb;
			}).catch(() => {});
		},
		// 职位列表查询
		getJobs() {
			$.get('/gyrcht/ksgl/common/bkzwmclbCx', {
				params: {
					ks_id: this.selectExamId,
					dwyh_id: this.form.dwyh_id
				}
			}).then((res) => {
				this.resJobs = res.returnData.zwlb;
			}).catch(() => {});
		},
		// 单位列表改变
		changeCo(val) {
			if (val) {
				this.form.zw_id = '';
				this.resJobs = [];
				this.getJobs();
			}
		},
		// 查询按钮
		submitForm(formName) {
			if (!this.selectExamId) {
				return this.$message.warning('请选中考试名称！');
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.searchExamId = this.selectExamId;
					this.searchExamName = this.selectExamName;
					this.form.ks_id = this.searchExamId;
					this.form.ksmc = this.searchExamName;
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
					this.getKsxx();
				}
			});
		},
		// 考生查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/bmgl/bmkslbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.bmksxxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 考试详细信息查询
		getKsxx() {
			$.get('/gyrcht/ksgl/common/bkksxxCx', {
				params: {
					ks_id: this.formRight.ks_id
				}
			}).then((res) => {
				this.ksxx = res.returnData.ksxq;
			}).catch(() => {});
		},
		// 是否发起退款
		switchState(row) {
			const data = {
				bk_id: row.bk_id,
				sftk: row.sftk,
				sfjf: row.sfjf,
				sffp: row.sffp
			};
			this.$nextTick(() => {
				$.put('/gyrcht/ksgl/bmgl/bmkstkBc', data).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '状态变更成功',
							showClose: true
						});
						this.getData();
					} else {
						this.$message.error(res.returnData.message);
						row.sftk = row.sftk === '1' ? '0' : '1';
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// ====================> 增-点击添加按钮
		addPeoples() {
			$.get('/gyrcht/ksgl/bmgl/check_bm', {
				params: { ks_id: this.formRight.ks_id }
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					this.$message.warning(res.returnData.message);
				} else if (res.returnData.executeResult === '1') {
					this.$router.push({
						name: 'examEnrolDetail',
						params: {
							ks_id: this.formRight.ks_id,
							ksmc: this.formRight.ksmc,
							bk_id: '',
							ksxx: this.ksxx
						}
					});
				}
			}).catch(() => {});
		},
		// ====================> 删
		handleDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delPeople(id);
			}).catch(() => {});
		},
		delPeople(id) {
			this.loading = true;
			$.delete('/gyrcht/ksgl/bmgl/bmksSc', {
				params: {
					bk_id: id
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
		},
		// ====================> 改-点击报名序号
		handleEdit(row, column) {
			if (column.property === 'bmxh') {
				this.$router.push({
					name: 'examEnrolDetail',
					params: {
						ks_id: this.formRight.ks_id,
						ksmc: this.formRight.ksmc,
						bk_id: row.bk_id,
						dwyh_id: row.dwyh_id,
						ksxx: this.ksxx
					}
				});
			}
		},
		// ====================> 导出
		exportDoc() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/ksgl/bmgl/bmksxxdcCx?${urlQuery.join('&')}`;
			window.open(url);
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 页面重新激活
	activated() {
		if (this.form.ks_id) {
			this.getData();
		}
	}
};
</script>

<style></style>
