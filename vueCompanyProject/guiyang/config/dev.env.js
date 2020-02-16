var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// 配置开发环境
// 字符串要包装成'""'
// 相同的配置下，dev 的 优先级高于 prod
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true
})
