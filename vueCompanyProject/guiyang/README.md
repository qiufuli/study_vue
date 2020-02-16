# gymanage

> 贵阳人才网后台管理系统

## Build Setup

``` bash
# 安装项目依赖
npm install

# 启动具有热更新的开发服务(8080)
npm run dev

# 构建生产版本，包含压缩、合并
npm run build

# 构建生产版本并查看模块分析
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 打包说明
*	因为前台工程使用的是`jquery + plugin`和后台工程`vue`完全不一样，因此使用了和前台不同的工程
*	项目部署的时候，前台和管理员后台的工程要放到一块，因此需要在`config/index --- assetsPublicPath`
	设置对应的管理员后台目录，当前为`manageSys`
*	`config/index ---- productionSourceMap` 在正式上线的时候，要设为`false`；保护代码（本地测试则不用）
*	项目中使用到的百度`uEditor`其对应的js文件放置到了，前台目录中的`common/js/uEditor`文件夹中（前后台公用一套代码）


## 项目使用到的官方资源

* 	Vue官网	https://cn.vuejs.org/
*	Element UI	http://element.eleme.io/#/zh-CN
*	axios ajax Function https://github.com/mzabriskie/axios  https://juejin.im/entry/587599388d6d810058a7a41a
*	vue-router 2 https://router.vuejs.org/zh-cn/
*	SBDoc接口文档 http://130.10.7.246:10000/
*	vue-cli	 http://vuejs-templates.github.io/webpack/
*	vuex 	https://vuex.vuejs.org/zh-cn/
*	awesome vue https://github.com/vuejs/awesome-vue
*	Babel https://babeljs.io/
*	vue cli https://vuejs-templates.github.io/webpack/ https://github.com/vuejs/vue-cli
*	webpack https://webpack.js.org	https://doc.webpack-china.org
*	vue-loader（webpack---loader加载器） http://vue-loader.vuejs.org/zh-cn/

## elementUI 样式自定义
*	elementUI对应的配置文件为 `element-variables.css`，更详细的配置在，node-modules下的elementUI
* 安装【主题生成工具】`npm i element-theme -g`【详细信息查看官方文档】
*	使用`et -w`(-w，实时编译主题)编译生成样式文件

## 文件目录
* src 开发目录
	* common
		*	buss 业务通用组件
		* js 通用js模块
		* vue 通用（保函样式）组件


## 开发说明
*	.vue文件中含有自定义`<docs></docs>`标签，用于对vue文件的说明，和开发人员信息


## 页面注释（必填）格式
*	@author jinglf000
*	@date ###### Fri Aug 4 16:27:22 CST 2017
*	@description xxx页面功能

##	一些命名的约定，命名前缀，通用规定（适用于所有）
*	变量命名规范：使用camlCase 使用驼峰命名方式，xxx[大类名]Xxx[小类名]Xxx...
*	多个单词时，使用缩写形式尽可能用三个字母表达意思，如若不行可以采用5个字母或者全拼

### 注意事项
* 	要使用`beforeRouterUpdate`导航钩子，必须在路径配置时显式的定义路由的参数`/api/user/:name`
*	改钩子只适用于： 从`/api/user/xiaoming` --> `/api/user/xiaoguang`这种情况
*	所有的导航钩子`next`方法必须要执行
*	在目前的页面结构下，组件的`created`钩子只会执行一次（因为使用了keep-alive）（组件只会创建一次）
*	而`activated`钩子则会在每次组件激活的时候使用，包括第一次；
* 	钩子执行时间：`beforeRouterEnter` ---> `created` ----> `activated`;


### 常见变量名约定
*	`ajax` 方法有 `get` `post` `put` `del`,使用时方法名为`getData``postData`...，若一个页面有多个`getDataxxx`
*	表单提交格式为`submitXxx`
*	Loading格式为`loadingXxx`
*	重置表单为`resetForm`
*  	dialog对话框`dialogXxx`

###	后缀
*	`s` 表明列表是多个

## 接口返回结果
*	`returnCode` 为系统级别的状态码，取值为： （1:成功，-1:失败，-2:登录超时，-9:系统异常，-10校验失败）
*	`returnMsg` 为code对应的消息
*	`returnData` 返回的数据
*	`returnData.executeResult` 为业务执行状态标志：（0：失败，1：成功）
*	`returnData.message` 为executeResult对应的消息
*	`returnData.xxxx` xxx 为接口真实返回的内容，真实返回的内容，被包了一层，和message平级

## 前后台交互，数据约定
*	`czlx` 为保证接口的复用，新增和编辑接口为统一接口，"0"---新增，"1"---编辑
*	性别 '1' -- 男 '2' -- 女
*	`el-pagination`含有一页可以选择多少条这个功能，一旦需求需要加上这个功能，只需传递以个pageSize即可
* 目前分页不含有，显示多少条的功能
* 分页查询中，pageNum是必填项（初始值必须为1，因为页数是从第一义页开始的，设置其他的值会出现两边接口调用），ageSize默认为10条（后台默认），当前台传值时以前台为标准
*	添加了可选一页多少条的代码，同时需要在`from`表单里添加`pageSize`字段，
```
		<el-pagination layout="sizes,total,prev,pager,next,jumper"
		:total="page.total" @current-change="getData" :current-page.sync="form.pageNum"
		:page-size="form.pageSize" :page-sizes="[5,10,15,20]" @size-change="(size) => { this.form.pageSize = size; this.getData();}"
		></el-pagination>
```
* 原有的pagination分页有问题，需要修改按照 审批中职位审批页面进行修改

##　基于UEeditor的富文本编辑器
*	前端功能所使用资源为：`/common/uEditor/`
* 前后台交互配置资源为：`/common/uEditor/jsp/`	配置了上传图片，等一些列的路基、文件大小、格式地址等信息

## 问题及反馈 第一次 2017-8-3
* 动态效果（减少动画执行时间）包括时间选择框，下拉菜单，左侧一级菜单 ok
* 注释（关键位置）--- 每个方法都要添加注释 + 关键变量 ok
* 及菜单滚动条 ok
* http://localhost:8080/#/party/partyer 党员信息，多列实现锁定一列（关键列），的效果， ok
* 调整列宽度可以出现横向滚动条ok
* $message 改为默认 (3000ms)已修复
* 基于vue的富文本编辑器，

## 评审问题 2017-8-20
*	方法注释 on
* 查询结果列表，不能出现过多的折行 ok 
*	列表项小按钮的提示文字，动画效果时间太长 ok
* 查询表单、列表修改显示形式。使显示分清主次，更加合理 ok
* 下划线命名法改为驼峰命名 ok 

## 参考组件示例
*	vue-navigation，页面导航 Page Navigation
* vue-markdown-loader，markdown

## 下一步的封装计划
* 把icon-font把自定义字体图标封装到，Element ui中直接使用icon='xxx-xxxx'就可以生成图标

## rbac已添加
* 资源id绑定给menu.json文件，方法封装在utils.js；
* 新闻管理 => 新闻管理模块只控制新闻类型联级选择器，so写死在自组件中（src/common/vue/newsType.vue）；

## 查询优化
* 为防止请求报错，保证tab页、分页切换时，提交的表单数据正确（通过校验），现使用深层克隆一份双向绑定表单（统一命名为改表单名称+right，如form，则克隆一份formRight），最终，只有点击查询，才能够刷新要提交的表单数据；
 
## 更新远程分支
* git remote update origin -p
## 删除本地分支
* git branch -a
* git branch -d <branchName>
