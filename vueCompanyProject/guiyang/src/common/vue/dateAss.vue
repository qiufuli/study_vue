<docs>
	## 日期关联组件，
	## 含有两个日期，两个日期有关联，前个的日期不能超过后面的日期
	## @author jinglf000
	## @date ###### Fri Aug 4 10:28:57 CST 2017
	## 由于使用props的双向绑定因此，绑定方式必须为:begin.sync和:end.sync
	## propBegin开始日期的prop属性，propEnd结束日期的prop属性。必填项
	## 使用方式
	dataTyoe属性暂只包括 日期：date、月份：month，如需添加，要去utils修改 reg, 以及dateZero方法（拼接完整时间对象）
	```
		<el-col :span="12">
		<el-form-item label="创建时间">
			<date-ass :begin.sync="form.cjrqks" propBegin="cjrqks"
			:end.sync="form.cjrqjs" propEnd="cjrqjs"></date-ass>
		</el-form-item>
	```
</docs>
<template>
	<div>
		<el-row>
			<el-col :span="11">
				<el-form-item :prop="propBegin">
					<el-date-picker :type="dateType" v-model="beginVal" :editable="false"
					placeholder="开始" class="width_100" :picker-options="beginOption"
					@change="changeBegin"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="2" class="time_from_to"></el-col>
			<el-col :span="11">
				<el-form-item :prop="propEnd">
					<el-date-picker :type="dateType" v-model="endVal" :editable="false"
					placeholder="结束" class="width_100" :picker-options="endOption"
					@change="changeEnd"></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import { dateZero } from '@/common/js/utils';

export default {
	name: 'dateAss',
	data() {
		return {
			beginVal: '',
			endVal: ''
		};
	},
	watch: {
		// 由外向内赋值
		begin(val) {
			this.beginVal = val;
		},
		end(val) {
			this.endVal = val;
		}
	},
	props: {
		begin: {
			required: true
		},
		end: {
			required: true
		},
		propBegin: {
			required: true
		},
		propEnd: {
			required: true
		},
		dateType: {
			type: String,
			default: 'date'
		}
	},
	computed: {
		// 开始时间控制
		beginOption() {
			if (this.endVal) {
				const end = new Date(this.endVal);
				return {
					disabledDate(time) {
						return time.getTime() > end.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		},
		// 结束时间控制
		endOption() {
			if (this.beginVal) {
				const begin = dateZero(this.beginVal);
				return {
					disabledDate(time) {
						return time.getTime() < begin.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		}
	},
	methods: {
		// 开始时间 变化
		changeBegin(val) {
			this.$emit('update:begin', val || '');
		},
		// 结束时间 变化
		changeEnd(val) {
			this.$emit('update:end', val || '');
		}
	},
	created() {
		this.beginVal = this.begin;
		this.endVal = this.end;
	}
};
</script>
<style>

</style>
