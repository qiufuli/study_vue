<docs>
	## 客户管理，单位客户管理，招聘会详情
	* @date ###### Wed Aug 23 09:39:53 CST 2017
	* @author jinglf000
	* @desc 单位客户管理，招聘会记录详情
</docs>
<template>
	<div>
		<el-row>
			<el-col :span="24">
				<h3 class="title">招聘会</h3>
			</el-col>
		</el-row>
		<el-row class="info">
			<el-col :span="3">招聘会名称</el-col>
			<el-col :span="5">{{jobInfo.zphbt}}</el-col>
			<el-col :span="3">招聘会展位</el-col>
			<el-col :span="5">{{jobInfo.zphzwbh}}</el-col>
			<el-col :span="3">招聘日期</el-col>
			<el-col :span="5">{{jobInfo.zphrq}}</el-col>
		</el-row>
		<el-row class="info">
			<el-col :span="3">发布职位数</el-col>
			<el-col :span="5">{{+jobInfo.zwfbs||'0'}}</el-col>
			<el-col :span="3">招聘人数</el-col>
			<el-col :span="5">{{+jobInfo.zprs > 0 ? jobInfo.zprs : '不限'}}</el-col>
			<el-col :span="3">投递简历数</el-col>
			<el-col :span="5">{{+jobInfo.tdjls||'0'}}</el-col>
		</el-row>
		<el-row class="info">
			<el-col :span="3">录用数</el-col>
			<el-col :span="5">{{+jobInfo.lyrs||'0'}}</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<h3 class="title">职位信息</h3>
			</el-col>
		</el-row>
		<div class="list" v-loading="loadingJobs">
			<el-table :data="jobs" stripe class="table_wrap witdh_100">
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
			<div class="pagination_wrap" v-show="jobs.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotalJobs"
					:current-page.sync="pageNumJobs"
					@current-change="getDataJob"></el-pagination>
			</div>
		</div>
		<el-row>
			<el-col :span="24">
				<h3 class="title">投递人员信息</h3>
			</el-col>
		</el-row>
		<div class="list" v-loading="loadingDeli">
			<el-table :data="delis" stripe class="table_wrap width_100">
				<el-table-column label="姓名" prop="xm"></el-table-column>
				<el-table-column label="性别" prop="xb">
					<template scope="sex">
						<span v-if="sex.row.xb === '1'">男</span>
						<span v-else-if="sex.row.xb === '2'">女</span>
					</template>
				</el-table-column>
				<el-table-column label="手机" prop="sjh" min-width="130"></el-table-column>
				<el-table-column label="邮箱" prop="yx" min-width="180"></el-table-column>
				<el-table-column label="户籍" prop="hj" min-width="180"></el-table-column>
				<el-table-column label="现居住地" prop="xjzdq" min-width="180"></el-table-column>
				<el-table-column label="投递职位" prop="zwmc"></el-table-column>
				<el-table-column label="是否录用" prop="sfly">
					<template scope="sfly">
						<span>{{sfly.row.sfly === '1' ? '是' : '否'}}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination_wrap" v-show="delis.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotalDelis"
					:current-page.sync="pageNumDelis"
					@current-change="getDataDeli"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';

export default {
	name: 'zhaopinDetail',
	props: {
		zhaopinId: {
			type: String
		},
		dwxxId: {
			type: String
		},
		jobInfo: {
			type: Object
		}
	},
	watch: {
		zhaopinId() {
			this.pageNumJobs = 1;
			this.getDataJob();
		}
	},
	data() {
		return {
			// 职位信息
			loadingJobs: false,
			jobs: [],
			pageTotalJobs: 0,
			pageNumJobs: 1,
			// 投递人员信息
			loadingDeli: false,
			delis: [],
			pageTotalDelis: 0,
			pageNumDelis: 1
		};
	},
	methods: {
		getDataJob() {
			this.loadingJobs = true;
			$.get('/gyrcht/khgl/dwkh/zphzwlbCx', {
				params: {
					zph_id: this.zhaopinId,
					dwxx_id: this.dwxxId,
					pageNum: this.pageNumJobs
				}
			}).then((res) => {
				this.jobs = res.returnData.zwxxlb;
				this.pageTotalJobs = +res.rowsCount || 0;
				this.loadingJobs = false;
				this.getDataDeli();
			}).catch(() => {
				this.loadingJobs = false;
				this.getDataDeli();
			});
		},
		getDataDeli() {
			this.loadingDeli = true;
			$.get('/gyrcht/khgl/dwkh/zphtdlbCx', {
				params: {
					zph_id: this.zhaopinId,
					dwxx_id: this.dwxxId,
					pageNum: this.pageNumDelis
				}
			}).then((res) => {
				this.delis = res.returnData.tdrylb;
				this.pageTotalDelis = +res.rowsCount || 0;
				this.loadingDeli = false;
			}).catch(() => {
				this.loadingDeli = false;
			});
		}
	},
	created() {
		this.pageNumJobs = 1;
		this.pageNumDelis = 1;
		this.getDataJob();
	}
};
</script>
<style>

</style>
