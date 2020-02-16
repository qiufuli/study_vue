/**
 * 该服务用于临时测试打包目录服务
 * 指定到的服务配置基于 `./config/server-config.js`
 * @author jinglf000
 */


const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const config = require('./config/server-config.js');

// 声明服务器实例
const app = express();
app.set('port', process.env.PORT || config.prod.port);


// 配置代理
config.proxy.forEach((item) => {
  app.use(item.pathRules, proxy({
    target: item.target,
    changeOrigin: true,
    logLevel: 'debug'
  }));
});


// 静态路径
app.use(express.static(path.join(__dirname, 'dist')));

// 前端路由路由
// app.get(config.web.router, function (req, res) {
//   // res.send('hello');
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(app.get('port'), () => {
  console.log("server is runing at " + app.get('port'));
});


