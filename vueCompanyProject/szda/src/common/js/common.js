import $ from "@/common/js/axios";
import Vue from "vue";

/**
 * @description 深拷贝对象方法
 * @param obj 要拷贝的对象
 * */
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                //判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * @description 获取数据查询
 * @param url 接口请求路径
 * @param data 请求数据
 * @param callback 回调函数处理事件
 * @param err 等于0时
 * */
// var $alert = new $Alert()
function getData(url, data, callback, err) {
    return $({
        url: url,
        method: "get",
        params: data
    }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
            callback(res);
        } else {
            // Vue.prototype.$alert(_res.message, {
            //     center: true,
            //     confirmButtonText: "确定"
            // });
            if (res.returnData !== '') {
                Vue.prototype.$message({
                    type: "warning",
                    center: true,
                    message: _res.message
                });
            }
            err(res)
        }
    });

}

export {
    deepClone,
    getData
};