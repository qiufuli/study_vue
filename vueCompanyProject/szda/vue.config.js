const webpack = require("webpack");
module.exports = {
    publicPath: "./",
    configureWebpack: {
        resolve: {
            alias: {
                "vue$": "vue/dist/vue.esm.js"
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                jq: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            '/szdayyglxt/*': {
                // target: 'http://130.10.7.118:8088', //马腾宇
                // target: 'http://130.10.7.155:8088', //张盈涛
                target: 'http://130.10.7.119:8088', //王勤
                // target: 'http://130.10.7.132:8088', //崔超
                // target: 'http://130.10.8.244:8111', //测试
                ws: true,
                changeOrigin: true, //是否跨域              
            }
        },
    },
    pages: {
        login: {
            entry: "src/login.js",
            template: "src/login/login.html",
            filename: "login.html",
            title: "Login Page",
            // chunks: ["login"]
        },
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Index Page",
            // chunks: ["index"]
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
              @import "@/common/scss/variable.scss";
            `
            }
        }
    }
};