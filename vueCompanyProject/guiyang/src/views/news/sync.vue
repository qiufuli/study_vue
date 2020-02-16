<docs>
	## 新闻管理---新闻同步
	* @date ###### 2017年11月17日
	* @author SHJ
	* @desc 可查询全类别，同步至操作员拥有权限的类别中，不可同步同类别新闻
</docs>
<template>
	<div>
		<!--查询 开始  -->
		<div class="query_wrap">
			<el-form :model="form" :label-width="labelWidth"
				ref="queryForm">
				<el-row>
					<el-col :span="12">
						<el-form-item label="新闻类别" prop="xwlxs">
							<news-type v-model="form.xwlxs" :changeOnSelect="false"
								permissions="true,true,true,true,true,true,true,true,true,true,true,true,true"></news-type>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" :disabled="loading || multipleSelection.length === 0"
								@click="handleSync">同步</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<!--查询 结束  -->
		<!--结果 开始  -->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table
					ref="newsTable"
					:data="results"
					row-key="xw_id"
					stripe
					class="table_wrap"
					@selection-change="handleSlectionChange"
					@cell-click="handleCheck">
				<el-table-column type="selection" width="55"
					:reserve-selection="true"></el-table-column>
					<el-table-column label="新闻标题" prop="bt" min-width="180"
						class-name="color_anchor cur_pointer"></el-table-column>
					<el-table-column label="是否显示" prop="sfxs" min-width="110"></el-table-column>
					<el-table-column label="新闻类别" prop="xwlxmc" min-width="180"></el-table-column>
					<el-table-column label="创建时间" prop="cjrq" min-width="110"></el-table-column>
					<el-table-column label="修改时间" prop="xgrq" min-width="110"></el-table-column>
				</el-table>
				<p v-if="results.length > 0 && hasMore" class="getMore" @click="handleMore()">加载更多</p>
				<p v-else-if="results.length > 0 && !hasMore" class="noMore">没有更多了</p>
			</div>
		</div>
		<!--结果 结束  -->
		<!-- dialog 同步 start -->
		<el-dialog title="同步到" :visible.sync="dialogSync" size="tiny"
			@close="cancel">
			<el-form :model="formSync" :rules="rulesSync" :label-width="labelWidth"
				ref="formSync">
				<el-form-item prop="xwlxs" label="新闻类别" class="is-required">
					<news-type v-model="formSync.xwlxs" :changeOnSelect="false"
						:permissions="permissions"></news-type>
				</el-form-item>
				<el-form-item prop="sftbfj" label="是否同步附件" label-width="110px">
					<el-switch v-model="formSync.sftbfj"
						:on-color="colorOn" on-value="1" on-text="是"
						:off-color="colorOff" off-value="0" off-text="否"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取消</el-button>
				<el-button type="primary" :disabled="loading" @click="save">确定</el-button>
			</div>
		</el-dialog>
		<!-- dialog 同步 end -->
		<!-- dialog 详情 start -->
		<el-dialog title="新闻详情" :visible.sync="dialogDetail" size="large"
			class="dialog_wrap">
			<div class="detail_wrap">
				<div class="content" v-loading="loadingDetail">
					<el-row class="info">
						<el-col :span="3">新闻标题：</el-col>
						<el-col :span="21">{{detailRes.bt}}</el-col>
					</el-row>
					<el-row class="info">
						<el-col :span="3">新闻识别码：</el-col>
						<el-col :span="5">{{detailRes.xwsbm || '无'}}</el-col>
						<el-col :span="3">来源：</el-col>
						<el-col :span="5">{{detailRes.lymc || '无'}}</el-col>
						<el-col :span="3">是否显示：</el-col>
						<el-col :span="2">
							<span v-if="detailRes.sfxs === '1'">是</span>
							<span v-else>否</span>
						</el-col>
					</el-row>
					<el-row class="info">
						<el-col :span="3">新闻内容：</el-col>
						<el-col :span="21" v-html="detailRes.nr"></el-col>
					</el-row>
					<el-row class="info">
						<el-col :span="3">附件：</el-col>
						<el-col :span="21">
							<ul class="file_list" v-if="detailRes.fj.length > 0">
								<li v-for="(item, index) in detailRes.fj" :key="index">
									<a class="file_name" :href="`${item.lj}${item.sname}`"
										:download="item.cname">
										<i class="el-icon-document"></i>
										<span>{{ item.cname }}</span></a>
								</li>
							</ul>
							<span v-else>无</span>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-dialog>
		<!-- dialog 详情 end -->
		<!-- /gyrcht/xwgl/xwgl/xwglxwtbxqCx -->
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import { getBtnsRight } from '@/common/js/utils';
import newsType from '@/common/vue/newsType';
// import { validator } from '@/common/js/valid';

