<docs>
		## 专业多级选择的封装基于mulitSelect
		* @date ###### Wed Sep 6 17:16:56 CST 2017
		* @author jinglf000
		* @desc 专业多级类别多级选择

</docs>
<template>
		<div>
			<mulit-select local="majorclass" :width="width"
			:change-on-select="changeOnSelect"
			:api="{ url: '/xmtyzjht/zylb/zylb/zylbCx', param: 'zwlb' }"
			:value="majorValue" @input="selectChioce">
			</mulit-select>
		</div>
</template>
<script>
import mulitSelect from './select';

export default {
	name: 'majorSelect',
	components: { mulitSelect },
	data() {
		return {
			majorValue: ''
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
			this.majorValue = val;
		}
	},
	methods: {
		selectChioce(val) {
			this.majorValue = val;
			this.$emit('input', val);
		}
	},
	created() {
		this.majorValue = this.value;
	}
};
</script>
<style>

</style>
