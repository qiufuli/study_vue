<docs>
		## 行业选择的封装基于mulitSelect
		* @date ###### Wed Sep 6 17:16:56 CST 2017
		* @author jinglf000
		* @desc 行业类别多级选择

</docs>
<template>
		<div>
			<mulit-select local="businessclass"
			:api="{ url: '/gyrcht/zdhy/zdhy/zdhyejldCx', param: 'zdhyejld' }"
			:change-on-select="changeOnSelect"
			:value="businessValue" @input="selectChioce" :width='width'>
			</mulit-select>
		</div>
</template>
<script>
import mulitSelect from './select';

export default {
	name: 'businessSelect',
	components: { mulitSelect },
	data() {
		return {
			businessValue: ''
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
			this.businessValue = val;
		}
	},
	methods: {
		selectChioce(val) {
			this.businessValue = val;
			this.$emit('input', val);
		}
	},
	created() {
		this.businessValue = this.value;
	}
};
</script>
<style>

</style>
