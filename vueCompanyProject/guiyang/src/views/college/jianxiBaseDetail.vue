<docs>
	## 大学生就业---见习基地（单位）信息
	* @author SHJ
	* @date ###### 2017年8月14日
	* @desc 编辑、获取单位信息、保存
</docs>
<template>
	<!-- 添加/编辑 start -->
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<h3 class="title">{{ isNew ? '添加见习基地（单位）信息' : '编辑见习基地（单位）信息' }}</h3>
		<div class="content" v-loading="loading">
			<el-form :model="form" :rules="rules" label-width="37.5%"
				ref="form">
				<el-row>
					<el-col :span="16">
						<el-form-item label="见习基地(单位)名称" prop="jxdwmc"
							 required label-width="18.75%" class="mulitfix">
							<el-autocomplete v-model="form.jxdwmc" :props="company"
								:fetch-suggestions="querySearch"
								@select="handleSelect"
								:trigger-on-focus="true"
								class="width_100">
								<el-button slot="append" icon="search" :loading="loadingGet"
									@click="handleGet">获取</el-button>
							</el-autocomplete>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位性质" prop="dwxz">
							<select-code v-model="form.dwxz"
								code="gyrlzyw_qzzp_d_dwxz" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 自动带出（添加时通过单位基本信息带出，可编辑） start -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="地址" prop="dz">
							<el-input v-model="form.dz"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮编" prop="yb">
							<el-input v-model="form.yb"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电子邮箱" prop="dzyx">
							<el-input v-model="form.dzyx"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位电话" prop="dwdh">
							<el-input v-model="form.dwdh"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="行业分类" prop="hylb" label-width="18.75%">
							<trade-select v-model="form.hylb"></trade-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-form-item label="单位简介" prop="dwjj" label-width="12.5%">
							<vueUEditor @ready="editor" :defaultValue="form.dwjj" ></vueUEditor>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 自动带出 end -->
				<!-- 手动填写 start -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="基地类型" prop="jdlx">
							<select-code v-model="form.jdlx"
								code="gyrlzyw_dxs_d_jdlx" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="批准日期" prop="pzrq">
							<el-date-picker v-model="form.pzrq"
								type="year" placeholder="选择年"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="授牌日期" prop="sprq">
							<el-date-picker v-model="form.sprq"
								type="year" placeholder="选择年"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="降级日期" prop="jjrq">
							<el-date-picker v-model="form.jjrq"
								type="year" placeholder="选择年"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="摘牌日期" prop="zprq">
							<el-date-picker v-model="form.zprq"
								type="year" placeholder="选择年"
								:editable="false" class="width_100"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位人数" prop="dwrs" required>
							<el-input v-model="form.dwrs"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="拟招募见习生人数" prop="nzmjxrs" required>
							<el-input v-model="form.nzmjxrs"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="经营范围" prop="jyfw" label-width="12.5%">
							<el-input v-model="form.jyfw"
								type="textarea" :autosize="{ minRows: 4}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 联系人1 start -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系人1" prop="lxr1">
							<el-input v-model="form.lxr1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职务1" prop="zw1">
							<el-input v-model="form.zw1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机1" prop="sj1">
							<el-input v-model="form.sj1"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="邮箱1" prop="yx1">
							<el-input v-model="form.yx1"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="QQ1" prop="lxrqq1">
							<el-input v-model="form.lxrqq1"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 联系人1 end -->
				<!-- 联系人2 start -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="联系人2" prop="lxr2">
							<el-input v-model="form.lxr2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职务2" prop="zw2">
							<el-input v-model="form.zw2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机2" prop="sj2">
							<el-input v-model="form.sj2"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="邮箱2" prop="yx2">
							<el-input v-model="form.yx2"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="QQ2" prop="lxrqq2">
							<el-input v-model="form.lxrqq2"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 联系人2 end -->
				<el-row>
					<el-col>
						<el-form-item label="备注" prop="bz" label-width="12.5%">
							<el-input v-model="form.bz"
								type="textarea" :autosize="{ minRows: 4}"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="单位状态" prop="dwzt">
							<select-code v-model="form.dwzt"
								code="gyrlzyw_dxs_d_dwzt" :hasAll="false"></select-code>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 手动填写 end -->
				<!-- 保存按钮 start -->
				<el-row>
					<el-col>
						<el-form-item label-width="12.5%">
							<el-button type="primary" native-type="submit" :loading="loadingSave"
								@click.prevent="save('form')">保存</el-button>
							<el-button @click="resetForm('form')">重置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- 保存按钮 end -->
			</el-form>
		</div>
	</div>
	<!-- 添加/编辑 end -->
