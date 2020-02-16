<docs>
	## 客户管理---单位客户管理，查看个人客户简历页
</docs>

<template>
	<div>
		<bread-crumb></bread-crumb>
		<div class="width_100_m">
			<div class="width_main">
				<h1 class="resume_title p_left li_title jl_title">{{ name }}</h1>
				<div class="resume_banner">
					<img v-if="head" :src="head" alt="" class="avatar">
					<img v-else src="../../styles/s1/images/personal/avatar.png" alt="" class="avatar">
					<div class="details">
						<h1 class="name">{{ baseInfo.xm }}
							<i :class="`iconfont ${sexIcon}`"></i>
							<span v-if="baseInfo.xb === '1'">男</span>
							<span v-else-if="baseInfo.xb === '2'">女</span>
							<img class="qrCode" :src="results.ewm">
						</h1>
					</div>
				</div>
				<div class="width_main p_wrap resume_w">
					<div class="p_left">
						<!--基础资料 start-->
						<div class="base_message clearfix" v-show="baseInfo.nl
							|| baseInfo.mzmc
							|| baseInfo.xjzdsfmc
							|| baseInfo.hyzkmc
							|| baseInfo.zzmmmc
							|| baseInfo.gznx">
							<ul>
								<li>
									<i class="icon-wendang iconfont"></i>
									<span v-show="baseInfo.nl" class="age">{{ baseInfo.nl }}岁</span>
									<span v-show="baseInfo.mzmc">{{ baseInfo.mzmc }}</span>
									<span v-show="baseInfo.xjzdsfmc">{{ baseInfo.xjzdsfmc + baseInfo.xjzdsmc + baseInfo.xjzdqmc }}</span>
									<span v-show="baseInfo.hyzkmc">{{ baseInfo.hyzkmc }}</span>
									<span v-show="baseInfo.zzmmmc">{{ baseInfo.zzmmmc }}</span>
									<span v-show="baseInfo.gznx">工作年限：{{ baseInfo.gznx }}年</span>
								</li>
								<li v-show="baseInfo.zjhm">
									<i class="icon-card iconfont"></i>身份证
									<p>{{ baseInfo.zjhm }}</p>
								</li>
								<li v-show="baseInfo.hjsfmc">
									<i class="icon-hujidangyuanjiaofei iconfont"></i>户籍
									<p>{{ baseInfo.hjsfmc + baseInfo.hjsmc + baseInfo.hjqmc }}</p>
								</li>
								<li v-show="baseInfo.sjh">
									<i class="icon-renzhengicondianhua iconfont"></i>{{ baseInfo.sjh }}</li>
								<li v-show="baseInfo.yx">
									<i class="icon-mail iconfont"></i>{{ baseInfo.yx }}</li>
								<li v-if="notRequiredEmpty">
									<i style="padding-right: 0;" class="icon-wendang iconfont"></i>
									<span v-show="baseInfo.qq">QQ：{{ baseInfo.qq }}</span>
									<span v-show="baseInfo.sg">身高：{{ baseInfo.sg }}cm</span>
									<span v-show="baseInfo.tz">体重：{{ baseInfo.tz }}kg</span>
									<span v-show="baseInfo.sl">视力：{{ baseInfo.sl }}</span>
									<span v-show="baseInfo.gddh">固定电话：{{ baseInfo.gddh }}</span>
								</li>
							</ul>
						</div>
						<!--基础资料 end-->
						<!--背景蓝色 job_box上加类on-->
						<div class="cv_wrap">
							<!--求职意向 start-->
							<div class="job_box" v-if="jobIntension.qzyx_id">
								<p class="title">求职意向</p>
								<!--显示 结果盒子 start-->
								<div class="job_s clearfix">
									<p>
										<i class="icon-expect_job iconfont"></i>{{ jobIntension.zwlbmc }}</p>
									<p>
										<i class="icon-expect_industry iconfont"></i>{{ jobIntension.hylbmc }}</p>
									<p>
										<i class="icon-expect_work iconfont"></i>{{ salaryRange }}</p>
									<p>
										<i class="icon-label iconfont"></i>{{ jobIntension.gzxzmc }}</p>
									<p>
										<i class="icon-tag iconfont"></i>{{ jobIntension.gzztmc }}</p>
									<p>
										<i class="icon-address1 iconfont"></i>{{ jobIntension.gzdsfmc +
											jobIntension.gzdsmc + jobIntension.gzdqmc + jobIntension.gzdqjdmc }}</p>
									<p v-show="jobIntension.yqtj">要求条件：{{ jobIntension.yqtj }}</p>
								</div>
								<!--显示 结果盒子 end-->
								<!-- <div class="border_b"></div> -->
							</div>
							<!--求职意向 end-->
							<!--教育背景 start-->
							<div class="job_box" v-if="edu_bg.length > 0">
								<p class="title">教育背景</p>
								<div class="job_s">
									<div v-for="(item, index) in edu_bg" :key="index" class="s_list clearfix">
										<div class="time_z">{{ item.rxsj }}至{{ item.bysj }}</div>
										<div class="text_w">
											<p class="s_title">{{ item.xxmc }}</p>
											<ul class="float_t">
												<li>{{ item.xlxwmc }}</li>
												<li>{{ item.zymcmc }}</li>
												<li>{{ item.sftz? '统招': '非统招'}}</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- <div class="border_b"></div> -->
							</div>
							<!--教育背景 end-->
							<!--工作经验 start-->
							<div class="job_box" v-if="job_bg.length > 0">
								<p class="title">工作经验</p>
								<div class="job_s">
									<div v-for="(item, index) in job_bg" :key="index" class="s_list clearfix">
										<div class="time_z job_icon">{{ item.gzsjks }}至{{ item.gzsjjs }}</div>
										<div class="text_w">
											<p class="s_title ">{{ item.zwmc }}</p>
											<ul class="float_t">
												<li>{{ item.dwmc }}</li>
												<li>{{ item.dwxzmc }}</li>
												<li>{{ item.dwgmmc }}</li>
												<li class="w100">
													<p>所属行业：{{ item.szhymc }}</p>
													<p>月薪：{{ item.zwxjsqmc }}</p>
													<div v-html="item.gzms"></div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<!--工作经验 end-->
							<!--项目经验 start-->
							<div class="job_box" v-if="project_bg.length > 0">
								<p class="title">项目经验</p>
								<div class="job_s">
									<div class="s_list clearfix"
										v-for="(item, index) in project_bg" :key="index">
										<div class="time_z ject_icon">{{ item.xmsjks }}至{{ item.xmsjjs }}</div>
										<div class="text_w">
											<p class="s_title ">{{ item.xmmc }}</p>
											<ul class="float_t">
												<li class="w100">
													<div v-html="item.xmms"></div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<!--项目经验 end-->
							<!--个人证书 start-->
							<div class="job_box" v-if="book.length > 0">
								<p class="title">个人证书</p>
								<div class="job_s">
									<div v-for="(item, index) in book" :key="index" class="s_list clearfix">
										<div class="time_z ject_icon">{{ item.hdsj }}</div>
										<div class="text_w">
											<p>{{ item.zsmc }}</p>
										</div>
									</div>
								</div>
								<!-- <div class="border_b"></div> -->
							</div>
							<!--个人证书 end-->
							<!--语言能力 start-->
							<div class="job_box" v-if="lang.length > 0">
								<p class="title">语言能力</p>
								<div v-for="(item, index) in lang" :key="index">
									<div class="job_s">
										<div class="s_list_02">
											<p class="level_01_t">{{ item.wyyzmc }}</p>
											<span class="skill_name">读写能力：</span>
											<div class="skill_range">
												<p :style="{ width: 125 - item.dxnl * 25 + '%' }">
													<span class="level_info">{{ item.dxnlmc }}
														<span class="level_info_jt"></span>
													</span>
												</p>
											</div>
										</div>
										<div class="s_list_02">
											<span class="skill_name">听说能力：</span>
											<div class="skill_range">
												<p :style="{ width: 125 - item.tsnl * 25 + '%' }">
													<span class="level_info">{{ item.tsnlmc }}
														<span class="level_info_jt"></span>
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<!-- <div class="border_b"></div> -->
							</div>
							<!--语言能力 end-->
							<!--自我评价 start-->
							<div class="job_box" v-if="results.zwpj">
								<p class="title">自我评价</p>
								<div class="job_s">
									<div class="text_s" v-html="results.zwpj"></div>
								</div>
							</div>
							<!--自我评价 end-->
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	</div>
	</div>
	</div>
