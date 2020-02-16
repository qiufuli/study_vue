<docs>
	## 人才库---绿卡编辑/添加详情
	* @date ###### 2018-09-12
	* @author luxy
	* @desc 绿卡编辑/添加详情
</docs>

<template>
<div class="detail_wrap">
		<bread-crumb></bread-crumb>
		<!-- 基本信息  start-->
		<el-form :model="formBase" label-width="130px" :rules="rules" v-loading="loading"
			ref="formBase">
			<el-row>
				<el-col :span="24"><h3 class="title">个人基本信息</h3></el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="姓名" required prop="yhxm">
						<el-input v-model="formBase.yhxm"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="性别" prop="xb">
						<el-switch v-model="formBase.xb"
							:on-color="color.on" :off-color="color.on" on-value="1"
							off-value="2" on-text="男" off-text="女"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="身份证号码" required prop="sfzhm">
						<el-input @blur="handleIdef(formBase.sfzhm)" v-model="formBase.sfzhm"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="现居住地" required prop="xjzdq">
						<address-select :changeOnSelect="false" v-model="formBase.xjzdq" xzqhjb="3"></address-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号" required prop="sjh">
						<el-input v-model="formBase.sjh"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="出生日期" required prop="csrq">
						<el-date-picker v-model="formBase.csrq" :editable="false" class="date_picker"
							:picker-options="pickerNow"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="政治面貌" prop="zzmm">
						<select-code v-model="formBase.zzmm" code="gyrlzyw_qzzp_d_zzmm"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="民族" required prop="mz">
						<select-code v-model="formBase.mz" code="gyrlzyw_qzzp_d_mz"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="户籍" required prop="hjq">
						<address-select :changeOnSelect="false" v-model="formBase.hjq" xzqhjb="3"></address-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="在黔或回黔工作" required prop="sfzqgz">
						<el-select v-model="formBase.sfzqgz">
							<el-option value="" label="全部"></el-option>
							<el-option value="1" label="是"></el-option>
							<el-option value="0" label="否"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="职位类型" prop="zwlx">
						<job-select v-model="formBase.zwlx"></job-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="所属行业" prop="sshy">
						<trade-select v-model="formBase.sshy"></trade-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="国籍" prop="gj">
						<select-code v-model="formBase.gj" code="gyrlzyw_rck_d_gj"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="籍贯" prop="jg">
						<address-select :changeOnSelect="false" v-model="formBase.jg" xzqhjb="3"></address-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="邮箱" prop="yx">
						<el-input v-model="formBase.yx"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="固定电话" prop="gddh">
						<el-input v-model="formBase.gddh"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="QQ" prop="qq">
						<el-input v-model="formBase.qq"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="通讯地址" prop="txdz">
						<el-input v-model="formBase.txdz"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="婚姻状况" prop="hyzk">
						<select-code v-model="formBase.hyzk" code="gyrlzyw_qzzp_d_hyzk"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="工作年限" required prop="gznx">
						<select-code v-model="formBase.gznx" code="gyrlzyw_qzzp_d_gzjy"
							:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="身高(cm)" prop="sg">
						<el-input v-model="formBase.sg"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="体重(kg)" prop="tz">
						<el-input v-model="formBase.tz"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="视力" prop="sl">
						<el-input v-model="formBase.sl"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveBase('formBase')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formGreen" label-width="130px" :rules="rules" v-loading="loading"
		ref="formGreen">
			<el-row>
				<el-col :span="24"><h3 class="title">绿卡信息</h3></el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="绿卡编号" required prop="lkbh">
						<el-input v-model="formGreen.lkbh"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="银行卡号" required prop="yhkh">
						<el-input v-model="formGreen.yhkh"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="人才类别" required prop="rclb">
						<select-code v-model="formGreen.rclb" required code="gyrlzyw_rck_d_rclb"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="专家类别" required prop="zjlb">
						<select-code v-model="formGreen.zjlb" code="gyrlzyw_rck_d_zjlb"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="绿卡状态" required prop="lkzt">
						<select-code v-model="formGreen.lkzt" code="gyrlzyw_rck_d_lkzt"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="审核批次" required prop="shpc">
						<select-code v-model="formGreen.shpc" code="gyrlzyw_rck_d_shpc"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="领卡日期" prop="lkrq">
						<el-date-picker v-model="formGreen.lkrq" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="年检日期" prop="njrq">
						<el-date-picker v-model="formGreen.njrq" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="现工作单位" prop="xgzdw">
						<el-input v-model="formGreen.xgzdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="行政职务" prop="xzzw">
						<el-input v-model="formGreen.xzzw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="申报单位" prop="sbdw">
						<el-input v-model="formGreen.sbdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="主管部门" prop="zgbm">
						<el-input v-model="formGreen.zgbm"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveGreen('formGreen')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formApply" label-width="130px" :rules="rules" v-loading="loading"
		ref="formApply">
			<el-row>
				<el-col :span="12"><h3 class="title">申请服务</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formApply')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in applyArr" :key="index" class="detail_info" v-show="formApplyShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formApply')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="applyDel(item.sqfw_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">服务类型</el-col>
				<el-col :span="3">{{item.fwlxmc}}</el-col>
				<el-col :span="3" class="label">是否办结</el-col>
				<el-col :span="3">
					<span v-if="item.sfbj == 1">是</span>
					<span v-else>否</span>
				</el-col>
				<el-col :span="3" class="label">申请时间</el-col>
				<el-col :span="3">{{item.sqsj}}</el-col>
				<el-col :span="3" class="label">办结时间</el-col>
				<el-col :span="3">{{item.bjsj}}</el-col>
				<el-col :span="3" class="label">备注</el-col>
				<el-col :span="21">{{item.sqfwbz}}</el-col>
			</el-row>
			<el-row v-show="!formApplyShow">
				<el-col :span="8">
					<el-form-item label="服务类型" required prop="fwlx">
						<select-code v-model="formApply.fwlx" code="gyrlzyw_rck_d_fwlx"
							:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="是否办结" required prop="sfbj">
						<el-select v-model="formApply.sfbj">
							<el-option value="" label="全部"></el-option>
							<el-option value="1" label="是"></el-option>
							<el-option value="0" label="否"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="申请时间" required prop="sqsj">
						<el-date-picker v-model="formApply.sqsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="办结时间" prop="bjsj">
						<el-date-picker v-model="formApply.bjsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="备注" prop="sqfwbz">
						<el-input v-model="formApply.sqfwbz"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formApplyShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveApply('formApply')">保存</el-button>
					<!-- <el-button type="primary" class="btn_square"
					@click="cancel('formApply')">取消</el-button> -->
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formLife" label-width="130px" :rules="rules" v-loading="loading"
		ref="formLife">
			<el-row>
				<el-col :span="12"><h3 class="title">生活津贴</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formLife')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in lifeArr" :key="index" class="detail_info" v-show="formLifeShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formLife')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="lifeDel(item.shbt_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">津贴时间起</el-col>
				<el-col :span="3">{{item.btsjz}}</el-col>
				<el-col :span="3" class="label">津贴时间止</el-col>
				<el-col :span="3">{{item.btsjz}}</el-col>
				<el-col :span="3" class="label">津贴金额（元）</el-col>
				<el-col :span="3">{{item.shbtje}}</el-col>
				<el-col :span="3" class="label">补贴形式</el-col>
				<el-col :span="3">{{item.shbtxsmc}}</el-col>
				<el-col :span="3" class="label">补贴单位</el-col>
				<el-col :span="3">{{item.shbtdw}}</el-col>
				<el-col :span="3" class="label">备注</el-col>
				<el-col :span="15">{{item.shbtbz}}</el-col>
			</el-row>
			<el-row v-show="!formLifeShow">
				<el-col :span="8">
					<el-form-item label="津贴时间起" required prop="btsjq">
						<el-date-picker v-model="formLife.btsjq" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="津贴时间止" required prop="btsjz">
						<el-date-picker v-model="formLife.btsjz" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="津贴金额（元）" required prop="shbtje">
						<el-input v-model="formLife.shbtje"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴形式" required prop="shbtxs">
						<select-code v-model="formLife.shbtxs" code="gyrlzyw_rck_d_btxs"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴单位" prop="shbtdw">
						<el-input v-model="formLife.shbtdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="备注" prop="shbtbz">
						<el-input v-model="formLife.shbtbz"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formLifeShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveLife('formLife')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formMedical" label-width="130px" :rules="rules" v-loading="loading"
		ref="formMedical">
			<el-row>
				<el-col :span="12"><h3 class="title">医保兑现</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formMedical')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in medicalArr" :key="index" class="detail_info" v-show="formMedicalShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formMedical')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="medicalDel(item.ybdx_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">兑现时间起</el-col>
				<el-col :span="3">{{item.dxsjq}}</el-col>
				<el-col :span="3" class="label">兑现时间止</el-col>
				<el-col :span="3">{{item.dxsjz}}</el-col>
				<el-col :span="3" class="label">补贴金额（元）</el-col>
				<el-col :span="3">{{item.ybbtje}}</el-col>
				<el-col :span="3" class="label">补贴形式</el-col>
				<el-col :span="3">{{item.ybbtxsmc}}</el-col>
				<el-col :span="3" class="label">补贴单位</el-col>
				<el-col :span="3">{{item.ybbtdw}}</el-col>
				<el-col :span="3" class="label">备注</el-col>
				<el-col :span="15">{{item.ybdxbz}}</el-col>
			</el-row>
			<el-row v-show="!formMedicalShow">
				<el-col :span="8">
					<el-form-item label="兑现时间起" required prop="dxsjq">
						<el-date-picker v-model="formMedical.dxsjq" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="兑现时间止" required prop="dxsjz">
						<el-date-picker v-model="formMedical.dxsjz" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴金额（元）" required prop="ybbtje">
						<el-input v-model="formMedical.ybbtje"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴形式" required prop="ybbtxs">
						<select-code v-model="formMedical.ybbtxs" code="gyrlzyw_rck_d_btxs"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴单位" required prop="ybbtdw">
						<el-input v-model="formMedical.ybbtdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="备注" prop="ybdxbz">
						<el-input v-model="formMedical.ybdxbz"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formMedicalShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveMedical('formMedical')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formHouse" label-width="130px" :rules="rules" v-loading="loading"
		ref="formHouse">
			<el-row>
				<el-col :span="12"><h3 class="title">住房补贴</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formHouse')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in houseArr" :key="index" class="detail_info" v-show="formHouseShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formHouse')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="houseDel(item.zfbt_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">补贴时间</el-col>
				<el-col :span="3">{{item.btsj}}</el-col>
				<el-col :span="3">{{item.dxsjz}}</el-col>
				<el-col :span="3" class="label">补贴金额（元）</el-col>
				<el-col :span="3">{{item.zfbtje}}</el-col>
				<el-col :span="3">{{item.ybbtxs}}</el-col>
				<el-col :span="3" class="label">补贴单位</el-col>
				<el-col :span="3">{{item.zfbtdw}}</el-col>
				<el-col :span="3" class="label">备注</el-col>
				<el-col :span="15">{{item.zfbtbz}}</el-col>
			</el-row>
			<el-row v-show="!formHouseShow">
				<el-col :span="8">
					<el-form-item label="补贴时间" required prop="btsj">
						<el-date-picker v-model="formHouse.btsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴金额（元）" required prop="zfbtje">
						<el-input v-model="formHouse.zfbtje"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="补贴单位" required prop="zfbtdw">
						<el-input v-model="formHouse.zfbtdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="备注" prop="zfbtbz">
						<el-input v-model="formHouse.zfbtbz"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formHouseShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveHouse('formHouse')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formEdu" label-width="130px" :rules="rules" v-loading="loading"
		ref="formEdu">
			<el-row>
				<el-col :span="12"><h3 class="title">教育背景</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formEdu')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in eduArr" :key="index" class="detail_info" v-show="formEduShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formEdu')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="eduDel(item.jybj_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">学校名称</el-col>
				<el-col :span="3">{{item.xxmc}}</el-col>
				<el-col :span="3" class="label">专业名称</el-col>
				<el-col :span="3">{{item.zymcmc}}</el-col>
				<el-col :span="3" class="label">学历学位</el-col>
				<el-col :span="3">{{item.xlmc}}</el-col>
				<el-col :span="3" class="label">是否统招</el-col>
				<el-col :span="3">
					<span v-if="item.sftz == 1">是</span>
					<span v-else>否</span>
				</el-col>
				<el-col :span="3" class="label">入学时间</el-col>
				<el-col :span="3">{{item.rxsj}}</el-col>
				<el-col :span="3" class="label">毕业时间</el-col>
				<el-col :span="3">{{item.bysj}}</el-col>
				<el-col :span="3" class="label">高校所在地</el-col>
				<el-col :span="9">{{item.gxszd}}</el-col>
				<el-col :span="3" class="label">备注</el-col>
				<el-col :span="21">{{item.jybjbz}}</el-col>
			</el-row>
			<el-row v-show="!formEduShow">
				<el-col :span="8">
					<el-form-item label="学校名称" required prop="xxmc">
						<el-input v-model="formEdu.xxmc"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="专业名称" required prop="zymc">
						<major-select v-model="formEdu.zymc"></major-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="学历学位" required prop="xl">
						<select-code v-model="formEdu.xl" code="gyrlzyw_qzzp_d_xl"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="是否统招" required prop="sftz">
						<el-select v-model="formEdu.sftz">
							<el-option value="" label="全部"></el-option>
							<el-option value="1" label="是"></el-option>
							<el-option value="0" label="否"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="入学时间" required prop="rxsj">
						<el-date-picker v-model="formEdu.rxsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="毕业时间" required prop="bysj">
						<el-date-picker v-model="formEdu.bysj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="高校所在地" prop="gxszd">
						<el-input v-model="formEdu.gxszd"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="备注" prop="jybjbz">
						<el-input v-model="formEdu.jybjbz"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formEduShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveEdu('formEdu')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formFamily" label-width="130px" :rules="rules" v-loading="loading"
		ref="formFamily">
			<el-row>
				<el-col :span="12"><h3 class="title">家庭成员</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formFamily')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in familyArr" :key="index" class="detail_info" v-show="formFamilyShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formFamily')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="familyDel(item.jtcy_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">称谓</el-col>
				<el-col :span="3">{{item.cw}}</el-col>
				<el-col :span="3" class="label">姓名</el-col>
				<el-col :span="3">{{item.xm}}</el-col>
				<el-col :span="3" class="label">出生年月</el-col>
				<el-col :span="3">{{item.csny}}</el-col>
				<el-col :span="3" class="label">政治面貌</el-col>
				<el-col :span="3">{{item.jtcyzzmmmc}}</el-col>
				<el-col :span="3" class="label">工作单位</el-col>
				<el-col :span="3">{{item.gzdw}}</el-col>
				<el-col :span="3" class="label">职务</el-col>
				<el-col :span="3">{{item.zw}}</el-col>
			</el-row>
			<el-row v-show="!formFamilyShow">
				<el-col :span="8">
					<el-form-item label="称谓" required prop="cw">
						<el-input v-model="formFamily.cw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="姓名" required prop="xm">
						<el-input v-model="formFamily.xm"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="出生年月" prop="csny">
						<el-date-picker v-model="formFamily.csny" :editable="false" class="date_picker"
							:picker-options="pickerNow"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="政治面貌" prop="jtcyzzmm">
						<select-code v-model="formFamily.jtcyzzmm" code="gyrlzyw_qzzp_d_zzmm"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="工作单位" prop="gzdw">
						<el-input v-model="formFamily.gzdw"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="职务" prop="zw">
						<el-input v-model="formFamily.zw"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formFamilyShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveFamily('formFamily')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formTech" label-width="130px" :rules="rules" v-loading="loading"
		ref="formTech">
			<el-row>
				<el-col :span="12"><h3 class="title">专业技术职务</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formTech')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in techArr" :key="index" class="detail_info" v-show="formTechShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formTech')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="techDel(item.zyjszw_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">专业技术职务</el-col>
				<el-col :span="3">{{item.zyjszwlx}}</el-col>
				<el-col :span="3" class="label">获得时间</el-col>
				<el-col :span="3">{{item.zyjszwhdsj}}</el-col>
			</el-row>
			<el-row v-show="!formTechShow">
				<el-col :span="8">
					<el-form-item label="专业技术职务" required prop="zyjszwlx">
						<el-input v-model="formTech.zyjszwlx"></el-input>
						<!-- <select-code v-model="formTech.zyjszwlx" code="gyrlzyw_rck_d_zyjszw"
								:has-all="false"></select-code> -->
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="获得时间" required prop="zyjszwhdsj">
						<el-date-picker v-model="formTech.zyjszwhdsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formTechShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveTech('formTech')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<el-form :model="formQual" label-width="130px" :rules="rules" v-loading="loading"
		ref="formQual">
			<el-row>
				<el-col :span="12"><h3 class="title">职业资格等级</h3></el-col>
				<el-col :span="12">
					<el-form-item align="right">
						<el-button icon="plus" size="small" type="primary" class="btn_square"
							@click="handleAdd('formQual')">添加</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-for="(item, index) in qualArr" :key="index" class="detail_info" v-show="formQualShow">
				<el-col :span="24" class="label">
					<el-button title="编辑" size="mini" type="primary" icon="edit"
						@click="handleEdit(item,'formQual')">编辑</el-button>
					<el-button title="删除" size="mini" type="danger" icon="delete"
						@click="qualDel(item.zyzgdj_id)">删除</el-button>
				</el-col>
				<el-col :span="3" class="label">职业资格等级</el-col>
				<el-col :span="3">{{item.zyzgdjmc}}</el-col>
				<el-col :span="3" class="label">获得时间</el-col>
				<el-col :span="3">{{item.zyzgdjhdsj}}</el-col>
			</el-row>
			<el-row v-show="!formQualShow">
				<el-col :span="8">
					<el-form-item label="职业资格等级" prop="zyzgdj">
						<select-code v-model="formQual.zyzgdj" code="gyrlzyw_rck_d_zyzgdjzs"
								:has-all="false"></select-code>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="获得时间" prop="zyzgdjhdsj">
						<el-date-picker v-model="formQual.zyzgdjhdsj" :editable="false" class="date_picker"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-show="!formQualShow">
				<el-form-item>
					<el-button type="primary" class="btn_square"
						@click="saveQual('formQual')">保存</el-button>
				</el-form-item>
			</el-row>
		</el-form>
		<!-- 基本信息  end -->
	<!-- 设置报名字段  end -->
