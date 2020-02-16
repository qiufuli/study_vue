<docs>
	##人事代理党委---党组织维护
	* @date ###### Mon Aug 7 16:47:23 CST 2018
	* @author lvlp
	* @desc 当组织关系证明 查询
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="queryForm">
				<el-row>
          <el-col :span="12">
						<el-form-item label="审核日期">
							<date-ass
								:begin.sync="form.shrqq" :end.sync="form.shrqz"
								propBegin="shrqq" propEnd="shrqz"></date-ass>
						</el-form-item>
					</el-col>
          <el-col :span="12">
						<el-form-item label="申请日期">
							<date-ass
								:begin.sync="form.sqrqq" :end.sync="form.sqrqz"
								propBegin="sqrqq" propEnd="sqrqz"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="身份证号" prop="sfzh">
              <el-input v-model="form.sfzh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
						<el-form-item label="审核状态" prop="shzt">
							<select-code v-model="form.shzt" code="gyrlzyw_ld_d_kjzmshzt"></select-code>
            </el-form-item>
          </el-col>
          <el-col :span="6">
						<el-form-item label="流程状态" prop="lczt">
              <!-- <select-code v-model="form.lczt" code="gyrlzyw_ld_d_zmlczt"></select-code> -->
							<el-select v-model="form.lczt" class="width_100">
								<el-option value="" label="全部"></el-option>
								<el-option value="20" label="审核拒绝"></el-option>
								<el-option value="50" label="已发邮件"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
        </el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button native-type="submit" type="primary" :loading="loading"
								@click.prevent="submit('queryForm')">查询</el-button>
							<el-button @click="reset('queryForm')" >重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!-- 查询结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap width_100">
					<el-table-column label="姓名" prop="xm"></el-table-column>
					<el-table-column label="性别" prop="xb">
						<template scope="state">
							<span>{{ state.row.xb ==='1' ? '男' : '女' }}</span>
						</template>
					</el-table-column>
					<el-table-column label="身份证号码" prop="sfzh" min-width="200"></el-table-column>
					<el-table-column label="手机号" prop="sjh"></el-table-column>
					<el-table-column label="申请日期" prop="sqrq"></el-table-column>
					<el-table-column label="流程状态" prop="lcztmc"></el-table-column>
					<el-table-column label="操作" width="230">
						<template scope="operate">
							<!-- <el-button title="审核" type="primary" size="mini" icon="btn-approval"
								@click="approval(operate.row)"></el-button>
							<el-button :disabled="false"
							title="开证明" size="mini" type="primary" class="icon-intro iconfont"
							@click="openProof(operate.row)"></el-button>
							<el-button title="发邮件" type="primary" size="mini" class="icon-mail iconfont"
								@click="sendEmail(operate.row)"></el-button> -->
              <el-button title="下载" :type="operate.row.lczt == 20 ? '' : 'primary'" size="mini" icon="btn-download"
								@click="download(operate.row)"></el-button>
              <el-button title="打印" :type="operate.row.lczt == 20 ? '' : 'primary'" size="mini" icon="btn-print"
								@click="print(operate.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="pageTotal"
						@current-change="getData"
						:current-page.sync="form.pageNum"></el-pagination>
				</div>
			</div>
		</div>
		<!-- 查询结果 结束  -->
		<!--发送邮件 start-->
		<el-dialog title="发送邮件" :visible.sync="dialogEmail" size="tiny"
		@close="cancel('formInfo')">
			<el-form :model="emailForm" ref="formInfo" :rules="rulesInfo" :label-width="labelWidth">
				<el-form-item label="主题" prop="zt" required>
					<el-input v-model="emailForm.zt"></el-input>
				</el-form-item>
				<el-form-item label="收件人邮箱" prop="sjryx" required>
					<el-input v-model="emailForm.sjryx"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="nr" required>
					<el-input type="textarea" v-model="emailForm.nr" :autosize="{ minRows: 5}"></el-input>
				</el-form-item>
				<el-form-item label="附件上传" required>
					<el-upload
						ref="upload"
						action="/common/wjsc/wjsc/affixUpload?modeName=dzzzmfj"
						:show-file-list="false"
						:on-success="uploadSuccess"
						:before-upload="beforeUpload"
						>
						<!-- 是否自动上传 -->
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<!-- <div class="prompt_text">友情提示：只能上传word/excel/pdf/txt/zip/rar文件，大小不超过500kb</div> -->
					</el-upload>
					<ul class="file_list">
						<li v-for="(item, index) in zmfj" :key="index">
							<a class="file_name" :download="item.cname">
								<i class="el-icon-document"></i>
								<span>{{ item.cname }}</span>
								<i class="el-icon-close close_btn" @click="delFile(index)"></i></a>
						</li>
					</ul>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click="SaveEmail('formInfo')">发送</el-button>
			</div>
		</el-dialog>
		<!--发送邮件 end-->
		<!-- 调档函打印 dialog 开始 -->
		<prove-cert :visible.sync="dialogAcessRecord" :kjzmId="kjzmId" :isSend="false"></prove-cert>
		<!-- 调档函打印 dialog 结束 -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import { getBtnsRight } from '@/common/js/utils';
