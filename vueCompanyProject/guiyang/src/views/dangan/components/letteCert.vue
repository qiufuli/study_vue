<docs>
		## 调档函打印
		* @date ###### Fri Sep 15 18:07:52 CST 2017
		* @author lvlp
		* @desc 调档函打印
</docs>
<template>
  <div class="print">
			<el-dialog :visible.sync="dialog" title="调档函打印预览"
				@close="handleClose" size="full">
				<div class="print_content" ref="printContent">
					<img class="printPng" src="../../../styles/s1/images/print_bg.png">
					<p>第一联：( 生成日期：<span class="bold_date">{{ ddhyl.bdrq }}</span>)</p>
					<p class="agent_info">本人/代办(<span class="agent_padding">{{ ddhyl.dbr }}</span>)已确认此调档函中个人相关信息正确无误,特此证明。</p>
					<h2 class="title_h2">贵阳市人才服务中心流动人员人事档案调函</h2>
					<p class="text_r">{{ ddhyl.ddhbh }}</p>
					<span class="re_info">{{ ddhyl.dacfd }}：</span>
					<br>
					<!-- <p class="content_info" v-html="ddhyl.xqxx"></p> -->
					<p class="content_info">
						经本人申请，根据中共中央组织部、人事部人发（1996）118号和贵州省委组织部、贵州省人事厅人发（1997）30号文件有关流动人员人事档案管理规定，请将 <span>{{ddhyl.xm}}</span> （证件号：{{ddhyl.sfzh}}，电话：{{ddhyl.lldh}} ）同志的档案材料及现实表整理后，于 <span>{{ddhyl.yjrq}}</span> 前寄往我单位。
					</p>
					<p class="text_r">贵阳市人才服务中心（贵阳市人力资源市场）</p>
					<p class="text_r padding_r">{{ ddhyl.fhrq }}</p>
					<p class="black_info">{{ ddhyl.dz}}</p>
					<p class="black_info">{{ ddhyl.dwlldh}}</p>
					<p class="black_info">{{ ddhyl.dacxwz}}</p>
					<div class="ewm">
						<img src="~@m1/ddhewm.png" alt="">
					</div>
					<p class="black_info">(请沿虚线虚线剪下第二联粘贴至邮寄信封表面，已便档案接收审核。)</p>
					<div class="line"></div>
					<p class="black_info">第二联：(请粘贴至邮寄信封表面，已便档案接收审核)</p>
					<div class="black_info">
						姓名：<span class="bottom_line">{{ ddhyl.xm }}</span>，
						身份证：<span class="bottom_line">{{ ddhyl.sfzhjm }}</span>，
						联系电话：<span class="bottom_line">{{ ddhyl.lldhjm }}</span>
					</div>
					<div class="black_info">
						<span>调函编号：<b>{{ ddhyl.ddhbh }}</b></span> ，
						<span>发函日期：<b class="fhrq">{{ ddhyl.fhrq }}</b></span>
					</div>
					<div class="zhang">
						<img src="~@m1/registe.png" alt="">
					</div>
				</div>
				<div class="align_center noprint" slot="footer">
					<el-button @click="dialog = false">取消</el-button>
					<el-button type="primary" @click="print">打印</el-button>
				</div>
			</el-dialog>
		</div>
</template>
<script>
import $ from '@/common/js/axios';
import { replaceBlank } from '@/common/js/utils';

export default {
	name: 'letteMeterPrint',
	data() {
		return {
			loading: false,
			dialog: false,
			ddhyl: {
				bdrq: '',
				dbr: '',
				ddhbh: '',
				dacfd: '',
				xm: '',
				xqxx: '',
				sfzh: '',
				lldh: '',
				fhrq: '',
				yjrq: '',
				dz: '',
				dwlldh: '',
				dacxwz: '',
				ewmlj: '',
				yzlj: ''
			}
		};
	},
	props: {
		kjddhId: {
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
				this.getPriviewData().then(() => {
					this.dialog = val;
				});
			}
		},
		kjddhId() {
			this.getPriviewData();
		}
	},
	methods: {
		getPriviewData() {
			return $.get('/gyrcht/ldryda/ldryda/ddhylCx', {
				params: { kjddh_id: this.kjddhId }
			}).then((res) => {
				this.loading = false;
				Object.assign(this.ddhyl, res.returnData.ddhyl);
				this.ddhyl.xqxx = replaceBlank(this.ddhyl.xqxx);
			}).catch(() => {
				this.loading = false;
			});
		},
		// 关闭dialog close处理函数
		handleClose() {
			this.$emit('update:visible', false);
		},
		// 打印
		print() {
			window.print();
		}
	}
};
</script>
<style scoped>
	.print_content{
		position: relative;
		font-size: 18px;
		color: #000;
		width: 800px;
		margin: 0 auto;
		/* background: url('../../../styles/s1/images/print_bg.png') no-repeat; */
		background-size: contain;
	}
	.printPng {
		position: absolute;
		top: 100px;
		left: 0;
		width: 800px;
	}
	.title_h2{
		font-family: '微软雅黑';
		text-align: center;
		font-size: 24px;
		font-weight: normal;
		height: 60px;
	}
	.line{
		border-bottom: 1px dashed #000;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.print_content .zhang{
    position: absolute;
    width: 200px;
    right: 80px;
    top: 45%;
    margin-top: -50px;
	}
	.print_content .ewm {
		width: 180px;
	}
	.print_content .zhang img,
	.print_content .ewm img {
		width: 100%;
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
	.bold_date {
		color: #000;
		font-weight: bold;
		margin: 0 10px;
	}
	.agent_info {
		margin: 30px 0 50px;
		background: #D9D9D9;
		border-bottom: 2px solid #000;
		font-size: 16px;
	}
	.agent_padding {
		margin: 0 10px;
	}
	.text_r {
		text-align: right;
		font-family: '宋体';
	}
	.re_info {
		border-bottom: 2px solid #262626;
		line-height: 30px;
		margin-bottom: 40px;
		display: inline-block;
	}
	.content_info {
		text-indent: 2em;
		min-height: 350px;
		/*margin-bottom: 120px;*/
		font-size: 20px;
		font-family: '宋体';
		line-height: 60px;
	}
	.content_info span {
		border-bottom: 2px solid #262626;
	}
	.padding_r {
		padding-right: 100px;
		margin: 20px 0 100px;
	}
	.black_info {
		/*font-weight: bold;*/
		color:#000;
		margin: 25px 0;
		font-size: 16px;
	}
	.black_info .fhrq {
		border-bottom: 2px solid #262626;
	}
	.bottom_line {
		border-bottom: 2px solid #262626;
		line-height: 30px;
		display: inline-block;
		font-weight: bold;
	}
</style>
