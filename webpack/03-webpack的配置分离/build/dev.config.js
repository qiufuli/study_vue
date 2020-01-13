const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config');
module.exports =  webpackMerge(baseConfig,{
  devServer:{
    contentBase:'./dist',//服务的文件夹
    inline:true,//实时监听
  }
})