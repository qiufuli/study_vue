<docs>
		## 地址选择的封装基于mulitSelect
		* @date ###### Wed Sep 6 17:16:56 CST 2017
		* @author jinglf000
		* @desc 地址类别多级选择

</docs>
<template>
		<div>
			<mulit-select local="area"
			:api="{ url: `/xmtyzjht/xzqh/xzqh/xzqhhcCx?xzqhjb=${xzqhjb}`, param: 'xzqh' }" :width="width"
			:change-on-select="changeOnSelect"
			:value="addressValue" @input="selectChioce" :options="['省/市', '市/区', '区/县/街道', '街道']">
			</mulit-select>
		</div>
</template>
<script>
import mulitSelect from './select';

export default {
	name: 'addressSelect',
	components: { mulitSelect },
	data() {
		return {
			addressValue: ''
		};
	},
	props: {
		value: {},
		width: {
			type: Number,
			default: 400
		},
		// 默认为true，表示必须选到最后一级
		changeOnSelect: {
			type: Boolean,
			default: true
		},
		xzqhjb: {
			type: String,
			default: '4'
		}
	},
	watch: {
		value(val) {
			this.addressValue = val;
		}
	},
	methods: {
		selectChioce(val) {
			this.addressValue = val;
			this.$emit('input', val);
		}
	},
	created() {
		this.addressValue = this.value;
	}
};
</script>
<style>

</style>
