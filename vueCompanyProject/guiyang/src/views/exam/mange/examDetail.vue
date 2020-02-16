<docs>
	## 考试管理---考试管理，发布考试详情
	* 时间控件：计算属性将双向数据的毫秒数存入timeArr（阶梯数组）中，获取焦点时更新当前控件禁用范围。
</docs>

<template>
<div class="detail_wrap">
	<bread-crumb></bread-crumb>
	<el-tabs v-model="tabOn">
		<!-- 基本信息  start-->
		<el-tab-pane label="基本信息" name="baseInfo" disabled>
			<el-form :model="form" label-width="130px" :rules="rules" v-loading="loading"
				ref="formInfo">
				<el-row>
					<el-col :span="8">
						<el-form-item label="考试类型" prop="kslx">
							<el-button-group>
								<el-button :type="form.kslx==='20' ? '' : 'primary'" @click="changeKslx('1')">需分考场的考试</el-button>
								<el-button :type="form.kslx==='20' ? 'primary' : ''" @click="changeKslx('2')">只需报名的考试</el-button>
							</el-button-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="考试名称" prop="ksmc" required>
							<el-input v-model="form.ksmc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="考试分类" prop="ksfl" required>
							<select-code v-model="form.ksfl" code="gyrlzyw_bkxt_d_ksfl"
									:has-all="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="报名时间" required>
							<el-col :span="11">
								<el-form-item label="" prop="bmkssj" class="is-required">
									<el-date-picker v-model="form.bmkssj"
										class="width_100" :editable="false" placeholder="开始" type="datetime"
										@focus="selectDatePicker(0)" @change="changeTime"
										:picker-options="timeRange" :clearable="true"
										:default-value="defaultExam" :popper-class="noTime"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item label="" prop="bmjssj" class="is-required">
									<el-date-picker v-model="form.bmjssj"
										class="width_100" :editable="false" placeholder="结束" type="datetime"
										@focus="selectDatePicker(1)" @change="changeBmjssj"
										:picker-options="timeRange"
										:default-value="defaultExam" :popper-class="noTime"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核截止时间" prop="shjssj" class="is-required">
							<el-date-picker v-model="form.shjssj"
								class="width_100" :editable="false" placeholder="结束" type="datetime"
								@focus="selectDatePicker(2)"  @change="changeShjssj"
								:picker-options="timeRange" :default-value="defaultExam"
								:popper-class="noTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否需要缴费" prop="sfjf" :required="form.kslx==='10'">
							<el-switch v-model="form.sfjf" :disabled="form.kslx==='20'"
								:on-color="color.on" :off-color="color.off" on-value="1"
								off-value="0" on-text="是" off-text="否"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="缴费金额" prop="jfje" :class="[isPay ? 'isrequired' : 'requst_val' ]">
							<el-input v-model="form.jfje" :disabled="form.sfjf !== '1'"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="缴费截止时间" prop="jfjssj" :class="[isPay ? 'isrequired' : 'requst_val' ]">
							<el-date-picker v-model="form.jfjssj" :disabled="form.sfjf !== '1'"
								class="width_100" :editable="false" placeholder="结束" type="datetime"
								@focus="selectDatePicker(3)"  @change="changeJfjssj"
								:picker-options="timeRange" :default-value="defaultExam"
								:popper-class="noTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-form-item label="打印准考证时间" :class="form.kslx==='20' ? '' : 'is-required'">
							<el-col :span="11">
								<el-form-item label="" prop="dyzkzkssj" class="is-required">
									<el-date-picker v-model="form.dyzkzkssj" :disabled="form.kslx==='20'"
										class="width_100" :editable="false" placeholder="开始" type="datetime"
										@focus="selectDatePicker(4)" @change="changeDykssj"
										:picker-options="timeRange" :default-value="defaultExam"
										:popper-class="noTime"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item label="" prop="dyzkzjssj" class="is-required">
									<el-date-picker v-model="form.dyzkzjssj" :disabled="form.kslx==='20'"
										class="width_100" :editable="false" placeholder="结束" type="datetime"
										@focus="selectDatePicker(5)" @change="changeDyjssj"
										:picker-options="timeRange" :default-value="defaultExam"
										:popper-class="noTime"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="查询成绩开始时间" prop="cxcjkssj" :required="form.kslx==='10'">
							<el-date-picker v-model="form.cxcjkssj" :disabled="form.kslx==='20'"
								class="width_100" :editable="false" placeholder="开始" type="datetime"
								@focus="selectDatePicker(6)" @change="changeJkjssj"
								:picker-options="timeRange" :default-value="defaultExam"
								:popper-class="noTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- <el-row>
					<el-col :span="6">
						<el-form-item label="考试宣传图" prop="ksxctlj" class="is-required">
							<upload-img :uploadPic="canUpload"
								:downloadPic="canDownload"
								modeName="bkxct"
								:maxSize="500"
								:clientName.sync="form.ksxctkhdmc"
								:serverPath.sync="form.ksxctlj"
								:serverName.sync="form.ksxctfwdmc"></upload-img>
						</el-form-item>
					</el-col>
				</el-row> -->
				<el-row>
					<el-col>
						<el-form-item label="是否上传身份证" prop="sfscsfz"
							label-width="130px" required class="btn_switch">
							<el-switch v-model="form.sfscsfz"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"></el-switch>
						</el-form-item>
						<el-form-item label="是否上传学位证" prop="sfscxwz"
							label-width="130px" required class="btn_switch">
							<el-switch v-model="form.sfscxwz"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"></el-switch>
						</el-form-item>
						<el-form-item label="是否上传毕业证或就业推荐表" prop="sfscbyzhjytjb"
							label-width="210px" required class="btn_switch">
							<el-switch v-model="form.sfscbyzhjytjb"
								on-value="1" on-text="是" :on-color="color.on"
								off-value="0" off-text="否" :off-color="color.off"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23">
						<el-form-item label="简章内容" prop="jznr" class="is-required">
							<vueUEditor @ready="editor" :defaultValue="form.jznr"
							:ueditorConfig="uEditorConfig"></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label="附件上传" label-width="12.5%">
							<el-upload
								ref="upload"
								action="/common/wjsc/wjsc/affixUpload?modeName=bkfj"
								:show-file-list="false"
								:on-success="uploadSuccess"
								:before-upload="beforeUpload"
								>
								<!-- 是否自动上传 -->
								<!-- :auto-upload="false" -->
								<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
								<div class="prompt_text">友情提示：支持word/excel/pdf/txt文件，大小不超过500kb，可传多份</div>
							</el-upload>
							<ul class="file_list">
								<li v-for="(item, index) in form.fjxx" :key="index">
									<a class="file_name" :download="item.cname">
										<!-- :href="`${item.lj}${item.sname}`" -->
										<i class="el-icon-document"></i>
										<span>{{ item.cname }}</span>
										<i class="el-icon-close close_btn" @click="delFile(item.fj_id, index)"></i></a>
								</li>
							</ul>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item>
							<el-button type="primary" @click="nextStep('formInfo')">下一步</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-tab-pane>
		<!-- 基本信息  end -->
		<!-- 设置报名字段  start-->
		<el-tab-pane label="设置报名字段" name="setNames" disabled>
			<el-row class="btns_left">
				<el-button type="primary" class="btn_square" :disabled="disabledYd" icon="btn-up" @click="moveUp">上移</el-button>
				<el-button type="primary" class="btn_square" :disabled="disabledYd" icon="btn-down" @click="moveDown">下移</el-button>
				<el-button type="primary" class="btn_square" :disabled="disabledYd" icon="btn-upup" @click="setTop">置顶</el-button>
				<el-button type="primary" class="btn_square" :disabled="disabledYd" icon="btn-downdown" @click="setBottom">置底</el-button>
			</el-row>
			<el-table :data="words" class="width_100 table_wrap" stripe>
				<el-table-column label="" prop="index" width="90"></el-table-column>
				<el-table-column width="60">
					<template scope="radio">
						<el-radio v-model="selectIndex" :label="radio.$index">&nbsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column label="报名字段" prop="zdmc"></el-table-column>
				<el-table-column label="字段类型">
					<template scope="state">
						<span>{{ state.row.zdlxmc }}</span>
					</template>
				</el-table-column>
				<el-table-column label="设置报名字段" prop="sfxz">
					<template scope="state">
						<el-switch v-model="state.row.sfxz" :width="120"
							on-value="1" on-text="取消报名字段" :on-color="color.on"
							off-value="0" off-text="添加报名字段" :off-color="color.off">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" prop="sfyxxg">
					<template scope="operate">
						<el-button type="primary" title="编辑" icon="edit" size="mini"
								@click="editApply(operate.row)" v-if="operate.row.sfyxxg === '1'"></el-button>
						<span v-else>不可编辑</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="btns">
				<el-button :loading="loading" type="primary"
					@click.prevent="prevStep">上一步</el-button>
				<el-button :loading="loading" type="primary" native-type="submit"
					@click.prevent="(saveAll('formInfo'))">保存</el-button>
			</div>
		</el-tab-pane>
	</el-tabs>
	<!-- 设置报名字段  end -->
	<!-- 编辑报名字段名称 start -->
	<el-dialog title="修改报名字段名称" :visible.sync="dialogApply" size="tiny"
	@close="resetFn('formInfoApply', 'dialogApply')">
      <el-form :model="formInfoApply" :label-width="labelWidth" ref="formInfoApply" :rules="applyRules">
				<el-form-item label="报名字段" prop="zdmc" required>
					<el-input v-model="formInfoApply.zdmc"></el-input>
				</el-form-item>
			</el-form>
			<div class=" footer" slot="footer">
				<el-button class="no_radius" size="small"
				@click="resetFn('formInfoApply', 'dialogApply')">取消</el-button>
				<el-button class="no_radius" size="small" type="primary"
					@click="saveApply('formInfoApply')">保存</el-button>
			</div>
    </el-dialog>
		<!-- 编辑报名字段名称 end -->
