<docs>
	## 应答机器人---问题--新增编辑
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div class="content" v-loading="loading">
			<el-form :model="form" :label-width="labelWidth" :rules="rules"
				ref="formInfo">
				<el-row>
					<el-col :span="6">
						<el-form-item label="问题名称" prop="wtmc" required>
							<el-input v-model="form.wtmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="17">
						<el-form-item label="关键词" prop="arr_gjc">
							<el-tag
								:key="tag"
								v-for="tag in form.arr_gjc"
								:closable="true"
								:close-transition="false"
								@close="handleClose(tag)">
								{{tag}}
							</el-tag>
							<el-input
								class="input-new-tag"
								v-if="inputVisible"
								v-model="inputValue"
								ref="saveTagInput"
								size="small"
								@keyup.enter.native="handleInputConfirm"
								@blur="handleInputConfirm">
							</el-input>
							<el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="父类型" prop="flxwtbh">
							<el-select class="width_100" v-model="form.flxwtbh"
								@change="changeFlx" clearable>
								<el-option class="control_list" v-for="(item, index) in flxList"
									:key="index"
									:label="item.flxmc"
									:value="item.flxwtbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="子类型" prop="zlxwtbh">
							<el-select class="width_100" v-model="form.zlxwtbh" clearable>
								<el-option class="control_list" v-for="(item, index) in zlxList"
									:key="index"
									:label="item.zlxmc"
									:value="item.zlxwtbh">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23">
						<el-form-item label="问题答案" prop="wtda">
							<vueUEditor @ready="editor" :defaultValue="form.wtda" ></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item>
							<el-button type="primary" @click="save('formInfo')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import vueUEditor from '@/common/vue/vueUEditor';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';
import { Base64 } from 'js-base64';

export default {
	name: 'questionDetail',
	components: { breadCrumb, vueUEditor },
	data() {
		return {
			labelWidth,
			loading: false,
			// 判断select组件触发change事件的标志
			changeFlxFlag: false,
			// 双向绑定数据
			form: {
				wt_id: '',
				wtmc: '',
				wtjb: '03',
				arr_gjc: [],
				wtda: '',
				czlx: '',
				pageNum: 1,
				flxwtbh: '',
				zlxwtbh: ''
			},
			// 关键词相关
			inputVisible: false,
			inputValue: '',
			rules: {
				wtmc: [{ validator: validator('50, "normal", "问题名称", false') }],
				arr_gjc: [{ required: true, message: '关键词不能为空' }],
				flxwtbh: [{ required: true, message: '父类型名称不能为空' }],
				zlxwtbh: [{ required: true, message: '子类型名称不能为空' }]
				// wtda: [{ required: true, message: '问题答案不能为空' }]
			},
			// 富文本
			editorInstance: null,
			flxList: [],
			zlxList: [],
			selectFlxbh: '',
			selectZlxbh: ''
		};
	},
	methods: {
		// 编辑 问题 信息查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/jqrwh/jqr/wtCx_byid', {
				params: {
					wt_id: this.$route.params.wt_id
				}
			}).then((res) => {
				const { wt } = res.returnData;
				Object.keys(this.form).forEach((item) => {
					if (item !==	'czlx' && item !== 'wtjb' && item !== 'pageNum') {
						this.form[item] = wt[item];
					}
				});
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 选择关键词
		changeGjc(val) {
			this.form.arr_gjc = val;
		},
		// 父子类型
		// 获取 父类型 下拉列表
		getFlxList() {
			$.get('/gyrcht/jqrwh/jqr/wtFlxCx', {}).then((res) => {
				this.flxList = res.returnData.flxlb;
			}).catch(() => {});
		},
		// 获取 子类型 下拉列表
		getZlxList() {
			$.get('/gyrcht/jqrwh/jqr/wtZlxCx', {
				params: { flxwtbh: this.selectFlxbh }
			}).then((res) => {
				this.zlxList = res.returnData.zlxlb;
			}).catch(() => {});
		},
		// 父类型 change 事件
		changeFlx(val) {
			this.selectFlxbh = val;
			this.zlxList = [];
			if (this.changeFlxFlag) {
				this.form.zlxwtbh = '';
			} else {
				this.changeFlxFlag = true;
			}
			if (val) {
				this.getZlxList();
			}
		},
		// 提交表单信息
		postData() {
			this.loading = true;
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			const postData = Object.assign({}, this.form);
			postData.wtda = Base64.encode(this.editorInstance.getContent());
			$.put('/gyrcht/jqrwh/jqr/wtBc', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '保存成功',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: 'questionManage' });
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
				}
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		},
		// 关键词相关
		handleClose(tag) {
			this.form.arr_gjc.splice(this.form.arr_gjc.indexOf(tag), 1);
		},
		showInput() {
			this.inputVisible = true;
			this.$nextTick(() => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		handleInputConfirm() {
			const inputValue = this.inputValue;
			if (inputValue) {
				(this.form.arr_gjc || []).push(inputValue);
			}
			this.inputVisible = false;
			this.inputValue = '';
		}
	},
	computed: {
		// 判断新建还是编辑
		isNew() {
			return this.$route.params.isNew;
		}
	},
	watch: {
		/* eslint-disable func-names */
	},
	created() {
		this.getFlxList();
		if (!this.isNew) {
			this.getData();
		}
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.wt_id === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style>
.el-tag {
	margin-right: 5px;
}
</style>
