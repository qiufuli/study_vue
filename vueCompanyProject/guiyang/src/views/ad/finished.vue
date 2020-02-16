<docs>
	## 广告管理---广告管理(已发布广告)
	* @author SHJ
	* @date 2017年8月24日
	* @desc 查询
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="广告类型" prop="gglx">
							<select-code v-model="form.gglx"
								code="gyrlzyw_qzzp_d_gglx"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="广告名称" prop="ggmc">
							<el-input v-model="form.ggmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结束时间">
							<date-ass :begin.sync="form.jssjq" :end.sync="form.jssjz"
								propBegin="jssjq" propEnd="jssjz"></date-ass>
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
					<el-col :span="12" align="right">
						<el-button size="small" type="primary" icon="plus" :loading="loading"
							@click="handleAdd('formInfo')" class="btn_square">添加</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="广告名称" prop="ggmc"></el-table-column>
					<el-table-column label="广告类型" prop="gglxmc"></el-table-column>
					<el-table-column label="排序" prop="px"></el-table-column>
					<el-table-column label="图片" prop="ggtpsclj">
						<template scope="pic">
							<img :src="pic.row.ggtpsclj + pic.row.ggtpfwdmc" class="picSize"/>
						</template>
					</el-table-column>
					<el-table-column label="开始时间" prop="kssj" width="110"></el-table-column>
					<el-table-column label="结束时间" prop="jssj" width="110"></el-table-column>
					<el-table-column label="操作" prop="gg_id" width="130">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row)"></el-button>
						</template>
					</el-table-column>
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
		<!-- 查询结果 end -->
		<!-- dialog 弹出对话框 添加/编辑 start-->
		<el-dialog size="tiny" title="广告信息" :visible.sync="dialogInfo"
			@close="cancel('formInfo')">
			<el-form :model="formInfo" ref="formInfo" :rules="rulesInfo" :label-width="labelWidth">
				<el-form-item v-show="formInfo.ddbh" label="订单号" prop="ddbh">
					<el-input v-model="formInfo.ddbh" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="px" required>
					<el-input v-model="formInfo.px" :disabled="formInfo.gglx === '20'"></el-input>
				</el-form-item>
				<el-form-item label="广告类型" prop="gglx">
					<el-select v-model="formInfo.gglx" class="width_100" :disabled="!isNew">
						<el-option value="10" label="BANNER图标"></el-option>
						<el-option v-show="!isNew" value="20" label="名企图标"></el-option>
						<el-option value="30" label="首页置顶"></el-option>
						<el-option value="40" label="报考推荐"></el-option>
						<el-option v-show="!isNew" value="50" label="BANNER图标（APP）"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="广告内容类型" prop="ggnrlx" class="mulitfix">
					<el-select v-if="formInfo.gglx === ''"
						v-model="formInfo.ggnrlx" class="width_100"></el-select>
					<el-select v-else v-model="formInfo.ggnrlx" class="width_100" :disabled="!!formInfo.ddbh">
						<el-option value="10" label="订单"
							v-show="formInfo.ddbh"></el-option>
						<el-option value="20" label="新闻"
							v-show="formInfo.gglx === '10'||formInfo.gglx === '30'||formInfo.gglx === '40'"></el-option>
						<el-option value="30" label="外部链接"
							v-show="formInfo.gglx === '10'||formInfo.gglx === '30'"></el-option>
						<el-option value="40" label="报考"
							v-show="formInfo.gglx === '30'||formInfo.gglx === '40'"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="formInfo.gglx !== '10' || (formInfo.gglx === '10' && !formInfo.ddbh)"
					label="链接标识" prop="ljbs"
					:class="formInfo.gglx === '20' || formInfo.gglx === '50' ? '' : 'is-required'">
					<el-input v-model="formInfo.ljbs" :placeholder="linkName"></el-input>
				</el-form-item>
				<el-form-item label="广告名称" prop="ggmc" class="is-required">
					<el-input v-model="formInfo.ggmc"></el-input>
				</el-form-item>
				<el-form-item label="广告时间" class="is-required">
					<el-date-picker v-model="timeRange" type="datetimerange" class="width_100"
						@change="changeTimeRange"></el-date-picker>
				</el-form-item>
				<el-form-item label="广告图片" prop="ggtpsclj" v-show="formInfo.gglx">
					<el-input v-show="false" v-model="formInfo.ggtpsclj"></el-input>
					<upload-img
						:canView="false"
						:modeName="modeName"
						:tipText="adviseText"
						:maxSize="maxSize"
						:clientName.sync="formInfo.ggtpkhdmc"
						:serverPath.sync="formInfo.ggtpsclj"
						:serverName.sync="formInfo.ggtpfwdmc"></upload-img>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click="save('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框 添加/编辑 end-->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import uploadImg from '@/common/vue/uploadImg';
