<docs>
		## 行业选择的封装基于mulitSelect
		* @date ###### Wed Sep 6 17:16:56 CST 2017
		* @author jinglf000
		* @desc 行业类别多级选择

</docs>
<template>
		<div>
			<mulit-select local="tradeclass"
			:api="{ url: '/xmtyzjht/hylb/hylb/hylbhcCx', param: 'hylb' }"
			:change-on-select="changeOnSelect"
			:value="tradeValue" @input="selectChioce" :width='width'>
			</mulit-select>
		</div>
</template>
<script>
import mulitSelect from './select';

export default {
	name: 'tradeSelect',
	components: { mulitSelect },
	data() {
		return {
			tradeValue: ''
		};
	},
	props: {
		value: {},
		width: {
			type: Number,
			default: 320
		},
		// 默认为true，表示必须选到最后一级
		changeOnSelect: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		value(val) {
			this.tradeValue = val;
		}
	},
	methods: {
		selectChioce(val) {
			this.tradeValue = val;
			this.$emit('input', val);
		}
	},
	created() {
		this.tradeValue = this.value;
	}
};
</script>
<style>

</style>