</div>
</template>

<script>
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import dateAss from '@/common/vue/dateAss';
import vueUEditor from '@/common/vue/vueUEditor';
// import uploadImg from '@/common/vue/uploadImg';
import selectCode from '@/common/vue/selectCode';
import $ from '@/common/js/axios';
import { Base64 } from 'js-base64';

export default {
	name: 'examDetail',
	components: { breadCrumb, vueUEditor, dateAss, selectCode },
	// props: {
	// 	dwxxId: {
	// 		type: String
	// 	},
	// 	yhid: {
	// 		type: String,
	// 		default: ''
	// 	},
	// 	canSave: {
	// 		type: Boolean,
	// 		default: true
	// 	},
	// 	canUpload: {
	// 		type: Boolean,
	// 		default: true
	// 	},
	// 	canDownload: {
	// 		type: Boolean,
	// 		default: true
	// 	}
	// },
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// @ Switch 统一颜色
			color: {
				on: colorOn,
				off: colorOff
			},
			// 加载
			loading: false,
			// 面包屑
			tabOn: 'baseInfo',
			// 报名字段弹框
			dialogApply: false,
			// 基本信息
			form: {
				kslx: '10',
				ksmc: '',
				ksfl: '',
				bmkssj: '',
				bmjssj: '',
				shjssj: '',
				sfjf: '1',
				jfje: '',
				jfjssj: '',
				dyzkzkssj: '',
				dyzkzjssj: '',
				cxcjkssj: '',
				sfscsfz: '1',
				sfscxwz: '1',
				sfscbyzhjytjb: '1',
				jznr: '',
				fjxx: [],
				bmzds: [],
				czlx: ''
				// ksxctlj: '',
				// ksxctfwdmc: '',
				// ksxctkhdmc: ''
			},
			// 弹窗表单
			formInfoApply: {
				zdmc: '',
				bmzd_id: ''
			},
			applyRules: {
				zdmc: [{ validator: validator('64, "normal", "字段名称", false') }]
			},
			// 基本信息校验
			rules: {
				ksmc: [{ validator: validator('64, "normal", "考试名称", false', this.checkKsCode), trigger: 'blur' }],
				ksfl: [{ required: true, message: '请选择考试分类' }],
				bmkssj: [{ required: true, message: '报名开始时间不能为空' }],
				bmjssj: [{ required: true, message: '报名结束时间不能为空' }],
				shjssj: [{ required: true, message: '审核结束时间不能为空' }],
				jfje: [{ validator: validator('8, "posdouble", "缴费金额", false') }],
				jfjssj: [{ required: true, message: '缴费时间不能为空' }],
				dyzkzkssj: [{ required: true, message: '打印准考证开始时间不能为空' }],
				dyzkzjssj: [{ required: true, message: '打印准考证结束时间不能为空' }],
				cxcjkssj: [{ required: true, message: '查询成绩时间不能为空' }],
				bmxhgzh: [{ validator: validator('1, "number", "报名序号", false') }]
			},
			// 设置报名字段
			words: [],
			// 富文本
			editorInstance: null,
			uEditorConfig: {
				toolbars: [
					['fontfamily', 'fontsize', 'bold', 'indent', 'italic', 'underline', 'formatmatch', 'removeformat', 'justifycenter',
						'justifyright', 'justifyleft', 'justifyjustify', 'forecolor', 'lineheight', 'simpleupload', 'link', 'insertvideo']
				]
			},
			formDate: {
				bmkssj: '',
				bmjssj: '',
				shjssj: '',
				jfjssj: '',
				dyzkzkssj: '',
				dyzkzjssj: '',
				cxcjkssj: '',
				sfjf: '1'
			},
			isCheck: false,
			isPay: true, // 判断是否缴费校验
			// 最大时间
			maxTime: '',
			// 最小时间
			minTime: '',
			// 隐藏时间插件当前按钮
			noTime: 'at_moment',
			// 默认插件时间
			defaultTime: '',
			// 单选报名字段索引
			selectIndex: ''
		};
	},
	computed: {
		// 判断是否禁用上移、下移、置底、置顶
		disabledYd() {
			return (this.selectIndex.length === 0);
		},
		defaultExam() {
			const date = new Date(this.minTime);
			return date.setDate(date.getDate() + 1);
		},
		// 判断新建还是编辑
		isNew() {
			return this.$route.params.isNew;
		},
		// 7个时间阶梯数组（毫秒数）
		timeArr() {
			const arr = [
				this.form.bmkssj,
				this.form.bmjssj,
				this.form.shjssj,
				this.form.jfjssj,
				this.form.dyzkzkssj,
				this.form.dyzkzjssj,
				this.form.cxcjkssj
			];
			const result = [];
			arr.forEach((e) => {
				if (e) {
					result.push(new Date(e).getTime());
				} else {
					result.push('');
				}
			});
			return result;
		},
		// 时间禁用范围
		timeRange() {
			const min = this.minTime;
			const max = this.maxTime;
			return {
				disabledDate(time) {
					const select = time.getTime();
					if (min && max) {
						return select < min || select > max;
					}
					return select < min;
				}
			};
		}
	},
	watch: {
		/* eslint-disable func-names */
		'form.sfjf': function (val) {
			switch (val) {
			case '1':
				this.rules.jfje = [{ required: true, message: '缴费金额不能为空' },
						{ validator: validator('8, "posdouble", "缴费金额", false') }];
				this.rules.jfjssj = [{ required: true, message: '缴费时间不能为空' }];
				this.isPay = true;
				break;
			case '0':
				this.form.jfje = '';
				this.form.jfjssj = '';
				this.rules.jfje = [];
				this.rules.jfjssj = [];
				this.isPay = false;
				break;
			default: break;
			}
		},
		'form.kslx': function (val) {
			switch (val) {
			case '10':
				this.rules.dyzkzkssj = [{ required: true, message: '打印准考证开始时间不能为空' }];
				this.rules.dyzkzjssj = [{ required: true, message: '打印准考证结束时间不能为空' }];
				this.rules.cxcjkssj = [{ required: true, message: '查询成绩时间不能为空' }];
				break;
			case '20':
				this.rules.dyzkzkssj = [];
				this.rules.dyzkzjssj = [];
				this.rules.cxcjkssj = [];
				break;
			default: break;
			}
		}
	},
	methods: {
		// 单位编号唯一性
		checkKsCode(rule, val, callback) {
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			const data = {
				ks_id: this.$route.params.id,
				ksmc: this.form.ksmc,
				czlx: this.form.czlx
			};
			$.get('/gyrcht/ksgl/fbks/check_Ksmc', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		},
		// ====================> 基本信息
		// 修改考试类型
		changeKslx(type) {
			if (type === '1') {
				this.form.kslx = '10';
				this.formDate.kslx = '10';
				this.form.sfjf = '1';
			} else if (type === '2') {
				this.form.kslx = '20';
				this.formDate.kslx = '20';
				this.form.sfjf = '0';
				this.form.dyzkzkssj = '';
				this.form.dyzkzjssj = '';
				this.form.cxcjkssj = '';
			}
		},
		// 职位基本信息 查询
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/fbks/ksxxCx_byid', {
				params: { ks_id: this.$route.params.id }
			}).then((res) => {
				this.words = res.returnData.ksxxs.bmzds;
				Object.assign(this.form, res.returnData.ksxxs);
				this.formDate.kslx = res.returnData.ksxxs.kslx;
				this.editorInstance.setContent(this.form.jznr);
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 新建考试获取默认的报名字段
		getsignData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/fbks/getCshbmzd'
			).then((res) => {
				this.words = res.returnData.bmzds;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 跳转下一步，编辑报名字段
		nextStep(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.checkBmdate();
					if (this.editorInstance.hasContents()) {
						setTimeout(() => {
							if (this.isCheck) {
								this.tabOn = 'setNames';
							} else {
								return false;
							}
						}, 100);
					} else {
						this.$message.warning('简章内容不能为空');
						return false;
					}
				}
			});
		},
		// 返回上一步，编辑基本信息
		prevStep() {
			this.tabOn = 'baseInfo';
		},
		// 选中报名字段上移
		moveUp() {
			const i = this.selectIndex;
			if (i > 0) {
				const thisRow = this.words[i - 1];
				this.$set(this.words, i - 1, this.words[i]);
				this.$set(this.words, i, thisRow);
				this.selectIndex = i - 1;
			} else {
				this.$message.warning('已经是第一项了！');
			}
		},
		// 选中报名字段下移
		moveDown() {
			const i = this.selectIndex;
			if (i < this.words.length - 1) {
				const thisRow = this.words[i + 1];
				this.$set(this.words, i + 1, this.words[i]);
				this.$set(this.words, i, thisRow);
				this.selectIndex = i + 1;
			} else {
				this.$message.warning('已经是最后一项了！');
			}
		},
		// 选中报名字段置顶
		setTop() {
			const i = this.selectIndex;
			if (i !== 0) {
				this.words.unshift(this.words[i]);
				this.words.splice(parseInt(i, 0) + 1, 1);
				this.selectIndex = 0;
			} else {
				this.$message.warning('已经置顶了！');
			}
		},
		// 选中报名字段置底
		setBottom() {
			const i = this.selectIndex;
			const index = this.words.length;
			if (i !== index - 1) {
				this.words.push(this.words[i]);
				this.words.splice(i, 1);
				this.selectIndex = index - 1;
			} else {
				this.$message.warning('已经置底了！');
			}
		},
		// 已上传文件数量控制、检验每次上传文件的大小
		beforeUpload(file) {
			const maxLen = this.form.fjxx.length < 5;
			const maxSize = file.size / 1024 < 500;
			if (!maxLen) {
				this.$message.warning('最多上传五个文件');
			} else if (!maxSize) {
				this.$message.warning('文件大小不超过500kb!');
			}
			return maxLen && maxSize;
		},
		// 上传成功后的回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				const data = res.returnData;
				this.form.fjxx.push({
					cname: data.clientName,
					sname: data.serverName,
					lj: data.serverPath,
					ks_id: ''
				});
				this.$message.success('上传成功');
			} else {
				this.$message.warning(res.returnData.message);
			}
		},
		// 删除附件
		delFile(id, i) {
			if (id) {
				$.delete('/gyrcht/ksgl/fbks/ksscfjSc', {
					params: { fj_id: id }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.form.fjxx.splice(i, 1);
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
			} else {
				this.$message.success('删除成功！');
				this.form.fjxx.splice(i, 1);
			}
		},
		// 修改报名字段名称
		editApply(row) {
			this.dialogApply = true;
			setTimeout(() => {
				Object.keys(this.formInfoApply).forEach((item) => {
					this.formInfoApply[item] = row[item];
				});
			}, 1);
		},
		// 弹窗操作 ====================>
		// 关闭
		resetFn(formName, showState) {
			setTimeout(() => {
				if (this.$refs[formName]) {
					this.$refs[formName].resetFields();
				}
			}, 5);
			this[showState] = false;
		},
		// 报名字段修改保存
		saveApply(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					setTimeout(() => {
						Object.keys(this.words).forEach((item) => {
							if (this.words[item].bmzd_id === this.formInfoApply.bmzd_id) {
								this.words[item].zdmc = this.formInfoApply.zdmc;
								this.dialogApply = false;
							}
						});
					}, 1);
					// this.setApply();
				}
			});
		},
		setApply() {
			let Url = '/gyrcht/ksgl/fbks/getXgbmzdcsz';
			if (!this.isNew) {
				Url = '/gyrcht/ksgl/fbks/getXgbmzd';
			}
			$.put(Url, this.formInfoApply).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('保存成功');
					if (!this.isNew) {
						this.getData();
					} else {
						this.getsignData();
					}
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
				this.dialogApply = false;
			}).catch(() => {
				this.loading = false;
				this.dialogApply = false;
			});
		},
		// 保存发布考试信息
		saveAll() {
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			const postData = Object.assign({}, this.form);
			postData.jznr = Base64.encode(this.editorInstance.getContent());
			let num = 0;
			Object.keys(this.words).forEach((item) => {
				this.words[item].px = parseInt(item, 0) + 1;
				if (this.words[item].sfxz === '0') {
					num++;
				}
			});
			if (num === 43) {
				this.$message.warning('请选择报名字段！');
				return false;
			}
			postData.bmzds = this.words;
			$.post('/gyrcht/ksgl/fbks/ksxxBc', postData).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '考试保存成功！',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: 'examPost' });
						}
					});
				} else {
					this.$message.error(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		changeTime(val) {
			this.form.bmkssj = val;
			this.formDate.bmkssj = val;
		},
		changeBmjssj(val) {
			this.form.bmjssj = val;
			this.formDate.bmjssj = val;
		},
		changeShjssj(val) {
			this.form.shjssj = val;
			this.formDate.shjssj = val;
		},
		changeJfjssj(val) {
			this.form.jfjssj = val;
			this.formDate.jfjssj = val;
		},
		changeDykssj(val) {
			this.form.dyzkzkssj = val;
			this.formDate.dyzkzkssj = val;
		},
		changeDyjssj(val) {
			this.form.dyzkzjssj = val;
			this.formDate.dyzkzjssj = val;
		},
		changeJkjssj(val) {
			this.form.cxcjkssj = val;
			this.formDate.cxcjkssj = val;
		},
		checkBmdate() {
			this.formDate.sfjf = this.form.sfjf;
			$.get('/gyrcht/ksgl/fbks/check_sjqj', {
				params: this.formDate
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.isCheck = true;
				} else {
					this.$message.warning(res.returnData.message);
					this.isCheck = false;
				}
				this.loading = false;
			}).catch(() => {
				this.isCheck = false;
				this.loading = false;
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		},
		// 点击时间控件（focus事件），为预先定义好的最小最大值赋值
		selectDatePicker(i) {
			this.minTime = this.findPrevNotEmpty(this.timeArr, i);
			this.maxTime = this.findNextNotEmpty(this.timeArr, i);
		},
		// 当前元素索引之前 最近的非空值（arr：当前数组；i：当前索引）
		findPrevNotEmpty(arr, i) {
			const now = new Date().getTime();
			if (i > 0) {
				for (let j = i - 1; j >= 0; j--) {
					if (arr[j]) {
						return arr[j];
					}
				}
				return now;
			}
			return now;
		},
		// 当前元素索引之后 最近的非空值（arr：当前数组；i：当前索引）
		findNextNotEmpty(arr, i) {
			const len = arr.length;
			if (i < len) {
				for (let j = i + 1; j < len; j++) {
					if (arr[j]) {
						return arr[j];
					}
				}
				return '';
			}
			return '';
		}
	},
	created() {
		if (!this.isNew) {
			this.getData();
		} else {
			this.getsignData();
		}
		this.editor();
	},
	// 导航到该组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (to.params.isNew === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style scoped>
.btn_switch {
	display: inline-block;
}
.prompt_text {
	display: inline-block;
	font-size: 12px;
	color: rgb(131, 143, 165);
	margin-left: 20px;
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
	white-space: nowrap;
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
.btns {
	margin: 22px 0 22px 130px;
}
.btns_left{
	margin:5px 0 20px 0;
}
</style>
