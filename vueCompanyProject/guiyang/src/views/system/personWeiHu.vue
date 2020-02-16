<docs>
	##系统管理---人才数据维护
	* @author SHJ
	* @date 2017年9月15日
	* @desc 编辑/保存
</docs>
<template>
	<div class="detail_wrap">
		<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
			<el-row>
				<el-col :span="18">
					<el-form-item label="维护内容" prop="nr" required>
						<el-input type="textarea" v-model="form.nr" :autosize="{ minRows: 4 }"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-form-item>
					<el-button type="primary" :loading="loading"
						@click.native="save('form')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';

export default {
	name: 'sysPersonWeiHu',
	data() {
		return {
			labelWidth,
			loading: false,
			form: {
				nr: ''
			},
			rules: {
				nr: [{ validator: validator('512, "full", "维护内容", false') }]
			}
		};
	},
	methods: {
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
				}
			});
		},
		getData() {
			this.loading = true;
			$.get('/gyrcht/xtgl/xtgl/rcsjCx').then((res) => {
				this.form.nr = res.returnData.nr;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			$.post('/gyrcht/xtgl/xtgl/rcsjBc', this.form)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('保存成功');
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
		}
	},
	activated() {
		this.getData();
	}
};
</script>
<style>

</style>
