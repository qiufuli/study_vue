<docs>
	## 业务办理---现场招聘海报打印
	* @date ###### Wed Aug 30 11:27:36 CST 2017
	* @author jinglf000
	* @desc 现场招聘海报打印，首先查询现场招聘会，然后定位到某个单位
	然后就可以对单位进行操作，包括发布职位草稿，查询已发布的职位，打印海报，查询转移单记录。

	## 页面跳转---跳转到现场招聘职位录入页面，携带的参数有：
	* (为保持统一，使用后台接口约定的格式）只不过改成了驼峰
	* dwxxId 单位信息id dwxx_id
  * yhId 用户id yh_id
</docs>
<template>
	<div>
		<!-- 查询开始 -->
		<div class="query_wrap">
			<el-form :model="form" :rules="rules" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="zphrq" label="招聘日期">
							<el-date-picker v-model="form.zphrq"
								:editable="false" class="date_picker"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="dwmc" label="单位名称">
							<el-input v-model="form.dwmc" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="wgzt" label="文稿状态">
							<el-select v-model="form.wgzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="未打印" value="0"></el-option>
								<el-option label="已打印" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="sczpjzzt" label="生成招聘简章状态" class="mulitfix">
							<el-select v-model="form.sczpjzzt">
								<el-option label="全部" value=""></el-option>
								<el-option label="未提交" value="0"></el-option>
								<el-option label="已提交" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item>
						<el-row>
							<el-col :span="12">
								<el-button native-type="submit" type="primary" :loading="loading"
									@click.prevent="submitForm('queryForm')">查询</el-button>
								<el-button @click="resetForm('queryForm')">重置</el-button>
							</el-col>
							<el-col v-show="btns.xczyd"
								:span="12" class="align_right">
								<el-button type="primary" class="btn_square" icon="my-move"
									@click="btnExchange" :loading="loading">转移单</el-button>
							</el-col>
						</el-row>
					</el-form-item>
				</el-row>
			</el-form>
		</div>
		<!-- 查询结束 -->
		<!-- 查询结果开始 -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" class="table_wrap" stripe @cell-click="typeChange">
					<el-table-column label="序号" type="index" width="90"></el-table-column>
					<el-table-column label="展位号" prop="zw" min-width="130"></el-table-column>
					<el-table-column label="单位名称" prop="dwmc" min-width="180"></el-table-column>
					<el-table-column label="发送文稿形式" prop="wglxmc" min-width="110">
						<template scope="state">
							<span :class="[ state.row.wglx === '10' ? 'color_gray' : 'color_anchor']">{{ state.row.wglxmc }}</span>
						</template>
					</el-table-column>
					<el-table-column label="文稿状态" prop="wgzt" min-width="130">
						<template scope="ele">
							<el-switch v-model="ele.row.wgzt" :width="74"
								on-value="1" on-text="已打印" :on-color="color.on"
								off-value="0" off-text="未打印" :off-color="color.off"
								:disabled="btns.xcwgzt === false || ele.row.switchState"
								@change="switchState(ele.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="招聘简章状态" prop="zpjzzt" min-width="130">
						<template scope="ele2">
							<el-switch v-model="ele2.row.zpjzzt" :width="74"
								on-value="1" on-text="已提交" :on-color="color.on"
								off-value="0" off-text="未提交" :off-color="color.off"
								:disabled="btns.xcjzzt === false || ele2.row.switchDocState"
								@change="switchDocState(ele2.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="文稿发送人" prop="jbr" min-width="130"></el-table-column>
					<el-table-column label="文稿发送电话" prop="jbrlxdh" min-width="130"></el-table-column>
					<el-table-column label="办理人" prop="cjr"></el-table-column>
					<el-table-column label="操作" width="200" fixed="right">
						<template scope="ele3">
							<el-button
								:disabled="btns.xcjjlr === false"
								type="primary" size="mini" title="录入简介" icon="edit"
								@click="editIndroduction(ele3.row)"></el-button>
							<el-button
								:disabled="btns.xcdywg === false"
								type="primary" size="mini" title="打印文稿" class="icon-print iconfont"
								@click="EditPrint(ele3.row)"></el-button>
							<el-button
								:disabled="btns.xczwlr === false"
								type="primary" size="mini" title="职位" class="icon-job iconfont"
								@click="jobPublish(ele3.row)"></el-button>
							<el-button
								:disabled="btns.xczwlr === false"
								icon="message" type="warning" title="发送短信" size="mini"
								@click="msgPost(ele3.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- <div class="pagination_wrap" v-show="results.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="formTotal"
						:page-size="formRight.pageSize"
						:current-page.sync="formRight.pageNum"
						@current-change="getData"></el-pagination>
				</div> -->
			</div>
		</div>
		<!-- 查询结果结束 -->
		<!-- 修改文稿类型 dialog开始 -->
		<el-dialog size="tiny" :visible.sync="dialogType" title="修改发送文稿形式">
			<el-radio-group v-model="formType.wglx">
				<el-radio v-for="(item, index) in types" :key="index" :label="item.dmid">{{item.dmmc}}</el-radio>
			</el-radio-group>
			<div class="footer" slot="footer">
				<el-button @click="dialogType = false">取消</el-button>
				<el-button @click="dialogTypeSubmit" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改文稿类型 dialog结束 -->
		<!-- 转移单dialog 开始 -->
		<el-dialog :visible.sync="dialogExchange" title="转移单查询"
			@close="resetFn('formExchange', 'dialogExchange')">
			<!-- 转移单查询 开始 -->
			<el-form :label-width="labelWidth" :model="formExchange" :rules="rulesExchange"
				ref="formExchange">
				<el-row>
					<el-col :span="12">
						<el-form-item prop="zprq" label="招聘日期">
							<el-date-picker v-model="formExchange.zprq"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="">
							<el-button type="primary" size="small" icon="search"
								native-type="submit" :loading="loadingExchange" class="no_radius"
								@click.prevent="submitFormExchange('formExchange')">查询</el-button>
							<el-button
								type="primary" icon="btn-download" size="small"
								class="no_radius" :loading="loadingExchange"
								@click="exportDoc">导出</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- 转移单查询 结束 -->
			<!-- 查询结果 开始 -->
			<div class="loading" v-loading="loadingExchange">
				<el-table :data="resultsExchange" stripe class="table_wrap">
					<el-table-column label="单位名称" prop="dwmc" min-width="200"></el-table-column>
					<el-table-column label="本次展位号" prop="bczwh"></el-table-column>
					<el-table-column label="下次展位号" prop="xczwh"></el-table-column>
				</el-table>
				<div class="pagination_wrap" v-show="resultsExchange.length > 0">
					<el-pagination
						layout="total,prev,pager,next,jumper"
						:total="formExchangeTotal"
						:current-page.sync="formExchange.pageNum"
						@current-change="getDataExchange"></el-pagination>
				</div>
			</div>
			<!-- 查询结果 结束 -->
		</el-dialog>
		<!-- 转移单dialog 结束 -->
		<!-- 打印dialog 开始 -->
		<el-dialog :visible.sync="posterVisible" size="full" :show-close="false" class="print_wrap">
			<!-- 打印样式修改 start -->
			<div class="toolbar noprint">
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
						<a @click.prevent="printForm.footFs = 24">还原</a></li>
					<li><span class="label">联系电话：</span><a @click.prevent="printForm.phoneFs -= 3">--</a>
						<a @click.prevent="printForm.phoneFs--">-</a>
						<a @click.prevent="printForm.phoneFs++">+</a>
						<a @click.prevent="printForm.phoneFs += 3">++</a>
						<a @click.prevent="printForm.phoneFs = 39">还原</a></li>
					<li><span class="label">二维码：</span><a @click.prevent="printForm.picWidth -= 3">--</a>
						<a @click.prevent="printForm.picWidth--">-</a>
						<a @click.prevent="printForm.picWidth++">+</a>
						<a @click.prevent="printForm.picWidth += 3">++</a>
						<a @click.prevent="printForm.picWidth = 180">还原</a></li>
					<li><span class="label">底部间隔：</span><a @click.prevent="printForm.footMargin -= 3">--</a>
						<a @click.prevent="printForm.footMargin--">-</a>
						<a @click.prevent="printForm.footMargin++">+</a>
						<a @click.prevent="printForm.footMargin += 3">++</a>
						<a @click.prevent="printForm.footMargin = 0">还原</a></li>
				</ul>
			</div>
			<!-- 打印样式修改 end -->
			<!-- 打印信息 -->
			<div class="poster_info clearfix" id="print">
				<!-- 单位名称 -->
				<h3 :style="{ fontSize: `${printForm.headFs}px` }"
					class="company_name color_red">{{ `${companyInfo.dwmc}` }}</h3>
				<br>
				<!-- 单位简介 -->
				<div :style="{ fontSize: `${printForm.conFs}px` }"
					class="company_profile color_blue" v-html="companyInfo.dwjj"></div>
				<br>
				<!-- 职位列表 start-->
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
					<p>
						<span v-show="companyInfo.zphrq">招聘会日期：{{ companyInfo.zphrq }}、</span>
						<span v-show="companyInfo.zphzwbh">招聘会展位编号：{{ companyInfo.zphzwbh }}。</span>
					</p>
					<p>应聘人员注意：请认真填写《贵阳市人力资源市场人才推荐表》参加面试。</p>
					<p class="color_red">用人单位注意：请妥善保管随身物品及招聘相关资料，以免带来不便。</p>
					<p v-show="companyInfo.lxfs"
						:style="{ fontSize: `${printForm.phoneFs}px` }"
						class="color_blue">联系电话：{{ companyInfo.lxfs }}</p>
				</div>
				<!-- 二维码 -->
				<div class="qrCode">
					<img :src="companyInfo.ewm"
						:style="{
							width: `${printForm.picWidth}px`,
							height: `${printForm.picWidth}px` }">
					<p :style="{fontSize: `${printForm.picWidth/10}px`}">单位首页</p>
				</div>
				<!-- <div class="qrCode">
					<img :src="companyInfo.zphewm"
						:style="{
							width: `${printForm.picWidth}px`,
							height: `${printForm.picWidth}px` }">
					<p :style="{fontSize: `${printForm.picWidth/10}px`}">现场招聘</p>
				</div> -->
			</div>
		</el-dialog>
		<!-- 打印dialog 结束 -->
		<!-- 发送短信 开始 -->
		<el-dialog title="发送短信" :visible.sync="visibleMsg" size="tiny"
			@close="diaMsgCancel('formMsg')">
			<el-form :model="formMsg" :label-width="labelWidth" :rules="rulesMsg"
				ref="formMsg">
				<el-form-item label="短信内容" prop="fsnr" required>
					<el-input v-model="formMsg.fsnr" type="textarea" :autosize="{ minRows: 2}"></el-input>
				</el-form-item>
			</el-form>
			<div class="footer" slot="footer">
				<el-button @click="diaMsgCancel('formMsg')">取消</el-button>
				<el-button type="primary" @click="diaMsgSubmit('formMsg')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 发送短信 结束 -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import { dateFormat, getBtnsRight, replaceBlank } from '@/common/js/utils';

