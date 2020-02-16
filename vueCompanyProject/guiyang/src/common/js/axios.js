/**
 * ###### Wed Jul 12 14:39:30 CST 2017
 * @name axios 基于axios的Ajax异步请求方法的封装
 * @description 核心方法基于axios，配合Elememt-ui和后台的数据返回规则统一封装异步处理
 * @author	jinglf000
 * @return 返回axios的实例，需要的时候直接引用
 *
 */

import axios from 'axios';
import { Message } from 'element-ui';
import { dateFormat } from './utils';

const message = (obj) => {
	const messageDefault = {
		showClose: true,
		duration: 1500
	};
	return Message(Object.assign(messageDefault, obj));
};
/**
 * @param {Object} obj
 * @description 对象中的属性值为 Date实例被转换成 yyyy-mm-dd格式
 */
function exchange(obj) {
	Object.keys(obj).forEach((key) => {
		if (obj[key] instanceof Date) {
			obj[key] = dateFormat(obj[key]);
		}
	});
}
/**
 * @param {Array|Plain Object} arr
 * @description 可以对多个或者一个对象进行处理
 */
const exchangeDate = (arr) => {
	if (arr) {
		if (arr instanceof Array) {
			arr.forEach((val) => {
				if (val instanceof Object) {
					exchange(val);
				}
			});
		} else {
			exchange(arr);
		}
	}
};


// axios 配置
axios.defaults.timeout = 20000;// 等待时长
// axios.defaults.headers.common['Content-type'] = 'application/x-www-form-urlencoded';// 内容类型
axios.defaults.headers['Content-type'] = 'application/json;charset=utf-8';
axios.defaults.validateStatus = function validateStatus(status) {
	return status >= 200 && status <= 300;
};
// 请求输入拦截
axios.interceptors.request.use((options) => {
	// 对pageSize 进行处理
	if (options.data && (options.data.pageSize === '')) {
		options.data.pageSize = 10;
	}
	if ((options.method.toLowerCase() === 'get') && options.params && (options.params.pageSize === '')) {
		options.params.pageSize = 10;
	}
	// 对日期对象进行处理
	exchangeDate([options.data, options.params]);
	return options;
});

// 返回值统一拦截，业务拦截在status为200，接口调用成功了，但出现了业务错误
axios.interceptors.response.use((response) => {
	const data = response.data;
	// 业务逻辑错误处理
	const code = parseInt(data.returnCode, 10);
	if (code !== 1) {
		switch (code) {
			// -10 校验失败
		case -10:
			message({ type: 'warning', message: data.returnMsg });
			break;
			// -9 系统异常
		case -9:
			message({ type: 'error', message: data.returnMsg });
			break;
			// -2 登录超时
		case -2:
			// 退出到登录页面
			message({
				type: 'warning',
				message: data.returnMsg,
				duration: 1500,
				onClose() {
					window.location.href = './login.html';
				}
			});
			break;
			// -1 操作失败
		case -1:
			message({ type: 'error', message: data.returnMsg });
			break;
		default :
			message({ type: 'error', message: '出现了不明的错误' });
		}
		return Promise.reject(response);
	}

	return data;
	// error 为接口访问层面上的错误，比如404或者500等...
}, (error) => {
	message({
		type: 'error',
		message: '服务器开小差了，请稍后再试'
	});
	return Promise.reject(error);
});

export default axios;
