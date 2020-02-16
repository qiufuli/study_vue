<docs>
	##广告管理---待处理广告
	* @author SHJ
	* @date 2017年8月24日
	* @desc 查询/发布
</docs>
<template>
	<div>
		<!-- 查询条件 start -->
		<div class="query_wrap">
			<el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth">
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单编号" prop="ddbh">
							<el-input type="text" v-model="form.ddbh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="广告类型" prop="gglx">
							<el-select v-model="form.gglx" class="width_100">
								<el-option value="" label="全部"></el-option>
								<el-option value="10" label="BANNER图标"></el-option>
								<el-option value="20" label="名企图标"></el-option>
								<el-option value="50" label="BANNER图标（APP）"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="订单时间">
							<date-ass :begin.sync="form.ddkssj" :end.sync="form.ddjssj"
								propBegin="ddkssj" propEnd="ddjssj"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('form')">查询</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询条件 end -->
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="width_100 table_wrap">
					<el-table-column label="订单编号" prop="ddbh"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc"></el-table-column>
					<el-table-column label="广告类型" prop="gglxmc"></el-table-column>
					<el-table-column label="订单时间" prop="ddsj" width="110"></el-table-column>
					<el-table-column label="广告周期" prop="ggzqmc" width="90"></el-table-column>
					<el-table-column label="操作" prop="gg_id" width="90">
						<template scope="scope">
							<el-button icon="share" title="发布" size="mini" type="primary"
								@click="advertising(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum">
				</el-pagination>
			</div>
		</div>
		<!-- 查询结果 end -->
		<!-- dialog 弹出对话框 发布 start-->
		<el-dialog size="tiny" title="广告信息" :visible.sync="dialogInfo"
			@close="cancel('formInfo')">
			<el-form :model="formInfo" ref="formInfo" :rules="rulesInfo" :label-width="labelWidth">
				<el-form-item label="订单号" prop="ddbh">
					<el-input v-model="formInfo.ddbh" readonly class="input_no_border"></el-input>
				</el-form-item>
				<el-form-item label="广告类型" prop="gglxmc">
					<el-select v-model="formInfo.gglx" disabled class="width_100">
						<el-option value="10" label="BANNER图标"></el-option>
						<el-option value="20" label="名企图标"></el-option>
						<el-option value="50" label="BANNER图标（APP）"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="formInfo.gglx === '20'" label="链接标识" prop="ljbs">
					<el-input v-model="formInfo.ljbs" placeholder="例如：http://www.gyrc.cn/"></el-input>
				</el-form-item>
				<el-form-item v-show="formInfo.gglx !== '20'" label="排序" prop="px" class="is-required">
					<el-input v-model="formInfo.px"></el-input>
				</el-form-item>
				<el-form-item label="广告名称" prop="ggmc" class="is-required">
					<el-input v-model="formInfo.ggmc"></el-input>
				</el-form-item>
				<el-form-item label="开始时间" prop="kssj">
					<el-date-picker v-model="formInfo.kssj" type="datetime"
						:editable="false" class="width_100" :picker-options="pickerNow"
						@change="changeTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="广告图片" prop="ggtpkhdmc">
					<el-input v-show="false" v-model="formInfo.ggtpkhdmc"></el-input>
					<!-- 预览小图 -->
					<div>
						<img v-if="imgUrl" class="imgHolder" :src="imgUrl">
						<span v-else class="nopic_text">暂无图片</span>
					</div>
					<!-- 上传区 -->
					<el-upload
						:data="{modeName: modeName}"
						action="/common/wjsc/wjsc/fileUpload"
						class="upload_btn"
						:show-file-list="false"
						:on-success="uploadSuccess"
						:before-upload="beforeUpload">
						<el-button icon="upload" size="small" type="primary" class="btn_radius">上传</el-button>
					</el-upload>
					<div class="tip_text">建议图片宽高比例为3：1</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel('formInfo')">取消</el-button>
				<el-button type="primary" @click="save('formInfo')">保存</el-button>
			</div>
		</el-dialog>
		<!-- dialog 弹出对话框 发布 end-->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import dateAss from '@/common/vue/dateAss';
// import selectCode from '@/common/vue/selectCode';
import uploadImg from '@/common/vue/uploadImg';
import $ from '@/common/js/axios';

