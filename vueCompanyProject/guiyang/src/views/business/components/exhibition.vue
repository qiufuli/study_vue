<docs>
		## 招聘会展位 by SVG
		* @date ###### Mon Sep 11 11:46:41 CST 2017
		* @author jinglf000
		* @desc 展位选择
</docs>
<template>
	<div>
		<el-dialog :visible.sync="dialog" size="full" @close="handleClose">
			<el-row>
				<el-col :span="18">
					<h2 class="zph_title" v-if="zphInfo">{{zphInfo.title}} <small>{{zphInfo.date}}</small></h2>
					<div class="zph_topbar">
						<p>可选展位：<span class="enabled"></span></p>
						<p>已选展位：<span class="actived"></span></p>
						<p>已售展位：<span class="disabled"></span></p>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="18">
					<svg
						ref="svg"
						version="1.1" id="图层_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px" y="0px"
						viewBox="190 90 1050 600"
						enable-background="new 190 90 1050 600">
						<rect x="1105.3" y="439.9" class="svg_white" width="44" height="43.9"/>
						<rect x="1102.2" y="439.9" class="svg_white" width="44" height="43.9"/>
						<rect x="1105.3" y="439.9" class="svg_white" width="44" height="43.9"/>
						<rect x="1105.3" y="439.9" class="svg_white" width="44" height="43.9"/>
						<rect x="1103.1" y="439.3" class="svg_white" width="42.1" height="44"/>
						<g>
							<rect x="692.2" y="155" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 717 185)" class="svg_text">42</text>
						</g>
						<g>
							<rect x="779.7" y="155" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 805 185)" class="svg_text">41</text>
						</g>
						<g>
							<rect x="866.1" y="155" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 892 185)" class="svg_text">40</text>
						</g>
						<g>
							<rect x="953.5" y="155" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 980 185)" class="svg_text">39</text>
						</g>
						<g>
							<rect x="1040.9" y="155" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 1065 185)" class="svg_text">38</text>
						</g>
						<g>
							<rect x="255.2" y="162.9" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 278 194)" class="svg_text">44</text>
						</g>
						<g>
							<rect x="342.6" y="162.9" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 366 194)" class="svg_text">43</text>
						</g>
						<g>
							<rect x="210" y="220" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 235 250)" class="svg_text">33</text>
						</g>
						<g>
							<rect x="210" y="305" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 235 333)" class="svg_text">34</text>
						</g>
						<g>
							<rect x="210" y="345" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 235 375)" class="svg_text">35</text>
						</g>
						<g>
							<rect x="210" y="385" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 235 415)" class="svg_text">36</text>
						</g>
						<g>
							<rect x="210" y="425" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 235 455)" class="svg_text">37</text>
						</g>
						<g>
							<rect x="381.3" y="248.3" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 398 280)" class="svg_text">29</text>
						</g>
						<g>
							<rect x="381.3" y="288.3" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 398 320)" class="svg_text">30</text>
						</g>
						<g>
							<rect x="381.3" y="328.4" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 398 360)" class="svg_text">31</text>
						</g>
						<g>
							<rect x="381.3" y="368.4" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 398 400)" class="svg_text">32</text>
						</g>
						<g>
							<rect x="447.8" y="248.3" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 463 280)" class="svg_text">25</text>
						</g>
						<g>
							<rect x="447.8" y="288.3" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 463 320)" class="svg_text">26</text>
						</g>
						<g>
							<rect x="447.8" y="328.3" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 463 360)" class="svg_text">27</text>
						</g>
						<g>
							<rect x="447.8" y="368.4" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 463 400)" class="svg_text">28</text>
						</g>
						<g>
							<rect x="815" y="220" class="enabled" width="85" height="40"/>
							<text transform="matrix(1 0 0 1 840 250)" class="svg_text">3＋</text>
						</g>
						<g>
							<rect x="793" y="265" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 295)" class="svg_text">15</text>
						</g>
						<g>
							<rect x="793" y="305" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 335)" class="svg_text">16</text>
						</g>
						<g>
							<rect x="793" y="345" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 375)" class="svg_text">17</text>
						</g>
						<g>
							<rect x="793" y="385" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 415)" class="svg_text">18</text>
						</g>
						<g>
							<rect x="860" y="265" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 885 295)" class="svg_text">7</text>
						</g>
						<g>
							<rect x="860" y="305" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 885 335)" class="svg_text">8</text>
						</g>
						<g>
							<rect x="860" y="345" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 885 375)" class="svg_text">9</text>
						</g>
						<g>
							<rect x="860" y="385" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 875 415)" class="svg_text">10</text>
						</g>
						<g>
							<rect x="793" y="430" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 460)" class="svg_text">19</text>
						</g>
						<g>
							<rect x="793" y="470" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 500)" class="svg_text">20</text>
						</g>
						<g>
							<rect x="793" y="510" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 540)" class="svg_text">21</text>
						</g>
						<g>
							<rect x="793" y="550" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 810 580)" class="svg_text">22</text>
						</g>
						<g>
							<rect x="860" y="430" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 875 460)" class="svg_text">11</text>
						</g>
						<g>
							<rect x="860" y="470" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 875 500)" class="svg_text">12</text>
						</g>
						<g>
							<rect x="860" y="510" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 875 540)" class="svg_text">13</text>
						</g>
						<g>
							<rect x="860" y="550" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 875  580)" class="svg_text">14</text>
						</g>
						<g>
							<rect x="1055" y="295" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1080 325)" class="svg_text">3</text>
						</g>
						<g>
							<rect x="1055" y="335" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1080 365)" class="svg_text">4</text>
						</g>
						<g>
							<rect x="1120" y="295" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1145 325)" class="svg_text">2</text>
						</g>
						<g>
							<rect x="1120" y="335" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1145 365)" class="svg_text">1</text>
						</g>
						<g>
							<rect x="1060" y="490" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1085 520)" class="svg_text">5</text>
						</g>
						<g>
							<rect x="1060" y="530" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1085 560)" class="svg_text">6</text>
						</g>
						<g>
							<rect x="1025" y="250" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1040 280)" class="svg_text">1＋</text>
						</g>
						<g>
							<rect x="1030" y="440" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 1045 470)" class="svg_text">2＋</text>
						</g>
						<g>
							<rect x="590" y="315" class="enabled" width="80" height="40"/>
							<text transform="matrix(1 0 0 1 615 345)" class="svg_text">5＋</text>
						</g>
						<g>
							<rect x="590" y="215" class="enabled" width="80" height="40"/>
							<text transform="matrix(1 0 0 1 615 245)" class="svg_text">4＋</text>
						</g>
						<g>
							<rect x="590" y="390" class="enabled" width="80" height="40"/>
							<text transform="matrix(1 0 0 1 615 420)" class="svg_text">6＋</text>
						</g>
						<g>
							<rect x="620" y="530" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 635 560)" class="svg_text">24</text>
						</g>
						<g>
							<rect x="620" y="490" class="enabled" width="65" height="40"/>
							<text transform="matrix(1 0 0 1 635 520)" class="svg_text">23</text>
						</g>
						<text transform="matrix(1 0 0 1 1181.86 206.59)" class="svg_door">入口</text>
						<text transform="matrix(1 0 0 1 1181.86 244.6)" class="svg_door">出口</text>
						<rect x="608.3" y="261.3" class="svg_border" width="48" height="45.3"/>
						<rect x="756.5" y="649.5" class="svg_border" width="212.5" height="7"/>
						<polygon class="svg_border" points="1027.4,649.5 1027.4,656.5 1072.8,656.5 1072.8,608.5 1066.1,608.5 1066.1,649.5 "/>
						<path class="svg_border" d="M1066.1,587.2c0,0,3.3,4,6.7,0v-5.7h69.7v-98.3h13v-47.7h-48.3v48h29v91h-70V587.2z"/>
						<line class="svg_line1" x1="1068.8" y1="608.5" x2="1068.8" y2="588.9"/>
						<line class="svg_line2" x1="1148.8" y1="400.5" x2="1148.8" y2="435.5"/>
						<path class="svg_border" d="M1145.8,398.5c0,0,3,5,6,0v-8h22v-6.3h-28V398.5z"/>
						<line class="svg_line2" x1="1173.8" y1="387.2" x2="1218.6" y2="387.2"/>
						<line class="svg_line2" x1="969.1" y1="653" x2="1027.4" y2="653"/>
						<path class="svg_border" d="M435.7,151.7c0,0,5.3,3.5,0,7c-1.3,0.9-226.7,0-226.7,0v310h398.3v-29.3h48v46h-40.5v90.8h40.5v74.3H703
							c0,0,2.5,3.8,0,6h-53.3v-33h-42.5V475H202.5V151.7H435.7z"/>
						<line class="svg_line1" x1="438.1" y1="155.5" x2="588.8" y2="155.5"/>
						<path class="svg_border" d="M588.8,151.7c0,0-3,3.8,0,7.1c1.3,1.5,79.7,0,79.7,0v-8.7h497v-12h-6.7v5.7h-496v7.9H588.8z"/>
						<rect x="1098.8" y="243.5" class="svg_border" width="50" height="49.7"/>
						<rect x="608.3" y="260.7" class="svg_border" width="50" height="46"/>
						<line class="svg_line1" x1="704" y1="653" x2="756.5" y2="653"/>
					</svg>
				</el-col>
				<el-col :span="1">&nbsp;</el-col>
				<el-col :span="5">
					<el-form :model="form" :rules="rules" :label-width="labelWidth" ref="bookForm">
						<el-form-item label="展位">
							<el-input v-model="form.zphzwbhs" readonly class="input_no_border"></el-input>
						</el-form-item>
						<el-form-item label="文稿类型">
							<el-input v-if="canSelect === '1'" :disabled="true" value="自发"></el-input>
							<select-code v-else v-model="form.wglx" code="gyrlzyw_qzzp_d_wglx" clearable
								:disabled="formDiasbled" :hasAll="false"></select-code>
						</el-form-item>
						<el-form-item label="经办人" required prop="jbr">
							<el-input v-model="form.jbr" :disabled="formDiasbled"></el-input>
						</el-form-item>
						<el-form-item label="经办人手机号" class="mulitfix" required prop="jbrsjh">
							<el-input v-model="form.jbrsjh" :disabled="formDiasbled"></el-input>
						</el-form-item>
						<el-form-item label="支付方式">
							<el-radio-group v-model="form.zffs" :disabled="formDiasbled">
								<el-radio label="0">现金</el-radio>
								<el-radio label="1">点数</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="花费" >
							<el-input :value="form.zffs === '0' ?
								price * (lockeds.length - hasLocked.length) : 1 * lockeds.length - hasLocked.length"
								class="input_no_border" readonly v-show="lockeds.length > 0"></el-input>
						</el-form-item>
						<el-form-item label-width="40px">
							<el-button @click="submitBook('bookForm')" class="btn_square" :disabled="formDiasbled"
							 type="primary">提交订单</el-button>
							<el-button class="btn_square btn_return" @click="dialog = false" >返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div id="tooltip">
			</div>
		</el-dialog>
	</div>
