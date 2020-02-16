<docs>
	##求职招聘---急需岗位
	* @author ChenXue
	* @date 2018年7月12日
	* @desc 查询 / 标记 急需岗位
</docs>
<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<!-- 查询结果 start-->
		<div class="loading" v-loading="loading">
			<div class="result_wrap">
				<el-table :data="zxResults" stripe border class="width_100 table_wrap">
					<el-table-column :label="zxResults.length > 0 ? zxResults[0].bt : ''">
						<el-table-column :label="`点击数（${zxResults.length > 0 ? zxResults[0].djs : ''}）`" prop="">
							<el-table-column label="Web" prop="web_djs"></el-table-column>
							<el-table-column label="App" prop="app_djs"></el-table-column>
						</el-table-column>
						<el-table-column :label="`点赞数（${zxResults.length > 0 ? zxResults[0].dzs : ''}）`" prop="">
							<el-table-column label="Web" prop="web_dzs"></el-table-column>
							<el-table-column label="App" prop="app_dzs"></el-table-column>
						</el-table-column>
						<el-table-column :label="`分享数（${zxResults.length > 0 ? zxResults[0].fxs : ''}）`" prop="">
							<el-table-column label="Web" prop="web_fxs"></el-table-column>
							<el-table-column label="App" prop="app_fxs"></el-table-column>
						</el-table-column>
						<el-table-column :label="`评论数（${zxResults.length > 0 ? zxResults[0].pls : ''}）`" prop="">
							<el-table-column label="Web" prop="web_pls"></el-table-column>
							<el-table-column label="App" prop="app_pls"></el-table-column>
						</el-table-column>
					</el-table-column>
				</el-table>
			</div>
			<div class="result_wrap">
				<el-table :data="results"
					row-key='zxpl_id'
					stripe
					class="width_100 table_wrap"
					:expand-row-keys="expands"
					@expand="getExpandInfo">
					<el-table-column width="40" type="expand">
						<template scope="expandInfo">
							<el-row class="align_left">
								<!-- <el-table :data="expandInfo.row.children" stripe class="width_100 table_wrap"> -->
								<el-table :data="expandResults" stripe class="width_100 table_wrap">
									<el-table-column label="回复人" prop="hfrmc"></el-table-column>
									<el-table-column label="被回复人" prop="bhfrmc"></el-table-column>
									<el-table-column label="回复内容" prop="hfnr"></el-table-column>
									<el-table-column label="回复时间" prop="hfsj"></el-table-column>
									<el-table-column label="操作" width="90" prop="hyid">
										<template scope="scopeSc">
											<el-button title="回复" type="primary" size="mini" icon="edit"
												@click.stop="revertBtn('formRevert', scopeSc.row, 'Sub')"></el-button>
											<el-button title="删除" size="mini" type="danger" icon="delete"
												@click="btnDelete(scopeSc.row, 'Sub')"></el-button>
										</template>
									</el-table-column>
									<el-table-column v-if="expandInfo.hfsj" label="回复时间" prop="hfsj"></el-table-column>
								</el-table>
							</el-row>
						</template>
					</el-table-column>
					<el-table-column label="评论人" prop="sjh"></el-table-column>
					<el-table-column label="评论内容" prop="plnr"></el-table-column>
					<el-table-column label="数据来源" prop="sjly"></el-table-column>
					<el-table-column label="操作" width="90" prop="hyid">
						<template scope="scope">
							<el-button title="回复" type="primary" size="mini" icon="edit"
								@click.stop="revertBtn('formRevert', scope.row, 'Parent')"></el-button>
							<el-button title="删除" size="mini" type="danger" icon="delete"
								@click="btnDelete(scope.row, 'Parent')"></el-button>
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
		<!-- 查询结果  end -->
		<!-- 回复弹框 开始 -->
		<el-dialog title="回复" :visible.sync="visible" size="tiny" class="dialog">
			<el-form :model="formRevert" ref="formRevert" :label-width="labelWidth">
				<el-form-item label="回复内容" prop="plnr">
					<el-input type="textarea" v-model="formRevert.plnr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogCancel('formRevert')">取消</el-button>
				<el-button type="primary" @click="dialogSubmit('formRevert')">确定</el-button>
			</div>
		</el-dialog>
		<!-- 回复弹框 结束 -->
	</div>
