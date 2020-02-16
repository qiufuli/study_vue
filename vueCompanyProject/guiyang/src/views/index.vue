<template>
	<div class="index_wrap" v-loading="loading">
		<!-- 数据统计 开始 -->
		<div class="statis">
			<el-row class="clearfix">
				<div class="item">
					<p class="num">{{results.dwzs}}</p>
					<span class="remark">单位总数</span>
				</div>
				<div class="item">
					<p class="num">{{results.xzcdws}}</p>
					<span class="remark">新注册单位数</span>
				</div>
				<div class="item">
					<p class="num">{{results.qzzzs}}</p>
					<span class="remark">求职者总数</span>
				</div>
				<div class="item">
					<p class="num">{{results.xzcqzrs}}</p>
					<span class="remark">新注册求职人数</span>
				</div>
				<div class="item">
					<p class="num">{{results.xzdds}}</p>
					<span class="remark">新增订单数</span>
				</div>
				<div class="item">
					<p class="num">{{results.wszwzs}}</p>
					<span class="remark">网上在招职位</span>
				</div>
			</el-row>
		</div>
		<!-- 数据统计 结束 -->
		<!-- 待审批内容 开始 -->
		<div v-show="btns.dwcx || btns.zwcx || btns.ymcx">
			<div class="list_title">
				<el-form :model="form">
					<el-row>
						<el-col :span="5">
							<el-form-item label="待办事项" prop="dsplx" label-width="70px">
								<el-select v-model="form.dsplx" size="small"
									@change="defaultGet" class="width_100">
									<el-option value="1" label="单位" v-show="btns.dwcx"></el-option>
									<el-option value="2" label="职位" v-show="btns.zwcx"></el-option>
									<el-option value="3" label="二级域名" v-show="btns.ymcx"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="19" class="clearfix">
							<p class="float_l btn_total" v-show="+pageTotal"
								@click="skipApproval">待审批总数：{{pageTotal}}</p>
							<p class="float_r btn_refresh"
								@click="defaultGet"><i class="icon-refresh iconfont"></i>刷新</p>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div v-if="results.spnrlb.length > 0">
				<ul class="">
					<li class="list_content" v-for="(item, index) in results.spnrlb" :key="index">
						<el-row>
							<el-col :span="20" class="list_con">
								<span>{{item.dwmc + ' ' + item.tjrq + ' ' + item.zpbz}}</span>
							</el-col>
							<el-col :span="4" class="list_btn">
								<router-link v-if="form.dsplx === '1'" class="btn_watch btn" tag="button"
									:to="{ name: 'appCompanyDetail', params: { id: item.zj}}">查看</router-link>
								<router-link v-else-if="form.dsplx === '2'"  class="btn_watch btn" tag="button"
									:to="{
										name: 'appJobDetail',
										params: {
											id: item.zj,
											zplx: item.zplx,
											onLineApproval: btns.wssp,
											scenceApproval: btns.xcsp,
											entrustApproval: btns.wtsp
										}}">查看</router-link>
								<router-link v-else  class="btn_watch btn" tag="button"
									:to="{ name: 'appDomain', params: { id: item.zj, domain: item.ymdz }}">查看</router-link>
							</el-col>
						</el-row>
					</li>
				</ul>
				<div class="pagination_wrap" v-show="results.spnrlb.length > 0" >
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="form.pageNum"></el-pagination>
				</div>
			</div>
			<div v-else><p class="empty_text">暂无数据</p></div>
		</div>
		<!-- 待审批内容 结束 -->
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import { getBtnsRight } from '@/common/js/utils';

export default {
	name: 'index',
	data() {
		return {
			form: {
				dsplx: '1',
				pageNum: 1
			},
			results: {
				dwzs: '',
				xzcdws: '',
				qzzzs: '',
				xzcqzrs: '',
				xzdds: '',
				spnrlb: []
			},
			styleHeight: '',
			loading: false,
			pageTotal: 0,
			btns: {}
		};
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/sy/sy/syxxCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 默认查询
		defaultGet() {
			this.form.pageNum = 1;
			this.getData();
		},
		// 点击总数跳转到审批查询界面
		skipApproval() {
			switch (this.form.dsplx) {
			case '1':
				this.$router.push({ name: 'appCompany' });
				break;
			case '2':
				this.$router.push({ name: 'appJob' });
				break;
			case '3':
				this.$router.push({ name: 'appDomain' });
				break;
			default:
				break;
			}
		}
	},
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>

<style scoped lang="less">
	.list_title{
		padding: 15px 0;
		color: #333333;
		font-size: 16px;
	}
	.index_wrap{
		padding-left: 10px;
	}
	.statis .item{
		background-color: #fff;
		float: left;
		width: 15.6%;
		margin-right: 1%;
		height: 100px;
		box-sizing: border-box;
		border: 1px solid #e0e2e3;
		box-shadow: 2px 2px 5px #e0e2e3;
		position: relative;
	}
	.statis .item .num{
		text-align: right;
		font-size: 28px;
		color: #333333;
		padding-right: 15px;
		padding-top: 10px;
	}
	.statis .item .remark{
		box-sizing: border-box;
		text-align: right;
		min-width: 118px;
		padding: 5px 10px;
		font-size: 14px;
		color: #999999;
		position: absolute;
		right: 10px;
		border-top: 1px solid #e2e5e6;
		bottom: 10px;
	}
	.list_content{
		margin-bottom: 10px;
		background-color: #fff;
		box-shadow: 1px 1px 2px #e0e2e3;
	}
	.list_btn{
		text-align: center;
		font-size: 16px;
		border-left: 1px solid #d6d6d6;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.list_con{
		padding: 10px 0;
		padding-left: 80px;
		position: relative;
		font-size: 16px;
		line-height: 30px;
	}
	.list_con:before{
		content: "\e69b";
		font-family: 'iconfont';
		color: #5cb3f6;
		position: absolute;
		left: 20px;
		font-size: 30px;
		top: 10px;
	}
	.btn_refresh:hover{
		color: #3399ff;
	}
	.btn_watch{
		width: 100%;
		height: 100%;
		font-size: 16px;
		border-radius: 0;
		box-sizing: border-box;
		border: none;
		border-left: 1px solid #ccc;
		background-color: #ffffff;
		transition: all ease .2s;
		color: #333;
	}
	.btn_watch:hover{
		background-color: #3399ff;
		color: #fff;
	}
	.btn_watch:before{
		content: '\e667';
		font-family: 'iconfont';
		padding-right: 5px;
	}
	.btn_refresh, .btn_total{
		cursor: pointer;
		font-size: 18px;
		line-height: 33px;
		padding: 0 25px;
		i {
			margin-right: 5px;
			font-size: 18px;
		}
		&:hover {
			color: #3399ff;
		}
	}
	.pagination_wrap{
		margin: 5px 0;
		padding: 0;
	}
	.empty_text {
		padding-top: 20px;
		text-align: center;
		font-size: 18px;
		color: #bfc9d9;
	}
</style>