</template>
<script>
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import breadCrumb from '@/common/vue/breadCrumb';
import selectCode from '@/common/vue/selectCode';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import vueUEditor from '@/common/vue/vueUEditor';
import $ from '@/common/js/axios';
import { Base64 } from 'js-base64';

export default {
	name: 'collegeBaseDetail',
	components: {
		selectCode,
		tradeSelect,
		vueUEditor,
		breadCrumb
	},
	data() {
		return {
			// 拿到id
			id: '',
			// label宽度
			labelWidth,
			// 加载状态
			loading: false,
			// 表单数据
			form: {
				jxdwmc: '',
				jdlx: '',
				pzrq: '',
				sprq: '',
				jjrq: '',
				zprq: '',
				dwrs: '',
				nzmjxrs: '',
				jyfw: '',
				lxr1: '',
				zw1: '',
				sj1: '',
				yx1: '',
				lxrqq1: '',
				lxr2: '',
				zw2: '',
				sj2: '',
				yx2: '',
				lxrqq2: '',
				bz: '',
				dwzt: '',
				dwxz: '',
				dz: '',
				hylb: '',
				dwjj: '',
				dwdh: '',
				yb: '',
				dzyx: '',
				dwjbxx_id: '',
				jxdw_id: '',
				czlx: ''
			},
			// 验证规则
			rules: {
				jxdwmc: [{ validator: validator('128, "full", "见习基地（单位）名称", false') }],
				dz: [{ validator: validator('256, "full", "地址", true') }],
				yb: [{ validator: validator('6, "yb", "邮编", true') }],
				dzyx: [{ validator: validator('48, "email", "电子邮箱", true') }],
				dwdh: [{ validator: validator('32, "lxdh", "单位电话", true') }],
				dwxz: [{ required: true, message: '单位性质不能为空' }],
				hylb: [{ required: true, message: '行业分类不能为空' }],
				jdlx: [{ required: true, message: '基地类型不能为空' }],
				dwrs: [{ validator: validator('8, "number", "单位人数", false') }],
				nzmjxrs: [{ validator: validator('3, "number", "拟招募见习生人数", false') }],
				jyfw: [{ validator: validator('256, "less", "经营范围", true') }],
				lxr1: [{ validator: validator('64, "full", "联系人1", true') }],
				zw1: [{ validator: validator('32, "full", "职务1", true') }],
				sj1: [{ validator: validator('11, "sjh", "手机1", true') }],
				yx1: [{ validator: validator('48, "email", "邮箱1", true') }],
				lxrqq1: [{ validator: validator('16, "qq", "联系人qq1", true') }],
				lxr2: [{ validator: validator('64, "full", "联系人2", true') }],
				zw2: [{ validator: validator('32, "full", "职务2", true') }],
				sj2: [{ validator: validator('11, "sjh", "手机2", true') }],
				yx2: [{ validator: validator('48, "email", "邮箱2", true') }],
				lxrqq2: [{ validator: validator('16, "qq", "联系人qq2", true') }],
				bz: [{ validator: validator('256, "full", "备注", true') }],
				dwzt: [{ required: true, message: '单位状态不能为空' }]
			},
			// 获取按钮点击状态
			loadingGet: false,
			// 保存按钮点击状态
			loadingSave: false,
			company: {
				label: 'dwmc',
				value: 'dwmc'
			},
			timeout: null,
			// 富文本
			editorInstance: null
		};
	},
	computed: {
		isNew() {
			return this.$route.params.isNew;
		}
	},
	methods: {
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.editorInstance.execCommand('cleardoc');
		},
		// 数据获取(进入页面时)
		getData() {
			this.loading = true;
			$.get('/gyrcht/dxsjy/dxsjy/jxjdbjCx', {
				params: {
					jxdw_id: this.$route.params.id
				}
			}).then((res) => {
				this.form = res.returnData.jxjd;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 见习基地（单位）名称输入框 输入提示
		querySearch(queryString, cb) {
			this.$refs.form.validateField('jxdwmc', (msg) => {
				if (!msg) {
					if (this.timeout) {
						clearTimeout(this.timeout);
					}
					this.timeout = setTimeout(() => {
						$.get('/gyrcht/dxsjy/dxsjy/dwxxCx', {
							params: {
								dwmc: queryString
							}
						}).then((res) => {
							cb(res.returnData.dws);
						}).catch(() => {
						});
					}, 1000);
				} else {
					cb([]);
				}
			});
		},
		//  见习基地（单位）名称输入框 获取选中id
		handleSelect(item) {
			this.form.dwjbxx_id = item.dwjbxx_id;
		},
		// 点击获取
		handleGet() {
			this.$refs.form.validateField('jxdwmc', (msg) => {
				if (!msg) {
					this.getDataInfo();
				}
			});
		},
		// 获取单位详细信息
		getDataInfo() {
			this.loadingGet = true;
			const data = {
				dwjbxx_id: this.form.dwjbxx_id
			};
			$.get('/gyrcht/dxsjy/dxsjy/dwxxxxCx', {
				params: data
			}).then((res) => {
				Object.assign(this.form, res.returnData.dws);
				this.form.hylb = res.returnData.dws.sshy;
				this.form.hylbmc = res.returnData.dws.sshymc;
				this.loadingGet = false;
			}).catch(() => {
				this.loadingGet = false;
			});
		},
		// 点击保存
		save(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.thisRouteName = this.$route.name;
					this.postData();
				} else {
					this.$message.warning('有未符合要求的录入项，请检查后再次提交');
				}
			});
		},
		getYear(date) {
			const year = date.getFullYear();
			return `${year}`;
		},
		// 执行保存
		postData() {
			this.loadingSave = true;
			// 操作类型判断
			if (this.isNew) {
				this.form.czlx = '0';
			} else {
				this.form.czlx = '1';
			}
			if (typeof this.form.pzrq === 'object') {
				this.form.pzrq = this.getYear(this.form.pzrq);
			}
			if (typeof this.form.sprq === 'object') {
				this.form.sprq = this.getYear(this.form.sprq);
			}
			if (typeof this.form.jjrq === 'object') {
				this.form.jjrq = this.getYear(this.form.jjrq);
			}
			if (typeof this.form.zprq === 'object') {
				this.form.zprq = this.getYear(this.form.zprq);
			}
			const postData = Object.assign({}, this.form);
			postData.dwjj = Base64.encode(this.editorInstance.getContent());
			// postData.dwjj = this.editorInstance.getContent();
			$.post('/gyrcht/dxsjy/dxsjy/jxjdBc', postData)
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message({
							type: 'success',
							message: '保存成功',
							showClose: true,
							onClose: () => {
								this.$router.push({ name: 'collegeBase' });
							}
						});
					} else {
						// 该单位不存在或未审核通过
						this.$message.warning(res.returnData.message);
						this.loadingSave = false;
					}
				}).catch(() => {
					this.loadingSave = false;
				});
		},
		// 富文本编辑器
		editor(instance) {
			this.editorInstance = instance;
		}
	},
	// 初始化带数据
	created() {
		this.id = this.$route.params.id;
		if (!this.isNew) {
			this.getData();
		}
	},
	// 导航到改组件之前
	beforeRouteEnter(to, from, next) {
		// 如果没有参数，导航到 index主页
		if (to.params.id === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>

