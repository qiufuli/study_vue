<docs>
	## 客户管理---单位客户管理，操作记录页，包含：沟通记录 订单记录 招聘会记录 委托招聘记录
	* @date ###### Wed Aug 23 09:38:23 CST 2017
	* @author jinglf000
	* @desc 单位客户管理，操作记录页，
	## 遗留问题
	* 组件标签页嵌套样式bug: (暂)通过设置全局样式强行改变
</docs>

<template>
	<div>
		<el-tabs v-model="tabOn" @tab-click="tabChange">
			<el-tab-pane label="沟通记录" name="commu" v-loading="loadingCommu">
				<el-table :data="resultsCommu" class="table_wrap width_100" stripe>
					<el-table-column prop="fsnr" label="内容" min-width="200"></el-table-column>
					<el-table-column prop="fssj" label="发送时间" min-width="110"></el-table-column>
					<el-table-column prop="fszt" label="发送状态">
						<template scope="postCode">
							<span v-if="postCode.row.fszt === '1'">成功</span>
							<span v-else-if="postCode.row.fszt === '0'">失败</span>
							<span v-else></span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsCommu.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotalCommu"
						:current-page.sync="formCommu.pageNum"
						@current-change="getDataCommu">
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="订单记录" name="order" v-loading="loadingOrder">
				<el-table :data="resultsOrder" class="table_wrap width_100" stripe>
					<el-table-column label="订单号" prop="ddbh" min-width="200"></el-table-column>
					<el-table-column label="订单类型" prop="ddlxmc"></el-table-column>
					<el-table-column label="订单渠道" prop="ddqdmc"></el-table-column>
					<el-table-column label="订单状态" prop="ddztmc"></el-table-column>
					<el-table-column label="订单描述" prop="ddms" min-width="200"></el-table-column>
					<el-table-column label="支付方式" prop="zffsmc"></el-table-column>
					<el-table-column label="金额/点数" prop="zfje"></el-table-column>
					<el-table-column label="订单时间" prop="ddsj" min-width="110"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsOrder.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotalOrder"
						:current-page.sync="formOrder.pageNum"
						@current-change="getDataOrder"></el-pagination>
			</div>
			</el-tab-pane>
			<el-tab-pane label="招聘会记录" name="recruit" v-loading="loadingRecruit">
				<el-table :data="resultsRecruit" class="table_wrap width_100" stripe
					@cell-click="checkZhaopin">
					<el-table-column label="招聘会名称" prop="zphbt" min-width="200"
						class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="展位" prop="zphzwbh"></el-table-column>
					<el-table-column label="发布职位数" prop="zwfbs">
						<template scope="zwfbs">{{zwfbs.row.zwfbs||'0'}}</template>
					</el-table-column>
					<el-table-column label="招聘人数" prop="zprs">
						<template scope="recruitZprs">{{+recruitZprs.row.zprs > 0 ? recruitZprs.row.zprs : '不限'}}</template>
					</el-table-column>
					<el-table-column label="邀约人数" prop="lyrs">
						<template scope="recruitLyrs">{{+recruitLyrs.row.lyrs||'0'}}</template>
					</el-table-column>
					<el-table-column label="招聘日期" prop="zphrq"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsRecruit.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotalRecruit"
						:current-page.sync="formRecruit.pageNum"
						@current-change="getDataRecruit"></el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="委托招聘会记录" name="weituo" v-loading="loadingEntrust">
				<el-table :data="resultsEntrust" class="table_wrap width_100" stripe
					@cell-click="checkWeituo">
					<el-table-column label="委托展位" prop="zphzwbh"
						class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="发布职位数" prop="fbzws">
						<template scope="fbzws">{{+fbzws.row.fbzws||'0'}}</template>
					</el-table-column>
					<el-table-column label="招聘人数" prop="zprs">
						<template scope="weituoZprs">{{+weituoZprs.row.zprs > 0 ? weituoZprs.row.zprs : '不限'}}</template>
					</el-table-column>
					<el-table-column label="招聘日期" prop="zphrq"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsEntrust.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotalEntrust"
						:current-page.sync="formEntrust.pageNum"
						@current-change="getDataWeituo"></el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 查看招聘会记录详情 -->
		<el-dialog title="招聘会记录详情" :visible.sync="dialogZhaopin" size="large">
			<zhaopin-detail :zhaopinId="zhaopinId" :dwxxId="dwxxId" :jobInfo="zhaopinInfo"></zhaopin-detail>
		</el-dialog>
		<!-- 查看委托招聘记录详情 -->
		<el-dialog title="委托招聘记录详情" :visible.sync="dialogWeituo" size="large">
			<weituo-detail :weituoId="weituoId" :dwxxId="dwxxId" :info="weituoInfo"></weituo-detail>
		</el-dialog>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import weituoDetail from '@/views/customer/components/weituoDetail';
