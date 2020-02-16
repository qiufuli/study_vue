<docs>
	## 活动详情
	## @author luxy
	## @date ###### 2018年7月17日
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<div v-loading="loading">
			<el-form :model="form" :rules="rules" label-width="37.5%"
				ref="form">
				<el-row>
					<el-col :span="12">
						<el-form-item label="活动标题" prop="hdbt" label-width="25%" required>
							<el-input v-model="form.hdbt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="举办地点" prop="jbdd" label-width="25%" required>
							<el-input v-model="form.jbdd"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="报名时间" label-width="25%">
							<el-col :span="11">
								<el-form-item label="" prop="bmkssj">
									<el-date-picker v-model="form.bmkssj"
										class="width_100" :editable="false" placeholder="开始" type="datetime"
										@focus="selectDatePicker(0)" @change="changeTime"
										:picker-options="timeRange" :clearable="true"
										:default-value="defaultExam"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="2" class="time_from_to"></el-col>
							<el-col :span="11">
								<el-form-item label="" prop="bmjssj">
									<el-date-picker v-model="form.bmjssj"
										class="width_100" :editable="false" placeholder="结束" type="datetime"
										@focus="selectDatePicker(1)" @change="changeBmjssj"
										:picker-options="timeRange"
										:default-value="defaultExam"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="举办日期" prop="jbrq" label-width="25%">
							<el-date-picker v-model="form.jbrq"
							:editable="false" class="date_picker"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="活动主题" prop="hdzt" label-width="25%" required>
							<el-input v-model="form.hdzt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="报名人数" prop="bmzrs" label-width="25%" required>
							<el-input v-model="form.bmzrs"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="app_活动介绍" prop="app_hdjs" label-width="12.5%">
							<!--<el-input type="textarea" v-model="form.app_hdjs"></el-input>-->
              <vueUEditor @ready="editor" :defaultValue="form.app_hdjs"
							:ueditorConfig="uEditorConfig"></vueUEditor>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="app活动图片" prop="app_hdtplj" label-width="25%">
							<el-input v-show="false" v-model="form.app_hdtplj"></el-input>
							<upload-img
								:canView="false"
								:modeName="modeNameApp"
								:tipText="adviseText"
								:maxSize="maxSize"
								:clientName.sync="form.app_hdtpkhdmc"
								:serverPath.sync="form.app_hdtplj"
								:serverName.sync="form.app_hdtpfwdmc"></upload-img>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item
							label-width="12.5%">
							<el-button type="primary" native-type="submit" :disabled="loading"
								@click.prevent="save('form')">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import selectCode from '@/common/vue/selectCode';
import dateAss from '@/common/vue/dateAss';
import { dateFormat } from '@/common/js/utils';
import uploadImg from '@/common/vue/uploadImg';
import vueUEditor from '@/common/vue/vueUEditor';

export default {
	name: 'partyActiveAppDetail',
	components: { breadCrumb, selectCode, dateAss, dateFormat, uploadImg, vueUEditor },
	data() {
		return {
			form: {
				hdbt: '',
				jbdd: '',
				bmkssj: '',
				bmjssj: '',
				jbrq: '',
				czlx: '',
				dzzhd_id: '',
				hdzt: '',
				app_hdjs: '',
				bmzrs: '',
				sjly: '10',
				app_hdtplj: '',
				app_hdtpkhdmc: '',
				app_hdtpfwdmc: ''
			},
			rules: {
				hdbt: [{ validator: validator('64, "full", "活动标题", false') }],
				jbdd: [{ validator: validator('40, "full", "活动地点", false') }],
				bmkssj: [{ required: true, message: '报名开始时间不能为空' }],
				bmjssj: [{ required: true, message: '报名结束时间不能为空' }],
				jbrq: [{ required: true, message: '举办日期不能为空' }],
				hdzt: [{ validator: validator('128, "less", "活动主题", false') }],
				bmzrs: [{ validator: validator('160, "number", "报名人数", false') }]
			},
			// 克隆表单（用于提交）
			formRight: {},
			formDate: {
				bmkssj: '',
				bmjssj: ''
			},
			// 服务器文件夹名
			modeNameApp: 'dzzhd_app',
			// 图片最大尺寸
			maxSize: 10000000000,
			// 图片上传建议
			adviseText: '',
			// 最大时间
			maxTime: '',
			// 最小时间
			minTime: '',
			defaultTime: '',
			loading: false,
			// 富文本
			editorInstance: null,
			uEditorConfig: {
				toolbars: [
					['fontfamily', 'fontsize', 'bold', 'indent', 'italic', 'underline', 'formatmatch', 'removeformat', 'justifycenter',
						'justifyright', 'justifyleft', 'justifyjustify', 'forecolor', 'lineheight', 'simpleupload', 'link']
				]
			}
		};
	},
	computed: {
		// 7个时间阶梯数组（毫秒数）
		timeArr() {
			const arr = [
				this.form.bmkssj,
				this.form.bmjssj
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
		},
		defaultExam() {
			const date = new Date(this.minTime);
			return date.setDate(date.getDate() + 1);
		}
	},
	methods: {
		// 保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.postData();
				}
			});
		},
		// 执行保存
		postData() {
			this.loading = true;
			const postData = Object.assign({}, this.form);
			// postData.nr = Base64.encode(this.editorInstance.getContent());
			// postData.nr = this.editorInstance.getContent();
			$.post('/gyrcht/rsdldw/rsdldw/dzzhdxjbjBc', postData)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功',
							showClose: true,
							onClose: () => {
								this.$router.push({ name: 'partyThoughtReport' });
							}
						});
					} else {
						this.$message.warning(res.returnData.message);
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});
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
		},
		changeTime(val) {
			this.form.bmkssj = val;
			this.formDate.bmkssj = val;
		},
		changeBmjssj(val) {
			this.form.bmjssj = val;
			this.formDate.bmjssj = val;
		},
    // 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		}
	},
	created() {
		if (!this.isNew) {
			this.form.czlx = '1';
			this.form.dzzhd_id = this.$route.params.id;
		} else {
			this.form.czlx = '0';
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
	.change_info {
		padding-bottom: 10px; 
	}
</style>
