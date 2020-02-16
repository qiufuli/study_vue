var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

// 根据production，判断是否需要
var optionsLoader =  {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
// if (isProduction) {
// 	optionsLoader.loaders.js = 'happypack/loader?id=babel';// 使用happypack线程处理 vue中的js
// }

module.exports = optionsLoader;

