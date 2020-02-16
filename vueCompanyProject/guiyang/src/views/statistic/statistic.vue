<docs>
	## 统计分析（统计报表模块）
	* @date ###### 2017年10月21日
	* @author shj
	* @desc 报表列表，点击跳转到查询页面
</docs>
<template>
	<div>
		<div class="detail_wrap">
			<ul class="statement_list" v-for="(item, index) in options" :key="index">
				<li class="name" @click="checkDetail(item.component)">
					<i class="icon el-icon-document"></i>{{ item.label }}</li>
			</ul>
		</div>
	</div>
</template>
<script>

export default {
	name: 'statistic',
	data() {
		return {
			options: [
				{
					value: '1',
					label: '每月报省人才交流中心报表（人才市场供求信息统计表一）',
					url: '/gyrcht/bbtj/bbtj/rcscxxbCx',
					component: 'statement1'
				},
				{
					value: '2',
					label: '每季度报省厅报表（高校毕业生）',
					url: '/gyrcht/bbtj/bbtj/gxbysCx',
					component: 'statement2'
				},
				{
					value: '3',
					label: '离校毕业生专场活动情况统计表',
					url: '/gyrcht/bbtj/bbtj/byszchdCx',
					component: 'statement3'
				},
				{
					value: '4',
					label: '年度每月招聘情况统计表',
					url: '/gyrcht/bbtj/bbtj/ndmyzptjCx',
					component: 'statement4'
				},
				{
					value: '5',
					label: '薪酬统计表（职位类别）',
					url: '/gyrcht/bbtj/bbtj/xctjbzwCx',
					component: 'statement5'
				},
				{
					value: '6',
					label: '单位发送短信统计表',
					url: '/gyrcht/bbtj/bbtj/dwfsdxtjCx',
					component: 'statement6'
				},
				{
					value: '7',
					label: '单位购买简历统计表',
					url: '/gyrcht/bbtj/bbtj/dwgmjltjCx',
					component: 'statement7'
				},
				{
					value: '8',
					label: '短信明细表',
					url: '/gyrcht/bbtj/bbtj/dxmxtjCx',
					component: 'statement8'
				},
				{
					value: '9',
					label: '操作员录入统计表',
					url: '/gyrcht/bbtj/bbtj/czylrtjCx',
					component: 'statement9'
				},
				{
					value: '10',
					label: '网上支付对账表',
					url: '/gyrcht/bbtj/bbtj/wszfdztjCx',
					component: 'statement10'
				}
			]
		};
	},
	methods: {
		checkDetail(component) {
			this.$router.push({ name: 'statement',
				params: {
					componentName: component
				}
			});
		}
	}
};
</script>

<style lang="less">
	// 报表名称列表
	.statement_list {
		padding-left: 60px;
		> .name {
			padding: 0 0 10px 20px;
			font-size: 16px;
			font-style: normal;
			color: #818a96;
			cursor: pointer;
			&:hover {
				font-weight: 600;
				color: #3399ff;
				cursor: pointer;
			}
			> .icon {
				margin-right: 10px;
			}
		}
	}
	// 报表样式（查询结果）
	.no_padding.statement_wrap {
		padding: 10px 0 0;
	}
	.statement_wrap {
		background: #fff;
		margin-top: 10px;
		padding: 10px;
		font: 400 13px/18px "SimSun";
		.table_title {
			text-align: center;
			margin-bottom: 10px;
			font: 700 22px/30px "SimHei";
		}
		p {
			line-height: 30px;
			&.chop {
				font: 400 22px/30px "SimSun";
			}
		}
		.remarks {
			font: 400 12px/21px "SimSun";
		}
		.info {
			line-height: 30px;
		}
	}
	.statement_wrap > table, .diy_table {
		width: 100%;
		margin-top: 10px;
		border-collapse: collapse;
		text-align: center;
		&.align_l {
			text-align: left;
		}
		td {
			padding: 6px;
			border: 1px solid #000;
			// 序号宽度
			&.order {
				width: 30px;
			}
			&.b {
				font-weight: 700;
			}
			&.no_bd {
				border: 0;
			}
			// 去除上边框
			&.no_bdt {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: -2px;
					left: 0;
					width: 100%;
					height: 4px;
					background: #fff;
				}
			}
			// 去除下边框
			&.no_bdb {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					bottom: -2px;
					left: 0;
					width: 100%;
					height: 4px;
					background: #fff;
				}
			}
			// 去除左边框
			&.no_bdl {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: -2px;
					width: 4px;
					height: 100%;
					background: #fff;
				}
			}
			// 去除右边框
			&.no_bdr {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 0;
					right: -2px;
					width: 4px;
					height: 100%;
					background: #fff;
				}
			}
		}
		> tfoot {
			border: 0;
			text-align: left;
			tr, td {
				padding: 0;
				border: 0;
				&.count {
					font: 400 12px/21px "SimSun";
				}
			}
		}
	}
	.empty_text {
		height: 60px;
		text-align: center;
		color: rgb(94, 112, 130);
	}
</style>
