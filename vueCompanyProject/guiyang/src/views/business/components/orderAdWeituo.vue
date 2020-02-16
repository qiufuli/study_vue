<docs>
		## 招聘办理中预定广告位和委托招聘展位
		* @date ###### Fri Sep 15 13:44:47 CST 2017
		* @author jinglf000
		* desc 业务办理中--招聘办理
		* 暂过滤banner(app)
</docs>
<template>
		<div>
			<!-- 招聘办理，（委托招聘办理和广告位办理） 开始-->
			<el-dialog :visible.sync="dialog" size="tiny" class="dialogCharge" @close="handleClose">
				<el-tabs v-model="chargeAd">
					<el-tab-pane label="委托招聘" name="weiTuo" :disabled="zpwtzp === false">
						<!-- 委托招聘 表单 开始-->
						<el-form :model="formWeiTuo" :label-width="labelWidth" :rules="rulesWeiTuo"
							ref="formWeiTuo">
							<el-form-item prop="zwbh" label="展位编号" required>
								<el-select v-model="formWeiTuo.zwbh" filterable placeholder="输入可搜索">
									<el-option v-for="(item, index) in weiTuoList"
									:key="index" :label="item.zwbh" :value="item.zwbh">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="招聘周期" prop="tc_id" required>
								<el-select v-model="formWeiTuo.tc_id">
									<el-option v-for="(item, index) in taoCanList" :key="index"
										:value="item.tc_id" :label="`${item.mc} - 花费${item.je  / 100 }元`">
										<span style="float: left">{{item.mc}}</span>
										<span style="float: right; color:red;">花费{{item.je  / 100 }}元</span>
									</el-option>
								</el-select>
							</el-form-item>
							<!-- 委托招聘 表单 结束-->
						</el-form>
					</el-tab-pane>
					<el-tab-pane label="广告位预定" name="ad" :disabled="zpggyd === false">
						<!-- 广告预定 表单 开始 -->
						<el-form :model="formAd" :label-width="labelWidth" :rules="rulesAd"
							ref="formAd">
							<el-form-item label="广告类型" prop="gglx" required>
								<el-select v-model="formAd.gglx" @change="getDataAdPrice">
									<el-option v-for="(item, index) in adTypeList" :key="index"
									:value="item.dmmc" :label="item.dmmc"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="广告周期" prop="tc_id" required>
								<el-select v-model="formAd.tc_id" :disabled="formAd.gglx === ''">
									<el-option v-for="(item, index) in adPriceList" :key="index"
									:value="item.tc_id" :label="`${item.mc} - 花费 ${item.je / 100 }元`">
										<span style="float: left">{{item.mc}}</span>
										<span style="float: right; color:red;">花费{{item.je  / 100 }}元</span>
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<!-- 广告预定 表单 结束 -->
					</el-tab-pane>
				</el-tabs>
				<div class="footer" slot="footer">
					<el-button @click="handleClose">取消</el-button>
					<el-button type="primary" @click="dialogSubmit"
						:disabled="loading">确定</el-button>
				</div>
			</el-dialog>
			<!-- 招聘办理，（委托招聘办理和广告位办理） 结束-->
		</div>
</template>
<script>
import $ from '@/common/js/axios';
import selectCode from '@/common/vue/selectCode';
import { labelWidth } from '@/common/js/config';

