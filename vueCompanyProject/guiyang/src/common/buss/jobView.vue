<docs>
		## 职位预览（）
		* @date ###### Thu Sep 14 16:54:40 CST 2017
		* @author jinglf000
		* @desc 职位查看
</docs>
<template>
		<div class="detail_wrap">
			<div class="content" v-loading="loading">
				<el-row class="info">
					<el-col :span="3">职位名称：</el-col>
					<el-col :span="5">{{result.zwmc}}</el-col>
					<el-col :span="3">工作性质：</el-col>
					<el-col :span="5">{{result.gzxzmc}}</el-col>
					<el-col :span="3">是否双休：</el-col>
					<el-col :span="5">{{+result.sfsx ? '是' : '否'}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">工作地点：</el-col>
					<el-col :span="5">{{result.gzddqmc}}</el-col>
					<el-col :span="3">工作年限（年）：</el-col>
					<el-col :span="5">
						<span v-if="result.gznx">{{result.gznx}}</span>
					</el-col>
					<el-col :span="3">职位类型：</el-col>
					<el-col :span="5">{{result.zwlxmc}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">所需专业：</el-col>
					<el-col :span="5">{{result.sxzymc}}</el-col>
					<el-col :span="3">转正月薪（元）：</el-col>
					<el-col :span="5">
						<span v-if="result.yxfwq&&result.yxfwz">{{result.yxfwq}}-{{result.yxfwz}}</span>
						<span v-else-if="!result.yxfwq&&result.yxfwz">{{result.yxfwz}}以下</span>
						<span v-else-if="result.yxfwq&&!result.yxfwz">{{result.yxfwq}}以上</span>
						<span v-else>不限</span>
					</el-col>
					<el-col :span="3">学历要求：</el-col>
					<el-col :span="5">{{result.xlmc}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">年龄（岁）：</el-col>
					<el-col :span="5">
						<span v-if="result.nlq && !result.nlz">{{result.nlq}}以上</span>
						<span v-else-if="result.nlq && result.nlz">{{result.nlq}}-{{result.nlz}}</span>
					</el-col>
					<el-col :span="3">人数：</el-col>
					<el-col :span="5">
						<span v-if="+result.nanrs && +result.nvrs">共{{result.zprs}}人，男性{{result.nanrs}}人，女性{{result.nvrs}}人</span>
						<span v-else-if="!+result.nanrs && +result.nvrs">女性{{result.nvrs}}人</span>
						<span v-else-if="result.zprs == -2">男性，人数不限</span>
						<span v-else-if="result.zprs == -3">女性，人数不限</span>
						<span v-else-if="+result.nanrs && !+result.nvrs">男性{{result.nanrs}}人</span>
						<span v-else-if="result.zprs > 0 && result.nanrs == 0 && result.nvrs == 0">不限男女，人数{{result.zprs}}人</span>
						<span v-else>不限男女，人数不限</span>
					</el-col>
					<el-col :span="3">是否提供住宿：</el-col>
					<el-col :span="5">{{+result.sftgzs ? '是' : '否'}}</el-col>
				</el-row>
				<el-row class="info" v-if="result.bm_id">
					<el-col :span="3">部门：</el-col>
					<el-col :span="5">{{result.bmmc}}</el-col>
					<el-col :span="3">联系人：</el-col>
					<el-col :span="5">{{result.bmlxr}}</el-col>
					<el-col :span="3">联系方式：</el-col>
					<el-col :span="5">{{result.bmlxfs}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">是否试用：</el-col>
					<el-col :span="5">{{+result.sfsy ? '是' :'否'}}</el-col>
					<el-col :span="3" v-show="result.sfsy === '1'">试用期（月）：</el-col>
					<el-col :span="5" v-show="result.sfsy === '1'">{{result.syqmc}}</el-col>
					<el-col :span="3" v-show="result.sfsy === '1'">试用工资（元）：</el-col>
					<el-col :span="5" v-show="result.sfsy === '1'">{{result.syqgz}}</el-col>
				</el-row>
				<el-row class="info" v-show="result.zplx === '01'">
					<el-col :span="3">职位有效期：</el-col>
					<el-col :span="5">{{result.zwyxqmc}}</el-col>
				</el-row>
				<el-row class="info" v-if="result.fldy">
					<el-col :span="3">福利：</el-col>
					<el-col :span="21">{{result.fldy}}</el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">职位描述：</el-col>
					<el-col :span="21" v-html="result.zwms"></el-col>
				</el-row>
				<el-row class="info">
					<el-col :span="3">职位要求：</el-col>
					<el-col :span="21" v-html="result.zwyq"></el-col>
				</el-row>
			</div>
		</div>
</template>
<script>
import $ from '@/common/js/axios';
import { replaceBlank } from '@/common/js/utils';

export default {
	name: 'jobView',
	props: {
		zwId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			result: {
				zwmc: '',
				gzxzmc: '',
				sfsx: '',
				gzddqmc: '',
				gznx: '',
				zwlxmc: '',
				sxzymc: '',
				fl: '',
				xlmc: '',
				zprs: '',
				zwms: '',
				sfsy: '',
				syq: '',
				syqgz: '',
				sftgzs: '',
				xzdyq: '',
				xzdyz: '',
				nlq: '',
				nlz: '',
				nanrs: '',
				nvrs: '',
				zwyxqmc: '',
				lxr: '',
				lxdh: '',
				bm_id: ''
			}
		};
	},
	watch: {
		zwId() {
			this.getData();
		}
	},
	methods: {
		// 查询职位信息
		getData() {
			this.loading = true;
			$.get('/gyrcht/ywgl/xczpdy/zwxqCx', {
				params: { dwzw_id: this.zwId }
			}).then((res) => {
				this.loading = false;
				this.result = res.returnData.zwxq;
				this.result.zwms = replaceBlank(this.result.zwms);
				this.result.zwyq = replaceBlank(this.result.zwyq);
			}).catch(() => {
				this.loading = false;
			});
		}
	},
	created() {
		this.getData();
	}
};
</script>
<style>

</style>