</div>
</template>

<script>
import $ from '@/common/js/axios';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';
import { labelWidth, colorOn, colorOff } from '@/common/js/config';
import addressSelect from '@/common/vue/multiSelect/addressSelect';
import majorSelect from '@/common/vue/multiSelect/majorSelect';
import jobSelect from '@/common/vue/multiSelect/jobSelect';
import tradeSelect from '@/common/vue/multiSelect/tradeSelect';
import breadCrumb from '@/common/vue/breadCrumb';
import dateAss from '@/common/vue/dateAss';
import uploadImg from '@/common/vue/uploadImg';
// import { Base64 } from 'js-base64';

export default {
	name: 'talePoDetail',
	components: {
		selectCode,
		jobSelect,
		tradeSelect,
		addressSelect,
		majorSelect,
		breadCrumb,
		dateAss,
		uploadImg
	},
	data() {
		return {
			// @ 统一的label宽度
			labelWidth,
			// @ Switch 统一颜色
			color: {
				on: colorOn,
				off: colorOff
			},
			// 加载
			loading: false,
			// 面包屑
			// tabOn: 'baseInfo',
			formApplyShow: true,
			formEduShow: true,
			formFamilyShow: true,
			formMedicalShow: true,
			formLifeShow: true,
			formHouseShow: true,
			formTechShow: true,
			formQualShow: true,
			// 基本信息
			formBase: {	//	人才基本信息
				grjbxx_id: '',
				czlx: 0,
				yhxm: '',
				xb: '',
				sfzhm: '',
				csrq: '',
				sg: '',
				sl: '',
				tz: '',
				hyzk: '',
				zwlx: '',
				sshy: '',
				gddh: '',
				qq: '',
				sjh: '',
				yx: '',
				hjq: '',
				xjzdq: '',
				mz: '',
				gznx: '',
				gj: '',
				jg: '',
				txdz: '',
				sfzqgz: '',
				zzmm: ''
			},
			formEdu: { // 人才教育背景信息
				grjbxx_id: '',
				jybj_id: '',
				xxmc: '',
				rxsj: '',
				bysj: '',
				xl: '',
				zymc: '',
				sftz: '',
				jybjbz: '',
				gxszd: ''
			},
			eduArr: [],
			formGreen: { // 绿卡基本信息
				grjbxx_id: '',
				lkjbxx_id: '',
				sbdw: '',
				zgbm: '',
				xgzdw: '',
				rclb: '',
				zjlb: '',
				xzzw: '',
				lkbh: '',
				yhkh: '',
				shpc: '',
				lkrq: '',
				njrq: '',
				lkzt: ''
			},
			formFamily: { // 人才家庭成员信息
				grjbxx_id: '',
				jtcy_id: '',
				cw: '',
				xm: '',
				csny: '',
				jtcyzzmm: '',
				gzdw: '',
				zw: ''
			},
			familyArr: [],
			formApply: { // 人才申请服务
				grjbxx_id: '',
				sqfw_id: '',
				fwlx: '',
				sqsj: '',
				bjsj: '',
				sfbj: '',
				sqfwbz: ''
			},
			applyArr: [],
			formMedical: { // 人才医保兑现
				grjbxx_id: '',
				ybdx_id: '',
				dxsjq: '',
				dxsjz: '',
				ybbtxs: '',
				ybbtdw: '',
				ybdxbz: ''
			},
			medicalArr: [],
			formLife: { // 人才生活补贴信息
				grjbxx_id: '',
				shbt_id: '',
				btsjq: '',
				btsjz: '',
				shbtje: '',
				shbtxs: '',
				shbtdw: '',
				shbtbz: ''
			},
			lifeArr: [],
			formHouse: { // 人才住房补贴
				grjbxx_id: '',
				zfbt_id: '',
				btsj: '',
				zfbtje: '',
				zfbtdw: '',
				zfbtbz: ''
			},
			houseArr: [],
			formTech: { // 人才技术职务信息
				grjbxx_id: '',
				zyjszw_id: '',
				zyjszwlx: '',
				zyjszwhdsj: ''
			},
			techArr: [],
			formQual: { // 人才资格等级信息
				grjbxx_id: '',
				zyzgdj_id: '',
				zyzgdj: '',
				zyzgdjhdsj: ''
			},
			qualArr: [],
			// 身份证号码 合法标志
			sfzhFlag: 0,
			applyRules: {
				zdmc: [{ validator: validator('64, "normal", "字段名称", false') }]
			},
			// 基本信息校验
			rules: {
				yhxm: [{ validator: validator('64, "full", "姓名", false', this.checkKsCode) }],
				xjzdq: [{ required: true, message: '请选择现居住地' }],
				csrq: [{ required: true, message: '请选择出生日期' }],
				zzmm: [{ required: true, message: '请选择政治面貌' }],
				mz: [{ required: true, message: '请选择民族' }],
				hjq: [{ required: true, message: '请选择户籍' }],
				zwlx: [{ required: true, message: '请选择职位类型' }],
				sshy: [{ required: true, message: '请选择所属行业' }],
				sfzqgz: [{ required: true, message: '请选择在黔或回黔工作' }],
				gznx: [{ required: true, message: '请选择工作年限' }],
				sfzhm: [{ validator: validator('18, "sfzhm", "身份证号", false', this.checkKsCode) }],
				sg: [{ validator: validator('3, "posdouble", " 身高", true', this.checkKsCode) }],
				sl: [{ validator: validator('3, "posdouble", " 视力", true', this.checkKsCode) }],
				tz: [{ validator: validator('3, "posdouble", " 体重", true', this.checkKsCode) }],
				gddh: [{ validator: validator('32, "lxfs", " 固定电话", true', this.checkKsCode) }],
				qq: [{ validator: validator('16, "qq", " qq", true', this.checkKsCode) }],
				sjh: [{ validator: validator('11, "sjh", " 手机号", false', this.checkKsCode) }],
				yx: [{ validator: validator('48, "email", " 邮箱", true', this.checkKsCode) }],
				txdz: [{ validator: validator('48, "full", " 通讯地址", true', this.checkKsCode) }],
				sbdw: [{ validator: validator('32, "full", " 申报单位", true', this.checkKsCode) }],
				zgbm: [{ validator: validator('32, "full", " 主管部门", true', this.checkKsCode) }],
				xgzdw: [{ validator: validator('32, "full", " 现工作单位", true', this.checkKsCode) }],
				xzzw: [{ validator: validator('32, "full", " 行政职务", true', this.checkKsCode) }],
				lkbh: [{ validator: validator('11, "number", " 绿卡编号", false', this.checkKsCode) }],
				yhkh: [{ validator: validator('19, "number", " 银行卡号", false', this.checkKsCode) }],
				rclb: [{ required: true, message: '请选择人才类别' }],
				zjlb: [{ required: true, message: '请选择专家类别' }],
				lkzt: [{ required: true, message: '请选择绿卡状态' }],
				shpc: [{ required: true, message: '请选择审核批次' }],
				sqfwbz: [{ validator: validator('128, "full", " 备注", true', this.checkKsCode) }],
				fwlx: [{ required: true, message: '请选择服务类型' }],
				sfbj: [{ required: true, message: '请选择是否办结' }],
				sqsj: [{ required: true, message: '请选择申请时间' }],
				btsjq: [{ required: true, message: '请选择津贴时间起' }],
				btsjz: [{ required: true, message: '请选择津贴时间止' }],
				shbtxs: [{ required: true, message: '请选择补贴形式' }],
				shbtje: [{ validator: validator('6, "posdouble", " 补贴金额", false', this.checkKsCode) }],
				shbtdw: [{ validator: validator('64, "full", " 补贴单位", true', this.checkKsCode) }],
				shbtbz: [{ validator: validator('64, "full", " 补贴备注", true', this.checkKsCode) }],
				dxsjq: [{ required: true, message: '请选择兑现时间起' }],
				dxsjz: [{ required: true, message: '请选择兑现时间止' }],
				ybbtxs: [{ required: true, message: '请选择补贴形式' }],
				ybbtje: [{ validator: validator('6, "posdouble", " 补贴金额", false', this.checkKsCode) }],
				ybbtdw: [{ validator: validator('64, "full", " 补贴单位", false', this.checkKsCode) }],
				ybdxbz: [{ validator: validator('64, "full", " 补贴备注", true', this.checkKsCode) }],
				btsj: [{ required: true, message: '请选择补贴时间' }],
				zfbtje: [{ validator: validator('6, "posdouble", " 补贴金额", false', this.checkKsCode) }],
				zfbtdw: [{ validator: validator('64, "full", " 补贴单位", false', this.checkKsCode) }],
				zfbtbz: [{ validator: validator('64, "full", " 补贴备注", true', this.checkKsCode) }],
				xxmc: [{ validator: validator('64, "full", " 学校名称", false', this.checkKsCode) }],
				zymc: [{ required: true, message: '请选择专业名称' }],
				xl: [{ required: true, message: '请选择学历学位' }],
				sftz: [{ required: true, message: '请选择是否统招' }],
				rxsj: [{ required: true, message: '请选择入学时间' }],
				bysj: [{ required: true, message: '请选择毕业时间' }],
				jybjbz: [{ validator: validator('128, "full", " 备注", true', this.checkKsCode) }],
				gxszd: [{ validator: validator('12, "full", " 高校所在地", true', this.checkKsCode) }],
				cw: [{ validator: validator('8, "full", " 称谓", false', this.checkKsCode) }],
				xm: [{ validator: validator('64, "full", " 姓名", false', this.checkKsCode) }],
				gzdw: [{ validator: validator('32, "full", " 工作单位", true', this.checkKsCode) }],
				zw: [{ validator: validator('32, "full", " 职务", true', this.checkKsCode) }],
				zyjszwlx: [{ validator: validator('32, "full", " 专业技术职务", false', this.checkKsCode) }],
				zyjszwhdsj: [{ required: true, message: '请选择专业技术职务获得时间' }],
				zyzgdj: [{ required: true, message: '请选择专业技术职务获得时间' }],
				zyzgdjhdsj: [{ required: true, message: '请选择职业资格等级获得时间' }]
			},
			pickerNow: {
				disabledDate(time) {
					return time.getTime() > Date.now() - 8.64e7;
				}
			},
			// 设置报名字段
			words: [],
			// 富文本
			editorInstance: null,
			uEditorConfig: {
				toolbars: [
					['fontfamily', 'fontsize', 'bold', 'indent', 'italic', 'underline', 'formatmatch', 'removeformat', 'justifycenter',
						'justifyright', 'justifyleft', 'justifyjustify', 'forecolor', 'lineheight', 'simpleupload', 'link']
				]
			},
			isCheck: false,
			// 默认插件时间
			defaultTime: ''
		};
	},
	methods: {
		// 详情基本信息 查询
		/* eslint-disable */
		getData() {
			this.loading = true;
			$.get('/gyrcht/rcxxgl/rcxx/rcxxxqCx', {
				params: { grjbxx_id: this.$route.params.id }
			}).then((res) => {
				// this.words = res.returnData.ksxxs.bmzds;
				Object.assign(this.formBase, res.returnData.rcxq.rcjbxx);
				Object.assign(this.formGreen, res.returnData.rcxq.rclkxx);
				this.formGreen.lkjbxx_id = res.returnData.rcxq.rclkxx.lkjbxx_id;
				this.applyArr = res.returnData.rcxq.rcsqfwxx;
				this.lifeArr = res.returnData.rcxq.rcshbtxx;
				this.medicalArr = res.returnData.rcxq.rcybdxxx;
				this.houseArr = res.returnData.rcxq.rczfbtxx;
				this.eduArr = res.returnData.rcxq.rcjybjxx;
				this.familyArr = res.returnData.rcxq.rcjtcyxx;
				this.techArr = res.returnData.rcxq.rczyjszwxx;
				this.qualArr = res.returnData.rcxq.rczyzgdjxx;
				this.sfzhFlag = 1;
				// this.formDate.kslx = res.returnData.ksxxs.kslx;
				// this.editorInstance.setContent(this.form.jznr);
				this.loading = false;
			}).catch(() => {
				this.loading = false;
			});
		},
		// 保存基本信息
		saveBase() {
			this.$refs['formBase'].validate((valid) => {
				if (valid) {
					// debugger;
					if (this.sfzhFlag == 0) {
						this.$message.warning('请输入正确的身份证号码');
						return false;
					}
					if (this.formBase.grjbxx_id == '') {
						this.formBase.czlx = 0;
					} else {
						this.formBase.czlx = 1;
					}
					const postData = Object.assign({}, this.formBase);
					// postData.dwjj = Base64.encode(this.editorInstance.getContent());
					$.post('/gyrcht/rcxxgl/rcxx/rcjbxxXg', this.formBase)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.formBase = res.returnData.rcxx.rcjbxx;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存绿卡信息
		saveGreen() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formGreen'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formGreen.grjbxx_id = this.formBase.grjbxx_id;
					}
					if (this.formGreen.lkjbxx_id == '') {
						this.formGreen.czlx = 0;
					}else{
						this.formGreen.czlx = 1;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rclkjbxxXg', this.formGreen)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.formGreen = res.returnData.rcxx.rclkxx;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存申请服务
		saveApply() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formApply'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formApply.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rcsqfwxxXg', this.formApply)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.applyArr = res.returnData.rcxx.rcsqfwxx;
							this['formApplyShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存生活补贴
		saveLife() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formLife'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formLife.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rcshbtxxXg', this.formLife)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.lifeArr = res.returnData.rcxx.rcshbtxx;
							this['formLifeShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存医保兑现信息
		saveMedical() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formMedical'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formMedical.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rcybdxxxXg', this.formMedical)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.medicalArr = res.returnData.rcxx.rcybdxxx;
							this['formMedicalShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存住房补贴信息
		saveHouse() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formHouse'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formHouse.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rczfbtxxXg', this.formHouse)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.houseArr = res.returnData.rcxx.rczfbtxx;
							this['formHouseShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存教育背景信息
		saveEdu() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formEdu'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formEdu.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rcjybjxxXg', this.formEdu)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.eduArr = res.returnData.rcxx.rcjybjxx;
							this['formEduShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存家庭成员信息
		saveFamily() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formFamily'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formFamily.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rcjtcyxxXg', this.formFamily)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.familyArr = res.returnData.rcxx.rcjtcyxx;
							this['formFamilyShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存技术职务信息
		saveTech() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formTech'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formTech.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rczyjszwxxXg', this.formTech)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.techArr = res.returnData.rcxx.rczyjszwxx;
							this['formTechShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 保存资格等级信息
		saveQual() {
			if(this.formBase.grjbxx_id == '') {
				this.$message.warning('请先完善个人基本信息！');
				return false;
			}
			this.$refs['formQual'].validate((valid) => {
				if (valid) {
					if (!this.isNew) {
						this.formQual.grjbxx_id = this.formBase.grjbxx_id;
					}
					$.post('/gyrcht/rcxxgl/rcxx/rczyzgdjxxXg', this.formQual)
					.then((res) => {
						if (res.returnData.executeResult === '1') {
							this.$message({
								type: 'success',
								message: '保存成功',
								showClose: true
							});
							this.qualArr = res.returnData.rcxx.rczyzgdjxx;
							this['formQualShow'] = true;
						} else {
							// 该单位不存在或未审核通过
							this.$message.warning(res.returnData.message);
							this.loadingSave = false;
						}
					}).catch(() => {
						this.loadingSave = false;
					});
				}
			});
		},
		// 所有的点击编辑
		/* eslint-disable */
		handleEdit(row,form) {
			this[form] = row;
			this[form].czlx = 1;
			this[form + 'Show'] = false;
		},
		cancel(form) {
			this[form + 'Show'] = true;
		},
		handleIdef(id) {
			$.get('/gyrcht/rcxxgl/rcxx/sfzhmCx', {
				params: { sfzhm: id }
			}).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.formBase.xb = res.returnData.sfzxx.xb;
					this.formBase.hjq = res.returnData.sfzxx.hjq;
					this.formBase.csrq = res.returnData.sfzxx.csrq;
					this.formBase.sshy = res.returnData.sfzxx.sshy;
					this.sfzhFlag = 1;
				} else {
					this.sfzhFlag = 0;
					this.$message.warning(res.returnData.message);
					this.loadingSave = false;
				}
			}).catch(() => {
			});
		},
		// 申请服务删除
		applyDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rcsqfwxxSc',
				{sqfw_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.applyArr = res.returnData.rcxx.rcsqfwxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 生活津贴删除
		lifeDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rcshbtxxSc',
				{shbt_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.lifeArr = res.returnData.rcxx.rcshbtxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 医保兑现删除
		medicalDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rcybdxxxSc',
				{ybdx_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.medicalArr = res.returnData.rcxx.rcybdxxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 住房补贴删除
		houseDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rczfbtxxSc',
				{zfbt_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.houseArr = res.returnData.rcxx.rczfbtxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 教育背景删除
		eduDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rcjybjxxSc',
				{jybj_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.eduArr = res.returnData.rcxx.rcjybjxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 家庭成员删除
		familyDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rcjtcyxxSc',
				{jtcy_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.familyArr = res.returnData.rcxx.rcjtcyxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 技术职务删除
		techDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rczyjszwxxSc',
				{zyjszw_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.techArr = res.returnData.rcxx.rczyjszwxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 资格等级删除
		qualDel(id) {
			this.$confirm('确定要删除么？', '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				$.post('/gyrcht/rcxxgl/rcxx/rczyzgdjxxSc',
				{zyzgdj_id: id, grjbxx_id: this.formBase.grjbxx_id})
				.then((res) => {
					if (res.returnData.executeResult === '1') {
						this.$message.success('删除成功!');
						this.qualArr = res.returnData.rcxx.rczyzgdjxx;
					} else {
						this.$message.error(res.returnData.message);
					}
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
			}).catch(() => {
			});
		},
		// 添加按钮
		handleAdd(formName) {
			this.$refs[formName].resetFields();
			this[formName].czlx = 0;
			this[formName + 'Show'] = false;
		}
	},
	created() {
		if (!this.isNew) {
			this.formBase.grjbxx_id = this.$route.params.id;
			this.getData();
		}
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
.btn_switch {
	display: inline-block;
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
.btns {
	margin: 22px 0 22px 130px;
}
.btns_left{
	margin:5px 0 20px 0;
}
.detail_info .label{
		text-align: right;
		padding-right: 10px;
		color: #818a96;
	}
</style>
