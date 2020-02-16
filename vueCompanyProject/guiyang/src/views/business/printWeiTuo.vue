<docs>
	## 业务办理---委托招聘海报打印
	* @date ###### Thu Aug 31 21:12:27 CST 2017
	* @author jinglf000
	* @desc 委托招聘海报打印，首先查询委托招聘会， 主要查询委托招聘是时间段内的所有的单位
	并对单位进行操作，包括：打印文稿，职位录入，简介录入（同现场招聘），文稿状态变更，到期列表
	* 转移单部分已删除，恢复找gitlab
</docs>
<template>
	<div>
		<!-- 查询 开始 -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" ref="queryForm" :label-width="labelWidth">
				<el-row>
					<el-col :span="12">
						<el-form-item label="办理日期">
							<date-ass
								:begin.sync="form.blsjq" :end.sync="form.blsjz"
								propBegin="blsjq" propEnd="blsjz" ></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单位名称" prop="dwmc">
							<el-input v-model="form.dwmc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="文稿状态" prop="wgzt">
							<el-select v-model="form.wgzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="未打印" value="0"></el-option>
								<el-option label="已打印" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="生成招聘简章状态" prop="sczpjzzt" class="mulitfix">
							<el-select v-model="form.sczpjzzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="未提交" value="0"></el-option>
								<el-option label="已提交" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button native-type="submit" type="primary" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col v-show="btns.wtdqlb"
						:span="12" class="align_right">
						<el-button type="primary" size="small" class="btn_square" icon="my-list"
							@click="btnExpire" :loading="loading">到期列表</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!-- 查询 结束 -->
		<!-- 查询结果 开始 -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap" stripe>
					<el-table-column label="展位号" prop="zphzwbh" fixed="left" min-width="130"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc" min-width="180"></el-table-column>
					<el-table-column label="文稿状态" prop="wgzt" min-width="130">
						<template scope="ele">
							<el-switch v-model="ele.row.wgzt" :width="74"
								on-value="1" on-text="已打印" :on-color="colorOn"
								off-value="0" off-text="未打印" :off-color="colorOff"
								:disabled="btns.wtwgzt === false || ele.row.switchState"
								@change="switchState(ele.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="招聘简章状态" prop="zpjzzt" min-width="130">
						<template scope="ele2">
							<el-switch v-model="ele2.row.zpjzzt" :width="74"
								on-value="1" on-text="已提交" :on-color="colorOn"
								off-value="0" off-text="未提交" :off-color="colorOff"
								:disabled="btns.wtjzzt === false || ele2.row.switchDocState"
								@change="switchDocState(ele2.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="文稿发送人" prop="jbr" min-width="130"></el-table-column>
					<el-table-column label="文稿发送电话" prop="jbrlxdh" min-width="130"></el-table-column>
					<el-table-column label="办理人" prop="cjr"></el-table-column>
					<el-table-column label="操作" width="150" fixed="right">
						<template scope="ele3">
							<el-button
								:disabled="btns.wtjjlr === false"
								type="primary" size="mini" icon="edit" title="录入简介"
								@click="editIndroduction(ele3.row)"></el-button>
							<el-button
								:disabled="btns.wtdywg === false"
								type="primary" size="mini" class="icon-print iconfont" title="打印文稿"
								@click="EditPrint(ele3.row)"></el-button>
							<el-button
								:disabled="btns.wtzwlr === false"
								type="primary" size="mini" class="icon-job iconfont" title="职位"
								@click="jobPublish(ele3.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="formTotal"
						:current-page.sync="formRight.pageNum"
						@current-change="getData"></el-pagination>
				</div>
			</div>
    </div>
		<!-- 查询结果 结束 -->
		<!-- 到期列表 dialog 开始 -->
		<el-dialog :visible.sync="dialogExpire" title="到期列表查询"
			@close="resetFn('formExpire', 'dialogExpire')">
			<!--查询 开始 -->
			<el-form :model="formExpire" :rules="rulesExpire" label-width="120px"
				ref="formExpire">
				<el-row>
					<el-col :span="12">
						<el-form-item prop="dqsjq" label="到期日期开始">
							<el-date-picker v-model="formExpire.dqsjq"
								:editable="false" class="width_100"
								:picker-options="pickerBegin"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="dqsjz" label="到期日期结束">
							<el-date-picker v-model="formExpire.dqsjz"
								:editable="false" class="width_100"
								:picker-options="pickerEnd"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" :loading="loadingExpire"
								@click="submitFormExpire('formExpire')">查询</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="align_right">
						<el-button type="primary" icon="btn-download"
							:disabled="formExpire.dqsjq === '' || formExpire.dqsjz === ''"
							class="btn_square" :loading="loadingExpire"
							@click="exportDoc">导出</el-button>
					</el-col>
				</el-row>
				<!-- 查询 结束 -->
			</el-form>
			<!--查询 结束 -->
			<!-- 结果 开始 -->
			<div class="loading" v-loading="loadingExpire">
				<el-table :data="resultsExpire" stripe class="table_wrap">
					<el-table-column label="单位名称" prop="dwmc" min-width="180"></el-table-column>
					<el-table-column label="展位号" prop="zphzwbh"></el-table-column>
					<el-table-column label="到期日期" prop="zwjsrq"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsExpire.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="formExpireTotal"
						:current-page.sync="formExpire.pageNum"
						@current-change="getDataExpire"></el-pagination>
				</div>
			</div>
			<!-- 结果 结束 -->
		</el-dialog>
		<!-- 到期列表 dialog 结束 -->
		<!-- 打印dialog 开始 -->
		<el-dialog :visible.sync="posterVisible" size="full" :show-close="false" class="print_wrap">
			<!-- 打印样式修改 start -->
			<div class="toolbar noprint clearfix">
				<div class="btn_text">
					<el-button type="primary" class="btn_square" size="small"
						@click.prevent="handlePrint">打印</el-button>
					<el-button class="btn_square" size="small" @click.prevent="handleBack">返回</el-button>
				</div>
				<ul class="clearfix">
					<li><span class="label">头部：</span><a @click.prevent="printForm.headFs -= 3">--</a>
						<a @click.prevent="printForm.headFs--">-</a>
						<a @click.prevent="printForm.headFs++">+</a>
						<a @click.prevent="printForm.headFs += 3">++</a>
						<a @click.prevent="printForm.headFs = 54">还原</a></li>
					<li><span class="label">内容：</span><a @click.prevent="printForm.conFs -= 3">--</a>
						<a @click.prevent="printForm.conFs--">-</a>
						<a @click.prevent="printForm.conFs++">+</a>
						<a @click.prevent="printForm.conFs += 3">++</a>
						<a @click.prevent="printForm.conFs = 24">还原</a></li>
					<li><span class="label">待遇：</span><a @click.prevent="printForm.dyFs -= 3">--</a>
						<a @click.prevent="printForm.dyFs--">-</a>
						<a @click.prevent="printForm.dyFs++">+</a>
						<a @click.prevent="printForm.dyFs += 3">++</a>
						<a @click.prevent="printForm.dyFs = 24">还原</a></li>
					<li><span class="label">底部：</span><a @click.prevent="printForm.footFs -= 3">--</a>
						<a @click.prevent="printForm.footFs--">-</a>
						<a @click.prevent="printForm.footFs++">+</a>
						<a @click.prevent="printForm.footFs += 3">++</a>
						<a @click.prevent="printForm.footFs = 39">还原</a></li>
					<li><span class="label">二维码：</span><a @click.prevent="printForm.picWidth -= 3">--</a>
						<a @click.prevent="printForm.picWidth--">-</a>
						<a @click.prevent="printForm.picWidth++">+</a>
						<a @click.prevent="printForm.picWidth += 3">++</a>
						<a @click.prevent="printForm.picWidth = 210">还原</a></li>
					<li><span class="label">底部间隔：</span><a @click.prevent="printForm.footMargin -= 3">--</a>
						<a @click.prevent="printForm.footMargin--">-</a>
						<a @click.prevent="printForm.footMargin++">+</a>
						<a @click.prevent="printForm.footMargin += 3">++</a>
						<a @click.prevent="printForm.footMargin = 0">还原</a></li>
				</ul>
			</div>
			<!-- 打印样式修改 end -->
			<!-- 打印信息 -->
			<div class="poster_info clearfix">
				<!-- 单位名称 -->
				<h3 :style="{ fontSize: `${printForm.headFs}px` }"
					class="company_name color_red">{{ `${companyInfo.dwmc}` }}</h3>
				<br>
				<!-- 单位简介 -->
				<div :style="{ fontSize: `${printForm.conFs}px` }"
					class="company_profile color_blue" v-html="companyInfo.dwjj"></div>
				<!-- 职位列表 开始-->
				<br>
				<ul class="job_list">
					<li v-for="(item, index) in jobList" :key="index"
						:style="{ fontSize: `${printForm.conFs}px` }">
						<div class="float_list color_red font_bold clearfix">
							<!-- 职位名称、人数 -->
							<p v-show="item.zwmc">{{`${++index}、${item.zwmc}：`}}
								<span v-if="+item.nanrs && +item.nvrs">共{{item.zprs}}人，男性{{item.nanrs}}人，女性{{item.nvrs}}人</span>
								<span v-else-if="!+item.nanrs && +item.nvrs">女性{{item.nvrs}}人</span>
								<span v-else-if="item.zprs == -2">男性，人数不限</span>
								<span v-else-if="item.zprs == -3">女性，人数不限</span>
								<span v-else-if="+item.nanrs && !+item.nvrs">男性{{item.nanrs}}人</span>
								<span v-else-if="item.zprs > 0 && item.nanrs == 0 && item.nvrs == 0">不限男女，人数{{item.zprs}}人</span>
								<span v-else>不限男女，人数不限</span>&emsp;&emsp;</p>
							<!-- 年龄 -->
							<p v-if="item.nlq && item.nlz">{{`年龄：${item.nlq}-${item.nlz}岁`}}&emsp;&emsp;</p>
							<p v-else-if="item.nlq && !item.nlz">{{`年龄：${item.nlq}岁以上`}}&emsp;&emsp;</p>
							<!-- 学历 -->
							<p v-show="item.xlyqmc">学历：{{ `${item.xlyqmc === '其他' ? '不限' : item.xlyqmc+'以上'}` }}</p>
						</div>
						<div class="color_blue">
							<div v-show="item.zwms">职位描述：{{item.zwms}}</div>
							<div v-show="item.zwyq">职位要求：{{item.zwyq}}</div>
						</div>
						<div class="float_list color_red font_normal clearfix">
							<!-- 月薪 -->
							<span v-if="item.xzdyq && item.xzdyz" :style="{ fontSize: `${printForm.dyFs}px` }"
							>待遇：{{item.xzdyq}}-{{item.xzdyz}}元</span>
							<span v-else-if="item.xzdyq && !item.xzdyz" :style="{ fontSize: `${printForm.dyFs}px` }"
							>待遇：{{item.xzdyq}}元以上</span>
							<span v-else-if="!item.xzdyq && item.xzdyz" :style="{ fontSize: `${printForm.dyFs}px` }"
							>待遇：{{item.xzdyz}}元以下</span>
							<span v-else :style="{ fontSize: `${printForm.dyFs}px` }">待遇：不限</span>
							<!-- 试用期 -->
							<span v-show="item.syq">&emsp;&emsp;试用期：{{item.syq}}</span>
							<span v-show="item.syqgz">&emsp;&emsp;试用期工资：{{item.syqgz}}</span>
							<!-- 是否双休 -->
							<!-- <span v-show="item.sfsx">&emsp;&emsp;是否双休：{{item.sfsx === '1' ? '是' : '否'}}</span> -->
							<span v-if="item.sfsx === '1'">&emsp;&emsp;双休</span>
							<!-- 福利 -->
							<span v-show="item.fldy">&emsp;&emsp;福利：{{item.fldy}}</span>
						</div>
					</li>
				</ul>
				<!-- 职位列表 end -->
				<br>
				<!-- 底部 -->
				<div :style="{
					fontSize: `${printForm.footFs}px`,
					marginTop: `${printForm.footMargin}px` }">
					<div class="float_list clearfix">
						<p v-show="companyInfo.lxr">联系人：{{companyInfo.lxr}}&emsp;&emsp;</p>
						<p v-show="companyInfo.lxfs">联系电话：{{companyInfo.lxfs}}&emsp;&emsp;</p>
						<p v-show="companyInfo.lxdz">联系地址：{{companyInfo.lxdz}}</p>
					</div>
					<div v-show="companyInfo.bz" v-html="replaceBr('备注：' + companyInfo.bz)"></div>
				</div>
				<div class="po_r" :style="{height: `${printForm.picWidth}px`}">
					<!-- 二维码 -->
					<div class="qrCode">
						<img :src="companyInfo.ewm" :style="{
							width: `${printForm.picWidth}px`,
							height: `${printForm.picWidth}px`}">
					</div>
					<div :style="{marginRight: `${printForm.picWidth}px`}">
						<input
							class="closing_date"
							:class="{on: isFocusDate}"
							v-model="closingDate" :style="{
							fontSize: `${printForm.footFs}px`,
							marginTop: `${printForm.picWidth / 2 - printForm.footFs / 2}px`}"
							@focus="isFocusDate = true"
							@blur="isFocusDate = false"></div>
				</div>
			</div>
		</el-dialog>
		<!-- 打印dialog 结束 -->
	</div>
