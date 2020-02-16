<docs>
		## 代码表选择框
		*	@author jinglf000
		* @date ###### Wed Aug 16 09:16:56 CST 2017
		* @desc 代码表通用封装
		## 使用方式
		### props
		*	@param code {String} 代码表名 必填
		*	@param value {String} v-model 实现数据双向绑定 必填
		*	@param hasAll {Boolean} 默认 true ，代码表下拉框是否有不限（全选字段）

		```
		//为了 要实现校验和重置功能需要包裹  el-form-item元素
			<select-code v-model="form.zplx" code="gyrlzyw_qzzp_d_zplx" hasAll="false" ></select-code>
		```

</docs>
<template>
		<div>
			<el-select
				v-model="select"
				:disabled="disabled"
				:clearable="showClearable"
				@change="change"
				class="width_100"
				>
				<el-option
					v-for="(item, index) in results"
					:key="index"
					:disabled="(maxValue && parseInt(item.dmmc, 10) > parseInt(maxValue, 10)? true :false) ||
						(minValue && parseInt(item.dmmc, 10) < parseInt(minValue, 10)? true :false)"
					:label="item.dmmc"
					:value="valueIsId? item.dmid : item.dmmc" ></el-option>
			</el-select>
		</div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
	name: 'selectCode',
	props: {
		code: {
			type: String,
			required: true
		},
		value: {
			required: true
		},
		hasAll: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// 设置option选项的value值：true: 代码表项id; false: 代码表项名称
		valueIsId: {
			type: Boolean,
			default: true
		},
		// 最大值 禁用大于最大值的选项
		maxValue: {
			required: false
		},
		// 最小值: 禁用小于最小值的选项
		minValue: {
			required: false
		},
		// 显示清空
		showClearable: {
			required: false,
			default: false
		},
		// 刷新次数
		refresh: {
			type: Number,
			required: false
		}
	},
	data() {
		return {
			results: [],
			select: ''
		};
	},
	watch: {
		value(val) {
			this.select = val;
		},
		refresh() {
			this.getData();
		}
	},
	methods: {
		// 获取代码表数据
		getData() {
			$.get('/common/dmbcx/dmb/dmbxxCx', {
				params: { dmbm: this.code }
			}).then((res) => {
				// 对返回值进行赋值
				this.results = res.returnData[this.code] ? res.returnData[this.code] : [];
				if (this.hasAll) {
					this.results.unshift({
						dmmc: '全部',
						dmid: ''
					});
				}
			}).catch(() => {});
		},
		// select 值发生变化
		change(val) {
			this.$emit('input', val);
		}
	},
	// 创建时查询
	created() {
		this.getData();
		this.select = this.value;
	}
};
</script>
<style>

</style>
