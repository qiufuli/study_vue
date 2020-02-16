<docs>
		## 入场通知单打印
		* @date ###### Fri Sep 15 18:07:52 CST 2017
		* @author jinglf000
		* @desc 入场通知单打印
</docs>
<template>
	<div class="print">
		<el-dialog :visible.sync="dialog" :title="`打印入场通知单—${dwxx.dwmc}`"
			@close="handleClose" size="full">
			<div class="print_content" v-if="!isNull" ref="printContent">
				<h2 class="title_h2">贵阳市人力资源市场进场通知单</h2>
				<p>{{dwxx.dwmc}}：欢迎参加人才招聘会，请派2名工作人员持本通知单于下列日期上午9:00到
					贵阳市人力资源市场服务台领取资料，开展人才招聘。</p>
				<hr class="line">
				<p v-for="(item, index) in list" :key="index" >
					[{{item.zphrq}} {{getWeek(item.zphrq)}}]，展位号[{{item.zwbh}}]
					<span v-if="item.zfds !== '0'">[扣除{{item.zfds}}点]</span>
					<!-- <span v-if="item.zfje !== '0'">[支付金额{{item.zfje}}元]</span> -->
				</p>
				<hr class="line">
				<p>共计:扣除招聘点数{{dwxx.zfds}}点，剩余招聘点数{{dwxx.syds}}点。</p>
				<br>
				<!-- <p>QQ：645620469（请将“单位名称、参会日期及展位号”作为附件名称发送）</p> -->
				<!-- <p>邮箱：gyrc@163.com（请将“单位名称、参会日期及展位号”作为邮件主题和附件名称发送）</p> -->
				<p><span class="url">网址：{{dwxx.wz}}</span><span class="location">地址：{{dwxx.dz}}</span></p>
				<p>展位预定：{{dwxx.zwyd}}</p>
				<hr class="line">
				<p>注意：</p>
				<p>◆ 每场招聘会每个单位文稿限打一张。如对文稿有特殊要求，请自带文稿参会。</p>
				<p>◆ 已签订文稿自发承诺书的单位，请于每场招聘会前一天14:00前自行上传招聘文稿，如逾期不传我们无法打印，请自带文稿参会。</p>
				<div class="zhang">
					<img src="~@m1/zhang.gif" alt="">
				</div>
			</div>
			<div v-else>
				<p class="empty_print">该单位暂无需要打印的现场招聘列表</p>
			</div>
			<div class="align_center noprint" slot="footer">
				<el-button @click="dialog = false">取消</el-button>
				<el-button type="primary" :disabled="isNull" @click="print">打印</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { exchangeWeek } from '@/common/js/utils';

export default {
	name: 'accessCertPrint',
	data() {
		return {
			isNull: false,
			dialog: false,
			list: [],
			dwxx: {
				dwmc: '',
				syds: '',
				zfje: '',
				zfds: '',
				wz: '',
				dz: '',
				zwyd: ''
			}
		};
	},
	props: {
		companyId: {
			type: String,
			required: true
		},
		visible: {
			type: Boolean,
			required: true
		}
	},
	watch: {
		visible(val) {
			if (val) {
				this.getData().then((list) => {
					if (list.length > 0) {
						this.dialog = val;
					} else {
						this.$message({
							type: 'warning',
							message: '该单位暂无需要打印的现场招聘列表',
							duration: 3000
						});
						this.$emit('update:visible', false);
					}
				});
			}
		},
		companyId() {
			this.getData();
		}
	},
	methods: {
		getWeek(str) {
			return exchangeWeek(str);
		},
		// 关闭dialog close处理函数
		handleClose() {
			this.$emit('update:visible', false);
		},
		// 获取现场招聘入场通知单内容
		getData() {
			return $.get('/gyrcht/ywgl/zpbl/rctzdlbCx', {
				params: { dwxx_id: this.companyId }
			}).then((res) => {
				const data = res.returnData;
				this.list = data.rctzdlb;
				if (this.list.length > 0) {
					Object.keys(this.dwxx).forEach((item) => {
						this.dwxx[item] = data.dwxx[item];
					});
					this.isNull = false;
				} else {
					this.isNull = true;
				}
				return this.list;
			}).catch(() => {});
		},
		// print  打印
		print() {
			window.print();
		}
	},
	created() {
		// this.getData();
	}
};
</script>
<style scoped>
	.print_content{
		position: relative;
		font-size: 16px;
		color: #000;
		width: 800px;
		margin: 0 auto;
	}
	.title_h2{
		font-family: '微软雅黑';
		text-align: center;
		font-size: 24pt;
		font-weight: normal;
		height: 60px;
	}
	.line{
		border-bottom: 1px solid #000;
		padding-top: 0px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.print_content .zhang{
    position: absolute;
    width: 223px;
    right: 0;
    top: 50%;
    margin-top: -112px;
	}
	.empty_print{
		font-size:20px;
		text-align: center;
	}
	.location {
		margin-left: 100px;
	}
	.url {
		word-wrap: break-word;
	}
</style>
