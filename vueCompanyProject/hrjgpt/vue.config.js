const webpack = require("webpack");
module.exports = {
    baseUrl: "./",
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
            '/hrldjc/*': {
                // target: 'http://130.10.7.155:8086', // 测流程地址
                // target: 'http://130.10.7.149:8086',
                // target: 'http://130.10.7.158:8088',
                target: 'http://130.10.7.154:8086', //谢智明
                // target: 'http://130.10.7.141:8086',
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
    }
};