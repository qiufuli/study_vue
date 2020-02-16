import Vue from "vue";
import Router from "vue-router";
import APP from "./App.vue";
import Index from "./views/index/index.vue"
import Kjzm from "./views/dafw/kjzm.vue"
import Dajs from "./views/dafw/dajs.vue"
import Cljs from "./views/dafw/cljs.vue"
import Dawj from "./views/dafw/dawj.vue"
import Dazc from "./views/dafw/dazc.vue"
import Dacy from "./views/dafw/dacy.vue"
import dayx from "./views/dafw/dayx.vue"
import Clwj from "./views/dafw/clwj.vue"
import ImgMod from "./views/imgModule/imgModule.vue"
import DafwIndex from "./views/dafw/dafwIndex.vue"
import DaglIndex from "./views/dagl/daglIndex.vue"
import daSearch from "./views/dagl/daSearch.vue"
import Personal from "./views/dagl/personal.vue"
import imgModule from "./views/dagl/imgModule.vue"
import Datj from "./views/datj/datj.vue"
import XtwhIndex from "./views/xtwh/xtwhIndex.vue"
import Xtwh from "./views/xtwh/xtwh.vue"
import zygl from "./views/xtwh/zygl.vue"
import jsgl from "./views/xtwh/jsgl.vue"
import mmcz from "./views/xtwh/mmcz.vue"

Vue.use(Router);
// let base = `${process.env.BASE_URL}`
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            name: "Index",
            component: Index
        },
        {
            path: "/imgmod",
            name: "ImgMod",
            component: ImgMod
        },
        
        {
            path: "/dafw/dafwIndex",
            name: "DafwIndex",
            component: DafwIndex,
            children: [{
                    path: "/dafw/dafwIndex",
                    redirect: "/dafw/dajs"
                },
                {
                    path: "/dafw/kjzm",
                    component: Kjzm
                },
                {
                    path: "/dafw/dajs",
                    component: Dajs
                },
                {
                    path: "/dafw/cljs",
                    component: Cljs
                },
                {
                    path: "/dafw/dawj",
                    component: Dawj
                },
                {
                    path: "/dafw/dazc",
                    component: Dazc
                },
                {
                    path: "/dafw/dacy",
                    component: Dacy
                },
                {
                    path: "/dafw/yxxx",
                    component: dayx
                },
                {
                    path: "/dafw/clwj",
                    component: Clwj
                }
            ]
        },
        {
            path: "/dagl/daglIndex",
            name: "DaglIndex",
            component: DaglIndex,
            children: [{
                    path: "/dagl/daglIndex",
                    redirect: "/dagl/daSearch"
                },
                {
                    path: "/dagl/daSearch",
                    component: daSearch
                },
                {
                    path: "/dagl/personal",
                    component: Personal
                }, {
                    path: "/dagl/imgModule",
                    name: "dagl_imgModule",
                    component: imgModule
                },
            ]
        },
        {
            path: "/imgModule",
            name: "imgModule",
            component: imgModule
        },
        {
            path: "/datj",
            name: "datj",
            component: Datj
        },
        {
            path: "/xtwh/xtwhIndex",
            name: "XtwhIndex",
            component: XtwhIndex,
            children: [{
                    path: "/xtwh/xtwhIndex",
                    redirect: "/xtwh/czy"
                },
                {
                    path: "/xtwh/czy",
                    name:'yhgl',
                    component: Xtwh
                },
                {
                    path: "/xtwh/js",
                    name:'jsgl',
                    component: jsgl
                },
                {
                    path: "/xtwh/gn",
                    name:'gngl',
                    component: zygl
                },
                {
                    path: "/xtwh/mmcz",
                    name:'mmcz',
                    component: mmcz
                }
            ]
        },
    ]
});

export default router;