export default {
	name: 'bussXianChang',
	data() {
		return {
			// 按钮权限
			btns: {},
			// 全局统一变量
			labelWidth,
			color: {
				on: colorOn,
				off: colorOff
			},
			// =====================> 现场招聘海报查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				zphrq: new Date(),
				dwmc: '',
				wgzt: '',
				sczpjzzt: '',
				pageNum: 1,
				pageSize: 5000
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 校验规则
			rules: {
				zphrq: [{ required: true, message: '招聘日期不能为空' }],
				dwmc: [{ validator: validator('64, "less", "单位名称", true') }]
			},
			// 查询结果
			results: [],
			// 总数
			formTotal: 0,
			// =========================> 文档类型修改
			types: [],
			formType: {
				dd_id: '',
				wglx: ''
			},
			dialogType: false,
			// =========================> 转译单查询
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
			// =========================> 打印文稿
			posterVisible: false,
			// 打印信息
			companyInfo: {},
			jobList: [],
			// 字体大小
			printForm: {
				headFs: 104,
				conFs: 24,
				dyFs: 24,
				footFs: 24,
				phoneFs: 39,
				picWidth: 200,
				footMargin: 0
			},
			// 发送短信
			visibleMsg: false,
			formMsg: {
				yh_idlb: [],
				fsnr: ''
			},
			rulesMsg: {
				fsnr: [{ validator: validator('256, "bz", "发送内容", false') }]
			}
		};
	},
	methods: {
		// 弹窗重置
		resetFn(formName, showLevel) {
			setTimeout(() => {
				this.$refs[formName].resetFields();
			}, 5);
			this[showLevel] = false;
		},
		// ========================> 现场招聘海报查询
		// 提交表单查询
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
		// 表单查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/xczpdy/xchbdylbCx', {
				params: this.formRight
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.xczplb;
				this.formTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// ========================> 文稿类型状态修改
		// 获取文稿类型
		getDataType() {
			const name = 'gyrlzyw_qzzp_d_wglx';
			$.get('/common/dmbcx/dmb/dmbxxCx', {
				params: { dmbm: name }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.types = res.returnData[name];
				}
			}).catch(() => { });
		},
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
							this.$message.error(res.returnData.message);
							row.switchState = false;
						}
					}).catch(() => {
						row.switchState = false;
					});
			});
		},
		// 修改招聘简章状态
		switchDocState(row) {
			this.$nextTick(() => {
				if (row.switchDocState === undefined) {
					this.$set(row, 'switchDocState', true);
				}
				row.switchDocState = true;
				$.put('/gyrcht/ywgl/wtzp/zpjzXg', {
					dwxx_id: row.dwxx_id,
					zplx: '02',
					zph_id: row.zph_id,
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
		// 表格点击事件，用于处理类型
		typeChange(row, column) {
			// 判断是否为文档管理
			if (this.btns.xcwgxs === true && column.property === 'wglxmc' && row.wglx !== '10') {
				this.dialogType = true;
				this.formType.wglx = row.wglx;
				this.formType.dd_id = row.dd_id;
			}
		},
		// 文档类型变更保存
		dialogTypeSubmit() {
			this.dialogType = false;
			$.put('/gyrcht/ywgl/xczpdy/wbxsXg', this.formType).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('文档类型变更成功');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => { });
		},
		// =======================> 转移单查询
		// 转移单按钮
		btnExchange() {
			this.getDataExchange();
			this.dialogExchange = true;
		},
		// 查询按钮
		submitFormExchange(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.formExchange.pageNum = 1;
					this.getDataExchange();
				}
			});
		},
		// 查询接口
		getDataExchange() {
			this.loadingExchange = true;
			$.get('/gyrcht/ywgl/xczpdy/zydCx', {
				params: this.formExchange
			}).then((res) => {
				this.resultsExchange = res.returnData.zwxxlb;
				this.formExchangeTotal = +res.rowsCount;
				this.loadingExchange = false;
			}).catch(() => {
				this.loadingExchange = false;
			});
		},
		// 导出
		exportDoc() {
			const url = `/gyrcht/ywgl/xczpdy/zyddcCx?zprq=${dateFormat(this.formExchange.zprq)}&pageSize=${this.formExchangeTotal}`;
			window.open(url);
		},
		// =======================> 编辑简介，并传递dwxx_id
		editIndroduction(row) {
			this.$router.push({
				name: 'bussIntroduction',
				params: {
					coName: row.dwmc,
					id: row.dwxx_id,
					parentName: 'bussXianChang'
				}
			});
		},
		// 发布职位，传递dwxx_id以单位的身份去操作职位，type=02为现场招聘，附带把yhid传递过去
		jobPublish(row) {
			this.$router.push({
				name: 'bussXianChangJob',
				params: {
					companyId: row.dwxx_id,
					yhId: row.yh_id,
					zphrq: this.formRight.zphrq,
					zphId: row.zph_id,
					coName: row.dwmc
				}
			});
		},
		// ========================> 打印文稿
		// 点击打印文稿
		EditPrint(row) {
			this.getPosterInfo(row);
			// setTimeout(() => {
			// 	this.getPosterInfo(row);
			// }, 5);
			this.posterVisible = true;
		},
		// 获取打印信息
		getPosterInfo(row) {
			$.get('/gyrcht/ywgl/xczpdy/dywgCx', {
				params: {
					dwxx_id: row.dwxx_id,
					zph_id: row.zph_id
				}
			}).then((res) => {
				this.paperHeight = 3500;
				this.paperWidth = 2500;

				this.printForm.headFs = 104;
				this.printForm.conFs = 24;
				this.printForm.dyFs = this.printForm.conFs;
				this.printForm.footFs = this.printForm.conFs;
				this.printForm.phoneFs = this.printForm.conFs;
				this.printForm.picWidth = 250;
				this.printForm.footMargin = 0;

				this.jobList = res.returnData.zwxxlb;

				this.companyInfo = res.returnData.dwxx;
				this.companyInfo.dwjj = this.companyInfo.dwjj.split('\n').join('<br>');

				this.printForm.headFs = this.paperWidth / this.companyInfo.dwmc.length;
				this.issamllfirst = true;
				/* eslint-disable no-constant-condition */
				while (true) {
					this.sumHeight = 0;
					this.sumLow = 0;
					this.sumLow = this.jobList.length * 2;
					this.sumLow += Math.ceil((this.companyInfo.dwjj.length * this.printForm.conFs) /
					this.paperWidth);
					for (this.i = 0; this.i < this.jobList.length; this.i++) {
						this.sumLow += Math.ceil((this.jobList[this.i].zwyq.length * this.printForm.conFs) /
						this.paperWidth);
						this.sumLow += Math.ceil((this.jobList[this.i].zwms.length * this.printForm.conFs) /
						this.paperWidth);
					}
					this.sumHeight = (this.sumLow * this.printForm.conFs) + 500;

					if (this.sumHeight < this.paperHeight) {
						if (this.printForm.conFs > 80) {
							break;
						}
						if (!this.issamllfirst) {
							this.printForm.conFs = this.printForm.conFs * 1.02;
							this.printForm.dyFs = this.printForm.conFs;
							this.printForm.footFs = this.printForm.conFs;
							this.printForm.phoneFs = this.printForm.conFs;
							break;
						}
						this.printForm.conFs = this.printForm.conFs * 1.02;
						this.printForm.dyFs = this.printForm.conFs;
						this.printForm.footFs = this.printForm.conFs;
						this.printForm.phoneFs = this.printForm.conFs;
						this.issamllfirst = true;
					}
					if (this.sumHeight > this.paperHeight) {
						if (this.printForm.conFs < 12) {
							break;
						}
						if (this.issamllfirst) {
							this.printForm.conFs = this.printForm.conFs / 1.02;
							this.printForm.dyFs = this.printForm.conFs;
							this.printForm.footFs = this.printForm.conFs;
							this.printForm.phoneFs = this.printForm.conFs;
							break;
						}
						this.printForm.conFs = this.printForm.conFs / 1.02;
						this.islargefrist = false;
						this.printForm.dyFs = this.printForm.conFs;
						this.printForm.footFs = this.printForm.conFs;
						this.printForm.phoneFs = this.printForm.conFs;
					}

					// this.printForm.conFs = this.printForm.conFs * 0.9;
					// this.printForm.dyFs = this.printForm.conFs;
					// this.printForm.footFs = this.printForm.conFs;
				}
			}).catch(() => { });
		},
		replaceBr(str) {
			return replaceBlank(str);
		},
		// dialog点击打印
		handlePrint() {
			const subOutputRankPrint = document.getElementById('print');
			const newContent = subOutputRankPrint.innerHTML;
			const oldContent = document.body.innerHTML;
			document.body.innerHTML = newContent;
			window.print();
			window.location.reload();
			document.body.innerHTML = oldContent;
			return false;
			// window.print();
		},
		// dialog点击返回
		handleBack() {
			this.posterVisible = false;
		},
		// ==================================> 发送短信
		msgPost(row) {
			setTimeout(() => {
				this.formMsg.yh_idlb = [{ yh_id: row.yh_id, sjh: row.jbrlxdh }];
			}, 5);
			this.visibleMsg = true;
		},
		diaMsgCancel(formName) {
			this.visibleMsg = false;
			this.$refs[formName].resetFields();
		},
		diaMsgSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('确定发送短信？', '确认', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.postDataMsg();
						this.resetFn(formName, 'visibleMsg');
					}).catch(() => {});
				}
			});
		},
		// 发送接口
		postDataMsg() {
			const data = {
				yh_idlb: this.formMsg.yh_idlb,
				fsnr: this.formMsg.fsnr
			};
			$.post('/gyrcht/ywgl/xczpdy/fsdxBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('短信发送成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		}
	},
	created() {
		// 克隆查询表单
		Object.assign(this.formRight, this.form);
		// 查询文稿类型
		this.getDataType();
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
		float: right;
		p {
			margin-top: 5px;
			font-weight: 600;
			text-align: center;
		}
	}
}
.color_red {
	color: #ff0000;
}
.color_blue {
	color: #3343ff;
}
.color_anchor{
	cursor: pointer;
}
.color_gray{
	color:#ccc;
}
</style>
