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
						<el-form-item label="调档函编号" prop="ddhbh"  required>
							<el-input v-model="form.ddhbh" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="7">
						<el-form-item label="身份证号" prop="sfzh"  required>
							<el-input v-model="form.sfzh" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="手机号" prop="sjh"  required>
							<el-input v-model="form.sjh" :disabled="true"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :span="14">
						<el-form-item label="详细内容" prop="xqxx" required>
							<el-input type="textarea" v-model="form.xqxx" :autosize="{ minRows: 10}"></el-input>
						</el-form-item>
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
		<lette-cert :visible.sync="dialogAcess" :kjddhId="kjddhId"></lette-cert>
		<!-- 调档函打印 dialog 结束 -->
  </div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import selectCode from '@/common/vue/selectCode';
import breadCrumb from '@/common/vue/breadCrumb';
import letteCert from './components/letteCert';

export default {
	name: 'danganLetteMeter',
	components: {
		breadCrumb,
		selectCode,
		letteCert
	},
	data() {
		return {
			labelWidth,
			loading: false,
			submitLoading: false,
			dialogAcess: false,
			kjddhId: '',
			color: {
				on: '#13ce66',
				off: '#ff4949'
			},
			form: {
				xm: '',
				xqxx: '',
				sjh: '',
				sfzh: '',
				kjddh_id: '',
				ddhbh: '',
				sjly: ''
			},
			rules: {
				xm: [{ validator: validator('32, "normal", "姓名", true') }],
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", true') }],
				ddhbh: [{ validator: validator('64, "normal", "调档函编号", true') }],
				sjh: [{ validator: validator('11, "sjh", "手机号", true') }],
				xqxx: [{ validator: validator('256, "less", "详细内容", true') }]
			},
			// 网上招聘 审批权限
			onLineApproval: false
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.shzt': function (val) {
			this.form.spbz = '';
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
		}
	},
	methods: {
		// 职位基本信息 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/ldryda/ldryda/ddhbjCx', {
				params: { kjddh_id: this.$route.params.id }
			}).then((res) => {
				this.loading = false;
				Object.assign(this.form, res.returnData.ddh);
			}).catch(() => {
				this.loading = false;
			});
		},
		putData() {
			this.submitLoading = true;
			const data = Object.assign({}, this.form);
			data.kjddh_id = this.$route.params.id;
			$.post('/gyrcht/ldryda/ldryda/ddhscCx', data)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功'
						});
						this.dialogAcess = true;
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
		}
	},
	created() {
		this.kjddhId = this.$route.params.id;
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
</style>

