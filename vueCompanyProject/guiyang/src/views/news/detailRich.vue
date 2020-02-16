<docs>
	## 新闻管理---编辑新闻内容
	* @date ###### Wed Aug 23 09:46:00 CST 2017
	* @author jinglf000
	* @desc 编辑新闻内容
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<el-row>
			<el-col :span="12"><h3 class="title">{{isNew ? '新建新闻' : '编辑新闻' }}</h3></el-col>
		</el-row>
		<div v-loading="loading">
			<el-form :model="form" :rules="rules" label-width="37.5%"
				ref="detailForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="新闻标题" required prop="bt">
							<el-input v-model="form.bt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="新闻类别" required prop="xwlxs">
							<news-type v-model="form.xwlxs" :changeOnSelect="false"
								:permissions="permissions"></news-type>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否显示" prop="sfxs" required>
							<el-switch v-model="form.sfxs"
								on-value="1" :on-color="colorOn" on-text="是"
								off-value="0" :off-color="colorOff" off-text="否"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="新闻识别码" prop="xwsbm">
							<el-input v-model="form.xwsbm" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="来源" prop="ly">
							<select-code v-model="form.ly"
								:showClearable="true"
								code="gyrlzyw_xw_d_ly" :hasAll="false">
							</select-code>
						</el-form-item>
					</el-col>
					<el-col :span="6" v-show="form.ly === '04'">
						<el-form-item label="" prop="lymc" label-width="10px">
							<el-input v-model="form.lymc"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="!isNew">
					<el-col :span="8">
						<el-form-item label="创建时间" prop="cjrq">
							<el-date-picker v-model="form.cjrq" format="yyyy-MM-dd HH:mm" @change="changeTime"
								class="width_100" :editable="false" placeholder="请选择" type="datetime"
								:popper-class="noTime" :clearable="false"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="新闻内容" prop="nr" class="is-required" label-width="12.5%">
							<vueUEditor :defaultValue="form.nr" :ueditorConfig="uEditorConfig"
								@ready="editor"></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="附件上传" label-width="12.5%">
							<el-upload
								ref="upload"
								action="/common/wjsc/wjsc/affixUpload?modeName=xinwenfj"
								:show-file-list="false"
								:on-success="uploadSuccess"
								:before-upload="beforeUpload"
								>
								<!-- 是否自动上传 -->
								<!-- :auto-upload="false" -->
								<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
								<div class="prompt_text">友情提示：只能上传word/excel/pdf/txt/zip/rar文件，大小不超过500kb</div>
							</el-upload>
							<ul class="file_list">
								<li v-for="(item, index) in form.fj" :key="index">
									<a class="file_name" :download="item.cname">
										<i class="el-icon-document"></i>
										<span>{{ item.cname }}</span>
										<i class="el-icon-close close_btn" @click="delFile(item.xwfj_id, index)"></i></a>
								</li>
							</ul>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="mar_top">
					<el-form-item label-width="12.5%">
						<el-button type="primary" @click="save('detailForm')">保存</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import newsType from '@/common/vue/newsType';
import selectCode from '@/common/vue/selectCode';
import vueUEditor from '@/common/vue/vueUEditor';
import { Base64 } from 'js-base64';

function changeCode(str) {
	const reg = /^((((\d{2})\d{2})\d{2})\d{2})$/g;
	const reg2 = /\d{2}$/g;
	const zero = '000000';
	const arr = reg.exec(str).slice(1, 5).reverse();
	if (arr) {
		return arr.reduce((upper, item, index) => {
			let type = '';
			if (item.match(reg2)[0] !== '00') {
				type = item + zero.slice(index * 2);
				upper.push(type);
			}
			return upper;
		}, []);
	}
}

