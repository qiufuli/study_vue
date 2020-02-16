<docs>
		## UEditor 百度UEditor 富文本编辑器
		*	@author jinglf000
		* @date ###### Tue Aug 22 18:58:15 CST 2017
		* @desc 基于百度ueditor封装的Vue富文本组件
		## 使用方法
		* 引入vueUEditor组件即可，支持v-model
</docs>

<template>
		<script :id="randomId" name="content" type="text/plain"
			style="width:100%; height:240px;"></script>
</template>

<script>


export default {
	name: 'vueUEditor',
	props: {
		ueditorPath: {
			// UEditor 代码路径
			type: String,
			default() {
				return '/common/uEditor/';
			}
		},
		ueditorConfig: {
			// UEditor 配置
			type: Object,
			default: () => { }
		},
		// 初始化默认值
		defaultValue: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			instanceReady: false,
			randomId: `editor_${(Math.random() * 10E8).toString().slice(0, 8)}`,
			instance: null,
			// scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
			scriptTagStatus: 0
		};
	},
	watch: {
		defaultValue(val) {
			if (this.instance) {
				setTimeout(() => {
					this.instance.setContent(val === undefined ? '' : val);
				}, 20);
			}
		}
	},
	mounted() {
		if (window.UE !== undefined) {
			// 如果全局变量存在，说明编辑器代码已经初始化完成，直接加载编辑器
			this.scriptTagStatus = 2;
			this.initEditor();
		} else {
			// 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
			this.insertScriptTag();
		}
	},
	beforeDestroy() {
		// 组件销毁的时候，要销毁 UEditor 实例
		if (this.instance !== null && this.instance.destroy) {
			this.instance.destroy();
		}
	},
	methods: {
		// 插入 所需js文件
		insertScriptTag() {
			let configScriptTag = document.getElementById('configScriptTag');
			let editorScriptTag = document.getElementById('editorScriptTag');

			// 如果tag不存在，动态加载script，加载代码
			if (editorScriptTag === null) {
				configScriptTag = document.createElement('script');
				configScriptTag.type = 'text/javascript';
				configScriptTag.src = `${this.ueditorPath}ueditor.config.js`;
				configScriptTag.id = 'configScriptTag';

				editorScriptTag = document.createElement('script');
				editorScriptTag.type = 'text/javascript';
				editorScriptTag.src = `${this.ueditorPath}ueditor.all.min.js`;
				editorScriptTag.id = 'editorScriptTag';
				const header = document.getElementsByTagName('head')[0];
				header.appendChild(configScriptTag);
				header.appendChild(editorScriptTag);
			}

			// 判断编辑器代码是否加载 ueditor.all.min.js
			if (editorScriptTag.loaded) {
				this.scriptTagStatus ++;
			} else {
				editorScriptTag.addEventListener('load', () => {
					this.scriptTagStatus ++;
					editorScriptTag.loaded = true;
					this.initEditor();
				});
			}
			// 判断配置代码加载完成
			if (configScriptTag.loaded) {
				this.scriptTagStatus ++;
			} else {
				configScriptTag.addEventListener('load', () => {
					this.scriptTagStatus ++;
					configScriptTag.loaded = true;
					this.initEditor();
				});
			}
			// 直接初始化
			this.initEditor();
		},
		// 初始化编辑器, 说明两个必需引入的 js 文件都已经被引入，且加载完成
		initEditor() {
			if (this.scriptTagStatus === 2 && this.instance === null) {
				this.$nextTick(() => {
					this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
					this.instance.ready(() => {
						this.instanceReady = true;
						this.instance.setContent(this.defaultValue === undefined ? '' : this.defaultValue);
						this.$emit('ready', this.instance);
					});
				});
			}
		}
	}
};

</script>
<style scope="scoped">
.edui-default .edui-toolbar {
	line-height: 22px;
}
</style>
