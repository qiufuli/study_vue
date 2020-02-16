<docs>
	##新闻管理---新闻管理
	* @date ###### Thu Aug 10 09:50:15 CST 2017
	* @author jinglf000
	* @desc 查询新闻列表
	## 问题列表
	*	新闻类别的回显，富文本
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth" :rules="rules"
				ref="queryForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="创建时间">
							<date-ass
								:begin.sync="form.cjrqks" propBegin="cjrqks"
								:end.sync="form.cjrqjs" propEnd="cjrqjs"></date-ass>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="修改时间">
							<date-ass
								:begin.sync="form.xgrqks" propBegin="xgrqks"
								:end.sync="form.xgrqjs" propEnd="xgrqjs"></date-ass>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="新闻标题" prop="bt">
							<el-input v-model="form.bt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="新闻类别" prop="xwlxs">
							<news-type v-model="form.xwlxs" :permissions="permissions"></news-type>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" native-type="submit" :loading="loading"
								@click.prevent="submitForm('queryForm')">查询</el-button>
							<el-button @click="resetForm('queryForm')">重置</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="align_right">
						<el-button type="primary" size="small" icon="plus" class="btn_square"
							:loading="loading"
							@click="add">新建</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!--结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="results" stripe class="table_wrap">
					<el-table-column label="新闻标题" prop="bt" min-width="180"></el-table-column>
					<el-table-column label="新闻类别" prop="xwlxmc" min-width="180"></el-table-column>
					<el-table-column label="发布者" prop="cjr" width="110"></el-table-column>
					<el-table-column label="创建时间" prop="cjrq" width="110"></el-table-column>
					<el-table-column label="修改者" prop="xgr" width="110"></el-table-column>
					<el-table-column label="修改时间" prop="xgrq" width="110"></el-table-column>
					<el-table-column label="是否显示" prop="sfxs">
						<template scope="scope">
							<span>{{scope.row.sfxs === '1' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="130">
						<template scope="scope">
							<el-button type="primary" title="编辑" icon="edit" size="mini"
								@click="edit(scope.row)"></el-button>
							<el-button type="danger" title="删除" icon="delete" size="mini"
								@click="del(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页start -->
			<div class="pagination_wrap" v-show="results.length > 0">
				<el-pagination
					layout="total,prev,pager,next,jumper"
					:total="pageTotal"
					@current-change="getData"
					:current-page.sync="formRight.pageNum"></el-pagination>
			</div>
			<!-- 分页end -->
		</div>
		<!--结果 结束  -->
	</div>
</template>
<script>
import { validator } from '@/common/js/valid';
import { labelWidth } from '@/common/js/config';
import $ from '@/common/js/axios';
import dateAss from '@/common/vue/dateAss';
import newsType from '@/common/vue/newsType';
import { getBtnsRight } from '@/common/js/utils';

export default {
	name: 'newList',
	components: { dateAss, newsType },
	data() {
		return {
			// label宽度
			labelWidth,
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				bt: '',
				xwlxs: [],
				xwlx_id: '',
				cjrqks: '',
				cjrqjs: '',
				xgrqks: '',
				xgrqjs: '',
				isShowState: '',
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 验证规则
			rules: {
				bt: [{ validator: validator('96, "least", "新闻标题",true') }]
			},
			// 总条数
			pageTotal: 0,
			// 查询结果
			results: [],
			// 新闻类型权限
			permissions: ''
		};
	},
	methods: {
		// 新闻列表查询接口
		getData() {
			this.loading = true;
			// 对获取的值进行处理，只获取最后一个id即可
			const data = {};
			Object.keys(this.formRight).forEach((item) => {
				if (item !== 'xwlxs') {
					data[item] = this.formRight[item];
				}
			});
			data.xwlx_id = this.formRight.xwlxs[this.formRight.xwlxs.length - 1];
			$.get('/gyrcht/xwgl/xwgl/xwglCx', {
				params: data
			}).then((res) => {
				this.loading = false;
				this.results = res.returnData.xwgls;
				this.pageTotal = +res.rowsCount;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 删除新闻
		delData(id) {
			$.delete('/gyrcht/xwgl/xwgl/xwglSc', {
				params: { xw_id: id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					this.getData();
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 表单查询 handle
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.form.pageNum = 1;
					Object.assign(this.formRight, this.form);
					this.getData();
				}
			});
		},
		// 表单 重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 动态获取新闻类别的子类
		getTypeList(val) {
			this.getDataNewsType(val[val.length - 1]);
		},
		// 新闻新建
		add() {
			this.$router.replace({
				name: 'newsDetail',
				params: {
					isNew: true,
					id: '',
					permissions: this.permissions
				}
			});
		},
		// 新闻编辑
		edit(row) {
			this.$router.replace({
				name: 'newsDetail',
				params: {
					isNew: false,
					id: row.xw_id,
					permissions: this.permissions
				}
			});
		},
		// 新闻删除
		del(row) {
			this.$confirm('改操作将会删除本条新闻，是否继续？', '确认', {
				submitButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delData(row.xw_id);
			}).catch(() => {});
		}
	},
	created() {
		Object.assign(this.formRight, this.form);
	},
	// 重新查看页面的时候
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				const btns = res.returnData.butList;
				// 新闻十二个大类的权限
				// 新闻人才派遣, 新闻流动人员档案管理, 新闻中介管理, 新闻人事代理党委,
				// 新闻职称评审, 新闻培训测试, 新闻学历认证, 新闻大学生就业,
				// 新闻单位服务, 新闻消息资讯, 新闻关于我们, 新闻人才服务, 新闻单位APP, 新闻个人APP
				const permissions = [btns.xwrcpq, btns.xwldryda, btns.xwzjgl, btns.xwrsdldw,
					btns.xwzcps, btns.xwxlrz, btns.xwdxsjy, btns.xwdwfw,
					btns.xwxxzx, btns.xwgywm, btns.xwrcfw, btns.xwdwapp, btns.xwgrapp];
				this.permissions = permissions.join(',');
				this.form.isShowState = this.permissions;
				this.formRight.isShowState = this.permissions;
				this.getData();
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>
<style>

</style>
