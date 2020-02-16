<docs>
		## 职位选择的封装基于mulitSelect
		* @date ###### Wed Sep 6 17:16:56 CST 2017
		* @author jinglf000
		* @desc 职位类别多级选择

</docs>
<template>
		<div>
			<mulit-select local="jobclass" :width="width"
			:change-on-select="changeOnSelect"
			:api="{ url: '/xmtyzjht/zwlb/zwlb/zwlbhcCx', param: 'zwlb' }"
			:value="jobValue" @input="selectChioce">
			</mulit-select>
		</div>
</template>
<script>
import mulitSelect from './select';

export default {
	name: 'jobSelect',
	components: { mulitSelect },
	data() {
		return {
			jobValue: ''
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
			this.jobValue = val;
		}
	},
	methods: {
		selectChioce(val) {
			this.jobValue = val;
			this.$emit('input', val);
		}
	},
	created() {
		this.jobValue = this.value;
	}
};
</script>
<style>

</style>
