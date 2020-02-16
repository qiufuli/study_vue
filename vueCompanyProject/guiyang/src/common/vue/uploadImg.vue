<docs>
		## 上传图片
		*	@author shj
		* @date ###### 2017-9-9 11:35:11
		* @desc 饿了么ui上传组件 包装上传图片(类型固定: jpeg/png/gif; )
		## 使用方式
		### props
		*	@param modeName {String} 上传时的额外参数(模块目录名称), 该值为后台拟定
		*	@param maxSize {Number} 图片大小最大限制, 单位 ==> kb
		*	@param clientName {String} 用于数据双向绑定(使用时添加sync修饰) ==> 客户端名称
		*	@param serverPath {String} 用于数据双向绑定(使用时添加sync修饰) ==> 服务端路径
		*	@param serverName {String} 用于数据双向绑定(使用时添加sync修饰) ==> 服务端名称
		```
		<upload-img :modeName="'ggglMode1'"
			:maxSize="500"
			:clientName.sync=""
			:serverPath.sync=""
			:serverName.sync=""></upload-img>
		```
</docs>
<template>
	<div>
		<!-- 预览小图 -->
		<div v-show="showPic">
			<img v-if="imageUrl" class="imgHolder"
				:src="imageUrl" @click="handlePreview">
			<span v-else class="nopic_text">暂无图片</span>
		</div>
		<!-- 上传区 -->
		<el-upload
			:data="upData"
			action="/common/wjsc/wjsc/fileUpload"
			class="upload_btn"
			:show-file-list="false"
			:on-success="uploadSuccess"
			:before-upload="beforeUpload">
			<el-button v-show="uploadPic" icon="upload" size="small" type="primary" class="btn_radius">上传</el-button>
		</el-upload>
		<a v-show="downloadPic" :href="imageUrl" :download="serverName"><el-button
			icon="btn-download" size="small" class="btn_radius">下载</el-button></a>
		<div class="tip_text" v-show="tipText">{{ tipText }}</div>
		<!-- 预览大图 -->
		<el-dialog v-model="dialogVisible" size="tiny" @close="handleClose">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'uploadImg',
	props: {
		// 后台定的文件夹名
		modeName: {
			type: String,
			default: ''
		},
		// 最大尺寸 kb
		maxSize: {
			type: Number
		},
		// 客户端名称
		clientName: {
			type: String,
			default: ''
		},
		// 服务端路径
		serverPath: {
			type: String,
			default: ''
		},
		// 服务端名称
		serverName: {
			type: String,
			default: ''
		},
		// 是否允许下载？
		downloadPic: {
			type: Boolean,
			default: false
		},
		// 是否允许上传？
		uploadPic: {
			type: Boolean,
			default: true
		},
		// 是否预览缩略图？
		showPic: {
			type: Boolean,
			default: true
		},
		// 是否可预览
		canView: {
			type: Boolean,
			default: true
		},
		// 提示文字
		tipText: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			dialogVisible: false,
			dialogImageUrl: ''
		};
	},
	computed: {
		upData() {
			return {
				// file: '',
				modeName: this.modeName
			};
		},
		imageUrl() {
			if (this.serverPath && this.serverName) {
				return this.serverPath + this.serverName;
			}
		}
	},
	methods: {
		// 上传检验 图片格式/大小
		beforeUpload(file) {
			const isPicType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
			const maxSize = file.size / 1024 < this.maxSize;
			if (!isPicType) {
				this.$message.error('只能上传jpg/png/gif文件!');
			} else if (!maxSize) {
				this.$message.error(`上传图片不超过${this.maxSize}kb!`);
			}
			return isPicType && maxSize;
		},
		// 上传成功后的回调
		uploadSuccess(res) {
			if (res.returnData.executeResult === '1') {
				const data = res.returnData;
				this.$emit('update:clientName', data.clientName);
				this.$emit('update:serverPath', data.serverPath);
				this.$emit('update:serverName', data.serverName);
				this.$message.success('上传成功');
			} else {
				this.$message.error(res.returnData.message);
			}
		},
		// 图片预览
		handlePreview() {
			if (this.imageUrl && this.canView) {
				this.dialogVisible = true;
				this.dialogImageUrl = this.imageUrl;
			}
		},
		// 关闭预览
		handleClose() {
			this.dialogImageUrl = '';
		}
	}
};
</script>
<style>
.nopic_text {
	display: block;
	width: 100%;
	height: 100px;
	margin-bottom: 5px;
	border: 1px solid #bfc9d9;
  border-radius: 6px;
	background: #fff;
	font-size: 21px;
	line-height: 100px;
	text-align: center;
	color: #bfc9d9;
	cursor: pointer;
}
.imgHolder {
	display: block;
	width: 100%;
	height: 100px;
	margin-bottom: 5px;
	border: 1px solid #bfc9d9;
  border-radius: 6px;
	cursor: pointer;
}
.upload_btn {
	display: inline-block;
}
.btn_radius {
  border-radius: 4px;
}
.tip_text {
	font-size: 12px;
	line-height: 16px;
	margin-top: 4px;
	color: rgb(131, 143, 165);
}
</style>
