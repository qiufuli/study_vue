/**
 * ###### Thu Jul 20 17:34:32 CST 2017
 * @name config
 * @description 常量配置
 * @author jinglf000
 */

//  查询表单，label宽度
const labelWidth = '90px';
const labelWidthMax = '100px';

// el-switch 开关 on的颜色
const colorOn = '#2e8ae6';// 蓝色
const colorOff = '#ccc';

// 富文本配置
const baseRichConfig = {
	toolbar: [
		'undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat | fullscreen'
	]
};

// maxTab，tab页的个数
const MAX_TAB = 6;

// 测试部用rbac
// const RESTYPE = '86b8d6b86b9043cbb066242c87a07e9e';
// 开发用rbac
const RESTYPE = '4c44018e67054028a20817cb067f86bf';

/* eslint-disable */
export {
	labelWidth,
	labelWidthMax,
	colorOn,
	colorOff,
	baseRichConfig,
	ROUTE_INFO,
	MAX_TAB,
	RESTYPE
};
