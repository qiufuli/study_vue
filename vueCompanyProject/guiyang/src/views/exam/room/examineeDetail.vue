<docs>
	## 考试管理---考场管理---考生分配
	* @author SHJ
	* @date 2017年12月5日
	* @desc
</docs>
<template>
	<div>
		<bread-crumb></bread-crumb>
		<div class="detail_wrap">
			<h3 class="exam_name">考试名称：{{ksmc}}</h3>
			<div class="btns">
				<el-button size="small" class="no_radius" type="primary" @click="mergeRoom"
				:disabled="!isSelect">合并</el-button>
				<!-- <el-button size="small" class="no_radius" @click="cacelMerge"
				>取消合并</el-button> -->
				<el-button size="small" class="no_radius" type="primary" @click="subAllot"
				:disabled="!isMinflag">分配</el-button>
				<el-button size="small" class="no_radius" @click="cacelDis"
				:disabled="!isMinflag">取消分配</el-button>
			</div>
			<el-tabs v-model="tabOn">
				<el-tab-pane v-for="(item, index) in editableTabs" :label="item.kmsj" :name="item.kmsjname" :key="index">
					<el-table :data="item.kmlb" class="table_wrap" stripe @selection-change="jobtableSelect">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column label="科目名称" prop="kmmc"></el-table-column>
						<el-table-column label="未满考场人数" prop="wmkcrs">
							<template scope="amNum"><span class="color_red">{{amNum.row.wmkcrs}}</span>人</template>
						</el-table-column>
						<el-table-column label="操作">
							<template scope="breakUp">
								<el-button v-if="breakUp.row.sfhb === '1'" class="btn_square"
									@click="subjectBreakUp(breakUp.row)">取消合并</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import breadCrumb from '@/common/vue/breadCrumb';
import $ from '@/common/js/axios';

export default {
	name: 'examineeDetail',
	components: { breadCrumb },
	data() {
		return {
			// 默认面包屑
			tabOn: 'am',
			// 考试名称
			ksmc: '',
			amKssj: '', // 上午考试时间
			searchId: '', // 考试id
			editableTabs: [], // 数据
			yfpIdArr: [], // 预分配id数组
			isSelect: false, // 判断是否选中
			fpflag: false,
			isMinflag: true
		};
	},
	methods: {
		// 单条数据 取消合并考场
		subjectBreakUp(row) {
			const data = {
				yfp_id: row.yfp_id,
				ks_id: this.searchId,
				km_id: row.km_id
			};
			$.put('/gyrcht/ksgl/ksfp/qxhbkmkcBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('取消合并成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 查询科目
		getData() {
			this.loading = true;
			$.get('/gyrcht/ksgl/ksfp/fpkskmlbCx', {
				params: { ks_id: this.searchId }
			}).then((res) => {
				this.editableTabs = res.returnData.kmlbxx;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		getDatas() {
			this.loading = true;
			$.get('/gyrcht/ksgl/ksfp/fpksCx', {
				params: { ks_id: this.$route.params.id }
			}).then((res) => {
				this.getRule();
				this.$store.state.infoResult = res;
				this.$router.push({ name: 'examinee', params: { fpflag: this.fpflag } });
			}).catch(() => {
			});
		},
		getRule() {
			this.loading = true;
			$.get('/gyrcht/ksgl/common/bkksxxCx', {
				params: {
					ks_id: this.$route.params.id
				}
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.isFpks = res.returnData.ksxq.sffpks;
					if (res.returnData.ksxq.sffpks === '1') {
						this.isAllot = true;
					} else {
						this.isAllot = false;
					}
					if (res.returnData.ksxq.zkzhgz) {
						this.isDisRxam = true;
					} else {
						this.isDisRxam = false;
					}
					this.formRule.zkzhgz = res.returnData.ksxq.zkzhgz || '';
					this.examNumber = res.returnData.ksxq.zkzhgz || '';
				}
				this.loading = false;
			}).catch(() => {
				this.isDisRxam = false;
				this.isAllot = false;
				this.loading = false;
			});
		},
		// 分配考生
		subAllot() {
			const data = {
				ks_id: this.searchId
			};
			$.post('/gyrcht/ksgl/ksfp/fpksBc', data)
			.then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('分配考生成功！');
					this.$store.state.isAllot = true;
					this.$store.state.isFpks = '1';
					this.getDatas();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 取消分配考生
		cacelDis() {
			$.put('/gyrcht/ksgl/ksfp/qxfpksBc', {
				ks_id: this.searchId
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('取消分配成功！');
					this.$store.state.isAllot = false;
					this.$store.state.isFpks = '0';
					this.getDatas();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		//  合并科目考场
		mergeRoom() {
			$.put('/gyrcht/ksgl/ksfp/hbkmkcBc', {
				yfp_idArr: this.yfpIdArr,
				ks_id: this.searchId
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('合并成功！');
					this.getData();
				} else {
					this.$message.warning(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 取消合并
		// cacelMerge() {
		// 	$.put('/gyrcht/ksgl/ksfp/qxhbkmkcBc', {
		// 		yfp_idArr: this.yfpIdArr,
		// 		ks_id: this.searchId
		// 	}).then((res) => {
		// 		if (res.returnData.executeResult === '1') {
		// 			this.$message.success('取消合并成功！');
		// 			this.getData();
		// 		} else {
		// 			this.$message.warning(res.returnData.message);
		// 		}
		// 	}).catch(() => {});
		// },
		// 获取选中的值
		jobtableSelect(rows) {
			if (rows.length > 0) {
				this.isMinflag = false;
			} else {
				this.isMinflag = true;
			}
			if (rows.length > 1) {
				this.isSelect = true;
			} else {
				this.isSelect = false;
			}
			this.yfpIdArr = [];
			rows.forEach((item) => {
				this.yfpIdArr.push(item.yfp_id);
			});
		}
	},
	created() {
		this.ksmc = this.$route.params.ksmc;
		this.searchId = this.$route.params.id;
		this.getData();
	},
	beforeRouteEnter(to, from, next) {
		if (!to.params.ksmc) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style scoped>
	.exam_name {
		font-size: 16px;
		font-weight: 600;
	}
	.btns {
		margin: 10px 0;
	}
	.color_red {
		color: #ff4949;
	}
</style>
