<docs>
		## 新闻类型级联选择框
		*	@author jinglf000
		*	@date ###### Sat Aug 19 16:19:12 CST 2017
		*	@desc  新闻类型级联选择框
		## 使用方式
		*	v-model(value) 为必填项
		*	change-on-select 默认为true，是否可以选择子类
</docs>
<template>
		<div>
			<el-cascader :options="options" v-model="model"
				:props="props" class="width_100" :change-on-select="changeOnSelect"
				:filterable="true" @change="typeChange">
			</el-cascader>
		</div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
	name: 'newsType',
	data() {
		return {
			options: [],
			props: {
				value: 'xwlx_id',
				label: 'xwlxmc',
				children: 'children'
			},
			model: []
		};
	},
	props: {
		value: {
			required: true
		},
		changeOnSelect: {
			default: true
		},
		permissions: {
			default: ''
		}
	},
	watch: {
		// 父给子赋值
		value(val) {
			this.model = val;
		},
		permissions(val) {
			if (val.split(',').length > 0) {
				this.getData();
			}
		}
	},
	methods: {
		getData() {
			$.get('/gyrcht/xwgl/xwgl/xwlxglCx', {
				params: { isShowState: this.permissions }
			}).then((res) => {
				this.options = res.returnData.xwlxs;
			});
		},
		typeChange(val) {
			this.$emit('input', val);
		}
	},
	created() {
		if (this.permissions) {
			this.getData();
		}
	}
};
</script>
<style>

</style>