export default {
	name: 'newsSync',
	components: { newsType },
	data() {
		return {
			labelWidth,
			colorOn,
			colorOff,
			// 查询
			loading: false,
			form: {
				xwlxs: []
			},
			// 结果
			results: [],
			// 分页
			pageNum: 1,
			pageSize: 10,
			total: 0,
			// 已选中
			multipleSelection: [],
			// 同步
			dialogSync: false,
			formSync: {
				xwlxs: [],
				sftbfj: '0'
			},
			rulesSync: {
				xwlxs: [{ required: true, message: '新闻类别不能为空' }]
			},
			// 新闻同步权限
			permissions: '',
			// 详情
			dialogDetail: false,
			loadingDetail: false,
			formDetail: {
				xw_id: ''
			},
			detailRes: {
				fj: []
			}
		};
	},
	computed: {
		hasMore() {
			return this.pageSize < this.total;
		}
	},
	watch: {
		/* eslint-disable func-names */
		'form.xwlxs': function (val) {
			if (val.length > 0) {
				this.pageSize = 10;
				this.multipleSelection = [];
				this.$refs.newsTable.clearSelection();
				this.getData();
			}
		}
	},
	methods: {
		// 查询接口
		getData() {
			this.loading = true;
			const data = {};
			// 对获取的值进行处理，只获取最后一个id即可
			data.xwlx_id = this.form.xwlxs[this.form.xwlxs.length - 1];
			data.pageNum = this.pageNum;
			data.pageSize = this.pageSize;
			$.get('/gyrcht/xwgl/xwgl/xwglxwtbCx', {
				params: data
			}).then((res) => {
				const $this = this;
				if (this.multipleSelection.length > 0) {
					setTimeout(() => {
						$this.results = res.returnData.xwtbs;
						this.total = +res.rowsCount || 0;
						this.loading = false;
						$this.$nextTick(() => {
							$this.checked();
						});
					}, 50);
				} else {
					$this.results = res.returnData.xwtbs;
					this.total = +res.rowsCount || 0;
					this.loading = false;
				}
			}).catch(() => {
				this.loading = false;
			});
		},
		// 点击 加载更多
		handleMore() {
			this.pageSize += 10;
			this.getData();
		},
		// 渲染历史选中状态
		checked() {
			this.multipleSelection.forEach((row) => {
				this.$refs.newsTable.toggleRowSelection(this.results.find(item =>
					item.xw_id === row.xw_id), true);
			});
		},
		// 选中新闻
		handleSlectionChange(val) {
			this.multipleSelection = val;
		},
		// 点击 同步
		handleSync() {
			this.dialogSync = true;
		},
		// 点击 确定
		save() {
			this.$refs.formSync.validate((valid) => {
				if (valid) {
					// 从新闻类型
					const oldId = this.form.xwlxs[this.form.xwlxs.length - 1];
					// 到新闻类型
					const newId = this.formSync.xwlxs[this.formSync.xwlxs.length - 1];
					if (oldId === newId) {
						return this.$message.warning('不能将新闻同步到同类别下');
					}
					this.postData(oldId, newId);
					setTimeout(() => {
						this.dialogSync = false;
					}, 5);
				}
			});
		},
		// 点击 取消
		cancel() {
			setTimeout(() => {
				this.$refs.formSync.resetFields();
			}, 5);
			this.dialogSync = false;
		},
		// 同步接口
		postData(oldId, newId) {
			this.loading = true;
			const data = {};
			// 从新闻类型
			data.oldxwlx_id = oldId;
			// 到新闻类型
			data.xwlx_id = newId;
			// 是否同步附件
			data.sftbfj = this.formSync.sftbfj;
			data.xw_ids = [];
			this.multipleSelection.forEach((item) => {
				data.xw_ids.push(item.xw_id);
			});
			$.post('/gyrcht/xwgl/xwgl/xwglxwtbBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('同步成功');
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 查看详情
		handleCheck(row, column) {
			if (column.property === 'bt') {
				this.dialogDetail = true;
				this.formDetail.xw_id = row.xw_id;
				this.getDetail();
			}
		},
		// 详情接口
		getDetail() {
			this.loadingDetail = true;
			$.get('/gyrcht/xwgl/xwgl/xwglxwtbxqCx', {
				params: this.formDetail
			}).then((res) => {
				this.detailRes = res.returnData.xwtbxq;
				this.loadingDetail = false;
			}).catch(() => {
				this.loadingDetail = false;
			});
		}
	},
	// 重新查看页面的时候
	activated() {
		// 按钮权限控制
		getBtnsRight(this.$route.path).then((res) => {
			if (res.returnData.executeResult === '1') {
				const btns = res.returnData.butList;
				// 新闻十三个大类的权限
				const permissions = [btns.xwrcpq, btns.xwldryda, btns.xwzjgl, btns.xwrsdldw,
					btns.xwzcps, btns.xwxlrz, btns.xwdxsjy, btns.xwdwfw,
					btns.xwxxzx, btns.xwgywm, btns.xwrcfw, btns.xwdwapp, btns.xwgrapp];
				this.permissions = permissions.join(',');
			} else {
				this.$message.warning(res.returnData.message);
			}
		}).catch(() => {});
	}
};
</script>

<style scoped>
.getMore, .noMore {
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #3399ff;
}
.getMore {
	cursor: pointer;
}
.file_list li {
	margin-bottom: 5px;
}
.file_list .file_name {
	color: #1f2d3d;
	margin-right: 40px;
	overflow: hidden;
	padding-left: 4px;
	text-overflow: ellipsis;
	transition: color .3s;
	white-space: nowrap;
}
.file_list .file_name:hover {
	color: #3399ff;
}
</style>