export default {
	name: 'adReady',
	components: {
		// selectCode,
		dateAss,
		uploadImg
	},
	data() {
		// 广告名称唯一性验证
		// const checkOnly = (rule, val, callback) => {
		// 	// 接口
		// 	$.get('/gyrcht/gggl/gggl/ggmcCx', {
		// 		params: {
		// 			ggmc: this.formInfo.ggmc,
		// 			gg_id: '',
		// 			lx: '0'
		// 		}
		// 	}).then((res) => {
		// 		if (res.returnData.executeResult === '0') {
		// 			callback(new Error(res.returnData.message));
		// 		} else {
		// 			callback();
		// 		}
		// 	}).catch(() => { });
		// };
		return {
			labelWidth,
			// ====================> 查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				ddbh: '',
				gglx: '',
				ddkssj: '',
				ddjssj: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				ddbh: [{ validator: validator('20, " number ", "订单编号", true') }]
			},
			// 结果
			results: [],
			// 总数
			pageTotal: 0,
			// ====================> 广告信息
			// 弹出窗可见状态
			dialogInfo: false,
			// 服务器文件夹名
			modeName: '',
			// 图片最大尺寸
			maxSize: 0,
			// 待提交表单
			formInfo: {
				gglx: '',
				px: '',
				ggmc: '',
				kssj: '',
				ggzq: '',
				ggtpsclj: '',
				ggtpkhdmc: '',
				ggtpfwdmc: '',
				ddbh: '',
				dd_id: '',
				dwxx_id: '',
				ljbs: ''
			},
			// 校验规则
			rulesInfo: {
				px: [],
				ggmc: [{ validator: validator('48, "full", "广告名称", false') }],
				kssj: [{ required: true, message: '请选择开始时间' }],
				ggtpkhdmc: [{ required: true, message: '请上传图片' }],
				ljbs: [{ validator: validator('128, "url", "链接标识", true') }]
			},
			// 图片上传建议
			adviseText: ''
		};
	},
	computed: {
		imgUrl() {
			return this.formInfo.ggtpsclj + this.formInfo.ggtpfwdmc;
		},
		pickerNow() {
			return {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			};
		}
	},
	watch: {
		/* eslint-disable func-names */
		// 监控广告类型
		'formInfo.gglx': function (val) {
			if (val === '10') {
				this.rulesInfo.px = [{ validator: validator('4, "num", "排序", false') }];
				this.modeName = 'guanggao150';
				this.maxSize = 100;
				this.adviseText = '建议图片宽度大于1200px，固高400px';
			} else if (val === '20') {
				this.rulesInfo.px = [];
				this.modeName = 'guanggao50';
				this.maxSize = 20;
				this.adviseText = '建议图片宽高比例为3：1';
			} else if (val === '50') {
				this.rulesInfo.px = [{ validator: validator('4, "num", "排序", false') }];
				this.modeName = 'guanggao150';
				this.maxSize = 100;
				this.adviseText = '建议宽高1080*678px';
			}
		},
		dialogInfo() {
			this.formInfo.ggtpkhdmc = '';
			this.formInfo.ggtpsclj = '';
			this.formInfo.ggtpfwdmc = '';
		}
	},
	methods: {
		// ## 查询操作
		// * 点击查询
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// * 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// * 执行查询(get)
		getData() {
			this.loading = true;
			$.get('/gyrcht/gggl/gggl/dclggCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.ggs;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ## 广告信息发布
		// * 点击发布, 弹出对话窗口
		advertising(row) {
			setTimeout(() => {
				this.formInfo.gglx = row.gglx;
				this.formInfo.ggzq = row.ggzq;
				this.formInfo.ddbh = row.ddbh;
				this.formInfo.dd_id = row.dd_id;
				this.formInfo.dwxx_id = row.dwxx_id;
			}, 5);
			this.dialogInfo = true;
		},
		// * 点击取消/关闭
		cancel(formName) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this.dialogInfo = false;
		},
		// * 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.putData();
					setTimeout(() => {
						this.dialogInfo = false;
					}, 5);
				}
			});
		},
		// 保存数据(post)
		putData() {
			this.loading = true;
			$.put('/gyrcht/gggl/gggl/fbggBc', this.formInfo)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.getData();
						this.$message.success('发布成功');
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
		},
		// 上传检验 图片格式/大小
		beforeUpload(file) {
			const isPicType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
			const maxSize = file.size / 1024 < this.maxSize;
			if (!isPicType) {
				this.$message.error('只能上传jpg/png/gif文件!');
			} else if (!maxSize) {
				this.$message.error(`上传图片不超过${this.maxSize}kb!`);
			}
			return isPicType && maxSize;
		},
		// 上传成功后的回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				const data = res.returnData;
				this.formInfo.ggtpkhdmc = data.clientName;
				this.formInfo.ggtpsclj = data.serverPath;
				this.formInfo.ggtpfwdmc = data.serverName;
				this.$message.success('上传成功');
			} else {
				this.$message.error(res.returnData.message);
			}
		},
		changeTime(val) {
			this.formInfo.kssj = val;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	activated() {
		this.getData();
	}
};
</script>
<style scoped>
.prompt_msg {
	color: #818a96;
}
.nopic_text {
	display: block;
	width: 100%;
	height: 100px;
	margin-bottom: 5px;
	border: 1px solid #bfc9d9;
  border-radius: 6px;
	background: #fff;
	font-size: 28px;
	line-height: 100px;
	text-align: center;
	color: #bfc9d9;
	cursor: pointer;
}
.imgHolder {
	display: block;
	width: 100%;
	height: 100px;
	margin-bottom: 5px;
	border: 1px solid #bfc9d9;
  border-radius: 6px;
	cursor: pointer;
}
.upload_btn {
	display: inline-block;
}
.btn_radius {
  border-radius: 4px;
}
.tip_text {
	font-size: 12px;
	line-height: 16px;
	margin-top: 4px;
	color: rgb(131, 143, 165);
}
</style>
