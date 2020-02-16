import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $ from "@/common/js/axios";
import jq from "jquery";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 审批状态
Vue.filter("zt", function (value, arr) {
    if (arr.length > 0 && value) {
        var res = arr.find(item => {
            return item.dmid == value;
        });
        return res.dmmc;
    }
});
/**
 * @desc 显示各个待办事项个数
 * */
Vue.prototype.dbNum = function () {
    $({
        url: "/dmbgl/dbsxzsCx",
        type: "get"
    }).then(res => {
        this.$store.commit("getzs", res.returnData);
    });
};
/**
 * @desc LoadOn loading显示
 * @desc LoadClose loading隐藏
 * */
let loading;
Vue.prototype.LoadOn = function () {
    loading = Vue.prototype.$loading({
        lock: false,
        text: "Loading...",
        target: document.querySelector(".loading-area") //设置加载动画区域
    });
};
Vue.prototype.LoadClose = function () {
    loading.close();
};
/**
 * @desc 返回上一页
 * */
Vue.prototype.goBack = function () {
    this.$router.go(-1);
};
new Vue({
    router,
    store,
    jq,
    render: h => h(App)
}).$mount("#app");
var env = process.env.NODE_ENV;
console.log(env);