import dateAss from '@/common/vue/dateAss';
import selectCode from '@/common/vue/selectCode';
import proveCert from './components/proveCert';

export default {
	name: 'partyRelationRecord',
	components: { dateAss, selectCode, proveCert },
	data() {
		return {
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			loading: false,
			dialogEmail: false,
			dialogAcessRecord: false,
			form: {
				shzt: '', // 审核状态
				sqrqq: '', // 申请日期始
				sqrqz: '', // 申请日期止
				lczt: '', // 流程状态
				lcztmc: '', // 流程状态
				sfzh: '', // 身份证号
				shrqq: '', // 审核开始日期
				shrqz: '', // 审核结束日期
				pageNum: 1
			},
			// 发邮件
			emailForm: {
				sjryx: '',
				zt: '',
				dazmlj: '',
				dazmfwdmc: '',
				dazmkhdmc: '',
				nr: '',
				kjzm_id: '',
				dyyh_id: ''
			},
			rules: {
				sfzh: [{ validator: validator('18, "sfzhm", "身份证号", true') }]
			},
			rulesInfo: {
				zt: [{ validator: validator('64, "normal", "主题", false') }],
				sjryx: [{ validator: validator('48, "email", "收件人邮箱", false') }],
				nr: [{ validator: validator('256, "less", "内容", false') }]
			},
			// 有效转态字段
			formFalse: {
				dzzhd_id: '',
				sffb: ''
			},
			results: [],
			zmfj: [],
			isLczt: '',
			kjzmId: '',
			dialog: false,
			pageTotal: 0
		};
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/zmjlCx', {
				params: this.form
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.zmjls;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		getEmailData() {
			this.loading = true;
			$.get('/gyrcht/rsdldw/rsdldw/zmfsyjbjCx', {
				params: { kjzm_id: this.emailForm.kjzm_id }
			}).then((res) => {
				this.loading = false;
				const data = res.returnData.sfyj;
				Object.assign(this.emailForm, data);
				this.zmfj = [];
				this.zmfj.push({
					cname: data.dazmkhdmc,
					sname: data.dazmfwdmc,
					lj: data.dazmlj
				});
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查询提交表单
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					this.getData();
				}
			});
		},
		// 查询重置表单
		reset(formName) {
			this.$refs[formName].resetFields();
		},
		// 分页 查询
		pageChange(val) {
			this.form.pageNum = val;
			this.getData();
		},
		// 党组织关系证明 审核
		approval(row) {
			this.$router.push({
				name: 'partyRelationDetail',
				params: {
					id: row.kjzm_id,
					yh_id: row.yh_id,
					isNew: true
				}
			});
		},
		// 开证明
		openProof(row) {
			if (row.lczt === '10' || row.lczt === '20') {
				this.$message.warning('您还未审核证明，请先审核证明！');
			} else {
				this.$router.push({
					name: 'partyRelationMeter',
					params: {
						id: row.kjzm_id,
						isNew: true
					}
				});
			}
		},
		// 发邮件
		sendEmail(row) {
			if (row.lczt === '40' || row.lczt === '50' || row.lczt === '60') {
				this.emailForm.kjzm_id = row.kjzm_id;
				this.emailForm.dyyh_id = row.yh_id;
				this.dialogEmail = true;
				this.isLczt = row.lczt;
				if (row.lczt === '50') {
					this.getEmailData();
				} else {
					this.emailForm.sjryx = row.dzyx;
				}
			} else {
				this.$message.warning('您还未生成证明，请先生成证明！');
			}
		},
		// 下载生成证明
		download(row) {
			if (row.lczt === '40' || row.lczt === '50' || row.lczt === '60') {
				const url = `/gyrcht/rsdldw/rsdldw/dcsczmCx?${'kjzm_id'}=${row.kjzm_id}`;
				window.open(url);
			} else {
				this.$message.warning('您还未生成证明，请先生成证明！');
			}
		},
		// 打印生成证明
		print(row) {
			if (row.lczt === '40' || row.lczt === '50' || row.lczt === '60') {
				this.kjzmId = row.kjzm_id;
				this.dialogAcessRecord = true;
			} else {
				this.$message.warning('您还未生成证明，请先生成证明！');
			}
		},
		// ====================> 查看详情
		// checkDetail(row, column) {
		// 	if (column.property === 'xm') {
		// 		this.$router.push({
		// 			name: 'partyRelationMeter',
		// 			params: {
		// 				id: row.kjzm_id,
		// 				isNew: true
		// 			}
		// 		});
		// 	}
		// },
		// * 点击取消/关闭
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogEmail = false;
		},
		// 检验每次上传文件的大小
		beforeUpload(file) {
			const maxSize = file.size / 1024 < 500;
			if (!maxSize) {
				this.$message.warning('文件大小不超过500kb!');
			}
			return maxSize;
		},
		// 上传成功后的回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				const data = res.returnData;
				this.zmfj = [];
				this.zmfj.push({
					cname: data.clientName,
					sname: data.serverName,
					lj: data.serverPath
				});
				this.emailForm.dazmlj = data.serverPath;
				this.emailForm.dazmfwdmc = data.serverName;
				this.emailForm.dazmkhdmc = data.clientName;
				this.$message.success('上传成功');
			} else {
				this.$message.warning(res.returnData.message);
			}
		},
		putData() {
			this.loading = true;
			$.post('/gyrcht/rsdldw/rsdldw/zmfsyjBc', this.emailForm)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '发送成功'
						});
						this.getData();
						this.loading = false;
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
					this.dialogEmail = false;
				}).catch(() => {
					this.loading = false;
				});
		},
		// 邮件发送
		SaveEmail(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.zmfj.length > 0) {
						this.putData();
					} else {
						this.$message.warning('请上传附件！');
					}
				}
			});
		},
		// 删除附件
		delFile(i) {
			this.$message.success('删除成功！');
			this.zmfj.splice(i, 1);
		}
	},
	// created() {
	// 	this.dialogAcessRecord = false;
	// },
	// 重载路由
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				this.btns = res.returnData.butList;
				this.dialogAcessRecord = false;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>
<style scope>
	.icon-intro,
	.icon-mail {
		font-size: 12px;
	}
	.file_list > li:first-child {
	margin-top: 10px;
}
.file_list .file_name {
	color: rgb(72, 85, 106);
	margin-right: 40px;
	overflow: hidden;
	padding-left: 4px;
	text-overflow: ellipsis;
	transition: color .3s;
	white-space: normal;
}
.file_list .close_btn {
	width: 16px;
	height: 16px;
	line-height: 16px;
	vertical-align: middle;
	margin-left: 50px;
	text-align: center;
}
.file_list .close_btn:hover {
	color: red;
}
</style>
