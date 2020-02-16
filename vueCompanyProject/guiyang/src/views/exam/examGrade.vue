<docs>
	##考试管理---考试管理--成绩管理
	* @author LLP
	* @date 2017年12月04日
	* @desc 查询/发布 下载 查看日志
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" :rules="rules"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="考试名称" prop="ksmc" required>
							<el-autocomplete v-model="form.ksmc"
								:fetch-suggestions="getKsmcList"
								@select="selectExam"
								:props="ksmcProp"
								class="width_100"></el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="单位名称" prop="dwmc">
							<el-select class="width_100" v-model="form.dwyh_id"
								@change="changeDwmc" clearable>
								<el-option class="control_list" v-for="(item, index) in dwmcList"
									:key="index"
									:label="item.dwmc"
									:value="item.dwyh_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职位名称" prop="zwmc">
							<el-select class="width_100" v-model="form.zw_id" @change="changeZwmc" clearable>
								<el-option class="control_list" v-for="(item, index) in zwmcList"
									:key="index"
									:label="item.zwmc"
									:value="item.zw_id">
								</el-option>
							</el-select>
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
						<!-- <a href="static/files/grhjdrmb.xlsx" target="_blank">
							<el-button icon="btn-download" size="small" type="primary" class="btn_square margin_l_10">下载模板</el-button>
						</a> -->
						<el-button class="btn_square" size="small" type="primary" icon="btn-download"
							@click="downloadTempate" :loading="loading" :disabled="!form.ks_id">下载模板</el-button>
						<el-upload class="inline_block margin_l_10"
							action="/gyrcht/ksgl/cjgl/kscjdrBc"
							:data="upData"
							:show-file-list="false"
							:before-upload="beforeUpload"
							:on-success="uploadSuccess">
							<el-button class="btn_square" icon="upload" size="small" type="primary" :disabled="!form.ks_id">导入成绩</el-button>
						</el-upload>
						<el-button class="btn_square margin_l_10" size="small" type="primary" icon="search"
							@click="checkLog" :loading="loading" :disabled="!form.ks_id">查看导入日志</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column type="expand">
						<template scope="subjects">
							<ul>
								<li>
									<el-row class="align_left">
										<el-col :span="8">
											科目1：{{ subjects.row.kmmc1 }}
										</el-col>
										<el-col :span="8">
											成绩：{{ subjects.row.kmcj1 }}
										</el-col>
									</el-row>
								</li>
								<li>
									<el-row class="align_left">
										<el-col :span="8">
											科目2：{{ subjects.row.kmmc2 }}
										</el-col>
										<el-col :span="8">
											成绩：{{ subjects.row.kmcj2 }}
										</el-col>
									</el-row>
								</li>
							</ul>
						</template>
					</el-table-column>
					<el-table-column label="报名序号" prop="bmxh" width="150"></el-table-column>
					<el-table-column label="考试名称" prop="ksmc"></el-table-column>
					<el-table-column label="考生姓名" prop="xm" width="100"></el-table-column>
					<el-table-column label="身份证号" prop="sfzhm"></el-table-column>
					<el-table-column label="准考证号" prop="zkzh"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column label="职位名称" prop="zwmc"></el-table-column>
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
		<!-- 查看日志 dialog start-->
		<el-dialog title="录入日志" :visible.sync="dialogLogs" size="tiny">
			<ul class="log_wrap">
				<li>考试名称：{{drrz.ksmc}}</li>
				<li>导入时间：{{drrz.drsj}}</li>
				<li>报名人数：{{drrz.bmrs}}</li>
				<li>导入人数：{{drrz.drrs}}</li>
			</ul>
			<div style="margin-bottom: 20px;"></div>
			<div class="align_center">
				<el-button type="primary" icon="btn-download" @click="downloadWdqd">下载未导清单</el-button>
			</div>
		</el-dialog>
		<!-- 查看日志 dialog end-->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'examGrade',
	data() {
		return {
			labelWidth,
			// ====================>查询
			// 加载状态
			loading: false,
			// 单位列表
			dwmcList: [],
			// 模糊匹配列表中选中的 考试ID、考试名称
			selectKsId: '',
			selectKsmc: '',
			// 上次点击查询按钮 搜索结果中的 考试ID、考试名称
			searchKsId: '',
			searchKsmc: '',
			// 职位名称列表
			zwmcList: [],
			// 双向绑定数据
			form: {
				ks_id: '',
				ksmc: '',
				dwyh_id: '',
				zw_id: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", false') }]
			},
			ksmcProp: {
				value: 'ksmc',
				label: 'ksmc'
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 2,
			// ====================> 导入日志窗口状态
			dialogLogs: false,
			// 导入日志
			drrz: {
				ksmc: '',
				drsj: '',
				bmrs: '',
				drrs: ''
			}
		};
	},
	methods: {
		// ====================> 查询
		// 查询按钮
		submitForm(formName) {
			if (!this.selectKsId) {
				return this.$message.warning('请选中考试名称！');
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.searchKsId = this.selectKsId;
					this.searchKsmc = this.selectKsmc;
					this.form.ksmc = this.searchKsmc;
					this.form.ks_id = this.searchKsId;
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.form.ks_id = '';
			this.form.dwyh_id = '';
			this.form.zw_id = '';
			this.dwmcList = [];
			this.zwmcList = [];
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/cjgl/kscjlbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.kscjxxs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 考试名称输入建议,query 参数，cb回调函数（表明获取建议列表成功）
		getKsmcList(query, cb) {
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
						}).catch(() => {});
					}, 200);
				} else {
					cb([]);
				}
			});
		},
		// 点击选中考试名称项
		selectExam(item) {
			this.selectKsmc = item.ksmc;
			this.selectKsId = item.ks_id;
			this.form.dwyh_id = '';
			this.form.zw_id = '';
			this.dwmcList = [];
			this.zwmcList = [];
			this.getDwmcList();
		},
		// 获取单位名称列表
		getDwmcList() {
			$.get('/gyrcht/ksgl/common/bkdwmclbCx', {
				params: { ks_id: this.selectKsId }
			}).then((res) => {
				this.dwmcList = res.returnData.dwlb;
			}).catch(() => {});
		},
		// 点击选中单位名称
		changeDwmc(val) {
			this.selectDwyhId = val;
			this.zwmcList = [];
			this.form.zw_id = '';
			if (val) {
				this.getZwmcList();
			}
		},
		// 获取职位名称列表
		getZwmcList() {
			$.get('/gyrcht/ksgl/common/bkzwmclbCx', {
				params: { ks_id: this.selectKsId, dwyh_id: this.form.dwyh_id }
			}).then((res) => {
				this.zwmcList = res.returnData.zwlb;
			}).catch(() => {});
		},
		// 点击选中职位名称
		changeZwmc(val) {
			this.selectZwId = val;
		},
		// 查看导入日志
		checkLog() {
			if (!this.selectKsId) {
				return this.$message.warning('请选中考试名称！');
			}
			this.dialogLogs = true;
			$.get('/gyrcht/ksgl/cjgl/drrzCx', {
				params: { ks_id: this.selectKsId }
			}).then((res) => {
				this.drrz = res.returnData.drrzxx;
			}).catch(() => {});
		},
		// 下载模板
		downloadTempate() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/ksgl/cjgl/cjdrmbCx?${urlQuery.join('&')}`;
			window.open(url);
		},
		// * 限制上传文件格式和大小
		beforeUpload(file) {
			const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				|| file.type === 'application/vnd.ms-excel';
			const isLt1M = file.size / 1024 / 1024 < 1;
			if (!isExcel) {
				this.$message.error('请下载并使用模板!');
			} else if (!isLt1M) {
				this.$message.error('上传文件应小于1MB');
			}
			return isExcel;
		},
		// * 上传成功回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				this.$message.success('导入成功');
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		},
		// 下载未导清单
		downloadWdqd() {
			const urlQuery = [];
			Object.keys(this.formRight).forEach((item) => {
				urlQuery.push(`${item}=${this.formRight[item]}`);
			});
			const url = `/gyrcht/ksgl/cjgl/wdqddcCx?${urlQuery.join('&')}`;
			window.open(url);
		}
	},
	computed: {
		upData() {
			return {
				// file: '',
				ks_id: this.searchKsId
			};
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	}
};
</script>

<style></style>
