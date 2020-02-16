/**
 * ###### Sat Nov 4 10:49:40 CST 2017
 * @name axios 基于axios的Ajax异步请求方法的封装
 * @description 核心方法基于axios，配合Elememt-ui和后台的数据返回规则统一封装异步处理
 * @author jinglf000
 * @return 返回axios的实例，需要的时候直接引用
 *
 */

import axios from "axios";
import {
    Message,
    Alert
} from "element-ui";
// import alert from '@/base/alert';
import Vue from "vue";

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;

function startLoading() {
    loading = Vue.prototype.$loading({
        lock: false,
        text: "Loading...",
        target: document.querySelector(".loading-area") //设置加载动画区域
    });
}

function endLoading() {
    loading.close();
}

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}
// axios 配置
// axios.defaults.timeout = 20000; // 等待时长
// axios.defaults.headers.common['Content-type'] = 'application/x-www-form-urlencoded';// 内容类型
axios.defaults.headers["Content-type"] = "application/json;charset=utf-8";
axios.defaults.validateStatus = function validateStatus(status) {
    return status >= 200 && status <= 300;
};
// const message = function message(obj, fn) {
// 	/* eslint-disable no-alert */
// 	console.log(obj, fn);
// };
const message = (obj) => {
    const messageDefault = {
        showClose: true,
        duration: 3000
    };
    return Message(Object.assign(messageDefault, obj));
};
// 接口预处理，对接口进行处理
axios.interceptors.request.use((config) => {
    // console.log('config', config)
    // if (config.method == 'post' && config.data && JSON.parse(config.data).loading) {
    // } else {
    //     /* eslint-disable */
    //     showFullScreenLoading();
    // }
    /* eslint-disable */
    // showFullScreenLoading();
    config.url = conf.urlPrefix + config.url;
    return config;
});

// 返回值统一拦截，业务拦截在status为200，接口调用成功了，但出现了业务错误
axios.interceptors.response.use((response) => {
    // tryHideFullScreenLoading();
    const data = response.data;
    // 业务逻辑错误处理
    const code = parseInt(data.returnCode, 10);
    if (code !== 1) {
        switch (code) {
            // -10 校验失败
            case -10:
                message({
                    type: 'warning',
                    message: data.returnMsg
                });
                break;
                // -9 系统异常
            case -9:
                message({
                    type: 'error',
                    message: data.returnMsg
                });
                break;
                // -2 登录超时
            case -2:
                // 退出到登录页面
                message({
                    type: 'error',
                    message: data.returnMsg,
                    onClose() {
                        window.location.href = './login.html';
                    }
                });
                break;
                // -1 操作失败
            case -1:
                message({
                    type: 'error',
                    message: data.returnMsg
                });
                break;
                // 参数含有非法字符，后台拦截器拦截
            case -11:
                message({
                    type: 'warning',
                    message: data.returnMsg
                });
                break;
            default:
                message({
                    type: 'error',
                    message: '出现了不明的错误'
                });
        }
        return Promise.reject(response);
    }

    return data;
    // error 为接口访问层面上的错误，比如404或者500等...
}, (error) => {
    // tryHideFullScreenLoading();
    message({
        type: 'error',
        message: '服务器开小差了，请稍后再试'
    });
    return Promise.reject(error);
});

export default axios;