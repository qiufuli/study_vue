<docs>
		## 通知公告
		* @date ###### Tue Sep 19 14:34:52 CST 2017
		* @author jinglf000
		* @desc 系统管理里对通知公告进行增删改查
</docs>
<template>
		<div>
			<div class="query_wrap">
				<!-- 查询 开始 -->
				<el-form :model="form" :rules="rules" ref="queryForm"	:label-width="labelWidth">
					<el-row>
						<el-col :span="6">
							<el-form-item label="标题" prop="bt">
								<el-input v-model="form.bt"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="类型" prop="tzgglx">
								<select-code v-model="form.tzgglx" code="gyrlzyw_qzzp_d_tzgglx "></select-code>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="内容分类" prop="nrfl">
								<select-code v-model="form.nrfl" code="gyrlzyw_qzzp_d_nrfl "></select-code>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="sffb" label="是否发布">
								<el-select v-model="form.sffb" class="width_100">
									<el-option value="" label="全部"></el-option>
									<el-option value="1" label="是"></el-option>
									<el-option value="0" label="否"></el-option>
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
						<el-col :span="12" class="align_right">
							<el-button class="btn_square" type="primary" icon="plus"
								:loading="loading"
								@click="btnAdd">新建</el-button>
						</el-col>
					</el-row>
				</el-form>
				<!-- 查询 结束 -->
			</div>
			<!--查询列表 开始 -->
			<div class="loading" v-loading="loading">
				<el-table :data="results" stripe class="table_wrap">
					<el-table-column label="标题" prop="bt"></el-table-column>
					<!-- show-overflow-tooltip -->
					<el-table-column label="内容" prop="nr" min-width="180">
						<template scope="content">
							<span v-if="content.row.nr.length > 20"
								:title="content.row.nr">{{ content.row.nr.substr(0, 20) }}...</span>
							<span v-else>{{ content.row.nr }}</span>
						</template>
					</el-table-column>
					<el-table-column label="类型" prop="tzgglxmc"></el-table-column>
					<el-table-column label="内容分类" prop="nrflmc"></el-table-column>
					<el-table-column label="是否发布" prop="sffb">
						<template scope="ele">
							<span>{{ele.row.sffb === '1' ? '是' : '否' }}</span>
						</template>
					</el-table-column>
					<el-table-column label="发布日期" prop="fbrq" width="110"></el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="ele2">
							<el-button size="mini" type="primary" title="编辑"
							@click="btnEdit(ele2.row)"  icon="edit" ></el-button>
							<el-button size="mini" type="primary" @click="btnPublish(ele2.row)"
							title="发布" icon="circle-check" :disabled="ele2.row.sffb === '1'"></el-button>
							<el-button size="mini" type="danger" @click="btnDelete(ele2.row)"
							title="删除" icon="delete"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="formRight.pageNum">
					</el-pagination>
				</div>
			</div>
			<!--查询列表 结束 -->
			<!-- 新建 编辑 dialog 开始 -->
			<el-dialog :visible.sync="dialog" title="通知公告">
				<el-form :model="formAnn" :rules="rulesAnn" :label-width="labelWidth" ref="formAnn">
					<el-form-item prop="bt" label="标题" required>
						<el-input v-model="formAnn.bt" :disabled="disabledAnn"></el-input>
					</el-form-item>
					<el-form-item prop="tzgglxs" label="类型" class="is-required">
						<checkbox-group v-model="formAnn.tzgglxs" :list="annTypeLists"
						:option="{label: 'dmmc', value: 'dmid'}" :disabled="disabledAnn"></checkbox-group>
					</el-form-item>
					<el-form-item prop="nrfl" label="内容分类">
						<select-code v-model="formAnn.nrfl" code="gyrlzyw_qzzp_d_nrfl"
							:disabled="disabledAnn" :hasAll="false"></select-code>
					</el-form-item>
					<el-form-item prop="nr" label="内容" required>
						<el-input v-model="formAnn.nr" type="textarea" :disabled="disabledAnn" :autosize="{ minRows: 2}"></el-input>
					</el-form-item>
				</el-form>
				<div class="dialog_footer" slot="footer">
					<el-button @click="dialogCancel">取消</el-button>
					<el-button type="primary" class="btn_publish" :disabled="disabledAnn"
						@click.native="dialogPublish('formAnn')">发布</el-button>
					<el-button type="primary" :disabled="disabledAnn"
						@click.native="dialogSave('formAnn')">保存</el-button>
				</div>
			</el-dialog>
			<!-- 新建 编辑 dialog 结束 -->
		</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import checkboxGroup from '@/common/vue/checkboxGroup';