import zhaopinDetail from '@/views/customer/components/zhaopinDetail';

export default {
	name: 'companyOperate',
	props: {
		// 单位信息id
		dwxxId: {
			type: String
		}
	},
	components: { weituoDetail, zhaopinDetail },
	data() {
		return {
			tabOn: 'commu',
			// 加载状态
			loadingCommu: false,
			loadingOrder: false,
			loadingRecruit: false,
			loadingEntrust: false,
			// 查询表单
			formCommu: {
				dwxx_id: '',
				pageNum: 1
			},
			formOrder: {
				dwxx_id: '',
				pageNum: 1
			},
			formRecruit: {
				dwxx_id: '',
				pageNum: 1
			},
			formEntrust: {
				dwxx_id: '',
				pageNum: 1
			},
			// 查询结果
			resultsCommu: [],
			resultsOrder: [],
			resultsRecruit: [],
			resultsEntrust: [],
			// 结果总条数
			pageTotalCommu: 0,
			pageTotalOrder: 0,
			pageTotalRecruit: 0,
			pageTotalEntrust: 0,
			// 弹窗状态
			dialogWeituo: false,
			dialogZhaopin: false,
			// 详情组件参数
			weituoId: '',
			weituoInfo: {},
			zhaopinId: '',
			zhaopinInfo: {}
		};
	},
	watch: {
		dwxxId() {
			this.tabOn = 'commu';
			this.getDataCommu();
		}
	},
	methods: {
		// 切换分栏
		tabChange(tab) {
			if (tab.name === 'commu' && this.formCommu.dwxx_id !== this.dwxxId) this.getDataCommu();
			if (tab.name === 'order' && this.formOrder.dwxx_id !== this.dwxxId) this.getDataOrder();
			if (tab.name === 'recruit' && this.formRecruit.dwxx_id !== this.dwxxId) this.getDataRecruit();
			if (tab.name === 'weituo' && this.formEntrust.dwxx_id !== this.dwxxId) this.getDataWeituo();
		},
		// 查询沟通记录
		getDataCommu() {
			this.loadingCommu = true;
			this.formCommu.dwxx_id = this.dwxxId;
			$.get('/gyrcht/khgl/dwkh/dwgtjlCx', {
				params: this.formCommu
			}).then((res) => {
				this.resultsCommu = res.returnData.gtjllb;
				this.pageTotalCommu = +res.rowsCount || 0;
				this.loadingCommu = false;
			}).catch(() => {
				this.loadingCommu = false;
			});
		},
		// 查询订单记录
		getDataOrder() {
			this.loadingOrder = true;
			this.formOrder.dwxx_id = this.dwxxId;
			$.get('/gyrcht/khgl/dwkh/dwddlbCx', {
				params: this.formOrder
			}).then((res) => {
				this.resultsOrder = res.returnData.ddjllb;
				this.pageTotalOrder = +res.rowsCount || 0;
				this.loadingOrder = false;
			}).catch(() => {
				this.loadingOrder = false;
			});
		},
		// 查询招聘会记录
		getDataRecruit() {
			this.loadingRecruit = true;
			this.formRecruit.dwxx_id = this.dwxxId;
			$.get('/gyrcht/khgl/dwkh/dwzphjlCx', {
				params: this.formRecruit
			}).then((res) => {
				this.resultsRecruit = res.returnData.zphkllb;
				this.pageTotalRecruit = +res.rowsCount || 0;
				this.loadingRecruit = false;
			}).catch(() => {
				this.loadingRecruit = false;
			});
		},
		// 查询委托招聘会记录
		getDataWeituo() {
			this.loadingEntrust = true;
			this.formEntrust.dwxx_id = this.dwxxId;
			$.get('/gyrcht/khgl/dwkh/dwwtjlCx', {
				params: this.formEntrust
			}).then((res) => {
				this.resultsEntrust = res.returnData.wtzpjllb;
				this.pageTotalEntrust = +res.rowsCount || 0;
				this.loadingEntrust = false;
			}).catch(() => {
				this.loadingEntrust = false;
			});
		},
		// 查看招聘会记录详情
		checkZhaopin(row, column) {
			if (column.property === 'zphbt') {
				this.zhaopinId = row.zph_id;
				this.dwxxId = row.dwxx_id;
				this.zhaopinInfo = row;
				this.dialogZhaopin = true;
			}
		},
		// 查看委托招聘会记录详情
		checkWeituo(row, column) {
			if (column.property === 'zphzwbh') {
				this.weituoId = row.wtzwyd_id;
				this.weituoInfo = row;
				this.dialogWeituo = true;
			}
		}
	},
	created() {
		this.getDataCommu();
	}
};
</script>

<style>
table {
	width: 100% !important;
}
.el-table__empty-block {
	width: 100% !important;
}
</style>