</template>
<script>
import $ from '@/common/js/axios';
import { labelWidth } from '@/common/js/config';
import { validator } from '@/common/js/valid';
import selectCode from '@/common/vue/selectCode';

export default {
	name: 'exhibition',
	components: { selectCode },
	props: {
		companyId: {
			type: String,
			required: true
		},
		zphId: {
			type: String,
			required: true
		},
		zphInfo: {
			type: Object
		},
		visible: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			dialog: false,
			formDiasbled: false,
			labelWidth,
			textList: [],
			hasBind: false,
			// 已选展位
			lockeds: [],
			// 已选展位 && 已提交过订单
			hasLocked: [],
			form: {
				dwxx_id: '',
				zph_id: '',
				zphzwbhs: '',
				wglx: '',
				jbr: '',
				jbrsjh: '',
				zffs: '1'
			},
			rules: {
				jbrsjh: [{ validator: validator('11, "sjh", "经办人手机号", false') }],
				jbr: [{ validator: validator('64, " full", "经办人", false') }]
			},
			// 展位单价
			price: '',
			canSelect: ''
		};
	},
	watch: {
		// dialog 显隐控制
		visible(val) {
			if (val) {
				// 打开时初始化
				this.lockeds = [];
				let textList;
				// 初始化title及鼠标悬浮事件
				if (this.$refs.svg) {
					textList = this.$refs.svg.querySelectorAll('g > text');
					this.$refs.svg.querySelectorAll('g').forEach((item) => {
						item.removeAttribute('title');
						item.removeEventListener('mouseenter', this.tooltip);
					});
				} else {
					textList = [];
				}
				// 初始化背景颜色
				if (textList.length > 0) {
					this.textList = textList;
					textList.forEach((item) => {
						item.parentElement.querySelector('rect').setAttribute('class', 'enabled');
					});
				}
				// 获取值，并显示
				this.formDiasbled = false;
				this.getData().then((res) => {
					if (res.locked.length >= 2) { // 已经锁定两个展位了
						// this.$message.warning('已经锁定两个展位，本次招聘会无法再次预定');
						if (this.$refs.bookForm) {
							this.$refs.bookForm.resetFields();
						}
						this.formDiasbled = true;
					}
					this.dialog = val;
					// 延迟执行赋值
					setTimeout(() => {
						if (res.booked.length > 0) {
							this.renderBooked(res.booked);
						}
						if (res.locked.length > 0) {
							this.renderLocked(res.locked);
						}
					}, 20);
				}).catch(() => {});
			}
		},
		// 选中展位的显隐控制
		lockeds(val) {
			this.form.zphzwbhs = val.join(',');
		}
	},
	methods: {
		// 关闭dialog close处理函数
		handleClose() {
			this.$emit('update:visible', false);
		},
		// 获取展位列表
		getData() {
			return $.get('/gyrcht/ywgl/zpbl/zwfbCx', {
				params: { zph_id: this.zphId, dwxx_id: this.companyId }
			}).then((res) => {
				const returnData = res.returnData;
				const list = {
					booked: returnData.yydzwlb,
					locked: returnData.ysdzwlb
				};
				this.lockeds = list.locked.map(item => item.zphzwbh);
				this.form.jbr = returnData.jbr;
				this.form.jbrsjh = returnData.jbrsj;
				this.price = returnData.zwdj;
				this.hasLocked = this.lockeds.slice(0);
				this.form.zffs = returnData.sfyds === '01' ? '1' : '0';
				this.canSelect = returnData.sfsccns;
				this.form.wglx = this.canSelect === '1' ? '10' : '';
				return list;
			}).catch(() => { });
		},
		// 提交订单（点击提交）
		submitBook(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.lockeds.filter(key => !this.hasLocked.includes(key)).length > 0) {
						this.form.dwxx_id = this.companyId;
						this.form.zph_id = this.zphId;
						this.postData();
					} else {
						return this.$message.warning('请先选择展位');
					}
				}
			});
		},
		// 发送订单（执行保存）
		postData() {
			const data = Object.assign({}, this.form);
			const zphzwbhs = this.lockeds.filter(key => !this.hasLocked.includes(key));
			// zphzwbhs.forEach((item, index) => {
			// 	if (item.charAt(item.length - 1) === '+') {
			// 		zphzwbhs[index] = item.replace(/\+/, '=');
			// 	}
			// });
			data.zphzwbhs = zphzwbhs.join(',');
			$.post('/gyrcht/ywgl/zpbl/zpzwydBc', data).then((res) => {
				if (res.returnData.executeResult === '1') {
					this.$message.success('订单提交成功');
					this.dialog = false;
				} else {
					this.$message.error(res.returnData.message);
				}
			}).catch(() => {});
		},
		// 已售展位 填色
		renderBooked(arr) {
			if (arr.length === 0) return;
			const textList = this.textList.length > 0 ?
				this.textList : document.querySelectorAll('g > text');
			// 使用缓存的textList
			textList.forEach((item) => {
				let num;
				for (let i = 0; i < arr.length; i++) {
					const cur = arr[i];
					if (item.innerHTML === cur.zphzwbh) {
						num = i;
						const elementG = item.parentElement;
						elementG.querySelector('rect').setAttribute('class', 'disabled');
						elementG.setAttribute('title', `购买单位：${cur.dwmc} \n办理人员：${cur.jbr}
							办理时间：${cur.zwydsj} \n收银人员：${cur.syr} \n收银时间：${cur.sysj}`);
						// 事件绑定
						// elementG.removeEventListener('mouseenter', this.tooltip);
						elementG.addEventListener('mouseenter', this.tooltip);
						elementG.addEventListener('mouseleave', this.tooltipHide);
					}
				}
				if (typeof num === 'number') {
					arr.splice(num, 1);
				}
			});
		},
		// 已选展位 填色
		renderLocked(arr) {
			if (arr.length === 0) return;
			const textList = this.textList.length > 0 ?
				this.textList : document.querySelectorAll('g > text');
			textList.forEach((item) => {
				let num;
				for (let i = 0; i < arr.length; i++) {
					const cur = arr[i];
					if (item.innerHTML === cur.zphzwbh) {
						num = i;
						const elementG = item.parentElement;
						elementG.querySelector('rect').setAttribute('class', 'actived');
					}
				}
				if (typeof num === 'number') {
					arr.splice(num, 1);
				}
			});
		},
		// 悬浮提示信息
		tooltip(e) {
			const eleSrc = e.srcElement;
			const toolTip = document.getElementById('tooltip');
			if (toolTip.parentElement.tagName.toLowerCase() !== 'body') {
				document.body.appendChild(toolTip);
			}
			toolTip.innerText = eleSrc.getAttribute('title');
			toolTip.style.display = 'block';
			toolTip.style.top = `${e.clientY + 10}px`;
			toolTip.style.left = `${e.clientX + 10}px`;
		},
		// 隐藏提示信息
		tooltipHide() {
			const toolTip = document.getElementById('tooltip');
			toolTip.style.display = 'none';
		},
		// 按钮选择handle
		handleChoice(e) {
			const eleSrc = e.srcElement;
			const elePar = eleSrc.parentElement;
			const eleRect = elePar.querySelector('rect');
			const flag = elePar.tagName.toLowerCase() === 'g' && eleRect.getAttribute('class') !== 'disabled';
			if (flag) {
				// 是 => 已选展位
				if (eleRect.getAttribute('class') === 'actived') {
					const eleZphNum = elePar.querySelector('text');
					// 是 => 未提交订单的展位
					if (this.hasLocked.indexOf(eleZphNum.textContent) < 0) {
						eleRect.setAttribute('class', 'enabled');
						this.lockeds.forEach((item, index) => {
							if (eleZphNum.textContent === item) {
								this.lockeds.splice(index, 1);
							}
						});
					}
				} else {
					// 展位选择数量最大限制
					if (this.lockeds.length >= 2) {
						return this.$message.warning('一场招聘会最多只能选择两个展位');
					}
					// 所有条件排除后 => 可选展位
					eleRect.setAttribute('class', 'actived');
					const eleZphNum = elePar.querySelector('g > text');
					this.lockeds.push(eleZphNum.textContent);
				}
			}
		}
	},
	// DOM 构建完成之后
	updated() {
		// 绑定点击事件
		if (!this.hasBind && this.$refs.svg) {
			this.$refs.svg.addEventListener('click', this.handleChoice);
			this.hasBind = true;
		}
	}
};
</script>
<style scoped lang="less">
	g {
		cursor: pointer;
	}
	/* 已选展位 */
	.actived{
		fill: #24c721;
		stroke: #fff;
	}
	/* 已售展位 */
	.disabled{
		fill: #a7b5c3;
		stroke: #fff;
	}
	/* 可选展位 */
	.enabled{
		fill: #3db8f8;
		stroke: #fff;
	}
	// 展位号
	.svg_text {
		fill: #fff;
		font-family: 'MicrosoftYaHeiUI';
		font-size: 30px;
	}
	// 入口，出口
	.svg_door {
		fill: #333;
		font-family: 'MicrosoftYaHeiUI';
		font-size: 18px;
	}
	.svg_white{fill: #fff;}
	.svg_border{fill:#f2f2f2;stroke: #dfdfdf;}
	.svg_line1{fill:none;stroke:#dfdfdf;}
	.svg_line2{fill:none;stroke:#e1e1e1;}
	/* 颜色提示 */
	.zph_topbar {
		text-align: center;
		margin: 10px 0;
		.zph_step {
			float: left;
			font-size: 18px;
		}
		p {
			display: inline-block;
			height: 30px;
			line-height: 30px;
			margin: 0 10px;
			span {
				display: inline-block;
				width: 40px;
				height: 28px;
				vertical-align: middle;
				&.actived {
					background: #24c721;
				}
				&.disabled {
					background: #a7b5c3;
				}
				&.enabled {
					background: #3db8f8;
				}
			}
		}
	}
	// 标题+日期
	.zph_title {
		font-size: 24px;
		font-weight: normal;
		text-align: center;
	}
	/* 弹出提示 */
	#tooltip {
		position: absolute;
		max-width: 500px;
		background-color: #1f2d3d;
		color: #fff;
		border-radius: 4px;
		z-index: 3000;
		font-size: 12px;
		line-height: 1.5;
		padding: 8px;
		transform-origin: right center 0px;
		transition: all ease-in-out .3s;
		display: none;
	}
	.btn_return{
		border: 1px solid #c4c4c4;
	}
</style>
