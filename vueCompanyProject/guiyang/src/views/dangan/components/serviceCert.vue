<docs>
		## 调档函打印
		* @date ###### Fri Sep 15 18:07:52 CST 2017
		* @author lvlp
		* @desc 调档函打印
</docs>
<template>
  <div class="print">
			<el-dialog :visible.sync="dialog" title="证明打印预览"
				@close="handleClose" size="full">
				<div class="print_content" ref="printContent">
					<img class="printPng" src="../../../styles/s1/images/print_bg.png">
				  <h2 class="title_info" v-if="xqxx.kjzmlx === '10'">存档证明</h2>
				  <h2 class="title_info" v-else-if="xqxx.kjzmlx === '20'">政治思想表现审查表</h2>
				  <h2 class="title_h2" v-else>证明</h2>
					<p class="lsh">{{ xqxx.lsh }}</p>
          <table border="1" align="center" cellpadding="0" cellspacing="0" width="800">
            <!--<caption>证明</caption>-->
            <tr>
              <td>姓名</td>
              <td>{{ xqxx.xm }}</td>
              <td>档案编号</td>
              <td>{{ xqxx.dabh }}</td>
            </tr>
            <tr>
              <td class="fixed_w">详<br>细<br>内<br>容</td>
              <td colspan="3">
                <div class="container_info">
                  <p class="main_info" v-html="xqxx.xxnr"></p>
                  <p class="end_info">特此证明</p>
                  <div class="prove_info">
                    <div class="left_tabs">
                      <div class="ewm">
                        <img :src="ewmSrc" alt="" />
                      </div>
                      <p>（防伪查询验证）</p>
                    </div>
                    <div class="float_r">
                      <p>贵阳市人才服务中心 （贵阳市人力资源市场）</p>
                      <p>公共人事部</p>
                      <p>{{ xqxx.xtsj }}</p>
                    </div>
                    <div class="zhang">
                      <img :src="zmChapte" alt="">
                    </div>
                  </div>
                </div>
               </td>
            </tr>
            <tr>
              <td>
                <span class="remarks_info">
                  备<br><br>注
                </span>
              </td>
              <td colspan="3">此处无内容</td>
            </tr>
          </table>
				</div>
				<div class="align_center noprint" slot="footer">
					<el-button @click="dialog = false">取消</el-button>
					<el-button type="primary" @click="print">打印</el-button>
					<el-button v-if="isSend" type="primary" @click="proveAndSend">生成证明并发送邮件</el-button>
				</div>
			</el-dialog>
		</div>
</template>
<script>
import $ from '@/common/js/axios';
import { replaceBlank } from '@/common/js/utils';

export default {
	name: 'serviceMeterPrint',
	data() {
		return {
			loading: false,
			dialog: false,
			xqxx: {
				xb: '',
				sfzhm: '',
				xl: '',
				bysj: '',
				byyx: '',
				cdrq: '',
				dabh: '',
				xxnr: '',
				xtsj: '',
				dzzsclj: '',
				dzzkhdmc: '',
				dzzfwdmc: ''
			},
			zmChapte: '',
			ewmSrc: ''
		};
	},
	props: {
		kjzmId: {
			type: String,
			required: true
		},
		visible: {
			type: Boolean,
			required: true
		},
		isSend: {
			type: Boolean,
			required: true
		},
		enterList: {
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
		kjzmId() {
			this.getPriviewData();
		}
	},
	methods: {
		getPriviewData() {
			return $.get('/gyrcht/kjzm/kjzm/dysczmCx', {
				params: { kjzm_id: this.kjzmId }
			}).then((res) => {
				this.loading = false;
				const data = res.returnData.zmdyxx;
				Object.assign(this.xqxx, data);
				this.xqxx.xxnr = replaceBlank(this.xqxx.xxnr);
				this.zmChapte = data.dzzsclj + data.dzzfwdmc;
				this.ewmSrc = data.ewm;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 关闭dialog close处理函数
		handleClose() {
			// this.$emit('update:visible', false);
			if (this.enterList) {
				this.$router.go(0);
			} else {
				this.$router.go(-1);
			}
		},
		// 打印
		print() {
			window.print();
		},
		// 生成证明并发送邮件
		proveAndSend() {
			this.$emit('proveAndSend');
		}
	}
};
</script>
<style scoped>
	.print_content{
		position: relative;
		font-size: 22px;
		color: #000;
		width: 800px;
		margin: 0 auto;
    font-family: '宋体';
	}
	.printPng {
		position: absolute;
		top: 150px;
		left: 100px;
		width: 650px;
		z-index: 10;
	}
	.lsh {
		margin-bottom: 5px;
	}
	.title_h2{
		font-family: '宋体';
		text-align: center;
		font-size: 30px;
		font-weight: normal;
		height: 60px;
    letter-spacing: 40px;
    margin-left: 40px;
    margin-top: 40px;
	}
	.title_info {
		font-family: '宋体';
		text-align: center;
		font-size: 30px;
		font-weight: normal;
		height: 60px;
    margin-top: 40px;
	}
	.line{
		border-bottom: 1px dashed #000;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.print_content .zhang{
    position: absolute;
    width: 200px;
    right: 150px;
    bottom:0px;
    margin-top: -50px;
	}
	.print_content .ewm {
		width: 180px;
	}
	.container_info .end_info {
		margin-left:60px;
	}
	.print_content .zhang img,
	.print_content .ewm img {
		width: 100%;
	}
  .remarks_info {
    padding: 5px 0;
    display: block;
  }
  .container_info {
    height: 900px;
    position: relative;
    font-family: '宋体';
  }
  .container_info p {
    text-align: left;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
  }
	.main_info {
		min-height: 400px;
	}
  .float_r{
    position: absolute;
    bottom: 30px;
    right:0;
  }
  .float_r p{
    font-size: 22px;
    text-align: center;
    font-family: '宋体';
  }
  .left_tabs {
    font-family: '宋体';
    position: absolute;
    bottom: 150px;
    left: 30px;
  }
  .left_tabs p {
    text-align: center;
  }
  table {
    margin: 0 auto;
    font-family: '宋体';
    border:1px solid #48473D;
		/* background: url('../../../styles/s1/images/print_bg.png') no-repeat;
		background-size: contain; */
  }
  table tr td {
    border:1px solid #48473D;
    color: #48473D;
    padding: 10px 0;
    box-sizing: border-box;
  }
  td {
      text-align: center;
  }
  .fixed_w {
    width: 80px;
  }
</style>
