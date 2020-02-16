<docs>
	## 客户管理，企业客户管理，委托招聘记录详情
	* @date ###### Wed Aug 23 09:39:13 CST 2017
	* @author jinglf000
	* @desc 企业客户管理，委托招聘记录详情
</docs>
<template>
	<div>
		<el-row>
			<el-col :span="24">
				<h3 class="title">委托招聘</h3>
			</el-col>
		</el-row>
		<el-row class="info">
			<el-col :span="3">委托展位</el-col>
			<el-col :span="5">{{info.zphzwbh}}</el-col>
			<el-col :span="3">招聘日期</el-col>
			<el-col :span="5">{{info.zphrq}}</el-col>
			<el-col :span="3">发布职位数</el-col>
			<el-col :span="5">{{info.fbzws||'0'}}</el-col>
		</el-row>
		<el-row class="info">
			<el-col :span="3">招聘人数</el-col>
			<el-col :span="5">{{info.zprs > 0 ? info.zprs : '不限'}}</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<h3 class="title">职位信息</h3>
			</el-col>
		</el-row>
		<div v-loading="loading">
			<el-table :data="results" stripe class="table_wrap width_100">
				<el-table-column label="职位名称" prop="zwmc"></el-table-column>
				<el-table-column label="职位类别" prop="zwlbmc"></el-table-column>
				<el-table-column label="专业要求" prop="sxzymc"></el-table-column>
				<el-table-column label="工作地点" prop="gzddqmc"></el-table-column>
				<el-table-column label="招聘人数" prop="zprs">
					<template scope="zprs">
						<span v-if="+zprs.row.nanrs && +zprs.row.nvrs">共{{zprs.row.zprs}}人，男性{{zprs.row.nanrs}}人，女性{{zprs.row.nvrs}}人</span>
						<span v-else-if="!+zprs.row.nanrs && +zprs.row.nvrs">女性{{zprs.row.nvrs}}人</span>
						<span v-else-if="zprs.row.zprs == -2">男性，人数不限</span>
						<span v-else-if="zprs.row.zprs == -3">女性，人数不限</span>
						<span v-else-if="+zprs.row.nanrs && !+zprs.row.nvrs">男性{{zprs.row.nanrs}}人</span>
						<span v-else-if="zprs.row.zprs > 0 && zprs.row.nanrs == 0 && zprs.row.nvrs == 0">不限男女，人数{{zprs.row.zprs}}人</span>
						<span v-else>不限男女，人数不限</span>
					</template>
				</el-table-column>
				<el-table-column label="工作经验" prop="gznx"></el-table-column>
				<el-table-column label="转正月薪">
					<template scope="salary">
						<span v-if="salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyq}}-{{salary.row.xzdyz}}</span>
						<span v-else-if="!salary.row.xzdyq && salary.row.xzdyz">{{salary.row.xzdyz}}以下</span>
						<span v-else-if="salary.row.xzdyq && !salary.row.xzdyz">{{salary.row.xzdyq}}以上</span>
						<span v-else>不限</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					:current-page.sync="pageNum"
					@current-change="getData">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
	name: 'weituoDetail',
	props: {
		weituoId: {
			type: String
		},
		dwxxId: {
			type: String
		},
		info: {
			type: Object
		}
	},
	watch: {
		weituoId() {
			this.pageNum = 1;
			this.getData();
		}
	},
	data() {
		return {
			loading: false,
			results: [],
			pageNum: 1,
			pageTotal: 0
		};
	},
	methods: {
		getData() {
			this.loading = true;
			$.get('/gyrcht/khgl/dwkh/wtzpxqCx', {
				params: {
					wtzwyd_id: this.weituoId,
					dwxx_id: this.dwxxId,
					pageNum: this.pageNum
				}
			}).then((res) => {
				this.results = res.returnData.zwxxlb;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		this.pageNum = 1;
		this.getData();
	}
};
</script>

<style></style>
