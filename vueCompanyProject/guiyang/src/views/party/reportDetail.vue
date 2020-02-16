<docs>
	## 思想汇报详情
	## @author shj
	## @date ###### 2017年11月3日
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div v-loading="loading">
			<el-form :model="form" :rules="rules" label-width="37.5%"
				ref="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="标题" prop="bt" label-width="25%" required>
							<el-input v-model="form.bt" :disabled="!canSave"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="类型" prop="sxhblxid">
							<select-code v-model="form.sxhblxid" :disabled="!canSave"
								code="gyrlzyw_dw_d_sxhblx" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20">
						<el-form-item label="内容" prop="nr"
							class="is-required" label-width="15%">
							<vueUEditor @ready="editor" :defaultValue="form.nr"></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
							<el-form-item label="审批状态" prop="spzt">
								<!-- clearable 清空 -->
								<el-select v-model="form.spzt" :disabled="!canSave">
									<el-option label="审批通过" value="30"></el-option>
									<el-option label="审批拒绝" value="40"></el-option>
								</el-select>
							</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否显示" prop="sfxs">
							<el-switch v-model="form.sfxs"
								:on-color="colorOn" on-text="是" on-value="1"
								:off-color="colorOff" off-text="否" off-value="0"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item
							label-width="12.5%">
							<el-button type="primary" native-type="submit" :disabled="loading"
								@click.prevent="save('form')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import selectCode from '@/common/vue/selectCode';
import vueUEditor from '@/common/vue/vueUEditor';
import { Base64 } from 'js-base64';

export default {
	name: 'reportDetail',
	components: { breadCrumb, selectCode, vueUEditor },
	data() {
		return {
			colorOn,
			colorOff,
			form: {
				bt: '',
				nr: '',
				sxhblxid: '',
				spzt: '30',
				sfxs: '0',
				czlx: '0',
				sxhb_id: ''
			},
			rules: {
				bt: [{ validator: validator('160, "full", "思想汇报标题", false') }]
			},
			loading: false,
			canSave: false,
			// 富文本
			editorInstance: null
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.spzt': function (val) {
			if (val === '40') {
				this.form.sfxs = '0';
			}
		}
	},
	methods: {
		// 获取富文本clob内容，思想汇报内容
		getDataContent(id) {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/sxhbbjCx', {
				params: {
					sxhb_id: id
				}
			}).then((res) => {
				this.form.nr = res.returnData.nr;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
			if (this.canSave) {
				this.editorInstance.setEnabled();
			} else {
				this.editorInstance.setDisabled();
			}
		},
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.editorInstance.hasContents()) {
						this.postData();
					} else {
						this.$message.warning('内容不能为空');
					}
				}
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			const postData = Object.assign({}, this.form);
			postData.nr = Base64.encode(this.editorInstance.getContent());
			// postData.nr = this.editorInstance.getContent();
			$.post('/gyrcht/rsdldw/rsdldw/sxhbBc', postData)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功',
							showClose: true,
							onClose: () => {
								this.$router.push({ name: 'partyThoughtReport' });
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		}
	},
	created() {
		const data = this.$route.params;
		const info = data.info;
		if (!this.$route.params.isNew) {
			this.form.bt = info.bt;
			this.form.sfxs = info.sfxs;
			this.form.sxhblxid = info.sxhblxid;
			this.form.sxhb_id = info.sxhb_id;
			this.getDataContent(data.info.sxhb_id);
			this.form.czlx = '1';
		}
		this.canSave = data.canSave;
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.isNew === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style></style>
