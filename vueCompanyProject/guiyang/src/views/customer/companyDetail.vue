<docs>
	## 客户管理---单位客户管理，包含企业的详细信息，含有子路由
	*	coLoginInfo，companyInfo，companyCost，companyDetail
	* 路由参数为：id：dwxx_id（单位信息id)，yhid：yh_id（用户id）
</docs>

<template>
	<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<el-tabs v-model="tabName" type="border-card" class="tab_wrap">
			<el-tab-pane label="登录信息" name="loginInfo">
				<company-login :yhid="yhid"></company-login>
			</el-tab-pane>
			<el-tab-pane label="基本资料" name="baseInfo">
				<company-info :dwxxId="dwxxId"
					:canSave="btns.dwxgzl"
					:canDownload="btns.dwxztp"
					:canUpload="btns.dwsctp"></company-info>
			</el-tab-pane>
			<el-tab-pane label="账户信息" name="costInfo" :disabled="!dwxxId">
				<company-cost :dwxxId="dwxxId" :yhid="yhid" v-if="costVisited"
					:canChange="btns.dwzhtz"></company-cost>
			</el-tab-pane>
			<el-tab-pane label="行为记录" name="operate" :disabled="!dwxxId">
				<company-operate :dwxxId="dwxxId" v-if="operateVisited"></company-operate>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import companyLogin from '@/views/customer/components/companyLogin';
import companyInfo from '@/views/customer/components/companyInfo';
import companyCost from '@/views/customer/components/companyCost';
import companyOperate from '@/views/customer/components/companyOperate';
import breadCrumb from '@/common/vue/breadCrumb';

export default {
	name: 'cusComDetail',
	components: {
		companyLogin,
		companyInfo,
		companyCost,
		companyOperate,
		breadCrumb
	},
	data() {
		return {
			tabName: 'baseInfo',
			costVisited: false,
			operateVisited: false,
			dwxxId: '',
			yhid: '',
			btns: {}
		};
	},
	watch: {
		tabName(val) {
			switch (val) {
			case 'costInfo': this.costVisited = true; break;
			case 'operate': this.operateVisited = true; break;
			default: break;
			}
		}
	},
	beforeRouteEnter(to, form, next) {
		if (!to.params.yhid) {
			next({ name: 'index' });
		} else {
			next();
		}
	},
	created() {
		const params = this.$route.params;
		this.dwxxId = params.dwxxId;
		this.yhid = params.yhid;
		this.btns = params.btns;
	}
};
</script>

<style></style>
