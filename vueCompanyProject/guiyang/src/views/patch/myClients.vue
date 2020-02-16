<docs>
	##人才派遣---我的客户
	* @author shj
	* @date 2017-9-11
	* @desc 查询、添加/编辑、删除
</docs>
<template>
	<div>
		<!-- 查询表单 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="客户名称" prop="khmc">
							<el-input v-model="form.khmc"></el-input>
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
					<el-col :span="12">
						<el-form-item align="right">
							<el-button icon="plus" size="small" type="primary" class="btn_square"
								@click="handleAdd('formInfo')">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询表单 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="排序" align="center" prop="px" width="130"></el-table-column>
					<el-table-column label="客户名称" prop="khmc"></el-table-column>
					<el-table-column label="链接URL" prop="ljurl" align="left"></el-table-column>
					<el-table-column label="图片" align="center" prop="wdkhtpsclj" width="130">
						<template scope="pic">
							<img :src="pic.row.wdkhtpsclj + pic.row.wdkhtpfwdmc" class="picSize"/>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="130" prop="wdkh_id">
						<template scope="scope">
							<el-button title="编辑" size="mini" type="primary" icon="edit"
								@click="handleEdit(scope.row)"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="handleDel(scope.row.wdkh_id)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog弹出对话框 添加/编辑 start -->
		<el-dialog size="tiny"
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			@close="cancel('formInfo')">
			<el-form :model="formInfo" :rules="rulesDialog" :label-width="labelWidth"
				ref="formInfo">
				<el-form-item label="客户名称" prop="khmc" class="is-required">
					<el-input v-model="formInfo.khmc"></el-input>
				</el-form-item>
				<el-form-item label="链接URL" prop="ljurl" required>
					<el-input v-model="formInfo.ljurl" placeholder="例如：http://www.gyrc.cn/"></el-input>
				</el-form-item>
				<el-form-item label="排序" prop="px" class="is-required">
					<el-input v-model="formInfo.px"></el-input>
				</el-form-item>
				<el-form-item label="上传图片" prop="wdkhtpsclj">
					<el-input v-show="false" v-model="formInfo.wdkhtpsclj"></el-input>
					<upload-img
						:showPic = "false"
						modeName="rcpq"
						tipText="建议图片宽高比例为3：1"
						:maxSize="500"
						:clientName.sync="formInfo.wdkhtpkhdmc"
						:serverPath.sync="formInfo.wdkhtpsclj"
						:serverName.sync="formInfo.wdkhtpfwdmc"></upload-img>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click.native="save('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog弹出对话框 添加/编辑 end -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import uploadImg from '@/common/vue/uploadImg';
import $ from '@/common/js/axios';

export default {
	name: 'patchMyClients',
	components: { uploadImg },
	data() {
		// 排序 唯一性查询
		const checkOnlySort = (rule, val, callback) => {
			const data = {
				wdkh_id: this.formInfo.wdkh_id,
				czlx: this.formInfo.czlx,
				px: this.formInfo.px
			};
			$.get('/gyrcht/rcpq/rcpq/wdkhpxyzCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		// 客户名称 唯一性查询
		const checkOnlyName = (rule, val, callback) => {
			const data = {
				wdkh_id: this.formInfo.wdkh_id,
				czlx: this.formInfo.czlx,
				khmc: this.formInfo.khmc
			};
			$.get('/gyrcht/rcpq/rcpq/wdkhmcyzCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			// 统一的label宽度
			labelWidth,
			// 查询加载状态
			loading: false,
			// 查询表单
			form: {
				khmc: '',
				pageNum: 1
			},
			// 克隆表单 用于提交
			formRight: {},
			// 查询表单 验证规则
			rules: {
				khmc: [{ validator: validator('128, "normal", "客户名称", true') }]
			},
			// 查询结果
			results: [],
			// 查询结果 总条数
			pageTotal: 0,
			// 添加/编辑弹窗标题
			dialogTitle: '',
			// 是否可见
			dialogVisible: false,
			// 弹窗表单
			formInfo: {
				khmc: '',
				ljurl: '',
				px: '',
				wdkhtpkhdmc: '',
				wdkhtpsclj: '',
				wdkhtpfwdmc: '',
				wdkh_id: '',
				czlx: ''
			},
			// 弹窗表单 验证规则
			rulesDialog: {
				khmc: [{ validator: validator('128, "normal", "客户名称", false', checkOnlyName), trigger: 'blur' }],
				ljurl: [{ validator: validator('128, "url", "链接URL", false') }],
				px: [{ validator: validator('4, "num", "排序", false', checkOnlySort), trigger: 'blur' }],
				wdkhtpsclj: [{ required: true, message: '请上传图片' }]
			}
		};
	},
	methods: {
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
			$.get('/gyrcht/rcpq/rcpq/wdkhCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.wdkhs;
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
			this.dialogTitle = '添加我的客户';
			this.dialogVisible = true;
			this.formInfo.czlx = '0';
		},
		// 点击编辑
		handleEdit(row) {
			this.dialogTitle = '编辑我的客户';
			setTimeout(() => {
				Object.keys(this.formInfo).forEach((item) => {
					this.formInfo[item] = row[item];
				});
				this.formInfo.czlx = '1';
			}, 1);
			this.dialogVisible = true;
		},
		// 点击取消
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogVisible = false;
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
					setTimeout(() => {
						this.dialogVisible = false;
					}, 5);
				}
			});
		},
		// 执行保存(post)
		postData() {
			this.loading = true;
			$.post('/gyrcht/rcpq/rcpq/wdkhxjbjBc', this.formInfo)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
						this.getData();
					} else {
						this.$message.error(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		},
		// 点击删除
		handleDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				this.delData(id);
			}).catch(() => {
			});
		},
		// 执行删除(put)
		delData(id) {
			$.put('/gyrcht/rcpq/rcpq/wdkhscBc', {
				wdkh_id: id
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功!');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
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
	margin: 5px 0;
}
</style>