</template>
<script>
import { labelWidth } from '@/common/js/config';
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'commentDetail',
	components: { breadCrumb },
	data() {
		return {
			labelWidth,
			// ====================>查询
			// 加载状态
			loading: false,
			// 双向绑定数据
			form: {
				pageNum: 1
			},
			// 克隆表单（用于提交）
			formRight: {},
			// 结果
			results: [],
			zxResults: [],
			expandResults: [],
			expands: [],
			visible: false,
			formRevert: {
				zx_id: '',
				plnr: '',
				sjly: '30',
				sffj: '0',
				parent_id: '',
				parent_p_id: ''
			},
			// 总数
			pageTotal: 0
		};
	},
	methods: {
		// 资讯评论列表 查询接口
		getData() {
			this.loading = true;
			$.get('/gyrcht/zxgl/xxzxpl/xxzxplCx', {
				params: {
					zx_id: this.$route.params.zx_id
				}
			}).then((res) => {
				this.results = res.returnData.zxpl;
				this.zxResults = res.returnData.zx;
				this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		//  =============================> 删
		// 评论 删除按钮
		btnDelete(row, type) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.delInform(row, type);
			}).catch(() => {});
		},
		delInform(row, type) {
			this.loading = true;
			$.delete('/gyrcht/zxgl/xxzxpl/xxzxplSc', {
				params: {
					zxpl_id: type === 'Parent' ? row.zxpl_id : row.plhf_id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('删除成功！');
					if (type === 'Parent') {
						this.getData();
					} else {
						if (this.expands.indexOf(row.zxpl_id) < 0) {
							this.expands = [];
							this.expands.push(row.zxpl_id);
						}
						this.getExpandData(row.zxpl_id);
					}
				} else {
					this.$message.warning(res.returnData.message);
				}
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 获取展开信息 点击下拉按钮
		getExpandInfo(row, expanded) {
			if (this.expands.indexOf(row.zxpl_id) < 0) {
				this.expands = [];
				this.expands.push(row.zxpl_id);
			}
			if (expanded) {
				this.loading = true;
				this.getExpandData(row.zxpl_id);
			}
		},
		// 获取展开信息 接口
		getExpandData(id) {
			$.get('/gyrcht/zxgl/xxzxpl/xxzxplhfCx', {
				params: {
					zxpl_id: id
				}
			}).then((res) => {
				// row.children = res.rseturnData.zxplhf;
				this.expandResults = res.returnData.zxplhf;
				// this.pageTotal = +res.rowsCount || 0;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 回复 按钮
		revertBtn(formName, row, type) {
			this.visible = true;
			if (this.$refs[formName]) {
				this.$refs[formName].resetFields();
			}
			if (type === 'Parent') {
				this.formRevert.parent_p_id = row.zxpl_id;
				this.formRevert.parent_id = row.zxpl_id;
			} else if (type === 'Sub') {
				this.formRevert.parent_p_id = row.zxpl_id;
				this.formRevert.parent_id = row.plhf_id;
			}
		},
		// 回复弹框 取消按钮
		dialogCancel(formName) {
			this.visible = false;
			this.$refs[formName].resetFields();
		},
		// 回复弹框 确定按钮
		dialogSubmit() {
			this.formRevert.zx_id = this.$route.params.zx_id;
			$.post('/gyrcht/zxgl/xxzxpl/xxzxPl', this.formRevert).then((res) => {
				if (res.returnData.executeResult === '1') {
					const { parent_p_id } = this.formRevert;
					this.$message.success('回复成功！');
					if (this.expands.indexOf(parent_p_id) < 0) {
						this.expands = [];
						this.expands.push(parent_p_id);
					}
					this.getExpandData(parent_p_id);
					this.visible = false;
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		}
	},
	created() {
		this.getData();
		Object.assign(this.formRight, this.form);
	},
	beforeRouteEnter(to, from, next) {
		if (to.params.zx_id === undefined) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
