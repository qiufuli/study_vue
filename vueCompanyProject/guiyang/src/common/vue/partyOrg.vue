<docs>
	## 封装的一个党组大类，使用element的el-select组件
	## 使用方式，父组件必须为`el-form-item`
	## 说明：
		* type : 'large','middle','small','tiny' 结构类别
		* 当type为middle的时候，依赖large，以此类推small依赖middle
		* qq（对外的qq联动），由于qq的获取必须在列表异步完成之后，因此需要排除这种情况
	## 用例（必须使用rl-form-item包起来）
	```
		<el-col :span="6">
			<el-form-item label="所属总支" prop="sszz">
				<party-org v-model="form.sszz"></party-org>
			</el-form-item>
		</el-col>
		<el-col :span="6">
			<el-form-item label="所属支部" prop="sszb">
				<party-org v-model="form.sszb" type="middle" :depend="form.sszz"></party-org>
			</el-form-item>
		</el-col>
	```
</docs>
<template>
	<div>
		<el-select v-model="val" @change="valChange" :disabled="disabled"
		ref="select" class="select_100">
			<el-option v-for="(item, index) in lists" :key="index"
			:value="item.dzzid" :label="item.mc"></el-option>
		</el-select>
	</div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
	name: 'partyOrg',
	props: {
		type: {
			type: String,
			default: 'large'
		},
		depend: String,
		value: null,
		qq: {
			type: String
		},
		disabled: {
			type: Boolean
		}
	},
	data() {
		return {
			lists: [],
			loading: false,
			val: '',
			config: {
				api: '/gyrcht/rsdldw/rsdldw/dzzjlCx'
			}
		};
	},
	watch: {
		// middle中类 获取动态依赖
		depend(val) {
			this.val = '';
			if (val) {
				this.getData();
			} else if (val === '') {
				// 当动态依赖值为空时，清空列表，清空原有值
				this.lists = [];
				this.$emit('input', '');
			}
		},
		// 从外向内赋值
		value(val) {
			this.val = val;
		}
	},
	methods: {
		// 从内向外赋值
		valChange(val) {
			this.$emit('input', this.val);
			// 排除正在加载中的情况，对外赋值中需要接口值
			if (!this.loading) {
				// 输出对应的qq值，采用.sync进行赋值，选中的值发生变化
				if (this.lists.length > 0) {
					const row = this.lists.find((item) => {
						const flag = item.dzzid === val;
						return flag;
					});
					this.$emit('update:qq', row.qq);
					// 当lists为0的时候，列表被父级置为空，也应为空qq
				} else {
					this.$emit('update:qq', '');
				}
			}
		},
		// 加载数据 接口
		getData() {
			let params;
			if (this.type !== 'large') {
				params = {
					dzzid: this.depend
				};
			}
			this.loading = true;
			$.get(this.config.api, { params }).then((res) => {
				this.loading = false;
				this.lists = res.returnData.dzz;
				// 当有查询数据的时候，添加‘请选择’项，并且id为空
				if (this.lists.length > 0) {
					this.lists.unshift({
						dzzid: '',
						mc: '请选择',
						qq: ''
					});
				}
			}).catch((e) => {
				this.loading = false;
				// 出现错误时
				/* eslint-disable */
				console.error(e);
			});
		}
	},
	created() {
		if (this.type === 'large') {
			this.getData();
		}
	}
};
</script>
<style scoped>
	.select_100{
		width: 100%;
	}
</style>
