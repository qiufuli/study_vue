/**
 * ###### Wed Jul 19 18:02:48 CST 2017
 * @name utils
 * @description 常用的方法，和常量配置
 *
 */
import $ from '@/common/js/axios';
import menuJson from '@/common/menu.json';

const reg = {
	'yyyy-mm-dd': /\d{4}-\d{2}-\d{2}/,
	'yyyy-mm': /\d{4}-\d{2}/
};

 /**
  * @param {String} str 日期补0
  * @desc 1 ---> 01
  */
const format2 = (str) => {
	const val = str.toString();
	return (val.length > 1) ? val : `0${val}`;
};

/**
 * @desc 日期格式化
 * @param {Date} obj 要转换的日期对象
 * @param {rules} rules 规则对象，暂定
 * @return {String} 返回格式化后的日期 默认是yyyy-mm-dd
 */
const dateFormat = (obj, rules) => {
	if (!(obj instanceof Date)) {
		return obj;
	}
	const year = obj.getFullYear();
	let month = obj.getMonth() + 1;
	let day = obj.getDate();

	month = format2(month);
	day = format2(day);

	if (rules === undefined) {
		return `${year}-${month}-${day}`;
	}
};


/**
 * @description 把时间转换为零点，方便日期比较
 * @param {Date|String} param 输入的日期
 * @return {Date} 输出的日期
 */
function dateZero(param) {
	if (!param) { return undefined; }
	let str;
	const time = 'T00:00:00';// 时间后缀
	if (param instanceof Date) {
		str = dateFormat(param) + time;
	} else if (typeof param === 'string') {
		if (reg['yyyy-mm-dd'].test(param)) {
			str = param + time;
		} else if (reg['yyyy-mm'].test(param)) {
			str = `${param}-01${time}`;
		}
	} else {
		/* eslint-disable no-console */
		console.error('请检查使用dateZore（utils）的输入参数，当前参数为：');
		console.error(param);
	}
	return new Date(str);
}

/**
 * @desc 相似性判断，从列表中找到最相似的字符串
 * @param {Array} arr
 * @param {String} str
 * @param {String} key
 * @return {Number}
 */

function similarStr(arr, str, key) {
	let result = null;
	result = arr.map((item, index) => {
		let con = item;
		if (key) {
			con = item[key];
		}
		let num = 0;
		if (str === con) {
			num = str.length;
		} else {
			[].forEach.call(con, (val, i) => {
				if (val === str[i]) {
					num++;
				}
			});
		}
		return {
			index,
			num
		};
	});

	result.sort((first, second) => first.num - second.num);
	return result.pop().index;
}

/**
 * @param {String} str
 * @return {String}
 * @desc 用于日期找到对应的星期
 */

const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];


function exchangeWeek(str) {
	let date;
	if (typeof str === 'string') {
		date = new Date(str);
	} else if (str instanceof Date) {
		date = str;
	}
	const num = date.getDay();
	// 日期格式错误
	return isNaN(num) ? '日期格式错误' : WEEKS[num];
}

// 将带有资源id的菜单保存到 menuId 数组中，方便查找
const menuId = [];
menuJson.forEach((item) => {
	if (!item.hasChild && item.id) {
		menuId.push(item);
	} else if (item.hasChild) {
		item.children.forEach((child) => {
			if (child.id) {
				menuId.push(child);
			}
		});
	}
});

/**
 * @param {String} url
 * @return {String}
 * @desc 当前路由值
 */

function getId(url) {
	return menuId.find(item => item.url === url).id;
}

function getBtnsRight(url) {
	return $.get('/login/admin/getButTreeJson', { params: { restype: getId(url) } });
}

/**
 * @param {String} str
 * @return {String}
 * @desc 要替换的字符串
 */
function replaceBlank(str) {
	if (str) {
		return str.split('\n').join('<br>').replace(/\s/g, '&nbsp;');
	}
}

export { dateFormat, dateZero, similarStr, exchangeWeek, getBtnsRight, replaceBlank };

