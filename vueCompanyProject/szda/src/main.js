import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $ from "@/common/js/axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
import '@/common/scss/index.scss';
import MyBread from '@/components/public/content_public_title.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Print from '@/common/js/print'
Vue.config.productionTip = false;
Vue.use(Print)
Vue.use(ElementUI);
Vue.use(echarts);
Vue.use(Viewer, {
    defaultOptions: {
        'button': true,
        'navbar': false,
        'title': true,
        'toolbar': false,
        'tooltip': true,
        'movable': true,
        'zoomable': true,
        'rotatable': true,
        'scalable': true,
        'transition': true,
        'fullscreen': true,
        'keyboard': true,
        'url': 'data-source'
    }
});
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
Vue.prototype.$echarts = echarts;

/**
 * @desc LoadOn loading显示
 * @desc LoadClose loading隐藏
 * */
Vue.prototype.LoadOn = function (text) {
    var text = text || "Loading...";
    loading = Vue.prototype.$loading({
        lock: false,
        text: text,
        target: document.querySelector(".loading-area") //设置加载动画区域
    });
};
Vue.prototype.LoadClose = function () {
    loading.close();
};

/**
 *  this.powerCheck('/dagl',()=>{
      console.log('cakkbacjjnaj');
    });
 * @desc 权限判断方法
 * @param String _url 要校验的地址
 * @param function callback 成功时候的回调函数
 * */
Vue.prototype.powerCheck = function (_url, callback, err) {
    let _all = JSON.parse(sessionStorage.getItem('power'));
    var flag = false;
    _all.forEach((item, index) => {
        if (item.gnlj == _url) {
            flag = true;
            callback && callback();
            return;
        } else {
            if (item.childrens) {
                item.childrens.forEach((v, k) => {
                    if (v.gnlj == _url) {
                        flag = true;
                        callback && callback();
                        return;
                    } else {}
                });
            }
        }
    })
    if (!flag) {
        if (err) {
            err();
        } else {
            this.$alert('您没有该功能的权限！', {
                center: true,
                confirmButtonText: "确定"
            });
        }
        return;
    }
}
Vue.component(MyBread.name, MyBread)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
var env = process.env.NODE_ENV;