</template>
<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import $ from '@/common/js/axios';
import dateAss from '@/common/vue/dateAss';
import { dateZero, dateFormat, getBtnsRight, replaceBlank } from '@/common/js/utils';

export default {
	name: 'bussWeiTuo',
	components: { dateAss },
	data() {
		return {
			labelWidth,
			colorOn,
			colorOff,
			// =======================> 主查询开始
			loading: false,
			form: {
				blsjq: '',
				blsjz: '',
				dwmc: '',
				wgzt: '',
				sczpjzzt: '',
				pageNum: 1
			},
			formRight: {},
			rules: {
				dwmc: [{ validator: validator('64, " less", "单位名称", true') }]
			},
			results: [],
			formTotal: 0,
			// =========================> 转移单查询
			formExchange: {
				zprq: new Date(),
				pageNum: 1
			},
			rulesExchange: {
				zprq: [{ required: true, message: '招聘日期不能为空' }]
			},
			dialogExchange: false,
			loadingExchange: false,
			resultsExchange: [],
			formExchangeTotal: 0,
			// ==========================> 到期列表查询
			formExpire: {
				dqsjq: new Date(),
				dqsjz: '',
				pageNum: 1
			},
			rulesExpire: {
				dqsjq: [{ required: true, message: '开始时间不能为空' }],
				dqsjz: [{ required: true, message: '结束时间不能为空' }]
			},
			dialogExpire: false,
			loadingExpire: false,
			resultsExpire: [],
			formExpireTotal: 0,
			// =========================> 打印文稿
			posterVisible: false,
			// 打印信息
			companyInfo: {},
			jobList: [],
			// 字体大小
			printForm: {
				headFs: 54,
				conFs: 24,
				dyFs: 24,
				footFs: 24,
				// phoneFs: 39,
				picWidth: 200,
				footMargin: 0
			},
			// 按钮权限
			btns: {},
			// 打印页面onfocus状态
			isFocusDate: false,
			closingDate: ''
		};
	},
	computed: {
		// 到期日期开始时间处理
		pickerBegin() {
			if (this.formExpire.dqsjz) {
				const end = new Date(this.formExpire.dqsjz);
				return {
					disabledDate(time) {
						return time.getTime() < end.getTime() - (14 * 8.64E7) ||
						time.getTime() > end.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		},
		// 到期日期结束时间处理
		pickerEnd() {
			if (this.formExpire.dqsjq) {
				const begin = dateZero(this.formExpire.dqsjq);
				return {
					disabledDate(time) {
						return time.getTime() > begin.getTime() + (14 * 8.64E7) ||
						time.getTime() < begin.getTime();
					}
				};
			}
			return {
				disabledDate() {
					return false;
				}
			};
		}
	},
	methods: {
		// 弹窗重置
		resetFn(formName, showLevel) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this[showLevel] = false;
		},
		// ==================> 查询
		// 查询按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/wtzp/wthbdylbCx', {
				params: this.formRight
			}).then((res) => {
				this.results = res.returnData.wtzplb;
				this.formTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ========================> 文稿类型状态修改
		// 修改文稿状态
		switchState(row) {
			this.$nextTick(() => {
				if (row.switchState === undefined) {
					this.$set(row, 'switchState', true);
				}
				row.switchState = true;
				$.put('/gyrcht/ywgl/xczpdy/wbztXg', { dd_id: row.dd_id, wgzt: row.wgzt })
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '文稿状态变更成功！',
							onClose: () => {
								row.switchState = false;
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
						row.switchState = false;
					}
				}).catch(() => {
					row.switchState = false;
				});
			});
		},
		// =======================> 招聘简章状态修改
				// 修改招聘简章状态
		switchDocState(row) {
			this.$nextTick(() => {
				if (row.switchDocState === undefined) {
					this.$set(row, 'switchDocState', true);
				}
				row.switchDocState = true;
				$.put('/gyrcht/ywgl/wtzp/zpjzXg', {
					dwxx_id: row.dwxx_id,
					zplx: '03',
					zph_id: row.wtzwyd_id,
					sczpjzzt: row.zpjzzt
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '招聘简章状态修改成功！',
							onClose: () => {
								row.switchDocState = false;
							}
						});
					} else {
						this.$message.error(res.returnData.message);
						row.switchDocState = false;
					}
				}).catch(() => {
					row.switchDocState = false;
				});
			});
		},
		// =======================> table，按钮
		// 编辑简介，并传递dwxx_id
		editIndroduction(row) {
			this.$router.push({
				name: 'bussIntroduction',
				params: {
					coName: row.dwmc,
					id: row.dwxx_id,
					parentName: 'bussWeiTuo'
				}
			});
		},
		// 发布职位，传递dwxx_id以单位的身份去操作职位，type=03为委托招聘
		jobPublish(row) {
			this.$router.push({
				name: 'bussWeituoJob',
				params: {
					companyId: row.dwxx_id,
					yhId: row.yh_id,
					zphId: row.wtzwyd_id,
					coName: row.dwmc
				}
			});
		},
		// =======================> 到期列表查询
		// 到期列表 按钮
		btnExpire() {
			this.dialogExpire = true;
		},
		// 导出到期列表
		exportDoc() {
			const begin = this.formExpire.dqsjq;
			const end = this.formExpire.dqsjz;
			const url = `/gyrcht/ywgl/wtzp/dqlbdcCx?dqsjq=${dateFormat(begin)}&dqsjz=${dateFormat(end)}`;
			window.open(url);
		},
		// 查询按钮handle
		submitFormExpire(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.formExpire.pageNum = 1;
					this.getDataExpire();
				}
			});
		},
		// 查询到期列表 接口
		getDataExpire() {
			this.loadingExpire = true;
			$.get('/gyrcht/ywgl/wtzp/dqlbCx', {
				params: this.formExpire
			}).then((res) => {
				this.loadingExpire = false;
				this.resultsExpire = res.returnData.dqwtzpjllb;
				this.formExpireTotal = +res.rowsCount;
			}).catch(() => {
				this.loadingExpire = false;
			});
		},
		// ========================> 打印文稿
		// 点击打印文稿
		EditPrint(row) {
			setTimeout(() => {
				this.printForm.headFs = 54;
				this.printForm.conFs = 24;
				this.printForm.dyFs = 24;
				this.printForm.footFs = 24;
				this.printForm.picWidth = 200;
				this.printForm.footMargin = 0;
				this.getPosterInfo(row);
			}, 5);
			this.posterVisible = true;
		},
		// 获取打印信息
		getPosterInfo(row) {
			$.get('/gyrcht/ywgl/wtzp/dywgCx', {
				params: {
					dwxx_id: row.dwxx_id,
					wtzwyd_id: row.wtzwyd_id
				}
			}).then((res) => {
				const data = res.returnData;
				this.jobList = data.zwxxlb;
				this.companyInfo = data.dwxx;
				this.closingDate = `截止日期：${this.companyInfo.zwjsrq}`;
				this.companyInfo.dwjj = this.companyInfo.dwjj.split('\n').join('<br>');
			}).catch(() => { });
		},
		replaceBr(str) {
			return replaceBlank(str);
		},
		// dialog点击打印
		handlePrint() {
			window.print();
		},
		// dialog点击返回
		handleBack() {
			this.posterVisible = false;
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
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

<style lang="less" scoped>
// 顶部工具栏
.toolbar {
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select: none;
	position: fixed;
	top: 0;
	right: 20px;
	width: 100%;
	z-index: 6;
	border-bottom: 1px solid #dfdfdf;
	border-right: 1px solid #dfdfdf;
	background: #fafafa;
	font-size: 16px;
	box-sizing: border-box;
	.btn_text {
		float: left;
		width: 20%;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}
}
.toolbar > ul {
	width: 80%;
	float: left;
	> li {
		float: left;
		height: 30px;
		line-height: 30px;
		.label {
			display: inline-block;
			color: #8c8c8c;
			text-align: right;
			width: 90px;
		}
		a {
			font-weight: bold;
			&:hover {
				color: #ff0000;
				text-decoration: underline;
				font-weight: bold;
			}
		}
	}
}
// 海报信息
.poster_info {
	width: 100%;
	margin-top: 90px;
	box-sizing: border-box;
	padding: 0 20px 30px;
	word-wrap: break-word;
	color: #000;
	h3 {
		font-family: "Simhei";
	}
	div, p, span {
		font-family: "SimSun";
	}
	// 单位名称
	.company_name {
		font-weight: bold;
		text-align: center;
		color: #ff0000;
	}
	// 单位简介
	.company_profile {
		font-family: Verdana;
	}
	// 职位列表
	.job_list > li {
		font-weight: 600;
		margin-bottom: 20px;
	}
	// 联系方式
	.float_list > p {
		float: left;
	}
	// 二维码
	.qrCode {
		position: absolute;
		right: 0;
		bottom: 0;
	}
}
.color_red {
	color: #ff0000;
}
.color_blue {
	color: #3343ff;
}
// 截止日期输入框
.closing_date {
	box-sizing: border-box;
	width: 100%;
	margin: 0;
	outline: 0;
	border: 1px solid #fff;
	text-align: right;
}
.closing_date.on {
	border: 1px solid #3343ff;
}
</style>