export default {
	name: 'newsDetail',
	components: { newsType, vueUEditor, selectCode, breadCrumb },
	data() {
		// 新闻识别码 唯一性查询
		const checkOnly = (rule, val, callback) => {
			const data = {
				xw_id: this.$route.params.id,
				xwsbm: this.form.xwsbm,
				czlx: this.isNew ? '0' : '1'
			};
			$.get('/gyrcht/xwgl/xwgl/xwglxwsbmCx', {
				params: data
			}).then((res) => {
				if (res.returnData.executeResult === '0') {
					callback(new Error(res.returnData.message));
				} else {
					callback();
				}
			}).catch(() => { });
		};
		return {
			labelWidth,
			colorOn,
			colorOff,
			loading: false,
			form: {
				bt: '',
				xwlxs: [],
				xwlx_id: '',
				xw_id: '',
				sfxs: '1',
				ly: '',
				lymc: '',
				xwsbm: '',
				nr: '',
				czlx: '',
				fj: [],
				cjrq: ''
			},
			noTime: 'at_moment',
			rules: {
				bt: [{ validator: validator('96, "least", "新闻标题", false') }],
				xwlxs: [{ required: true, message: '新闻类别不能为空' }],
				xwsbm: [{ validator: validator('8, "number", "新闻识别码", true', checkOnly), trigger: 'blur' }],
				lymc: [{ validator: validator('32, "full", "来源", true') }]
			},
			// 富文本
			editorInstance: null,
			uEditorConfig: {
				toolbars: [
					['fontfamily', 'fontsize', 'bold', 'indent', 'italic', 'underline', 'formatmatch', 'removeformat', 'justifycenter',
						'justifyright', 'justifyleft', 'justifyjustify', 'forecolor', 'lineheight', 'simpleupload', 'link']
				]
			},
			// 新闻类别权限
			permissions: ''
		};
	},
	watch: {
		/* eslint-disable func-names */
		'form.ly': function (val) {
			if (!val) {
				this.form.lymc = '';
			}
		}
	},
	computed: {
		id() {
			return this.$route.params.id;
		},
		isNew() {
			return this.$route.params.isNew;
		}
	},
	methods: {
		// 查询 新闻内容
		getData() {
			if (!this.isNew) {
				$.get('/gyrcht/xwgl/xwgl/xwglbjCx', {
					params: {
						xw_id: this.id
					}
				}).then((res) => {
					const data = res.returnData.xwlxs;
					this.form = data;
					this.form.xw_id = this.id;
					this.form.cjrq = data.cjrq;
					this.form.xwlxs = changeCode(data.xwlx_id);
					this.editorInstance.setContent(this.form.nr);
					this.loading = false;
				}).catch(() => {});
			}
		},
		// 保存 接口
		postData() {
			this.loading = true;
			// 操作类型判断
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			// data
			// 对获取的值进行处理，只获取最后一个id即可
			const data = {};
			Object.keys(this.form).forEach((item) => {
				if (item !== 'xwlxs') {
					data[item] = this.form[item];
				}
			});
			data.xwlx_id = this.form.xwlxs[this.form.xwlxs.length - 1];
			data.nr = Base64.encode(this.editorInstance.getContent());
			// data.nr = this.editorInstance.getContent();
			$.post('/gyrcht/xwgl/xwgl/xwglxjbjBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message({
						type: 'success',
						message: '新闻保存成功',
						showClose: true,
						onClose: () => {
							this.$router.push({ name: 'newsList' });
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
		// 保存新闻内容
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.editorInstance.hasContents()) {
						this.postData();
					} else {
						this.$message.warning('新闻内容不能为空');
					}
				}
			});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
			this.getData();
		},
		// 已上传文件数量控制、检验每次上传文件的大小
		beforeUpload(file) {
			const maxLen = this.form.fj.length < 5;
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
				this.form.fj.push({
					cname: data.clientName,
					sname: data.serverName,
					lj: data.serverPath,
					xwfj_id: ''
				});
				this.$message.success('上传成功');
			} else {
				this.$message.warning(res.returnData.message);
			}
		},
		// 删除新闻附件
		// 新闻附件id(xwfj_id)存在时调用删除接口
		delFile(id, i) {
			if (id) {
				$.delete('/gyrcht/xwgl/xwgl/xwglxwfjSc', {
					params: { xwfj_id: id }
				}).then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功！');
						this.form.fj.splice(i, 1);
					} else {
						this.$message.warning(res.returnData.message);
					}
				}).catch(() => {});
			} else {
				this.$message.success('删除成功！');
				this.form.fj.splice(i, 1);
			}
		},
		// 时间禁用范围
		// timeRange() {
		// 	return {
		// 		disabledDate(time) {
		// 			const select = time.getTime();
		// 			if (min && max) {
		// 				return select < min || select > max;
		// 			}
		// 			return select < min;
		// 		}
		// 	};
		// }
		changeTime(val) {
			this.form.cjrq = val;
		}
	},
	created() {
		this.permissions = this.$route.params.permissions;
		this.editor();
		if (this.isNew) {
			this.form.czlx = '0';
		} else {
			this.form.czlx = '1';
		}
	},
	// 限制路由，若没有参数，和isNew为false且没有id的情况下
	beforeRouteEnter(to, from, next) {
		if (!to.params.isNew && !to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>
<style scoped>
	.mar_top {
		margin-top: 20px;
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
</style>