export default {
	name: 'orderAdWeituo',
	components: { selectCode },
	props: {
		companyId: {
			required: true,
			type: String
		},
		visible: {
			required: true,
			type: Boolean,
			default: false
		},
		zpwtzp: {
			type: Boolean
		},
		zpggyd: {
			type: Boolean
		}
	},
	watch: {
		visible(val, oldVal) {
			this.dialog = val;
			// dialog打开的时候
			if (val && !oldVal) {
				this.loading = false;
				this.getDataWeiList();
				this.getDataWeiTaocan();
				if (this.$refs.formWeiTuo) {
					this.$refs.formWeiTuo.resetFields();
				}
				if (this.$refs.formAd) {
					this.$refs.formAd.resetFields();
				}
			}
		},
		zpwtzp(val) {
			if (val) {
				this.chargeAd = 'weiTuo';
			} else {
				this.chargeAd = 'ad';
			}
		}
	},
	data() {
		return {
			labelWidth,
			loading: false,
			dialog: false,
			// ===============> 招聘办理
			weiTuoList: [],
			taoCanList: [],
			// 委托招聘
			formWeiTuo: {
				dwxx_id: '',
				zwbh: '',
				tc_id: ''
			},
			rulesWeiTuo: {
				zwbh: [{ required: true, message: '展位编号不能为空' }],
				tc_id: [{ required: true, message: '招聘周期不能为空' }]
			},
			// 广告办理
			adTypeList: [],
			adPriceList: [],
			formAd: {
				dwxx_id: '',
				gglx: '',
				tc_id: ''
			},
			rulesAd: {
				gglx: [{ required: true, message: '广告类型不能为空' }],
				tc_id: [{ required: true, message: '广告周期不能为空' }]
			},
			chargeAd: 'weiTuo'
		};
	},
	methods: {
		// dialog 对话框关闭时的回调
		handleClose() {
			this.$emit('update:visible', false);
		},
		// =================================> 委托招聘
		// 获取委托招聘 可用展位列表
		getDataWeiList() {
			$.get('/gyrcht/ywgl/zpbl/wtzpzwCx').then((res) => {
				this.weiTuoList = res.returnData.wtsyzw;
			}).catch(() => {});
		},
		// 获取套餐类型 套餐类型(10现场招聘点数 20名企图标 30BANNER图标 40 委托招聘)
		getDataWeiTaocan() {
			$.get('/gyrcht/ywgl/zpbl/tccsCx', {
				params: { tclx: '40' }
			}).then((res) => {
				this.taoCanList = res.returnData.tccslb;
			}).catch(() => {});
		},
		// 委托招聘保存
		postDataWeiTuo() {
			this.loading = true;
			this.formWeiTuo.dwxx_id = this.companyId;
			$.post('/gyrcht/ywgl/zpbl/wtzpzwBc', this.formWeiTuo).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('委托招聘展位预定，提交成功！');
				} else {
					this.$message.error(res.returnData.message);
				}
				this.handleClose();
			}).catch(() => {
				this.handleClose();
			});
		},
		// =================================> 广告办理
		// 获取广告类型
		getDataAdType() {
			$.get('/gyrcht/ywgl/zpbl/ggwlxCx').then((res) => {
				// 暂过滤banner(app)
				res.returnData.ggwlx.forEach((item, i) => {
					// if (item.dmid !== '50') {
					this.adTypeList[i] = item;
					// }
				});
			}).catch(() => {});
		},
		// 获取广告类型 对应的广告周期和价格
		getDataAdPrice() {
			if (this.formAd.gglx) {
				this.formAd.tc_id = '';
				$.get('/gyrcht/ywgl/zpbl/tccsCx', {
					params: { tclx: this.formAd.gglx }
				}).then((res) => {
					this.adPriceList = res.returnData.tccslb;
				}).catch(() => {});
			}
		},
		// 广告预定保存
		postDataAd() {
			this.loading = true;
			this.formAd.dwxx_id = this.companyId;
			$.post('/gyrcht/ywgl/zpbl/ggwydBc', this.formAd).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('广告预定，提交成功！');
				} else {
					this.$message.error(res.returnData.message);
				}
				this.handleClose();
			}).catch(() => {
				this.handleClose();
			});
		},
		// 招聘办理保存
		dialogSubmit() {
			if (this.chargeAd === 'weiTuo') {
				this.$refs.formWeiTuo.validate((valid) => {
					if (valid) {
						this.postDataWeiTuo();
					}
				});
			} else if (this.chargeAd === 'ad') {
				this.$refs.formAd.validate((valid) => {
					if (valid) {
						this.postDataAd();
					}
				});
			}
		}
	},
	created() {
		this.getDataAdType();
	}
};
</script>
<style>

</style>