</template>

<script>
import $ from '@/common/js/axios';
import breadCrumb from '@/common/vue/breadCrumb';
import { replaceBlank } from '@/common/js/utils';

export default {
	name: 'cusPerResume',
	components: { breadCrumb },
	data() {
		return {
			id: '',
			name: '',
			loading: false,
			sexIcon: 'icon-boy',
			// 查询结果
			results: {},
			// 头像路径
			head: '',
			// 基本资料
			baseInfo: {},
			// 求职意向
			jobIntension: {},
			// 教育背景
			edu_bg: [],
			// 工作经验
			job_bg: [],
			// 项目经验
			project_bg: [],
			// 个人证书
			book: [],
			// 语言能力
			lang: []
		};
	},
	computed: {
		salaryRange() {
			if (this.jobIntension.qwxzqmc && this.jobIntension.qwxzzmc) {
				return `${this.jobIntension.qwxzqmc}-${this.jobIntension.qwxzzmc}`;
			} else if (this.jobIntension.qwxzqmc && !this.jobIntension.qwxzzmc) {
				return `${this.jobIntension.qwxzqmc}以上`;
			} else if (!this.jobIntension.qwxzqmc && this.jobIntension.qwxzzmc) {
				return `0-${this.jobIntension.qwxzqmc}`;
			}
			return '不限';
		},
		// 基本资料 身高体重等 非必填项是否存在判断
		notRequiredEmpty() {
			return this.baseInfo.qq || this.baseInfo.sg || this.baseInfo.tz
				|| this.baseInfo.sl || this.baseInfo.gddh;
		}
	},
	watch: {
		/* eslint-disable func-names */
		'baseInfo.xb': function (val) {
			if (val) {
				if (val === '1') {
					this.sexIcon = 'icon-boy';
				} else if (val === '2') {
					this.sexIcon = 'icon-girl';
				}
			}
		}
	},
	methods: {
		getWidth(val) {
			if (val) {
				return (5 - val) * 25;
			}
		},
		getData() {
			this.loading = true;
			const data = { jlid: this.id };
			$.get('/gyrcht/khgl/grkh/jlxqCx', {
				params: data
			}).then((res) => {
				const results = res.returnData.jlxq;
				this.results = results;
				this.head = results.tx.sctxlj + results.tx.txfwdmc;
				this.baseInfo = results.jbzl;
				this.jobIntension = results.qzyx;
				this.edu_bg = results.jybj;
				this.job_bg = results.gzjy;
				this.job_bg.forEach((item) => {
					item.gzms = replaceBlank(item.gzms);
				});
				this.project_bg = results.xmjy;
				this.project_bg.forEach((item) => {
					item.xmms = replaceBlank(item.xmms);
				});
				this.results.zwpj = replaceBlank(this.results.zwpj);
				this.book = results.grzs;
				this.lang = results.yynl;
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.name = this.$route.params.name;
		this.getData();
	},
	// 刷新回到首页
	beforeRouteEnter(to, form, next) {
		if (!to.params.id) {
			next({ name: 'index' });
		} else {
			next();
		}
	}
};
</script>

<style></style>
