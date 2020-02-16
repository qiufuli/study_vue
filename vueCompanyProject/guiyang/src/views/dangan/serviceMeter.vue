<docs>
	## 组织关系证明材料 编辑页面
	### @author lvlp
	### @date ###### Mon Jul 24 09:29:02 CST 2017
</docs>

<template>
  <div class="detail_wrap">
    <bread-crumb></bread-crumb>
    <div class="content" v-loading="loading">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="form">
				<el-row>
					<el-col :span="7">
						<el-form-item label="姓名" prop="xm"  required>
							<el-input v-model="form.xm" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="档案编号" prop="dabh"  required>
							<el-input v-model="form.dabh"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :span="14">
						<el-form-item label="详细内容" prop="xxnr" required>
							<el-input type="textarea" v-model="form.xxnr" :autosize="{ minRows: 10}"></el-input>
						</el-form-item>
					</el-col>
        </el-row>
				<el-row>
					<el-col :span="14">
						<el-form-item label="附加描述" prop="zjnr">
							<el-input v-model="form.zjnr"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="电子章" prop="dzzlx" required>
              <select-code v-model="form.dzzlx" code="gyrlzyw_ld_d_dzzlx" :disabled="true" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div :class="className">
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item
							label-width="12.5%">
							<el-button type="primary" native-type="submit" :disabled="loading"
								@click.prevent="saveProof('form')">生成证明</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 调档函打印 dialog 开始 -->
		<service-cert :visible.sync="dialogAcess" :kjzmId="kjzmId" @proveAndSend="proveAndSend" :isSend="true" :enterList="false"></service-cert>
		<!-- 调档函打印 dialog 结束 -->
  </div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import serviceCert from './components/serviceCert';

export default {
	name: 'danganServiceMeter',
	components: {
		breadCrumb,
		selectCode,
		serviceCert
	},
	data() {
		return {
			labelWidth,
			loading: false,
			submitLoading: false,
			dialogAcess: false,
			kjddhId: '',
			className: 'seal registe', // 电子公章路径
			form: {
				xm: '',
				dabh: '',
				xxnr: '',
				sjh: '',
				sfzh: '',
				zjnr: '',
				dzzlx: '10',
				kjzm_id: '',
				sjly: ''
			},
			rules: {
				xm: [{ validator: validator('32, "normal", "姓名", false') }],
				dabh: [{ validator: validator('64, "normal", "档案编号", false') }],
				xxnr: [{ validator: validator('256, "less", "详细内容", false') }],
				dzzlx: [{ required: true, message: '电子章不能为空！' }]
			},
			// 网上招聘 审批权限
			onLineApproval: false
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.shzt': function (val) {
			switch (val) {
			case '10':
				this.form.jjyy = '';
				this.rules.jjyy = [{ validator: validator('256, "bz", "拒绝原因", true') }];
				break;
			case '20':
				this.rules.jjyy = [{ required: true, message: '拒绝原因不能为空' },
					{ validator: validator('256, "bz", "拒绝原因", false') }];
				break;
			default: break;
			}
		},
		'form.dzzlx': function (val) {
			switch (val) {
			case '10':
				this.className = 'seal registe';
				break;
			case '20':
				this.className = 'seal record';
				break;
			default: break;
			}
		}
	},
	methods: {
		// 职位基本信息 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/kjzm/kjzm/zmclbjCx', {
				params: { kjzm_id: this.$route.params.id }
			}).then((res) => {
				this.loading = false;
				Object.assign(this.form, res.returnData.zmclxx);
			}).catch(() => {
				this.loading = false;
			});
		},
		putData() {
			this.submitLoading = true;
			const data = Object.assign({}, this.form);
			data.kjzm_id = this.$route.params.id;
			$.put('/gyrcht/kjzm/kjzm/zmclbjBc', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功'
						});
						setTimeout(() => {
							this.dialogAcess = true;
						}, 1000);
					} else {
						this.$message.warning(res.returnData.message);
						this.submitLoading = false;
					}
				}).catch(() => {
					this.submitLoading = false;
				});
		},
		saveProof(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
				}
			});
		},
		// 生成证明并发送邮件
		proveAndSend() {
			this.loading = true;
			$.post('/gyrcht/kjzm/kjzm/zmscfsyjBc', {
				kjzm_id: this.kjzmId,
				kjzmlx: this.kjzmlx
			}).then((res) => {
				this.loading = false;
				if (res.returnData.executeResult === '1') {
					// this.$message.success('发送成功');
					this.$alert('操作成功', '生成证明并发送邮件', {
						confirmButtonText: '确定',
						callback: () => {
							this.$router.go(-1);
						}
					});
				} else {
					this.$message.warning(res.returnData.message);
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		this.kjzmId = this.$route.params.id;
		this.kjzmlx = this.$route.params.kjzmlx;
		this.onLineApproval = this.$route.params.onLineApproval;
		this.getData();
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style scoped>
	.content {
		width: 100%;
		margin-top: 20px;
		box-sizing: border-box;
		padding: 0 20px 30px;
		word-wrap: break-word;
		color: #000;
	}
	.print_content{
		position: relative;
		font-size: 18px;
		color: #000;
		width: 800px;
		margin: 0 auto;
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
    width: 180px;
    left: 50px;
    top: 28%;
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
		margin-bottom: 30px;
		display: inline-block;
	}
	.content_info {
		margin-bottom: 120px;
		font-size: 18px;
		font-family: '宋体';
	}
	.padding_r {
		padding-right: 100px;
		margin: 20px 0 100px;
	}
	.black_info {
		/*font-weight: bold;*/
		color:#000;
		margin: 10px 0;
		font-size: 16px;
	}
	.bottom_line {
		border-bottom: 2px solid #262626;
		line-height: 30px;
		display: inline-block;
		font-weight: bold;
	}
	.seal {
		margin-left: 50px;
		width: 150px;
		height: 150px;
	}
	.record {
		background: url('~@m1/record.png') no-repeat center / cover;
	}
	.registe {
		background: url('~@m1/registe.png') no-repeat center / cover;
	}
	.el-loading-mask {
		background: transparent;
	}
</style>

