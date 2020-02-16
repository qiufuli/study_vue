/**
 * 用于配置临时测试服务，对应于根目录`server.js`
 * @author  jinglf000
 */

// 代理服务配置
const proxy = [
  {
    target: 'http://www.bksx.cn/',
    pathRules: [
    ]
  }
];

// prod 服务地址
const prod = {
  port: 9898
};

// web端的router，均指向index.html（配合前端路由）
// const web = {
//   router: /^\/((login)|(index)|(search)|(infoDetail)|(danganPic)|)$/
// }

module.exports.prod = prod;
module.exports.proxy = proxy;
// module.exports.web = web;
