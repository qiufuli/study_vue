<docs>
	##人事代理党委---活动管理-报名花名册
	* @date ###### 20180718
	* @author luxy
	* @desc 查询活动报名花名册
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="序号" prop="xh"></el-table-column> 
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="身份证" prop="sfzh"></el-table-column>
					<el-table-column label="手机号" prop="sjh"></el-table-column>
					<el-table-column label="所属总支" prop="sszz"></el-table-column>
					<el-table-column label="所属支部" prop="sszb"></el-table-column>
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
		<!-- 查询结果 结束  -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'partyActiveEntry',
	components: { breadCrumb },
	data() {
		return {
			labelWidth,
			loading: false,
			form: {
				dzzhd_id: '',
				pageNum: 1
			},
			results: [],
			pageTotal: 0
		};
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/bmryhmcCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.bmhmcs;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 分页 查询
		pageChange(val) {
			this.form.pageNum = val;
			this.getData();
		}
	},
	created() {
		this.form.dzzhd_id = this.$route.params.id;
		this.getData();
	}
};
</script>
<style scope>
</style>
