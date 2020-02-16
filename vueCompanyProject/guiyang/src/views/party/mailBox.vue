<docs>
	##人事代理党委---党员信箱
	* @date ###### Tue Aug 8 11:45:43 CST 2017
	* @author jinglf000
	* @desc 查询、回复党员留言
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item label="回复状态" prop="hfzt">
							<el-select v-model="form.hfzt">
								<el-option value="" label="全部"></el-option>
								<el-option value="1" label="已回复"></el-option>
								<el-option value="0" label="未回复"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit"
								@click.prevent="submit()">查询</el-button>
							<el-button @click="reset('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!--查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column type="expand">
						<template scope="scope">
							<el-row>
								<el-col :span="4" class="expand_label">留言内容：</el-col>
								<el-col :span="16" class="expand_content">{{scope.row.lynr}}</el-col>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column prop="lybt" label="标题" min-width="180"></el-table-column>
					<el-table-column prop="lxdh" label="联系电话" width="130"></el-table-column>
					<el-table-column prop="lynr" label="留言内容" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="lysj" label="留言时间" width="110"></el-table-column>
					<el-table-column prop="lyip" label="IP" min-width="180"></el-table-column>
					<el-table-column prop="sfys" label="是否隐私">
						<template scope="prop">
							<span>{{exchange(prop.row.sfys)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="hfzt" label="回复状态">
						<template scope="propxs">
							<span>{{propxs.row.hfzt === '1' ? '已回复' : '未回复'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作"
						fixed="right">
						<template scope="operate">
							<el-button :disabled="operate.row.hfzt === '1'"
								title="回复" type="primary" size="mini" icon="btn-reply"
								@click="handleReply(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="form.pageNum"></el-pagination>
				</div>
			</div>
		</div>
		<!--查询结果 结束  -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';

export default {
	name: 'partyMailBox',
	data() {
		return {
			labelWidth,
			loading: false,
			form: {
				hfzt: '',
				pageNum: 1
			},
			results: [],
			pageTotal: 0
		};
	},
	methods: {
		// 1--->是，0--->否
		exchange(id) {
			return id === '1' ? '是' : '否';
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/dyxxxxCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.dyxxs;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 表单查询 确认按钮
		submit() {
			this.getData();
		},
		// 表单查询 重置按钮
		reset(formName) {
			this.$refs[formName].resetFields();
		},
		handleReply(row) {
			this.$router.push({ name: 'partyMailReply', params: { id: row.dyxx_id } });
		}
	},
	activated() {
		this.getData();
	}
};
</script>
<style scoped>
	.expand_label{
		color: #818a96;
		text-align: right;
		box-sizing: border-box;
		padding-right: 20px;
	}
	.expand_content{
		text-align: left;
	}
</style>