import $ from '@/common/js/axios';

export default {
	name: 'adFinished',
	components: {
		selectCode,
		dateAss,
		uploadImg
	},
	data() {
		// 广告名称唯一性验证
		// const checkOnlyAdName = (rule, val, callback) => {
		// 	const data = {
		// 		ggmc: this.formInfo.ggmc,
		// 		gg_id: this.formInfo.gg_id,
		// 		lx: this.formInfo.czlx
		// 	};
		// 	$.get('/gyrcht/gggl/gggl/ggmcCx', {
		// 		params: data
		// 	}).then((res) => {
		// 		if (res.returnData.executeResult === '0') {
		// 			callback(new Error(res.returnData.message));
		// 		} else {
		// 			callback();
		// 		}
		// 	}).catch(() => { });
		// };
		return {
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				ggmc: '',
				gglx: '',
				jssjq: '',
				jssjz: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 验证规则
			rules: {
				ggmc: [{ validator: validator('48, " normal ", "广告名称", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 广告信息
			// 弹窗状态
			dialogInfo: false,
			// 是否新增
			isNew: '',
			// 服务器文件夹名
			modeName: '',
			// 图片最大尺寸
			maxSize: 0,
			// 待提交表单
			formInfo: {
				gglx: '',
				px: '',
				ggmc: '',
				kssj: '',
				jssj: '',
				ggtpsclj: '',
				ggtpkhdmc: '',
				ggtpfwdmc: '',
				ljbs: '',
				ggnrlx: '',
				gg_id: '',
				ddbh: '',
				czlx: ''
			},
			formOnly: {
				gg_id: '',
				ljbs: '',
				lx: '',
				gglx: ''
			},
			// 校验规则
			rulesInfo: {
				px: [{ validator: validator('4, "num", "排序", false') }],
				ggmc: [{ validator: validator('48, "full", "广告名称", false') }],
				gglx: [{ required: true, message: '广告类型不能为空' }],
				ggnrlx: [{ required: true, message: '广告内容类型不能为空' }],
				ljbs: [{ validator: validator('128, "url", "链接标识", true', this.checkNewsCode), trigger: 'blur' }],
				ggtpsclj: [{ required: true, message: '请上传图片！' }]
			},
			// 链接标识输入提示
			linkName: '',
			// 图片上传建议
			adviseText: '',
			timeRange: []
		};
	},
	watch: {
		/* eslint-disable indent */
		/* eslint-disable func-names */
		// 广告类型改变, 清空内容类型
		'formInfo.gglx': function (val) {
			if (this.isNew) {
				this.formInfo.ggnrlx = '';
			}
			if (val === '10' || val === '30') {
				this.modeName = 'guanggao150';
				this.maxSize = 100;
				this.adviseText = val === '10' ? '建议图片宽度至少1200px，高度固定400px' : '';
			} else if (val === '20' || val === '40') {
				this.modeName = 'guanggao50';
				this.maxSize = 20;
				this.adviseText = '建议图片宽高比例为3：1';
			} else if (val === '50') {
				this.modeName = 'guanggao150';
				this.maxSize = 100;
				this.adviseText = '建议宽高1080*678px';
			}
		},
		// 内容类型改变, 改变链接标识输入提示 与 校验规则
		'formInfo.ggnrlx': function (val) {
			switch (val) {
				case '20':
					this.formOnly.ggnrlx = val;
					this.linkName = '请输入: 新闻识别码';
					this.rulesInfo.ljbs = [{ validator: validator('8, "number", "链接标识", false', this.checkNewsCode),
						trigger: 'blur' }];
					break;
				case '40':
					this.linkName = '请输入: 考试名称';
					this.rulesInfo.ljbs = [{ validator: validator('128, "full", "链接标识", false'),
						trigger: 'blur' }];
					break;
				default:
					this.linkName = '例如：http://www.gyrc.cn/';
					if (this.formInfo.gglx === '20' || this.formInfo.gglx === '50') {
						this.rulesInfo.ljbs = [{ validator: validator('128, "url", "链接标识", true', this.checkNewsCode),
						trigger: 'blur' }];
					} else {
						this.rulesInfo.ljbs = [{ validator: validator('128, "url", "链接标识", false', this.checkNewsCode),
						trigger: 'blur' }];
					}
					break;
			}
		}
	},
	methods: {
		// 链接标识 为 新闻识别码时校验唯一性
		checkNewsCode(rule, val, callback) {
			this.formOnly.gg_id = this.formInfo.gg_id;
			this.formOnly.ljbs = this.formInfo.ljbs;
			this.formOnly.lx = this.formInfo.czlx;
			this.formOnly.gglx = this.formInfo.gglx;
			// const data = {
			// 	gg_id: this.formInfo.gg_id,
			// 	ljbs: this.formInfo.ljbs,
			// 	lx: this.formInfo.czlx,
			// 	gglx: this.formInfo.gglx
			// };
			$.get('/gyrcht/gggl/gggl/ljbswyxCx', {
				params: this.formOnly
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		},
		// 点击查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/gggl/gggl/gglbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.gglb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击添加
		handleAdd(formName) {
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			this.formInfo.czlx = '0';
			this.formInfo.gg_id = '';
			this.formInfo.ljbs = '';
			this.dialogInfo = true;
			this.isNew = true;
		},
		// 点击编辑
		handleEdit(row) {
			// 延迟赋值，保证重置表单功能的实现
			setTimeout(() => {
				Object.keys(this.formInfo).forEach((item) => {
					this.formInfo[item] = row[item];
				});
				this.formInfo.czlx = '1';
				this.timeRange = [new Date(this.formInfo.kssj), new Date(this.formInfo.jssj)];
			}, 1);
			this.dialogInfo = true;
			this.isNew = false;
		},
		// 点击取消/关闭
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
				this.timeRange = [];
			}, 5);
			this.dialogInfo = false;
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.timeRange && this.timeRange[0]) {
						this.postData();
						setTimeout(() => {
							this.dialogInfo = false;
						}, 5);
					} else {
						this.$message.warning('请选择广告时间');
					}
				}
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			$.post('/gyrcht/gggl/gggl/ggBc', this.formInfo)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
						this.getData();
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		},
		// 点击删除
		handleDel(row) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.askDel(row);
			}).catch(() => {
			});
		},
		askDel(row) {
			$.get('/gyrcht/gggl/gggl/ggscCx', {
				params: {
					gg_id: row.gg_id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.delData(row);
				} else {
					this.$confirm(res.returnData.message, '提示', {
						type: 'warning'
					}).then(() => {
						this.delData(row);
					}).catch(() => {
					});
				}
			}).catch(() => {
			});
		},
		delData(row) {
			$.delete('/gyrcht/gggl/gggl/ggxxSc', {
				params: {
					gg_id: row.gg_id,
					px: row.px,
					gglx: row.gglx
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
		// 广告时间改变
		changeTimeRange(val) {
			if (val) {
				const range = val.split(' - ');
				this.formInfo.kssj = range[0];
				this.formInfo.jssj = range[1];
			}
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>
<style scoped>
.picSize {
	width: 100px;
	height: 35px;
}
.prompt_msg {
	color: #818a96;
}
</style>
