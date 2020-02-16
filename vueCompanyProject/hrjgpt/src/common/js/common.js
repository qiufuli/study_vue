import $ from "@/common/js/axios";

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
 * @description 代码表查询
 * @param url 接口请求路径
 * @param table_name 代码表名
 * @param callback 回调函数处理事件
 * */
function getdmb(url, table_name, callback) {
    return $({
        url: url,
        method: "get",
        params: {
            table_name: table_name
        }
    }).then(res => {
        const _res = res.returnData;
        if (+_res.executeResult === 1) {
            callback(res);
        } else {
            this.$alert(_res.message, {
                center: true,
                confirmButtonText: "确定"
            });
        }
    });

}
/**
 * @description 给数组对象以index分组
 * @param arrObj 目标数组
 * */
function Group(arrObj) {
    var newArr = [];
    var _index = 0;
    if (arrObj.length > 0) {
        for (var i = 0; i < arrObj.length; i++) {
            if (arrObj[i + 1] && arrObj[i].ajh == arrObj[i + 1].ajh) {
                _index++;
                arrObj[i].index = _index;
                newArr.push(arrObj[i]);
            } else {
                _index++;
                arrObj[i].index = _index;
                _index = 0;
                newArr.push(arrObj[i]);
            }
        }
    }
    return newArr;
}
/**
 * @description 请选择select
 * @param arr 目标数组
 * @param flag true 表示添加  false或不写 不添加
 * */
function select(arr, flag) {
    var newArr = [];
    newArr = arr;
    console.log(newArr);
    if (flag) {
        newArr.unshift({
            dmid: "",
            dmmc: "请选择",
            table_name: null
        });
        return newArr;
    } else {
        return newArr;
    }
}
/**
 * @description 请选择select 与上面的操作不一样
 * @param arr 目标数组
 * @param flag true 表示添加  false或不写 不添加
 * */
function selectPerson(arr, flag) {
    var newArr = [];
    newArr = arr;
    if (flag) {
        newArr.unshift({
            ryid: "",
            xm: "请选择"
        });
        return newArr;
    } else {
        return newArr;
    }
}
/**
 * @description 请选择select 通用
 * @param arr 目标数组
 * @param flag true 表示添加  false或不写 不添加
 * */
function selectAll(arr, flag, _id, _xm) {
    var newArr = [];
    newArr = arr;
    if (flag) {
        newArr.unshift({
            _id: "",
            _xm: "请选择"
        });
        return newArr;
    } else {
        return newArr;
    }
}
export {
    deepClone,
    getdmb,
    Group,
    select,
    selectPerson,
    selectAll
};