export default {
	name: 'sysAnnounce',
	components: { selectCode, checkboxGroup },
	data() {
		return {
			labelWidth,
			// ====================> 查询
			annTypeLists: [],
			form: {
				bt: '',
				tzgglx: '',
				nrfl: '',
				sffb: '',
				pageNum: 1
			},
			formRight: {},
			rules: {
				bt: [{ validator: validator('48,"less","标题",true') }]
			},
			loading: false,
			results: [],
			pageTotal: 0,
			// ====================> 通知公告，新增编辑
			dialog: false,
			disabledAnn: false,
			formAnn: {
				bt: '',
				czlx: '',
				sffb: '', // 0：保存，1：发布（已发布不能编辑）
				nr: '',
				nrfl: '',
				tzgg_id: '',
				tzgglxs: []
			},
			rulesAnn: {
				bt: [{ validator: validator('48, "less", "标题", false') }],
				nr: [{ validator: validator('512, "less", "内容", false') }],
				nrfl: [{ required: true, message: '内容分类不能为空' }]
			}
		};
	},
	methods: {
		// 查询通知公告类型代码表
		getDataCodeType() {
			const codeName = 'gyrlzyw_qzzp_d_tzgglx';
			$.get('/common/dmbcx/dmb/dmbxxCx', {
				params: { dmbm: codeName }
			}).then((res) => {
				this.annTypeLists = res.returnData[codeName];
			}).catch(() => {});
		},
		// 提交查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置查询表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/tzggCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.tzgglb;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 发布内容
		btnPublish(row) {
			$.post('/gyrcht/xtgl/xtgl/tzggfbBc', {
				tzgg_id: row.tzgg_id,
				tzgglxs: row.tzgglxs
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('发布成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 删除通知公告
		btnDelete(row) {
			this.$confirm('该操作将会删除该通知公告，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData(row);
			}).catch(() => {});
		},
		// 删除通知公告 接口
		delData(row) {
			$.delete('/gyrcht/xtgl/xtgl/tzggSc', {
				params: { tzgg_id: row.tzgg_id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 新建、编辑、发布接口
		postData() {
			this.loading = true;
			$.post('/gyrcht/xtgl/xtgl/tzggBc', this.formAnn).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('操作成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 新建按钮
		btnAdd() {
			this.disabledAnn = false;
			if (this.$refs.formAnn) {
				this.$refs.formAnn.resetFields();
			}
			this.formAnn.czlx = '0';
			this.dialog = true;
		},
		// 编辑按钮
		btnEdit(row) {
			setTimeout(() => {
				if (row.sffb === '1') {
					this.disabledAnn = true;
				} else {
					this.disabledAnn = false;
				}
				Object.keys(this.formAnn).forEach((item) => {
					this.formAnn[item] = row[item];
				});
				this.formAnn.czlx = '1';
			}, 0);
			this.dialog = true;
		},
		// dialog 内容 保存，发布，取消
		dialogSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.formAnn.tzgglxs.length === 0) {
						return this.$message.warning('请选择类型');
					}
					this.formAnn.sffb = '0';
					this.postData();
					setTimeout(() => {
						this.dialog = false;
					}, 5);
				}
			});
		},
		dialogPublish(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.formAnn.tzgglxs.length === 0) {
						return this.$message.warning('请选择类型');
					}
					this.formAnn.sffb = '1';
					this.postData();
					setTimeout(() => {
						this.dialog = false;
					}, 5);
				}
			});
		},
		dialogCancel() {
			setTimeout(() => {
				this.dialog = false;
			}, 5);
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
		this.getDataCodeType();
	},
	activated() {
		this.getData();
	}
};
</script>
<style >
</style>
