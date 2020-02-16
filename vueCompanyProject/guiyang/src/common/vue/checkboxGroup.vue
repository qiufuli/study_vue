<docs>
		## 含有全选复选框的checkbox-group
		* date ###### Sat Sep 9 16:37:30 CST 2017
		* author jinglf000
		* desc 在Element-ui checkboxGoup的基础之上封装
		## 使用方法，配合el-form-item实现重置功能
		```
		<el-form-item prop="zph_id" label="选择要复用到的招聘会">
					<checkbox-group v-model="formCopy.zph_id" :list="zphList"
					empty-text="暂无可用招聘会"
					:option="{label: 'zphrq,zphbt', value: 'zph_id'}" ></checkbox-group>
				</el-form-item>
		```
</docs>
<template>
		<div>
			<div v-if="list.length > 0">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
					@change="handleCheckAllChange" :disabled="disabled" >全选</el-checkbox>
				<el-checkbox-group v-model="checkGroup" @change="handleCheckedSite">
					<el-checkbox v-for="(item, index) in list" :key="index"
					:label="item[option.value]" :disabled="disabled">{{checkboxLabel(item)}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<div v-else>{{emptyText}}</div>
		</div>
</template>
<script>
export default {
	name: 'checkboxGroup',
	props: {
		// v-model
		value: {
			required: true
		},
		// 待选项
		list: {
			type: Array,
			required: true
		},
		// 显示配置，value实际值，label为显示值
		// label为"xxx,yyy"时显示值为item[xxx] - item[yyy]
		option: {
			type: Object,
			default() {
				return {
					value: 'id',
					label: 'name'
				};
			}
		},
		// 可选列表为空时的值
		emptyText: {
			type: String,
			default: '暂无可用数据'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		value(val) {
			this.checkGroup = val;
			if (val.length === 0) {
				this.isIndeterminate = false;
				this.checkAll = false;
			}
			this.handleCheckedSite(val);
		}
	},
	data() {
		return {
			checkAll: false,
			isIndeterminate: false,
			checkGroup: []
		};
	},
	methods: {
		// checkbox显示
		checkboxLabel(obj) {
			const optionLabel = this.option.label.split(',');
			return optionLabel.map(item => obj[item]).join(' - ');
		},
		// 全选按钮
		handleCheckAllChange(e) {
			this.checkGroup = e.target.checked ? this.list.map(item => item[this.option.value]) : [];
			this.isIndeterminate = false;
			this.$emit('input', this.checkGroup);
		},
		// 处理val值
		handleCheckedSite(val) {
			const checkCount = val.length;
			if (checkCount === 0) {
				this.checkAll = false;
				this.isIndeterminate = false;
			} else if (checkCount === this.list.length) {
				this.checkAll = true;
				this.isIndeterminate = false;
			} else {
				this.checkAll = false;
				this.isIndeterminate = true;
			}
			this.$emit('input', val);
		}
	}
};
</script>

<style scope="scoped">
.el-checkbox-group .el-checkbox{
	margin-left: 15px;
	white-space: normal;
}
</style>
